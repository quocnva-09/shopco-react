# Current Error Handling Architecture

> **Audit Date:** 2026-06-02  
> **Scope:** `src/` directory — all API, hook, component, route, and utility files  
> **Purpose:** Document every error-handling mechanism in the codebase without modifying code

---

## 1. API & Network Level (Global)

### 1.1 Axios Interceptor — Centralized Error Normalization

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/lib/axios.ts` |
| **Mechanism**   | A global Axios **response interceptor** catches every failed HTTP response and normalizes the raw error into a typed `ApiError` class. |

**Execution Flow:**

```
Axios response error
  → handleApiError(error)            [src/utils/apiError.ts]
      → Is it already an ApiError? Return as-is.
      → Is it an AxiosError?
          → mapAxiosErrorToStandardizedError()
              → Extract HTTP status → map to ApiErrorCode via STATUS_TO_API_ERROR_CODE
              → Extract backend error code (response.data.code or .error_code)
              → If 400/422: extract validation errors (response.data.errors or .field_errors)
              → If no response at all: NETWORK_ERROR
          → Wrap in new ApiError(...)
      → Otherwise: fallback INTERNAL_SERVER_ERROR
  → Is the error code a "global mutation error"?
      (NETWORK_ERROR, INTERNAL_SERVER_ERROR, TEMPORARY_UNAVAILABLE, SERVICE_UNAVAILABLE, GATEWAY_TIMEOUT)
      → Yes + throttle check (3 000 ms) passes:
          → window.dispatchEvent(CustomEvent("global-api-error", { detail: { message } }))
  → Promise.reject(normalizedApiError)
```

**Key Details:**
- **Throttling:** A module-level `lastGlobalErrorTime` variable ensures global error toasts fire at most once every `GLOBAL_ERROR_THROTTLE_MS` (3 000 ms), defined in `src/const/apiConfig.ts`.
- **Mutation check logic flaw:** The `isMutation` check includes *all* HTTP methods (GET through DELETE), so it is effectively always `true`. Every request that triggers a global-class error will emit the `CustomEvent`.
- **Error codes:** 13 error codes defined in `src/const/apiErrorCodes.ts`, with a 1:1 mapping from 12 HTTP status codes (400–504) plus a synthetic `NETWORK_ERROR` for offline/no-response scenarios.

### 1.2 ApiError Class — Typed Error Contract

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/utils/apiError.ts` |
| **Mechanism**   | Custom `ApiError` extends `Error` with structured fields: `code`, `status`, `uiMessage`, `validationErrors`. Used project-wide as the standard error shape. |

**Fields:**

| Field              | Type                    | Purpose |
|--------------------|-------------------------|---------|
| `isApiError`       | `true` (literal)        | Runtime type guard |
| `code`             | `ApiErrorCode`          | Machine-readable enum code (e.g. `"E000013"` for network error) |
| `status`           | `STATUS_CODE \| undefined` | Original HTTP status (400, 401, …, 504) |
| `uiMessage`        | `string`                | Human-readable string for display |
| `validationErrors` | `Record<string, string[]> \| undefined` | Per-field validation errors from the backend |

### 1.3 API Response Unwrappers

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/utils/apiHelpers.ts` |
| **Mechanism**   | `unwrapApiResponse()` and `unwrapPaginatedResponse()` check the `success` flag on every API response. If `false`, they throw a new `ApiError` with status `400`. |

**Execution Flow:**

```
API service calls get/post/put/patch/del  [src/lib/axios.ts]
  → Returns response.data (raw API envelope)
  → Service calls unwrapApiResponse(response)  [src/utils/apiHelpers.ts]
      → response.success === false?
          → throw new ApiError({ message, status: 400 })
      → Returns response.data (the unwrapped payload)
```

**Consumers:**
- `src/api/Product/index.ts` — `getProducts()`, `getProductById()`
- `src/api/Review/index.ts` — `getReviewsByProductId()`, `submitReview()`
- `src/api/Category/index.ts` — `getCategories()`
- `src/api/Order/index.ts` — `createOrder()` (also has a manual `response.success` check before unwrapping)

### 1.4 List Error Classification

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/utils/apiErrorList.ts` |
| **Mechanism**   | `mapApiErrorToListErrorKind()` maps any caught error to a `ListErrorKind` enum. This powers the retry-gating system. |

**Error Kind Taxonomy:**

| ListErrorKind    | Condition | Retryable? |
|------------------|-----------|------------|
| `network`        | `ApiError` with no status or `NETWORK_ERROR` code; or `!navigator.onLine` | ✅ Yes |
| `server`         | `ApiError` with `status >= 500` | ✅ Yes |
| `invalid_params` | `ApiError` with status `400` or `422` | ❌ No |
| `invalid_state`  | Programmatic guard (no product ID, etc.) | ❌ No |
| `malformed_data` | `SyntaxError`, or `TypeError`/`Error` with message matching `/malformed\|invalid\s+(response\|payload\|data)/i` | ❌ No |
| `unknown`        | Everything else | ✅ Yes |

**Retry Gate:** `isRetryableListErrorKind()` blocks retries for `invalid_params`, `invalid_state`, and `malformed_data`.

---

## 2. Component & Hook Level (Local)

### 2.1 Data-Fetching Hooks — Per-Section try/catch

Each data-fetching hook follows a consistent pattern:

```
useEffect or useCallback triggers async fetch
  → try { await apiCall(); set success state }
  → catch (error) {
      logger.error("...", error);
      setError(mapApiErrorToMessage(error, FALLBACK));
      setErrorKind(mapApiErrorToListErrorKind(error));
    }
  → finally { reset loading/retrying flags }
```

| Hook | File | What It Catches | Retry Support |
|------|------|-----------------|---------------|
| `useHomeData` | `src/hooks/useHomeData/index.ts` | New arrivals, top selling, and reviews fetch failures — **3 independent try/catch blocks** | ✅ Per-section: `retryNewArrivals()`, `retryTopSelling()`, `retryReviews()` — gated by `isRetryableListErrorKind` |
| `useProductDetailData` | `src/hooks/useProductDetailData/index.ts` | Product fetch failure + related products fetch failure — **2 independent try/catch blocks** | ✅ `retry()` for main product, `retryRelatedProducts()` for related — gated by error kind |
| `useProductReviews` | `src/hooks/useProductReviews/index.ts` | Reviews page-1 and load-more fetch failures — **2 try/catch blocks** inside `requestPageOne()` and `loadMore()` | ✅ `reloadReviews()` — dispatches `REQUEST_RETRY_START` action through `useReducer` |
| `useReviewSubmit` | `src/hooks/useReviewSubmit/index.ts` | Review submission failure | ❌ No automated retry — sets `reviewStatusMessage` with error text |
| `useCartRows` | `src/hooks/useCartRows/index.ts` | Cart product hydration failures (bulk `Promise.all`) | ✅ `retryHydration()` — phase-gated (`error` → `hydrating`) |

**Shared Safety Patterns across all hooks:**
- **Request ID refs** (`requestIdRef`, `newArrivalsRequestIdRef`, etc.) — discards stale responses from superseded requests.
- **isMountedRef / isActive flag** — guards against state updates after unmount.
- **In-flight lock** (`isReviewSubmitInFlightRef`) — prevents double-submission.

### 2.2 Checkout Page — Multi-Branch Error Handling

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/pages/Checkout/index.tsx` |
| **Mechanism**   | The `handleCheckoutSubmit()` handler uses **two sequential try/catch blocks** with a branching error strategy. |

**Flow:**

```
handleCheckoutSubmit(values)
  → Guard: submissionLockRef, isSubmittingOrder, isLoading, hasError, empty cart
  → try { mapCartToOrderRequest(cartRows, values) }
      catch → showToast(error, "error") + return
  → try { await createOrder(payload) }
      catch (error) →
        Branch 1: mapApiValidationErrors(error) returns field errors?
          → Set serverErrors per-field + showToast(error message, "error")
        Branch 2: isApiError(error) without validation?
          → showToast ONLY if NOT server error (5xx) and NOT network error
            (Rationale: global interceptor already fires toast for those)
        Branch 3: Unknown error
          → showToast(CHECKOUT_GENERIC, "error")
      finally → unlock submission
```

**Key Design Decision:** The Checkout page intentionally **avoids duplicate toasts** for 5xx and network errors because those are already handled by the global interceptor → ToastRuntime pipeline.

### 2.3 Cart Page — Hydration Error + Coupon Error

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/pages/Cart/index.tsx` |
| **Mechanism**   | Delegates hydration errors to `useCartRows` hook. Displays `<RetryState>` when `hasError` is true. Coupon application failure triggers a local toast. |

### 2.4 Product Detail Page — Granular ErrorBoundary Wrapping

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/pages/ProductDetail/index.tsx` |
| **Mechanism**   | Three **separate `<ErrorBoundary>` wrappers** isolate crash zones: reviews form, reviews tab, and related products section. Each has `fallbackRender` with a `resetErrorBoundary` callback. |

**Boundary Map:**

```
ProductDetail
├── ErrorBoundary (review form)          — resetKeys: [productId]
├── ErrorBoundary (ProductReviewsTab)    — resetKeys: [productId]
└── ErrorBoundary (RelatedProductsSection) — resetKeys: [productId]
```

### 2.5 ListStateWrapper — Reusable Error/Loading/Empty Orchestrator

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/components/molecules/ListStateWrapper/index.tsx` |
| **Mechanism**   | A render-switch component that conditionally renders `<RetryState>`, loading skeleton, empty state, or children based on `isLoading`, `error`, `isEmpty`, and `isRetrying` props. |

**Render Priority:** `error/isRetrying` > `isLoading` > `isEmpty` > `children`

**Consumers:** `HomeProductSection`, `RelatedProductsSection`, `ProductReviewsTab`, `HomeReviews`

### 2.6 RetryState — Standardized Retry UI

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/components/molecules/RetryState/index.tsx` |
| **Mechanism**   | Renders an error message and a retry button. The button is disabled when `isRetrying`, and shows a loading spinner via `isLoading` prop on the `<Button>`. |

### 2.7 Cart LocalStorage — Silent Failure

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/utils/cart.ts` |
| **Mechanism**   | `readStoredCartRows()` wraps `JSON.parse(localStorage.getItem(...))` in a `try/catch`. On parse failure, it silently returns `[]`, losing any corrupted data without notifying the user. |

---

## 3. Application & Router Level (Crashes)

### 3.1 Root ErrorBoundary — Global Crash Handler

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/components/organisms/ErrorBoundary/index.tsx` |
| **Wrapped In**  | `src/App.tsx` — wraps the entire `<AppRoutes />` + `<ToastRuntime />` |
| **Mechanism**   | Class-based React Error Boundary with `getDerivedStateFromError` and `componentDidCatch`. |

**Execution Flow:**

```
Any render-time throw in the React tree
  → getDerivedStateFromError(error)
      → state.hasError = true, state.error = error
  → componentDidCatch(error, errorInfo)
      → reportError(error, errorInfo)  (currently: logger.error, dev-only)
      → props.onError?.(error, errorInfo)
  → Render fallback:
      → If props.fallbackRender → custom render function (used in ProductDetail)
      → If props.fallback → static ReactNode (used in HomeProductSection)
      → Default: Full-page error card with:
          - ChunkLoadError? → "A page resource failed to load" + reload on retry
          - Other errors → "We're sorry, an unexpected error occurred" + re-mount on retry
          - "Try Again" button → resets error state (or reloads page for chunk errors)
          - "Go back to Home" button → window.location.href = "/"
```

**Features:**
- **resetKeys:** When provided, the boundary auto-resets if any key value changes (e.g., route params).
- **retryKey:** Internal counter used as a React `key` to force re-mount children on retry.
- **Chunk load error detection:** Uses `isChunkLoadError()` from `src/utils/chunkLoadError.ts` to detect dynamic import failures and trigger a full page reload instead of a re-mount.

### 3.2 Chunk Load Error Detection

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/utils/chunkLoadError.ts` |
| **Mechanism**   | Checks `error.message` for `"Failed to fetch dynamically imported module"`, `"Importing a module script failed"`, or `error.name === "ChunkLoadError"`. |

### 3.3 Suspense Boundary — Lazy Load Fallback

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/components/templates/MainLayout.tsx` |
| **Mechanism**   | `<Suspense fallback={<Spinner />}>` wraps the `<Outlet />` to show a spinner while lazily-loaded pages (`ProductDetail`, `Cart`, `Checkout`) are being fetched. |

**Note:** If the lazy import itself **fails** (e.g., network issue), this Suspense boundary does NOT catch the error — it bubbles up to the nearest ErrorBoundary (the root one in `App.tsx`), which then shows the chunk-load-error fallback.

### 3.4 React Router — No `errorElement`

| Property        | Detail |
|-----------------|--------|
| **Files**       | `src/routes/index.tsx`, `src/routes/routeConfig.tsx` |
| **Mechanism**   | The app uses `<BrowserRouter>` + `<Routes>` (React Router v6). **No `errorElement` is configured on any route.** Router-level errors (e.g., loader failures) are not handled at the route level. |

### 3.5 NotFound Page — 404 Route

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/pages/NotFound/index.tsx` |
| **Mechanism**   | A catch-all `<Route path="*">` renders a styled 404 page with a "Go back to Home" button. This is a **routing fallback**, not an error boundary. |

### 3.6 OfflineBanner — Network Connectivity Indicator

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/components/organisms/OfflineBanner/index.tsx` |
| **Mechanism**   | Listens to `window` `online`/`offline` events. Shows a fixed banner when offline ("No internet connection") and a brief "Back online" message (auto-dismisses after 2.5 s) when connectivity is restored. |

### 3.7 ToastRuntime — Global Error Event Consumer

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/components/organisms/ToastRuntime/index.tsx` |
| **Mechanism**   | Listens for `window` `CustomEvent("global-api-error")` events dispatched by the Axios interceptor. On each event, calls `showToast({ message, variant: "error", duration: 5000 })`. |

**Execution Flow:**

```
Axios interceptor dispatches CustomEvent("global-api-error")
  → ToastRuntime event listener
      → showToast({ message, variant: "error" })
          → dispatch(addToast(...)) to Redux store
          → setTimeout dispatches dismissToast after duration
  → <ToastContainer> renders visible toasts from Redux state
```

### 3.8 Logger — Dev-Only Console Wrapper

| Property        | Detail |
|-----------------|--------|
| **File**        | `src/utils/logger.ts` |
| **Mechanism**   | `logger.log()` and `logger.error()` only output to `console` when `import.meta.env.DEV` is `true`. In production builds, **all logging is silently suppressed**. |

### 3.9 Missing Global Handlers

| Handler | Present? |
|---------|----------|
| `window.addEventListener("error", ...)` | ❌ Not found |
| `window.addEventListener("unhandledrejection", ...)` | ❌ Not found |
| React Router `errorElement` | ❌ Not found |
| External error reporting (Sentry, Datadog, etc.) | ❌ Stub only (`reportError` in ErrorBoundary calls `logger.error`) |

---

## 4. Assessment Summary

### Current State

The codebase has a **well-structured, layered error handling architecture** with clear separation of concerns:

1. **API Layer** provides strong normalization — raw Axios errors are transformed into typed `ApiError` objects with machine-readable codes, UI messages, and optional validation error maps.
2. **Hook Layer** provides per-section isolation — each data source has its own try/catch, error state, error kind classification, and retry mechanism. Race conditions are handled via request ID refs and mount guards.
3. **UI Layer** provides graceful degradation — `ListStateWrapper` and `RetryState` give consistent error/retry UX, while `ErrorBoundary` prevents render crashes from taking down the whole app.

### Vulnerabilities & Missing Pieces

> [!WARNING]
> **1. No Production Error Reporting**
> 
> The `reportError()` function in `ErrorBoundary` only calls `logger.error()`, which is **silenced in production** (`import.meta.env.DEV` guard). This means **no render crashes, API errors, or unhandled exceptions are reported to any external monitoring service** in production. Errors vanish silently.
> 
> **Files:** `src/components/organisms/ErrorBoundary/index.tsx` (L14-16), `src/utils/logger.ts`

> [!WARNING]
> **2. No `window.onerror` / `unhandledrejection` Handlers**
> 
> There are no global listeners for `window.addEventListener("error", ...)` or `window.addEventListener("unhandledrejection", ...)`. Any JavaScript error that occurs **outside** of a React render cycle (e.g., in a `setTimeout` callback, an event handler that isn't wrapped in try/catch, or a forgotten `.catch()` on a Promise) will go completely undetected. The only safety net is the browser's own console.
> 
> **Files:** `src/main.tsx` (no setup), `src/App.tsx` (no setup)

> [!CAUTION]
> **3. Interceptor `isMutation` Check Is Always True**
> 
> In `src/lib/axios.ts` (L26-28), the `isMutation` variable checks if the HTTP method is in `["GET", "POST", "PUT", "PATCH", "DELETE"]`. Since this list covers **every** HTTP method the app uses, `isMutation` is effectively always `true`. This means that **GET request failures** (e.g., loading products) can also trigger global error toasts via the `CustomEvent`, which can lead to **double error messaging** — the interceptor fires a toast AND the hook's catch block shows an inline error. The Checkout page explicitly works around this (skipping local toasts for 5xx/network errors), but other pages don't.
> 
> **Impact:** A user who gets a 500 on a product list fetch may see both an inline `RetryState` error AND a global toast with the same message.

> [!NOTE]
> **Additional observations:**
> - Cart `localStorage` parse failures are silently swallowed (`src/utils/cart.ts` L59) — corrupted cart data produces no user feedback.
> - The `createOrder` API service (`src/api/Order/index.ts` L15-17) has a redundant `response.success` check before calling `unwrapApiResponse()`, which performs the same check.
> - No React Router `errorElement` is configured — while the root ErrorBoundary covers render errors, data router loader/action errors (if the app migrates to `createBrowserRouter`) would be unhandled.

---

## Appendix: File Reference Map

| Layer | File | Role |
|-------|------|------|
| **Config** | `src/const/apiConfig.ts` | `API_BASE_URL`, `GLOBAL_ERROR_THROTTLE_MS` |
| **Config** | `src/const/apiErrorCodes.ts` | `ApiErrorCode` enum, `STATUS_TO_API_ERROR_CODE` map, `API_ERROR_MESSAGES`, global mutation error set |
| **Config** | `src/const/messages.ts` | `ERROR_MESSAGES`, `VALIDATION_MESSAGES`, `UI_TEXT` dictionaries |
| **Types** | `src/types/apiError.ts` | `StandardizedApiError` interface |
| **Types** | `src/types/api/apiError.ts` | `NormalizedApiError` interface, `ValidationErrorMap` type |
| **Types** | `src/types/listState.ts` | `LIST_ERROR_KIND` enum, `ListCoreState` type |
| **Lib** | `src/lib/axios.ts` | HTTP client, response interceptor, global error event dispatch |
| **Utils** | `src/utils/apiError.ts` | `ApiError` class, `handleApiError()`, `mapAxiosErrorToStandardizedError()` |
| **Utils** | `src/utils/apiErrorList.ts` | `mapApiErrorToMessage()`, `mapApiErrorToListErrorKind()`, `isRetryableListErrorKind()` |
| **Utils** | `src/utils/apiHelpers.ts` | `unwrapApiResponse()`, `unwrapPaginatedResponse()` |
| **Utils** | `src/utils/chunkLoadError.ts` | `isChunkLoadError()` |
| **Utils** | `src/utils/logger.ts` | Dev-only `logger.log()` / `logger.error()` |
| **Utils** | `src/utils/cart.ts` | `readStoredCartRows()` — silent JSON parse failure |
| **Hooks** | `src/hooks/useHomeData/index.ts` | 3× try/catch for home page sections |
| **Hooks** | `src/hooks/useProductDetailData/index.ts` | 2× try/catch for product + related |
| **Hooks** | `src/hooks/useProductReviews/index.ts` | 2× try/catch (page-1 + load-more) via useReducer |
| **Hooks** | `src/hooks/useReviewSubmit/index.ts` | 1× try/catch for review POST |
| **Hooks** | `src/hooks/useCartRows/index.ts` | 1× try/catch (Promise.all) for cart hydration |
| **Hooks** | `src/hooks/useToast/index.ts` | Toast dispatch + auto-dismiss via setTimeout |
| **Components** | `src/components/organisms/ErrorBoundary/index.tsx` | Class-based React Error Boundary |
| **Components** | `src/components/organisms/ToastRuntime/index.tsx` | Global API error event listener → toast |
| **Components** | `src/components/organisms/OfflineBanner/index.tsx` | Network connectivity banner |
| **Components** | `src/components/molecules/ListStateWrapper/index.tsx` | Error/loading/empty render switch |
| **Components** | `src/components/molecules/RetryState/index.tsx` | Error message + retry button |
| **Pages** | `src/pages/Checkout/index.tsx` | Multi-branch error handling for order submission |
| **Pages** | `src/pages/Cart/index.tsx` | Hydration error display + coupon error toast |
| **Pages** | `src/pages/ProductDetail/index.tsx` | 3× granular ErrorBoundary zones |
| **Pages** | `src/pages/NotFound/index.tsx` | 404 catch-all route |
| **Routes** | `src/routes/index.tsx` | BrowserRouter setup (no errorElement) |
| **App** | `src/App.tsx` | Root ErrorBoundary + ToastRuntime + Redux Provider |
| **App** | `src/main.tsx` | React root mount (no global handlers) |

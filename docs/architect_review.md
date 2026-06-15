# 🏗️ Shopco-React — Software Architect Review

> **Scope**: Architecture, Performance & Bundle, State Management  
> **Build baseline**: Vite v8 · React 19 · React Router v7 · Redux Toolkit 2  
> **Date**: 2026-06-15

---

## Executive Summary

The project demonstrates a **solid intermediate architecture** with correct use of Atomic Design, route-based code splitting, memoized selectors, and a clean service layer. However, three structural risks will compound into painful tech-debt as the screen count grows past 15–20 routes. The most urgent issue is the **`validationPatterns` bundle** (29.7 kB un-split), followed by a **dual-import bug** that silently breaks code splitting for `NotFound`, and a lack of a true **Domain layer** that will cause copy-paste sprawl as business rules multiply.

---

## 1. Overall Architecture — Clean Architecture Assessment

### 1.1 Current Layer Map

```
┌────────────────────────────────────────────────────────────────────────┐
│  PRESENTATION                                                          │
│  src/pages/          (7 screens, route-bound)                          │
│  src/components/     (atoms / molecules / organisms / templates)       │
│  src/hooks/          ← ⚠️ mixed: some are UI-only, some are domain     │
├────────────────────────────────────────────────────────────────────────┤
│  DOMAIN  (implicit — no dedicated folder)                              │
│  src/utils/          (validation, mappers, cart math, error handling)  │
│  src/consts/         (business rules: limits, messages, error codes)   │
│  src/slices/         (only cartSlice — well-scoped)                    │
│  src/store/          (selectors — good: derived state lives here)      │
├────────────────────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE / DATA                                                 │
│  src/lib/            (axiosClient — good abstraction)                  │
│  src/services/       (checkout, product, review — clean, thin)         │
│  src/types/          (api/, payload/ sub-folders — good)               │
└────────────────────────────────────────────────────────────────────────┘
```

### 1.2 What Is Working Well ✅

| Area | Observation |
|---|---|
| **Atomic Design** | 4-tier hierarchy (atoms → molecules → organisms → templates) is correctly applied and consistently followed |
| **Service Layer** | `CheckoutService`, `ProductService`, `ReviewService` are thin, typed, and import-only from `lib/axiosClient` — no leakage |
| **Selectors** | `createSelector` memoization in `store/selectors.ts` keeps derived state (`lineItems`, `total`, `itemCount`) out of components |
| **Route Loaders** | `homeLoader` / `productDetailLoader` use deferred `Promise` returns with `<Await>` + `<Suspense>` — excellent pattern for waterfall elimination |
| **Error Handling** | Centralized `normalizeError` + `axiosClient` interceptor prevents duplicated error-toast logic |
| **Type Safety** | Separate `types/api/` and `types/payload/` sub-folders show intentional API contract separation |

### 1.3 Risks & Issues ⚠️

#### Risk 1 — `hooks/` is a God Folder (Medium Risk → High at 30+ screens)

`src/hooks/` currently mixes **UI hooks** (`useSlider`, `useClickOutside`) with **domain/application logic hooks** (`useProductCart`, `useCheckoutSubmit`, `useCartSummary`). As the screen count grows, this folder becomes the new dumping ground for everything with the word "use" in it.

```
useSlider.ts         → pure UI interaction (belongs near component)
useClickOutside.ts   → pure UI interaction (belongs near component)
useProductCart.ts    → Domain: cart business rules + Redux dispatch
useCheckoutSubmit.ts → Application: form submission orchestration
useCartSummary.ts    → Application: derived state facade
```

#### Risk 2 — No Domain Model / Entity Layer (High Risk at 20+ screens)

Business rules are currently scattered:
- Cart limits → `consts/config.ts` (`MAX_PER_ITEM`, `MAX_TOTAL_QUANTITY`)
- Cart mutations → `slices/cartSlice.ts`
- Cart derived math → `utils/cart.ts` + `store/selectors.ts`
- Cart UI orchestration → `hooks/useProductCart.ts`

There is no single `domain/cart/` module that owns the contract. If a Product team adds subscription pricing or bundle discounts, changes will touch 4+ files instead of 1.

#### Risk 3 — `consts/` mixes Infrastructure with Domain (Low→Medium Risk)

`consts/messages.ts` (5.3 kB) contains UI copy, API error messages, and validation strings in one file. When you add i18n (internationalization), the entire `messages.ts` becomes a migration target. Similarly, `consts/config.ts` mixes business rules (cart limits) with CSS breakpoint mirrors — these belong in different layers.

#### Risk 4 — `pages/` has no Page-Level Module Boundary (Low Risk now, High at 50+)

Currently each page is a flat `pages/PageName/index.tsx`. Page-specific sub-components, hooks, and constants live in the global atomic folders. At 50+ screens, this collapses into a cross-cutting concern nightmare — a change to `CheckoutShippingForm` might affect `VerifyOrderPage` implicitly.

---

## 2. Performance & Bundle Size

### 2.1 Build Output Analysis (actual numbers from your `npm run build`)

```
dist/assets/index-UzTyIGlC.js          216.90 kB │ gzip: 68.60 kB  ← VENDOR CHUNK (React + Router)
dist/assets/Button-bWyruEUw.js         110.33 kB │ gzip: 36.85 kB  ← 🔴 CRITICAL
dist/assets/api-eHir8Due.js             56.12 kB │ gzip: 21.54 kB  ← axios vendor
dist/assets/validationPatterns-...      29.72 kB │ gzip: 10.77 kB  ← 🔴 CRITICAL
dist/assets/redux-toolkit.modern-...   30.59 kB │ gzip: 11.49 kB  ← RTK vendor
dist/assets/ProductDetail-...          32.44 kB │ gzip: 10.12 kB  ← page chunk ✅
dist/assets/Icon-eIyyBBIU.js           16.76 kB │ gzip:  6.79 kB  ← SVG bundle
```

**Initial load (blocking)**: `index.js` (216.9 kB) + `Button.js` (110.3 kB) = **327.2 kB raw / ~105 kB gzip** before the router even renders the first page. This is the main performance bottleneck.

### 2.2 Critical Issues

#### 🔴 Issue A — `Button` chunk (110 kB) is enormous for an atom

`Button` should be one of the smallest atoms. A 110 kB chunk means it is **statically importing a large dependency tree** — likely pulling in all icon SVGs, `clsx`, or even form-related logic. This chunk is in the critical path because `Button` is used in `MainLayout` (loaded eagerly).

**Immediate action**: Audit `src/components/atoms/Button/index.tsx` for static imports of heavy modules. Separate icon rendering into a lazy sub-component.

#### 🔴 Issue B — `validationPatterns` (29.7 kB) loaded as a shared chunk

`validationPatterns.ts` (332 bytes source!) producing a 29.7 kB bundle means its **transitive imports are enormous** — likely `react-hook-form` or `zod`/custom validators pulled in via `checkOutValidation.ts` and `writeReviewValidation.ts`. These are only needed on Checkout and ProductDetail, but they are emitted as a shared chunk loaded globally.

#### 🔴 Issue C — `NotFound` dual-import bug (confirmed by Vite warning)

```
[INEFFECTIVE_DYNAMIC_IMPORT] src/pages/NotFound/index.tsx is dynamically imported
by src/routes/routeConfig.tsx but also statically imported by src/routes/routeConfig.tsx,
dynamic import will not move module into another chunk.
```

In [routeConfig.tsx](file:///media/quocnva/Data/training_react/shopco-react/src/routes/routeConfig.tsx#L104-L107), line 9 statically imports `NotFoundPage` for the outer `path: "*"` route element, AND line 95-98 lazy-imports it for the inner `path: "*"`. The static import wins — the lazy import is dead code. The `NotFound` module is bundled into the main chunk.

**Fix**: The outer `path: "*"` catch-all route (lines 104–107) should also use `lazy()` or be removed if redundant.

#### ⚠️ Issue D — No `build.rollupOptions.output.manualChunks` defined

Vite currently uses automatic chunk splitting. This causes `redux-toolkit` and `axios` to be split into separate chunks (`api-*.js`, `redux-toolkit.modern-*.js`) but without control over their loading order. A `manualChunks` strategy would group them optimally.

#### ⚠️ Issue E — `@rolldown/plugin-babel` adds 31% build time for React Compiler

The React Compiler preset adds significant compilation overhead (31% of build time). This is acceptable if React Compiler memoization benefits are being realized, but should be monitored. Consider restricting it to production builds only.

### 2.3 Plugin Timing Warning

```
[PLUGIN_TIMINGS]
  - vite:css (64%)       ← SCSS compilation is dominant
  - @rolldown/plugin-babel (31%)
```

64% of build time spent in CSS suggests SCSS `@import` chains are deep. Switch to `@use` / `@forward` (Sass module system) instead of `@import` to enable dead-code elimination.

---

## 3. State Management

### 3.1 Redux Toolkit Distribution Assessment

| What's in Redux | Verdict | Rationale |
|---|---|---|
| `cartItems[]` | ✅ **Correct** | Cross-page persistent data (cart → checkout → verify) |
| `discount` | ✅ **Correct** | Business rule, needs to survive navigation |
| `deliveryFee` | ⚠️ **Borderline** | Currently static (15). If it becomes dynamic (shipping APIs), keep in Redux. If it stays constant, move to `consts/config.ts` |

### 3.2 What Should NOT Be in Redux

A review of the hooks shows that all local state (`selectedColorId`, `selectedSizeId`, `quantity` in `useProductCart`) is correctly kept as `useState` — no over-engineering here. ✅

### 3.3 The `deliveryFee` in Redux State

```ts
// cartSlice.ts line 17
const initialState: CartState = {
  cartItems: [],
  discount: 0,
  deliveryFee: 15,   // ← Static value hardcoded in Redux state
};
```

`deliveryFee: 15` is hardcoded and never mutated in the slice (no `setDeliveryFee` action). This means it's a **constant that occupies Redux state unnecessarily**. It's read by `selectCartLineItems` via `state.cart.deliveryFee`. 

**Recommendation**: Move `deliveryFee` to `consts/config.ts` and use it directly in `buildLineItems(cartItems, CONFIG.DELIVERY_FEE, discount)`. Remove it from Redux state entirely unless you plan to make it dynamic.

### 3.4 `useCartSummary` — Minor Redundancy

```ts
// useCartSummary.ts
const cartItems = useSelector((state: RootState) => state.cart.cartItems);
const deliveryFee = useSelector((state: RootState) => state.cart.deliveryFee);
const discount = useSelector((state: RootState) => state.cart.discount);
const lineItems = useSelector(selectCartLineItems);  // already computes from above 3
const total = useSelector(selectCartTotal);           // already computes from lineItems
```

`cartItems`, `deliveryFee`, and `discount` are individually selected AND are also the inputs to `selectCartLineItems`. This is not a bug (selectors are memoized), but it creates 5 selector subscriptions per consumer when 2 (`lineItems`, `total`) would suffice for most UI needs.

---

## 4. Risk Analysis for Scaling to 50+ Screens

| Risk | Current State | At 50 Screens | Priority |
|---|---|---|---|
| **`hooks/` God Folder** | 10 hooks, manageable | 40+ hooks, impossible to navigate | 🔴 High |
| **No Domain Layer** | Business logic in 4+ folders | Copy-paste across 20+ features | 🔴 High |
| **Button chunk size** (110 kB) | Hurts all pages | Remains a fixed cost forever | 🔴 High |
| **NotFound dual-import** | 1 broken split | Wasted chunk budget slot | 🟠 Medium |
| **`consts/messages.ts` monolith** | 5.3 kB, one file | Merge conflict nightmare for teams | 🟠 Medium |
| **No page-level module boundary** | 7 pages, obvious owners | 50 pages, nobody knows what's safe to change | 🟠 Medium |
| **`deliveryFee` in Redux** | Minor noise | Blocks future shipping API integration | 🟡 Low |
| **SCSS `@import` chains** | 64% build time | Exponential build time growth | 🟡 Low |

---

## 5. Proposed Folder Structure (for 50+ screen scale)

The key change is introducing a **`features/`** directory that co-locates everything belonging to a domain feature, and a **`domain/`** directory for pure business rules with no React dependency.

```
src/
├── app/                          # App bootstrap (was: root-level files)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── components/                   # SHARED, reusable UI only (no business logic)
│   ├── atoms/
│   │   ├── Button/
│   │   ├── Icon/               ← split icons into individual lazy imports
│   │   ├── Input/
│   │   └── ...
│   ├── molecules/
│   ├── organisms/              ← only truly shared organisms (Header, Footer, Modal)
│   └── templates/
│
├── features/                     # 🆕 Feature-first module grouping
│   ├── cart/
│   │   ├── components/         ← CartItem, CartSummary, CartSection (moved from organisms)
│   │   ├── hooks/              ← useProductCart, useCartSummary (moved from hooks/)
│   │   ├── store/              ← cartSlice.ts, selectors.ts (moved from slices/ & store/)
│   │   └── index.ts            ← public API surface
│   ├── checkout/
│   │   ├── components/         ← CheckoutShippingForm, CheckoutPaymentMethod
│   │   ├── hooks/              ← useCheckoutSubmit
│   │   ├── validation/         ← checkOutValidation.ts (moved from utils/)
│   │   └── index.ts
│   ├── product/
│   │   ├── components/         ← ProductDetailInfo, ProductCard, ProductGallery...
│   │   ├── hooks/              ← useProduct, useProductCollection
│   │   └── index.ts
│   └── reviews/
│       ├── components/         ← ReviewCard, ReviewCardSkeleton, WriteReviewModal
│       ├── hooks/              ← useReviews
│       └── index.ts
│
├── domain/                       # 🆕 Pure business rules — zero React/Redux imports
│   ├── cart/
│   │   ├── cart.rules.ts       ← MAX_PER_ITEM, MAX_TOTAL_QUANTITY, buildLineItems
│   │   └── cart.types.ts       ← CartItem, CartState (domain types)
│   ├── order/
│   │   └── order.types.ts
│   └── product/
│       └── product.types.ts
│
├── infrastructure/               # 🆕 (replaces lib/ + services/)
│   ├── http/
│   │   └── axiosClient.ts
│   └── services/
│       ├── checkout.service.ts
│       ├── product.service.ts
│       └── review.service.ts
│
├── pages/                        # Route-bound page components (thin orchestrators)
│   ├── Home/
│   │   ├── index.tsx
│   │   └── loader.ts
│   ├── ProductDetail/
│   │   ├── index.tsx
│   │   └── loader.ts
│   ├── Cart/
│   ├── CheckOut/
│   ├── VerifyOrderPage/
│   ├── OrderSuccess/
│   └── NotFound/
│
├── routes/
│   ├── AppRouter.tsx
│   ├── routeConfig.tsx
│   └── paths.ts
│
├── store/                        # Global Redux store assembly only
│   └── store.ts                 ← imports from features/*/store/
│
├── consts/                       # Split by concern
│   ├── api.ts                   ← API endpoints (keep)
│   ├── config.ts                ← app config (keep, remove deliveryFee)
│   ├── errors.ts                ← merge errorCodes + errorKinds
│   └── messages/               ← 🆕 split by feature
│       ├── cart.messages.ts
│       ├── checkout.messages.ts
│       ├── review.messages.ts
│       └── index.ts
│
├── types/                        # API contract types only
│   ├── api/
│   └── payload/
│
└── utils/                        # Pure utility functions (no business rules)
    ├── formatter.ts
    ├── css.ts
    └── ApiError.ts
```

---

## 6. Vite & React Router Optimization Solutions

### Fix 1 — Repair the `NotFound` Dual-Import Bug

```tsx
// routes/routeConfig.tsx — BEFORE (buggy)
import { NotFoundPage } from "@/pages/NotFound";  // ❌ static import on line 9
// ...
{
  path: "*",
  element: <NotFoundPage />,  // line 106 — defeats all lazy splitting
},

// routes/routeConfig.tsx — AFTER
// Remove the static import entirely. Use lazy() for BOTH catch-alls:
{
  path: "*",
  lazy: async () => {
    const { NotFoundPage } = await import("@/pages/NotFound");
    return { Component: NotFoundPage };
  },
},
```

### Fix 2 — Add `manualChunks` to Control Vendor Splitting

```ts
// vite.config.ts
export default defineConfig({
  // ... existing config
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — always needed
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Redux stack — needed on all pages (cart icon in header)
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          // HTTP client — only needed when making API calls (lazy pages)
          'vendor-axios': ['axios'],
          // Form library — only needed on Checkout & ProductDetail
          // Do NOT put in manualChunks; let Vite tree-shake per lazy chunk
        },
      },
    },
    // Warn when any single chunk exceeds 150 kB gzip
    chunkSizeWarningLimit: 150,
  },
});
```

### Fix 3 — Preload Critical Lazy Routes

React Router v7 `lazy()` routes only start fetching when the user navigates. Add `<link rel="modulepreload">` for the most-likely next route:

```tsx
// components/templates/MainLayout.tsx
// After the page renders, preload the product detail chunk speculatively
useEffect(() => {
  // Preload Product Detail since user is most likely browsing
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = '/assets/ProductDetail-*.js'; // use import() instead:
  
  // Better: use the router's lazy preload API
  import('@/pages/ProductDetail'); // triggers chunk prefetch
}, []);
```

**Better approach** — use React Router's `route.lazy` with a preload helper:

```ts
// utils/preloadRoute.ts
export const preloadRoute = (importer: () => Promise<unknown>) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  // Fire the import to cache the chunk in the browser
  void importer();
};

// In MainLayout, after first render:
useEffect(() => {
  preloadRoute(() => import('@/pages/ProductDetail'));
}, []);
```

### Fix 4 — Isolate Heavy Validation from the Shared Chunk

Move form validation schemas to be **co-located with the lazy page** that uses them, so they are only loaded when that route activates:

```ts
// features/checkout/validation/checkout.validation.ts
// This file is only imported by pages/CheckOut/index.tsx
// Since CheckOut is lazy, this validation code stays in the CheckOut chunk
// and is NOT emitted as a shared chunk.

// WRONG (current — creates shared chunk):
// utils/checkOutValidation.ts  ← imported by CheckOut page
// utils/writeReviewValidation.ts ← imported by ProductDetail page
// → Vite sees both pages need validation utils → shared chunk → always loaded

// RIGHT: keep them inside the lazy page's own import tree
```

### Fix 5 — Audit and Shrink the Button Chunk

```bash
# Run bundle visualization to find what's inside Button-bWyruEUw.js
npx vite-bundle-visualizer
# or
npx rollup-plugin-visualizer (already included in some vite setups)
```

Likely culprit: `Button` imports `Icon` (16.7 kB) statically. Extract icon rendering:

```tsx
// atoms/Button/index.tsx — AFTER
const LazyIcon = lazy(() => import('@/components/atoms/Icon'));

// Use Suspense only around icon — button text renders instantly
<button>
  {iconName && (
    <Suspense fallback={<span style={{width:20,height:20}} />}>
      <LazyIcon name={iconName} />
    </Suspense>
  )}
  {children}
</button>
```

### Fix 6 — Migrate SCSS `@import` to `@use`

```scss
// BEFORE (index.scss using @import)
@import './variables';
@import './mixins';

// AFTER (Sass module system — enables dead code elimination, 20-40% faster builds)
@use './variables' as *;
@use './mixins' as mix;
```

---

## 7. Quick-Win Priority Matrix

| # | Action | Impact | Effort | Risk |
|---|---|---|---|---|
| 1 | Fix `NotFound` dual-import bug | 🟢 High (fixes broken code splitting) | 🟢 Low (2 lines) | 🟢 None |
| 2 | Move `deliveryFee` out of Redux | 🟡 Medium (cleaner state) | 🟢 Low (1 slice + 1 selector) | 🟡 Low |
| 3 | Add `manualChunks` to vite.config | 🟢 High (predictable bundle layout) | 🟢 Low (10 lines) | 🟡 Low |
| 4 | Audit `Button` chunk transitive deps | 🔴 Critical (110 kB → ~20 kB target) | 🟡 Medium | 🟡 Low |
| 5 | Split `consts/messages.ts` by feature | 🟡 Medium (i18n readiness) | 🟢 Low | 🟡 Low |
| 6 | Introduce `features/` folder structure | 🔴 Critical (scales to 50+ screens) | 🔴 High (refactor) | 🟠 Medium |
| 7 | Migrate SCSS `@import` → `@use` | 🟡 Medium (40% build time) | 🟡 Medium | 🟡 Low |
| 8 | Co-locate validation with lazy pages | 🟢 High (removes shared chunk) | 🟡 Medium | 🟡 Low |

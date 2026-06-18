import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BREAKPOINT_MD_PX,
  CATEGORY_PER_PAGE_DESKTOP,
  CATEGORY_PER_PAGE_MOBILE,
} from "@/consts/config";

// ─── Media query string (matches SCSS $bp-md: 768px) ─────────────────────────
const MQ = `(max-width: ${BREAKPOINT_MD_PX}px)`;

/**
 * Returns the correct `per_page` value for the current viewport.
 * Safe to call outside React (used by the loader on initial navigation).
 */
export const getResponsivePerPage = (): number => {
  if (typeof window === "undefined") return CATEGORY_PER_PAGE_DESKTOP;
  return window.matchMedia(MQ).matches
    ? CATEGORY_PER_PAGE_MOBILE
    : CATEGORY_PER_PAGE_DESKTOP;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Given old pagination state, compute the new page that keeps the user's
 *  reading position after a per_page change. */
const recalculatePage = (
  currentPage: number,
  currentPerPage: number,
  newPerPage: number,
): number => {
  const firstItemIndex = (currentPage - 1) * currentPerPage;
  return Math.floor(firstItemIndex / newPerPage) + 1;
};

/** Build the updated search-params setter used by both the initial sync
 *  and the breakpoint-change handler. */
const syncPerPage = (
  setSearchParams: ReturnType<typeof useSearchParams>[1],
  newPerPage: number,
  newPage: number,
) => {
  setSearchParams(
    (prev) => {
      prev.set("per_page", String(newPerPage));
      prev.set("page", String(newPage));
      return prev;
    },
    { replace: true, preventScrollReset: true },
  );
};

/**
 * Listens for breakpoint crosses at 768 px and syncs `per_page` + `page`
 * into the URL search-params so the React-Router loader re-runs with the
 * correct value.
 *
 * ### Two responsibilities:
 * 1. **Initial sync (mount)** — If the URL already contains a `per_page`
 *    that disagrees with the current viewport (e.g. the user bookmarked a
 *    desktop URL then opened it on a tablet), correct it immediately.
 *    When `per_page` is absent the loader's `getResponsivePerPage()` already
 *    returns the right value, so no extra fetch is triggered.
 *
 * 2. **Runtime sync (resize / orientation change)** — `matchMedia` fires
 *    only when the boolean result flips (crosses 768 px), never on every
 *    pixel. The page number is recalculated to keep the user's reading
 *    position.
 *
 * Both paths use `{ replace: true, preventScrollReset: true }` so the
 * browser history stays clean and scroll position is preserved.
 */
export const useResponsivePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Ref keeps the latest searchParams accessible inside the listener
  // without re-subscribing on every URL change.
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  useEffect(() => {
    const mql = window.matchMedia(MQ);

    // ── 1. Initial sync on mount ────────────────────────────────────
    // Handles the case where per_page is already in the URL but doesn't
    // match the current viewport (e.g. user bookmarked a desktop URL
    // then opened it on a 618 px tablet — matchMedia already matches,
    // so no `change` event fires).
    const correctPerPage = mql.matches
      ? CATEGORY_PER_PAGE_MOBILE
      : CATEGORY_PER_PAGE_DESKTOP;
    const urlPerPage = Number(searchParamsRef.current.get("per_page")) || 0;

    if (urlPerPage > 0 && urlPerPage !== correctPerPage) {
      const currentPage =
        Number(searchParamsRef.current.get("page")) || 1;
      const newPage = recalculatePage(currentPage, urlPerPage, correctPerPage);
      syncPerPage(setSearchParams, correctPerPage, newPage);
    }

    // ── 2. Runtime sync on breakpoint cross ─────────────────────────
    const handleBreakpointChange = (e: MediaQueryListEvent) => {
      const params = searchParamsRef.current;
      const currentPerPage =
        Number(params.get("per_page")) || CATEGORY_PER_PAGE_DESKTOP;
      const currentPage = Number(params.get("page")) || 1;
      const newPerPage = e.matches
        ? CATEGORY_PER_PAGE_MOBILE
        : CATEGORY_PER_PAGE_DESKTOP;

      // Bail out if the breakpoint didn't actually change per_page.
      if (newPerPage === currentPerPage) return;

      const newPage = recalculatePage(currentPage, currentPerPage, newPerPage);
      syncPerPage(setSearchParams, newPerPage, newPage);
    };

    mql.addEventListener("change", handleBreakpointChange);
    return () => mql.removeEventListener("change", handleBreakpointChange);
  }, [setSearchParams]);
};

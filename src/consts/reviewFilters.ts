/** Valid values for the sort order of reviews */
export const SORT_ORDER = {
  LATEST: "latest",
  OLDEST: "oldest",
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
// → "latest" | "oldest"

/** Default sort value */
export const DEFAULT_SORT_ORDER: SortOrder = SORT_ORDER.LATEST;

/**
 * Maps SortOrder to the display label shown in the UI.
 * Update here when display names need to change.
 */
export const SORT_MENU_LABELS: Record<SortOrder, string> = {
  [SORT_ORDER.LATEST]: "Latest",
  [SORT_ORDER.OLDEST]: "Oldest",
};

export const REVIEW_MENU_ACTIONS = {
  SHARE: "share",
  REPORT: "report",
} as const;

export type ReviewMenuAction =
  (typeof REVIEW_MENU_ACTIONS)[keyof typeof REVIEW_MENU_ACTIONS];

export const REVIEW_MENU_LABELS: Record<ReviewMenuAction, string> = {
  [REVIEW_MENU_ACTIONS.SHARE]: "Share",
  [REVIEW_MENU_ACTIONS.REPORT]: "Report",
};

export const RATING_FILTERS = [5, 4, 3, 2, 1] as const;
export type RatingFilter = (typeof RATING_FILTERS)[number];

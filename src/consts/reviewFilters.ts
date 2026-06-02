/** Các giá trị hợp lệ cho sort order của reviews */
export const SORT_ORDER = {
  LATEST: "latest",
  OLDEST: "oldest",
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
// → "latest" | "oldest"

/** Giá trị sort mặc định */
export const DEFAULT_SORT_ORDER: SortOrder = SORT_ORDER.LATEST;

/**
 * Map từ SortOrder sang label hiển thị trên UI.
 * Cập nhật tại đây khi cần đổi tên hiển thị.
 */
export const SORT_MENU_LABELS: Record<SortOrder, string> = {
  [SORT_ORDER.LATEST]: "Latest",
  [SORT_ORDER.OLDEST]: "Oldest",
};

export const RATING_FILTERS = [5, 4, 3, 2, 1] as const;
export type RatingFilter = (typeof RATING_FILTERS)[number];

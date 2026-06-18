export const DEFAULT_CURRENCY = "USD";

export const TOAST_DEFAULT_DURATION = 3000;

export const DEFAULT_SLIDER_DURATION = 4000;

export const MAX_PER_ITEM = 10;
export const MAX_TOTAL_QUANTITY = 50;

export const OTP_LENGTH = 6;
export const OTP_COOLDOWN_SECONDS = 60;

/** JS-side mirror of the `$breakpoint-lg` SCSS variable (992px). Used for matchMedia listeners. */
export const BREAKPOINT_LG_PX = 992;

/** JS-side mirror of the `$bp-md` SCSS variable (768px). Used for responsive pagination. */
export const BREAKPOINT_MD_PX = 768;

// ─── Category page pagination ────────────────────────────────────────────────
/** Desktop (> 768px): 3 columns × 3 rows */
export const CATEGORY_PER_PAGE_DESKTOP = 9;
/** Mobile (≤ 768px): 2 columns × 3 rows */
export const CATEGORY_PER_PAGE_MOBILE = 6;

// ─── Price range slider ──────────────────────────────────────────────────────
/** Minimum value for the price range filter slider. */
export const PRICE_RANGE_MIN = 0;
/** Maximum value for the price range filter slider. */
export const PRICE_RANGE_MAX = 200;

/** Pixel tolerance for detecting scroll start/end boundaries in the slider. */
export const SLIDER_SCROLL_THRESHOLD_PX = 10;

// ─── Home page data limits ────────────────────────────────────────────────────
/** Number of products shown per collection row on the Home page. */
export const HOME_PRODUCTS_PER_PAGE = 4;
/** Number of reviews shown in the Home page feedback section. */
export const HOME_REVIEWS_LIMIT = 8;

// ─── Product Detail page data limits ─────────────────────────────────────────
/** Number of related products fetched on the Product Detail page. */
export const PRODUCT_DETAIL_RELATED_PER_PAGE = 8;
/** Number of reviews loaded per batch on the Product Detail page. */
export const PRODUCT_DETAIL_REVIEWS_LIMIT = 6;
/** Number of review skeleton cards shown while loading. */
export const PRODUCT_REVIEWS_SKELETON_COUNT = 6;

// ─── Rating ───────────────────────────────────────────────────────────────────
/** Maximum star rating value. Shared between WriteReviewModal and rating filters. */
export const MAX_STAR_RATING = 5;

// ─── Field length constraints ─────────────────────────────────────────────────
export const FIELD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 50,
  EMAIL_MAX: 255,
  ADDRESS_MIN: 10,
  ADDRESS_MAX: 500,
  PHONE_MAX: 10,
  REVIEW_MIN: 10,
  REVIEW_MAX: 500,
} as const;

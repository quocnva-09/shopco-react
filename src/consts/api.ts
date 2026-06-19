export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  PRODUCT_REVIEWS: (id: number) => `/products/${id}/reviews`,
  REVIEWS: "/reviews",
  GUEST_REVIEWS: "/guest/reviews",
  CHECKOUT: "/guest/orders/checkout",
  VERIFY_OTP: (id: number) => `/guest/orders/${id}/verify-otp`,
  RESEND_OTP: (id: number) => `/guest/orders/${id}/resend-otp`,
  CATEGORIES: "/categories",
  COLORS: "/colors",
  SIZES: "/sizes",
  STYLES: "/styles",

  //LINK TO CATEGORY
  LINK_TO_CATEGORY: "category",
  LINK_TO_NEW_ARRIVALS: "category?sort_by=newest",
  LINK_TO_TOP_SELLINGS: "category?sort_by=popular",
  LINK_TO_CATEGORY_SLUG: (category_slug: string) =>
    `category?category_slug=${category_slug}`,
  LINK_TO_STYLE_SLUG: (style_slug: string) =>
    `category?style_slugs=${style_slug}`,
};

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
};

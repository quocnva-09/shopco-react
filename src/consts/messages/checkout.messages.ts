export const CHECKOUT_MESSAGES = {
  TITLE: "CHECKOUT ORDER",
  SHOPPING_CART: "Shopping Cart",
  SHIPPING_DETAILS: "Shipping Details",
  PAYMENT_METHOD: "Payment Method",
  ORDER_SUMMARY: "Order Summary",
  PLACE_ORDER: "Place Order",
  PLACING_ORDER: "Placing Order...",
  CASH_ON_DELIVERY: "Cash on Delivery",
  PLACEHOLDERS: {
    FULL_NAME: "Enter your fullname",
    EMAIL: "Enter your email order confirmation",
    ADDRESS: "Enter your address",
    PHONE_NUMBER: "Enter your phone number",
  },
  LABELS: {
    FULL_NAME: "Full Name",
    EMAIL: "Email Address",
    ADDRESS: "Address",
    PHONE_NUMBER: "Phone Number",
  },
  ERROR_MESSAGES: {
    FULL_NAME_REQUIRED: "Full name is required",
    FULL_NAME_MIN: "Full name must be at least 2 characters",
    FULL_NAME_INVALID: "Full name can only contain letters and spaces",
    FULL_NAME_MAX: "Full name must be at most 50 characters",
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Invalid email address",
    EMAIL_MAX: "Email must be at most 255 characters",
    ADDRESS_REQUIRED: "Address is required",
    ADDRESS_MIN: "Address must be at least 10 characters",
    ADDRESS_INVALID: "Address contains invalid characters",
    ADDRESS_MAX: "Address must be at most 500 characters",
    PHONE_NUMBER_REQUIRED: "Phone number is required",
    PHONE_NUMBER_INVALID: "Invalid phone number",
    PHONE_NUMBER_MAX: "Phone number must be at most 10 characters",
  },
};

export const CHECKOUT_API_MESSAGES = {
  ORDER_SUCCESS: "Order placed successfully!",
  ORDER_ERROR: "Failed to place order. Please try again.",
};

export const ORDER_SUCCESS_MESSAGES = {
  IMAGE_ALT: "Order placed successfully illustration",
  TITLE: "Thank You for Your Order!",
  DESCRIPTION: (orderId: number) =>
    `Your order #${orderId} has been placed and is being processed.`,
  CTA: "Continue Shopping",
};

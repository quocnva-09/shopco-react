export const TOAST_MESSAGES = {
  PRODUCT_ADDED_TO_CART: ({ productName }: { productName: string }) =>
    `${productName} added to cart`,
  PRODUCT_UPDATED_TO_CART: ({ productName }: { productName: string }) =>
    `${productName} updated successfully`,
  PRODUCT_REMOVED_FROM_CART: ({ productName }: { productName: string }) =>
    `${productName} removed successfully`,
};

export const CONFIRM_MESSAGES = {
  DEFAULT_TITLE: "Confirm Action",
  DEFAULT_MESSAGE: "Are you sure you want to perform this action?",
  DELETE_REVIEW_TITLE: "Delete Review",
  DELETE_REVIEW_MESSAGE:
    "Are you sure you want to delete this review? This action cannot be undone.",
};

export const CHECKOUT_MESSAGES = {
  TITLE: "CHECKOUT YOUR ORDER",
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
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Invalid email address",
    ADDRESS_REQUIRED: "Address is required",
    ADDRESS_MIN: "Address must be at least 10 characters",
    ADDRESS_INVALID: "Address contains invalid characters",
    PHONE_NUMBER_REQUIRED: "Phone number is required",
    PHONE_NUMBER_INVALID: "Invalid phone number",
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

export const WRITE_REVIEW_MESSAGES = {
  TITLE: "Write a Review",
  LABELS: {
    ORDER_ID: "Order ID",
    GUEST_NAME: "Guest Name",
    GUEST_EMAIL: "Guest Email",
    RATING: "Rating",
    REVIEW: "Your Review",
  },
  PLACEHOLDERS: {
    ORDER_ID: "Enter order ID",
    GUEST_NAME: "Your Name",
    GUEST_EMAIL: "guest@example.com",
    RATING: "Select a rating...",
    REVIEW: "Tell us what you think...",
  },
  BUTTONS: {
    CANCEL: "Cancel",
    SUBMIT: "Submit Review",
  },
  ERRORS: {
    ORDER_ID_REQUIRED: "Order ID is required",
    ORDER_ID_INVALID: "Order ID must be a positive number",
    GUEST_NAME_REQUIRED: "Guest name is required",
    GUEST_NAME_INVALID: "Guest name can only contain letters and spaces",
    GUEST_EMAIL_REQUIRED: "Guest email is required",
    GUEST_EMAIL_INVALID: "Invalid email address",
    RATING_REQUIRED: "Please select a rating",
    REVIEW_REQUIRED: "Please write a review",
    REVIEW_MIN: "Review must be at least 10 characters",
  },
};

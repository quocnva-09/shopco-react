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
    GUEST_NAME_MAX: "Guest name must be at most 50 characters",
    GUEST_EMAIL_REQUIRED: "Guest email is required",
    GUEST_EMAIL_INVALID: "Invalid email address",
    GUEST_EMAIL_MAX: "Guest email must be at most 255 characters",
    RATING_REQUIRED: "Please select a rating",
    REVIEW_REQUIRED: "Please write a review",
    REVIEW_MIN: "Review must be at least 10 characters",
    REVIEW_MAX: "Review must be at most 500 characters",
  },
};

export const WRITE_REVIEW_API_MESSAGES = {
  SUBMIT_SUCCESS: "Thank you! Your review has been submitted.",
  SUBMIT_ERROR: "Failed to submit review. Please try again.",
};

export const PRODUCT_REVIEWS_MESSAGES = {
  EMPTY: "No reviews found.",
} as const;

import { WRITE_REVIEW_MESSAGES } from "@/consts/messages";

export const writeReviewValidationRules = {
  orderId: {
    required: WRITE_REVIEW_MESSAGES.ERRORS.ORDER_ID_REQUIRED,
    min: {
      value: 1,
      message: WRITE_REVIEW_MESSAGES.ERRORS.ORDER_ID_INVALID,
    },
  },
  guestName: {
    required: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_NAME_REQUIRED,
    pattern: {
      value: /^[\p{L}\s]+$/u,
      message: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_NAME_INVALID,
    },
    maxLength: {
      value: 50,
      message: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_NAME_MAX,
    },
  },
  guestEmail: {
    required: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_EMAIL_REQUIRED,
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_EMAIL_INVALID,
    },
    maxLength: {
      value: 255,
      message: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_EMAIL_MAX,
    },
  },
  comment: {
    required: WRITE_REVIEW_MESSAGES.ERRORS.REVIEW_REQUIRED,
    minLength: {
      value: 10,
      message: WRITE_REVIEW_MESSAGES.ERRORS.REVIEW_MIN,
    },
    maxLength: {
      value: 500,
      message: WRITE_REVIEW_MESSAGES.ERRORS.REVIEW_MAX,
    },
  },
};

import { WRITE_REVIEW_MESSAGES } from "@/consts/messages";
import { VALIDATION_PATTERNS } from "@/utils/validationPatterns";
import { FIELD_LIMITS } from "@/consts/config";

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
      value: VALIDATION_PATTERNS.fullName,
      message: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_NAME_INVALID,
    },
    maxLength: {
      value: FIELD_LIMITS.NAME_MAX,
      message: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_NAME_MAX,
    },
  },
  guestEmail: {
    required: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_EMAIL_REQUIRED,
    pattern: {
      value: VALIDATION_PATTERNS.email,
      message: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_EMAIL_INVALID,
    },
    maxLength: {
      value: FIELD_LIMITS.EMAIL_MAX,
      message: WRITE_REVIEW_MESSAGES.ERRORS.GUEST_EMAIL_MAX,
    },
  },
  comment: {
    required: WRITE_REVIEW_MESSAGES.ERRORS.REVIEW_REQUIRED,
    minLength: {
      value: FIELD_LIMITS.REVIEW_MIN,
      message: WRITE_REVIEW_MESSAGES.ERRORS.REVIEW_MIN,
    },
    maxLength: {
      value: FIELD_LIMITS.REVIEW_MAX,
      message: WRITE_REVIEW_MESSAGES.ERRORS.REVIEW_MAX,
    },
  },
};

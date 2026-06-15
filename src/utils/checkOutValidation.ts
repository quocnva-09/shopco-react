import { CHECKOUT_MESSAGES } from "@/consts/messages";
import { VALIDATION_PATTERNS } from "@/utils/validationPatterns";
import { FIELD_LIMITS } from "@/consts/config";

export const checkoutValidationRules = {
  fullName: {
    required: CHECKOUT_MESSAGES.ERROR_MESSAGES.FULL_NAME_REQUIRED,
    minLength: {
      value: FIELD_LIMITS.NAME_MIN,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.FULL_NAME_MIN,
    },
    pattern: {
      value: VALIDATION_PATTERNS.fullName,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.FULL_NAME_INVALID,
    },
    maxLength: {
      value: FIELD_LIMITS.NAME_MAX,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.FULL_NAME_MAX,
    },
  },
  email: {
    required: CHECKOUT_MESSAGES.ERROR_MESSAGES.EMAIL_REQUIRED,
    pattern: {
      value: VALIDATION_PATTERNS.email,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.EMAIL_INVALID,
    },
    maxLength: {
      value: FIELD_LIMITS.EMAIL_MAX,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.EMAIL_MAX,
    },
  },
  address: {
    required: CHECKOUT_MESSAGES.ERROR_MESSAGES.ADDRESS_REQUIRED,
    minLength: {
      value: FIELD_LIMITS.ADDRESS_MIN,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.ADDRESS_MIN,
    },
    pattern: {
      value: VALIDATION_PATTERNS.address,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.ADDRESS_INVALID,
    },
    maxLength: {
      value: FIELD_LIMITS.ADDRESS_MAX,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.ADDRESS_MAX,
    },
  },
  phoneNumber: {
    required: CHECKOUT_MESSAGES.ERROR_MESSAGES.PHONE_NUMBER_REQUIRED,
    pattern: {
      value: VALIDATION_PATTERNS.phoneVN,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.PHONE_NUMBER_INVALID,
    },
    maxLength: {
      value: FIELD_LIMITS.PHONE_MAX,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.PHONE_NUMBER_MAX,
    },
  },
};

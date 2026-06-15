import { CHECKOUT_MESSAGES } from "@/consts/messages";
import { VALIDATION_PATTERNS } from "@/utils/validationPatterns";

export const checkoutValidationRules = {
  fullName: {
    required: CHECKOUT_MESSAGES.ERROR_MESSAGES.FULL_NAME_REQUIRED,
    minLength: {
      value: 2,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.FULL_NAME_MIN,
    },
    pattern: {
      value: VALIDATION_PATTERNS.fullName,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.FULL_NAME_INVALID,
    },
    maxLength: {
      value: 50,
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
      value: 255,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.EMAIL_MAX,
    },
  },
  address: {
    required: CHECKOUT_MESSAGES.ERROR_MESSAGES.ADDRESS_REQUIRED,
    minLength: {
      value: 10,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.ADDRESS_MIN,
    },
    pattern: {
      value: VALIDATION_PATTERNS.address,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.ADDRESS_INVALID,
    },
    maxLength: {
      value: 500,
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
      value: 10,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.PHONE_NUMBER_MAX,
    },
  },
};

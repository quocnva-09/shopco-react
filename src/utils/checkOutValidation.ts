import { CHECKOUT_MESSAGES } from "@/consts/messages";

export const checkoutValidationRules = {
  fullName: {
    required: CHECKOUT_MESSAGES.ERROR_MESSAGES.FULL_NAME_REQUIRED,
    minLength: {
      value: 2,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.FULL_NAME_MIN,
    },
    pattern: {
      value: /^[\p{L}\s]+$/u,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.FULL_NAME_INVALID,
    },
  },
  email: {
    required: CHECKOUT_MESSAGES.ERROR_MESSAGES.EMAIL_REQUIRED,
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.EMAIL_INVALID,
    },
  },
  address: {
    required: CHECKOUT_MESSAGES.ERROR_MESSAGES.ADDRESS_REQUIRED,
    minLength: {
      value: 10,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.ADDRESS_MIN,
    },
    pattern: {
      value: /^[\p{L}0-9\s,.\-/]+$/u,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.ADDRESS_INVALID,
    },
  },
  phoneNumber: {
    required: CHECKOUT_MESSAGES.ERROR_MESSAGES.PHONE_NUMBER_REQUIRED,
    pattern: {
      value: /^\+?[0-9\s\-\(\)]+$/,
      message: CHECKOUT_MESSAGES.ERROR_MESSAGES.PHONE_NUMBER_INVALID,
    },
  },
};

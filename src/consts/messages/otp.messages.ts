export const VERIFY_OTP_MESSAGES = {
  TITLE: "Verify Your Order",
  SUBTITLE:
    "We've sent a 6-digit one-time password to your email. Please enter it below to confirm your order.",
  LABELS: {
    OTP_INPUT: "One-Time Password",
  },
  BUTTONS: {
    VERIFY: "Verify Order",
    VERIFYING: "Verifying...",
    RESEND: "Resend OTP",
    RESEND_IN: (seconds: number) => `Resend in ${seconds}s`,
  },
  ERRORS: {
    INVALID_OTP: "Invalid OTP. Please try again.",
    REQUIRED: "Please enter the 6-digit OTP.",
    EXPIRED: "This OTP has expired. Please request a new one.",
  },
  SUCCESS: {
    VERIFIED: "Order verified successfully!",
    RESENT: "A new OTP has been sent to your email.",
  },
};

export const VERIFY_OTP_API_MESSAGES = {
  VERIFY_SUCCESS: "OTP verified successfully.",
  VERIFY_ERROR: "Invalid or expired OTP. Please try again.",
  RESEND_SUCCESS: "OTP resent successfully to your email.",
  RESEND_ERROR: "Failed to resend OTP. Order may already be verified.",
};

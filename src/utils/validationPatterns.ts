/**
 * Shared validation regex patterns used across form validation rule sets.
 * Import from here instead of duplicating regexes in each validation file.
 */
export const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
  phoneVN: /^\+?[0-9\s\-\(\)]+$/,
  fullName: /^[\p{L}\s]+$/u,
  address: /^[\p{L}0-9\s,.\-/]+$/u,
} as const;

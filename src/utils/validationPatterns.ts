/**
 * Shared validation regex patterns used across form validation rule sets.
 * Import from here instead of duplicating regexes in each validation file.
 */
export const VALIDATION_PATTERNS = {
  email: /\S+@\S+\.\S+/,
  phoneVN: /^\+?[0-9\s\-\(\)]+$/,
  fullName: /^[\p{L}\s]+$/u,
  address: /^[\p{L}0-9\s,.\-/]+$/u,
} as const;

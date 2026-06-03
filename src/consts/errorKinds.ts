// src/consts/errorKinds.ts
// Classifies API/network errors for retry-gating and UI differentiation.

export const ERROR_KIND = {
  /** No network or DNS failure — user should check connectivity. */
  NETWORK: "network",
  /** Request exceeded timeout threshold — server too slow, retry may help. */
  TIMEOUT: "timeout",
  /** HTTP 5xx — server-side failure, retry may succeed. */
  SERVER: "server",
  /** HTTP 400 / 422 — bad input, retry without change will always fail. */
  VALIDATION: "validation",
  /** HTTP 404 — resource does not exist. */
  NOT_FOUND: "not_found",
  /** HTTP 401 / 403 — authentication or authorization failure. */
  AUTH: "auth",
  /** Catch-all for unclassified errors, treated as retryable. */
  UNKNOWN: "unknown",
} as const;

export type ErrorKind = (typeof ERROR_KIND)[keyof typeof ERROR_KIND];

/** Returns true when retrying the same request could succeed. */
export const isRetryableErrorKind = (kind: ErrorKind): boolean => {
  const NON_RETRYABLE: ErrorKind[] = [
    ERROR_KIND.VALIDATION,
    ERROR_KIND.NOT_FOUND,
    ERROR_KIND.AUTH,
  ];
  return !NON_RETRYABLE.includes(kind);
};

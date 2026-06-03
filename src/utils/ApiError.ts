import type { ErrorKind } from "@/consts/errorKinds";

export interface ApiErrorOptions {
  message: string;
  uiMessage: string;
  status?: number;
  kind: ErrorKind;
  validationErrors?: Record<string, string[]>;
}

export class ApiError extends Error {
  /** Type guard — lets callers distinguish ApiError from generic Error. */
  readonly isApiError = true as const;

  /** HTTP status code (undefined for network/timeout errors). */
  readonly status: number | undefined;

  /** Human-readable message suitable for displaying in the UI. */
  readonly uiMessage: string;

  /** Semantic error kind used for retry-gating and UI branching. */
  readonly kind: ErrorKind;

  /**
   * Per-field validation errors extracted from a 422 response.
   * Keys are field names; values are arrays of error messages.
   */
  readonly validationErrors: Record<string, string[]> | undefined;

  constructor({
    message,
    uiMessage,
    status,
    kind,
    validationErrors,
  }: ApiErrorOptions) {
    super(message);
    this.name = "ApiError";
    this.uiMessage = uiMessage;
    this.status = status;
    this.kind = kind;
    this.validationErrors = validationErrors;
  }
}

/** Runtime type guard. */
export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError && error.isApiError === true;

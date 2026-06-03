// src/utils/errorHandler.ts

import axios, { type AxiosError } from "axios";
import {
  API_ERROR_MESSAGES,
  DEFAULT_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
  TIMEOUT_ERROR_MESSAGE,
  HTTP_STATUS,
} from "@/consts/errorCodes";
import { ERROR_KIND, type ErrorKind } from "@/consts/errorKinds";
import { ApiError } from "@/utils/ApiError";
import type { ErrorResponse } from "@/types/api/api";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const extractValidationErrors = (
  data: ErrorResponse,
): Record<string, string[]> | undefined => {
  if (!data.errors || Object.keys(data.errors).length === 0) return undefined;
  return data.errors;
};

const getFirstValidationMessage = (errors: Record<string, string[]>): string => {
  const firstKey = Object.keys(errors)[0];
  return errors[firstKey]?.[0] ?? DEFAULT_ERROR_MESSAGE;
};

// ---------------------------------------------------------------------------
// Core: map AxiosError → ApiError
// ---------------------------------------------------------------------------

/**
 * Converts any caught error into a structured `ApiError`.
 *
 * Called exclusively by the Axios response interceptor — callers throughout
 * the rest of the codebase should never need to inspect raw `AxiosError`.
 */
export const normalizeError = (error: unknown): ApiError => {
  // Already normalized — pass through.
  if (error instanceof ApiError) return error;

  if (!axios.isAxiosError(error)) {
    // Generic JS error (e.g. TypeError, SyntaxError).
    const message =
      error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
    return new ApiError({
      message,
      uiMessage: DEFAULT_ERROR_MESSAGE,
      kind: ERROR_KIND.UNKNOWN,
    });
  }

  const axiosError = error as AxiosError<ErrorResponse>;

  // --- No HTTP response: timeout or offline ---
  if (!axiosError.response) {
    const isTimeout = axiosError.code === "ECONNABORTED";
    return new ApiError({
      message: axiosError.message,
      uiMessage: isTimeout ? TIMEOUT_ERROR_MESSAGE : NETWORK_ERROR_MESSAGE,
      kind: isTimeout ? ERROR_KIND.TIMEOUT : ERROR_KIND.NETWORK,
    });
  }

  // --- HTTP response received ---
  const { status, data } = axiosError.response;
  const kind = resolveErrorKind(status);
  const validationErrors =
    status === HTTP_STATUS.UNPROCESSABLE_ENTITY
      ? extractValidationErrors(data)
      : undefined;

  // UI message priority: first validation field → backend message → status map → fallback
  let uiMessage: string;
  if (validationErrors) {
    uiMessage = getFirstValidationMessage(validationErrors);
  } else if (data?.message) {
    uiMessage = data.message;
  } else {
    uiMessage = API_ERROR_MESSAGES[status] ?? DEFAULT_ERROR_MESSAGE;
  }

  return new ApiError({
    message: axiosError.message,
    uiMessage,
    status,
    kind,
    validationErrors,
  });
};

// ---------------------------------------------------------------------------
// ErrorKind resolver
// ---------------------------------------------------------------------------

const resolveErrorKind = (status: number): ErrorKind => {
  if (status === HTTP_STATUS.UNAUTHORIZED || status === HTTP_STATUS.FORBIDDEN)
    return ERROR_KIND.AUTH;
  if (status === HTTP_STATUS.NOT_FOUND) return ERROR_KIND.NOT_FOUND;
  if (
    status === HTTP_STATUS.BAD_REQUEST ||
    status === HTTP_STATUS.UNPROCESSABLE_ENTITY
  )
    return ERROR_KIND.VALIDATION;
  if (status >= 500) return ERROR_KIND.SERVER;
  return ERROR_KIND.UNKNOWN;
};

// ---------------------------------------------------------------------------
// Legacy helper — kept for backward compatibility during migration
// ---------------------------------------------------------------------------

/**
 * @deprecated Use `normalizeError()` via the Axios interceptor instead.
 * Returns a plain string message from any error — does NOT produce an ApiError.
 */
export const extractErrorMessage = (error: unknown): string => {
  return normalizeError(error).uiMessage;
};

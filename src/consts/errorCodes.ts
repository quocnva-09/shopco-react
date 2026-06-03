export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const API_ERROR_MESSAGES: Record<number, string> = {
  [HTTP_STATUS.BAD_REQUEST]: "Invalid request.",
  [HTTP_STATUS.UNAUTHORIZED]: "Session expired. Please log in again.",
  [HTTP_STATUS.FORBIDDEN]: "You do not have permission to perform this action.",
  [HTTP_STATUS.NOT_FOUND]: "Requested resource not found.",
  [HTTP_STATUS.METHOD_NOT_ALLOWED]: "This action is not allowed.",
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: "Invalid input data.",
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]:
    "Internal server error. Please try again later.",
};

export const DEFAULT_ERROR_MESSAGE = "An unknown error occurred.";
export const NETWORK_ERROR_MESSAGE =
  "Cannot connect to the server. Please check your network connection.";
export const TIMEOUT_ERROR_MESSAGE =
  "Request timed out. The server is taking too long to respond. Please try again.";

export interface LinkData {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface MetaData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginationResponse<T> {
  status: number;
  message: string;
  data: T[];
  links: LinkData;
  meta: MetaData;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ErrorResponse {
  /** HTTP status code (400 | 401 | 403 | 404 | 405 | 422 | 500). */
  status: number;
  message: string;
  /** Per-field validation errors. Present only on 422 Unprocessable Entity responses. */
  errors?: Record<string, string[]>;
}

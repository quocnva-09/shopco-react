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
  status: number;
  message: string;
  error: unknown;
}
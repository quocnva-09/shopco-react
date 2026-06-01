import type { PaginationResponse, ApiResponse } from "./api";

export interface CategoryApi {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryParams {
  search?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_dir?: "asc" | "desc";
}

export interface CategoryListResponse extends PaginationResponse<CategoryApi> {}

export interface CategoryResponse extends ApiResponse<CategoryApi> {}

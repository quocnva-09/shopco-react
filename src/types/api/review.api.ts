import type { PaginationResponse, ApiResponse } from "./api";

export interface ReviewApi {
  id: number;
  user_id: number;
  user_name: string;
  product_id: number;
  order_item_id: number;
  rating: number;
  comment: string;
  is_approved: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewParams {
  keyword?: string;
  sort_by?: "id" | "created_at" | "rating";
  sort_direction?: "asc" | "desc";
  limit?: number;
  is_approved?: boolean;
}

export interface ReviewListResponse extends PaginationResponse<ReviewApi> {}

export interface ReviewResponse extends ApiResponse<ReviewApi> {}

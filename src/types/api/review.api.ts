import type { PaginationResponse, ApiResponse } from "./api";

export interface ReviewApi {
  id: number;
  user_id: number | null;
  reviewer_name: string;
  is_guest: boolean;
  guest_name: string | null;
  guest_email: string | null;
  product_id: number;
  order_item_id: number | null;
  rating: number;
  comment: string;
  is_approved: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewParams {
  product_id?: number;
  keyword?: string;
  rating?: number;
  sort_by?: "id" | "created_at" | "rating";
  sort_dir?: "asc" | "desc";
  limit?: number;
  is_approved?: boolean;
}

export interface ReviewListResponse extends PaginationResponse<ReviewApi> {}

export interface ReviewResponse extends ApiResponse<ReviewApi> {}

// Request body for submitting a guest review
export interface WriteReviewRequest {
  order_id: number;
  product_id: number;
  rating: number;
  comment: string;
  guest_name: string;
  guest_email: string;
}

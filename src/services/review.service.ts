import { get, post } from "@/lib/axiosClient";
import type {
  ReviewListResponse,
  ReviewParams,
  ReviewResponse,
  WriteReviewRequest,
} from "@/types/api/review.api";

export const ReviewService = {
  async getReviews(params?: ReviewParams) {
    return get<ReviewListResponse>(`/reviews`, { params });
  },

  async getReviewsByProductId(productId: number, params?: ReviewParams) {
    return get<ReviewListResponse>(`/products/${productId}/reviews`, {
      params,
    });
  },

  async submitReview(payload: WriteReviewRequest): Promise<ReviewResponse> {
    return post<ReviewResponse>("/guest/reviews", payload);
  },
};

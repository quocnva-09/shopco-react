import { get } from "@/lib/axios";
import type { ReviewListResponse, ReviewParams } from "@/types/api/review.api";

export const ReviewService = {
  async getReviews(params?: ReviewParams) {
    return get<ReviewListResponse>(`/reviews`, { params });
  },

  async getReviewsByProductId(productId: number, params?: ReviewParams) {
    return get<ReviewListResponse>(`/products/${productId}/reviews`, {
      params,
    });
  },
};

import { get, post } from "@/lib/axiosClient";
import type {
  ReviewListResponse,
  ReviewParams,
  ReviewResponse,
  WriteReviewRequest,
} from "@/types/api/review.api";
import { API_ENDPOINTS } from "@/consts/api";

export const ReviewService = {
  async getReviews(params?: ReviewParams) {
    return get<ReviewListResponse>(API_ENDPOINTS.REVIEWS, { params });
  },

  async getReviewsByProductId(productId: number, params?: ReviewParams) {
    return get<ReviewListResponse>(API_ENDPOINTS.PRODUCT_REVIEWS(productId), {
      params,
    });
  },

  async submitReview(payload: WriteReviewRequest): Promise<ReviewResponse> {
    return post<ReviewResponse>(API_ENDPOINTS.GUEST_REVIEWS, payload);
  },
};

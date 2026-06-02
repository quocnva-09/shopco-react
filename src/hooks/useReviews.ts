import { ReviewService } from "@/services/review.service";
import type { ReviewParams } from "@/types/api/review.api";
import type { ReviewData } from "@/types/review";
import { mapReviewData } from "@/utils/mappers/review.mapper";
import { useEffect, useState } from "react";

export const useReviews = (params: ReviewParams) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await ReviewService.getReviews(params);
        const mappedData = response.data.map(mapReviewData);
        setReviews(mappedData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [JSON.stringify(params)]);

  return { reviews, isLoading };
};

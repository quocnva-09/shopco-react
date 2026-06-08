import type { ReviewApi } from "@/types/api/review.api";
import type { ReviewData } from "@/types/review";

export const mapReviewData = (apiReview: ReviewApi): ReviewData => {
  const dateObj = new Date(apiReview.created_at);
  
  // Format to match UI mockup: "on August 14, 2025"
  const formattedDate = `on ${dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;

  return {
    id: apiReview.id,
    name: apiReview.reviewer_name || "Anonymous User",
    rating: apiReview.rating,
    comment: apiReview.comment,
    date: formattedDate,
    isVerified: apiReview.is_verified,
    createdAt: apiReview.created_at,
    updatedAt: apiReview.updated_at,
  };
};

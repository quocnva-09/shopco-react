import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { ReviewCard } from "@/components/molecules/ReviewCard/ReviewCard";
import type { ReviewData } from "@/types/review";
import { ReviewsHeader } from "@/components/molecules/ReviewsHeader";
import { Button } from "@/components/atoms/Button";
import type { SortOrder, RatingFilter } from "@/consts/reviewFilters";
import "./ProductReviewsPanel.scss";

export type ProductReviewsPanelProps = ComponentPropsWithoutRef<"section"> & {
  reviews: ReviewData[];
  reviewCount: number;
  sortOrder?: SortOrder;
  onSortChange?: (order: SortOrder) => void;
  ratingFilter?: RatingFilter | null;
  onRatingFilterChange?: (rating: RatingFilter | null) => void;
};

export const ProductReviewsPanel = ({
  reviews,
  reviewCount,
  sortOrder,
  onSortChange,
  ratingFilter,
  onRatingFilterChange,
  className,
  ...rest
}: ProductReviewsPanelProps) => {
  return (
    <section className={clsx("tab-content", "reviews", className)} {...rest}>
      <ReviewsHeader
        reviewCount={reviewCount}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
        ratingFilter={ratingFilter}
        onRatingFilterChange={onRatingFilterChange}
      />

      <div className="reviews__grid">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} showMenu />
        ))}
      </div>

      <Button variant="outline" className="btn--load-more">
        Load More Reviews
      </Button>
    </section>
  );
};

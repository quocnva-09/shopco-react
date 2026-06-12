import {
  useCallback,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import clsx from "clsx";
import { ReviewCard } from "@/components/molecules/ReviewCard";
import { ReviewCardSkeleton } from "@/components/molecules/ReviewCardSkeleton";
import { Text } from "@/components/atoms/Text";
import type { ReviewData } from "@/types/review";
import { ReviewsHeader } from "@/components/molecules/ReviewsHeader";
import { SectionStateWrapper } from "@/components/molecules/SectionStateWrapper";
import { Button } from "@/components/atoms/Button";
import {
  type SortOrder,
  type RatingFilter,
  SORT_ORDER,
  REVIEW_MENU_ACTIONS,
  REVIEW_MENU_LABELS,
} from "@/consts/reviewFilters";
import "./index.scss";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { MenuItem } from "@/components/molecules/MenuList";

export type ProductReviewsPanelProps = ComponentPropsWithoutRef<"section"> & {
  reviews: ReviewData[];
  reviewCount: number;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  isLoading?: boolean;
  error?: string | null;
  isRetryable?: boolean;
  onRetry?: () => void;
  onLoadMore?: () => void;
  sortOrder?: SortOrder;
  onSortChange?: (order: SortOrder) => void;
  ratingFilter?: RatingFilter | null;
  onRatingFilterChange?: (rating: RatingFilter | null) => void;
};

export const ProductReviewsPanel = ({
  reviews,
  reviewCount,
  hasMore = false,
  isLoadingMore = false,
  isLoading = false,
  error = null,
  isRetryable = false,
  onRetry,
  onLoadMore,
  sortOrder,
  onSortChange,
  ratingFilter,
  onRatingFilterChange,
  className,
  ...rest
}: ProductReviewsPanelProps) => {
  return (
    <section className={clsx("tab-content", "reviews", className)} {...rest}>
      <SectionStateWrapper
        error={error}
        isRetryable={isRetryable}
        onRetry={onRetry}
      >
        <ReviewsHeader
          reviewCount={reviewCount}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
          ratingFilter={ratingFilter}
          onRatingFilterChange={onRatingFilterChange}
        />

        {isLoading ? (
          <div className="reviews__grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <ReviewCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="reviews__grid">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showMenu />
            ))}
          </div>
        ) : (
          <Text className="reviews__empty-message">No reviews found.</Text>
        )}

        {hasMore && (
          <Button
            variant="outline"
            className="btn--load-more"
            onClick={onLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More Reviews"}
          </Button>
        )}
      </SectionStateWrapper>
    </section>
  );
};

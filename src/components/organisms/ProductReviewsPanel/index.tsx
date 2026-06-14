import { useCallback, useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { ReviewCard } from "@/components/molecules/ReviewCard";
import { ReviewCardSkeleton } from "@/components/molecules/ReviewCardSkeleton";
import { Text } from "@/components/atoms/Text";
import type { ReviewData } from "@/types/review";
import { ReviewsHeader } from "@/components/molecules/ReviewsHeader";
import { SectionStateWrapper } from "@/components/molecules/SectionStateWrapper";
import { Button } from "@/components/atoms/Button";
import { WriteReviewModal } from "@/components/organisms/WriteReviewModal";
import { ReviewService } from "@/services/review.service";
import type { WriteReviewPayload } from "@/types/payload/write-review.payload";
import { type SortOrder, type RatingFilter } from "@/consts/reviewFilters";
import { WRITE_REVIEW_API_MESSAGES } from "@/consts/messages";
import "./index.scss";

export type ProductReviewsPanelProps = ComponentPropsWithoutRef<"section"> & {
  /** Required to build the review submission payload. */
  productId: number;
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
  productId,
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
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const openWriteReview = useCallback(() => setIsWriteReviewOpen(true), []);
  const closeWriteReview = useCallback(() => setIsWriteReviewOpen(false), []);

  const handleWriteReviewSubmit = useCallback(
    async (data: WriteReviewPayload) => {
      try {
        await ReviewService.submitReview({
          order_id: data.order_id,
          product_id: data.product_id,
          rating: data.rating,
          comment: data.comment,
          guest_name: data.guest_name,
          guest_email: data.guest_email,
        });
        toast.success(WRITE_REVIEW_API_MESSAGES.SUBMIT_SUCCESS);
        closeWriteReview();
      } catch {
        toast.error(WRITE_REVIEW_API_MESSAGES.SUBMIT_ERROR);
      }
    },
    [closeWriteReview],
  );

  return (
    <>
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
            onWriteReviewClick={openWriteReview}
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

      {/* WriteReviewModal is owned here — the molecule (ReviewsHeader) only fires the open event */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={closeWriteReview}
        onSubmit={handleWriteReviewSubmit}
        productId={productId}
      />
    </>
  );
};


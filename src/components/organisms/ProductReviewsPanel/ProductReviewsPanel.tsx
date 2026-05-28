import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { ReviewCard } from "@/components/molecules/ReviewCard/ReviewCard";
import type { ReviewData } from "@/components/molecules/ReviewCard/ReviewCard";
import { ReviewsHeader } from "@/components/molecules/ReviewsHeader";
import { Button } from "@/components/atoms/Button";
import "./ProductReviewsPanel.scss";

export type ProductReviewsPanelProps = ComponentPropsWithoutRef<"section"> & {
  reviews: ReviewData[];
  reviewCount: number;
};

export const ProductReviewsPanel = ({
  reviews,
  reviewCount,
  className,
  ...rest
}: ProductReviewsPanelProps) => {
  return (
    <section className={clsx("tab-content", "reviews", className)} {...rest}>
      <ReviewsHeader reviewCount={reviewCount} />

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

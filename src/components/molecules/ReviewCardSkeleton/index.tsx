import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Skeleton } from "@/components/atoms/Skeleton";
import "./index.scss";

export type ReviewCardSkeletonProps = ComponentPropsWithoutRef<"div"> & {
  showDate?: boolean;
};

export const ReviewCardSkeleton = ({
  showDate = true,
  className,
  ...rest
}: ReviewCardSkeletonProps) => {
  return (
    <div className={clsx("review-card", "review-card--skeleton", className)} {...rest}>
      <div className="review-card__header">
        <Skeleton variant="rectangular" className="review-card__skeleton-rating" />
      </div>

      <div className="review-card__name">
        <Skeleton variant="text" className="review-card__skeleton-name" />
      </div>

      <div className="review-card__comment-skeleton">
        <Skeleton variant="text" className="review-card__skeleton-text" />
        <Skeleton variant="text" className="review-card__skeleton-text" />
        <Skeleton variant="text" className="review-card__skeleton-text" />
      </div>

      {showDate && (
        <Skeleton variant="text" className="review-card__skeleton-date" />
      )}
    </div>
  );
};

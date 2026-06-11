import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Skeleton } from "@/components/atoms/Skeleton";
import "./index.scss";

export type ProductDetailInfoSkeletonProps = ComponentPropsWithoutRef<"div">;

export const ProductDetailInfoSkeleton = ({ className, ...rest }: ProductDetailInfoSkeletonProps) => {
  return (
    <div className={clsx("product-detail__info", "product-detail__info--skeleton", className)} {...rest}>
      <Skeleton variant="text" className="product-detail__info-skeleton-title" />
      <Skeleton variant="rectangular" className="product-detail__info-skeleton-rating" />
      <Skeleton variant="rectangular" className="product-detail__info-skeleton-price" />

      <div className="product-detail__info-skeleton-desc">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="product-detail__info-skeleton-desc-last" />
      </div>

      <div className="product-detail__form">
        <div className="product-detail__variant">
          <Skeleton variant="text" className="product-detail__info-skeleton-label" />
          <div className="product-detail__info-skeleton-colors">
            <Skeleton variant="circular" className="product-detail__info-skeleton-color" />
            <Skeleton variant="circular" className="product-detail__info-skeleton-color" />
            <Skeleton variant="circular" className="product-detail__info-skeleton-color" />
          </div>
        </div>

        <div className="product-detail__variant">
          <Skeleton variant="text" className="product-detail__info-skeleton-label" />
          <div className="product-detail__info-skeleton-sizes">
            <Skeleton variant="rectangular" className="product-detail__info-skeleton-size" />
            <Skeleton variant="rectangular" className="product-detail__info-skeleton-size" />
            <Skeleton variant="rectangular" className="product-detail__info-skeleton-size" />
          </div>
        </div>

        <div className="product-detail__actions">
          <Skeleton variant="rectangular" className="product-detail__info-skeleton-qty" />
          <Skeleton variant="rectangular" className="product-detail__info-skeleton-btn" />
        </div>
      </div>
    </div>
  );
};

import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Skeleton } from "@/components/atoms/Skeleton";
import "./index.scss";

export type ProductCardSkeletonProps = ComponentPropsWithoutRef<"div"> & {
  isDetail?: boolean;
};

export const ProductCardSkeleton = ({
  isDetail = false,
  className,
  ...rest
}: ProductCardSkeletonProps) => {
  return (
    <div
      {...rest}
      className={clsx(
        "product-card",
        "product-card--skeleton",
        isDetail && "product-card--detail",
        className
      )}
    >
      <figure className="product-card__image">
        <Skeleton variant="rectangular" className="product-card__skeleton-img" />
      </figure>

      <Skeleton
        variant="text"
        className={clsx("product-card__name", "product-card__skeleton-name")}
      />

      <Skeleton
        variant="text"
        className={clsx("product-card__rating", "product-card__skeleton-rating")}
      />

      <Skeleton
        variant="rectangular"
        className={clsx("product-card__price", "product-card__skeleton-price")}
      />
    </div>
  );
};

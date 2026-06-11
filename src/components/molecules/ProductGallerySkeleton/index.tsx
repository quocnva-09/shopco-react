import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Skeleton } from "@/components/atoms/Skeleton";
import "./index.scss";

export type ProductGallerySkeletonProps = ComponentPropsWithoutRef<"figure">;

export const ProductGallerySkeleton = ({
  className,
  ...rest
}: ProductGallerySkeletonProps) => {
  return (
    <div
      className={clsx(
        "product-detail__gallery",
        "product-detail__gallery--skeleton",
        className,
      )}
      {...rest}
    >
      <div className="product-detail__thumbnails">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton
            key={`thumbnail-skeleton-${idx}`}
            variant="rectangular"
            className="product-detail__thumbnail-skeleton"
          />
        ))}
      </div>
      <figure className="product-detail__main-image-skeleton-wrapper">
        <Skeleton
          variant="rectangular"
          className="product-detail__main-image-skeleton"
        />
      </figure>
    </div>
  );
};

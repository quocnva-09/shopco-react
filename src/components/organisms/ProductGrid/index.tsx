import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { ProductCardSkeleton } from "@/components/molecules/ProductCardSkeleton";
import "./index.scss";

export type ProductGridProps = ComponentPropsWithoutRef<"div">;

export const ProductGrid = ({
  className,
  children,
  ...rest
}: ProductGridProps) => {
  return (
    <div className={clsx("product-grid", className)} {...rest}>
      {children}
    </div>
  );
};

export type ProductGridSkeletonProps = ComponentPropsWithoutRef<"div"> & {
  count?: number;
};

export const ProductGridSkeleton = ({
  count = 9,
  className,
  ...rest
}: ProductGridSkeletonProps) => {
  return (
    <ProductGrid className={className} {...rest}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </ProductGrid>
  );
};

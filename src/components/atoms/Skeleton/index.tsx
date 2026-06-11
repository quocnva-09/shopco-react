import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import "./index.scss";

export type SkeletonVariant = "circular" | "rectangular" | "text";

export type SkeletonProps = ComponentPropsWithoutRef<"div"> & {
  variant?: SkeletonVariant;
};

export const Skeleton = ({
  variant = "text",
  className,
  ...rest
}: SkeletonProps) => {
  return (
    <div
      {...rest}
      className={clsx(
        "skeleton",
        `skeleton--${variant}`,
        className
      )}
    />
  );
};

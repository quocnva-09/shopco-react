import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
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

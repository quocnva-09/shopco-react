import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { SortSelector, type SortOption } from "@/components/molecules/SortSelector";
import "./index.scss";

export type ProductGridHeaderProps = ComponentPropsWithoutRef<"header"> & {
  title: string;
  showingStart: number;
  showingEnd: number;
  totalProducts: number;
  sortOptions: SortOption[];
  sortValue?: string;
  onSortChange?: (id: string) => void;
};

export const ProductGridHeader = ({
  title,
  showingStart,
  showingEnd,
  totalProducts,
  sortOptions,
  sortValue,
  onSortChange,
  className,
  ...rest
}: ProductGridHeaderProps) => {
  return (
    <header className={clsx("product-grid-header", className)} {...rest}>
      <Heading as="h1" className="product-grid-header__title">
        {title}
      </Heading>

      <div className="product-grid-header__controls">
        <span className="product-grid-header__showing-text">
          Showing {showingStart}-{showingEnd} of {totalProducts} Products
        </span>
        <SortSelector
          className="product-grid-header__sort"
          options={sortOptions}
          value={sortValue}
          onChange={onSortChange}
        />
      </div>
    </header>
  );
};

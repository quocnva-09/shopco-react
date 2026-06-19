import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { PaginationItem } from "@/components/molecules/PaginationItem";
import "./index.scss";

export type PaginationBoxProps = ComponentPropsWithoutRef<"nav"> & {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const generatePaginationRange = (
  current: number,
  total: number,
  maxLength: 5 | 7,
) => {
  if (total <= maxLength) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (maxLength === 5) {
    if (current <= 2) {
      return [1, 2, "...", total - 1, total];
    }
    if (current >= total - 1) {
      return [1, 2, "...", total - 1, total];
    }
    return [1, "...", current, "...", total];
  }

  // maxLength === 7
  if (current <= 3) {
    return [1, 2, 3, "...", total - 2, total - 1, total];
  }
  if (current >= total - 2) {
    return [1, 2, 3, "...", total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
};

export const PaginationBox = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  ...rest
}: PaginationBoxProps) => {
  const rangeDesktop = generatePaginationRange(currentPage, totalPages, 7);
  const rangeMobile = generatePaginationRange(currentPage, totalPages, 5);

  const renderPages = (range: (number | string)[]) => {
    return range.map((item, index) => {
      if (item === "...") {
        return <PaginationItem key={`ellipsis-${index}`} variant="ellipsis" />;
      }

      const pageNum = item as number;
      return (
        <PaginationItem
          key={pageNum}
          variant="page"
          page={pageNum}
          isActive={currentPage === pageNum}
          onClick={() => onPageChange(pageNum)}
        />
      );
    });
  };

  return (
    <nav
      className={clsx("pagination-box", className)}
      aria-label="Pagination"
      {...rest}
    >
      <PaginationItem
        variant="previous"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      <div className="pagination-box__pages pagination-box__pages--desktop">
        {renderPages(rangeDesktop)}
      </div>

      <div className="pagination-box__pages pagination-box__pages--mobile">
        {renderPages(rangeMobile)}
      </div>

      <PaginationItem
        variant="next"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </nav>
  );
};

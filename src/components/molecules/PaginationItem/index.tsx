import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { ReactSVG } from "react-svg";
import "./index.scss";

export type PaginationItemProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "page" | "previous" | "next" | "ellipsis";
  page?: number;
  isActive?: boolean;
};

export const PaginationItem = ({
  variant = "page",
  page,
  isActive,
  className,
  disabled,
  ...rest
}: PaginationItemProps) => {
  if (variant === "ellipsis") {
    return (
      <span className={clsx("pagination-item", "pagination-item--ellipsis", className)}>
        ...
      </span>
    );
  }

  const isPrev = variant === "previous";
  const isNext = variant === "next";
  const isNumber = variant === "page";

  return (
    <button
      type="button"
      className={clsx(
        "pagination-item",
        `pagination-item--${variant}`,
        isActive && "pagination-item--active",
        className
      )}
      disabled={disabled}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    >
      {isPrev && <ReactSVG src="/images/icn-arrow-left.svg" className="pagination-item__icon" />}
      {isNumber && page}
      {isPrev && <span className="pagination-item__text">Previous</span>}
      {isNext && <span className="pagination-item__text">Next</span>}
      {isNext && <ReactSVG src="/images/icn-arrow-right.svg" className="pagination-item__icon" />}
    </button>
  );
};

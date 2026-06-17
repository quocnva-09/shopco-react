import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

export type FilterHeaderProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  iconName?: string;
  iconWidth?: number;
  iconHeight?: number;
  isOpen?: boolean; // Controls rotation if iconName is arrow-down
  onIconClick?: () => void;
};

export const FilterHeader = ({
  title,
  iconName,
  iconWidth,
  iconHeight,
  isOpen,
  onIconClick,
  className,
  ...rest
}: FilterHeaderProps) => {
  return (
    <div
      className={clsx("filter-header", isOpen && "filter-header--open", className)}
      role={rest.onClick ? "button" : undefined}
      aria-expanded={isOpen}
      tabIndex={rest.onClick ? 0 : undefined}
      onKeyDown={rest.onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          rest.onClick?.(e as any);
        }
      } : undefined}
      {...rest}
    >
      <Heading as="h3" className="filter-header__title">
        {title}
      </Heading>
      {iconName && (
        <IconButton
          svgName={iconName}
          variant="no-fill"
          className="filter-header__icon"
          aria-label="Toggle filter"
          tabIndex={-1}
          iconWidth={iconWidth}
          iconHeight={iconHeight}
          onClick={(e) => {
            if (onIconClick) {
              e.stopPropagation();
              onIconClick();
            }
          }}
        />
      )}
    </div>
  );
};

import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { TextLink } from "@/components/atoms/TextLink";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

export type FilterListItemProps = ComponentPropsWithoutRef<"div"> & {
  label: string;
  href?: string;
  onIconClick?: () => void;
};

export const FilterListItem = ({
  label,
  href = "#",
  onIconClick,
  className,
  ...rest
}: FilterListItemProps) => {
  return (
    <div className={clsx("filter-list-item", className)} {...rest}>
      <TextLink href={href} className="filter-list-item__link">
        {label}
      </TextLink>
      <IconButton
        svgName="vector-direct-right"
        variant="no-fill"
        className="filter-list-item__icon"
        iconWidth={6.5}
        iconHeight={11.5}
        onClick={onIconClick}
        aria-label={`View ${label}`}
      />
    </div>
  );
};

import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { TextLink } from "@/components/atoms/TextLink";
import { Text } from "@/components/atoms/Text";
import { Icon } from "@/components/atoms/Icon";
import "./Breadcrumb.scss";

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** URL path — if undefined → this is the last (active) item, not a link */
  href?: string;
}

export type BreadcrumbProps = ComponentPropsWithoutRef<"nav"> & {
  items: BreadcrumbItem[];
};

export const Breadcrumb = ({
  items,
  className,
  ...rest
}: BreadcrumbProps) => {
  return (
    <nav
      className={clsx("breadcrumb", className)}
      aria-label="Breadcrumb"
      {...rest}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label}>
            {/* Separator before each item (except the first) */}
            {index > 0 && (
              <Icon
                svgName="vector-direct-right"
                className="breadcrumb__separator"
                aria-hidden="true"
              />
            )}

            {/* Link or Active text */}
            {item.href && !isLast ? (
              <TextLink href={item.href} className="breadcrumb__item">
                {item.label}
              </TextLink>
            ) : (
              <Text
                as="span"
                className={clsx(
                  "breadcrumb__item",
                  isLast && "breadcrumb__item--active"
                )}
              >
                {item.label}
              </Text>
            )}
          </span>
        );
      })}
    </nav>
  );
};

import { type ComponentPropsWithoutRef, type ReactNode, memo } from "react";
import clsx from "clsx";
import { TextLink } from "@/components/atoms/TextLink";
import "./index.scss";

export interface MenuItem {
  id?: string;
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export type MenuListProps = ComponentPropsWithoutRef<"ul"> & {
  items: MenuItem[];
  itemClassName?: string;
  linkClassName?: string;
};

export const MenuList = memo(
  ({
    items,
    className,
    itemClassName,
    linkClassName,
    ...rest
  }: MenuListProps) => {
    return (
      <ul className={clsx("menu-list", className)} {...rest}>
        {items.map((item) => (
          <li key={item.id ?? String(item.label)} className={clsx("menu-list__item", itemClassName, item.className)}>
            {item.onClick ? (
              <button
                type="button"
                className={clsx("menu-list__link", linkClassName)}
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ) : (
              <TextLink
                href={item.href ?? "/"}
                className={clsx("menu-list__link", linkClassName)}
              >
                {item.label}
              </TextLink>
            )}
          </li>
        ))}
      </ul>
    );
  },
);

MenuList.displayName = "MenuList";

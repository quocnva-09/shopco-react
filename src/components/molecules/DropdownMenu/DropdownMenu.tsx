import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { TextLink } from "@/components/atoms/TextLink";
import "./DropdownMenu.scss";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface DropdownItem {
  label: string;
  href: string;
}

export interface DropdownMenuProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  href: string;
  items: DropdownItem[];
  isOpen?: boolean;
}

export const DropdownMenu = ({
  title,
  href,
  items,
  isOpen = false,
  className,
  ...rest
}: DropdownMenuProps) => {
  return (
    <div className={clsx("dropdown", isOpen && "is-open", className)} {...rest}>
      <div className="dropdown__trigger">
        <TextLink href={href} className="dropdown__link">
          {title}
        </TextLink>
        <Icon
          svgName="icn-arrow-down"
          aria-label="icn-arrow-down"
          className="dropdown__icon"
        />
      </div>

      <ul className="dropdown__menu">
        {items.map((item, index) => (
          <li key={index} className="dropdown__item">
            <TextLink href={item.href} className="dropdown__item-link">
              {item.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

import { useCallback, useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { TextLink } from "@/components/atoms/TextLink";
import "./DropdownMenu.scss";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface DropdownItem {
  label: string;
  href: string;
}

export type DropdownMenuProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  href: string;
  items: DropdownItem[];
};

export const DropdownMenu = ({
  title,
  href,
  items,
  className,
  ...rest
}: DropdownMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const handleDropdownClick = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  return (
    <div
      className={clsx("dropdown", isDropdownOpen && "is-open", className)}
      {...rest}
    >
      <div className="dropdown__trigger" onClick={handleDropdownClick}>
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

import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { TextLink } from "@/components/atoms/TextLink";
import { Dropdown } from "@/components/molecules/Dropdown";
import "./index.scss";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

export type NavMenuProps = ComponentPropsWithoutRef<"nav"> & {
  isOpenMobile?: boolean;
};

// Static mock data
const SHOP_DROPDOWN_ITEMS = [
  { label: "Men's Clothes", href: "/shop/men" },
  { label: "Women's Clothes", href: "/shop/women" },
];

export const NavMenu = ({
  isOpenMobile = false,
  className,
  ...rest
}: NavMenuProps) => {
  return (
    <nav
      className={clsx("nav", isOpenMobile && "nav--open", className)}
      {...rest}
    >
      <ul className="nav__menu">
        <li className="nav__menu-item">
          <Dropdown>
            <Dropdown.Trigger>
              <div className="nav__shop-trigger">
                <Text className="nav__shop-text">Shop</Text>
                <Icon
                  svgName="icn-arrow-down"
                  aria-hidden="true"
                  className="nav__shop-icon"
                />
              </div>
            </Dropdown.Trigger>
            <Dropdown.Menu items={SHOP_DROPDOWN_ITEMS} />
          </Dropdown>
        </li>
        <li className="nav__menu-item">
          <TextLink href="/on-sale" className="nav__menu-link">
            On Sale
          </TextLink>
        </li>
        <li className="nav__menu-item">
          <TextLink href="/new-arrivals" className="nav__menu-link">
            New Arrivals
          </TextLink>
        </li>
        <li className="nav__menu-item">
          <TextLink href="/brands" className="nav__menu-link">
            Brands
          </TextLink>
        </li>
      </ul>
    </nav>
  );
};

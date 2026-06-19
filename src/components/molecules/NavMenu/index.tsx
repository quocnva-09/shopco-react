import { type ComponentPropsWithoutRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { TextLink } from "@/components/atoms/TextLink";
import { Dropdown } from "@/components/molecules/Dropdown";
import "./index.scss";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { useAsync } from "@/hooks/useAsync";
import { MasterDataService } from "@/services/master-data.service";
import { API_ENDPOINTS } from "@/consts/api";

export type NavMenuProps = ComponentPropsWithoutRef<"nav"> & {
  isOpenMobile?: boolean;
};

export const NavMenu = ({
  isOpenMobile = false,
  className,
  ...rest
}: NavMenuProps) => {
  const fetchCategories = useCallback(async () => {
    const res = await MasterDataService.getCategories(true);
    return res.data;
  }, []);

  const { data: categories, execute } = useAsync(fetchCategories);

  useEffect(() => {
    execute();
  }, [execute]);

  const shopDropdownItems = categories
    ? categories.map((cat) => ({
        label: cat.name,
        href: `/${API_ENDPOINTS.LINK_TO_CATEGORY_SLUG(cat.slug)}`,
      }))
    : [{ label: "Loading...", href: "#" }];

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
            <Dropdown.Menu items={shopDropdownItems} />
          </Dropdown>
        </li>
        <li className="nav__menu-item">
          <TextLink href="/on-sale" className="nav__menu-link">
            On Sale
          </TextLink>
        </li>
        <li className="nav__menu-item">
          <TextLink href={`/${API_ENDPOINTS.LINK_TO_NEW_ARRIVALS}`} className="nav__menu-link">
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

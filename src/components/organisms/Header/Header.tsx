import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { TextLink } from "@/components/atoms/TextLink";
import { IconButton } from "@/components/atoms/IconButton";
import { NavMenu } from "@/components/molecules/NavMenu";
import { SearchBar } from "@/components/molecules/SearchBar";
import "./Header.scss";

export type HeaderProps = ComponentPropsWithoutRef<"header"> & {
  onCartClick?: () => void;
  onProfileClick?: () => void;
};

export const Header = ({
  onCartClick,
  onProfileClick,
  className,
  ...rest
}: HeaderProps) => {
  return (
    <header className={clsx("header", className)} {...rest}>
      <div className={clsx("header__container", "container")}>
        {/* Lớp cắt 1: Logo gắn link trực tiếp theo chiến lược tối giản */}
        <TextLink href="/" className="header__logo">
          SHOP.CO
        </TextLink>

        {/* Lớp cắt 2: Khối điều hướng chính (Chứa dropdown tĩnh bên trong) */}
        <NavMenu className="header__nav-wrapper" />

        {/* Lớp cắt 3: Khối tìm kiếm mở rộng khoảng cách ở giữa */}
        <SearchBar className="header__search-wrapper" />

        {/* Lớp cắt 4: Nhóm các nút hành động tương tác phía bên phải */}
        <div className="header__actions">
          <IconButton
            svgName="icn-cart"
            aria-label="Open shopping cart"
            className="header__icon-btn"
            onClick={onCartClick}
            variant="ghost"
            iconWidth={24}
            iconHeight={24}
          />
          <IconButton
            svgName="icn-user"
            aria-label="View user profile"
            className="header__icon-btn"
            onClick={onProfileClick}
            variant="ghost"
            iconWidth={24}
            iconHeight={24}
          />
        </div>
      </div>
    </header>
  );
};

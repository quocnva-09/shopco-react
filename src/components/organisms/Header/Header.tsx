import { type ComponentPropsWithoutRef, useState, useCallback } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={clsx("header", className)} {...rest}>
      <div className={clsx("header__container", "container")}>
        {/* Hamburger: Nếu trên mobile và trạng thái menu không open thì hiển thị icon*/}
        {!isMobileMenuOpen && (
          <IconButton
            className="header__hamburger"
            aria-label="Toggle navigation menu"
            onClick={toggleMobileMenu}
            svgName="icn-hamburger"
            iconWidth={24}
            iconHeight={24}
            variant="ghost"
          />
        )}

        {/* Logo */}
        <TextLink href="/" className="header__logo">
          SHOP.CO
        </TextLink>

        {/* Navigation — slide-in trên mobile khi isMobileMenuOpen */}
        <NavMenu
          className="header__nav-wrapper"
          isOpenMobile={isMobileMenuOpen}
        />

        {/* Search */}
        <SearchBar className="header__search-wrapper" />

        {/* Action buttons */}
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

      {/* Overlay tối màn hình khi menu mở */}
      <div
        className={clsx("overlay", isMobileMenuOpen && "is-active")}
        onClick={closeMobileMenu}
      />
    </header>
  );
};

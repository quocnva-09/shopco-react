import {
  type ComponentPropsWithoutRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import clsx from "clsx";
import { TextLink } from "@/components/atoms/TextLink";
import { IconButton } from "@/components/atoms/IconButton";
import { NavMenu } from "@/components/molecules/NavMenu";
import { SearchBar } from "@/components/molecules/SearchBar";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PATHS } from "@/routes";
import type { RootState } from "@/store/store";

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
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Auto-close mobile menu when the viewport crosses the breakpoint (991px)
  // Prevents stale open-menu state when the user resizes from mobile → desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 992px)");

    const handleBreakpointChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);
    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  return (
    <header className={clsx("header", className)} {...rest}>
      <div className={clsx("header__container", "container")}>
        {/* Hamburger: shown on mobile when the menu is closed */}
        {!isMobileMenuOpen && (
          <IconButton
            className="header__hamburger"
            aria-label="Toggle navigation menu"
            onClick={toggleMobileMenu}
            svgName="icn-hamburger"
            iconWidth={24}
            iconHeight={24}
          />
        )}

        {/* Logo */}
        <TextLink href="/" className="header__logo">
          SHOP.CO
        </TextLink>

        {/* Navigation — slides in on mobile when isMobileMenuOpen is true */}
        <NavMenu
          className="header__nav-wrapper"
          isOpenMobile={isMobileMenuOpen}
        />

        {/* Search */}
        <SearchBar className="header__search-wrapper" />

        {/* Action buttons */}
        <div className="header__actions">
          <Link to={PATHS.CART} className="header__cart-link">
            <IconButton
              svgName="icn-cart"
              aria-label="Open shopping cart"
              className="header__icon-btn"
              onClick={onCartClick}
              variant="default"
              iconWidth={24}
              iconHeight={24}
            />
            {totalCartItems > 0 && (
              <span className="header__cart-badge">{totalCartItems}</span>
            )}
          </Link>
          <IconButton
            svgName="icn-user"
            aria-label="View user profile"
            className="header__icon-btn"
            onClick={onProfileClick}
            variant="default"
            iconWidth={24}
            iconHeight={24}
          />
        </div>
      </div>

      {/* Backdrop overlay shown when the mobile menu is open */}
      <div
        className={clsx("overlay", isMobileMenuOpen && "is-active")}
        onClick={closeMobileMenu}
      />
    </header>
  );
};

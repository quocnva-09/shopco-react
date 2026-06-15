import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IconButton } from "../../atoms/IconButton";
import "./index.scss";
import { Input } from "@/components/atoms/Input";

export type SearchBarProps = ComponentPropsWithoutRef<"form"> & {};

export const SearchBar = ({ className, ...rest }: SearchBarProps) => {
  return (
    <form
      className={clsx("search-bar", className)}
      role="search"
      aria-label="Site search"
      {...rest}
    >
      {/* Visually hidden label links to the input for screen reader users */}
      <label htmlFor="site-search" className="visually-hidden">
        Search for products
      </label>
      <IconButton
        type="submit"
        svgName="icn-look-up"
        aria-label="Search"
        className="search-bar__btn"
        variant="ghost"
        iconHeight={24}
        iconWidth={24}
      />
      <Input
        id="site-search"
        type="search"
        className="search-bar__input"
        placeholder="Search for products..."
      />
    </form>
  );
};

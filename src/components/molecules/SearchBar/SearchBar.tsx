import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { IconButton } from '../../atoms/IconButton/IconButton';
import './SearchBar.scss';

export interface SearchBarProps extends ComponentPropsWithoutRef<'form'> {}

export const SearchBar = ({
  className,
  ...rest
}: SearchBarProps) => {
  return (
    <form className={clsx('search-bar', className)} {...rest}>
      <IconButton
        type="submit"
        svgName="icn-look-up" 
        ariaLabel="Search"
        className="search-bar__btn"
        variant="ghost" 
      />
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search for products..."
      />
    </form>
  );
};
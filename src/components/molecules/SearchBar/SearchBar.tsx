import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { IconButton } from '../../atoms/IconButton/IconButton';
import styles from './SearchBar.module.scss';

export interface SearchBarProps extends ComponentPropsWithoutRef<'form'> {}

export const SearchBar = ({
  className,
  ...rest
}: SearchBarProps) => {
  return (
    <form className={clsx(styles['search-bar'], className)} {...rest}>
      <IconButton
        type="submit"
        svgName="icn-look-up" 
        ariaLabel="Search"
        className={styles['search-bar__btn']}
        variant="ghost" 
      />
      <input
        type="text"
        className={styles['search-bar__input']}
        placeholder="Search for products..."
      />
    </form>
  );
};
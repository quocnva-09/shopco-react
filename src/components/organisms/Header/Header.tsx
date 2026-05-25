import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { TextLink } from '@/components/atoms/TextLink';
import { IconButton } from '@/components/atoms/IconButton';
import { NavMenu } from '@/components/molecules/NavMenu';
import { SearchBar } from '@/components/molecules/SearchBar';
import styles from './HeaderMain.module.scss';

export interface HeaderMainProps extends ComponentPropsWithoutRef<'header'> {
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

export const HeaderMain = ({
  onCartClick,
  onProfileClick,
  className,
  ...rest
}: HeaderMainProps) => {
  return (
    <header className={clsx(styles['header'], className)} {...rest}>
      <div className={clsx(styles['header__container'], 'container')}>
        
        {/* Lớp cắt 1: Logo gắn link trực tiếp theo chiến lược tối giản */}
        <TextLink href="/" className={styles['header__logo']}>
          SHOP.CO
        </TextLink>

        {/* Lớp cắt 2: Khối điều hướng chính (Chứa dropdown tĩnh bên trong) */}
        <NavMenu className={styles['header__nav-wrapper']} />

        {/* Lớp cắt 3: Khối tìm kiếm mở rộng khoảng cách ở giữa */}
        <SearchBar className={styles['header__search-wrapper']} />

        {/* Lớp cắt 4: Nhóm các nút hành động tương tác phía bên phải */}
        <div className={styles['header__actions']}>
          <IconButton
            svgName="icn-cart" // Khớp với file icn-cart.svg của bạn
            ariaLabel="Open shopping cart"
            className={styles['header__icon-btn']}
            onClick={onCartClick}
            variant="ghost"
          />
          <IconButton
            svgName="icn-user" // Khớp với file icn-user.svg của bạn
            ariaLabel="View user profile"
            className={styles['header__icon-btn']}
            onClick={onProfileClick}
            variant="ghost"
          />
        </div>

      </div>
    </header>
  );
};
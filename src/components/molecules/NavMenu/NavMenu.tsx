import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { TextLink } from '@/components/atoms/TextLink';
import { DropdownMenu } from '@/components/molecules/DropdownMenu';
import './NavMenu.scss';

export interface NavMenuProps extends ComponentPropsWithoutRef<'nav'> {
  isOpenMobile?: boolean;
}

// Khởi tạo dữ liệu tĩnh mẫu (Mock Data)
const SHOP_DROPDOWN_ITEMS = [
  { label: "Men's Clothes", href: '/shop/men' },
  { label: "Women's Clothes", href: '/shop/women' },
];

export const NavMenu = ({
  isOpenMobile = false,
  className,
  ...rest
}: NavMenuProps) => {
  return (
    <nav 
      className={clsx('nav', isOpenMobile && 'is-open', className)} 
      {...rest}
    >
      <ul className="nav__menu">
        <li className="nav__menu-item">
          <DropdownMenu 
            title="Shop" 
            href="/shop" 
            items={SHOP_DROPDOWN_ITEMS} 
          />
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
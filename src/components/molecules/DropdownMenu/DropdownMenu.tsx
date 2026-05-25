import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { TextLink } from '@/components/atoms/TextLink';
import styles from './DropdownMenu.module.scss';

export interface DropdownItem {
  label: string;
  href: string;
}

export interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  href: string;
  items: DropdownItem[];
  isOpen?: boolean; // Thuộc tính tĩnh phục vụ test UI ban đầu
}

export const DropdownMenu = ({
  title,
  href,
  items,
  isOpen = false,
  className,
  ...rest
}: DropdownMenuProps) => {
  return (
    <div 
      className={clsx(styles['dropdown'], isOpen && styles['is-open'], className)} 
      {...rest}
    >
      <div className={styles['dropdown__trigger']}>
        <TextLink href={href} className={styles['dropdown__link']}>
          {title}
        </TextLink>
        <img
          src="assets/icons/icn-arrow-down.svg"
          alt=""
          aria-hidden="true"
          className={styles['dropdown__icon']}
        />
      </div>

      <ul className={styles['dropdown__menu']}>
        {items.map((item, index) => (
          <li key={index} className={styles['dropdown__item']}>
            <TextLink href={item.href} className={styles['dropdown__item-link']}>
              {item.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
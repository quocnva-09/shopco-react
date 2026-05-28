import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import './PriceText.scss';
import { DEFAULT_CURRENCY } from '@/consts/config';
import { formatPrice } from '@/utils/formatter';

export type PriceTextVariant = 'current' | 'old';

export type PriceTextProps = ComponentPropsWithoutRef<'span'> & {
  value: number;
  currency?:string;
  variant?: PriceTextVariant; // 'current' (màu đen) hoặc 'old' (màu xám gạch ngang)
};

export const PriceText = ({
  value,
  currency = DEFAULT_CURRENCY,
  variant = 'current',
  className,
  ...rest
}: PriceTextProps) => {
  const formatedPrice = formatPrice(value, currency);
  return (
    <span 
      className={clsx(
        'product-price-text', 
        `product-price-text--${variant}`, 
        className
      )} 
      {...rest}
    >
      {formatedPrice}
    </span>
  );
};
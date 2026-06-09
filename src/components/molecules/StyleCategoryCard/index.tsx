import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Image } from '@/components/atoms/Image';

export type StyleVariant = "casual" | "formal" | "party" | "gym";

export interface StyleCategoryCardData {
  id: string | number;
  label: string;
  image: string;
  variant: StyleVariant;
  href?: string;
}

export type StyleCategoryCardProps = ComponentPropsWithoutRef<'a'> & {
  category: StyleCategoryCardData;
};

export const StyleCategoryCard = ({
  category,
  className,
  ...rest
}: StyleCategoryCardProps) => {
  const { label, image, variant, href } = category;

  return (
    <a
      href={href}
      className={clsx(
        'style-categories__card',
        `style-categories__card--${variant}`,
        className,
      )}
      {...rest}
    >
      <span className="style-categories__label">{label}</span>
      <Image
        src={image}
        alt={label}
        renderWrapper={false}
        className="style-categories__image"
      />
    </a>
  );
};

import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Image } from '../../atoms/Image';
import './BrandLogoBar.scss';

const defaultLogos = [
  { src: '/images/logo-versace.svg', alt: 'Versace logo' },
  { src: '/images/logo-zara.svg', alt: 'Zara logo' },
  { src: '/images/logo-gucci.svg', alt: 'Gucci logo' },
  { src: '/images/logo-prada.svg', alt: 'Prada logo' },
  { src: '/images/logo-ck.svg', alt: 'Calvin Klein logo' },
];

export interface BrandLogoData {
  src: string;
  alt: string;
}

export interface BrandLogoBarProps extends ComponentPropsWithoutRef<'figure'> {
  logos?: BrandLogoData[];
}

export const BrandLogoBar = ({
  logos = defaultLogos,
  className,
  ...rest
}: BrandLogoBarProps) => {
  return (
    <figure className={clsx('brand-logo', className)} {...rest}>
      {logos.map((logo) => (
        <Image
          key={logo.alt}
          className="brand-logo__item"
          src={logo.src}
          alt={logo.alt}
          renderWrapper={false}
          fit="contain"
        />
      ))}
    </figure>
  );
};

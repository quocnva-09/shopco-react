import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Button } from '../../atoms/Button';
import { MainBannerContent } from '../../molecules/MainBannerContent';
import { MainBannerImage } from '../../molecules/MainBannerImage';
import { BrandLogoBar, type BrandLogoData } from '../../molecules/BrandLogoBar';
import type { StatItemData } from '../../molecules/StatsBar';
import './BannerSection.scss';

export interface BannerSectionProps extends ComponentPropsWithoutRef<'section'> {
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  stats: StatItemData[];
  heroImage: { src: string; alt: string };
  effectSrc?: string;
  logos: BrandLogoData[];
}

export const BannerSection = ({
  title,
  description,
  ctaLabel,
  onCtaClick,
  stats,
  heroImage,
  effectSrc,
  logos,
  className,
  ...rest
}: BannerSectionProps) => {
  return (
    <section className={clsx('banner-section', className)} {...rest}>
      <div className="main-banner">
        <MainBannerContent
          title={title}
          description={description}
          stats={stats}
        >
          <Button variant="solid" colorScheme="dark" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        </MainBannerContent>

        <MainBannerImage
          src={heroImage.src}
          alt={heroImage.alt}
          effectSrc={effectSrc}
        />
      </div>

      <BrandLogoBar logos={logos} />
    </section>
  );
};

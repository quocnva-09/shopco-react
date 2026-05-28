import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Button } from "../../atoms/Button";
import { MainBannerContent } from "../../molecules/MainBannerContent";
import { MainBannerImage } from "../../molecules/MainBannerImage";
import type { StatItemData } from "../../molecules/StatsBar";
import "./BannerSection.scss";

export type BannerSectionProps = ComponentPropsWithoutRef<"section"> & {
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  stats: StatItemData[];
  heroImage: { src: string; alt: string };
  effectSrc?: string;
};

export const BannerSection = ({
  title,
  description,
  ctaLabel,
  onCtaClick,
  stats,
  heroImage,
  effectSrc,
  className,
  ...rest
}: BannerSectionProps) => {
  return (
    <section className={clsx("banner-section", className)} {...rest}>
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
    </section>
  );
};

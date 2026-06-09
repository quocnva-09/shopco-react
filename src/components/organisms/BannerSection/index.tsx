import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Button } from "@/components/atoms/Button";
import { MainBannerContent } from "@/components/molecules/MainBannerContent";
import { MainBannerImage } from "@/components/molecules/MainBannerImage";
import type { StatItemData } from "@/components/molecules/StatsBar";
import "./index.scss";

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
    <section
      className={clsx("banner-section", className)}
      aria-labelledby="banner-section-title"
      {...rest}
    >
      <div className="banner-section__inner container">
        <MainBannerContent
          title={title}
          description={description}
          stats={stats}
          titleId="banner-section-title"
        >
          <Button
            variant="solid"
            colorScheme="dark"
            className="banner-section__btn"
            onClick={onCtaClick}
          >
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

import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Button } from "@/components/atoms/Button";
import { MainBannerContent } from "@/components/molecules/MainBannerContent";
import { MainBannerImage } from "@/components/molecules/MainBannerImage";
import type { StatItemData } from "@/components/molecules/StatsBar";
import "@/components/organisms/BannerSection/BannerSection.scss";

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
      <div className={clsx("container", "main-banner")}>
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

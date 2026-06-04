import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Image } from "../../atoms/Image";
import { Icon } from "../../atoms/Icon";
import "./MainBannerImage.scss";

export type MainBannerImageProps = ComponentPropsWithoutRef<"div"> & {
  src: string;
  alt: string;
  effectSrc?: string;
};

export const MainBannerImage = ({
  src,
  alt,
  effectSrc,
  className,
  ...rest
}: MainBannerImageProps) => {
  return (
    <div
      className={clsx("main-banner__media", className)}
      aria-hidden="true"
      {...rest}
    >
      {/* Sparkle decorations — rendered via Icon atom (SVG) or effectSrc fallback */}
      {effectSrc ? (
        <>
          <span className="main-banner__sparkle main-banner__sparkle--left" aria-hidden="true">
            <img src={effectSrc} alt="" aria-hidden="true" />
          </span>
          <span className="main-banner__sparkle main-banner__sparkle--right" aria-hidden="true">
            <img src={effectSrc} alt="" aria-hidden="true" />
          </span>
        </>
      ) : (
        <>
          <span className="main-banner__sparkle main-banner__sparkle--left" aria-hidden="true">
            <Icon svgName="icn_glitter" height="100%" width="100%" color="#000" />
          </span>
          <span className="main-banner__sparkle main-banner__sparkle--right" aria-hidden="true">
            <Icon svgName="icn_glitter" height="100%" width="100%" color="#000" />
          </span>
        </>
      )}

      {/* Hero image with absolute crop — matches docs/HomeHero __image-crop pattern */}
      <div className="main-banner__image-crop">
        <Image
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          fit="contain"
          renderWrapper={false}
          imgClassName="main-banner__image"
        />
      </div>
    </div>
  );
};

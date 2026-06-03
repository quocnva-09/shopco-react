import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Image } from "../../atoms/Image";
import "./MainBannerImage.scss";

export type MainBannerImageProps = ComponentPropsWithoutRef<"figure"> & {
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
    <figure className={clsx("main-banner__image", className)} {...rest}>
      {/* Decorative star effects */}
      {effectSrc && (
        <>
          <div className="main-banner__image-effect">
            <img src={effectSrc} alt="" aria-hidden="true" />
          </div>
          <div className="main-banner__image-effect main-banner__image-effect--small">
            <img src={effectSrc} alt="" aria-hidden="true" />
          </div>
        </>
      )}

      {/* Hero image */}
      <div className="main-banner__image-wrapper">
        <Image src={src} alt={alt} renderWrapper={false} fit="cover" />
      </div>
    </figure>
  );
};

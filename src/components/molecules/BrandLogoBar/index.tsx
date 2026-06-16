import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Image } from "../../atoms/Image";
import "./index.scss";

const defaultLogos = [
  { src: "/images/logo-versace.svg", alt: "Versace" },
  { src: "/images/logo-zara.svg", alt: "Zara" },
  { src: "/images/logo-gucci.svg", alt: "Gucci" },
  { src: "/images/logo-prada.svg", alt: "Prada" },
  { src: "/images/logo-ck.svg", alt: "Calvin Klein" },
];

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export type BrandLogoData = {
  src: string;
  alt: string;
};

export type BrandLogoBarProps = ComponentPropsWithoutRef<"figure"> & {
  logos?: BrandLogoData[];
};

export const BrandLogoBar = ({
  logos = defaultLogos,
  className,
  ...rest
}: BrandLogoBarProps) => {
  return (
    <div className={clsx("brand-logo-wrapper", className)} {...rest}>
      <div className="brand-logo container">
        {logos.map((logo) => (
          <figure key={logo.alt}>
            <Image
              className={clsx("brand-logo__item", `brand-logo__item--${toSlug(logo.alt)}`)}
              src={logo.src}
              alt={logo.alt}
              renderWrapper={false}
            />
          </figure>
        ))}
      </div>
    </div>
  );
};

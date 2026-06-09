import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import {
  ProductCard,
} from "@/components/molecules/ProductCard";
import { Slider } from "@/components/molecules/Slider";
import "./index.scss";
import type { ProductCardData } from "@/types/product";

export type ProductCollectionSectionProps =
  ComponentPropsWithoutRef<"section"> & {
    title: string;
    products: ProductCardData[];
    ctaLabel?: string;
    onCtaClick?: () => void;
    enableSlider?: boolean;
    visibleCount?: number;
    showButton?: boolean;
    autoplay?: boolean;
    showArrows?: boolean;
  };

export const ProductCollectionSection = ({
  title,
  products,
  ctaLabel = "View All",
  onCtaClick,
  enableSlider = true,
  showArrows = false,
  visibleCount = 4,
  showButton = true,
  autoplay = false,
  className,
  ...rest
}: ProductCollectionSectionProps) => {
  // Render list products
  const listContent = (
    <ul className="product-collection__list">
      {products.map((product) => (
        <li key={product.id} className="product-collection__item">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className={clsx(
        "product-collection",
        !showButton && "product-collection--no-btn",
        className,
      )}
      {...rest}
    >
      <Heading as="h2" lineClamp={0} className="product-collection__title">
        {title}
      </Heading>

      {/* Slider */}
      {enableSlider ? (
        <Slider
          className="product-collection__slider"
          autoplay={autoplay}
          showArrows={showArrows}
        >
          {listContent}
        </Slider>
      ) : (
        listContent
      )}

      {/* CTA Button */}
      {showButton && (
        <Button
          variant="outline"
          className="product-collection__btn"
          colorScheme="dark"
          onClick={onCtaClick}
        >
          {ctaLabel}
        </Button>
      )}
    </section>
  );
};

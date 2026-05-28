import {
  type ComponentPropsWithoutRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import {
  ProductCard,
  type ProductCardData,
} from "@/components/molecules/ProductCard";
import "./ProductCollectionSection.scss";

export type ProductCollectionSectionProps = ComponentPropsWithoutRef<"section"> & {
  title: string;
  products: ProductCardData[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  enableSlider?: boolean;
  visibleCount?: number;
  showButton?: boolean;
};

export const ProductCollectionSection = ({
  title,
  products,
  ctaLabel = "View All",
  onCtaClick,
  enableSlider = true,
  visibleCount = 4,
  showButton = true,
  className,
  ...rest
}: ProductCollectionSectionProps) => {
  // ---------- Slider State ----------
  const [slideIndex, setSlideIndex] = useState(0);

  const maxIndex = useMemo(
    () => Math.max(0, products.length - visibleCount),
    [products.length, visibleCount],
  );

  const handlePrev = useCallback(() => {
    setSlideIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSlideIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Tính offset slide: mỗi item chiếm (100% / visibleCount)
  const itemWidthPercent = 100 / visibleCount;
  const sliderTransform = enableSlider
    ? `translateX(-${slideIndex * itemWidthPercent}%)`
    : undefined;

  // ---------- Render ----------
  const listContent = (
    <div
      className="product-collection__list"
      style={enableSlider ? { transform: sliderTransform } : undefined}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <section className={clsx("product-collection", className)} {...rest}>
      {/* Tiêu đề section */}
      <Heading as="h2" lineClamp={0} className="product-collection__title">
        {title}
      </Heading>

      {/* Slider hoặc Grid */}
      {enableSlider ? (
        <div className="product-collection__slider">{listContent}</div>
      ) : (
        listContent
      )}

      {/* Navigation arrows (chỉ render khi slider bật + có đủ items) */}
      {enableSlider && products.length > visibleCount && (
        <>
          <button
            type="button"
            className="product-collection__prev"
            onClick={handlePrev}
            disabled={slideIndex === 0}
            aria-label="Previous products"
          >
            &#10094;
          </button>
          <button
            type="button"
            className="product-collection__next"
            onClick={handleNext}
            disabled={slideIndex >= maxIndex}
            aria-label="Next products"
          >
            &#10095;
          </button>
        </>
      )}

      {/* CTA Button */}
      {showButton && (
        <Button variant="outline" colorScheme="dark" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      )}
    </section>
  );
};

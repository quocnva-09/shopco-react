import {
  useCallback,
  useState,
  useRef,
  useEffect,
  type ComponentPropsWithoutRef,
} from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { IconButton } from "@/components/atoms/IconButton";
import { ReviewCard, type ReviewData } from "@/components/molecules/ReviewCard";
import "./FeedbackSection.scss";

export type FeedbackSectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Section heading text */
  title?: string;
  /** Array of review data objects to render as ReviewCards */
  reviews: ReviewData[];
};

export const FeedbackSection = ({
  title = "WHAT OUR CUSTOMERS SAY",
  reviews,
  className,
  ...rest
}: FeedbackSectionProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Use a 1px tolerance for rounding issues
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll, reviews]);

  const handlePrev = useCallback(() => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.firstElementChild?.clientWidth || 400;
      sliderRef.current.scrollBy({
        left: -(itemWidth + 20),
        behavior: "smooth",
      });
    }
  }, []);

  const handleNext = useCallback(() => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.firstElementChild?.clientWidth || 400;
      sliderRef.current.scrollBy({ left: itemWidth + 20, behavior: "smooth" });
    }
  }, []);

  return (
    <section className={clsx("feedback", className)} {...rest}>
      {/* Header: Title + Navigation Arrows */}
      <div className="feedback__header container">
        <Heading as="h2" className="feedback__title">
          {title}
        </Heading>

        <div className="feedback__arrows">
          <IconButton
            variant="no-fill"
            svgName="icn-arrow-left"
            aria-label="Previous reviews"
            className="feedback__arrow feedback__arrow--prev"
            onClick={handlePrev}
            disabled={!canScrollLeft}
          />
          <IconButton
            variant="no-fill"
            svgName="icn-arrow-right"
            aria-label="Next reviews"
            className="feedback__arrow feedback__arrow--next"
            onClick={handleNext}
            disabled={!canScrollRight}
          />
        </div>
      </div>

      {/* Slider: Horizontal scroll with snap */}
      <div className="feedback__slider">
        <div className="feedback__items" ref={sliderRef} onScroll={checkScroll}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

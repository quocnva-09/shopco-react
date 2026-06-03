import {
  useCallback,
  useState,
  useEffect,
  type ComponentPropsWithoutRef,
} from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { IconButton } from "@/components/atoms/IconButton";
import { ReviewCard, type ReviewData } from "@/components/molecules/ReviewCard";
import "./FeedbackSection.scss";

export type FeedbackSectionProps = ComponentPropsWithoutRef<"section"> & {
  title?: string;
  reviews: ReviewData[];
};

export const FeedbackSection = ({
  title = "WHAT OUR CUSTOMERS SAY",
  reviews,
  className,
  ...rest
}: FeedbackSectionProps) => {
  const [slideIndex, setSlideIndex] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, reviews.length - visibleCount);

  useEffect(() => {
    if (slideIndex > maxIndex) {
      setSlideIndex(maxIndex);
    }
  }, [maxIndex, slideIndex]);

  const handlePrev = useCallback(() => {
    setSlideIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSlideIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

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
            disabled={slideIndex === 0}
          />
          <IconButton
            variant="no-fill"
            svgName="icn-arrow-right"
            aria-label="Next reviews"
            className="feedback__arrow feedback__arrow--next"
            onClick={handleNext}
            disabled={slideIndex >= maxIndex}
          />
        </div>
      </div>

      {/* Slider: State-driven transform */}
      <div className="feedback__slider">
        <div className="feedback__items">
          <div
            className="feedback__track"
            style={{ "--slide-index": slideIndex } as React.CSSProperties}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { type ComponentPropsWithoutRef } from "react";
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
  return (
    <section className={clsx("feedback", className)} {...rest}>
      {/* Header: Title + Navigation Arrows */}
      <div className="feedback__header">
        <Heading as="h2" className="feedback__title">
          {title}
        </Heading>

        <div className="feedback__arrows">
          <IconButton
            variant="no-fill"
            svgName="icn-arrow-left"
            aria-label="Previous reviews"
            className="feedback__arrow feedback__arrow--prev"
          />
          <IconButton
            variant="no-fill"
            svgName="icn-arrow-right"
            aria-label="Next reviews"
            className="feedback__arrow feedback__arrow--next"
          />
        </div>
      </div>

      {/* Slider: Horizontal scroll with snap */}
      <div className="feedback__slider">
        <div className="feedback__items">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

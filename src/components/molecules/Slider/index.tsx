import { type ReactNode, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import "./index.scss";
import { DEFAULT_SLIDER_DURATION } from "@/consts/config";
import { useSlider } from "@/hooks/useSlider";

export type SliderProps = ComponentPropsWithoutRef<"div"> & {
  /** Content of the slider (the list items) */
  children: ReactNode;
  /** Enable auto-playing the slides */
  autoplay?: boolean;
  /** Interval in milliseconds for autoplay */
  autoplayInterval?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
};

export const Slider = ({
  children,
  autoplay = false,
  autoplayInterval = DEFAULT_SLIDER_DURATION,
  showArrows = true,
  className,
  ...rest
}: SliderProps) => {
  const { viewportRef, handlePrev, handleNext } = useSlider({
    autoplay,
    autoplayInterval,
  });

  return (
    <div className={clsx("slider", className)} {...rest}>
      <div className="slider__viewport" ref={viewportRef}>
        <div className="slider__track">{children}</div>
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            className="slider__prev"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <button
            type="button"
            className="slider__next"
            onClick={handleNext}
            aria-label="Next slide"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
};

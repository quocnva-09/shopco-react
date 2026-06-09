import {
  useEffect,
  useRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";
import clsx from "clsx";
import "./Slider.scss";

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
  autoplayInterval = 3000,
  showArrows = true,
  className,
  ...rest
}: SliderProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);

  // --- Autoplay logic ---
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      if (!viewportRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;

      // If we've reached the end, scroll back to start
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        viewportRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll right by approximately one item width (assuming 4 items on desktop or varying on mobile)
        // A safe default is to scroll by half of the clientWidth or a fixed amount.
        // For a more robust approach, we scroll by the width of the first child element.
        const firstChild = viewportRef.current.firstElementChild
          ?.firstElementChild as HTMLElement;
        const scrollAmount = firstChild
          ? firstChild.clientWidth + 16
          : clientWidth / 2; // 16px is gap
        viewportRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval]);

  // --- Navigation logic ---
  const handlePrev = () => {
    if (!viewportRef.current) return;
    const firstChild = viewportRef.current.firstElementChild
      ?.firstElementChild as HTMLElement;
    const scrollAmount = firstChild
      ? firstChild.clientWidth + 16
      : viewportRef.current.clientWidth / 2;
    viewportRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!viewportRef.current) return;
    const firstChild = viewportRef.current.firstElementChild
      ?.firstElementChild as HTMLElement;
    const scrollAmount = firstChild
      ? firstChild.clientWidth + 16
      : viewportRef.current.clientWidth / 2;
    viewportRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

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

import {
  useEffect,
  useRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";
import clsx from "clsx";
import "./index.scss";

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
        const wrapper = viewportRef.current.firstElementChild
          ?.firstElementChild as HTMLElement;
        const item = wrapper?.firstElementChild as HTMLElement;
        const gap = wrapper ? parseFloat(window.getComputedStyle(wrapper).gap) || 0 : 0;
        const scrollAmount = item ? item.clientWidth + gap : clientWidth + gap;
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
    const { scrollLeft, scrollWidth } = viewportRef.current;

    // If at the beginning, scroll to the end
    if (scrollLeft <= 10) {
      viewportRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      return;
    }

    const wrapper = viewportRef.current.firstElementChild
      ?.firstElementChild as HTMLElement;
    const item = wrapper?.firstElementChild as HTMLElement;
    const gap = wrapper ? parseFloat(window.getComputedStyle(wrapper).gap) || 0 : 0;
    const scrollAmount = item ? item.clientWidth + gap : viewportRef.current.clientWidth + gap;
    viewportRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!viewportRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;

    // If at the end, scroll back to start
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      viewportRef.current.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const wrapper = viewportRef.current.firstElementChild
      ?.firstElementChild as HTMLElement;
    const item = wrapper?.firstElementChild as HTMLElement;
    const gap = wrapper ? parseFloat(window.getComputedStyle(wrapper).gap) || 0 : 0;
    const scrollAmount = item ? item.clientWidth + gap : clientWidth + gap;
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

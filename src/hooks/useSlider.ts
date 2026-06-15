import { useEffect, useRef, useCallback } from "react";
import { DEFAULT_SLIDER_DURATION, SLIDER_SCROLL_THRESHOLD_PX } from "@/consts/config";

type UseSliderProps = {
  autoplay?: boolean;
  autoplayInterval?: number;
  initialSlide?: number;
};

export const useSlider = ({
  autoplay = false,
  autoplayInterval = DEFAULT_SLIDER_DURATION,
  initialSlide = 0,
}: UseSliderProps = {}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || initialSlide === 0 || !viewportRef.current) return;

    const elements = getSliderElements();
    if (!elements || !elements.item) return;

    const itemWidth = elements.item.clientWidth;
    if (itemWidth > 0) {
      const scrollAmount = (itemWidth + elements.gap) * initialSlide;
      viewportRef.current.scrollTo({ left: scrollAmount, behavior: "auto" });
      initialized.current = true;
    }
  });

  // Helper to extract the proper scrollable wrapper and item, regardless of nested DOM structure
  const getSliderElements = () => {
    const track = viewportRef.current?.firstElementChild as HTMLElement;
    if (!track) return null;
    const isWrapperInner = track.children.length === 1 && track.firstElementChild?.tagName === 'UL';
    const wrapper = isWrapperInner ? track.firstElementChild as HTMLElement : track;
    const item = wrapper.firstElementChild as HTMLElement;
    const gap = wrapper ? parseFloat(window.getComputedStyle(wrapper).gap) || 0 : 0;
    return { item, gap };
  };

  // --- Autoplay logic ---
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      if (!viewportRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;

      // If we've reached the end, scroll back to start
      if (scrollLeft + clientWidth >= scrollWidth - SLIDER_SCROLL_THRESHOLD_PX) {
        viewportRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const elements = getSliderElements();
        if (!elements) return;
        const scrollAmount = elements.item ? elements.item.clientWidth + elements.gap : clientWidth + elements.gap;
        viewportRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval]);

  // --- Navigation logic ---
  const handlePrev = useCallback(() => {
    if (!viewportRef.current) return;
    const { scrollLeft, scrollWidth } = viewportRef.current;

    // If at the beginning, scroll to the end
    if (scrollLeft <= SLIDER_SCROLL_THRESHOLD_PX) {
      viewportRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      return;
    }

    const elements = getSliderElements();
    if (!elements) return;
    const scrollAmount = elements.item ? elements.item.clientWidth + elements.gap : viewportRef.current.clientWidth + elements.gap;
    viewportRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }, []);

  const handleNext = useCallback(() => {
    if (!viewportRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = viewportRef.current;

    // If at the end, scroll back to start
    if (scrollLeft + clientWidth >= scrollWidth - SLIDER_SCROLL_THRESHOLD_PX) {
      viewportRef.current.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const elements = getSliderElements();
    if (!elements) return;
    const scrollAmount = elements.item ? elements.item.clientWidth + elements.gap : clientWidth + elements.gap;
    viewportRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, []);

  return { viewportRef, handlePrev, handleNext };
};

import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { IconButton } from "@/components/atoms/IconButton";
import { FEEDBACK_CONSTS } from "@/consts/feedback";
import {
  FeedbackSliderProvider,
  useFeedbackSliderContext,
} from "./FeedbackSliderContext";
import "./index.scss";

type RootProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  initialSlide?: number;
};

const Root = ({ children, className, initialSlide = 3, ...rest }: RootProps) => {
  return (
    <FeedbackSliderProvider initialSlide={initialSlide}>
      <section className={clsx("feedback", className)} {...rest}>
        {children}
      </section>
    </FeedbackSliderProvider>
  );
};

const Header = ({
  title = FEEDBACK_CONSTS.DEFAULT_TITLE,
}: {
  title?: string;
}) => {
  const { handlePrev, handleNext } = useFeedbackSliderContext();

  return (
    <div className="feedback__header container">
      <Heading as="h2" className="feedback__title">
        {title}
      </Heading>

      <div className="feedback__arrows">
        <IconButton
          variant="no-fill"
          svgName="icn-arrow-left"
          aria-label={FEEDBACK_CONSTS.ARIA_LABELS.PREV}
          className="feedback__arrow feedback__arrow--prev"
          iconWidth={24}
          iconHeight={24}
          onClick={handlePrev}
        />
        <IconButton
          variant="no-fill"
          svgName="icn-arrow-right"
          aria-label={FEEDBACK_CONSTS.ARIA_LABELS.NEXT}
          className="feedback__arrow feedback__arrow--next"
          iconWidth={24}
          iconHeight={24}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

type ContentProps = {
  children: ReactNode;
};

const Content = ({ children }: ContentProps) => {
  const { viewportRef } = useFeedbackSliderContext();

  return (
    <div className="feedback__slider">
      <div className="feedback__items" ref={viewportRef}>
        <ul className="feedback__track">
          {children}
        </ul>
      </div>
    </div>
  );
};

export const FeedbackSection = Object.assign(Root, {
  Header,
  Content,
});

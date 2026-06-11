import { createContext, useContext, type ReactNode } from "react";
import { useSlider } from "@/hooks/useSlider";

type FeedbackSliderContextType = ReturnType<typeof useSlider>;

const FeedbackSliderContext = createContext<FeedbackSliderContextType | null>(
  null
);

export const FeedbackSliderProvider = ({
  children,
  initialSlide = 0,
}: {
  children: ReactNode;
  initialSlide?: number;
}) => {
  const sliderState = useSlider({ initialSlide });

  return (
    <FeedbackSliderContext.Provider value={sliderState}>
      {children}
    </FeedbackSliderContext.Provider>
  );
};

export const useFeedbackSliderContext = () => {
  const context = useContext(FeedbackSliderContext);
  if (!context) {
    throw new Error(
      "useFeedbackSliderContext must be used within a FeedbackSliderProvider"
    );
  }
  return context;
};

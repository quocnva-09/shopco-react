import { useState, useRef, useCallback, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { SliderThumb } from "@/components/atoms/SliderThumb";
import { SliderTrack } from "@/components/atoms/SliderTrack";
import "./index.scss";

export type PriceRangeSliderProps = Omit<ComponentPropsWithoutRef<"div">, "onChange"> & {
  min: number;
  max: number;
  defaultMinValue?: number;
  defaultMaxValue?: number;
  onChange?: (values: [number, number]) => void;
};

export const PriceRangeSlider = ({
  min,
  max,
  defaultMinValue,
  defaultMaxValue,
  onChange,
  className,
  ...rest
}: PriceRangeSliderProps) => {
  const [minValue, setMinValue] = useState(defaultMinValue ?? min);
  const [maxValue, setMaxValue] = useState(defaultMaxValue ?? max);
  
  const trackRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<"min" | "max" | null>(null);

  const getPercentage = useCallback((value: number) => {
    return ((value - min) / (max - min)) * 100;
  }, [min, max]);

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!trackRef.current) return 0;
    const { left, width } = trackRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max((clientX - left) / width, 0), 1);
    return Math.round(min + percent * (max - min));
  }, [min, max]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, thumb: "min" | "max") => {
    activeThumbRef.current = thumb;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeThumbRef.current) return;
    
    const newValue = getValueFromPosition(e.clientX);
    
    if (activeThumbRef.current === "min") {
      const clampedValue = Math.min(newValue, maxValue);
      setMinValue(clampedValue);
    } else {
      const clampedValue = Math.max(newValue, minValue);
      setMaxValue(clampedValue);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeThumbRef.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    activeThumbRef.current = null;
    onChange?.([minValue, maxValue]);
  };

  const minPos = getPercentage(minValue);
  const maxPos = getPercentage(maxValue);

  return (
    <div 
      className={clsx("price-range-slider", className)} 
      {...rest}
    >
      <div 
        className="price-range-slider__wrapper" 
        ref={trackRef}
      >
        <SliderTrack minPos={minPos} maxPos={maxPos} />
        <SliderThumb 
          position={minPos} 
          value={minValue} 
          onPointerDown={(e) => handlePointerDown(e, "min")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Minimum price"
        />
        <SliderThumb 
          position={maxPos} 
          value={maxValue} 
          onPointerDown={(e) => handlePointerDown(e, "max")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Maximum price"
        />
      </div>
    </div>
  );
};

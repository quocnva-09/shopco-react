import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import "./index.scss";

export type SliderTrackProps = ComponentPropsWithoutRef<"div"> & {
  minPos: number; // 0-100 percentage
  maxPos: number; // 0-100 percentage
};

export const SliderTrack = ({
  minPos,
  maxPos,
  className,
  ...rest
}: SliderTrackProps) => {
  return (
    <div className={clsx("slider-track", className)} {...rest}>
      <div
        className="slider-track__highlight"
        style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
      />
    </div>
  );
};

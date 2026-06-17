import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import "./index.scss";

export type SliderThumbProps = ComponentPropsWithoutRef<"div"> & {
  position: number; // Percentage 0-100
  value: number; // Price value
};

export const SliderThumb = ({
  position,
  value,
  className,
  ...rest
}: SliderThumbProps) => {
  return (
    <div
      className={clsx("slider-thumb", className)}
      style={{ left: `${position}%` }}
      role="slider"
      tabIndex={0}
      aria-valuenow={value}
      {...rest}
    >
      <span className="slider-thumb__value">${value}</span>
    </div>
  );
};

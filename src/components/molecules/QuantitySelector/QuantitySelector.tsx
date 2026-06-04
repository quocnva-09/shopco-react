import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import "./QuantitySelector.scss";

export type QuantitySelectorProps = ComponentPropsWithoutRef<"div"> & {
  defaultValue?: number;
  min?: number;
};

export const QuantitySelector = ({
  defaultValue = 1,
  min = 1,
  className,
  ...rest
}: QuantitySelectorProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleDecrease = () => {
    setValue((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrease = () => {
    setValue((prev) => prev + 1);
  };

  return (
    <div className={clsx("quantity-selector", className)} {...rest}>
      <IconButton
        svgName="icn-minus"
        aria-label="Decrease quantity"
        className="quantity-selector__btn quantity-selector__btn--minus"
        onClick={handleDecrease}
      />
      <input
        type="number"
        className="quantity-selector__value"
        value={value}
        min={min}
        size={1}
        aria-label="Quantity"
        readOnly
      />
      <IconButton
        svgName="icn-plus"
        aria-label="Increase quantity"
        className="quantity-selector__btn quantity-selector__btn--plus"
        onClick={handleIncrease}
      />
    </div>
  );
};

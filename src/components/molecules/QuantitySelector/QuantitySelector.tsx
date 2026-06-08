import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import "./QuantitySelector.scss";

export type QuantitySelectorProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onChange"
> & {
  defaultValue?: number;
  min?: number;
  onChange?: (value: number) => void;
};

export const QuantitySelector = ({
  defaultValue = 1,
  min = 1,
  onChange,
  className,
  ...rest
}: QuantitySelectorProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleDecrease = () => {
    setValue((prev) => {
      const next = prev > min ? prev - 1 : prev;
      onChange?.(next);
      return next;
    });
  };

  const handleIncrease = () => {
    setValue((prev) => {
      const next = prev + 1;
      onChange?.(next);
      return next;
    });
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

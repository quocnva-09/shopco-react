import { useState, useEffect, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import "./QuantitySelector.scss";

export type QuantitySelectorProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onChange"
> & {
  defaultValue?: number;
  value?: number;
  min?: number;
  onChange?: (value: number) => void;
};

export const QuantitySelector = ({
  defaultValue = 1,
  value: propValue,
  min = 1,
  onChange,
  className,
  ...rest
}: QuantitySelectorProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = propValue !== undefined ? propValue : internalValue;

  const [inputValue, setInputValue] = useState<string | number>(value);

  // Sync internal input text when true value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleDecrease = () => {
    const next = value > min ? value - 1 : value;
    if (propValue === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const handleIncrease = () => {
    const next = value + 1;
    if (propValue === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setInputValue("");
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setInputValue(num);
      // Chỉ báo ra ngoài nếu giá trị >= min
      if (num >= min) {
        if (propValue === undefined) setInternalValue(num);
        onChange?.(num);
      }
    }
  };

  const handleBlur = () => {
    let finalVal = inputValue === "" ? min : parseInt(String(inputValue), 10);
    if (isNaN(finalVal) || finalVal < min) {
      finalVal = min;
    }
    
    setInputValue(finalVal);
    if (propValue === undefined) setInternalValue(finalVal);
    if (finalVal !== value) {
      onChange?.(finalVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
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
        value={inputValue}
        min={min}
        style={{ width: `${Math.max(String(inputValue).length, 1)}ch` }}
        aria-label="Quantity"
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
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

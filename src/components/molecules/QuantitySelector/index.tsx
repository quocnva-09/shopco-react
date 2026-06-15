import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";
import { MAX_PER_ITEM } from "@/consts/config";

export type QuantitySelectorProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onChange"
> & {
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  onMaxExceeded?: () => void;
};

export const QuantitySelector = ({
  defaultValue = 1,
  value: propValue,
  min = 1,
  max = MAX_PER_ITEM,
  onChange,
  onMaxExceeded,
  className,
  ...rest
}: QuantitySelectorProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = propValue !== undefined ? propValue : internalValue;

  // null = not editing (show committed value); string = user is mid-edit (show raw)
  const [editValue, setEditValue] = useState<string | null>(null);

  // Derived at render — no useEffect needed
  const displayValue = editValue ?? String(value);

  const handleDecrease = () => {
    const next = value > min ? value - 1 : value;
    if (propValue === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const handleIncrease = () => {
    const next = value + 1;
    if (max !== undefined && next > max) {
      onMaxExceeded?.();
      return;
    }
    if (propValue === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setEditValue(raw); // store raw string for display only
    if (raw === "") return;
    const num = parseInt(raw, 10);
    // Only commit valid-range values during typing — blur handles clamping
    if (!isNaN(num) && num >= min && (max === undefined || num <= max)) {
      if (propValue === undefined) setInternalValue(num);
      onChange?.(num);
    }
  };

  const handleBlur = () => {
    const raw = editValue ?? "";
    let finalVal = raw === "" ? min : parseInt(raw, 10);
    let exceeded = false;

    if (isNaN(finalVal) || finalVal < min) {
      finalVal = min;
    } else if (max !== undefined && finalVal > max) {
      // Guard against max < min (e.g. max=0 when cart is full) — never go below min
      finalVal = Math.max(min, max);
      exceeded = true;
    }

    setEditValue(null); // exit edit mode; displayValue re-derives from `value`
    if (propValue === undefined) setInternalValue(finalVal);

    if (exceeded) onMaxExceeded?.();
    if (finalVal !== value) onChange?.(finalVal);
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
        value={displayValue}
        min={min}
        style={{ width: `${Math.max(String(displayValue).length, 1)}ch` }}
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

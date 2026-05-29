import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Button } from "@/components/atoms/Button";
import "./SizeSelector.scss";

export type SizeSelectorProps = ComponentPropsWithoutRef<"div"> & {
  name: string;
  sizes: string[];
  defaultValue?: string;
};

export const SizeSelector = ({
  name,
  sizes,
  defaultValue,
  className,
  ...rest
}: SizeSelectorProps) => {
  const checkedValue = defaultValue || sizes?.[0];
  const [selectedSize, setSelectedSize] = useState<string>(checkedValue);

  const handleChange = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className={clsx("size-selector", className)} {...rest}>
      {sizes.map((size, idx) => {
        const inputId = `${name}-${idx}`;
        return (
          <span key={size}>
            <input
              type="radio"
              name={name}
              id={inputId}
              value={size}
              className="size-selector__input"
              checked={selectedSize === size}
              onChange={() => handleChange(size)}
            />
            <label htmlFor={inputId} className="size-selector__label">
              <Button
                variant="solid"
                colorScheme="grey"
                className={clsx(
                  "size-selector__button",
                  selectedSize === size && "is-active",
                )}
                tabIndex={-1}
                onClick={() => handleChange(size)}
              >
                {size}
              </Button>
            </label>
          </span>
        );
      })}
    </div>
  );
};

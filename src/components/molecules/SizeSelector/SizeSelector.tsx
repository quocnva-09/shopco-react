import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Button } from "@/components/atoms/Button";
import "./SizeSelector.scss";
import type { SizeItem } from "@/types/product";

export type SizeSelectorProps = ComponentPropsWithoutRef<"div"> & {
  name: string;
  sizes: SizeItem[];
  defaultValue?: string;
};

export const SizeSelector = ({
  name,
  sizes,
  defaultValue,
  className,
  ...rest
}: SizeSelectorProps) => {
  const checkedValue = defaultValue || sizes?.[0]?.size;
  const [selectedSize, setSelectedSize] = useState<string>(checkedValue);

  const handleChange = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className={clsx("size-selector", className)} {...rest}>
      {sizes.map((item) => {
        const inputId = `${name}-${item.size}`;
        return (
          <span key={item.size}>
            <input
              type="radio"
              name={name}
              id={inputId}
              value={item.size}
              className="size-selector__input"
              checked={selectedSize === item.size}
              onChange={() => handleChange(item.size)}
            />
            <label htmlFor={inputId} className="size-selector__label">
              <Button
                variant="solid"
                colorScheme="grey"
                className={clsx(
                  "size-selector__button",
                  selectedSize === item.size && "is-active",
                )}
                tabIndex={-1}
                onClick={() => handleChange(item.size)}
              >
                {item.label}
              </Button>
            </label>
          </span>
        );
      })}
    </div>
  );
};

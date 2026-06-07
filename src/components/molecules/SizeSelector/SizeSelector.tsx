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
  const checkedValue = defaultValue ?? sizes?.[0]?.name;
  const [selectedSize, setSelectedSize] = useState<string>(checkedValue);

  const handleChange = (sizeName: string) => {
    setSelectedSize(sizeName);
  };

  return (
    <div className={clsx("size-selector", className)} {...rest}>
      {sizes.map((item) => {
        const inputId = `${name}-${item.name}`;
        return (
          <span key={item.name}>
            <input
              type="radio"
              name={name}
              id={inputId}
              value={item.name}
              className="size-selector__input"
              checked={selectedSize === item.name}
              onChange={() => handleChange(item.name)}
            />
            <label htmlFor={inputId} className="size-selector__label">
              <Button
                variant="solid"
                colorScheme="grey"
                className={clsx(
                  "size-selector__button",
                  selectedSize === item.name && "is-active",
                )}
                tabIndex={-1}
                onClick={() => handleChange(item.name)}
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

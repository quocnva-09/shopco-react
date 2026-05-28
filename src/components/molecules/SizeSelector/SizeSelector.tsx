import { type ComponentPropsWithoutRef } from "react";
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
  const checkedValue = defaultValue || sizes[0];

  return (
    <div className={clsx("size-selector", className)} {...rest}>
      {sizes.map((size, idx) => {
        const id = `${name}-${idx}`;
        return (
          <span key={size}>
            <input
              type="radio"
              name={name}
              id={id}
              value={size}
              defaultChecked={size === checkedValue}
              className="size-selector__input"
            />
            <label htmlFor={id} className="size-selector__label">
              <Button
                variant="solid"
                colorScheme="grey"
                className="size-selector__button"
                tabIndex={-1}
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

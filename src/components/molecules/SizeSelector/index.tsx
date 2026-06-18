import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Button } from "@/components/atoms/Button";
import "./index.scss";
import type { SizeItem } from "@/types/size";

export type SizeSelectorProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onChange"
> & {
  name: string;
  sizes: SizeItem[];
  /** ID of the pre-selected size. Defaults to the first size's id. */
  defaultValue?: number;
  onChange?: (sizeId: number) => void;
};

export const SizeSelector = ({
  name,
  sizes,
  defaultValue,
  onChange,
  className,
  ...rest
}: SizeSelectorProps) => {
  const defaultId = defaultValue ?? sizes?.[0]?.id;
  const [selectedSizeId, setSelectedSizeId] = useState<number>(defaultId);

  const handleChange = (sizeId: number) => {
    setSelectedSizeId(sizeId);
    onChange?.(sizeId);
  };

  return (
    <div className={clsx("size-selector", className)} {...rest}>
      {sizes.map((item) => {
        const inputId = `${name}-size-${item.id}`;
        return (
          <span key={item.id}>
            <input
              type="radio"
              name={name}
              id={inputId}
              value={item.id}
              className="size-selector__input"
              checked={selectedSizeId === item.id}
              onChange={() => handleChange(item.id)}
            />
            <label htmlFor={inputId} className="size-selector__label">
              <Button
                variant="solid"
                colorScheme="grey"
                className={clsx(
                  "size-selector__button",
                  selectedSizeId === item.id && "is-active",
                )}
                tabIndex={-1}
                onClick={() => handleChange(item.id)}
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

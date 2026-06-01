import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import "./ColorSelector.scss";
import type { ColorItem } from "@/types/product";

export type ColorSelectorProps = ComponentPropsWithoutRef<"div"> & {
  name: string;
  colors: ColorItem[];
  defaultValue?: string;
};

export const ColorSelector = ({
  name,
  colors,
  defaultValue,
  className,
  ...rest
}: ColorSelectorProps) => {
  const checkedId = defaultValue || colors[0]?.color;
  const [selectedColor, setSelectedColor] = useState<string>(checkedId);

  const handleChange = (colorId: string) => {
    setSelectedColor(colorId);
  };

  return (
    <div className={clsx("color-selector", className)} {...rest}>
      {colors.map((item) => {
        const inputId = `${item.color}`;
        return (
          <span key={item.color}>
            <input
              type="radio"
              name={name}
              id={inputId}
              value={item.color}
              className="color-selector__input"
              checked={selectedColor === item.color}
              onChange={() => handleChange(item.color)}
            />
            <label
              htmlFor={inputId}
              className="color-selector__label"
              title={item.color}
            >
              <IconButton
                svgName="vector-tick"
                backgroundColor={item.hex}
                color="#fff"
                className={clsx(
                  "color-selector__swatch",
                  selectedColor === item.color && "is-active",
                )}
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => handleChange(item.color)}
              />
            </label>
          </span>
        );
      })}
    </div>
  );
};

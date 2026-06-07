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
  const checkedId = defaultValue ?? colors[0]?.name;
  const [selectedColor, setSelectedColor] = useState<string>(checkedId);

  const handleChange = (colorName: string) => {
    setSelectedColor(colorName);
  };

  return (
    <div className={clsx("color-selector", className)} {...rest}>
      {colors.map((item) => {
        const inputId = `${name}-${item.name}`;
        return (
          <span key={item.name}>
            <input
              type="radio"
              name={name}
              id={inputId}
              value={item.name}
              className="color-selector__input"
              checked={selectedColor === item.name}
              onChange={() => handleChange(item.name)}
            />
            <label
              htmlFor={inputId}
              className="color-selector__label"
              title={item.name}
            >
              <IconButton
                svgName="vector-tick"
                backgroundColor={item.hexCode}
                color="#fff"
                className={clsx(
                  "color-selector__swatch",
                  selectedColor === item.name && "is-active",
                )}
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => handleChange(item.name)}
              />
            </label>
          </span>
        );
      })}
    </div>
  );
};

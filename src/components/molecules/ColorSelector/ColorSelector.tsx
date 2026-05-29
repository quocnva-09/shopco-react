import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import "./ColorSelector.scss";

export interface ColorItem {
  id: string;
  name: string;
  hex: string;
}

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
  const checkedId = defaultValue || colors[0]?.id;
  const [selectedColor, setSelectedColor] = useState<string>(checkedId);

  const handleChange = (colorId: string) => {
    setSelectedColor(colorId);
  };

  return (
    <div className={clsx("color-selector", className)} {...rest}>
      {colors.map((item) => {
        const inputId = `${item.id}`;
        return (
          <span key={item.id}>
            <input
              type="radio"
              name={name}
              id={inputId}
              value={item.id}
              className="color-selector__input"
              checked={selectedColor === item.id}
              onChange={() => handleChange(item.id)}
            />
            <label
              htmlFor={inputId}
              className="color-selector__label"
              title={item.name}
            >
              <IconButton
                svgName="vector-tick"
                backgroundColor={item.hex}
                color="#fff"
                className={clsx(
                  "color-selector__swatch",
                  selectedColor === item.id && "is-active",
                )}
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => handleChange(item.id)}
              />
            </label>
          </span>
        );
      })}
    </div>
  );
};

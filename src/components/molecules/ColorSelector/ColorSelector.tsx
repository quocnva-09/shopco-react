import { type ComponentPropsWithoutRef } from "react";
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
              defaultChecked={item.id === checkedId}
              className="color-selector__input"
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
                className="color-selector__swatch"
                tabIndex={-1}
                aria-hidden="true"
              />
            </label>
          </span>
        );
      })}
    </div>
  );
};

import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";
import type { ColorItem } from "@/types/color";

export type ColorSelectorProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onChange"
> & {
  name: string;
  colors: ColorItem[];
  /** ID of the pre-selected color. Defaults to the first color's id. */
  defaultValue?: number;
  onChange?: (colorId: number) => void;
};

export const ColorSelector = ({
  name,
  colors,
  defaultValue,
  onChange,
  className,
  ...rest
}: ColorSelectorProps) => {
  const defaultId = defaultValue ?? colors[0]?.id;
  const [selectedColorId, setSelectedColorId] = useState<number>(defaultId);

  const handleChange = (colorId: number) => {
    setSelectedColorId(colorId);
    onChange?.(colorId);
  };

  return (
    <div className={clsx("color-selector", className)} {...rest}>
      {colors.map((item) => {
        const inputId = `${name}-color-${item.id}`;
        return (
          <span key={item.id}>
            <input
              type="radio"
              name={name}
              id={inputId}
              value={item.id}
              className="color-selector__input"
              checked={selectedColorId === item.id}
              onChange={() => handleChange(item.id)}
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
                  selectedColorId === item.id && "is-active",
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

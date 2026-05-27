import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Icon } from "../Icon/Icon";
import "./IconButton.scss";

type IconButtonVariant = "default" | "ghost" | "circular" | "social" | "no-fill";

export interface IconButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "children"
> {
  svgName: string;
  color?: string;
  backgroundColor?: string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  variant?: IconButtonVariant;
}

export const IconButton = ({
  svgName,
  color,
  backgroundColor,
  iconWidth,
  iconHeight,
  variant = "default",
  type = "button",
  className,
  style,
  ...rest
}: IconButtonProps) => {
  return (
    <button
      type={type}
      className={clsx("icon-button", `icon-button--${variant}`, className)}
      style={{ backgroundColor, ...style }}
      {...rest}
    >
      <Icon
        svgName={svgName}
        width={iconWidth}
        height={iconHeight}
        color={color}
      />
    </button>
  );
};

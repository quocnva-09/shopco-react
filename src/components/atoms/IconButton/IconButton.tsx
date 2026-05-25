import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Icon } from "../Icon/Icon";
import styles from "./IconButton.module.scss";

type IconButtonVariant = "default" | "ghost" | "circular";

export interface IconButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  svgName: string;
  ariaLabel: string;
  color?: string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  variant?: IconButtonVariant;
}

export const IconButton = ({
  svgName,
  ariaLabel,
  color,
  iconWidth,
  iconHeight,
  variant = "default",
  type = "button",
  className,
  ...rest
}: IconButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles["icon-button"], styles[`icon-button--${variant}`], className)}
      aria-label={ariaLabel}
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
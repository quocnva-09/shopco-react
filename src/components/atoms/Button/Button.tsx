import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import clsx from "clsx";
import "./Button.scss";

export type ButtonVariant = "solid" | "outline";
export type ButtonColor = "dark" | "danger" | "grey";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  colorScheme?: ButtonColor;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
};

export const Button = ({
  variant = "solid",
  colorScheme = "dark",
  fullWidth = false,
  icon,
  iconPosition = "left",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        "button",
        `button--${variant}-${colorScheme}`, // Output chuỗi tĩnh: "button--solid-dark", "button--outline-dark"
        fullWidth && "button--full-width",
        icon && "button--icon",
        className,
      )}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <span className="button__icon-wrapper">{icon}</span>
      )}

      {children && <span className="button__text">{children}</span>}

      {icon && iconPosition === "right" && (
        <span className="button__icon-wrapper">{icon}</span>
      )}
    </button>
  );
};

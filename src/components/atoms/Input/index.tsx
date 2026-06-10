import { forwardRef, type ComponentPropsWithRef } from "react";
import clsx from "clsx";
import "./index.scss";

export type InputProps = ComponentPropsWithRef<"input"> & {
  unstyled?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", unstyled = false, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx(!unstyled && "form-input", className)}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

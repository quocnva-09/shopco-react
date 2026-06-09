import { type ComponentPropsWithoutRef, type Ref } from "react";
import clsx from "clsx";
import "./index.scss";

export type InputProps = ComponentPropsWithoutRef<"input"> & {
  unstyled?: boolean;
  inputRef?: Ref<HTMLInputElement>;
};

export const Input = ({
  type = "text",
  unstyled = false,
  className,
  inputRef,
  ...rest
}: InputProps) => {
  return (
    <input
      ref={inputRef}
      type={type}
      className={clsx(!unstyled && "form-input", className)}
      {...rest}
    />
  );
};

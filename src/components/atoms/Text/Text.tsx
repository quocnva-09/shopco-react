import { type HTMLAttributes } from "react";
import clsx from "clsx";
import "./Text.scss";

type TextVariant = "p" | "span" | "div";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextVariant;
  lineClamp?: number;
  children: React.ReactNode;
}

export const Text = ({
  as: Component = "p",
  children,
  className,
  lineClamp,
  ...rest 
}: TextProps) => {
  return (
    <Component
      className={clsx(
        "text",
        lineClamp && `text--clamp-${lineClamp}`,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
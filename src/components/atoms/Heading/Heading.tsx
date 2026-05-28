import { type ComponentPropsWithoutRef, type ElementType } from "react";
import clsx from "clsx";
import "./Heading.scss";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingProps = ComponentPropsWithoutRef<"h1"> & {
  as?: HeadingTag;
  lineClamp?: number;
  showTooltip?: boolean;
  tooltipClassName?: string;
  fontSize?: string | number;
  fontFamily?: string;
};

export const Heading = ({
  as: Component = "h3",
  lineClamp = 1,
  showTooltip = false,
  tooltipClassName,
  fontSize,
  fontFamily,
  className,
  style,
  children,
  ...rest
}: HeadingProps) => {
  const textContent = typeof children === "string" ? children : "";

  return (
    <div
      className={clsx(
        "heading-wrapper",
        showTooltip && "heading-wrapper--has-tooltip",
      )}
    >
      <Component
        className={clsx(
          "heading-text",
          lineClamp === 1 && "heading-text--ellipsis",
          lineClamp > 1 && "heading-text--clamp",
          className,
        )}
        style={{
          ...(lineClamp > 1
            ? ({ "--line-clamp": lineClamp } as React.CSSProperties)
            : undefined),
          fontSize,
          fontFamily,
          ...style,
        }}
        title={!showTooltip ? textContent : undefined}
        {...rest}
      >
        {children}
      </Component>

      {showTooltip && textContent && (
        <span className={clsx("tooltip", tooltipClassName)} aria-hidden="true">
          {textContent}
        </span>
      )}
    </div>
  );
};

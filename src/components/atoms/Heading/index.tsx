import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import "./index.scss";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingProps = ComponentPropsWithoutRef<"h1"> & {
  as?: HeadingTag;
  lineClamp?: number;
  showTooltip?: boolean;
  tooltipClassName?: string;
  fontSize?: string | number;
  fontFamily?: string;
  /** Number of lines to show on mobile (overrides lineClamp). If not provided, lineClamp is used as-is */
  mobileLineClamp?: number;
  /** Show tooltip on mobile? If not provided, follows showTooltip */
  mobileShowTooltip?: boolean;
};

export const Heading = ({
  as: Component = "h3",
  lineClamp = 1,
  showTooltip = false,
  tooltipClassName,
  fontSize,
  fontFamily,
  mobileLineClamp,
  mobileShowTooltip,
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
        mobileLineClamp !== undefined && "heading-wrapper--mobile-clamp",
        mobileShowTooltip === false &&
          showTooltip &&
          "heading-wrapper--mobile-no-tooltip",
      )}
      style={
        mobileLineClamp !== undefined
          ? ({ "--mobile-line-clamp": mobileLineClamp } as React.CSSProperties)
          : undefined
      }
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

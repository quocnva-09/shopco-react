import { type HTMLAttributes } from "react";
import clsx from "clsx";
import "./Text.scss";

type TextVariant = "p" | "span" | "div";

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextVariant;
  lineClamp?: number;
  showTooltip?: boolean;
  tooltipClassName?: string;
  /** Number of lines to show on mobile (overrides lineClamp). If not provided, lineClamp is used as-is */
  mobileLineClamp?: number;
  /** Show tooltip on mobile? If not provided, follows showTooltip */
  mobileShowTooltip?: boolean;
  children: React.ReactNode;
};

export const Text = ({
  as: Component = "p",
  children,
  className,
  lineClamp,
  showTooltip = false,
  tooltipClassName,
  mobileLineClamp,
  mobileShowTooltip,
  ...rest
}: TextProps) => {
  // Extract plain text from children to use as Tooltip content
  const textContent = typeof children === "string" ? children : "";

  // Core text element responsible for text truncation
  const textElement = (
    <Component
      className={clsx(
        "text",
        lineClamp && "text--clamp",
        mobileLineClamp !== undefined && "text--mobile-clamp",
        className,
      )}
      style={
        {
          ...(lineClamp
            ? ({ "--line-clamp": lineClamp } as React.CSSProperties)
            : undefined),
          ...(mobileLineClamp !== undefined
            ? ({ "--mobile-line-clamp": mobileLineClamp } as React.CSSProperties)
            : undefined),
        }
      }
      title={!showTooltip ? textContent : undefined}
      {...rest}
    >
      {children}
    </Component>
  );

  // If no tooltip is needed, render the text element directly to avoid unnecessary DOM wrapper
  if (!showTooltip) return textElement;

  // If tooltip is present, wrap in the hover-management wrapper
  return (
    <div
      className={clsx(
        "text-wrapper",
        mobileShowTooltip === false && showTooltip && "text-wrapper--mobile-no-tooltip",
      )}
    >
      {textElement}

      {textContent && (
        <span className={clsx("tooltip", tooltipClassName)} aria-hidden="true">
          {textContent}
        </span>
      )}
    </div>
  );
};
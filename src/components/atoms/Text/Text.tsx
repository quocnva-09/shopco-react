import { type HTMLAttributes } from "react";
import clsx from "clsx";
import "./Text.scss";

type TextVariant = "p" | "span" | "div";

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextVariant;
  lineClamp?: number;
  showTooltip?: boolean;
  tooltipClassName?: string;
  /** Số dòng hiển thị trên mobile (override lineClamp). Nếu không truyền → giữ nguyên lineClamp */
  mobileLineClamp?: number;
  /** Hiện tooltip trên mobile? Nếu không truyền → theo showTooltip */
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
  // Trích xuất chuỗi chữ thuần từ children để làm nội dung Tooltip
  const textContent = typeof children === "string" ? children : "";

  // Thẻ text core xử lý cắt chữ
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

  // Nếu không cần tooltip, render thẳng thẻ text để tránh dư thừa DOM wrapper
  if (!showTooltip) return textElement;

  // Nếu có tooltip, bọc trong wrapper quản lý hover
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
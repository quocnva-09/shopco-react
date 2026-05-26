import { type HTMLAttributes } from "react";
import clsx from "clsx";
import "./Text.scss";

type TextVariant = "p" | "span" | "div";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextVariant;
  lineClamp?: number;
  showTooltip?: boolean; // Cờ bật/tắt tính năng Tooltip khi hover
  tooltipClassName?: string; // Nhận class modifier từ global (.tooltip--comment, .tooltip--review-card)
  children: React.ReactNode;
}

export const Text = ({
  as: Component = "p",
  children,
  className,
  lineClamp,
  showTooltip = false,
  tooltipClassName,
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
        className
      )}
      style={
        lineClamp
          ? ({ "--line-clamp": lineClamp } as React.CSSProperties)
          : undefined
      }
      title={!showTooltip ? textContent : undefined} // Dùng title mặc định nếu không bật Custom Tooltip
      {...rest}
    >
      {children}
    </Component>
  );

  // Nếu không cần tooltip, render thẳng thẻ text để tránh dư thừa DOM wrapper
  if (!showTooltip) return textElement;

  // Nếu có tooltip, bọc trong wrapper quản lý hover
  return (
    <div className="text-wrapper">
      {textElement}
      
      {textContent && (
        <span className={clsx("tooltip", tooltipClassName)} aria-hidden="true">
          {textContent}
        </span>
      )}
    </div>
  );
};
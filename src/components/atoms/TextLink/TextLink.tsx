import { type ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import "./TextLink.scss";

// 1. Kế thừa toàn bộ thuộc tính tiêu chuẩn của thẻ <a> (id, target, rel, onClick, style...)
interface TextLinkProps extends ComponentPropsWithoutRef<"a"> {
  href: string; // Ép thuộc tính href bắt buộc phải truyền đối với một liên kết
  children: React.ReactNode;
}

const isInternal = (href: string) => {
  if (!href) return false;
  return href.startsWith("/") && !href.startsWith("//");
};

export const TextLink = ({
  href,
  className,
  children,
  ...rest // 2. Gom toàn bộ các thuộc tính HTML tiêu chuẩn còn lại (target, rel, onClick, id...) vào túi rest
}: TextLinkProps) => {
  const internal = isInternal(href);
  const combinedClassName = clsx("text-link", className);

  // Trường hợp 1: Đường dẫn nội bộ -> Dùng <Link> của React Router để chuyển trang không bị load lại web
  if (internal) {
    return (
      <Link 
        to={href} 
        className={combinedClassName} 
        {...rest} // 3. Đường ống trung chuyển đẩy tự động target, rel... vào đây
      >
        {children}
      </Link>
    );
  }

  // Trường hợp 2: Đường dẫn bên ngoài (ví dụ: link facebook, google...) -> Dùng thẻ <a> truyền thống
  return (
    <a 
      href={href} 
      className={combinedClassName} 
      {...rest} // 3. Đẩy tự động target, rel... xuống thẻ <a> gốc
    >
      {children}
    </a>
  );
};
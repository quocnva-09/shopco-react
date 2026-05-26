import { type ComponentPropsWithoutRef, type Ref } from "react";
import clsx from "clsx";
import "./Input.scss"; // Đổi tên file từ index.scss sang Input.scss cho đồng bộ BEM hệ thống

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  unstyled?: boolean; // Cờ xóa bỏ style mặc định nếu muốn tự custom riêng biệt
  inputRef?: Ref<HTMLInputElement>; // Hỗ trợ truyền Ref để điều khiển input (focus, select...) từ component cha
}

/**
 * Input atom - Nguyên tử nhập liệu đầu vào chuẩn hóa hệ thống.
 */
export const Input = ({
  type = "text",
  unstyled = false,
  className,
  inputRef,
  ...rest // Gom toàn bộ các props chuẩn còn lại (value, placeholder, onChange, aria-*,...) vào rest
}: InputProps) => {
  return (
    <input
      ref={inputRef}
      type={type}
      className={clsx(
        !unstyled && "form-input", // Đổi tên class sang "form-input" để chuẩn BEM, tránh trùng với từ khóa tag html
        className,
      )}
      {...rest} // Trải toàn bộ thuộc tính tự động xuống thẻ input
    />
  );
};

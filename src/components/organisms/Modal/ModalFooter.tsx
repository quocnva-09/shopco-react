import { type ReactNode } from "react";
import clsx from "clsx";

export type ModalFooterProps = {
  children: ReactNode;
  className?: string;
};

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return <div className={clsx("modal__footer", className)}>{children}</div>;
};

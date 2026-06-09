import { type ReactNode } from "react";
import clsx from "clsx";

export type ModalBodyProps = {
  children: ReactNode;
  className?: string;
};

export const ModalBody = ({ children, className }: ModalBodyProps) => {
  return <div className={clsx("modal__body", className)}>{children}</div>;
};

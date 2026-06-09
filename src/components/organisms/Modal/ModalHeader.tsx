import { type ReactNode } from "react";
import clsx from "clsx";
import { useModalContext } from "./Modal";
import { Heading } from "@/components/atoms/Heading/Heading";
import { IconButton } from "@/components/atoms/IconButton/IconButton";

export type ModalHeaderProps = {
  title: string | ReactNode;
  className?: string;
  hideCloseButton?: boolean;
};

export const ModalHeader = ({ title, className, hideCloseButton = false }: ModalHeaderProps) => {
  const { onClose } = useModalContext();

  return (
    <div className={clsx("modal__header", className)}>
      {typeof title === "string" ? (
        <Heading as="h3" className="modal__title">
          {title}
        </Heading>
      ) : (
        title
      )}
      {!hideCloseButton && (
        <IconButton
          svgName="icn-close"
          variant="ghost"
          onClick={onClose}
          aria-label="Close modal"
          className="modal__close-btn"
        />
      )}
    </div>
  );
};

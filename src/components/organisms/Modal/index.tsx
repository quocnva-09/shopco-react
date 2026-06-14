import { createContext, useContext, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type ModalContextType = {
  onClose: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal compound components must be used within a <Modal> component.");
  }
  return context;
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
};

export type ModalHeaderProps = {
  title: string | ReactNode;
  className?: string;
  hideCloseButton?: boolean;
};

export type ModalBodyProps = {
  children: ReactNode;
  className?: string;
};

export type ModalFooterProps = {
  children: ReactNode;
  className?: string;
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const Header = ({ title, className, hideCloseButton = false }: ModalHeaderProps) => {
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

const Body = ({ children, className }: ModalBodyProps) => (
  <div className={clsx("modal__body", className)}>{children}</div>
);

const Footer = ({ children, className }: ModalFooterProps) => (
  <div className={clsx("modal__footer", className)}>{children}</div>
);

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

const Root = ({
  isOpen,
  onClose,
  children,
  className,
  closeOnOverlayClick = true,
}: ModalProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const modalContent = (
    <ModalContext.Provider value={{ onClose }}>
      <div
        className="modal-overlay"
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
      >
        <div className={clsx("modal", className)}>{children}</div>
      </div>
    </ModalContext.Provider>
  );

  return createPortal(modalContent, document.body);
};

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

export const Modal = Object.assign(Root, {
  Header,
  Body,
  Footer,
});

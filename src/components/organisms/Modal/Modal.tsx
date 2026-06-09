import { createContext, useContext, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import "./Modal.scss";

type ModalContextType = {
  onClose: () => void;
};

// Create a context to share the onClose function with child components (Header, Footer, etc.)
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal compound components must be used within a <Modal> component.");
  }
  return context;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
};

export const ModalBase = ({
  isOpen,
  onClose,
  children,
  className,
  closeOnOverlayClick = true,
}: ModalProps) => {
  // Prevent scrolling on body when modal is open to ensure only modal content scrolls
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

  // Handle Escape key to close the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // If not open or running on server (SSR), render nothing
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
        <div className={clsx("modal", className)}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );

  // Use createPortal to mount the modal outside the main DOM hierarchy
  return createPortal(modalContent, document.body);
};

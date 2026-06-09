import { Modal } from "../Modal";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { CONFIRM_MESSAGES } from "@/consts/messages";
import type { ReactNode } from "react";
import "./ConfirmModal.scss";

export type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string | ReactNode;
  message?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = CONFIRM_MESSAGES.DEFAULT_TITLE,
  message = CONFIRM_MESSAGES.DEFAULT_MESSAGE,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header title={title} />
      <Modal.Body>
        <Text className="confirm-modal__message">{message}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          colorScheme={isDestructive ? "danger" : "dark"}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

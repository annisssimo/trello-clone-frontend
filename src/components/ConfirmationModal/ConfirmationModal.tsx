import { Modal } from '../Modal/Modal';
import * as styles from './ConfirmationModal.css';

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3>{title}</h3>
      <p>{description}</p>
      <br />
      <button onClick={onConfirm} className={styles.confirmButton}>
        {confirmLabel}
      </button>
      <button onClick={onClose} className={styles.cancelButton}>
        {cancelLabel}
      </button>
    </Modal>
  );
};

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

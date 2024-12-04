import { ReactNode } from 'react';
import { RxCross2 } from 'react-icons/rx';

import * as styles from './Modal.css';

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <RxCross2 />
        </button>
        {children}
      </div>
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

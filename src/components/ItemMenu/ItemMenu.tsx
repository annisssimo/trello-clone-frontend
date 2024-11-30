import { useState, MouseEvent } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import * as styles from './ItemMenu.css';

interface ItemMenuProps {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ItemMenu = ({
  title,
  description,
  onConfirm,
  confirmLabel,
  cancelLabel,
}: ItemMenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event: MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <BsThreeDots onClick={handleOpenModal} className={styles.dots} />
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={() => {
            onConfirm();
            handleCloseModal();
          }}
          title={title}
          description={description}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
        />
      )}
    </>
  );
};

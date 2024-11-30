import { useState, MouseEvent } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import * as styles from './Board.css';
import { Modal } from '../Modal/Modal';

export const Board = ({ title, boardId, onDelete }: BoardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event: MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDelete = (): void => {
    onDelete(boardId);
    handleCloseModal();
  };

  return (
    <div className={styles.boardContainer}>
      <span>{title}</span>
      <button onClick={handleOpenModal} className={styles.dotsButton}>
        <BsThreeDots size={16} />
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h3>Delete Board</h3>
          <p>Are you sure you want to delete this board?</p>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete
          </button>
          <button onClick={handleCloseModal} className={styles.cancelButton}>
            Cancel
          </button>
        </Modal>
      )}
    </div>
  );
};

interface BoardProps {
  title: string;
  boardId: number;
  onDelete: (board: number) => void;
}

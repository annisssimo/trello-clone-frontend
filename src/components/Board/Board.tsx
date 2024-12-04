import * as styles from './Board.css';
import { ItemMenu } from '../ItemMenu/ItemMenu';

export const Board = ({ title, boardId, onDelete }: BoardProps) => {
  const handleDelete = () => {
    onDelete(boardId);
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        <span>{title}</span>
        <ItemMenu
          title="Delete Board"
          description="Are you sure you want to delete this board?"
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

interface BoardProps {
  title: string;
  boardId: number;
  onDelete: (board: number) => void;
}

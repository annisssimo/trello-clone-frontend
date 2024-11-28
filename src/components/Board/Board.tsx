import * as styles from './Board.css';

export const Board = ({ title }: BoardProps) => {
  return <div className={styles.boardContainer}>{title}</div>;
};

interface BoardProps {
  title: string;
}

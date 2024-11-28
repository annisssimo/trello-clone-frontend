import * as styles from './Sidebar.css';
import { Board } from '../Board/Board';
import { useEffect, useState } from 'react';
import { getAllBoards } from '../../api/api';
import { Board as BoardType } from '../../types/types';

export const Sidebar = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boards = await getAllBoards();
        setBoards(boards);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.header}>
        <span>My Board</span>
        <button className={styles.plusButton}>+</button>
      </div>
      <ul className={styles.boardList}>
        {boards.map((board) => (
          <li key={board.id}>
            <Board title={board.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

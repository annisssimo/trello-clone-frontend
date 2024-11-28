import { useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as styles from './Sidebar.css';
import { Board } from '../Board/Board';
import { Board as BoardType } from '../../types/types';
import {
  fetchBoards,
  createBoard,
  setCurrentBoard,
} from '../../store/slices/boardsSlice';
import { AppDispatch, RootState } from '../../store/store';
import { Modal } from '../Modal/Modal';

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { boards, isLoading, error, currentBoard } = useSelector(
    (state: RootState) => state.boards
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleAddBoard = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewBoardTitle('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newBoardTitle.trim()) {
      const resultAction = await dispatch(
        createBoard({ title: newBoardTitle })
      );
      if (createBoard.fulfilled.match(resultAction)) {
        dispatch(setCurrentBoard(resultAction.payload));
        handleCloseModal();
      }
    }
  };

  const handleSelectBoard = (board: BoardType) => {
    dispatch(setCurrentBoard(board));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.header}>
        <span>My Boards</span>
        <button className={styles.plusButton} onClick={handleAddBoard}>
          +
        </button>
      </div>
      <ul className={styles.boardList}>
        {boards.map((board: BoardType) => (
          <li
            key={board.id}
            className={currentBoard?.id === board.id ? styles.activeBoard : ''}
            onClick={() => handleSelectBoard(board)}
          >
            <Board title={board.title} />
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Create New Board</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Board Title"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            required
          />
          <button type="submit">Create Board</button>
        </form>
      </Modal>
    </div>
  );
};

export default Sidebar;

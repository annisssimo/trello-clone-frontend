import { useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as styles from './Sidebar.css';
import { Board } from '../Board/Board';
import { Board as BoardType } from '../../types/types';
import {
  fetchBoards,
  createBoard,
  setCurrentBoard,
  deleteBoard,
} from '../../store/slices/boardsSlice';
import { AppDispatch, RootState } from '../../store/store';
import { Modal } from '../Modal/Modal';
import Input from '../Input/Input';
import { removeListsByBoardId } from '../../store/slices/listsSlice';

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

  const handleDeleteBoard = (boardId: number) => {
    dispatch(deleteBoard(boardId)).then(() => {
      dispatch(removeListsByBoardId(boardId));
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.sidebarContainer}>
        <div className={styles.header}>
          <span>My Boards</span>
          <button className={styles.plusButton} onClick={handleAddBoard}>
            +
          </button>
        </div>
        {error && <div className="error">{error}</div>}
        <ul className={styles.boardList}>
          {boards.map((board: BoardType) => (
            <li
              key={board.id}
              className={
                currentBoard?.id === board.id ? styles.activeBoard : ''
              }
              onClick={() => handleSelectBoard(board)}
            >
              <Board
                title={board.title}
                boardId={board.id}
                onDelete={handleDeleteBoard}
              />
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Create New Board</h2>
        <form onSubmit={handleSubmit}>
          <Input
            id="boardTitle"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            label="Board Title"
            required
          />
          <button type="submit" className={styles.createBoardButton}>
            Create Board
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Sidebar;

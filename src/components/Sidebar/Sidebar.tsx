import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as styles from './Sidebar.css';
import { Board } from '../Board/Board';
import { Board as BoardType, List } from '../../types/types';
import {
  fetchBoards,
  setCurrentBoard,
  deleteBoard,
  setIsBoardLoaded,
} from '../../store/slices/boardsSlice';
import { AppDispatch, RootState } from '../../store/store';
import {
  clearLists,
  removeListsByBoardId,
} from '../../store/slices/listsSlice';
import { clearTasks } from '../../store/slices/tasksSlice';
import CreateBoardModal from '../CreateBoardModal/CreateBoardModal';

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { boards, isLoading, error, currentBoard } = useSelector(
    (state: RootState) => state.boards
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleAddBoard = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectBoard = async (board: BoardType & { lists?: List[] }) => {
    if (currentBoard?.id !== board.id) {
      dispatch(clearLists());
      dispatch(clearTasks());
      dispatch(setCurrentBoard(board));
      dispatch(setIsBoardLoaded(false));
    }
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

      <CreateBoardModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Sidebar;

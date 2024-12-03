import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import List from '../List/List';
import ListComposerButton from '../ListComposerButton/ListComposerButton';
import * as styles from './BoardMainContent.css';
import { AppDispatch, RootState } from '../../store/store';
import { fetchBoardWithListsAndTasks } from '../../store/slices/boardsSlice';

const BoardMainContent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { lists, isLoading, error } = useSelector(
    (state: RootState) => state.lists
  );
  const { currentBoard, isBoardLoaded } = useSelector(
    (state: RootState) => state.boards
  );

  useEffect(() => {
    if (currentBoard && lists.length === 0 && !isBoardLoaded) {
      dispatch(fetchBoardWithListsAndTasks(currentBoard.id));
    }
  }, [dispatch, currentBoard, lists.length, isBoardLoaded]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.boardMainContentContainer}>
      {error && <div className="error">{error}</div>}
      {lists
        .slice()
        .sort((a, b) => a.listOrder - b.listOrder)
        .map((list) => (
          <List key={list.id} id={Number(list.id)} title={list.title} />
        ))}
      {currentBoard && <ListComposerButton />}
    </div>
  );
};

export default BoardMainContent;

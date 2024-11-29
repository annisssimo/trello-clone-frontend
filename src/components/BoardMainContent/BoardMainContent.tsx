import { useDispatch, useSelector } from 'react-redux';

import List from '../List/List';
import ListComposerButton from '../ListComposerButton/ListComposerButton';
import * as styles from './BoardMainContent.css';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { fetchLists } from '../../store/slices/listsSlice';

const BoardMainContent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { lists, isLoading, error } = useSelector(
    (state: RootState) => state.lists
  );

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  useEffect(() => {
    if (currentBoard) {
      dispatch(fetchLists(currentBoard.id));
    }
  }, [dispatch, currentBoard]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.boardMainContentContainer}>
      {lists.map((list) => (
        <List key={list.id} title={list.title} />
      ))}
      <ListComposerButton />
    </div>
  );
};

export default BoardMainContent;

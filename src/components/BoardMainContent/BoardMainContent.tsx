import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import List from '../List/List';
import ListComposerButton from '../ListComposerButton/ListComposerButton';
import * as styles from './BoardMainContent.css';
import { AppDispatch, RootState } from '../../store/store';
import { fetchLists } from '../../store/slices/listsSlice';
import { fetchTasks } from '../../store/slices/tasksSlice';

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
      dispatch(fetchLists(currentBoard.id))
        .unwrap()
        .then((lists) => {
          lists.forEach((list: { id: number }) => {
            dispatch(fetchTasks(list.id));
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, currentBoard]);

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
      <ListComposerButton />
    </div>
  );
};

export default BoardMainContent;

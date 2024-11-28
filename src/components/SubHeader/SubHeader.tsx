import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { updateBoard, setCurrentBoard } from '../../store/slices/boardsSlice';
import * as styles from './SubHeader.css';

const SubHeader = () => {
  const { currentBoard } = useSelector((state: RootState) => state.boards);
  const dispatch = useDispatch<AppDispatch>();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(currentBoard?.title || '');

  useEffect(() => {
    if (currentBoard) {
      setNewTitle(currentBoard.title);
    }
  }, [currentBoard]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleBlur = () => {
    if (currentBoard) {
      dispatch(updateBoard({ id: currentBoard.id, title: newTitle }));
      dispatch(setCurrentBoard({ ...currentBoard, title: newTitle }));
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentBoard) {
      dispatch(updateBoard({ id: currentBoard.id, title: newTitle }));
      dispatch(setCurrentBoard({ ...currentBoard, title: newTitle }));
      setIsEditing(false);
    }
  };

  const title = currentBoard ? currentBoard.title : 'No board';

  return (
    <div className={styles.subHeader}>
      <div className={styles.title} onClick={handleClick}>
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        ) : (
          title
        )}
      </div>
      <div className={styles.dots}>...</div>
    </div>
  );
};

export default SubHeader;

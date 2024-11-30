import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { updateBoard, setCurrentBoard } from '../../store/slices/boardsSlice';
import EditableText from '../EditableText/EditableText';
import * as styles from './SubHeader.css';

const SubHeader = () => {
  const { currentBoard } = useSelector((state: RootState) => state.boards);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = (newTitle: string) => {
    if (currentBoard) {
      dispatch(updateBoard({ id: currentBoard.id, title: newTitle }));
      dispatch(setCurrentBoard({ ...currentBoard, title: newTitle }));
    }
  };

  return (
    <div className={styles.subHeader}>
      {currentBoard ? (
        <EditableText
          value={currentBoard.title}
          onSave={handleSave}
          className={styles.title}
        />
      ) : (
        'No board'
      )}
      <button className={styles.activityButton}>Show activity</button>
    </div>
  );
};

export default SubHeader;

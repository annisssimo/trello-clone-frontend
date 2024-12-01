import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '../../store/store';
import { updateBoard, setCurrentBoard } from '../../store/slices/boardsSlice';
import EditableText from '../EditableText/EditableText';
import * as styles from './SubHeader.css';
import ActivitySidebar from '../ActivitySidebar/ActivitySidebar';

const SubHeader = () => {
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const dispatch = useDispatch<AppDispatch>();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSave = (newTitle: string) => {
    if (currentBoard) {
      dispatch(updateBoard({ id: currentBoard.id, title: newTitle }));
      dispatch(setCurrentBoard({ ...currentBoard, title: newTitle }));
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
      <button className={styles.activityButton} onClick={toggleSidebar}>
        {isSidebarOpen ? 'Hide activity' : 'Show activity'}
      </button>
      {isSidebarOpen && <ActivitySidebar onClose={toggleSidebar} />}
    </div>
  );
};

export default SubHeader;

import { useDispatch } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';

import { updateList } from '../../store/slices/listsSlice';
import { AppDispatch } from '../../store/store';
import EditableText from '../EditableText/EditableText';
import * as styles from './ListTitle.css';

const ListTitle = ({ title, listId }: ListTitleProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = (newTitle: string) => {
    dispatch(updateList({ id: listId, title: newTitle }));
  };

  return (
    <div className={styles.listTitleContainer}>
      <EditableText
        value={title}
        onSave={handleSave}
        className={styles.title}
      />
      <BsThreeDots className={styles.dots} />
    </div>
  );
};

export default ListTitle;

interface ListTitleProps {
  title: string;
  listId: number;
}

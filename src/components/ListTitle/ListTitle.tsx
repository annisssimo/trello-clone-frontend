import { useDispatch } from 'react-redux';
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
    <EditableText value={title} onSave={handleSave} className={styles.title} />
  );
};

export default ListTitle;

interface ListTitleProps {
  title: string;
  listId: number;
}

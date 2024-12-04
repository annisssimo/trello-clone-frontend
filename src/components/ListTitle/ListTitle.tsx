import { useDispatch } from 'react-redux';
import { updateList } from '../../store/slices/listsSlice';
import EditableText from '../EditableText/EditableText';
import { ItemMenu } from '../ItemMenu/ItemMenu';
import * as styles from './ListTitle.css';
import { AppDispatch } from '../../store/store';

const ListTitle = ({ title, listId, onDelete }: ListTitleProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = (newTitle: string) => {
    if (newTitle.trim() && newTitle !== title) {
      dispatch(updateList({ id: listId, title: newTitle }));
    }
  };

  const handleListDelete = () => {
    onDelete(listId);
  };

  return (
    <div className={styles.listTitleContainer}>
      <EditableText
        value={title}
        onSave={handleSave}
        className={styles.title}
      />
      <ItemMenu
        title="Delete List"
        description="Are you sure you want to delete this list?"
        onConfirm={handleListDelete}
      />
    </div>
  );
};

export default ListTitle;

interface ListTitleProps {
  title: string;
  listId: number;
  onDelete: (listId: number) => void;
}

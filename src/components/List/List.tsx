import * as styles from './List.css';
import Button from '../Button/Button';

const List = ({ title }: ListProps) => {
  const handleOpenForm = () => {
    console.log('opened!');
  };

  return (
    <div className={styles.listContainer}>
      <span>{title}</span>
      <Button onClick={handleOpenForm}>+ Add a task</Button>
    </div>
  );
};

export default List;

interface ListProps {
  title: string;
}

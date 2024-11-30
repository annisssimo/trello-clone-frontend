import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import * as styles from './List.css';
import Button from '../Button/Button';
import AddForm from '../AddForm/AddForm';
import { AppDispatch, RootState } from '../../store/store';
import { createTask, fetchTasks } from '../../store/slices/tasksSlice';
import Task from '../Task/Task';
import ListTitle from '../ListTitle/ListTitle';
import { removeList } from '../../store/slices/listsSlice';

const List = ({ id, title }: ListProps) => {
  const { tasks, isLoading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTasks(id));
  }, [dispatch, id]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (taskTitle.trim()) {
      const resultAction = await dispatch(
        createTask({ title: taskTitle, listId: id })
      );

      if (createTask.fulfilled.match(resultAction)) {
        setTaskTitle('');
      }

      handleCloseForm();
    }
  };

  const handleOpenForm = () => {
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleDeleteList = (id: number) => {
    dispatch(removeList(id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.listContainer}>
      {error && <div className="error">{error}</div>}
      <ListTitle title={title} listId={id} onDelete={handleDeleteList} />
      {tasks[id]
        ?.slice()
        ?.sort((a, b) => a.taskOrder - b.taskOrder)
        ?.map((task) => (
          <Task key={task.id} task={task} listId={id} />
        ))}
      {isOpen ? (
        <AddForm
          handleCloseForm={handleCloseForm}
          handleSubmit={handleSubmit}
          onChange={onChange}
        />
      ) : (
        <Button onClick={handleOpenForm}>+ Add a card</Button>
      )}
    </div>
  );
};

export default List;

interface ListProps {
  id: number;
  title: string;
}

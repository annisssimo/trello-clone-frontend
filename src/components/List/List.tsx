import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, FormEvent, useState } from 'react';

import * as styles from './List.css';
import Button from '../Button/Button';
import AddForm from '../AddForm/AddForm';
import { AppDispatch, RootState } from '../../store/store';
import { createTask } from '../../store/slices/tasksSlice';
import Task from '../Task/Task';

const List = ({ id, title }: ListProps) => {
  const tasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task: { listId: number }) => task.listId === id)
  );

  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

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

  return (
    <div className={styles.listContainer}>
      <span>{title}</span>
      {tasks
        .slice()
        .sort((a, b) => a.taskOrder - b.taskOrder)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
      {isOpen ? (
        <AddForm
          handleCloseForm={handleCloseForm}
          handleSubmit={handleSubmit}
          onChange={onChange}
        />
      ) : (
        <Button onClick={handleOpenForm}>+ Add a task</Button>
      )}
    </div>
  );
};

export default List;

interface ListProps {
  id: number;
  title: string;
}

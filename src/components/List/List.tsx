import { useDispatch } from 'react-redux';
import { ChangeEvent, FormEvent, useState } from 'react';

import * as styles from './List.css';
import Button from '../Button/Button';
import AddForm from '../AddForm/AddForm';
import { AppDispatch } from '../../store/store';
import { createTask } from '../../store/slices/tasksSlice';
import Task from '../Task/Task';
import { Task as TaskType } from '../../types/types';

const List = ({ id, title, tasks }: ListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [localTasks, setLocalTasks] = useState<TaskType[]>(tasks);

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
        const newTask = resultAction.payload;
        setLocalTasks((prevTasks) => [...prevTasks, newTask]);
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
      {localTasks.map((task) => (
        <Task key={task.id} title={task.title} />
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
  tasks: TaskType[];
}

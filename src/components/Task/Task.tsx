import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as styles from './Task.css';
import { Modal } from '../Modal/Modal';
import Input from '../Input/Input';
import { deleteTask, updateTask } from '../../store/slices/tasksSlice';
import { AppDispatch, RootState } from '../../store/store';
import { Task as TaskType } from '../../types/types';

const Task = ({ task, listId }: TaskProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updatedTask = useSelector(
    (state: RootState) =>
      state.tasks.tasks[listId]?.find((t) => t.id === task.id) || task
  );

  const openEditingModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [localTask, setLocalTask] = useState({
    title: updatedTask.title,
    description: updatedTask.description || '',
  });

  const handleInputChange =
    (field: keyof typeof localTask) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalTask((prevLocalTask) => ({
        ...prevLocalTask,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultAction = await dispatch(
      updateTask({
        id: task.id,
        title: localTask.title,
        description: localTask.description || '',
      })
    );

    if (updateTask.fulfilled.match(resultAction)) {
      setIsModalOpen(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <>
      <div className={styles.taskContainer} onClick={openEditingModal}>
        {updatedTask.title}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <Input
            id="title"
            label="Title"
            value={localTask.title}
            onChange={handleInputChange('title')}
          />

          <Input
            id="description"
            label="Description"
            value={localTask.description}
            onChange={handleInputChange('description')}
          />

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Task;

interface TaskProps {
  task: TaskType;
  listId: number;
}

import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as styles from './Task.css';
import { Modal } from '../Modal/Modal';
import Input from '../Input/Input';
import { updateTask } from '../../store/slices/tasksSlice';
import { AppDispatch } from '../../store/store';
import { Task as TaskType } from '../../types/types';

const Task = ({ task }: TaskProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || '',
  });

  const openEditingModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange =
    (field: keyof typeof editedTask) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedTask((prevEditedTask) => ({
        ...prevEditedTask,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultAction = await dispatch(
      updateTask({
        id: task.id,
        title: editedTask.title,
        description: editedTask.description || '',
      })
    );

    if (updateTask.fulfilled.match(resultAction)) {
      setEditedTask({
        title: resultAction.payload.title,
        description: resultAction.payload.description || '',
      });
      handleCloseModal();
    }
  };

  return (
    <>
      <div className={styles.taskContainer} onClick={openEditingModal}>
        {editedTask.title}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <Input
            id="title"
            label="Title"
            value={editedTask.title}
            onChange={handleInputChange('title')}
          />

          <Input
            id="description"
            label="Description"
            value={editedTask.description}
            onChange={handleInputChange('description')}
          />

          <button type="submit" className={styles.createBoardButton}>
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Task;

interface TaskProps {
  task: TaskType;
}

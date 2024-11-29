import { FormEvent, useEffect, useState } from 'react';
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

  const [localTask, setLocalTask] = useState({
    title: task.title,
    description: task.description || '',
  });

  useEffect(() => {
    setEditedTask({
      title: task.title,
      description: task.description || '',
    });
  }, [task]);

  const openEditingModal = () => {
    setLocalTask({
      title: editedTask.title,
      description: editedTask.description,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      setEditedTask({
        title: resultAction.payload.title,
        description: resultAction.payload.description || '',
      });
      setIsModalOpen(false);
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
            value={localTask.title}
            onChange={handleInputChange('title')}
          />

          <Input
            id="description"
            label="Description"
            value={localTask.description}
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

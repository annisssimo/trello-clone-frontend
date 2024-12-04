import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteTask, updateTask } from '../../store/slices/tasksSlice';
import { AppDispatch } from '../../store/store';
import { Task as TaskType } from '../../types/types';
import { Modal } from '../Modal/Modal';
import Input from '../Input/Input';
import * as style from './EditTaskModal.css';

const EditTaskModal = ({ isOpen, onClose, task }: EditTaskModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [localTask, setLocalTask] = useState({
    title: task.title,
    description: task.description || '',
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
      onClose();
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
        <div className={style.buttonContainer}>
          <button type="submit" className={style.saveButton}>
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={style.deleteButton}
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskType;
}

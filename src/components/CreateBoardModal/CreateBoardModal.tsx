import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { createBoard } from '../../store/slices/boardsSlice';
import { clearLists } from '../../store/slices/listsSlice';
import { clearTasks } from '../../store/slices/tasksSlice';
import { AppDispatch } from '../../store/store';
import { Modal } from '../Modal/Modal';
import Input from '../Input/Input';
import * as style from './CreateBoardModal.css';

const CreateBoardModal = ({ isOpen, onClose }: CreateBoardModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newBoardTitle.trim()) {
      const resultAction = await dispatch(
        createBoard({ title: newBoardTitle })
      );
      if (createBoard.fulfilled.match(resultAction)) {
        dispatch(clearLists());
        dispatch(clearTasks());
        onClose();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Create New Board</h2>
      <form onSubmit={handleSubmit}>
        <Input
          id="boardTitle"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          label="Board Title"
          required
        />
        <button type="submit" className={style.saveButton}>
          Create Board
        </button>
      </form>
    </Modal>
  );
};

export default CreateBoardModal;

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddForm from '../AddForm/AddForm';
import Button from '../Button/Button';
import { AppDispatch, RootState } from '../../store/store';
import { addList } from '../../store/slices/listsSlice';

const ListComposerButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [listName, setListName] = useState('');

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setListName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (listName.trim() && currentBoard !== null) {
      dispatch(
        addList({
          title: listName,
          boardId: currentBoard.id,
        })
      );
      handleCloseForm();
    }
  };

  const handleOpenForm = () => {
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  return isOpen ? (
    <AddForm
      handleCloseForm={handleCloseForm}
      handleSubmit={handleSubmit}
      onChange={onChange}
    />
  ) : (
    <Button onClick={handleOpenForm}>+ Add one more column</Button>
  );
};

export default ListComposerButton;

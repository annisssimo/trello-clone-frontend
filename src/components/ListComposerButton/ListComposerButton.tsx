import { useState } from 'react';
import AddForm from '../AddForm/AddForm';
import Button from '../Button/Button';

const ListComposerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenForm = () => {
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  return isOpen ? (
    <AddForm handleCloseForm={handleCloseForm} />
  ) : (
    <Button onClick={handleOpenForm}>+ Add one more column</Button>
  );
};

export default ListComposerButton;

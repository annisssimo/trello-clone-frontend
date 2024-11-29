import { FormEvent, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';

import * as styles from './AddForm.css';
import { AppDispatch, RootState } from '../../store/store';
import { addList } from '../../store/slices/listsSlice';

const AddForm = ({ handleCloseForm }: AddFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard
  );

  const [listName, setListName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (listName.trim() && currentBoard !== null) {
      dispatch(addList({ title: listName, boardId: currentBoard.id }));
      handleCloseForm();
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <textarea
        className={styles.textArea}
        placeholder="Enter column name…"
        onChange={(e) => setListName(e.target.value)}
      />
      <div>
        <button className={styles.addButton} type="submit">
          Add a list
        </button>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={handleCloseForm}
        >
          <RxCross2 />
        </button>
      </div>
    </form>
  );
};

export default AddForm;

interface AddFormProps {
  handleCloseForm: () => void;
}

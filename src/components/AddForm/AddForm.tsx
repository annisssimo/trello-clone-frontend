import { FormEvent } from 'react';
import { RxCross2 } from 'react-icons/rx';

import * as styles from './AddForm.css';

const AddForm = ({ handleCloseForm, handleSubmit, onChange }: AddFormProps) => {
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <textarea
        className={styles.textArea}
        placeholder="Enter name…"
        onChange={onChange}
      />
      <div>
        <button className={styles.addButton} type="submit">
          Add
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
  handleSubmit: (e: FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

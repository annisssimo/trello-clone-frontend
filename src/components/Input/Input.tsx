import { ChangeEvent } from 'react';
import * as styles from './Input.css';

const Input = ({
  value = '',
  onChange,
  label,
  id,
  required,
  ...props
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={styles.createBoardInput}
        type="text"
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;

interface InputProps {
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
  required?: boolean;
}

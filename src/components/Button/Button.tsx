import { ReactNode } from 'react';
import * as styles from './Button.css';

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.composerButton}>
      {children}
    </button>
  );
};

export default Button;

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

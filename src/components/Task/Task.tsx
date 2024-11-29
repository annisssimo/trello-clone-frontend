import * as styles from './Task.css';

const Task = ({ title }: TaskProps) => {
  return <div className={styles.taskContainer}>{title}</div>;
};

export default Task;

interface TaskProps {
  title: string;
}

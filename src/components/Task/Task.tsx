import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { Task as TaskType } from '../../types/types';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import * as styles from './Task.css';

const Task = ({ task, listId, moveTask }: TaskProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'TASK',
    item: { id: task.id, listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'TASK',
    drop: (item: { id: number; listId: number }) => {
      if (item.id !== task.id) {
        moveTask(item.id, item.listId, task.id, listId);
      }
    },
  });

  const updatedTask = useSelector(
    (state: RootState) =>
      state.tasks.tasks[listId]?.find((t) => t.id === task.id) || task
  );

  const openEditingModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        ref={(node) => dragRef(dropRef(node))}
        className={styles.taskContainer}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={openEditingModal}
      >
        {updatedTask.title}
      </div>
      <EditTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={updatedTask}
      />
    </>
  );
};

export default Task;

interface TaskProps {
  task: TaskType;
  listId: number;
  moveTask: (
    draggedTaskId: number,
    fromListId: number,
    targetTaskId: number,
    toListId: number
  ) => void;
}

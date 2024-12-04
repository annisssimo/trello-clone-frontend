import { useSelector } from 'react-redux';

import * as styles from './ActivitySidebar.css';
import { RootState } from '../../store/store';

const ActivitySidebar = ({ onClose }: { onClose: () => void }) => {
  const logs = useSelector((state: RootState) => state.logs.logs);

  console.log(logs);

  return (
    <div className={styles.sidebar}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <h2 className={styles.title}>Activity Logs</h2>
      <ul className={styles.logList}>
        {logs
          .slice()
          .reverse()
          .map((log, index) => (
            <li key={index} className={styles.logItem}>
              <span className={styles.logAction}>{log.action}</span>
              <span className={styles.logDate}>
                {new Date(log.date).toLocaleString()}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ActivitySidebar;

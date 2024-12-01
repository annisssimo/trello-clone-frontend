import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as styles from './ActivitySidebar.css';
import { fetchLogs } from '../../store/slices/logsSlice';
import { AppDispatch, RootState } from '../../store/store';

const ActivitySidebar = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const logs = useSelector((state: RootState) => state.logs.logs);

  useEffect(() => {
    dispatch(fetchLogs());

    const interval = setInterval(() => {
      dispatch(fetchLogs());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

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

import { Middleware } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLogs } from '../slices/logsSlice';

const logMiddleware: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store) => (next) => async (action: any) => {
    const result = next(action);
    try {
      if (
        action.type.startsWith('boards/') ||
        action.type.startsWith('tasks/') ||
        action.type.startsWith('lists/')
      ) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/logs`
        );
        store.dispatch(setLogs(response.data));
      }
    } catch (error) {
      console.error(error);
    }
    return result;
  };

export default logMiddleware;

import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './slices/boardsSlice';
import listsReducer from './slices/listsSlice';
import tasksReducer from './slices/tasksSlice';
import logsReducer from './slices/logsSlice';
import logMiddleware from './middleware/logMiddleware';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    tasks: tasksReducer,
    logs: logsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

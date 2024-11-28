import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './slices/boardsSlice';
import listsReducer from './slices/listsSlice';
import tasksReducer from './slices/tasksSlice';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

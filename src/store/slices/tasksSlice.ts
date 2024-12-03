import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task, TaskList } from '../../types/types';

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (listId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks/${listId}`
      );
      return { listId, data: response.data };
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (newTask: { title: string; listId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        newTask
      );
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    {
      id,
      title,
      description,
    }: { id: number; title: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`,
        {
          title,
          description,
        }
      );
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
      return id;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const reorderTasks = createAsyncThunk(
  'tasks/reorderTasks',
  async (
    { listId, orderedTaskIds }: { listId: number; orderedTaskIds: number[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/reorder/${listId}`,
        {
          orderedTaskIds,
        }
      );
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const moveTaskToList = createAsyncThunk(
  'tasks/moveTaskToList',
  async (
    {
      taskId,
      fromListId,
      toListId,
      targetTaskId,
    }: {
      taskId: number;
      fromListId: number;
      toListId: number;
      targetTaskId: number | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/move`,
        {
          taskId,
          fromListId,
          toListId,
          targetTaskId,
        }
      );
      return {
        taskId,
        fromListId,
        toListId,
        updatedLists: response.data.updatedLists,
      };
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TaskList>) => {
      state.tasks = action.payload;
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = {
          ...state.tasks,
          [action.payload.listId]: action.payload.data,
        };
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = {
          ...state.tasks,
          [action.payload.listId]: [
            ...(state.tasks?.[action.payload.listId] || []),
            action.payload,
          ],
        };
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTask = action.payload;
        const tasks = state.tasks[updatedTask.listId];
        const index = tasks?.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          tasks[index] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        for (const listId in state.tasks) {
          state.tasks[listId] = state.tasks[listId].filter(
            (task) => task.id !== action.payload
          );
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(reorderTasks.fulfilled, (state, action) => {
        const { listId, orderedTaskIds } = action.meta.arg;

        const currentTasks = state.tasks[listId] || [];

        const updatedTasks = orderedTaskIds
          .map((id) => currentTasks.find((task) => task.id === id))
          .filter((task): task is Task => task !== undefined);

        state.tasks[listId] = updatedTasks;
      })
      .addCase(reorderTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(moveTaskToList.fulfilled, (state, action) => {
        const { fromListId, toListId, updatedLists } = action.payload;

        state.tasks[fromListId] = updatedLists[fromListId];
        state.tasks[toListId] = updatedLists[toListId];
      })
      .addCase(moveTaskToList.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setTasks, clearTasks } = tasksSlice.actions;

export default tasksSlice.reducer;

interface TasksState {
  tasks: TaskList;
  isLoading: boolean;
  error: string | null;
}

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task } from '../../types/types';

const initialState: ListsState = {
  lists: [],
  isLoading: false,
  error: null,
};

export const fetchLists = createAsyncThunk(
  'lists/fetchLists',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/lists/${boardId}`
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

export const addList = createAsyncThunk(
  'lists/addList',
  async (newList: Omit<List, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/lists`,
        {
          title: newList.title,
          boardId: newList.boardId,
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

export const removeList = createAsyncThunk(
  'lists/removeList',
  async (listId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/lists/${listId}`);
      return listId;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const updateList = createAsyncThunk(
  'lists/updateList',
  async (updateData: { id: string; title: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/lists/${updateData.id}`,
        {
          title: updateData.title,
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

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(addList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists.push(action.payload);
      })
      .addCase(addList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(removeList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = state.lists.filter(
          (list) => list.id !== Number(action.payload)
        );
      })
      .addCase(removeList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(updateList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, title } = action.payload;
        const list = state.lists.find((list) => list.id === id);
        if (list) {
          list.title = title;
        }
      })
      .addCase(updateList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default listsSlice.reducer;

interface List {
  id: number;
  title: string;
  boardId: string;
  tasks: Task[];
}

interface ListsState {
  lists: List[];
  isLoading: boolean;
  error: string | null;
}

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Board, List, Task } from '../../types/types';
import { setLists } from './listsSlice';
import { setTasks } from './tasksSlice';

const initialState: BoardsState = {
  boards: [],
  isLoading: false,
  error: null,
  currentBoard: null,
  isBoardLoaded: false,
};

export const fetchBoardWithListsAndTasks = createAsyncThunk(
  'boards/fetchBoardWithListsAndTasks',
  async (boardId: number, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/boards/${boardId}`
      );

      const boardData = response.data;

      const initialAccumulator: { [key: number]: Task[] } = {};
      const tasksByList = boardData.lists.reduce(
        (acc: { [key: number]: Task[] }, list: List) => {
          acc[list.id] = list.tasks || [];
          return acc;
        },
        initialAccumulator
      );

      dispatch(setCurrentBoard(boardData));
      dispatch(setLists(boardData.lists));
      dispatch(setTasks(tasksByList));
      dispatch(setIsBoardLoaded(true));

      return boardData;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/boards`
      );
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (newBoard: { title: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/boards`,
        newBoard
      );
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, title }: { id: number; title: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/boards/${id}`,
        {
          title,
        }
      );
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/boards/${id}`);
      return id;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoard: (state, action: PayloadAction<Board | null>) => {
      state.currentBoard = action.payload;
    },
    setIsBoardLoaded: (state, action: PayloadAction<boolean>) => {
      state.isBoardLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardWithListsAndTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBoardWithListsAndTasks.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchBoardWithListsAndTasks.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchBoards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = action.payload;
        if (!state.currentBoard && action.payload.length > 0) {
          state.currentBoard = action.payload[0];
        }
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards.push(action.payload);
        state.currentBoard = action.payload;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(updateBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedBoard = action.payload;

        const index = state.boards.findIndex(
          (board) => board.id === updatedBoard.id
        );

        if (index !== -1) {
          state.boards[index] = updatedBoard;
        }

        state.currentBoard = {
          ...state.currentBoard,
          id: state.currentBoard?.id ?? updatedBoard.id,
          title: updatedBoard.title,
        };
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedBoardId = Number(action.payload);

        state.boards = state.boards.filter(
          (board) => board.id !== deletedBoardId
        );

        if (state.currentBoard?.id === deletedBoardId) {
          state.currentBoard = state.boards.length > 0 ? state.boards[0] : null;
        }
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

interface BoardsState {
  boards: Board[];
  isLoading: boolean;
  error: string | null;
  currentBoard: Board | null;
  isBoardLoaded: boolean;
}

export const { setCurrentBoard, setIsBoardLoaded } = boardsSlice.actions;

export default boardsSlice.reducer;

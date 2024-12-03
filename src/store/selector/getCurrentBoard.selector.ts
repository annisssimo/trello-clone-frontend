import { RootState } from '../store';

export const getCurrentBoardSelector = (state: RootState) =>
  state.boards.boards.find(
    (b) =>
      b.id === Number(localStorage.getItem('currentBoardId')) ||
      state.boards.boards[0]
  );

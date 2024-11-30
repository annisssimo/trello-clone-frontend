export interface Board {
  id: number;
  title: string;
}

export interface List {
  id: number;
  title: string;
  boardId: number;
  listOrder: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  listId: number;
  taskOrder: number;
}

export type TaskList = Record<number, Task[]>;

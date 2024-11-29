export interface Task {
  taskOrder: number;
  id: number;
  title: string;
  description?: string;
  listId: number;
}

export interface List {
  id: number;
  title: string;
  tasks: Task[];
}

export interface Board {
  id: number;
  title: string;
  lists?: List[];
}

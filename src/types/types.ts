export interface Task {
  id: string;
  title: string;
  description?: string;
}

export interface List {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  title: string;
  lists: List[];
}

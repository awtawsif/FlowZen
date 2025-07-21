export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  subtasks: Subtask[];
};

export type List = {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
};

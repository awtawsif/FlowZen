"use client";

import type { List, Task } from '@/lib/types';
import { AddTaskForm } from './add-task-form';
import { TaskItem } from './task-item';
import { ScrollArea } from './ui/scroll-area';

type TaskViewProps = {
  list: List;
  onUpdateTask: (listId: string, updatedTask: Task) => void;
  onDeleteTask: (listId: string, taskId: string) => void;
  onAddTask: (listId: string, task: Omit<Task, 'id' | 'completed' | 'subtasks'>) => void;
};

export function TaskView({ list, onUpdateTask, onDeleteTask, onAddTask }: TaskViewProps) {
  if (!list) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p>Select a list to see your tasks</p>
        <p className="text-sm">or create a new one to get started.</p>
      </div>
    );
  }

  const handleUpdate = (updatedTask: Task) => {
    onUpdateTask(list.id, updatedTask);
  };
  
  const handleDelete = (taskId: string) => {
    onDeleteTask(list.id, taskId);
  };

  const handleAdd = (task: Omit<Task, 'id' | 'completed' | 'subtasks'>) => {
    onAddTask(list.id, task);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        {list.description && <p className="text-muted-foreground">{list.description}</p>}
      </header>
      <div className="p-4">
        <AddTaskForm onAddTask={handleAdd} />
      </div>
      <ScrollArea className="flex-grow p-4">
        {list.tasks.length > 0 ? (
          <div className="space-y-3">
            {list.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdateTask={handleUpdate}
                onDeleteTask={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No tasks yet. Add one above!</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

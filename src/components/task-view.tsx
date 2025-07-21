"use client";

import { useEffect, useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import type { List, Task } from '@/lib/types';
import { AddTaskForm } from './add-task-form';
import { TaskItem } from './task-item';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

type TaskViewProps = {
  list: List;
  onUpdateTask: (listId: string, updatedTask: Task) => void;
  onDeleteTask: (listId: string, taskId: string) => void;
  onAddTask: (listId: string, task: Omit<Task, 'id' | 'completed' | 'subtasks'>) => void;
};

export function TaskView({ list, onUpdateTask, onDeleteTask, onAddTask }: TaskViewProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | undefined>();

  useEffect(() => {
    const hasUnfinishedTasks = list.tasks.some(task => !task.completed);
    if (!hasUnfinishedTasks) {
      setActiveAccordion("add-task-item");
    } else {
      setActiveAccordion(undefined);
    }
  }, [list.tasks]);


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
        <Accordion type="single" collapsible className="w-full" value={activeAccordion} onValueChange={setActiveAccordion}>
          <AccordionItem value="add-task-item" className="border-b-0">
            <AccordionTrigger 
              className={cn(
                "py-2 px-4 rounded-md text-sm font-semibold hover:no-underline",
                activeAccordion === 'add-task-item' ? 'bg-muted' : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4"/>
                Add a new task
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
               <AddTaskForm onAddTask={handleAdd} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <ScrollArea className="flex-grow p-4 pt-0">
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

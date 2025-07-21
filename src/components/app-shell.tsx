"use client";

import { useState } from 'react';
import type { List, Task } from '@/lib/types';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { TaskView } from './task-view';

const initialLists: List[] = [];


export function AppShell() {
  const [lists, setLists] = useState<List[]>(initialLists);
  const [selectedListId, setSelectedListId] = useState<string | null>(initialLists[0]?.id || null);

  const handleSelectList = (id: string) => {
    setSelectedListId(id);
  };

  const handleAddList = (newListData: Omit<List, 'id' | 'tasks'>) => {
    const newList: List = {
      ...newListData,
      id: crypto.randomUUID(),
      tasks: [],
    };
    setLists((prev) => [...prev, newList]);
    setSelectedListId(newList.id);
  };

  const handleUpdateTask = (listId: string, updatedTask: Task) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          tasks: list.tasks.map(task => task.id === updatedTask.id ? updatedTask : task),
        };
      }
      return list;
    }));
  };
  
  const handleDeleteTask = (listId: string, taskId: string) => {
     setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          tasks: list.tasks.filter(task => task.id !== taskId),
        };
      }
      return list;
    }));
  };

  const handleAddTask = (listId: string, taskData: Omit<Task, 'id' | 'completed' | 'subtasks'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      completed: false,
      subtasks: [],
    };
    setLists(lists.map(list => {
      if (list.id === listId) {
        return { ...list, tasks: [newTask, ...list.tasks] };
      }
      return list;
    }));
  };


  const selectedList = lists.find(list => list.id === selectedListId);

  return (
    <SidebarProvider>
      <SidebarNav
        lists={lists}
        selectedListId={selectedListId}
        onSelectList={handleSelectList}
        onAddList={handleAddList}
      />
      <SidebarInset className="flex flex-col">
          {selectedList ? (
            <>
              <div className="p-4 border-b flex items-center gap-2">
                <h1 className="text-2xl font-bold">{selectedList?.name}</h1>
              </div>
              <TaskView 
                list={selectedList!}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onAddTask={handleAddTask}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p>Select a list to see your tasks</p>
              <p className="text-sm">or create a new one to get started.</p>
            </div>
          )}

      </SidebarInset>
    </SidebarProvider>
  );
}

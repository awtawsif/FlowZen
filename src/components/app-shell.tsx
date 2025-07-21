"use client";

import { useState } from 'react';
import type { List, Task } from '@/lib/types';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { TaskView } from './task-view';

const initialLists: List[] = [
  {
    id: '1',
    name: 'Personal Errands',
    description: 'Daily and weekly personal tasks.',
    tasks: [
      { id: '1-1', title: 'Buy groceries', completed: false, subtasks: [] },
      { id: '1-2', title: 'Go to the post office', completed: true, dueDate: new Date(), subtasks: [] },
      { id: '1-3', title: 'Schedule dentist appointment', completed: false, description: 'Call Dr. Smith\'s office to schedule a cleaning.', subtasks: [] },
    ],
  },
  {
    id: '2',
    name: 'Work Projects',
    description: 'Tasks related to the new website launch.',
    tasks: [
      { id: '2-1', title: 'Design homepage mockups', completed: false, subtasks: [
        { id: '2-1-1', title: 'Gather inspiration', completed: true },
        { id: '2-1-2', title: 'Create wireframes', completed: true },
        { id: '2-1-3', title: 'Finalize color palette', completed: false },
      ]},
      { id: '2-2', title: 'Develop API endpoints', completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), subtasks: [] },
    ],
  },
];


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
          <div className="p-2 md:hidden">
              <SidebarTrigger/>
          </div>
          <TaskView 
            list={selectedList!}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
          />
      </SidebarInset>
    </SidebarProvider>
  );
}

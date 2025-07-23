"use client";

import { useState } from 'react';
import type { List, Note, Task } from '@/lib/types';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { TaskView } from './task-view';
import { NoteView } from './note-view';

export function AppShell() {
  const [lists, setLists] = useState<List[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeView, setActiveView] = useState<'tasks' | 'notes'>('tasks');
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  const handleSelectList = (id: string) => {
    setActiveView('tasks');
    setSelectedListId(id);
  };

  const handleSelectNotes = () => {
    setActiveView('notes');
    setSelectedListId(null);
  }

  const handleAddList = (newListData: Omit<List, 'id' | 'tasks'>) => {
    const newList: List = {
      ...newListData,
      id: crypto.randomUUID(),
      tasks: [],
    };
    setLists((prev) => [...prev, newList]);
    setActiveView('tasks');
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

  const handleAddNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'New Note',
      content: '',
      createdAt: new Date(),
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };


  const selectedList = lists.find(list => list.id === selectedListId);

  return (
    <SidebarProvider>
      <SidebarNav
        lists={lists}
        selectedListId={selectedListId}
        activeView={activeView}
        onSelectList={handleSelectList}
        onSelectNotes={handleSelectNotes}
        onAddList={handleAddList}
      />
      <SidebarInset className="flex flex-col">
          {activeView === 'tasks' && selectedList ? (
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
          ) : activeView === 'notes' ? (
              <NoteView 
                notes={notes}
                onAddNote={handleAddNote}
                onUpdateNote={handleUpdateNote}
                onDeleteNote={handleDeleteNote}
              />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p>Select a list or notes to get started.</p>
            </div>
          )}
      </SidebarInset>
    </SidebarProvider>
  );
}

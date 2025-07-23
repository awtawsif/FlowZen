
"use client";

import type { Note } from '@/lib/types';
import { AddNoteButton } from './add-note-button';
import { NoteItem } from './note-item';
import { ScrollArea } from './ui/scroll-area';

type NoteViewProps = {
  notes: Note[];
  onAddNote: () => void;
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
};

export function NoteView({ notes, onAddNote, onUpdateNote, onDeleteNote }: NoteViewProps) {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notes</h1>
        <AddNoteButton onAddNote={onAddNote} />
      </header>
      <ScrollArea className="flex-grow p-4">
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onUpdateNote={onUpdateNote}
                onDeleteNote={onDeleteNote}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No notes yet. Add one to get started!</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

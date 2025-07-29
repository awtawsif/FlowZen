
"use client";

import { useState, useRef, useEffect } from 'react';
import type { Note } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { MarkdownEditor } from './markdown-editor';

type NoteItemProps = {
  note: Note;
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
};

export function NoteItem({ note, onUpdateNote, onDeleteNote }: NoteItemProps) {
  const [title, setTitle] = useState(note.title);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTitle(note.title);
  }, [note]);

  const handleContentChange = (newContent: string) => {
    onUpdateNote({ ...note, content: newContent });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
        onUpdateNote({ ...note, title: newTitle });
    }, 500);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center justify-between p-4 space-y-0">
        <Input 
          value={title}
          onChange={handleTitleChange}
          className="text-lg font-bold border-none shadow-none focus-visible:ring-0 p-0"
        />
        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => onDeleteNote(note.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="sr-only">Delete Note</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <MarkdownEditor
          value={note.content}
          onChange={handleContentChange}
        />
      </CardContent>
       <CardFooter className="p-4 pt-0">
        <p className="text-xs text-muted-foreground">
          Created: {format(note.createdAt, 'MMM d, yyyy')}
        </p>
      </CardFooter>
    </Card>
  );
}

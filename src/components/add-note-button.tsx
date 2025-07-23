
"use client";

import { Plus } from 'lucide-react';
import { Button } from './ui/button';

type AddNoteButtonProps = {
    onAddNote: () => void;
}

export function AddNoteButton({ onAddNote }: AddNoteButtonProps) {
    return (
        <Button onClick={onAddNote}>
            <Plus className="h-4 w-4 mr-2" />
            New Note
        </Button>
    )
}

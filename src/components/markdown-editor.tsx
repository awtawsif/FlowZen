
"use client";

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function MarkdownEditor({ value, onChange, className }: MarkdownEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (currentValue !== value) {
      onChange(currentValue);
    }
  };

  // Handle clicks outside the editor to save changes
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
        if (isEditing) {
          handleSave();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editorRef, isEditing, handleSave]);


  return (
    <div ref={editorRef} className={cn("w-full h-full", className)}>
      {isEditing ? (
        <Textarea
          ref={textareaRef}
          value={currentValue}
          onChange={handleTextareaChange}
          onBlur={handleSave}
          className="w-full h-full resize-none border-none shadow-none focus-visible:ring-0 p-0"
          placeholder="Start writing using Markdown..."
        />
      ) : (
        <div
          className="w-full h-full cursor-text p-0"
          onClick={() => setIsEditing(true)}
        >
          {currentValue ? (
             <ReactMarkdown
                className="markdown"
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
                }}
              >
                {currentValue}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground">Start writing...</p>
          )}
        </div>
      )}
    </div>
  );
}

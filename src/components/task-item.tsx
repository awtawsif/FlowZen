"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Check, Circle, Loader2, MoreHorizontal, Sparkles, Trash2 } from 'lucide-react';
import { suggestSubtasks } from '@/ai/flows/suggest-subtasks';
import { cn } from '@/lib/utils';
import type { Subtask, Task } from '@/lib/types';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

type TaskItemProps = {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
};

export function TaskItem({ task, onUpdateTask, onDeleteTask }: TaskItemProps) {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

  const handleToggleCompleted = () => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  const handleToggleSubtask = (subtaskId: string) => {
    const updatedSubtasks = task.subtasks.map((sub) =>
      sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
    );
    onUpdateTask({ ...task, subtasks: updatedSubtasks });
  };

  const handleSuggestSubtasks = async () => {
    setIsSuggesting(true);
    try {
      const results = await suggestSubtasks({ taskDescription: task.title });
      const newSubtasks: Subtask[] = results.map((title) => ({
        id: crypto.randomUUID(),
        title,
        completed: false,
      }));
      onUpdateTask({ ...task, subtasks: [...task.subtasks, ...newSubtasks] });
      toast({
        title: 'Subtasks suggested!',
        description: `${newSubtasks.length} new subtasks have been added.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Suggestion failed',
        description: 'Could not suggest subtasks. Please try again.',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <Card className={cn('transition-all', task.completed && 'bg-muted/50')}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={handleToggleCompleted}
            className="mt-1 h-5 w-5"
            aria-label={`Mark task ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <div className="flex-grow">
            <label
              htmlFor={`task-${task.id}`}
              className={cn('font-medium cursor-pointer', task.completed && 'line-through text-muted-foreground')}
            >
              {task.title}
            </label>
            {task.dueDate && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3" />
                <span>{format(task.dueDate, 'MMM d')}</span>
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSuggestSubtasks} disabled={isSuggesting}>
                {isSuggesting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Suggest Subtasks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteTask(task.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {(task.description || task.subtasks.length > 0) && (
          <Accordion type="single" collapsible className="w-full mt-2">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="py-1 text-sm text-muted-foreground hover:no-underline justify-start gap-1">
                Details
              </AccordionTrigger>
              <AccordionContent className="pt-2 pl-8">
                {task.description && <p className="text-sm text-muted-foreground mb-4">{task.description}</p>}
                {task.subtasks.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Subtasks</h4>
                    {task.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`subtask-${subtask.id}`}
                          checked={subtask.completed}
                          onCheckedChange={() => handleToggleSubtask(subtask.id)}
                          aria-label={`Mark subtask ${subtask.title} as ${subtask.completed ? 'incomplete' : 'complete'}`}
                        />
                        <label
                          htmlFor={`subtask-${subtask.id}`}
                          className={cn('text-sm cursor-pointer', subtask.completed && 'line-through text-muted-foreground')}
                        >
                          {subtask.title}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}

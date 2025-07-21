"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { DatePicker } from '@/components/date-picker';
import { Textarea } from '@/components/ui/textarea';
import type { Task } from '@/lib/types';
import { suggestTaskTitle } from '@/ai/flows/suggest-task-title';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(1, 'Task title cannot be empty.'),
  description: z.string().optional(),
  dueDate: z.date().optional(),
});

type AddTaskFormProps = {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'subtasks'>) => void;
};

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: undefined,
    },
  });

  const handleSuggestTitle = async () => {
    const description = form.getValues('description');
    if (!description) {
      toast({
        variant: 'destructive',
        title: 'Description needed',
        description: 'Please enter a description to suggest a title.',
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const result = await suggestTaskTitle({ taskDescription: description });
      form.setValue('title', result.taskTitle);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Suggestion failed',
        description: 'Could not suggest a title. Please try again.',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddTask(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 bg-card rounded-lg shadow space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description (for AI suggestions)</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the task to get a title suggestion..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start gap-2">
            <div className="flex-grow space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="Add a new task..." {...field} />
                      </FormControl>
                      <Button type="button" variant="outline" size="icon" onClick={handleSuggestTitle} disabled={isSuggesting} aria-label="Suggest Task Title">
                        {isSuggesting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
        </div>

        <div className="flex items-end gap-2">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <DatePicker date={field.value} setDate={field.onChange} className="w-full" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" aria-label="Add Task">
              <PlusCircle className="h-5 w-5" />
            </Button>
        </div>
      </form>
    </Form>
  );
}

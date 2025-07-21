"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DatePicker } from '@/components/date-picker';
import type { Task } from '@/lib/types';

const formSchema = z.object({
  title: z.string().min(1, 'Task title cannot be empty.'),
  dueDate: z.date().optional(),
});

type AddTaskFormProps = {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'subtasks'>) => void;
};

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      dueDate: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddTask(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2 p-4 bg-card rounded-lg shadow">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input placeholder="Add a new task..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker date={field.value} setDate={field.onChange} className="w-auto" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="icon" aria-label="Add Task">
          <PlusCircle className="h-5 w-5" />
        </Button>
      </form>
    </Form>
  );
}

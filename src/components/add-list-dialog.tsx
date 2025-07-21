"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles } from 'lucide-react';
import { suggestListName } from '@/ai/flows/suggest-list-name';
import { suggestListDescription } from '@/ai/flows/suggest-list-description';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { List } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(1, 'List name is required.'),
  description: z.string().optional(),
});

type AddListDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddList: (list: Omit<List, 'id' | 'tasks'>) => void;
};

export function AddListDialog({ isOpen, onOpenChange, onAddList }: AddListDialogProps) {
  const [isSuggestingName, setIsSuggestingName] = useState(false);
  const [isSuggestingDesc, setIsSuggestingDesc] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleSuggestName = async () => {
    const description = form.getValues('description');
    if (!description) {
      toast({
        variant: 'destructive',
        title: 'Description needed',
        description: 'Please enter a description to suggest a name.',
      });
      return;
    }
    setIsSuggestingName(true);
    try {
      const result = await suggestListName({ description });
      form.setValue('name', result.listName);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Suggestion failed',
        description: 'Could not suggest a name. Please try again.',
      });
    } finally {
      setIsSuggestingName(false);
    }
  };

  const handleSuggestDescription = async () => {
    const name = form.getValues('name');
    if (!name) {
      toast({
        variant: 'destructive',
        title: 'List name needed',
        description: 'Please enter a list name to suggest a description.',
      });
      return;
    }
    setIsSuggestingDesc(true);
    try {
      const result = await suggestListDescription({ listName: name });
      form.setValue('description', result.listDescription);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Suggestion failed',
        description: 'Could not suggest a description. Please try again.',
      });
    } finally {
      setIsSuggestingDesc(false);
    }
  };


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddList(values);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new list</DialogTitle>
          <DialogDescription>
            Organize your tasks by creating a new list. Use AI to help generate names and descriptions.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>List Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Japan Trip" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="button" variant="outline" onClick={handleSuggestName} disabled={isSuggestingName}>
                  {isSuggestingName ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  <span className="sr-only">Suggest Name</span>
                </Button>
            </div>

            <div className="flex items-end gap-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., All the things I need to do for my trip to Japan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="button" variant="outline" onClick={handleSuggestDescription} disabled={isSuggestingDesc}>
                {isSuggestingDesc ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span className="sr-only">Suggest Description</span>
              </Button>
            </div>
            
            <DialogFooter>
              <Button type="submit">Create List</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

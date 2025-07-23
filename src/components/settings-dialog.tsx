
"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getApiKey, setApiKey } from '@/lib/utils';

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
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  apiKey: z.string(),
});

type SettingsDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SettingsDialog({ isOpen, onOpenChange }: SettingsDialogProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      const storedApiKey = getApiKey();
      if (storedApiKey) {
        form.setValue('apiKey', storedApiKey);
      }
    }
  }, [isOpen, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.apiKey) {
      setApiKey(values.apiKey);
       toast({
        title: 'Settings Saved',
        description: 'Your Gemini API key has been saved.',
      });
    } else {
        toast({
        variant: 'destructive',
        title: 'API Key Missing',
        description: 'Please enter an API key to save.',
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your application settings here. The Gemini API key is required for AI features.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">AI Settings</h3>
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gemini API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your API key" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

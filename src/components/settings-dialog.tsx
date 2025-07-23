
"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getApiKey, setApiKey, getCustomTheme, setCustomTheme, hexToHsl, applyCustomTheme } from '@/lib/utils';
import { useTheme } from 'next-themes';

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
import { Separator } from './ui/separator';

const formSchema = z.object({
  apiKey: z.string().min(1, 'API Key is required.'),
  primaryColor: z.string(),
  backgroundColor: z.string(),
  accentColor: z.string(),
});

type SettingsDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SettingsDialog({ isOpen, onOpenChange }: SettingsDialogProps) {
  const { toast } = useToast();
  const { setTheme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: '',
      primaryColor: '#09090b',
      backgroundColor: '#ffffff',
      accentColor: '#f4f4f5',
    },
  });

  useEffect(() => {
    if (isOpen) {
      const storedApiKey = getApiKey();
      if (storedApiKey) {
        form.setValue('apiKey', storedApiKey);
      }
      const customTheme = getCustomTheme();
      if (customTheme) {
        form.setValue('primaryColor', customTheme.primary);
        form.setValue('backgroundColor', customTheme.background);
        form.setValue('accentColor', customTheme.accent);
      }
    }
  }, [isOpen, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Save API Key
    setApiKey(values.apiKey);

    // Save Custom Theme
    const customTheme = {
      primary: values.primaryColor,
      background: values.backgroundColor,
      accent: values.accentColor,
    };
    setCustomTheme(customTheme);

    // Apply the theme immediately
    const themeForCss = {
        primary: hexToHsl(customTheme.primary),
        background: hexToHsl(customTheme.background),
        accent: hexToHsl(customTheme.accent),
    };
    applyCustomTheme(themeForCss);
    setTheme('custom');


    toast({
      title: 'Settings Saved',
      description: 'Your API key and custom theme have been saved.',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your application settings here.
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

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Custom Theme</h3>
               <div className="grid grid-cols-3 gap-4">
                 <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} className="p-1 h-10"/>
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="backgroundColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background</FormLabel>
                      <FormControl>
                         <Input type="color" {...field} className="p-1 h-10" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="accentColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accent</FormLabel>
                      <FormControl>
                         <Input type="color" {...field} className="p-1 h-10"/>
                      </FormControl>
                    </FormItem>
                  )}
                />
               </div>
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


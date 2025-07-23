
"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getCustomTheme, setCustomTheme, hexToHsl, applyCustomTheme } from '@/lib/utils';
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  primaryColor: z.string(),
  backgroundColor: z.string(),
  accentColor: z.string(),
  foregroundColor: z.string(),
});

type ThemeCreatorDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function ThemeCreatorDialog({ isOpen, onOpenChange }: ThemeCreatorDialogProps) {
  const { toast } = useToast();
  const { setTheme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryColor: '#09090b',
      backgroundColor: '#ffffff',
      accentColor: '#f4f4f5',
      foregroundColor: '#09090b',
    },
  });

  useEffect(() => {
    if (isOpen) {
      const customTheme = getCustomTheme();
      if (customTheme) {
        form.setValue('primaryColor', customTheme.primary);
        form.setValue('backgroundColor', customTheme.background);
        form.setValue('accentColor', customTheme.accent);
        form.setValue('foregroundColor', customTheme.foreground);
      }
    }
  }, [isOpen, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const customTheme = {
      primary: values.primaryColor,
      background: values.backgroundColor,
      accent: values.accentColor,
      foreground: values.foregroundColor,
    };
    setCustomTheme(customTheme);

    const themeForCss = {
        primary: hexToHsl(customTheme.primary),
        background: hexToHsl(customTheme.background),
        accent: hexToHsl(customTheme.accent),
        foreground: hexToHsl(customTheme.foreground),
    };
    applyCustomTheme(themeForCss);
    setTheme('custom');

    toast({
      title: 'Custom Theme Saved',
      description: 'Your new theme has been applied.',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Create Custom Theme</DialogTitle>
          <DialogDescription>
            Design your own look and feel for the app. Your custom theme will be saved automatically.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
               <div className="grid grid-cols-4 gap-4">
                 <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary</FormLabel>
                      <FormControl>
                        <Input type="color" {...field} className="p-1 h-10 w-full"/>
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
                         <Input type="color" {...field} className="p-1 h-10 w-full" />
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
                         <Input type="color" {...field} className="p-1 h-10 w-full"/>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="foregroundColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                         <Input type="color" {...field} className="p-1 h-10 w-full"/>
                      </FormControl>
                    </FormItem>
                  )}
                />
               </div>
            </div>

            <DialogFooter>
              <Button type="submit">Save and Apply</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

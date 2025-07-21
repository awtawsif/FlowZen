'use server';

/**
 * @fileOverview AI agent that suggests a task title based on a description.
 *
 * - suggestTaskTitle - A function that generates a task title suggestion.
 * - SuggestTaskTitleInput - The input type for the suggestTaskTitle function.
 * - SuggestTaskTitleOutput - The return type for the suggestTaskTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskTitleInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('A description of the task to generate a title for.'),
});
export type SuggestTaskTitleInput = z.infer<typeof SuggestTaskTitleInputSchema>;

const SuggestTaskTitleOutputSchema = z.object({
  taskTitle: z.string().describe('The suggested title for the task.'),
});
export type SuggestTaskTitleOutput = z.infer<typeof SuggestTaskTitleOutputSchema>;

export async function suggestTaskTitle(input: SuggestTaskTitleInput): Promise<SuggestTaskTitleOutput> {
  return suggestTaskTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskTitlePrompt',
  input: {schema: SuggestTaskTitleInputSchema},
  output: {schema: SuggestTaskTitleOutputSchema},
  prompt: `You are a helpful assistant that suggests concise titles for tasks.

  Given the following description of a task, suggest a clear and concise title for it.

  Description: {{{taskDescription}}}
  Title:`,
});

const suggestTaskTitleFlow = ai.defineFlow(
  {
    name: 'suggestTaskTitleFlow',
    inputSchema: SuggestTaskTitleInputSchema,
    outputSchema: SuggestTaskTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

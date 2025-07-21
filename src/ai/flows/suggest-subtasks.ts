'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting subtasks for a given task.
 *
 * The flow takes a task description as input and returns a list of suggested subtasks.
 * - suggestSubtasks - A function that handles the subtask suggestion process.
 * - SuggestSubtasksInput - The input type for the suggestSubtasks function.
 * - SuggestSubtasksOutput - The return type for the suggestSubtasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSubtasksInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('The description of the task for which to suggest subtasks.'),
});
export type SuggestSubtasksInput = z.infer<typeof SuggestSubtasksInputSchema>;

const SuggestSubtasksOutputSchema = z.array(z.string()).describe('A list of suggested subtasks.');
export type SuggestSubtasksOutput = z.infer<typeof SuggestSubtasksOutputSchema>;

export async function suggestSubtasks(input: SuggestSubtasksInput): Promise<SuggestSubtasksOutput> {
  return suggestSubtasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSubtasksPrompt',
  input: {schema: SuggestSubtasksInputSchema},
  output: {schema: SuggestSubtasksOutputSchema},
  prompt: `You are a helpful task management assistant. Your role is to suggest subtasks for a given task description.

  Given the following task description, generate a list of subtasks that would be necessary to complete the task.

  Task Description: {{{taskDescription}}}

  Subtasks:`,
});

const suggestSubtasksFlow = ai.defineFlow(
  {
    name: 'suggestSubtasksFlow',
    inputSchema: SuggestSubtasksInputSchema,
    outputSchema: SuggestSubtasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview AI agent that suggests a list name based on a description.
 *
 * - suggestListName - A function that generates a list name suggestion.
 * - SuggestListNameInput - The input type for the suggestListName function.
 * - SuggestListNameOutput - The return type for the suggestListName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestListNameInputSchema = z.object({
  description: z
    .string()
    .describe('A description of the list to generate a name for.'),
});
export type SuggestListNameInput = z.infer<typeof SuggestListNameInputSchema>;

const SuggestListNameOutputSchema = z.object({
  listName: z.string().describe('The suggested name for the list.'),
});
export type SuggestListNameOutput = z.infer<typeof SuggestListNameOutputSchema>;

export async function suggestListName(input: SuggestListNameInput): Promise<SuggestListNameOutput> {
  return suggestListNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestListNamePrompt',
  input: {schema: SuggestListNameInputSchema},
  output: {schema: SuggestListNameOutputSchema},
  prompt: `You are a helpful assistant that suggests names for lists of tasks.

  Given the following description of a list, suggest a name for it.

  Description: {{{description}}}
  Name:`,
});

const suggestListNameFlow = ai.defineFlow(
  {
    name: 'suggestListNameFlow',
    inputSchema: SuggestListNameInputSchema,
    outputSchema: SuggestListNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview AI agent that suggests a list description based on a name.
 *
 * - suggestListDescription - A function that generates a list description suggestion.
 * - SuggestListDescriptionInput - The input type for the suggestListDescription function.
 * - SuggestListDescriptionOutput - The return type for the suggestListDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestListDescriptionInputSchema = z.object({
  listName: z
    .string()
    .describe('The name of the list to generate a description for.'),
});
export type SuggestListDescriptionInput = z.infer<typeof SuggestListDescriptionInputSchema>;

const SuggestListDescriptionOutputSchema = z.object({
  listDescription: z.string().describe('The suggested description for the list.'),
});
export type SuggestListDescriptionOutput = z.infer<typeof SuggestListDescriptionOutputSchema>;

export async function suggestListDescription(input: SuggestListDescriptionInput): Promise<SuggestListDescriptionOutput> {
  return suggestListDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestListDescriptionPrompt',
  input: {schema: SuggestListDescriptionInputSchema},
  output: {schema: SuggestListDescriptionOutputSchema},
  prompt: `You are a helpful assistant that suggests descriptions for task lists.

  Given the following name of a list, suggest a brief description for it.

  Name: {{{listName}}}
  Description:`,
});

const suggestListDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestListDescriptionFlow',
    inputSchema: SuggestListDescriptionInputSchema,
    outputSchema: SuggestListDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

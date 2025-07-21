import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {NextRequest} from 'next/server';
import {headers} from 'next/headers';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: async () => {
        const req = new NextRequest(new URL('http://localhost'), {
          headers: headers(),
        });
        const key = req.headers.get('Authorization')?.split(' ')?.[1];
        return key || process.env.GEMINI_API_KEY;
      },
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});

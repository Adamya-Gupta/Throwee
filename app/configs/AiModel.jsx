import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash-preview-04-17';

export async function generateLogoIdeas(prompt) {
  const result = await ai.models.generateContent({
    model,
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.9,
    },
  });

  const text = result.text;
  return text;
}


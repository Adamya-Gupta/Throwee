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

export async function AILogoPrompt(prompt) {
    const config = {
        thinkingConfig: {
            thinkingBudget: 0,
        },
        responseMimeType: 'text/plain',
    };
    const model = 'gemini-2.5-flash-preview-04-17';
    const contents = [
        {
            role: 'user',
            parts: [{ text: prompt }],
        },
    ]
    const stream = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });


  let fullText = '';

  for await (const chunk of stream) {
    if (chunk.text) {
      fullText += chunk.text;
    }
  }

  return fullText;
}
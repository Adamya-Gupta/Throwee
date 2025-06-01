import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash-preview-04-17';

const config = {
        thinkingConfig: {
            thinkingBudget: 0,
        },
        responseMimeType: 'text/plain',
    };

 const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: `Generate a text prompt to create Logo for Logo Title/Brand name : Waterbottle,with description: Happy bottle, with Color combination of Earthy Browns, also include the Minimal lines forming abstract bottle and include Minimalists And Elegants Logos design idea and Referring to this Logo Prompt:Create a sophisticated and elegant logo design that is inspired by nature and vintage aesthetics. The logo should incorporate elements of symbolism, intricate details, and a touch of mystery. Use a combination of typography, line art, and subtle color palettes to create a timeless and visually striking design. The logo should convey a sense of luxury, tradition, and quality.  Give me result in JSON portal with prompt field only`,
                },
            ],
        },
    ];


export async function AILogoPrompt(prompt) {
       const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

    const text = response.text;
    return text;
}

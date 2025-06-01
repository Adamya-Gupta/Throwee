import { AILogoPrompt } from "@/app/configs/AiModel";
import { db } from "@/app/configs/FirebaseConfig";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const { prompt ,email,title ,desc } = await req.json();
        const textResponse = await AILogoPrompt(prompt);

        // Extract JSON from Gemini-style markdown response
        const jsonMatch = textResponse.match(/```json([\s\S]*?)```/);
        const jsonText = jsonMatch ? jsonMatch[1].trim() : textResponse;
        const AIPrompt = JSON.parse(jsonText);

        const promptString = AIPrompt?.prompt;
        if (!promptString || typeof promptString !== 'string') {
            throw new Error("Invalid prompt format received from Gemini.");
        }

        const response = await axios.post(
            'https://router.huggingface.co/together/v1/images/generations',
            {
                prompt: promptString,
                response_format: "base64",
                model: "black-forest-labs/FLUX.1-schnell"
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const imageBase64 = response.data?.data?.[0]?.b64_json;

        if (!imageBase64) {
            throw new Error("No image data found in Hugging Face response");
        }


        const base64ImageWithMime = `data:image/png;base64,${imageBase64}`;

        console.log(base64ImageWithMime)

        //Saving to Firebase Database
        try {
            await setDoc(doc(db,"users",email,"logos",Date.now().toString()),{
                image:base64ImageWithMime,
                title:title,
                desc:desc
            })
        } catch (error) {
            
        }

        return NextResponse.json({ image: base64ImageWithMime });

    } catch (e) {
        return NextResponse.json({ error: e.toString() });
    }
}

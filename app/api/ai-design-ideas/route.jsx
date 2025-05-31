import { generateLogoIdeas } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const textResponse = await generateLogoIdeas(prompt);

    // Try to safely parse JSON from the model response
    const jsonMatch = textResponse.match(/```json([\s\S]*?)```/);
    const jsonText = jsonMatch ? jsonMatch[1].trim() : textResponse;

    return NextResponse.json(JSON.parse(jsonText));
  } catch (e) {
    return NextResponse.json({ error: e.toString() });
  }
}

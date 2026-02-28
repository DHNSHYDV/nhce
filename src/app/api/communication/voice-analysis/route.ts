import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export async function POST(req: Request) {
    try {
        const { audioBase64 } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const prompt = "Analyze this 30-second audio clip of a user speaking. Provide a professional analysis and strictly focus on: 1. Pronunciation accuracy 2. Speaking pace 3. Tonal variations 4. Filler words (um, uh, like). List specific corrections or mistakes identified. Keep the analysis concise and expert.";

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType: "audio/webm",
                    data: audioBase64,
                },
            },
        ]);

        const analysis = result.response.text();

        return NextResponse.json({ analysis });
    } catch (error: any) {
        console.error("Voice Analysis API Error:", error);
        return NextResponse.json({ error: "Failed to analyze voice", details: error.message }, { status: 500 });
    }
}

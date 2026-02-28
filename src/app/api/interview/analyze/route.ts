import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(req: Request) {
    try {
        const { audioBase64, round, question } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const prompt = `Analyze this audio recording for an AI Interview.
        Round Type: ${round}
        Question: ${question}
        
        Provide a detailed analysis focusing on:
        1. Content Quality: Accuracy and depth of the answer.
        2. Delivery: Pace, clarity, and tone.
        3. Confidence Level: Assess based on vocal stability and filler words.
        4. Key Strengths: What was done well.
        5. Improvements: Specific areas to work on.
        
        Keep the analysis professional, constructive, and oriented towards growth in a high-stakes interview setting.`;

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
        console.error("Interview Analysis API Error:", error);
        return NextResponse.json({ error: "Failed to analyze interview", details: error.message }, { status: 500 });
    }
}

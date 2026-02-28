import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export async function POST(req: Request) {
    try {
        const { category } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const prompt = `Generate 5 high-level communication-based interview/scenario questions for the following category: ${category}. 
        Format the response as a JSON array of objects, where each object has:
        - question: the scenario or interview question
        - options: an array of 4 possible response strategies (short strings)
        - correct: the index of the most effective/professional response strategy (0-3)
        - explanation: a brief explanation of why this strategy is best (max 2 sentences)
        
        Ensure the output is ONLY the JSON array, no markdown formatting.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        const cleanedResponse = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const questions = JSON.parse(cleanedResponse);

        return NextResponse.json({ questions });
    } catch (error: any) {
        console.error("Communication Questions API Error:", error);
        return NextResponse.json({ error: "Failed to generate questions", details: error.message }, { status: 500 });
    }
}

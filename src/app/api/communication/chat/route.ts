import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const GEMINI_MODELS = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-2.0-flash"];

export async function POST(req: Request) {
    try {
        const { message, history, language, mode } = await req.json();
        const isInterview = mode === "interview";
        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        console.log(`Bharat API: Processing ${mode} request (${language})`);

        let systemPrompt = `You are a helpful Bharat AI Assistant specializing in regional communication.
        
        CRITICAL RULES:
        1. Always respond in ${language}. 
        2. Keep your tone professional and encouraging.
        3. Keep responses concise (max 3-5 sentences).`;

        if (isInterview) {
            systemPrompt += `
            
            INTERVIEW PROTOCOL:
            1. Act as a Senior Technical Interviewer.
            2. Ask a challenging technical question in ${language}.
            3. If user answers: evaluate accuracy, provide an English translation for key terms, and ask a follow-up.`;
        }

        // --- PREPARE MESSAGES FOR GROQ (OpenAI Format) ---
        // Filter history to avoid duplicates if message is already at the end
        const baseHistory = (history || []).filter((msg: any) => msg.content.trim() !== message?.trim());

        const groqMessages = [
            { role: "system", content: systemPrompt },
            ...baseHistory.map((msg: any) => ({
                role: msg.role === "user" ? "user" : "assistant",
                content: msg.content
            })),
            { role: "user", content: message || (isInterview ? "Start the technical interview protocol." : "Hello") }
        ];

        // --- PHASE 1: TRY GROQ ---
        if (GROQ_API_KEY) {
            try {
                console.log("Bharat API: Attempting Groq (Llama-3.3-70b)");
                const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${GROQ_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: "llama-3.3-70b-versatile",
                        messages: groqMessages,
                        temperature: 0.7,
                        max_tokens: 512
                    })
                });

                if (groqResponse.ok) {
                    const data = await groqResponse.json();
                    const response = data.choices[0].message.content;
                    console.log("Bharat API: Success via Groq");
                    return NextResponse.json({ response, engine: "groq" });
                }
                console.warn("Bharat API: Groq returned error status", groqResponse.status);
            } catch (err: any) {
                console.error("Bharat API: Groq error", err.message);
            }
        }

        // --- PHASE 2: FALLBACK TO GEMINI ---
        console.log("Bharat API: Falling back to Gemini");
        const geminiPrompt = message || (isInterview ? "Start the technical interview protocol." : "Hello");
        const geminiHistory = baseHistory.map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        }));

        for (const modelId of GEMINI_MODELS) {
            try {
                const model = genAI.getGenerativeModel({ model: modelId });
                const chat = model.startChat({
                    history: geminiHistory,
                    systemInstruction: { role: "system", parts: [{ text: systemPrompt }] } as any
                });

                const result = await chat.sendMessage(geminiPrompt);
                const response = result.response.text();
                console.log(`Bharat API: Success via Gemini (${modelId})`);
                return NextResponse.json({ response, engine: `gemini-${modelId}` });
            } catch (err: any) {
                console.warn(`Bharat API: ${modelId} failed:`, err.message);
                if (err.status === 429) continue;
                break;
            }
        }

        return NextResponse.json({ error: "All AI cores busy. Please try again in 10s." }, { status: 503 });

    } catch (error: any) {
        console.error("Bharat API Fatal:", error);
        return NextResponse.json({ error: "Neural link lost. Try again." }, { status: 500 });
    }
}

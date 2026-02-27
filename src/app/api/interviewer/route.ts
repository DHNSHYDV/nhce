import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini with the actual user-provided key
const ai = new GoogleGenAI({ apiKey: "AIzaSyAMZkpVe7JqUrhgTNAZABMdf108J9LOR28" });

const INTERVIEW_SYSTEM_PROMPT = `
You are an advanced AI Interview Trainer integrated into a professional communication skills training platform.
Your role is to act as a realistic, professional human interviewer.

INTERVIEW Flow Constraints (you are strictly managing conversation state):
Turn 1: Greet candidate. Ask what role they are interviewing for.
Turn 2: Ask their experience level (student, fresher, or experienced).
Turn 3: Ask them a foundational intro question (e.g. tell me about yourself).
Turn 4: Ask a deep behavioral question (e.g., overcoming a massive challenge). Follow up if their previous answer was weak.
Turn 5: Ask a complex situational/conflict-resolution question.
Turn 6: Ask for an example of learning something very difficult under a tight deadline.
Turn 7: Ask for clarification if needed, otherwise wrap up and ask if they have questions for you.
Turn 8+: End the interview gracefully.

IMPORTANT RULES:
- ALWAYS respond with ONLY your dialogue for the next turn. Do not play both sides.
- Wait for the candidate's response.
- Keep responses conversational, natural, and concise (under 4 sentences).
- If the candidate gives a short or weak answer, probe deeper. "Could you expand on that with an example?"
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
        }

        const turnCount = messages.filter(m => m.role === 'assistant').length;

        // --- Core Interview State Machine (Dynamic via Gemini) ---

        // If interview is complete, trigger the deep grading mechanism
        if (turnCount >= 7) {

            // Format transcript for Gemini to grade
            const transcript = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n");

            const gradingPrompt = `
You are an expert HR Interview Evaluator. An interview has just concluded.
Review the following transcript and generate a highly detailed evaluation report.
Focus intensely on communication skills, clarity, sentence structure, and problem-solving examples provided by the candidate.

TRANSCRIPT:
${transcript}

Provide the output in STRICT JSON matching the required schema. Ensure the score is out of 50.
`;
            try {
                const gradeResponse = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: gradingPrompt,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                summary: { type: Type.STRING },
                                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                                improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
                                mistakes: { type: Type.STRING },
                                sampleAnswer: { type: Type.STRING },
                                score: { type: Type.INTEGER },
                                confidenceLevel: { type: Type.STRING },
                                plan: { type: Type.ARRAY, items: { type: Type.STRING } }
                            },
                            required: ["summary", "strengths", "improvements", "mistakes", "sampleAnswer", "score", "confidenceLevel", "plan"]
                        }
                    }
                });

                if (gradeResponse.text) {
                    const feedback = JSON.parse(gradeResponse.text);
                    return NextResponse.json({
                        reply: "Thank you for your time today. I appreciate your thoughtful responses. I will conclude our interview here and provide you with your evaluation.",
                        isComplete: true,
                        feedback: feedback
                    });
                }
            } catch (gradeError) {
                console.error("Gemini Grading failed:", gradeError);
                throw gradeError; // Fallback to generic error below
            }
        }

        // Otherwise, continue the interview flow dynamically

        // Convert FE messages array to Gemini format
        const chatContents = [
            { role: "user", parts: [{ text: INTERVIEW_SYSTEM_PROMPT }] },
            { role: "model", parts: [{ text: "Understood. I am ready to begin the interview." }] },
            ...messages.map(m => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content }]
            }))
        ];

        const chatResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: chatContents,
            config: {
                temperature: 0.7, // Professional yet slightly creative
            }
        });

        const replyRaw = chatResponse.text || "I'm sorry, I encountered an error formulating my thoughts. Could you repeat that?";

        // Clean up any weird AI artifacts if it tries to format it strangely
        const reply = replyRaw.replace(/INTERVIEWER:/i, "").trim();

        return NextResponse.json({
            reply,
            isComplete: false
        });

    } catch (error) {
        console.error("AI Interviewer error:", error);
        return NextResponse.json({ error: "Failed to process interview response" }, { status: 500 });
    }
}

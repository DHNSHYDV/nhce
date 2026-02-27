import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize Gemini with the actual user-provided key
const genAI = new GoogleGenerativeAI("AIzaSyAMZkpVe7JqUrhgTNAZABMdf108J9LOR28");

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
                // Correct SDK usage: getGenerativeModel + generateContent
                const model = genAI.getGenerativeModel({
                    model: 'gemini-1.5-flash',
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: SchemaType.OBJECT,
                            properties: {
                                summary: { type: SchemaType.STRING },
                                strengths: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                                improvements: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                                mistakes: { type: SchemaType.STRING },
                                sampleAnswer: { type: SchemaType.STRING },
                                score: { type: SchemaType.INTEGER },
                                confidenceLevel: { type: SchemaType.STRING },
                                plan: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
                            },
                            required: ["summary", "strengths", "improvements", "mistakes", "sampleAnswer", "score", "confidenceLevel", "plan"]
                        }
                    }
                });

                const gradeResult = await model.generateContent(gradingPrompt);
                const response = await gradeResult.response;
                const responseText = response.text();

                if (responseText) {
                    const feedback = JSON.parse(responseText);
                    return NextResponse.json({
                        reply: "Thank you for your time today. I appreciate your thoughtful responses. I will conclude our interview here and provide you with your evaluation.",
                        isComplete: true,
                        feedback: feedback
                    });
                }
            } catch (gradeError) {
                console.error("Gemini Grading failed:", gradeError);
                throw gradeError;
            }
        }

        // Convert FE messages array to Gemini format
        const chatContents = [
            { role: "user", parts: [{ text: INTERVIEW_SYSTEM_PROMPT }] },
            { role: "model", parts: [{ text: "Understood. I am ready to begin the interview." }] },
            ...messages.map(m => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content }]
            }))
        ];

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.7,
            }
        });

        const chatResult = await model.generateContent({ contents: chatContents });
        const chatResponse = await chatResult.response;
        const replyRaw = chatResponse.text() || "I'm sorry, I encountered an error formulating my thoughts. Could you repeat that?";


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

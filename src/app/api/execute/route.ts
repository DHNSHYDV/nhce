import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with the user-provided key
const genAI = new GoogleGenerativeAI("AIzaSyAMZkpVe7JqUrhgTNAZABMdf108J9LOR28");

export async function POST(req: Request) {
    try {
        const { script, language } = await req.json();

        if (!script) {
            return NextResponse.json({ error: "No code provided" }, { status: 400 });
        }

        // Initialize the model with code execution tool enabled
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            tools: [{
                // Enable built-in code execution for the model
                codeExecution: {}
            }],
        });

        const prompt = `
Execute the following ${language || 'Python'} code and return ONLY the raw standard output.
Do not provide explanations or commentary. Just run the script.

CODE:
\`\`\`${language || ''}
${script}
\`\`\`
`;

        const result = await model.generateContent(prompt);

        // Extract output from the executable code blocks in the response
        // Note: Gemini's code_execution tool makes the model output its observations of running code.
        const response = await result.response;
        const responseText = response.text();

        return NextResponse.json({
            output: responseText || "> Execution completed with no output.",
            statusCode: 0 // Simulating success if we got a response
        });

    } catch (error: any) {
        console.error("Gemini Execution API Error:", error);
        return NextResponse.json({ error: "Failed to process code with Google AI" }, { status: 500 });
    }
}

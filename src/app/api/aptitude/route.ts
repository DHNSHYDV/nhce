import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini with the actual user-provided key
const ai = new GoogleGenAI({ apiKey: "AIzaSyAMZkpVe7JqUrhgTNAZABMdf108J9LOR28" });

// We keep the mock as a reliable fallback in case of rate limits or generation failures
const MOCK_QUESTIONS = [
    {
        "question": "A shopkeeper marks his goods 20% above the cost price and then allows a discount of 10% on the marked price. During a festival sale, he gives an additional successive discount of 5%. If he sells an article for ₹513, what was the original cost price of the article?",
        "options": {
            "A": "₹450",
            "B": "₹500",
            "C": "₹550",
            "D": "₹600"
        },
        "correct_option": "B",
        "explanation": "Let the cost price (CP) be ₹x.\nMarked Price (MP) = CP + 20% of CP = 1.2x.\nFirst discount = 10% on MP.\nPrice after first discount = 1.2x - (0.10 * 1.2x) = 1.08x.\nSecond successive discount = 5% on the new price.\nSelling Price (SP) = 1.08x - (0.05 * 1.08x) = 1.026x.\nGiven SP = ₹513, so 1.026x = 513.\nx = 513 / 1.026 = 500.\nTherefore, the cost price is ₹500.",
        "formula_used": "MP = CP * (1 + markup%); SP = MP * (1 - discount1%) * (1 - discount2%)",
        "estimated_time_seconds": "75",
        "topic": "Profit, Loss and Discount"
    },
    {
        "question": "A team of 15 developers can complete a software module in 24 days working 8 hours a day. After 10 days, 5 developers are reassigned to another critical bug fix. How many more days will the remaining team take to finish the rest of the module if they continue to work 8 hours a day?",
        "options": {
            "A": "18 days",
            "B": "20 days",
            "C": "21 days",
            "D": "24 days"
        },
        "correct_option": "C",
        "explanation": "Total work = (Men * Days * Hours) = 15 * 24 * 8 man-hours.\nWork done in first 10 days by 15 developers = 15 * 10 * 8 man-hours.\nRemaining work = (15 * 24 * 8) - (15 * 10 * 8) = 15 * 8 * (24 - 10) = 15 * 8 * 14 man-hours.\nAfter 5 developers leave, remaining men = 15 - 5 = 10 developers.\nLet D be the additional days required.\nWork done by remaining team = 10 * D * 8 man-hours.\nEquating remaining work: 10 * D * 8 = 15 * 14 * 8.\n10 * D = 210.\nD = 21 days.",
        "formula_used": "M1 * D1 * H1 = M2 * D2 * H2 (Work Equivalence)",
        "estimated_time_seconds": "90",
        "topic": "Time and Work"
    },
    {
        "question": "In a certain coded language, 'SYSTEM' is written as 'SYSMET' and 'NEARER' is written as 'AENRER'. Following the same logic, what will be the code for 'FRACTION'?",
        "options": {
            "A": "CARFNOIT",
            "B": "ARFCTOIN",
            "C": "CARFTION",
            "D": "ARFCNOIT"
        },
        "correct_option": "A",
        "explanation": "Analyze the logic:\nSYSTEM (6 letters) -> Split in half: SYS | TEM.\nReverse the first half: SYS -> SYS. Reverse the second half: TEM -> MET.\nResult: SYSMET.\nNEARER (6 letters) -> Split: NEA | RER.\nReverse first half: NEA -> AEN. Reverse second half: RER -> RER.\nResult: AENRER.\nApply to FRACTION (8 letters) -> Split: FRAC | TION.\nReverse first half: FRAC -> CARF. Reverse second half: TION -> NOIT.\nResult: CARFNOIT.",
        "formula_used": "N/A (Logical Pattern - Half Reversal)",
        "estimated_time_seconds": "45",
        "topic": "Coding and Decoding"
    },
    {
        "question": "A server rack is filled with servers of two types: Type A (which uses 400W of power) and Type B (which uses 600W). If there are a total of 45 servers in the rack drawing exactly 23,000W of power combined, how many Type B servers are in the rack?",
        "options": {
            "A": "20",
            "B": "25",
            "C": "30",
            "D": "35"
        },
        "correct_option": "B",
        "explanation": "Let 'a' be the number of Type A servers and 'b' be the number of Type B servers.\nWe have two simultaneous equations:\n1) a + b = 45  => a = 45 - b\n2) 400a + 600b = 23000\nSubstitute (1) into (2):\n400(45 - b) + 600b = 23000\n18000 - 400b + 600b = 23000\n200b = 23000 - 18000\n200b = 5000\nb = 25.\nThere are 25 Type B servers (and 20 Type A servers).",
        "formula_used": "Linear Equations: x + y = Total_Items; P1*x + P2*y = Total_Power",
        "estimated_time_seconds": "60",
        "topic": "Linear Equations"
    },
    {
        "question": "A startup company launched an app that gained 12,000 new users in January. Every subsequent month, the number of *new* users acquired increased by 10% strictly over the *new* users acquired in the previous month. What is the total number of users acquired by the end of March (over the 3 months)?",
        "options": {
            "A": "35,120",
            "B": "38,400",
            "C": "39,720",
            "D": "43,000"
        },
        "correct_option": "C",
        "explanation": "New users in January = 12,000.\nNew users in February = 12,000 + (10% of 12,000) = 12,000 + 1,200 = 13,200.\nNew users in March = 13,200 + (10% of 13,200) = 13,200 + 1,320 = 14,520.\nTotal users acquired over 3 months = January + February + March = 12,000 + 13,200 + 14,520 = 39,720.",
        "formula_used": "Compound Growth: A_n = A_{n-1} * (1 + R/100)",
        "estimated_time_seconds": "60",
        "topic": "Percentages & Growth"
    }
];

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const category = body.category || "General Aptitude";
        const difficulty = body.difficulty || "Medium";

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate 1 unique, highly engaging aptitude question.
                
                Category: ${category}
                Difficulty: ${difficulty}
                
                Requirements:
                - Question must be original and non-copyrighted.
                - Must include exactly 4 options (A, B, C, D).
                - Only 1 correct answer.
                - Include step-by-step explanation.
                - Include formula used (if applicable, else "N/A").
                - Include real-life scenario where possible.
                - Provide estimated time to solve as a raw number string in seconds (e.g. "60").
                - Add topic tag (e.g., profit and loss, time and work, puzzles, percentages, etc).`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING },
                            options: {
                                type: Type.OBJECT,
                                properties: {
                                    A: { type: Type.STRING },
                                    B: { type: Type.STRING },
                                    C: { type: Type.STRING },
                                    D: { type: Type.STRING }
                                },
                            },
                            correct_option: { type: Type.STRING, enum: ["A", "B", "C", "D"] },
                            explanation: { type: Type.STRING },
                            formula_used: { type: Type.STRING },
                            estimated_time_seconds: { type: Type.STRING },
                            topic: { type: Type.STRING }
                        },
                        required: ["question", "options", "correct_option", "explanation", "formula_used", "estimated_time_seconds", "topic"]
                    }
                }
            });

            if (response.text) {
                return NextResponse.json(JSON.parse(response.text));
            }
        } catch (genError) {
            console.error("Gemini failed, falling back to mock:", genError);
        }

        // Fallback
        await new Promise(resolve => setTimeout(resolve, 1500));
        const randomQuestion = MOCK_QUESTIONS[Math.floor(Math.random() * MOCK_QUESTIONS.length)];
        return NextResponse.json(randomQuestion);
    } catch (error) {
        console.error("Aptitude generation error:", error);
        return NextResponse.json({ error: "Failed to generate question" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { script, language } = body;

        if (!script || !language) {
            return NextResponse.json(
                { error: "Script and language are required" },
                { status: 400 }
            );
        }

        // Judge0 Language Mapping (Public CE Instance)
        const langConfig: Record<string, number> = {
            "python": 100, // Python (3.12.5)
            "c++": 54,     // C++ (GCC 9.2.0)
            "java": 91,    // Java (JDK 17.0.6)
            "c": 50        // C (GCC 9.2.0)
        };

        const languageId = langConfig[language];
        if (!languageId) {
            return NextResponse.json(
                { error: `Unsupported language: ${language}` },
                { status: 400 }
            );
        }

        // Judge0 CE requires Base64 encoded code for safety
        const base64Code = Buffer.from(script).toString("base64");

        // Call Judge0 CE Public API
        const response = await fetch("https://ce.judge0.com/submissions?base64_encoded=true&wait=true", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                source_code: base64Code,
                language_id: languageId,
                stdin: "",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Judge0 API error:", errorData);
            return NextResponse.json(
                { error: "Failed to execute code on remote server" },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Decode output from Base64
        const stdout = data.stdout ? Buffer.from(data.stdout, "base64").toString("utf-8") : "";
        const stderr = data.stderr ? Buffer.from(data.stderr, "base64").toString("utf-8") : "";
        const compileOutput = data.compile_output ? Buffer.from(data.compile_output, "base64").toString("utf-8") : "";

        return NextResponse.json({
            output: stdout || stderr || compileOutput || "",
            statusCode: data.status?.id === 3 ? 0 : 1,
            stdout: stdout,
            stderr: stderr,
            compileOutput: compileOutput,
            statusDescription: data.status?.description
        });

    } catch (error: any) {
        console.error("Execution API Error:", error);
        return NextResponse.json(
            { error: error.message || "An unexpected error occurred" },
            { status: 500 }
        );
    }
}

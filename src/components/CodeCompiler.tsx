"use client";

import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Copy, Check, Terminal, Code2, Globe, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGES = [
    { id: "python", name: "Python 3", extension: ".py", default: 'print("Hello, World!")' },
    { id: "cpp", name: "C++", extension: ".cpp", default: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}' },
    { id: "java", name: "Java", extension: ".java", default: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
    { id: "c", name: "C", extension: ".c", default: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
];

export default function CodeCompiler() {
    const [language, setLanguage] = useState(LANGUAGES[0]);
    const [code, setCode] = useState(language.default);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);

    const editorRef = useRef<any>(null);

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
        monaco.editor.defineTheme('glassTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#00000000',
                'editor.lineHighlightBackground': '#FFFFFF05',
                'editorLineNumber.foreground': '#5A5A5A',
                'editorLineNumber.activeForeground': '#10b981',
            }
        });
        monaco.editor.setTheme('glassTheme');
    }

    useEffect(() => {
        setCode(language.default);
    }, [language]);

    const handleRun = () => {
        setIsRunning(true);
        setOutput("");

        // Simulate compilation and execution
        setTimeout(() => {
            setIsRunning(false);
            setOutput(`> ${language.name} compiler initialized...\n> Compiling ${language.id === 'java' ? 'Main.java' : 'source'}${language.extension}...\n> Execution started...\n\nHello, World!\n\n> Program exited with status 0.`);
        }, 1500);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-6xl mx-auto h-[700px] flex flex-col rounded-[2.5rem] border border-white/10 bg-slate-950/40 backdrop-blur-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative group/ide transition-all duration-700">
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover/ide:opacity-100 transition-opacity duration-1000" />

            {/* Header / Toolbar */}
            <div className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-slate-900/40 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <Code2 className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-black tracking-tight text-foreground uppercase italic transition-colors">IDE<span className="text-emerald-500 font-sans not-italic">.beta</span></h3>
                    </div>

                    <div className="h-6 w-px bg-white/10" />

                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-emerald-500/30 transition-all group"
                        >
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-foreground transition-colors capitalize">{language.name}</span>
                            <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform", showLangMenu && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                            {showLangMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full left-0 mt-2 w-48 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden z-[100]"
                                >
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang.id}
                                            onClick={() => {
                                                setLanguage(lang);
                                                setShowLangMenu(false);
                                            }}
                                            className={cn(
                                                "w-full px-4 py-3 text-left text-sm font-bold transition-all hover:bg-emerald-500/10",
                                                language.id === lang.id ? "text-emerald-400 bg-emerald-500/5" : "text-slate-400 hover:text-white"
                                            )}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCopy}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all relative group"
                    >
                        {isCopied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                    </button>

                    <button
                        onClick={() => setCode(language.default)}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all group relative"
                    >
                        <RotateCcw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">Reset</span>
                    </button>

                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className={cn(
                            "flex items-center gap-3 px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all",
                            isRunning
                                ? "bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed"
                                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] shadow-inner"
                        )}
                    >
                        {isRunning ? (
                            <div className="h-4 w-4 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Play className="h-4 w-4 fill-current" />
                        )}
                        {isRunning ? "Running..." : "Run Code"}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex-1 flex overflow-hidden">
                {/* Editor Panel */}
                <div className="flex-[3] relative border-r border-white/5 bg-transparent">
                    <Editor
                        height="100%"
                        language={language.id === 'cpp' ? 'cpp' : language.id}
                        value={code}
                        onChange={(val) => setCode(val || "")}
                        onMount={handleEditorDidMount}
                        options={{
                            fontSize: 16,
                            fontFamily: "'Fira Code', 'Monaco', monospace",
                            minimap: { enabled: false },
                            padding: { top: 20 },
                            smoothScrolling: true,
                            cursorBlinking: "expand",
                            lineNumbersMinChars: 3,
                            bracketPairColorization: { enabled: true },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                        loading={
                            <div className="h-full w-full flex items-center justify-center bg-slate-950 text-slate-500 font-black uppercase tracking-[0.5em] animate-pulse">
                                Initializing Editor...
                            </div>
                        }
                    />
                </div>

                {/* Output Panel */}
                <div className="flex-[1] bg-slate-950/30 backdrop-blur-md flex flex-col transition-colors">
                    <div className="px-6 py-4 flex items-center gap-2 border-b border-white/5 bg-slate-950/40">
                        <Terminal className="h-4 w-4 text-slate-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Standard Output</span>
                    </div>
                    <div className="flex-1 p-6 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
                        <AnimatePresence mode="wait">
                            {output ? (
                                <motion.div
                                    key="output"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-emerald-400/90"
                                >
                                    {output}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-slate-600 italic"
                                >
                                    {isRunning ? "Awaiting stream..." : "Click run to see output."}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Performance Micro-Stat */}
                    <div className="p-4 flex items-center justify-between bg-slate-950/40 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">System Ready</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-700 uppercase tracking-tighter">Lat: 0.12ms</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

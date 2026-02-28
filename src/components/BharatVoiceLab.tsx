"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2, Sparkles, ArrowLeft, RefreshCw, Languages, Globe, CheckCircle2, User, Bot, Volume2, Timer, Terminal, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "ai";
    content: string;
    id: string;
}

interface BharatVoiceLabProps {
    language: { name: string; script: string; region: string };
    onExit: () => void;
}

export const BharatVoiceLab = ({ language, onExit }: BharatVoiceLabProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [history, setHistory] = useState<Message[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);
    const [isInterviewMode, setIsInterviewMode] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showHelp, setShowHelp] = useState(false);

    const recognitionRef = useRef<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Auto-scroll to bottom of chat
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, transcript, interimTranscript, isThinking]);

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!window.isSecureContext && window.location.hostname !== 'localhost') {
            setError("Microphone requires a secure HTTPS connection.");
            return;
        }

        if (SpeechRecognition) {
            try {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;

                const langMap: Record<string, string> = {
                    "Hindi": "hi-IN",
                    "Marathi": "mr-IN",
                    "Bengali": "bn-IN",
                    "Tamil": "ta-IN",
                    "Telugu": "te-IN",
                    "Kannada": "kn-IN"
                };

                recognition.lang = langMap[language.name] || "en-IN";

                recognition.onresult = (event: any) => {
                    let interim = "";
                    let final = "";

                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            final += event.results[i][0].transcript;
                        } else {
                            interim += event.results[i][0].transcript;
                        }
                    }

                    if (final) {
                        setTranscript(prev => (prev + " " + final).trim());
                    }
                    setInterimTranscript(interim);
                };

                recognition.onerror = (event: any) => {
                    // Ignore 'aborted' error - it's often a false positive during intentional stop()
                    if (event.error === 'aborted') return;

                    console.error("Speech recognition error", event.error);
                    let errorMsg = "Microphone error. Please check permissions.";
                    if (event.error === 'not-allowed') errorMsg = "Microphone access denied. Please enable it in your browser.";
                    if (event.error === 'no-speech') return; // Silence no-speech
                    if (event.error === 'network') errorMsg = "Network error during speech recognition.";

                    setError(errorMsg);
                    setIsRecording(false);
                    if (timerRef.current) clearInterval(timerRef.current);
                };

                recognition.onend = () => {
                    if (isRecording) {
                        try {
                            recognition.start();
                        } catch (e) {
                            console.error("Failed to restart recognition", e);
                        }
                    }
                };

                recognitionRef.current = recognition;
            } catch (e) {
                console.error("Failed to initialize SpeechRecognition", e);
                setError("Speech recognition is not supported in this environment.");
            }
        } else {
            setError("Your browser does not support Speech Recognition. Please use Chrome or Edge.");
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [language.name, isRecording]);

    // Timer Logic
    useEffect(() => {
        if (isRecording && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        if (timerRef.current) clearInterval(timerRef.current);
                        stopRecording();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRecording]);

    const startInterview = async () => {
        setIsInterviewMode(true);
        setHistory([]);
        setIsThinking(true);
        await sendToAI("", true);
    };

    const startRecording = () => {
        setError(null);
        setTranscript("");
        setInterimTranscript("");
        setTimeLeft(20);
        setIsRecording(true);
        if (recognitionRef.current) {
            recognitionRef.current.start();
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);

        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        const fullMessage = (transcript + " " + interimTranscript).trim();
        if (!fullMessage) {
            setTimeLeft(20);
            return;
        }

        // Add user message to history
        const userMsg: Message = {
            role: "user",
            content: fullMessage,
            id: Date.now().toString()
        };

        // Update history and trigger AI
        const newHistory = [...history, userMsg];
        setHistory(newHistory);
        await sendToAI(fullMessage, false, newHistory);
    };

    const sendToAI = async (message: string, isInitialQuestion = false, currentHistory = history) => {
        setIsThinking(true);
        setError(null);
        try {
            const response = await fetch("/api/communication/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: isInitialQuestion ? "Start the technical interview protocol." : message,
                    history: currentHistory,
                    language: language.name,
                    mode: isInterviewMode ? "interview" : "mentor"
                }),
            });
            const data = await response.json();
            console.log("Bharat AI: Received response", data);

            if (data.response) {
                const aiMsg: Message = {
                    role: "ai",
                    content: data.response,
                    id: (Date.now() + 1).toString()
                };
                setHistory(prev => [...prev, aiMsg]);
            } else {
                setError(data.error || "AI failed to respond. Please try again.");
            }
        } catch (error: any) {
            console.error("AI chat failed", error);
            if (error.status === 429) {
                setError("AI is busy (Rate Limit). Please wait 30 seconds.");
            } else {
                setError("Connection failed. Please check your internet.");
            }
        } finally {
            setIsThinking(false);
            setTranscript("");
            setInterimTranscript("");
            setTimeLeft(20);
        }
    };

    const resetSession = () => {
        setHistory([]);
        setTranscript("");
        setInterimTranscript("");
        setTimeLeft(20);
        setIsInterviewMode(false);
    };

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center p-4">
            {/* Header: Controls & Language */}
            <div className="w-full flex justify-between items-center mb-8">
                <button
                    onClick={onExit}
                    className="flex h-10 w-10 items-center justify-center rounded-none bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowHelp(!showHelp)}
                        className="px-4 py-1.5 glass-dark border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all flex items-center gap-2"
                    >
                        <Shield className="h-3.5 w-3.5" />
                        {showHelp ? "EXIT HELP" : "DESIGN PRINCIPLES"}
                    </button>
                    <div className="flex items-center gap-3 px-4 py-1.5 glass-dark border border-emerald-500/20 rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80 italic">{language.name} ({language.script})</span>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* LEFT: Interaction Control (4 cols) */}
                <div className="lg:col-span-5 glass-dark border border-white/10 p-10 flex flex-col items-center justify-center space-y-8 relative overflow-hidden min-h-[500px]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5" />
                    {isRecording && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="absolute top-0 left-0 w-full h-1 bg-white origin-left z-20"
                            style={{ scaleX: timeLeft / 20 }}
                            transition={{ duration: 1, ease: "linear" }}
                        />
                    )}

                    {!isInterviewMode && history.length === 0 ? (
                        <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-500 w-full">
                            <div className="h-20 w-20 bg-white/5 border border-white/10 flex items-center justify-center relative">
                                <Terminal className="h-8 w-8 text-white/20" />
                                <div className="absolute inset-0 bg-white/5 blur-2xl animate-pulse" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter italic">NEURAL LINK</h3>
                                <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-black italic">Select Protocol to Initialize</p>
                            </div>
                            <div className="flex flex-col gap-3 w-full max-w-[280px]">
                                <button
                                    onClick={() => setIsInterviewMode(false)}
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
                                >
                                    General Mentoring
                                </button>
                                <button
                                    onClick={startInterview}
                                    className="w-full px-6 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-all flex items-center justify-center gap-3"
                                >
                                    <Shield className="h-4 w-4" />
                                    Technical Interview
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-10 w-full">
                            <div className="relative h-32 w-32 flex items-center justify-center">
                                <AnimatePresence>
                                    {isRecording && (
                                        <>
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="absolute inset-0 bg-white/10 rounded-full blur-2xl"
                                            />
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.05, 0.2] }}
                                                exit={{ scale: 0.8, opacity: 0 }}
                                                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                                                className="absolute inset-0 bg-white/5 rounded-full blur-3xl"
                                            />
                                        </>
                                    )}
                                </AnimatePresence>
                                <div className={cn(
                                    "h-24 w-24 rounded-none border flex items-center justify-center transition-all duration-500 relative z-10",
                                    isRecording ? "bg-white border-white scale-110 shadow-[0_0_50px_rgba(255,255,255,0.3)]" : "bg-white/5 border-white/10"
                                )}>
                                    {isRecording ? (
                                        <span className="text-2xl font-black text-black">{timeLeft}s</span>
                                    ) : (
                                        <Mic className="h-8 w-8 text-white/20" />
                                    )}
                                </div>
                            </div>

                            <div className="text-center space-y-3">
                                <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">
                                    {isRecording ? "SYNCHRONIZING" : isInterviewMode ? "PROTOCOL: INTERVIEW" : "PROTOCOL: MENTOR"}
                                </h3>
                                <div className="flex items-center justify-center gap-2">
                                    <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", isRecording ? "bg-white" : "bg-emerald-500")} />
                                    <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black italic">
                                        {isRecording ? `CAPURING VOICE: ${timeLeft}S` : "NEURAL LINK STABLE"}
                                    </p>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full p-4 border border-red-500/20 bg-red-500/5 text-red-500 text-[9px] font-black uppercase tracking-[0.2em] text-center italic"
                                >
                                    ⚠ {error}
                                </motion.div>
                            )}

                            <div className="flex flex-col gap-4 w-full px-6">
                                {!isRecording ? (
                                    <button
                                        onClick={startRecording}
                                        disabled={isThinking}
                                        className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {isThinking ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin text-black" />
                                                EVALUATING...
                                            </>
                                        ) : (
                                            isInterviewMode ? "START RECORDING" : "INITIATE VOICE"
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        onClick={stopRecording}
                                        className="w-full py-5 bg-white/10 border border-white/20 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Square className="h-4 w-4 fill-white animate-pulse" />
                                        FINISH & EVALUATE
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {showHelp && (
                        <div className="absolute inset-0 bg-black/95 z-50 p-10 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                            <Shield className="h-12 w-12 text-white/10" />
                            <h4 className="text-xl font-black italic uppercase tracking-widest text-white underline decoration-emerald-500/50 underline-offset-8">HOW IT WORKS</h4>
                            <div className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 leading-loose">
                                <p>1. <span className="text-white">INPUT</span>: BROWSER CAPTURES SPEECH IN {language.name} AND CONVERTS TO TEXT LOCALLY.</p>
                                <p>2. <span className="text-white">LINK</span>: VOICE IS SYNCED FOR 20 SECONDS THEN SENT TO GEMINI 2.0 NEURAL CORE.</p>
                                <p>3. <span className="text-white">OUTPUT</span>: AI REPLIES CRYSTAL CLEAR IN THE <span className="text-emerald-500 italic">EVALUATOR TERMINAL</span> (ON THE RIGHT).</p>
                            </div>
                            <button
                                onClick={() => setShowHelp(false)}
                                className="px-10 py-4 border border-white/20 text-white font-black hover:bg-white/10 transition-all uppercase text-[10px] tracking-[0.5em]"
                            >
                                INITIATE LINKS
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT: AI Response Terminal (7 cols) */}
                <div className="lg:col-span-7 glass-dark border border-white/10 p-4 flex flex-col h-[650px] relative overflow-hidden bg-black/40">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/5 mb-4 bg-white/5">
                        <div className="flex items-center gap-2">
                            <Terminal className="h-4 w-4 text-emerald-500" />
                            <span className="text-[11px] font-black uppercase tracking-widest italic text-white">
                                {isInterviewMode ? "TECHNICAL EVALUATOR CORE" : "BHARAT MENTOR CORE v2.0"}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-widest italic text-emerald-500/60">NODE: ONLINE</span>
                            </div>
                            {history.length > 0 && (
                                <button onClick={resetSession} className="text-[9px] font-black uppercase text-white/20 hover:text-white transition-colors">RESET</button>
                            )}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-8 flex flex-col pb-8" ref={scrollRef}>
                        {history.length === 0 && !transcript && !interimTranscript && (
                            <div className="h-full flex flex-col items-center justify-center opacity-10 text-center space-y-4">
                                <Sparkles className="h-16 w-16" />
                                <p className="text-[11px] font-black uppercase tracking-[0.5em] leading-relaxed">
                                    AWAITING COMMAND<br />INITIALIZE VOICE LINK TO BEGIN
                                </p>
                            </div>
                        )}

                        {history.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex flex-col w-full max-w-[95%]",
                                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                                )}
                            >
                                <div className={cn(
                                    "p-6 text-[12px] font-bold uppercase italic tracking-tight leading-relaxed whitespace-pre-wrap border",
                                    msg.role === 'user'
                                        ? "bg-white/5 border-white/10 text-white/60"
                                        : "bg-[#0b0b0b] border-emerald-500/20 text-white shadow-[0_0_40px_rgba(16,185,129,0.05)]"
                                )}>
                                    {msg.role === 'ai' && (
                                        <div className="mb-4 flex items-center gap-2 border-b border-emerald-500/10 pb-2">
                                            <Bot className="h-3 w-3 text-emerald-500" />
                                            <span className="text-[9px] text-emerald-500 underline underline-offset-4">AI EVALUATION [{language.name}]</span>
                                        </div>
                                    )}
                                    {msg.content}
                                </div>
                                <div className="flex items-center gap-2 mt-2 px-1 opacity-20">
                                    <span className="text-[8px] font-black uppercase tracking-widest leading-none">
                                        {msg.role === 'user' ? 'USER NODE' : 'AI NEURAL CORE'}
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Live Stream View */}
                        {(transcript || interimTranscript) && (
                            <div className="ml-auto items-end max-w-[85%] flex flex-col">
                                <div className="p-4 bg-white/5 border border-white/20 text-emerald-400 text-[11px] font-bold uppercase italic tracking-tight animate-pulse">
                                    {transcript} {interimTranscript}
                                </div>
                                <div className="mt-2 text-[8px] font-black text-amber-500 uppercase tracking-widest">LIVE TRANSCRIPTION LINK</div>
                            </div>
                        )}

                        {/* Thinking View */}
                        {isThinking && (
                            <div className="items-start max-w-[85%] flex flex-col">
                                <div className="p-6 bg-white/5 border border-emerald-500/20 flex flex-col gap-4 w-full">
                                    <div className="flex gap-2">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce" />
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce delay-100" />
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce delay-200" />
                                    </div>
                                    <div className="text-[9px] font-black text-emerald-500/40 uppercase tracking-[0.3em]">PROCESSING NEURAL RESPONSE...</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center opacity-20 border-t border-white/5 pt-8 w-full">
                <div className="inline-flex items-center gap-6">
                    <div className="h-[2px] w-12 bg-white" />
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">BHARAT MENTORSHIP SYSTEM v2.0 // NEURAL LINK</span>
                    <div className="h-[2px] w-12 bg-white" />
                </div>
            </div>
        </div>
    );
};

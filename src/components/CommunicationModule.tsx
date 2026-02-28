"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { MessageSquare, Mic, Video, Sparkles, Loader2, ChevronRight, ArrowLeft, Play, Square, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Question {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

interface CommunicationModuleProps {
    onExit?: () => void;
}

export const CommunicationModule = ({ onExit }: CommunicationModuleProps) => {
    const [view, setView] = useState<'selection' | 'loading' | 'quiz' | 'voice' | 'results' | 'voice-analysis'>('selection');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    // Voice Lab state
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [voiceAnalysis, setVoiceAnalysis] = useState<string>("");
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const fetchQuestions = async (cat: string) => {
        setView('loading');
        try {
            const response = await fetch("/api/communication/questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: cat }),
            });
            const data = await response.json();
            if (data.questions) {
                setQuestions(data.questions);
                setView('quiz');
                setCurrentQuestionIndex(0);
                setScore(0);
            }
        } catch (error) {
            console.error(error);
            setView('selection');
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            const chunks: BlobPart[] = [];

            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                setAudioBlob(blob);
                analyzeVoice(blob);
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => {
                    if (prev >= 29) {
                        stopRecording();
                        return 30;
                    }
                    return prev + 1;
                });
            }, 1000);
        } catch (err) {
            console.error("Mic access denied", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    const analyzeVoice = async (blob: Blob) => {
        setView('loading');
        try {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                const base64Audio = (reader.result as string).split(',')[1];
                const response = await fetch("/api/communication/voice-analysis", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ audioBase64: base64Audio }),
                });
                const data = await response.json();
                setVoiceAnalysis(data.analysis);
                setView('voice-analysis');
            };
        } catch (error) {
            console.error(error);
            setView('selection');
        }
    };

    const handleOptionSelect = (index: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);
        if (index === questions[currentQuestionIndex].correct) setScore(prev => prev + 1);
        setShowExplanation(true);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowExplanation(false);
        } else {
            setView('results');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto min-h-[500px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                {view === 'selection' && (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full flex flex-col items-center gap-12"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <MessageSquare className="h-6 w-6 text-white/40" />
                                    <span className="text-[12px] font-black tracking-[0.6em] text-white/40 uppercase italic font-display">Linguistic Calibration</span>
                                </div>
                                <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none font-display">
                                    Communication <span className="text-white/40">Link</span>
                                </h2>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-white/30 text-[11px] uppercase tracking-[0.5em] max-w-[300px] text-right leading-relaxed font-display">
                                    Multimodal linguistic analysis and vocal sentiment tracking.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            <button
                                onClick={() => setView('voice')}
                                className="glass-dark p-12 rounded-none border border-white/10 flex flex-col items-center text-center group transition-all hover:border-white/40 sheen-effect"
                            >
                                <div className="h-24 w-24 rounded-none bg-white/5 flex items-center justify-center mb-10 text-white/40 group-hover:scale-110 transition-transform">
                                    <Mic className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight mb-4 uppercase italic">Voice Practice</h3>
                                <p className="text-white/20 text-[10px] max-w-xs mb-10 uppercase tracking-[0.2em] leading-relaxed">
                                    Record 30 seconds of speech for detailed tonal analysis.
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:translate-x-1 transition-transform">
                                    <span>Start Practice</span>
                                    <ChevronRight className="h-3 w-3" />
                                </div>
                            </button>

                            <button
                                onClick={() => fetchQuestions('Interview Scenarios')}
                                className="glass-dark p-12 rounded-none border border-white/10 flex flex-col items-center text-center group transition-all hover:border-white/40 sheen-effect"
                            >
                                <div className="h-24 w-24 rounded-none bg-white/5 flex items-center justify-center mb-10 text-white/40 group-hover:scale-110 transition-transform">
                                    <Sparkles className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight mb-4 uppercase italic">Interview Scenarios</h3>
                                <p className="text-white/20 text-[10px] max-w-xs mb-10 uppercase tracking-[0.2em] leading-relaxed">
                                    Gemini-synthesized high-level communication case studies.
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:translate-x-1 transition-transform">
                                    <span>Start Practice</span>
                                    <ChevronRight className="h-3 w-3" />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}

                {view === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <Loader2 className="h-12 w-12 text-white/20 animate-spin" />
                        <div className="text-center">
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-[0.2em]">Processing</h3>
                            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-2">Gemini is analyzing your speech patterns...</p>
                        </div>
                    </motion.div>
                )}

                {view === 'voice' && (
                    <motion.div
                        key="voice"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full glass-dark p-16 rounded-none border border-white/10 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 h-1 bg-white/10 w-full" />
                        <div className="absolute top-0 left-0 h-1 bg-white transition-all duration-1000" style={{ width: `${(recordingTime / 30) * 100}%` }} />

                        <div className="h-24 w-24 rounded-none bg-white/5 flex items-center justify-center mx-auto mb-10 relative">
                            {isRecording && (
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 bg-white/5 blur-2xl rounded-full"
                                />
                            )}
                            <Mic className={cn("h-10 w-10 transition-colors", isRecording ? "text-white" : "text-white/20")} />
                        </div>

                        <h2 className="text-4xl font-black text-white italic tracking-tighter mb-4 uppercase">Voice Recording</h2>
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] mb-12">
                            {isRecording ? `Recording... 00:${recordingTime.toString().padStart(2, '0')} / 00:30` : "Ready to log speaking patterns"}
                        </p>

                        {!isRecording ? (
                            <button
                                onClick={startRecording}
                                className="px-12 py-5 bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:scale-105 transition-all active:scale-95"
                            >
                                Initialize Log
                            </button>
                        ) : (
                            <button
                                onClick={stopRecording}
                                className="px-12 py-5 bg-white/10 border border-white/20 text-white font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white/20 transition-all flex items-center gap-3 mx-auto"
                            >
                                <Square className="h-4 w-4 fill-white" />
                                Terminate
                            </button>
                        )}

                        <button
                            onClick={() => setView('selection')}
                            className="absolute top-8 left-8 text-white/20 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    </motion.div>
                )}

                {view === 'voice-analysis' && (
                    <motion.div
                        key="voice-analysis"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full glass-dark p-12 rounded-none border border-white/10 text-left relative overflow-hidden sheen-effect"
                    >
                        <div className="flex items-center gap-3 mb-10">
                            <CheckCircle2 className="h-5 w-5 text-white/40" />
                            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Biometric Feedback</h2>
                        </div>

                        <div className="space-y-8 mb-12">
                            <div className="p-8 bg-white/5 border border-white/5 rounded-none leading-relaxed text-sm text-white/60 tracking-tight whitespace-pre-wrap uppercase">
                                {voiceAnalysis}
                            </div>
                        </div>

                        <button
                            onClick={() => setView('selection')}
                            className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:translate-y-[-2px] active:translate-y-0"
                        >
                            Reset Protocol
                        </button>
                    </motion.div>
                )}

                {view === 'quiz' && questions.length > 0 && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full glass-dark p-8 md:p-12 rounded-none border border-white/10 shadow-2xl relative overflow-hidden sheen-effect"
                    >
                        <div className="absolute top-0 left-0 h-1 bg-white transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} />

                        <div className="flex justify-between items-center mb-12">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Scenario {currentQuestionIndex + 1} / {questions.length}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Case Study</span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-white mb-12 leading-tight tracking-tight uppercase italic">
                            "{questions[currentQuestionIndex].question}"
                        </h3>

                        <div className="grid grid-cols-1 gap-3 mb-12">
                            {questions[currentQuestionIndex].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionSelect(idx)}
                                    className={cn(
                                        "w-full p-6 border rounded-none text-left font-black transition-all flex items-center justify-between group text-[10px] uppercase tracking-widest",
                                        selectedOption === null ? "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10 text-white/60" :
                                            idx === questions[currentQuestionIndex].correct ? "border-white bg-white text-black" :
                                                idx === selectedOption ? "border-white/10 bg-white/5 text-white/20" : "border-white/5 opacity-20"
                                    )}
                                >
                                    <span>{option}</span>
                                    {selectedOption !== null && idx === questions[currentQuestionIndex].correct && <CheckCircle2 className="h-4 w-4" />}
                                    {selectedOption === idx && idx !== questions[currentQuestionIndex].correct && <XCircle className="h-4 w-4" />}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence>
                            {showExplanation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mb-12 p-8 bg-black/60 border border-white/10 rounded-none shadow-xl"
                                >
                                    <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">
                                        <span className="font-black tracking-[0.2em] block mb-3 text-white/80">Expert Logic:</span>
                                        {questions[currentQuestionIndex].explanation}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {selectedOption !== null && (
                            <button
                                onClick={nextQuestion}
                                className="w-full py-6 bg-white text-black font-black rounded-none transition-all flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[10px] shadow-2xl"
                            >
                                {currentQuestionIndex === questions.length - 1 ? "See Results" : "Next Question"}
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        )}

                        <button
                            onClick={() => setView('selection')}
                            className="absolute top-8 left-8 text-white/20 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    </motion.div>
                )}

                {view === 'results' && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full glass-dark p-16 rounded-none border border-white/10 text-center relative overflow-hidden sheen-effect"
                    >
                        <div className="relative z-10">
                            <div className="h-20 w-20 rounded-none bg-white/5 flex items-center justify-center mx-auto mb-10">
                                <Sparkles className="h-10 w-10 text-white/40" />
                            </div>

                            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4 uppercase">Practice Complete</h2>
                            <p className="text-white/20 font-black tracking-[0.4em] uppercase text-[10px] mb-12">Scenario Mastery Analysis</p>

                            <div className="flex items-center justify-center gap-16 mb-16">
                                <div className="text-center text-white">
                                    <div className="text-6xl font-black mb-3">{score}</div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Correct</div>
                                </div>
                                <div className="h-16 w-px bg-white/10" />
                                <div className="text-center text-white">
                                    <div className="text-6xl font-black mb-3 opacity-40">{Math.round((score / questions.length) * 100)}%</div>
                                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Accuracy</div>
                                </div>
                            </div>

                            <button
                                onClick={() => onExit ? onExit() : setView('selection')}
                                className="w-full py-6 bg-white text-black font-black rounded-none transition-all shadow-2xl uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3"
                            >
                                <ArrowLeft className="h-3 w-3" />
                                <span>Back to Menu</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

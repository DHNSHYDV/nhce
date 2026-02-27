"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Brain, Check, X, Timer, BookOpen, Calculator, Sparkles, ChevronRight, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface AptitudeQuestion {
    question: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    correct_option: "A" | "B" | "C" | "D";
    explanation: string;
    formula_used: string;
    estimated_time_seconds: string;
    topic: string;
}

export default function AptitudeModule() {
    const [questionData, setQuestionData] = useState<AptitudeQuestion | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Scoring & Stats
    const [score, setScore] = useState(0);
    const [totalAttempted, setTotalAttempted] = useState(0);

    // Timer
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    const fetchQuestion = async () => {
        setIsLoading(true);
        setSelectedOption(null);
        setIsSubmitted(false);
        setQuestionData(null);
        setTimeLeft(null);

        try {
            const res = await fetch("/api/aptitude", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: "Quantitative Aptitude", difficulty: "Medium" })
            });
            const data: AptitudeQuestion = await res.json();
            setQuestionData(data);
            setTimeLeft(parseInt(data.estimated_time_seconds, 10) || 60);
        } catch (error) {
            console.error("Failed to fetch question:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-fetch first question on mount
    useEffect(() => {
        fetchQuestion();
    }, []);

    // Timer countdown logic
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0 || isSubmitted || !questionData) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
        }, 1000);

        if (timeLeft === 0 && !isSubmitted) {
            handleTimeUp();
        }

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft, isSubmitted, questionData]);

    const handleTimeUp = useCallback(() => {
        setIsSubmitted(true);
        setTotalAttempted((prev) => prev + 1);
        setSelectedOption(null); // Time out = wrong/no selection
    }, []);

    const handleSubmit = () => {
        if (!selectedOption || isSubmitted) return;
        setIsSubmitted(true);
        setTotalAttempted((prev) => prev + 1);
        if (selectedOption === questionData?.correct_option) {
            setScore((prev) => prev + 1);
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col rounded-[2.5rem] border border-white/10 bg-slate-950/40 backdrop-blur-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative group/aptitude transition-all duration-700">
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover/aptitude:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            {/* Header / Toolbar */}
            <div className="relative z-50 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-slate-900/40 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <Brain className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-black tracking-tight text-foreground uppercase italic transition-colors">
                            APTITUDE<span className="text-blue-500 font-sans not-italic">.ai</span>
                        </h3>
                    </div>

                    <div className="h-6 w-px bg-white/10" />

                    <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                        <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-emerald-400" />
                            <span className="text-emerald-400">{score}</span>
                        </div>
                        <span className="text-slate-600">/</span>
                        <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-slate-500" />
                            <span>{totalAttempted}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Timer */}
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors",
                        timeLeft !== null && timeLeft <= 10 && !isSubmitted
                            ? "bg-red-500/10 border-red-500/30 text-red-400 animate-pulse"
                            : "bg-white/5 border-white/10 text-slate-300"
                    )}>
                        <Timer className="h-4 w-4" />
                        <span className="text-sm font-mono font-bold tracking-wider">
                            {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
                        </span>
                    </div>

                    <button
                        onClick={fetchQuestion}
                        disabled={isLoading}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all group relative"
                    >
                        <RotateCcw className={cn("h-5 w-5 transition-transform duration-500", isLoading && "animate-spin")} />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Skip</span>
                    </button>

                    {isSubmitted && (
                        <button
                            onClick={fetchQuestion}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] shadow-inner"
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden min-h-[500px]">
                {/* Question Panel */}
                <div className="flex-[3] relative border-r border-white/5 bg-slate-950/20 overflow-y-auto p-8 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full w-full flex flex-col items-center justify-center gap-4 text-slate-500 font-black uppercase tracking-[0.2em]"
                            >
                                <Sparkles className="h-8 w-8 animate-pulse text-blue-500/50" />
                                Synthesizing Scenario...
                            </motion.div>
                        ) : questionData ? (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {/* Topic Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                                    <BookOpen className="h-3 w-3" />
                                    {questionData.topic}
                                </div>

                                {/* The Question */}
                                <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-200">
                                    {questionData.question}
                                </p>

                                {/* Options Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                    {Object.entries(questionData.options).map(([key, value]) => {
                                        const isSelected = selectedOption === key;
                                        const isCorrect = questionData.correct_option === key;
                                        const showSuccess = isSubmitted && isCorrect;
                                        const showError = isSubmitted && isSelected && !isCorrect;

                                        return (
                                            <button
                                                key={key}
                                                onClick={() => !isSubmitted && setSelectedOption(key as any)}
                                                disabled={isSubmitted}
                                                className={cn(
                                                    "relative flex items-center p-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden group/opt",
                                                    isSubmitted ? "cursor-default" : "cursor-pointer hover:border-slate-500",
                                                    isSelected && !isSubmitted ? "border-blue-500/50 bg-blue-500/10" : "border-white/5 bg-white/5",
                                                    showSuccess && "border-emerald-500/50 bg-emerald-500/10 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]",
                                                    showError && "border-red-500/50 bg-red-500/10"
                                                )}
                                            >
                                                {/* Option Letter Indicator */}
                                                <div className={cn(
                                                    "flex items-center justify-center h-8 w-8 rounded-lg font-black text-sm mr-4 shrink-0 transition-colors",
                                                    isSelected && !isSubmitted ? "bg-blue-500 text-slate-950" : "bg-white/10 text-slate-400 group-hover/opt:text-white",
                                                    showSuccess && "bg-emerald-500 text-slate-950",
                                                    showError && "bg-red-500 text-slate-950"
                                                )}>
                                                    {key}
                                                </div>
                                                <span className={cn(
                                                    "font-medium text-base",
                                                    (showSuccess || isSelected) ? "text-slate-100" : "text-slate-300 group-hover/opt:text-slate-100"
                                                )}>
                                                    {value}
                                                </span>

                                                {/* Post-submit icons */}
                                                {showSuccess && <Check className="absolute right-4 h-5 w-5 text-emerald-400" />}
                                                {showError && <X className="absolute right-4 h-5 w-5 text-red-400" />}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Submit Button (if active) */}
                                {!isSubmitted && (
                                    <div className="pt-6 flex justify-end">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!selectedOption}
                                            className={cn(
                                                "px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all",
                                                !selectedOption
                                                    ? "bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed"
                                                    : "bg-blue-500 hover:bg-blue-400 text-slate-950 shadow-[0_0_20px_rgba(59,130,246,0.3)] shadow-inner"
                                            )}
                                        >
                                            Submit Answer
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>

                {/* Explanation Panel */}
                <div className="flex-[1.5] bg-slate-950/30 backdrop-blur-md flex flex-col transition-colors border-l border-white/5">
                    <div className="px-6 py-4 flex items-center gap-2 border-b border-white/5 bg-slate-950/40 shrink-0">
                        <Calculator className="h-4 w-4 text-slate-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Analysis & Logic</span>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                        <AnimatePresence mode="wait">
                            {isSubmitted && questionData ? (
                                <motion.div
                                    key="explanation"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Evaluation Banner */}
                                    <div className={cn(
                                        "p-4 rounded-xl border flex items-center gap-3",
                                        selectedOption === questionData.correct_option
                                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                            : "border-red-500/20 bg-red-500/10 text-red-400"
                                    )}>
                                        {selectedOption === questionData.correct_option ? (
                                            <>
                                                <div className="p-1.5 rounded-lg bg-emerald-500/20">
                                                    <Check className="h-4 w-4" />
                                                </div>
                                                <span className="font-bold text-sm">Correct! Excellent deduction.</span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-1.5 rounded-lg bg-red-500/20">
                                                    <X className="h-4 w-4" />
                                                </div>
                                                <span className="font-bold text-sm">Incorrect. The right answer is {questionData.correct_option}.</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Breakdown */}
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Step-by-Step Breakdown</h4>
                                        <div className="font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                            {questionData.explanation}
                                        </div>
                                    </div>

                                    {/* Formula Used */}
                                    {questionData.formula_used && questionData.formula_used !== "N/A" && (
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Core Principle</h4>
                                            <div className="font-mono text-xs text-blue-400 bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
                                                {questionData.formula_used}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center text-slate-600 italic px-4"
                                >
                                    {isLoading ? "Awaiting data stream..." : "Submit your answer to unlock the step-by-step breakdown and formulas used."}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.1);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(59, 130, 246, 0.2);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 130, 246, 0.4);
                }
            `}</style>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import { Brain, Sparkles, Zap, ChevronRight, ArrowLeft, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Question {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

export const AptitudeModule = () => {
    const [view, setView] = useState<'selection' | 'loading' | 'quiz' | 'results'>('selection');
    const [category, setCategory] = useState<string>("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const startQuiz = async (cat: string) => {
        setCategory(cat);
        setView('loading');
        try {
            const response = await fetch("/api/aptitude", {
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
            } else {
                alert("Failed to load questions. Please check your API key.");
                setView('selection');
            }
        } catch (error) {
            console.error(error);
            setView('selection');
        }
    };

    const handleOptionSelect = (index: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);
        if (index === questions[currentQuestionIndex].correct) {
            setScore(prev => prev + 1);
        }
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

    const reset = () => {
        setView('selection');
        setQuestions([]);
        setScore(0);
        setSelectedOption(null);
        setShowExplanation(false);
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
                        <div className="text-center space-y-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Brain className="h-4 w-4 text-white/40" />
                                <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Cognitive Intelligence</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
                                Master your <span className="text-white/40">Logic</span>
                            </h2>
                            <p className="text-white/40 font-medium max-w-xl mx-auto text-sm">
                                AI-driven aptitude sprints optimized for terminal velocity.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {[
                                { title: "Quantitative", desc: "Numerical reasoning sprints", icon: Zap, cat: "Quantitative Aptitude" },
                                { title: "Logical", desc: "Pattern recognition trials", icon: Brain, cat: "Logical Reasoning" },
                                { title: "Verbal", desc: "Critical reading analysis", icon: Sparkles, cat: "Verbal Ability" },
                            ].map((item, i) => (
                                <button
                                    key={item.title}
                                    onClick={() => startQuiz(item.cat)}
                                    className="glass-dark p-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all group text-left"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-white/60">
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors uppercase italic">{item.title}</h3>
                                    <p className="text-white/40 text-xs leading-relaxed mb-6">{item.desc}</p>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:translate-x-1 transition-transform">
                                        <span>Start Sprint</span>
                                        <ChevronRight className="h-3 w-3" />
                                    </div>
                                </button>
                            ))}
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
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-[0.2em]">Crafting Sprint</h3>
                            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-2">Gemini is synthesizing logical patterns...</p>
                        </div>
                    </motion.div>
                )}

                {view === 'quiz' && questions.length > 0 && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full glass-dark p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 h-1 bg-white transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }} />

                        <div className="flex justify-between items-center mb-12">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Question {currentQuestionIndex + 1} / {questions.length}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{category}</span>
                        </div>

                        <h3 className="text-2xl md:text-4xl font-black text-white mb-12 leading-tight tracking-tight uppercase italic">
                            {questions[currentQuestionIndex].question}
                        </h3>

                        <div className="grid grid-cols-1 gap-3 mb-12">
                            {questions[currentQuestionIndex].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionSelect(idx)}
                                    className={cn(
                                        "w-full p-6 border rounded-[1.5rem] text-left font-bold transition-all flex items-center justify-between group text-sm uppercase tracking-tight",
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
                                    className="mb-12 p-8 bg-white/5 rounded-[2rem] border border-white/10"
                                >
                                    <p className="text-xs text-white/40 leading-relaxed uppercase tracking-tight">
                                        <span className="font-black tracking-[0.2em] block mb-3 text-white/60">Logic Breakdown:</span>
                                        {questions[currentQuestionIndex].explanation}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {selectedOption !== null && (
                            <button
                                onClick={nextQuestion}
                                className="w-full py-6 bg-white text-black font-black rounded-none transition-all flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-xs shadow-2xl"
                            >
                                {currentQuestionIndex === questions.length - 1 ? "End Experience" : "Next Protocol"}
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        )}
                    </motion.div>
                )}

                {view === 'results' && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full glass-dark p-16 rounded-[4.5rem] border border-white/10 text-center relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-10">
                                <Sparkles className="h-10 w-10 text-white/40" />
                            </div>

                            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4 uppercase">Analysis Complete</h2>
                            <p className="text-white/20 font-black tracking-[0.4em] uppercase text-[10px] mb-12">{category}</p>

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

                            <div className="flex flex-col md:flex-row gap-4">
                                <button
                                    onClick={reset}
                                    className="flex-1 py-6 bg-white/5 hover:bg-white/10 text-white/60 font-black rounded-none transition-all border border-white/10 uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3"
                                >
                                    <ArrowLeft className="h-3 w-3" />
                                    Synchronize New
                                </button>
                                <button
                                    onClick={() => startQuiz(category)}
                                    className="flex-1 py-6 bg-white text-black font-black rounded-none transition-all shadow-2xl uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3"
                                >
                                    <RotateCcw className="h-3 w-3" />
                                    Re-Initialize
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const RotateCcw = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
    </svg>
);

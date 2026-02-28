"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Mic,
    Square,
    Loader2,
    ChevronRight,
    ArrowLeft,
    Play,
    CheckCircle2,
    Zap,
    Shield,
    User,
    Sparkles,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";

type RoundType = 'Technical' | 'HR' | 'Managerial';

interface InterviewRound {
    type: RoundType;
    questions: string[];
}

const rounds: InterviewRound[] = [
    {
        type: 'Technical',
        questions: [
            "Explain the difference between a process and a thread in modern operating systems.",
            "What is the significance of the Big O notation, and how do you optimize an O(n^2) algorithm?",
            "How do you handle memory management in a high-performance application?"
        ]
    },
    {
        type: 'HR',
        questions: [
            "Tell me about a time you faced a significant conflict in a team and how you resolved it.",
            "Where do you see yourself in five years, and how does this role align with your evolution?",
            "What is your greatest professional accomplishment and the logic behind your success?"
        ]
    },
    {
        type: 'Managerial',
        questions: [
            "If you are leading a project that is falling behind schedule, what is your protocol for synchronization?",
            "How do you prioritize limited resources across multiple high-stakes initiatives?",
            "Describe your leadership philosophy in a high-velocity environment."
        ]
    }
];

export const InterviewModule = ({ onExit }: { onExit: () => void }) => {
    const [view, setView] = useState<'selection' | 'round-intro' | 'active-session' | 'loading' | 'analysis'>('selection');
    const [activeRoundIndex, setActiveRoundIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordings, setRecordings] = useState<{ question: string, analysis: string }[]>([]);
    const [currentAnalysis, setCurrentAnalysis] = useState("");
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const activeRound = rounds[activeRoundIndex];
    const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setCameraStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied", err);
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
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
                processRecording(blob);
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

    const processRecording = async (blob: Blob) => {
        setView('loading');
        try {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                const base64Audio = (reader.result as string).split(',')[1];
                const response = await fetch("/api/interview/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        audioBase64: base64Audio,
                        round: activeRound.type,
                        question: activeRound.questions[currentQuestionIndex]
                    }),
                });
                const data = await response.json();

                const newAnalysis = {
                    question: activeRound.questions[currentQuestionIndex],
                    analysis: data.analysis
                };

                setRecordings(prev => [...prev, newAnalysis]);
                setCurrentAnalysis(data.analysis);
                setView('analysis');
                stopCamera(); // Automatically turn off camera after recording is processed
            };
        } catch (error) {
            console.error(error);
            setView('active-session');
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < activeRound.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setView('active-session');
            startCamera(); // Restart camera for the next question
        } else if (activeRoundIndex < rounds.length - 1) {
            setActiveRoundIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
            setView('round-intro');
            stopCamera();
        } else {
            stopCamera();
            onExit();
        }
    };

    useEffect(() => {
        if (view === 'active-session') {
            startCamera();
        } else if (view === 'analysis' || view === 'selection') {
            // keep camera on during analysis if we want, but typically we stop or freeze
        }
        return () => {
            if (view !== 'active-session' && view !== 'analysis') {
                stopCamera();
            }
        };
    }, [view]);

    return (
        <div className="w-full max-w-7xl mx-auto min-h-[600px] flex flex-col items-center justify-center p-4">
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
                                <Shield className="h-4 w-4 text-white/40" />
                                <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">AI Interview Session</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic leading-none">
                                Practice Your <span className="text-white/40">Interviews</span>
                            </h2>
                            <p className="text-white/30 font-medium max-w-xl mx-auto text-xs uppercase tracking-[0.2em]">
                                High-stakes interview practice with AI feedback.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {rounds.map((round, idx) => (
                                <button
                                    key={round.type}
                                    onClick={() => {
                                        setActiveRoundIndex(idx);
                                        setCurrentQuestionIndex(0);
                                        setView('round-intro');
                                    }}
                                    className={cn(
                                        "glass-dark p-8 rounded-none border transition-all flex flex-col items-center text-center group",
                                        activeRoundIndex === idx ? "border-white opacity-100" : "border-white/10 opacity-40 hover:opacity-100"
                                    )}
                                >
                                    <div className="h-16 w-16 rounded-none bg-white/5 flex items-center justify-center mb-6 text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                                        {round.type === 'Technical' && <Zap className="h-8 w-8" />}
                                        {round.type === 'HR' && <User className="h-8 w-8" />}
                                        {round.type === 'Managerial' && <Shield className="h-8 w-8" />}
                                    </div>
                                    <h3 className="text-xl font-black tracking-tight mb-2 uppercase italic">{round.type}</h3>
                                    <p className="text-white/20 text-[9px] uppercase tracking-widest leading-relaxed">
                                        {round.questions.length} Questions
                                    </p>
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Select a round above to begin</span>
                        </div>
                    </motion.div>
                )}

                {view === 'round-intro' && (
                    <motion.div
                        key="round-intro"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="w-full max-w-2xl glass-dark p-16 rounded-none border border-white/10 text-center relative overflow-hidden sheen-effect"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-white" />
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-8 block">Current Round</span>
                        <h3 className="text-6xl font-black text-white italic tracking-tighter mb-4 uppercase">{activeRound.type}</h3>
                        <p className="text-white/40 text-xs font-medium max-w-md mx-auto mb-12 uppercase tracking-widest leading-loose">
                            Analyzing logical depth and professional alignment. Get ready.
                        </p>
                        <button
                            onClick={() => setView('active-session')}
                            className="px-12 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em]"
                        >
                            Start Interview
                        </button>
                    </motion.div>
                )}

                {(view === 'active-session' || view === 'analysis' || view === 'loading') && (
                    <motion.div
                        key="session-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full flex flex-col md:flex-row gap-8 items-stretch h-[700px]"
                    >
                        {/* Left Column: 3D Robot Interaction */}
                        <div className="flex-[1.5] relative glass-dark border border-white/10 overflow-hidden flex items-center justify-center">
                            <div className="absolute top-8 left-8 z-20">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">AI INTERVIEWER: WHOBEE</span>
                            </div>
                            <InteractiveRobotSpline
                                scene={ROBOT_SCENE_URL}
                                className="w-full h-full"
                            />
                            {view === 'loading' && (
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-30">
                                    <Loader2 className="h-16 w-16 text-white/20 animate-spin" />
                                    <div className="text-center mt-6">
                                        <h3 className="text-2xl font-black text-white italic uppercase tracking-[0.3em] mb-2">Analyzing Response</h3>
                                        <p className="text-white/30 text-[9px] uppercase tracking-[0.4em]">Gemini is generating feedback...</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: User Camera & Interaction */}
                        <div className="flex-1 flex flex-col gap-6">
                            {/* Camera Feed */}
                            <div className="relative aspect-video glass-dark border border-white/10 overflow-hidden bg-black/40 group">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute top-4 right-4 z-20">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/60">LIVE FEED</span>
                                    </div>
                                </div>
                                {!cameraStream && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <AlertCircle className="h-8 w-8 text-white/10" />
                                    </div>
                                )}
                            </div>

                            {/* Interaction Area */}
                            <div className="flex-1 glass-dark border border-white/10 p-8 flex flex-col">
                                <AnimatePresence mode="wait">
                                    {view === 'active-session' && (
                                        <motion.div
                                            key="active"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col h-full"
                                        >
                                            <div className="flex justify-between items-center mb-10">
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">{activeRound.type} ROUND</span>
                                                <button
                                                    onClick={() => {
                                                        stopCamera();
                                                        onExit();
                                                    }}
                                                    className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white/60 transition-colors"
                                                >
                                                    End Session
                                                </button>
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">{currentQuestionIndex + 1} / {activeRound.questions.length}</span>
                                            </div>

                                            <h3 className="text-2xl font-black text-white mb-auto leading-tight tracking-tight uppercase italic">
                                                "{activeRound.questions[currentQuestionIndex]}"
                                            </h3>

                                            <div className="flex flex-col items-center pt-8 border-t border-white/10">
                                                {!isRecording ? (
                                                    <button
                                                        onClick={startRecording}
                                                        className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:scale-[1.02] transition-all"
                                                    >
                                                        Record Response
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={stopRecording}
                                                        className="w-full py-5 bg-white/10 border border-white/20 text-white font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 group"
                                                    >
                                                        <Square className="h-3 w-3 fill-white animate-pulse" />
                                                        Stop Recording ({recordingTime}s)
                                                    </button>
                                                )}
                                                <p className="mt-4 text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">
                                                    {isRecording ? "RECORDING ACTIVE" : "WAITING FOR RESPONSE"}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {view === 'analysis' && (
                                        <motion.div
                                            key="analysis"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-col h-full"
                                        >
                                            <div className="flex items-center gap-3 mb-8">
                                                <Sparkles className="h-4 w-4 text-white/40" />
                                                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Interview Analysis</h3>
                                            </div>

                                            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar mb-8">
                                                <p className="text-[10px] text-white/60 tracking-tight leading-relaxed uppercase whitespace-pre-wrap font-medium">
                                                    {currentAnalysis}
                                                </p>
                                            </div>

                                            <button
                                                onClick={handleNext}
                                                className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
                                            >
                                                Next Question
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {view === 'selection' && (
                <button
                    onClick={onExit}
                    className="mt-12 text-[10px] font-black text-white/20 uppercase tracking-[0.5em] hover:text-white transition-colors"
                >
                    Exit Interview
                </button>
            )}
        </div>
    );
};

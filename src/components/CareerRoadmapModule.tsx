"use client";

import React from "react";
import { motion } from "framer-motion";
import { Map, Sparkles, Target, Zap, Rocket, Star, ChevronRight, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const roadmap = [
    {
        stage: "Phase 1: Foundation",
        role: "System Architect",
        status: "Completed",
        color: "white"
    },
    {
        stage: "Phase 2: Specialty",
        role: "AI Integration Lead",
        status: "Analyzing",
        color: "white/40"
    },
    {
        stage: "Phase 3: Mastery",
        role: "Chief Technology Officer",
        status: "Locked",
        color: "white/10"
    }
];

export const CareerRoadmapModule = () => {
    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-6">
            <div className="text-center mb-24 space-y-8">
                <div className="flex items-center justify-center gap-4">
                    <Map className="h-6 w-6 text-white/40" />
                    <span className="text-[12px] font-black tracking-[0.7em] text-white/40 uppercase italic font-display">Dynamic Trajectory</span>
                </div>
                <h2 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-none font-display">
                    Career <span className="text-white/40">Roadmap</span>
                </h2>
                <p className="text-white/20 text-[11px] uppercase tracking-[0.5em] max-w-xl mx-auto font-black leading-loose font-display">
                    AI-driven skill auditing and behavioral mapping to predict your optimal professional path.
                </p>
            </div>

            <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-[50%] top-0 bottom-0 w-px bg-white/5 hidden md:block" />

                <div className="space-y-24 relative z-10">
                    {roadmap.map((item, idx) => (
                        <motion.div
                            key={item.stage}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "flex flex-col md:flex-row items-center gap-12",
                                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            )}
                        >
                            <div className="flex-1 glass-dark border border-white/5 p-10 hover:border-white/20 transition-all group w-full">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{item.stage}</span>
                                    {item.status === "Analyzing" && <Zap className="h-4 w-4 text-white animate-pulse" />}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-tighter mb-4 group-hover:translate-x-2 transition-transform">
                                    {item.role}
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-8">
                                    {["Logic Mastery", "System Design", "EI Metrics"].map(tag => (
                                        <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-white/20 px-3 py-1 bg-white/5 border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="h-16 w-16 rounded-none bg-black border border-white/10 flex items-center justify-center relative">
                                <div className={cn(
                                    "h-4 w-4 rounded-none rotate-45 border",
                                    item.status === "Completed" ? "bg-white border-white" : "bg-transparent border-white/20"
                                )} />
                                {item.status === "Analyzing" && (
                                    <div className="absolute inset-0 border border-white animate-ping opacity-20" />
                                )}
                            </div>

                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-32 p-16 border-t border-white/5 flex flex-col items-center text-center">
                <Brain className="h-12 w-12 text-white/10 mb-8" />
                <h4 className="text-xl font-black italic text-white/40 uppercase tracking-[0.3em] mb-6">Neural Sync Required</h4>
                <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium max-w-lg mb-12">
                    Complete 5 more Technical rounds and 1 Emotional Intelligence simulation to unlock Phase 2 analysis.
                </p>
                <button className="px-12 py-5 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-white hover:text-black transition-all group">
                    View Potential Domains
                    <Rocket className="h-3 w-3 group-hover:translate-y-[-2px] transition-transform" />
                </button>
            </div>
        </div>
    );
};

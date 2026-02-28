"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Users, MessageSquare, Zap, ChevronRight, AlertCircle, Brain, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const simulations = [
    {
        id: "conflict",
        title: "Conflict Resolution",
        desc: "Handle high-stakes disagreements within a senior engineering team.",
        icon: Users,
        difficulty: "Level 4"
    },
    {
        id: "negotiation",
        title: "Strategic Negotiation",
        desc: "Secure resource allocation for your project during the quarterly sync.",
        icon: Target,
        difficulty: "Level 5"
    },
    {
        id: "crisis",
        title: "Crisis Leadership",
        desc: "Manage team morale and technical response during a critical system outage.",
        icon: Zap,
        difficulty: "Level 6"
    }
];

export const LeadershipModule = () => {
    const [activeSim, setActiveSim] = useState<string | null>(null);

    return (
        <div className="w-full max-w-6xl mx-auto py-12 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Shield className="h-6 w-6 text-white/40" />
                        <span className="text-[12px] font-black tracking-[0.6em] text-white/40 uppercase italic font-display">Command & Influence</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none font-display">
                        Leadership <span className="text-white/40">Nexus</span>
                    </h2>
                </div>
                <div className="hidden md:block">
                    <p className="text-white/30 text-[11px] uppercase tracking-[0.5em] max-w-[300px] text-right leading-relaxed font-display">
                        High-fidelity emotional intelligence simulations for future technical leaders.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {simulations.map((sim, idx) => (
                    <motion.div
                        key={sim.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-dark border border-white/5 p-10 hover:border-white/40 transition-all group relative flex flex-col h-[400px] overflow-hidden"
                    >
                        <div className="h-16 w-16 bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-all">
                            <sim.icon className="h-8 w-8" />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-4 group-hover:translate-x-2 transition-transform">
                                {sim.title}
                            </h3>
                            <p className="text-[11px] text-white/40 uppercase font-black tracking-widest leading-relaxed mb-8">
                                {sim.desc}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{sim.difficulty}</span>
                            <button
                                onClick={() => setActiveSim(sim.id)}
                                className="flex items-center gap-2 text-[10px] font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-widest"
                            >
                                Enter Simulation
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Brain className="h-24 w-24" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Preview Banner */}
            <div className="mt-16 p-12 bg-white/5 border border-white/10 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/[0.02] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <h4 className="text-sm font-black text-white uppercase tracking-[0.5em] mb-4 italic">Next Generation Simulation Engine</h4>
                <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium max-w-2xl mx-auto">
                    Biometric emotional analysis and multi-agent AI scenarios arriving in Phase 4. Current view is an interface prototype.
                </p>
            </div>
        </div>
    );
};

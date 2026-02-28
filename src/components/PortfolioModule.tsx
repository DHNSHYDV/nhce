"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieChart, Zap, Target, Star, Trophy, ArrowRight, Brain, MessageSquare, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Overall Mastery", value: "88%", icon: Target },
    { label: "Active Streak", value: "56 Days", icon: Zap },
    { label: "Global Percentile", value: "Top 2%", icon: Star },
    { label: "Scenarios Cleared", value: "142", icon: Trophy }
];

const modules = [
    { label: "Code", score: 92, icon: Code },
    { label: "Aptitude", score: 78, icon: Brain },
    { label: "Communication", score: 85, icon: MessageSquare }
];

export const PortfolioModule = () => {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <PieChart className="h-4 w-4 text-white/40" />
                        <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Performance Metrics</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Mastery <span className="text-white/40">Canvas</span>
                    </h2>
                </div>
                <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-white hover:text-black transition-all">
                    Generate Public URL
                    <ArrowRight className="h-3 w-3" />
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-dark p-8 border border-white/5 flex flex-col items-center text-center group bg-white/[0.01]"
                    >
                        <stat.icon className="h-5 w-5 text-white/20 mb-6 group-hover:text-white transition-colors" />
                        <div className="text-3xl font-black italic text-white mb-2">{stat.value}</div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/20">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {/* Module Breakdown */}
                <div className="lg:col-span-2 glass-dark p-10 border border-white/5 space-y-10 bg-white/[0.01]">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-3 italic">
                        <div className="h-px w-8 bg-white/20" />
                        Skill Distribution
                    </h3>

                    <div className="space-y-12">
                        {modules.map((m, idx) => (
                            <div key={m.label} className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3">
                                        <m.icon className="h-4 w-4 text-white/40" />
                                        <span className="text-[11px] font-black uppercase tracking-widest text-white italic">{m.label}</span>
                                    </div>
                                    <span className="text-xl font-black italic text-white/40 tracking-tighter">{m.score}/100</span>
                                </div>
                                <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${m.score}%` }}
                                        transition={{ duration: 2, ease: "circOut", delay: 0.5 + (idx * 0.2) }}
                                        className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievements Preview */}
                <div className="glass-dark p-10 border border-white/5 flex flex-col bg-white/[0.01]">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-3 mb-10 italic">
                        <div className="h-px w-8 bg-white/20" />
                        Recent Badges
                    </h3>
                    <div className="flex-1 flex flex-col justify-center gap-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-5 p-4 border border-white/5 hover:border-white/20 transition-all cursor-pointer group rounded-none">
                                <div className="h-12 w-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Star className="h-5 w-5 text-white/20 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <div className="h-2 w-16 bg-white/10 mb-2" />
                                    <div className="h-2 w-24 bg-white/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

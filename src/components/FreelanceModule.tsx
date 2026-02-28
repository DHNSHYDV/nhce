"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, DollarSign, FileText, Globe, Zap, ArrowUpRight, TrendingUp, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";

const tracks = [
    {
        title: "Client Acquisition",
        stats: "12 Mock Leads",
        icon: Handshake,
        color: "text-white"
    },
    {
        title: "Pricing Strategy",
        stats: "Market Depth: 82%",
        icon: DollarSign,
        color: "text-white/40"
    },
    {
        title: "Proposal Forge",
        stats: "AI Optimized",
        icon: FileText,
        color: "text-white/20"
    }
];

export const FreelanceModule = () => {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 px-6">
            <div className="header mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Briefcase className="h-6 w-6 text-white/40" />
                        <span className="text-[12px] font-black tracking-[0.6em] text-white/40 uppercase italic font-display">Industry Ready</span>
                    </div>
                    <h2 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-none font-display">
                        Business <span className="text-white/40">Unit</span>
                    </h2>
                </div>
                <div className="flex gap-12">
                    <div className="text-center md:text-right">
                        <div className="text-2xl font-black text-white italic">$0.00</div>
                        <div className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">Mock Earnings</div>
                    </div>
                    <div className="text-center md:text-right">
                        <div className="text-2xl font-black text-white italic">0.0</div>
                        <div className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">Conversion Rate</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {tracks.map((track, idx) => (
                    <motion.div
                        key={track.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-dark border border-white/5 p-10 hover:border-white/40 transition-all group bg-white/[0.01]"
                    >
                        <track.icon className={cn("h-8 w-8 mb-12", track.color)} />
                        <h3 className="text-xl font-black italic text-white uppercase tracking-tight mb-2 group-hover:italic transition-all italic">{track.title}</h3>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-10">{track.stats}</p>
                        <button className="flex items-center gap-3 text-[9px] font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-[0.3em]">
                            Open Interface
                            <ArrowUpRight className="h-3 w-3" />
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="glass-dark border border-white/5 p-12 overflow-hidden relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                    <div className="space-y-4 text-center md:text-left">
                        <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter">Startup Fundamentals</h4>
                        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black max-w-md">
                            Interactive curriculum for building high-growth technical agencies.
                        </p>
                    </div>
                    <button className="px-12 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:scale-105 transition-all active:scale-95">
                        Access Syllabus
                    </button>
                </div>
                {/* Background Decoration */}
                <TrendingUp className="absolute -bottom-10 -right-10 h-48 w-48 text-white/[0.02] -rotate-12" />
            </div>
        </div>
    );
};

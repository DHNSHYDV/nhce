"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Languages, Mic, Sparkles, WifiOff, MapPin, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
    { name: "Hindi", script: "हिन्दी", region: "North India" },
    { name: "Marathi", script: "मराठी", region: "Maharashtra" },
    { name: "Bengali", script: "বাংলা", region: "West Bengal" },
    { name: "Tamil", script: "தமிழ்", region: "Tamil Nadu" },
    { name: "Telugu", script: "తెలుగు", region: "Andhra/Telangana" },
    { name: "Kannada", script: "ಕನ್ನಡ", region: "Karnataka" }
];

export const VernacularModule = () => {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 px-6">
            <div className="text-center mb-20 space-y-6">
                <div className="flex items-center justify-center gap-3">
                    <Globe className="h-4 w-4 text-white/40" />
                    <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase italic">Mass Scalability</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
                    Bharat <span className="text-white/40">Sync</span>
                </h2>
                <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] max-w-2xl mx-auto font-black leading-loose">
                    Native language AI mentoring and offline-first infrastructure. Removing barriers for the next billion engineers.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
                {languages.map((lang, idx) => (
                    <motion.div
                        key={lang.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="glass-dark border border-white/5 p-8 hover:border-white/40 cursor-pointer group transition-all relative overflow-hidden flex flex-col items-center justify-center text-center h-[180px]"
                    >
                        <span className="text-3xl font-black text-white/10 group-hover:text-white group-hover:opacity-100 transition-all mb-4">{lang.script}</span>
                        <h3 className="text-sm font-black italic text-white uppercase tracking-widest">{lang.name}</h3>
                        <p className="text-[8px] text-white/20 uppercase tracking-widest mt-2">{lang.region}</p>

                        {/* Hover Decoration */}
                        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-dark border border-white/5 p-12 space-y-8 group hover:border-white/20 transition-all">
                    <div className="h-12 w-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <WifiOff className="h-6 w-6" />
                    </div>
                    <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter">Rural Connectivity Mode</h4>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black leading-relaxed">
                        Low-bandwidth architecture that compresses 3D assets and enables offline logic synchronization.
                    </p>
                    <button className="flex items-center gap-3 text-[10px] font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">
                        Preview Engine
                        <ChevronRight className="h-3 w-3" />
                    </button>
                </div>

                <div className="glass-dark border border-white/5 p-12 space-y-8 group hover:border-white/20 transition-all">
                    <div className="h-12 w-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <Mic className="h-6 w-6" />
                    </div>
                    <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter">Vernacular Voice AI</h4>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black leading-relaxed">
                        Real-time translation and tonal analysis in regional dialects for localized professional growth.
                    </p>
                    <button className="flex items-center gap-3 text-[10px] font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">
                        Test Interface
                        <ChevronRight className="h-3 w-3" />
                    </button>
                </div>
            </div>

            <div className="mt-20 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full">
                    <Sparkles className="h-3 w-3 text-white animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/60 italic">Decide to Code: Bharat Initiative</span>
                </div>
            </div>
        </div>
    );
};

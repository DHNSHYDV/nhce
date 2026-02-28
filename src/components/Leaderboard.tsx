"use client";

import React, { useState } from "react";
import {
    Trophy,
    Search,
    Filter,
    ChevronRight,
    ArrowLeft,
    Globe,
    MapPin,
    School,
    Zap,
    MessageSquare,
    Code,
    Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
    rank: number;
    name: string;
    college: string;
    city: string;
    state: string;
    commSkill: number;
    aptitude: number;
    projects: number;
}

const dummyData: LeaderboardEntry[] = [
    { rank: 1, name: "Arjun Mehta", college: "New Horizon College Of Engineering", city: "Bangalore", state: "Karnataka", commSkill: 98, aptitude: 95, projects: 12 },
    { rank: 2, name: "Sanya Iyer", college: "RV College of Engineering", city: "Bangalore", state: "Karnataka", commSkill: 94, aptitude: 97, projects: 10 },
    { rank: 3, name: "Rohan Das", college: "New Horizon College Of Engineering", city: "Bangalore", state: "Karnataka", commSkill: 92, aptitude: 92, projects: 15 },
    { rank: 4, name: "Ananya Rao", college: "PES University", city: "Bangalore", state: "Karnataka", commSkill: 89, aptitude: 94, projects: 8 },
    { rank: 5, name: "Vikram Singh", college: "IIT Bombay", city: "Mumbai", state: "Maharashtra", commSkill: 85, aptitude: 99, projects: 14 },
    { rank: 6, name: "Priya Sharma", college: "New Horizon College Of Engineering", city: "Bangalore", state: "Karnataka", commSkill: 95, aptitude: 88, projects: 9 },
    { rank: 7, name: "Amit Patel", college: "LPU", city: "Jalandhar", state: "Punjab", commSkill: 88, aptitude: 91, projects: 11 },
    { rank: 8, name: "Neha Gupta", college: "VIT Vellore", city: "Vellore", state: "Tamil Nadu", commSkill: 91, aptitude: 87, projects: 13 },
];

export const Leaderboard = ({ onExit }: { onExit: () => void }) => {
    const [filterType, setFilterType] = useState<'Global' | 'State' | 'City' | 'College'>('Global');
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = dummyData.filter(entry => {
        if (filterType === 'College') return entry.college === "New Horizon College Of Engineering";
        if (filterType === 'City') return entry.city === "Bangalore";
        if (filterType === 'State') return entry.state === "Karnataka";
        return true;
    }).filter(entry => entry.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 py-12 px-6 overflow-hidden">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Trophy className="h-5 w-5 text-white/40" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Performance Rankings</span>
                    </div>
                    <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Leader<span className="text-white/40">board</span>
                    </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                    {['Global', 'State', 'City', 'College'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type as any)}
                            className={cn(
                                "px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-none border",
                                filterType === type
                                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    : "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="glass-dark border border-white/10 rounded-none overflow-hidden relative sheen-effect">
                {/* Search Bar */}
                <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-white/[0.02]">
                    <Search className="h-4 w-4 text-white/20" />
                    <input
                        type="text"
                        placeholder="SEARCH PROTOCOL..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-[0.3em] text-white placeholder:text-white/10 w-full"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Rank</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Synchronizer</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Institution</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 text-center">Comm. IQ</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 text-center">Aptitude</th>
                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 text-center">Builds</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {filteredData.map((entry, index) => (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={entry.name}
                                        className="border-b border-white/5 hover:bg-white/[0.03] group transition-colors"
                                    >
                                        <td className="p-6">
                                            <div className={cn(
                                                "h-10 w-10 flex items-center justify-center font-black italic text-sm",
                                                entry.rank === 1 ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" :
                                                    entry.rank === 2 ? "bg-white/60 text-black" :
                                                        entry.rank === 3 ? "bg-white/30 text-black" : "text-white/20"
                                            )}>
                                                {entry.rank.toString().padStart(2, '0')}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-white uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">{entry.name}</span>
                                                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em]">{entry.city}, {entry.state}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{entry.college}</span>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="text-sm font-black text-white italic">{entry.commSkill}</span>
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="text-sm font-black text-white italic opacity-60">{entry.aptitude}</span>
                                        </td>
                                        <td className="p-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Code className="h-3 w-3 text-white/20" />
                                                <span className="text-sm font-black text-white italic opacity-40">{entry.projects}</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredData.length === 0 && (
                    <div className="p-20 text-center space-y-4">
                        <Sparkles className="h-10 w-10 text-white/5 mx-auto" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">No data found in current synchronization</p>
                    </div>
                )}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={onExit}
                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Return to Hub
                </button>
            </div>
        </div>
    );
};

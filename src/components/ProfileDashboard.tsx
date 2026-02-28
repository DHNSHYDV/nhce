"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Flame,
    Linkedin,
    Trophy,
    Code,
    Brain,
    MessageSquare,
    Zap,
    ChevronRight,
    User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileDashboardProps {
    isOpen: boolean;
    onClose: () => void;
}

const skills = [
    { name: "Python", level: 85, color: "bg-white" },
    { name: "React / Next.js", level: 92, color: "bg-white/80" },
    { name: "Algorithms", level: 78, color: "bg-white/60" },
    { name: "Communication", level: 88, color: "bg-white/40" },
];

const badges = [
    { name: "7 Day Burner", category: "Consistency", icon: Flame, color: "text-white" },
    { name: "30 Day Alchemist", category: "Mastery", icon: Trophy, color: "text-white/60" },
    { name: "Code Ninja", category: "Skill", icon: Code, color: "text-white/40" },
];

export const ProfileDashboard = ({ isOpen, onClose }: ProfileDashboardProps) => {
    // Generate mock heatmap data (52 weeks x 7 days)
    const heatmapData = Array.from({ length: 52 }, () =>
        Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with Blur */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-slate-950/40 cursor-pointer"
                    />

                    {/* Main Dashboard Overlay */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="fixed inset-6 z-[60] bg-slate-900/40 backdrop-blur-3xl rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-10 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-6">
                                <div className="h-20 w-20 rounded-[2rem] bg-white/10 p-0.5 shadow-xl">
                                    <div className="h-full w-full rounded-[1.9rem] bg-black flex items-center justify-center overflow-hidden">
                                        <UserIcon className="h-10 w-10 text-white/40" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black tracking-tighter uppercase italic">Identity</h1>
                                    <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mt-1">AI Skill Twin Architecture</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass bg-white/5 border border-white/10">
                                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                    <span className="text-[10px] uppercase font-black tracking-widest text-white/60">Core Sync: Active</span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="h-12 w-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                            <div className="grid grid-cols-12 gap-8">

                                {/* Left Column - Stats & Heatmap */}
                                <div className="col-span-12 lg:col-span-8 space-y-8">

                                    {/* Dev Heatmap */}
                                    <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 text-white/40">
                                                <Code className="h-4 w-4" />
                                                Dev Heatmap
                                            </h3>
                                            <span className="text-[9px] text-white/20 uppercase tracking-[0.5em]">Source: Sync Hub</span>
                                        </div>

                                        <div className="flex gap-1 overflow-x-auto pb-4 items-end">
                                            {heatmapData.map((week, wIndex) => (
                                                <div key={wIndex} className="flex flex-col gap-1">
                                                    {week.map((day, dIndex) => (
                                                        <div
                                                            key={`${wIndex}-${dIndex}`}
                                                            className={cn(
                                                                "h-3.5 w-3.5 rounded-none transition-all hover:scale-125 cursor-help",
                                                                day === 0 ? "bg-white/[0.03]" :
                                                                    day === 1 ? "bg-white/10" :
                                                                        day === 2 ? "bg-white/25" :
                                                                            day === 3 ? "bg-white/45" : "bg-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 mt-4 text-[9px] text-white/20 font-black uppercase tracking-widest">
                                            <span>Min</span>
                                            <div className="flex gap-1.5">
                                                <div className="h-2.5 w-2.5 bg-white/[0.03]" />
                                                <div className="h-2.5 w-2.5 bg-white/10" />
                                                <div className="h-2.5 w-2.5 bg-white/25" />
                                                <div className="h-2.5 w-2.5 bg-white/45" />
                                                <div className="h-2.5 w-2.5 bg-white" />
                                            </div>
                                            <span>Max</span>
                                        </div>
                                    </div>

                                    {/* Grid for Skills and Activity */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Skill Progress */}
                                        <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3 text-white/40">
                                                <Zap className="h-4 w-4" />
                                                Core Capabilities
                                            </h3>
                                            <div className="space-y-6">
                                                {skills.map(skill => (
                                                    <div key={skill.name} className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="font-semibold text-slate-300">{skill.name}</span>
                                                            <span className="text-slate-500 font-mono">{skill.level}%</span>
                                                        </div>
                                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${skill.level}%` }}
                                                                transition={{ duration: 1, delay: 0.5 }}
                                                                className={cn("h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]", skill.color)}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Activity Feed / Placeholder */}
                                        <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5 flex flex-col justify-center items-center text-center opacity-60">
                                            <Brain className="h-10 w-10 text-white/20 mb-6" />
                                            <h4 className="font-black text-[10px] text-white/40 uppercase tracking-[0.2em]">Next Assessment</h4>
                                            <p className="text-[10px] text-white/20 mt-3 uppercase tracking-widest leading-loose">Quantitative Aptitude Level 4 <br /> Protocol: T-2 Hours</p>
                                            <button className="mt-8 px-8 py-3 rounded-none bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:bg-white/10">
                                                Decide to Code
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Streak & Badges */}
                                <div className="col-span-12 lg:col-span-4 space-y-8">

                                    {/* Streak Counter */}
                                    <div className="rounded-[2.5rem] bg-white/[0.03] border border-white/10 p-10 flex flex-col items-center text-center relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        <div className="relative mb-8">
                                            <div className="h-36 w-36 rounded-full border-[12px] border-white/5 flex items-center justify-center">
                                                <div className="h-28 w-28 rounded-full border border-white flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                                    <span className="text-5xl font-black text-white italic">56</span>
                                                </div>
                                            </div>
                                            <Flame className="absolute -bottom-2 -right-2 h-10 w-10 text-white fill-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                        </div>

                                        <h2 className="text-2xl font-black mb-1 italic uppercase">Day Streak</h2>
                                        <p className="text-white/20 text-[9px] font-black tracking-[0.5em] mb-10 uppercase">Protocol: High Efficiency</p>

                                        <button className="w-full py-5 rounded-none bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:brightness-110 shadow-2xl">
                                            <Linkedin className="h-4 w-4 fill-black" />
                                            Share Evolution
                                        </button>
                                    </div>

                                    {/* Achieved Badges */}
                                    <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3 text-white/40">
                                            <Trophy className="h-4 w-4" />
                                            Accolades
                                        </h3>
                                        <div className="space-y-4">
                                            {badges.map(badge => (
                                                <div key={badge.name} className="flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/2 hover:bg-white/5 transition-all border border-white/5 cursor-pointer group">
                                                    <div className="h-12 w-12 rounded-[1rem] bg-slate-900 flex items-center justify-center border border-white/10 group-hover:border-white/20">
                                                        <badge.icon className={cn("h-6 w-6", badge.color)} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-sm">{badge.name}</h4>
                                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{badge.category}</p>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-300" />
                                                </div>
                                            ))}
                                        </div>
                                        <button className="w-full mt-6 py-3 text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">
                                            View All Achievements
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

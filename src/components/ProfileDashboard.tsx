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
    { name: "Python", level: 85, color: "bg-emerald-400" },
    { name: "React / Next.js", level: 92, color: "bg-blue-400" },
    { name: "Algorithms", level: 78, color: "bg-purple-400" },
    { name: "Communication", level: 88, color: "bg-pink-400" },
];

const badges = [
    { name: "7 Day Burner", category: "Consistency", icon: Flame, color: "text-orange-400" },
    { name: "30 Day Alchemist", category: "Mastery", icon: Trophy, color: "text-yellow-400" },
    { name: "Code Ninja", category: "Skill", icon: Code, color: "text-emerald-400" },
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
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 cursor-pointer"
                    />

                    {/* Main Dashboard Overlay */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="fixed inset-6 z-[60] glass-dark rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-10 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-6">
                                <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-emerald-400 to-indigo-500 p-0.5 shadow-lg shadow-emerald-500/20">
                                    <div className="h-full w-full rounded-[1.9rem] bg-slate-900 flex items-center justify-center overflow-hidden">
                                        <UserIcon className="h-10 w-10 text-emerald-400" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                                    <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mt-1">Profile Dashboard</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass bg-white/5 border border-white/10">
                                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-sm font-semibold">Active Now</span>
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
                                            <h3 className="text-lg font-bold flex items-center gap-2">
                                                <Code className="h-5 w-5 text-emerald-400" />
                                                Dev Heatmap
                                            </h3>
                                            <span className="text-xs text-slate-500 uppercase tracking-widest">Source: Interstellar Dev Hub</span>
                                        </div>

                                        <div className="flex gap-1 overflow-x-auto pb-4 items-end">
                                            {heatmapData.map((week, wIndex) => (
                                                <div key={wIndex} className="flex flex-col gap-1">
                                                    {week.map((day, dIndex) => (
                                                        <div
                                                            key={`${wIndex}-${dIndex}`}
                                                            className={cn(
                                                                "h-3.5 w-3.5 rounded-sm transition-all hover:scale-125 cursor-help",
                                                                day === 0 ? "bg-white/5" :
                                                                    day === 1 ? "bg-emerald-900/40" :
                                                                        day === 2 ? "bg-emerald-700/60" :
                                                                            day === 3 ? "bg-emerald-500/80" : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-500 font-medium">
                                            <span>Less</span>
                                            <div className="flex gap-1">
                                                <div className="h-2.5 w-2.5 rounded-sm bg-white/5" />
                                                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-900/40" />
                                                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-700/60" />
                                                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500/80" />
                                                <div className="h-2.5 w-2.5 rounded-sm bg-emerald-400" />
                                            </div>
                                            <span>More</span>
                                        </div>
                                    </div>

                                    {/* Grid for Skills and Activity */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Skill Progress */}
                                        <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5">
                                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                                <Zap className="h-5 w-5 text-blue-400" />
                                                Core Skills
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
                                        <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5 flex flex-col justify-center items-center text-center opacity-70">
                                            <Brain className="h-12 w-12 text-purple-400 mb-4 opacity-50" />
                                            <h4 className="font-bold text-slate-400">Next Assessment</h4>
                                            <p className="text-sm text-slate-500 mt-2">Quantitative Aptitude Level 4 <br /> starts in 2 hours.</p>
                                            <button className="mt-6 px-4 py-2 rounded-[1.25rem] glass border-purple-500/20 text-xs font-bold uppercase tracking-tighter hover:bg-white/5">
                                                Set Reminder
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Streak & Badges */}
                                <div className="col-span-12 lg:col-span-4 space-y-8">

                                    {/* Streak Counter */}
                                    <div className="rounded-[2.5rem] bg-emerald-400/10 border border-emerald-400/20 p-8 flex flex-col items-center text-center relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="relative mb-6">
                                            <div className="h-32 w-32 rounded-full border-[10px] border-emerald-500/20 flex items-center justify-center">
                                                <div className="h-24 w-24 rounded-full border-4 border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                                                    <span className="text-4xl font-black text-emerald-400">56</span>
                                                </div>
                                            </div>
                                            <Flame className="absolute -bottom-2 -right-2 h-10 w-10 text-orange-500 fill-orange-500" />
                                        </div>

                                        <h2 className="text-2xl font-black mb-1">Day Streak!</h2>
                                        <p className="text-slate-400 text-sm mb-8">Level Up Status: ELITE</p>

                                        <button className="w-full py-4 rounded-2xl bg-slate-950 text-emerald-400 font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all border border-emerald-400/20 shadow-xl">
                                            <Linkedin className="h-5 w-5 fill-emerald-400 text-emerald-400" />
                                            Share on LinkedIn
                                        </button>
                                    </div>

                                    {/* Achieved Badges */}
                                    <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5">
                                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                            <Trophy className="h-5 w-5 text-yellow-400" />
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

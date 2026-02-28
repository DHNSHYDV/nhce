"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Flame,
    Linkedin,
    Github,
    Trophy,
    Code,
    Brain,
    MessageSquare,
    Zap,
    ChevronRight,
    User as UserIcon,
    Edit3,
    Check,
    Globe,
    ExternalLink,
    School
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
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "Synchronizer",
        college: "New Horizon College Of Engineering",
        linkedin: "https://linkedin.com/in/synchronizer",
        github: "https://github.com/synchronizer",
        codeninja: "https://codeninja.com/synchronizer",
        leetcode: "https://leetcode.com/synchronizer"
    });

    const heatmapData = Array.from({ length: 52 }, () =>
        Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
    );

    const handleInputChange = (field: keyof typeof profile, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-slate-950/40 cursor-pointer"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="fixed inset-4 md:inset-8 lg:inset-12 z-[60] bg-slate-900/60 backdrop-blur-3xl rounded-none overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 md:p-10 flex items-center justify-between border-b border-white/5 bg-white/5">
                            <div className="flex items-center gap-6">
                                <div className="h-20 w-20 rounded-none bg-white/10 p-0.5 shadow-xl">
                                    <div className="h-full w-full rounded-none bg-black flex items-center justify-center overflow-hidden">
                                        <UserIcon className="h-10 w-10 text-white/40" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    {isEditing ? (
                                        <input
                                            value={profile.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="bg-white/5 border border-white/10 text-3xl font-black tracking-tighter uppercase italic text-white outline-none px-2"
                                        />
                                    ) : (
                                        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white">{profile.name}</h1>
                                    )}
                                    <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">AI Skill Twin Architecture</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="h-12 px-6 rounded-none glass bg-white/5 border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-all group"
                                >
                                    {isEditing ? <Check className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                                    <span className="text-[10px] uppercase font-black tracking-widest">{isEditing ? "Save Protocol" : "Edit Identity"}</span>
                                </button>
                                <button
                                    onClick={onClose}
                                    className="h-12 w-12 rounded-none glass flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar bg-black/40">
                            <div className="grid grid-cols-12 gap-8 lg:gap-12">

                                {/* Left Column */}
                                <div className="col-span-12 lg:col-span-8 space-y-10">

                                    {/* Identity Details */}
                                    <div className="glass-dark rounded-none p-8 border border-white/5 space-y-8">
                                        <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                            <div className="flex items-center gap-4">
                                                <School className="h-5 w-5 text-white/40" />
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Educational Node</span>
                                                    {isEditing ? (
                                                        <input
                                                            value={profile.college}
                                                            onChange={(e) => handleInputChange('college', e.target.value)}
                                                            className="bg-white/5 border border-white/10 text-sm font-black text-white italic outline-none px-2 w-full mt-1"
                                                        />
                                                    ) : (
                                                        <span className="text-sm font-black text-white italic uppercase tracking-tight">{profile.college}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {[
                                                { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
                                                { id: 'github', label: 'GitHub', icon: Github },
                                                { id: 'codeninja', label: 'Code Ninja', icon: Zap },
                                                { id: 'leetcode', label: 'LeetCode', icon: Code },
                                            ].map((social) => (
                                                <div key={social.id} className="flex items-center gap-4 group">
                                                    <div className="h-10 w-10 bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all">
                                                        <social.icon className="h-4 w-4 text-white/40 group-hover:text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/20 block">{social.label} Link</span>
                                                        {isEditing ? (
                                                            <input
                                                                value={profile[social.id as keyof typeof profile]}
                                                                onChange={(e) => handleInputChange(social.id as keyof typeof profile, e.target.value)}
                                                                className="bg-white/5 border border-white/10 text-[10px] text-white/60 outline-none px-2 w-full mt-1"
                                                            />
                                                        ) : (
                                                            <a href={profile[social.id as keyof typeof profile]} className="text-[10px] text-white/40 hover:text-white transition-colors flex items-center gap-2 truncate">
                                                                {profile[social.id as keyof typeof profile]}
                                                                <ExternalLink className="h-3 w-3" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dev Heatmap */}
                                    <div className="glass-dark rounded-none p-10 border border-white/5 bg-white/[0.02]">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 text-white/40 italic">
                                                <Code className="h-4 w-4" />
                                                Contribution Architecture
                                            </h3>
                                        </div>

                                        <div className="flex gap-1.5 overflow-x-auto pb-6 items-end scrollbar-hide">
                                            {heatmapData.map((week, wIndex) => (
                                                <div key={wIndex} className="flex flex-col gap-1.5 min-w-[14px]">
                                                    {week.map((day, dIndex) => (
                                                        <div
                                                            key={`${wIndex}-${dIndex}`}
                                                            className={cn(
                                                                "h-3.5 w-3.5 transition-all hover:scale-125 cursor-help",
                                                                day === 0 ? "bg-white/[0.03]" :
                                                                    day === 1 ? "bg-white/15" :
                                                                        day === 2 ? "bg-white/35" :
                                                                            day === 3 ? "bg-white/60" : "bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Grid for Skills and Activity */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {/* Skill Progress */}
                                        <div className="glass-dark rounded-none p-10 border border-white/5">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-3 text-white/40 italic">
                                                <Zap className="h-4 w-4" />
                                                Biometric Skills
                                            </h3>
                                            <div className="space-y-8">
                                                {skills.map(skill => (
                                                    <div key={skill.name} className="space-y-3">
                                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic">
                                                            <span className="text-white/60">{skill.name}</span>
                                                            <span className="text-white/20">{skill.level} XP</span>
                                                        </div>
                                                        <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${skill.level}%` }}
                                                                transition={{ duration: 1.5, ease: "circOut" }}
                                                                className={cn("h-full shadow-[0_0_10px_rgba(255,255,255,0.2)]", skill.color)}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Next Milestone */}
                                        <div className="glass-dark rounded-none p-10 border border-white/5 flex flex-col justify-center items-center text-center group bg-white/5 hover:bg-white/[0.08] transition-all cursor-pointer">
                                            <div className="relative mb-8">
                                                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <Brain className="h-12 w-12 text-white/40 relative z-10" />
                                            </div>
                                            <h4 className="font-black text-[10px] text-white/40 uppercase tracking-[0.3em] mb-4">Neural Milestone</h4>
                                            <p className="text-[10px] text-white/20 uppercase tracking-widest leading-loose max-w-[200px]">
                                                Quantitative Aptitude <br />
                                                <span className="text-white/60">Level 4 Protocol</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="col-span-12 lg:col-span-4 space-y-10">

                                    {/* Streak Counter */}
                                    <div className="rounded-none bg-white/5 border border-white/10 p-12 flex flex-col items-center text-center relative overflow-hidden group hover:border-white/30 transition-all">
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                        <div className="relative mb-10">
                                            <div className="h-44 w-44 rounded-full border-[12px] border-white/5 flex items-center justify-center">
                                                <div className="h-34 w-34 rounded-full border border-white/40 flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.1)] group-hover:border-white group-hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] transition-all duration-700">
                                                    <span className="text-6xl font-black text-white italic transition-transform group-hover:scale-110">56</span>
                                                </div>
                                            </div>
                                            <Flame className="absolute -bottom-2 -right-2 h-12 w-12 text-white fill-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
                                        </div>

                                        <h2 className="text-2xl font-black mb-2 italic uppercase tracking-tighter text-white">Day Streak</h2>
                                        <p className="text-white/20 text-[10px] font-black tracking-[0.5em] mb-12 uppercase">Synchronization: Active</p>

                                        <button className="w-full py-6 rounded-none bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-2xl active:scale-95">
                                            <Check className="h-4 w-4" />
                                            Synchronize
                                        </button>
                                    </div>

                                    {/* Badges */}
                                    <div className="glass-dark rounded-none p-10 border border-white/5 bg-black/40">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-3 text-white/40 italic">
                                            <Trophy className="h-4 w-4" />
                                            Achieved Accolades
                                        </h3>
                                        <div className="space-y-6">
                                            {badges.map(badge => (
                                                <div key={badge.name} className="flex items-center gap-5 p-5 bg-white/2 hover:bg-white/5 transition-all border border-white/5 cursor-pointer group rounded-none">
                                                    <div className="h-14 w-14 rounded-none bg-slate-900/80 flex items-center justify-center border border-white/10 group-hover:border-white/40 transition-all">
                                                        <badge.icon className={cn("h-7 w-7", badge.color)} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-black text-[11px] uppercase tracking-widest text-white italic">{badge.name}</h4>
                                                        <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] mt-1">{badge.category}</p>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-white/10 group-hover:text-white transition-colors" />
                                                </div>
                                            ))}
                                        </div>
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

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Code, PenTool, Layout, TerminalSquare } from "lucide-react";

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
    const teamMembers = [
        {
            name: "Hemanth Reddy",
            role: "Founder, Front-End Developer & Creative Designer",
            description: "Passionate about building modern, high-performance digital experiences with clean UI and impactful design.",
            icon: <PenTool className="h-6 w-6 text-emerald-400" />
        },
        {
            name: "Dhanush Yadav",
            role: "Co-Founder, Full-Stack Developer & Tech Expert",
            description: "Specializes in scalable architectures, backend systems, and transforming complex ideas into powerful tech solutions.",
            icon: <Code className="h-6 w-6 text-blue-400" />
        },
        {
            name: "Samyuktha",
            role: "Vision & Strategy Lead, UI/UX Enhancer",
            description: "Focused on user-centered design, product planning, and creating seamless digital journeys.",
            icon: <Layout className="h-6 w-6 text-purple-400" />
        },
        {
            name: "Saanvi",
            role: "Code Modularization & Development Specialist",
            description: "Ensures clean, maintainable code structure while continuously improving and updating product performance.",
            icon: <TerminalSquare className="h-6 w-6 text-amber-400" />
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 p-4 max-h-screen overflow-y-auto custom-scrollbar"
                    >
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-1 shadow-2xl backdrop-blur-2xl">
                            {/* Decorative Background Glows */}
                            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />
                            <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />

                            <div className="relative h-full rounded-[2.3rem] border border-white/5 bg-slate-950/40 p-8 md:p-10">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute right-6 top-6 rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all z-10"
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                {/* Header */}
                                <div className="mb-10 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                        <Users className="h-8 w-8 text-emerald-400" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
                                        About Us
                                    </h2>
                                    <p className="text-sm font-medium text-slate-400">
                                        The visionaries driving Decide Solutions forward.
                                    </p>
                                </div>

                                {/* Team Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {teamMembers.map((member, i) => (
                                        <div key={i} className="rounded-2xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition-colors group">
                                            <div className="flex items-start gap-4 mb-3">
                                                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 group-hover:border-white/10 transition-all">
                                                    {member.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-white">{member.name}</h3>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/80 mt-1">{member.role}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                                {member.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

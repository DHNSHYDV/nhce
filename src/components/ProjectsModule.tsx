"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, ExternalLink, Github, Sparkles, Folder } from "lucide-react";

const mockProjects = [
    {
        title: "AI Resume Scanner",
        desc: "Deep learning model to match resumes with role-specific biometric patterns.",
        tags: ["Next.js", "Gemini", "Prisma"],
        github: "#",
        demo: "#"
    },
    {
        title: "Blockchain Ledger",
        desc: "Decentralized consensus protocol for high-frequency skill synchronization.",
        tags: ["Solidity", "Rust", "React"],
        github: "#",
        demo: "#"
    },
    {
        title: "Neural Interviewer",
        desc: "3D virtual agent capable of analyzing stress levels in real-time.",
        tags: ["Spline", "Three.js", "GPT-4"],
        github: "#",
        demo: "#"
    },
    {
        title: "Quantum Compiler",
        desc: "Low-latency execution engine for non-deterministic code clusters.",
        tags: ["C++", "Python", "LLVM"],
        github: "#",
        demo: "#"
    }
];

export const ProjectsModule = () => {
    return (
        <div className="w-full max-w-6xl mx-auto py-12 px-6">
            <div className="flex justify-between items-end mb-16">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Folder className="h-4 w-4 text-white/40" />
                        <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Project Repository</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Portfolio <span className="text-white/40">Vault</span>
                    </h2>
                </div>
                <div className="hidden md:block">
                    <p className="text-white/30 text-[9px] uppercase tracking-[0.4em] max-w-[200px] text-right">
                        A curated archive of high-impact technical executions.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockProjects.map((project, idx) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-dark border border-white/5 p-10 hover:border-white/40 transition-all group group relative flex flex-col h-full bg-white/[0.01]"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="h-12 w-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <Code className="h-6 w-6" />
                            </div>
                            <div className="flex gap-4">
                                <a href={project.github} className="text-white/20 hover:text-white transition-colors">
                                    <Github className="h-4 w-4" />
                                </a>
                                <a href={project.demo} className="text-white/20 hover:text-white transition-colors">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-4 group-hover:translate-x-2 transition-transform">
                            {project.title}
                        </h3>
                        <p className="text-[11px] text-white/40 uppercase font-black tracking-widest leading-relaxed mb-8 flex-1">
                            {project.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 px-3 py-1 bg-white/5 border border-white/10">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Decoration */}
                        <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 flex justify-center">
                <button className="px-12 py-5 bg-white/5 border border-white/10 text-white/40 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all group flex items-center gap-4">
                    <span>View Full Log</span>
                    <Sparkles className="h-3 w-3 group-hover:animate-pulse" />
                </button>
            </div>
        </div>
    );
};

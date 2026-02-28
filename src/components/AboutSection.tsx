"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Code, Sparkles, Brain, Shield, Zap, Globe, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const contributors = [
    {
        name: "Dhanush Yadav G N",
        role: "Lead Architect / Visionary",
        description: "Architecting the future of AI-driven career intelligence.",
        icon: Cpu,
        color: "text-white"
    },
    {
        name: "Samyuktha",
        role: "Technical Strategist",
        description: "Defining technical roadmaps and strategic integration protocols.",
        icon: Zap,
        color: "text-white/60"
    },
    {
        name: "Saanvi",
        role: "UI/UX Intelligence",
        description: "Crafting high-fidelity, cognitive-first user experiences.",
        icon: Sparkles,
        color: "text-white/40"
    },
    {
        name: "Hemanth Kumar Reddy",
        role: "Backend & Systems Engineer",
        description: "Engineering robust, scalable infrastructure for global deployments.",
        icon: Shield,
        color: "text-white/20"
    }
];

export const AboutSection = () => {
    return (
        <div id="about" className="w-full max-w-7xl mx-auto py-24 px-6 space-y-32">
            {/* Mission Statement */}
            <div className="flex flex-col items-center text-center space-y-12">
                <div className="flex items-center gap-4 opacity-40">
                    <div className="h-px w-12 bg-white" />
                    <span className="text-[12px] font-black tracking-[0.6em] text-white uppercase font-display">Our Purpose</span>
                    <div className="h-px w-12 bg-white" />
                </div>

                <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none font-display max-w-5xl">
                    Beyond Code. <span className="text-white/40">Beyond Education.</span>
                </h2>

                <p className="text-white/40 text-lg md:text-2xl font-medium max-w-4xl tracking-tight leading-relaxed">
                    Decide To Code is a state-of-the-art career ecosystem designed to transform technical potential into industry mastery.
                    Through AI-driven simulations, cognitive auditing, and regional language integration, we are building the foundation for the next billion engineers.
                </p>
            </div>

            {/* Contributors Grid */}
            <div className="space-y-16">
                <div className="flex items-center gap-4 opacity-20">
                    <div className="h-px w-12 bg-white" />
                    <span className="text-[11px] font-black tracking-[0.5em] text-white uppercase italic font-display">Core Contributors</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {contributors.map((person, idx) => (
                        <motion.div
                            key={person.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-dark p-10 border border-white/5 group hover:border-white/40 transition-all text-left relative overflow-hidden flex flex-col h-full"
                        >
                            <div className="h-14 w-14 bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                                <person.icon className="h-6 w-6" />
                            </div>

                            <div className="space-y-4 flex-1">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white font-display">
                                    {person.name}
                                </h3>
                                <div className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase italic">
                                    {person.role}
                                </div>
                                <p className="text-[12px] text-white/20 font-black tracking-widest leading-relaxed uppercase">
                                    {person.description}
                                </p>
                            </div>

                            {/* Decorative background element */}
                            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <person.icon className="h-24 w-24" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bharat Initiative Branding */}
            <div className="mt-20 flex flex-col items-center gap-6">
                <div className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 border border-white/10 rounded-full">
                    <Globe className="h-4 w-4 text-white animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 italic font-display">
                        Decide To Code: Global Initiative
                    </span>
                </div>
            </div>
        </div>
    );
};

"use client";

import { Box, Lock, Search, Settings, Sparkles, Code, Brain, MessageSquare, PieChart } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GridItemProps {
    area: string;
    title: string;
    description: React.ReactNode;
    color: string;
    onClick?: () => void;
}

const GridItem = ({ area, title, description, color, onClick }: GridItemProps) => {
    return (
        <li className={cn("min-h-[14rem] list-none", area)}>
            <button
                onClick={onClick}
                className="relative w-full h-full rounded-[2rem] border-[0.75px] border-white/10 p-2 md:p-3 bg-slate-900/50 backdrop-blur-md group hover:border-white/20 transition-all duration-500 cursor-pointer active:scale-[0.98] text-left appearance-none"
            >
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[1.5rem] border-[0.75px] border-white/5 bg-slate-950/50 p-6 shadow-2xl md:p-8">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className={cn("hidden h-0 w-0", color)}>
                        </div>
                        <div className="space-y-4">
                            <h3 className="pt-0.5 text-2xl leading-none font-black font-sans tracking-tight text-foreground transition-colors duration-500">
                                {title}
                            </h3>
                            <p className="font-sans text-sm leading-relaxed text-slate-400 font-medium transition-colors duration-500">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span>Access Module</span>
                        <div className="h-1 w-1 rounded-full bg-white/40" />
                    </div>
                </div>
            </button>
        </li>
    );
};

export function GlowingModules({ onSelect }: { onSelect?: (title: string) => void }) {
    return (
        <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-2 lg:gap-8 w-full max-w-6xl mx-auto py-12 px-4"
        >
            <GridItem
                area="md:[grid-area:1/1/2/7] lg:[grid-area:1/1/2/7]"
                title="Code"
                description="Master Data Structures and Algorithms with real-time AI-driven feedback and interactive sprints."
                color="text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                onClick={() => onSelect?.("Code")}
            />
            <GridItem
                area="md:[grid-area:1/7/2/13] lg:[grid-area:1/7/2/13]"
                title="Aptitude"
                description="Sharpen your logical reasoning and quantitative skills through adaptive, high-intensity challenges."
                color="text-white/80 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                onClick={() => onSelect?.("Aptitude")}
            />
            <GridItem
                area="md:[grid-area:2/1/3/7] lg:[grid-area:2/1/3/7]"
                title="Communication Skill"
                description="Refine your pitch with AI mock interviews, pronunciation analysis, and stress behavior tracking."
                color="text-white/60 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                onClick={() => onSelect?.("Communication Skill")}
            />
            <GridItem
                area="md:[grid-area:2/7/3/13] lg:[grid-area:2/7/3/13]"
                title="Performance Tracker"
                description="Monitor your AI Skill Twin evolution with deep analytics on topic mastery and cognitive growth."
                color="text-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                onClick={() => onSelect?.("Performance Tracker")}
            />
        </motion.ul>
    );
}

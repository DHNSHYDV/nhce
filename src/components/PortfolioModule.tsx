"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Layers, Box, Code2, Zap, LayoutDashboard, Fingerprint, Rocket, Globe, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_PORTFOLIO = [
    {
        title: "3D Interactive Website Demo",
        icon: <Box className="w-5 h-5 text-purple-400" />,
        features: ["Liquid glass UI", "Scroll-based animation", "4K studio lighting effects"],
        tags: ["HTML", "CSS", "JS"],
        buttonText: "View Demo",
        bgAccent: "bg-purple-500/10",
        borderAccent: "group-hover:border-purple-500/50"
    },
    {
        title: "Digital Marketing Campaign Demo",
        icon: <LayoutDashboard className="w-5 h-5 text-blue-400" />,
        features: ["Lead generation funnel", "Branding strategy", "Performance analytics dashboard"],
        tags: ["JS", "Python", "AWS"],
        buttonText: "View Demo",
        bgAccent: "bg-blue-500/10",
        borderAccent: "group-hover:border-blue-500/50"
    },
    {
        title: "AI System UI Demo",
        icon: <Fingerprint className="w-5 h-5 text-emerald-400" />,
        features: ["Smart dashboard concept", "Neural network visualizer", "Automation interface"],
        tags: ["HTML", "CSS", "JS", "Python"],
        buttonText: "View Demo",
        bgAccent: "bg-emerald-500/10",
        borderAccent: "group-hover:border-emerald-500/50"
    }
];

const LIVE_PROJECTS = [
    {
        title: "AI Autonomous Food Delivery Drone",
        icon: <Rocket className="w-5 h-5 text-amber-400" />,
        features: ["7kg payload", "25–30km range", "LiDAR + 360° camera", "Temperature-controlled chamber"],
        tags: ["Python", "AWS"],
        buttonText: "View Case Study",
        bgAccent: "bg-amber-500/10",
        borderAccent: "group-hover:border-amber-500/50"
    },
    {
        title: "Payment Platform Concept",
        icon: <CreditCard className="w-5 h-5 text-rose-400" />,
        features: ["UPI-ready architecture", "Secure transaction system", "Scalable backend design"],
        tags: ["JS", "Python", "AWS"],
        buttonText: "View Architecture",
        bgAccent: "bg-rose-500/10",
        borderAccent: "group-hover:border-rose-500/50"
    },
    {
        title: "Custom 3D Agency Website",
        icon: <Globe className="w-5 h-5 text-cyan-400" />,
        features: ["Interactive scroll storytelling", "Premium animations", "Glass UI effects"],
        tags: ["HTML", "CSS", "JS"],
        buttonText: "View Project",
        bgAccent: "bg-cyan-500/10",
        borderAccent: "group-hover:border-cyan-500/50"
    }
];

const TiltCard = ({ children, borderAccent }: { children: React.ReactNode, borderAccent: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
            className={cn(
                "group relative p-6 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl",
                borderAccent
            )}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
            {/* Subtle glow effect behind card on hover */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

export default function PortfolioModule() {
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center min-h-[700px]">
            {/* Module Header Header is handled in page.tsx layout mapping */}

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                {/* LEFT COLUMN - DEMO PORTFOLIO */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2 px-2">
                        <Layers className="text-slate-400 w-6 h-6" />
                        <h3 className="text-2xl font-black text-white tracking-tight">Demo Portfolio</h3>
                    </div>

                    {DEMO_PORTFOLIO.map((item, i) => (
                        <TiltCard key={i} borderAccent={item.borderAccent}>
                            <div className="flex items-start gap-4 mb-4">
                                <div className={cn("p-3 rounded-2xl flex-shrink-0 border border-white/5", item.bgAccent)}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1 leading-tight">{item.title}</h4>
                                    <ul className="space-y-1.5 mt-3">
                                        {item.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-slate-300 bg-white/5 rounded-lg border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-emerald-400 transition-colors group/btn">
                                    {item.buttonText}
                                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </TiltCard>
                    ))}
                </div>

                {/* RIGHT COLUMN - LIVE PROJECTS */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 mb-2 px-2 lg:mt-0 mt-8">
                        <Zap className="text-slate-400 w-6 h-6" />
                        <h3 className="text-2xl font-black text-white tracking-tight">Live Projects</h3>
                    </div>

                    {LIVE_PROJECTS.map((item, i) => (
                        <TiltCard key={i} borderAccent={item.borderAccent}>
                            <div className="flex items-start gap-4 mb-4">
                                <div className={cn("p-3 rounded-2xl flex-shrink-0 border border-white/5", item.bgAccent)}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-1 leading-tight">{item.title}</h4>
                                    <ul className="space-y-1.5 mt-3">
                                        {item.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-slate-300 bg-white/5 rounded-lg border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-emerald-400 transition-colors group/btn">
                                    {item.buttonText}
                                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </TiltCard>
                    ))}
                </div>

            </div>
        </div>
    );
}

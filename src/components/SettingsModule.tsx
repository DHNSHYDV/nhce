"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, Eye, Palette, Volume2, Globe, Database, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const SettingsModule = () => {
    const [toggles, setToggles] = useState({
        notifications: true,
        privacy: false,
        sound: true,
        visibility: true,
        analytics: true
    });

    const toggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const sections = [
        {
            title: "Interface Control",
            icon: Palette,
            items: [
                { id: "visibility", label: "Public Profile Sync", desc: "Allow other users to view your skill architecture.", icon: Eye },
                { id: "sound", label: "Auditory Feedback", desc: "Enable audio cues during interview simulations.", icon: Volume2 }
            ]
        },
        {
            title: "Data & Alerts",
            icon: Database,
            items: [
                { id: "notifications", label: "Eligibility Alerts", desc: "Receive real-time notifications for company eligibility.", icon: Bell },
                { id: "analytics", label: "Advanced Metrics", desc: "Store detailed biometric data for deeper AI insights.", icon: Shield }
            ]
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-6">
            <div className="text-center mb-16 space-y-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Settings className="h-4 w-4 text-white/40" />
                    <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">System Parameters</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                    Configure <span className="text-white/40">Core</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section, idx) => (
                    <div key={section.title} className="space-y-6">
                        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 w-fit">
                            <section.icon className="h-3 w-3 text-white/40" />
                            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">{section.title}</h3>
                        </div>

                        <div className="space-y-4">
                            {section.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => toggle(item.id as keyof typeof toggles)}
                                    className="w-full glass-dark p-6 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group bg-white/[0.01]"
                                >
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="h-10 w-10 bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white transition-colors">
                                            <item.icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-[11px] font-black uppercase tracking-widest text-white group-hover:italic transition-all italic">{item.label}</h4>
                                            <p className="text-[9px] text-white/20 uppercase tracking-tight mt-1">{item.desc}</p>
                                        </div>
                                    </div>

                                    <div className={cn(
                                        "h-6 w-11 rounded-none border transition-all p-1 flex items-center",
                                        toggles[item.id as keyof typeof toggles] ? "bg-white border-white justify-end" : "bg-transparent border-white/20 justify-start"
                                    )}>
                                        <div className={cn(
                                            "h-4 w-4",
                                            toggles[item.id as keyof typeof toggles] ? "bg-black" : "bg-white/20"
                                        )} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 flex flex-col items-center gap-8">
                <div className="h-px w-full bg-white/5" />
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 hover:text-white transition-colors group">
                    <Database className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Reset to Factory Defaults
                </button>
            </div>
        </div>
    );
};

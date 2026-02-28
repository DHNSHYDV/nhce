"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Menu, X, Code, PieChart, User, Settings, Trophy, Shield, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: Trophy, label: "Leaderboard", color: "text-white/40" },
    { icon: User, label: "Profile", color: "text-white/40" },
    { icon: Code, label: "Projects", color: "text-white/40" },
    { icon: PieChart, label: "Portfolio", color: "text-white/40" },
    { icon: Shield, label: "Leadership", color: "text-white/40" },
    { icon: Zap, label: "Career Path", color: "text-white/40" },
    { icon: Code, label: "Business", color: "text-white/40" },
    { icon: Sparkles, label: "Bharat Mode", color: "text-white/40" },
    { icon: Settings, label: "Settings", color: "text-white/40" },
];

interface SidebarProps {
    onProfileClick: () => void;
}

export const Sidebar = ({ onProfileClick }: SidebarProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (label: string) => {
        if (label === "Profile") {
            onProfileClick();
        }
        if (label === "Leaderboard") {
            router.push('/?view=leaderboard', { scroll: false });
        }
        if (label === "Projects") {
            router.push('/?view=projects', { scroll: false });
        }
        if (label === "Portfolio") {
            router.push('/?view=portfolio', { scroll: false });
        }
        if (label === "Settings") {
            router.push('/?view=settings', { scroll: false });
        }
        if (label === "Leadership") {
            router.push('/?view=leadership', { scroll: false });
        }
        if (label === "Career Path") {
            router.push('/?view=career', { scroll: false });
        }
        if (label === "Business") {
            router.push('/?view=freelance', { scroll: false });
        }
        if (label === "Bharat Mode") {
            router.push('/?view=vernacular', { scroll: false });
        }
        setIsOpen(false);
    };

    return (
        <div className="fixed left-6 top-6 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-none liquid-glass sheen-effect border border-white/10 hover:bg-white/5 transition-all duration-300"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X className="h-5 w-5 text-white/60" /> : <Menu className="h-5 w-5 text-white/60" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute left-0 top-16 flex flex-col gap-3 perspective-1000"
                    >
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, rotateX: -90, y: -20, scale: 0.8 }}
                                animate={{
                                    opacity: 1,
                                    rotateX: 0,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 12
                                    }
                                }}
                                exit={{
                                    opacity: 0,
                                    rotateX: -90,
                                    y: -20,
                                    scale: 0.8,
                                    transition: { delay: (menuItems.length - index) * 0.05 }
                                }}
                                className="group relative"
                                onClick={() => handleItemClick(item.label)}
                            >
                                <div className="flex h-12 items-center gap-4 rounded-none liquid-glass sheen-effect px-5 py-2 w-64 transition-all cursor-pointer border border-white/5 group-hover:border-white/40 group-hover:translate-x-3">
                                    <item.icon className={cn("h-4 w-4 transition-colors group-hover:text-white", item.color)} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
                                        {item.label}
                                    </span>

                                    {/* Hover Accent */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

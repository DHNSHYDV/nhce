"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code, PieChart, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: User, label: "Profile", color: "text-emerald-400" },
    { icon: Code, label: "Projects", color: "text-blue-400" },
    { icon: PieChart, label: "Portfolio", color: "text-purple-400" },
    { icon: Settings, label: "Settings", color: "text-slate-400" },
];

interface SidebarProps {
    onProfileClick: () => void;
}
import { useRouter } from "next/navigation";

export const Sidebar = ({ onProfileClick }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleItemClick = (label: string) => {
        if (label === "Profile") {
            onProfileClick();
        } else if (label === "Projects" || label === "Portfolio") {
            router.push("/?module=Portfolio", { scroll: false });
        }
    };

    return (
        <div className="fixed left-6 top-6 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 hover:bg-white/5 transition-all duration-300"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                                <div className="flex h-12 items-center gap-4 rounded-2xl glass-dark px-4 py-2 w-56 hover:bg-white/5 transition-all cursor-pointer border border-white/5 group-hover:border-white/20 group-hover:translate-x-2">
                                    <item.icon className={cn("h-5 w-5", item.color)} />
                                    <span className="text-sm font-medium text-slate-200">{item.label}</span>

                                    {/* Hover Accent */}
                                    <div className={cn(
                                        "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all scale-y-0 group-hover:scale-y-100 opacity-0 group-hover:opacity-100",
                                        item.color.replace("text-", "bg-")
                                    )} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

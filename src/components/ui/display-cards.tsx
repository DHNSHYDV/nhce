"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    date?: string;
    iconClassName?: string;
    titleClassName?: string;
}

function DisplayCard({
    className,
    icon = <Sparkles className="size-4 text-blue-300" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    iconClassName = "text-emerald-400",
    titleClassName = "text-emerald-400",
}: DisplayCardProps) {
    return (
        <div
            className={cn(
                "relative flex h-56 w-[28rem] select-none flex-col justify-between rounded-[2.5rem] border border-white/10 bg-slate-900/60 backdrop-blur-2xl px-8 py-7 transition-all duration-500 after:absolute after:-right-4 after:top-[-10%] after:h-[120%] after:w-[24rem] after:bg-gradient-to-l after:from-slate-950/90 after:to-transparent after:content-[''] hover:border-emerald-500/40 group overflow-hidden shadow-2xl",
                className
            )}
        >
            <div className="flex items-center gap-4 relative z-10">
                <div className={cn("relative inline-block rounded-2xl bg-emerald-500/10 p-3 border border-emerald-500/20 shadow-inner", iconClassName)}>
                    {icon}
                    <div className="absolute inset-0 bg-emerald-400/10 blur-xl rounded-full" />
                </div>
                <p className={cn("text-2xl font-black tracking-tight", titleClassName)}>{title}</p>
            </div>

            <p className="text-xl font-semibold text-slate-100 mt-4 leading-snug relative z-10">{description}</p>

            <div className="flex justify-between items-end mt-6 relative z-10">
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Last Accessed</p>
                    <p className="text-xs font-bold text-slate-400">{date}</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)] animate-ping" />
            </div>

            {/* Decorative glass reflection */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent skew-y-[-15deg] -translate-y-1/2" />
        </div>
    );
}

interface DisplayCardsProps {
    cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards = [] }: DisplayCardsProps) {
    const [activeCard, setActiveCard] = useState(0);

    return (
        <div className="relative h-[450px] w-full flex items-center justify-center perspective-1000">
            <div className="relative w-full max-w-2xl flex justify-center items-center">
                {cards.map((cardProps, index) => {
                    const isActive = index === activeCard;
                    const offset = index - activeCard;

                    return (
                        <motion.div
                            key={index}
                            onClick={() => setActiveCard(index)}
                            initial={false}
                            animate={{
                                scale: isActive ? 1 : 0.9 - Math.abs(offset) * 0.05,
                                x: offset * 60,
                                y: offset * 20,
                                rotateY: offset * -5,
                                rotateX: offset * 2,
                                rotateZ: offset * -2,
                                zIndex: isActive ? 50 : 40 - Math.abs(offset),
                                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
                                filter: isActive ? "blur(0px)" : `blur(${Math.abs(offset) * 2}px)`,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            className="absolute cursor-pointer transition-shadow hover:shadow-emerald-500/10"
                        >
                            <DisplayCard
                                {...cardProps}
                                className={cn(
                                    cardProps.className,
                                    !isActive && "pointer-events-auto grayscale-[20%] opacity-80"
                                )}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

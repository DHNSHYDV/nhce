"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, CheckCircle, AlertCircle, Info, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
    id: string;
    title: string;
    description: string;
    type: "success" | "info" | "warning";
    timestamp: string;
    read: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: "1",
        title: "Microsoft Eligibility",
        description: "Your recent Python skill scan makes you eligible for the SDE-1 role at Microsoft. Apply now!",
        type: "success",
        timestamp: "2h ago",
        read: false
    },
    {
        id: "2",
        title: "Google Cloud Challenge",
        description: "Congratulations! You've been shortlisted for the Google Cloud Developer program based on your logic scores.",
        type: "success",
        timestamp: "5h ago",
        read: false
    },
    {
        id: "3",
        title: "System Update",
        description: "New Interview Scenario 'AI Safety' is now available in the simulator.",
        type: "info",
        timestamp: "1d ago",
        read: true
    }
];

interface NotificationSystemProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NotificationSystem = ({ isOpen, onClose }: NotificationSystemProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm cursor-pointer"
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-6 top-24 bottom-6 w-96 z-[70] bg-slate-950/80 backdrop-blur-3xl border border-white/10 p-8 flex flex-col shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]"
                    >
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 border border-white/10">
                                    <Bell className="h-4 w-4 text-white/40" />
                                </div>
                                <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Alerts</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="h-10 w-10 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                            >
                                <X className="h-5 w-5 text-white/40" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
                            {mockNotifications.map((notification) => (
                                <motion.div
                                    key={notification.id}
                                    whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                                    className={cn(
                                        "p-5 border border-white/5 transition-all relative group overflow-hidden bg-white/[0.01]",
                                        !notification.read && "border-l-white border-l-2"
                                    )}
                                >
                                    {notification.type === "success" && (
                                        <div className="absolute top-0 right-0 p-1">
                                            <Sparkles className="h-3 w-3 text-white/20" />
                                        </div>
                                    )}
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "mt-1 p-1.5 rounded-none border",
                                            notification.type === "success" ? "border-white/20 bg-white/5 text-white/60" : "border-white/5 text-white/20"
                                        )}>
                                            {notification.type === "success" ? <CheckCircle className="h-3.5 w-3.5" /> : <Info className="h-3.5 w-3.5" />}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic group-hover:text-white transition-colors">
                                                <span>{notification.title}</span>
                                                <span className="text-[8px] text-white/10 font-medium normal-case">{notification.timestamp}</span>
                                            </div>
                                            <p className="text-[10px] text-white/40 leading-relaxed uppercase font-medium">
                                                {notification.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5">
                            <button className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:scale-[1.02] transition-all active:scale-95 shadow-2xl">
                                Mark All Read
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

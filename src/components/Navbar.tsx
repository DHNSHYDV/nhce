"use client";

import React from "react";

import { Search, Bell, Sparkles, User as UserIcon, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AuthModal } from "./AuthModal";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
    const { data: session, status } = useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await signOut({ redirect: false });
    };

    return (
        <nav className="fixed top-6 left-24 right-6 z-40 flex items-center justify-between gap-4">
            {/* Island 1: Branding */}
            <Link href="/" className="contents">
                <motion.div
                    initial={{ opacity: 0, y: -20, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    className="glass h-14 flex items-center px-8 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl group cursor-pointer hover:border-emerald-500/30 transition-all duration-500"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Sparkles className="h-6 w-6 text-emerald-400 fill-emerald-400 animate-pulse" />
                            <div className="absolute inset-0 blur-sm bg-emerald-400/20 scale-150 rounded-full" />
                        </div>
                        <span className="text-sm font-black tracking-[0.2em] text-foreground group-hover:text-emerald-400 transition-colors">DECIDE TO CODE</span>
                    </div>
                </motion.div>
            </Link>

            {/* Island 2: Main Navigation */}
            <motion.div
                initial={{ opacity: 0, y: -20, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.1 }}
                className="glass h-14 flex items-center px-10 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
            >
                <div className="flex items-center gap-10 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                    <Link href="/" className="hover:text-emerald-400 transition-all hover:scale-110 active:scale-95">Home</Link>
                    <div className="h-1 w-1 rounded-full bg-white/10" />
                    <a href="#" className="hover:text-emerald-400 transition-all hover:scale-110 active:scale-95">About</a>
                </div>
            </motion.div>

            {/* Island 3: Utilities */}
            <motion.div
                initial={{ opacity: 0, y: -20, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.2 }}
                className="glass h-14 flex items-center px-4 md:px-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
            >
                <div className="flex items-center gap-2">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            >
                                <UserIcon className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[100px]">
                                    {user.name || user.email?.split('@')[0]}
                                </span>
                            </motion.div>
                            <button
                                onClick={handleSignOut}
                                className="p-3 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all active:scale-95"
                                title="Sign Out"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <motion.button
                            onClick={() => setIsAuthModalOpen(true)}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80 hover:text-emerald-500 transition-colors border border-black/5 dark:border-white/5 rounded-xl bg-black/5 dark:bg-white/5"
                        >
                            Log In / Sign Up
                        </motion.button>
                    )}

                    <div className="w-px h-6 bg-foreground/10 mx-1" />

                    <button className="p-3 text-slate-400 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all active:scale-90">
                        <Search className="h-4 w-4" />
                    </button>
                    <div className="w-px h-6 bg-foreground/10 mx-1" />
                    <button className="p-3 text-slate-400 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all active:scale-90 relative">
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-emerald-500 border-2 border-background animate-bounce" />
                    </button>
                </div>
            </motion.div>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </nav>
    );
};

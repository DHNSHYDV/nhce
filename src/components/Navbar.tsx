"use client";

import React from "react";

import { Search, Bell, Sparkles, User as UserIcon, LogOut, Zap, Home, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AuthModal } from "./AuthModal";
import { useSession, signOut } from "next-auth/react";
import { LimelightNav } from "./ui/limelight-nav";

export const Navbar = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
    const { data: session, status } = useSession();
    const user = session?.user;

    const [activeIndex, setActiveIndex] = React.useState(0);

    const handleSignOut = async () => {
        await signOut({ redirect: false });
    };

    React.useEffect(() => {
        const handleScroll = () => {
            const aboutRef = document.getElementById('about-container');
            if (aboutRef) {
                const rect = aboutRef.getBoundingClientRect();
                if (rect.top < window.innerHeight / 2) {
                    setActiveIndex(1);
                } else {
                    setActiveIndex(0);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-6 left-24 right-6 z-40 flex items-center justify-between gap-4">
            {/* Island 1: Branding */}
            <Link href="/" className="contents">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="liquid-glass sheen-effect h-14 flex items-center px-8 rounded-none group cursor-pointer hover:border-white/40 transition-all duration-500"
                >
                    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => (window.location.href = "/")}>
                        <div className="h-10 w-10 flex items-center justify-center liquid-glass group-hover:border-white/40 transition-all">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl md:text-2xl font-black italic tracking-tighter text-white uppercase font-display leading-none">
                                Decide To Code
                            </h1>
                            <span className="text-[8px] font-black tracking-[0.4em] text-white/20 uppercase italic mt-1 group-hover:text-white/40 transition-colors">
                                Career Ecosystem
                            </span>
                        </div>
                    </div>
                </motion.div>
            </Link>

            {/* Island 2: Main Navigation */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="hidden md:flex"
            >
                <LimelightNav
                    activeIndex={activeIndex}
                    onTabChange={setActiveIndex}
                    items={[
                        {
                            id: 'home',
                            icon: <Home />,
                            label: 'Home',
                            onClick: () => {
                                if (window.location.pathname !== "/" || window.location.search !== "") {
                                    window.location.href = "/";
                                } else {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }
                        },
                        {
                            id: 'about',
                            icon: <Users />,
                            label: 'About',
                            onClick: () => {
                                if (window.location.pathname !== "/" || window.location.search !== "") {
                                    window.location.href = "/#about-container";
                                } else {
                                    document.getElementById('about-container')?.scrollIntoView({ behavior: 'smooth' });
                                }
                            }
                        },
                    ]}
                />
            </motion.div>

            {/* Island 3: Utilities */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="liquid-glass sheen-effect h-14 flex items-center px-4 md:px-6 rounded-none"
            >
                <div className="flex items-center gap-2">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-none bg-white/5 border border-white/10 text-white/40"
                            >
                                <UserIcon className="h-3 w-3" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] truncate max-w-[100px]">
                                    {user.name || user.email?.split('@')[0]}
                                </span>
                            </motion.div>
                            <button
                                onClick={handleSignOut}
                                className="p-3 text-white/20 hover:text-white hover:bg-white/5 rounded-none transition-all active:scale-95"
                                title="Sign Out"
                            >
                                <LogOut className="h-3 w-3" />
                            </button>
                        </div>
                    ) : (
                        <motion.button
                            onClick={() => setIsAuthModalOpen(true)}
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all border border-white/10 rounded-none bg-white/5"
                        >
                            Login / SignUp
                        </motion.button>
                    )}

                    <div className="w-px h-6 bg-white/5 mx-1" />

                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-notifications'))}
                        className="p-3 text-white/20 hover:text-white hover:bg-white/5 rounded-none transition-all active:scale-90 relative"
                    >
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </button>
                </div>
            </motion.div>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </nav>
    );
};

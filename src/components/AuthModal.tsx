"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Sparkles, ArrowRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === "login") {
                const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (result?.error) throw new Error(result.error);
            } else {
                const signupUrl = `${window.location.origin}/api/auth/signup`;

                const res = await fetch(signupUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Signup failed");

                await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });
            }
            onClose();
        } catch (err: any) {
            setError(err.message || "An error occurred during authentication");
        } finally {
            setLoading(false);
        }
    };

    // OAuth login removed as requested

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
                    >
                        <div className="relative overflow-hidden rounded-none border border-white/10 bg-black/60 p-1 shadow-2xl backdrop-blur-2xl">
                            {/* Ambient Mono Glow */}
                            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white/5 blur-[80px]" />
                            <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-white/5 blur-[80px]" />

                            <div className="relative h-full rounded-none border border-white/5 bg-black/40 p-8 md:p-10">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute right-6 top-6 rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                {/* Header */}
                                <div className="mb-10 text-center">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-none border border-white/10 bg-white/5 shadow-xl">
                                        <Sparkles className="h-8 w-8 text-white/40" />
                                    </div>
                                    <h2 className="text-3xl font-black tracking-tighter text-white mb-2 uppercase italic">
                                        {mode === "login" ? "Kernel.join()" : "Account.init()"}
                                    </h2>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                        {mode === "login"
                                            ? "Requesting permission to sync"
                                            : "Generating new identity signature"}
                                    </p>
                                </div>

                                {/* Tabs */}
                                <div className="mb-8 flex rounded-none bg-white/5 p-1">
                                    <button
                                        onClick={() => setMode("login")}
                                        className={cn(
                                            "flex-1 rounded-none py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all",
                                            mode === "login" ? "bg-white text-black shadow-2xl" : "text-white/20 hover:text-white/40"
                                        )}
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={() => setMode("signup")}
                                        className={cn(
                                            "flex-1 rounded-none py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all",
                                            mode === "signup" ? "bg-white text-black shadow-2xl" : "text-white/20 hover:text-white/40"
                                        )}
                                    >
                                        Register
                                    </button>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {mode === "signup" && (
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                                <input
                                                    type="text"
                                                    placeholder="Username"
                                                    required
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="w-full rounded-none border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest text-white transition-all focus:border-white/40 focus:bg-white/5 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
                                            <input
                                                type="email"
                                                placeholder="Email / Signature"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full rounded-none border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest text-white transition-all focus:border-white/40 focus:bg-white/5 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
                                            <input
                                                type="password"
                                                placeholder="Keycode"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full rounded-none border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest text-white transition-all focus:border-white/40 focus:bg-white/5 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-xs font-bold text-red-400"
                                        >
                                            {error}
                                        </motion.div>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={loading}
                                        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-none bg-white py-5 text-[10px] font-black uppercase tracking-[0.4em] text-black transition-all disabled:opacity-50"
                                    >
                                        {loading ? "Decrypting..." : mode === "login" ? "Establish Sync" : "Initialize Identity"}
                                        {!loading && <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />}
                                    </motion.button>
                                </form>

                                {/* Footer Link */}
                                <div className="mt-8 text-center text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                                    {mode === "login" ? "No identity signature?" : "Already synced?"}{" "}
                                    <button
                                        onClick={() => setMode(mode === "login" ? "signup" : "login")}
                                        className="text-white hover:underline transition-all"
                                    >
                                        {mode === "login" ? "Generate Now" : "Sync Profile"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

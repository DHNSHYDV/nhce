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
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-1 shadow-2xl backdrop-blur-2xl">
                            {/* Decorative Background Glows */}
                            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-[80px]" />
                            <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-blue-500/10 blur-[80px]" />

                            <div className="relative h-full rounded-[2.3rem] border border-white/5 bg-slate-950/40 p-8 md:p-10">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute right-6 top-6 rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                {/* Header */}
                                <div className="mb-8 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                        <Sparkles className="h-8 w-8 text-emerald-400" />
                                    </div>
                                    <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                                        {mode === "login" ? "Welcome Back" : "Create Account"}
                                    </h2>
                                    <p className="text-sm font-medium text-slate-400">
                                        {mode === "login"
                                            ? "Join the elite league of coders again."
                                            : "Start your journey to becoming a 1% engineer."}
                                    </p>
                                </div>

                                {/* Tabs */}
                                <div className="mb-8 flex rounded-2xl bg-white/5 p-1">
                                    <button
                                        onClick={() => setMode("login")}
                                        className={cn(
                                            "flex-1 rounded-xl py-2.5 text-xs font-black uppercase tracking-widest transition-all",
                                            mode === "login" ? "bg-white/10 text-white shadow-xl" : "text-slate-500 hover:text-slate-300"
                                        )}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setMode("signup")}
                                        className={cn(
                                            "flex-1 rounded-xl py-2.5 text-xs font-black uppercase tracking-widest transition-all",
                                            mode === "signup" ? "bg-white/10 text-white shadow-xl" : "text-slate-500 hover:text-slate-300"
                                        )}
                                    >
                                        Sign Up
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
                                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm font-medium text-white transition-all focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm font-medium text-white transition-all focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm font-medium text-white transition-all focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
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
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={loading}
                                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-500 py-4 text-sm font-black text-slate-950 transition-all hover:bg-emerald-400 disabled:opacity-50"
                                    >
                                        {loading ? "Authenticating..." : mode === "login" ? "Enter Dashboard" : "Create Account"}
                                        {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                                    </motion.button>
                                </form>

                                {/* Footer Link */}
                                <div className="mt-8 text-center text-xs font-medium text-slate-500">
                                    {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                                    <button
                                        onClick={() => setMode(mode === "login" ? "signup" : "login")}
                                        className="font-black text-emerald-400 hover:text-emerald-300 transition-colors"
                                    >
                                        {mode === "login" ? "Sign Up Now" : "Log In"}
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

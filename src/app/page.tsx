"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { GlowingModules } from "@/components/GlowingModules";
import BackgroundGradient from "@/components/ui/background-gradient";
import CodeCompiler from "@/components/CodeCompiler";

export default function Home() {
  const [showCards, setShowCards] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const BackButton = ({ onClick }: { onClick: () => void }) => (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center h-10 w-10 rounded-full glass border border-white/10 text-slate-400 hover:text-emerald-400 transition-colors shadow-xl"
    >
      <ChevronLeft className="h-5 w-5" />
    </motion.button>
  );

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] overflow-hidden">
      {/* New Green Gradient Background */}
      <BackgroundGradient />

      <AnimatePresence mode="wait">
        {!showCards ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20, filter: "blur(20px)" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-center max-w-4xl relative z-10 flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-xs font-black tracking-[0.4em] text-emerald-400 uppercase mb-8 block drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                Optimized for Your Career
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 flex flex-col items-center">
              <span className="text-white drop-shadow-2xl">The Learning Platform</span>
              <span className="text-gradient drop-shadow-2xl">Feels Like Your FYP.</span>
            </h1>

            <div className="flex justify-center mt-4">
              <motion.button
                onClick={() => setShowCards(true)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition-all flex items-center gap-3 shadow-[0_20px_50px_rgba(16,185,129,0.3)] group"
              >
                Start Grinding
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="modules"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(20px)" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full h-full relative z-10 flex flex-col items-center py-12"
          >
            {selectedModule === "Code" ? (
              <div className="w-full flex flex-col items-center gap-8 px-4">
                <div className="w-full max-w-6xl flex justify-start">
                  <BackButton onClick={() => setSelectedModule(null)} />
                </div>

                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                    <span className="text-xs font-black tracking-[0.4em] text-emerald-400 uppercase">Competitive Programming Environment</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
                    Master the <span className="text-gradient">Algorithmic Sprints</span>
                  </h2>
                </div>

                <CodeCompiler />
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-8">
                <div className="w-full max-w-6xl flex justify-start px-8">
                  <BackButton onClick={() => setShowCards(false)} />
                </div>

                <div className="text-center mb-4 space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                    <span className="text-xs font-black tracking-[0.4em] text-emerald-400 uppercase">Interactive Curriculum</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                    Choose Your <span className="text-gradient">Battlefield</span>
                  </h2>
                  <p className="text-slate-400 font-medium max-w-xl mx-auto">Select a core module to begin your high-intensity learning sprint and evolve your AI Skill Twin.</p>
                </div>

                <GlowingModules onSelect={(module) => setSelectedModule(module)} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, ChevronLeft, Zap, MessageSquare, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { GlowingModules } from "@/components/GlowingModules";
import CodeCompiler from "@/components/CodeCompiler";
import { OrbitingSkills } from "@/components/ui/orbiting-skills";
import { AptitudeModule } from "@/components/AptitudeModule";
import { CommunicationModule } from "@/components/CommunicationModule";
import { InterviewModule } from "@/components/InterviewModule";
import { Leaderboard } from "@/components/Leaderboard";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ProfileDashboard } from "@/components/ProfileDashboard";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const view = searchParams.get("view");
  const moduleParam = searchParams.get("module");

  const showCards = view === "modules" || !!moduleParam || view === "leaderboard";
  const selectedModule = moduleParam;

  const setShowCards = (val: boolean) => {
    if (val) {
      router.push("/?view=modules", { scroll: false });
    } else {
      router.push("/", { scroll: false });
    }
  };

  const setSelectedModule = (val: string | null) => {
    if (val) {
      router.push(`/?module=${encodeURIComponent(val)}`, { scroll: false });
    } else {
      router.push("/?view=modules", { scroll: false });
    }
  };

  const renderModule = () => {
    if (view === "leaderboard") {
      return (
        <div className="w-full">
          <Leaderboard onExit={() => router.push("/", { scroll: false })} />
        </div>
      );
    }

    switch (selectedModule) {
      case "Aptitude":
        return (
          <div className="w-full max-w-7xl flex flex-col items-center gap-12 px-6 pb-24">
            <div className="w-full flex justify-start">
              <BackButton onClick={() => setSelectedModule(null)} />
            </div>
            <AptitudeModule />
          </div>
        );
      case "Communication":
        return (
          <div className="w-full max-w-7xl flex flex-col items-center gap-12 px-6 pb-24">
            <div className="w-full flex justify-start">
              <BackButton onClick={() => setSelectedModule(null)} />
            </div>
            <CommunicationModule onExit={() => setSelectedModule(null)} />
          </div>
        );
      case "Interview":
        return (
          <div className="w-full max-w-7xl flex flex-col items-center gap-12 px-6 pb-24">
            <div className="w-full flex justify-start">
              <BackButton onClick={() => setSelectedModule(null)} />
            </div>
            <InterviewModule onExit={() => setSelectedModule(null)} />
          </div>
        );
      default:
        return (
          <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full max-w-6xl flex justify-start px-8">
              <BackButton onClick={() => setShowCards(false)} />
            </div>

            <div className="text-center mb-8 space-y-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-white/40" />
                <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">System Ready</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic uppercase leading-none">
                Select <span className="text-white/20">Protocol</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-8">
              <button
                onClick={() => setSelectedModule('Aptitude')}
                className="glass-dark p-12 rounded-none border border-white/10 group hover:border-white/40 transition-all text-left relative overflow-hidden"
              >
                <div className="h-12 w-12 bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Aptitude</h3>
                <p className="text-white/40 text-[10px] uppercase font-black tracking-widest leading-loose">Cognitive logic assessment protocol</p>
              </button>

              <button
                onClick={() => setSelectedModule('Communication')}
                className="glass-dark p-12 rounded-none border border-white/10 group hover:border-white/40 transition-all text-left relative overflow-hidden"
              >
                <div className="h-12 w-12 bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Communication</h3>
                <p className="text-white/40 text-[10px] uppercase font-black tracking-widest leading-loose">Vocal and linguistic synchronization</p>
              </button>

              <button
                onClick={() => setSelectedModule('Interview')}
                className="glass-dark p-12 rounded-none border border-white/10 group hover:border-white/40 transition-all text-left relative overflow-hidden"
              >
                <div className="h-12 w-12 bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">AI Interview</h3>
                <p className="text-white/40 text-[10px] uppercase font-black tracking-widest leading-loose">Multi-round stress simulator</p>
              </button>
            </div>
          </div>
        );
    }
  };

  const BackButton = ({ onClick }: { onClick: () => void }) => (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center h-10 w-10 rounded-none liquid-glass border border-white/10 text-white/60 hover:text-white transition-colors shadow-2xl"
    >
      <ChevronLeft className="h-5 w-5" />
    </motion.button>
  );

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] overflow-hidden selection:bg-white selection:text-black">
      <DottedSurface />

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
            className="w-full max-w-7xl relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-6 md:px-12 py-12"
          >
            {/* Left: Orbiting Skills Animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex-1 flex justify-center items-center"
            >
              <OrbitingSkills />
            </motion.div>

            {/* Right: Hero Text & Call to Action */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-8 opacity-40">
                  <div className="h-px w-8 bg-white" />
                  <span className="text-[10px] font-black tracking-[0.5em] text-white uppercase">
                    Protocol 01: Initialize
                  </span>
                </div>
              </motion.div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.02em] mb-12 flex flex-col items-center md:items-start leading-[0.85] text-white uppercase italic">
                <span className="drop-shadow-2xl">Code.</span>
                <span className="drop-shadow-2xl opacity-50">Skill.</span>
                <span className="drop-shadow-2xl opacity-20">Conquer.</span>
              </h1>

              <div className="flex justify-center md:justify-start mt-4">
                <motion.button
                  onClick={() => setShowCards(true)}
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-white text-black font-black rounded-none transition-all flex items-center gap-4 shadow-[0_0_50px_rgba(255,255,255,0.2)] group hover:shadow-[0_0_70px_rgba(255,255,255,0.4)]"
                >
                  <span className="tracking-[0.2em] uppercase text-sm">Enter Experience</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </div>
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
            {renderModule()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white relative flex overflow-hidden">
      <Sidebar onProfileClick={() => setIsProfileOpen(true)} />

      <div className="flex-1 flex flex-col relative z-10">
        <Navbar />
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <HomeContent />
        </Suspense>
      </div>

      <ProfileDashboard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </main>
  );
}

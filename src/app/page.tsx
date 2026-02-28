"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronLeft, Zap, MessageSquare, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrbitingSkills } from "@/components/ui/orbiting-skills";
import { AptitudeModule } from "@/components/AptitudeModule";
import { CommunicationModule } from "@/components/CommunicationModule";
import { InterviewModule } from "@/components/InterviewModule";
import { Leaderboard } from "@/components/Leaderboard";
import { ProjectsModule } from "@/components/ProjectsModule";
import { PortfolioModule } from "@/components/PortfolioModule";
import { SettingsModule } from "@/components/SettingsModule";
import { LeadershipModule } from "@/components/LeadershipModule";
import { CareerRoadmapModule } from "@/components/CareerRoadmapModule";
import { VernacularModule } from "@/components/VernacularModule";
import { AboutSection } from "@/components/AboutSection";
import CodeCompiler from "@/components/CodeCompiler";

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

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const view = searchParams.get("view");
  const moduleParam = searchParams.get("module");

  const showCards = view === "modules" || !!moduleParam || view === "leaderboard" || view === "projects" || view === "portfolio" || view === "settings" || view === "leadership" || view === "career" || view === "vernacular";
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
    if (view === "projects") {
      return (
        <div className="w-full flex flex-col items-center gap-12 px-6 pb-24">
          <div className="w-full max-w-7xl flex justify-start">
            <BackButton onClick={() => router.push("/", { scroll: false })} />
          </div>
          <ProjectsModule />
        </div>
      );
    }
    if (view === "portfolio") {
      return (
        <div className="w-full flex flex-col items-center gap-12 px-6 pb-24">
          <div className="w-full max-w-7xl flex justify-start">
            <BackButton onClick={() => router.push("/", { scroll: false })} />
          </div>
          <PortfolioModule />
        </div>
      );
    }
    if (view === "settings") {
      return (
        <div className="w-full flex flex-col items-center gap-12 px-6 pb-24">
          <div className="w-full max-w-7xl flex justify-start">
            <BackButton onClick={() => router.push("/", { scroll: false })} />
          </div>
          <SettingsModule />
        </div>
      );
    }
    if (view === "leadership") {
      return (
        <div className="w-full flex flex-col items-center gap-12 px-6 pb-24">
          <div className="w-full max-w-7xl flex justify-start">
            <BackButton onClick={() => router.push("/", { scroll: false })} />
          </div>
          <LeadershipModule />
        </div>
      );
    }
    if (view === "career") {
      return (
        <div className="w-full flex flex-col items-center gap-12 px-6 pb-24">
          <div className="w-full max-w-7xl flex justify-start">
            <BackButton onClick={() => router.push("/", { scroll: false })} />
          </div>
          <CareerRoadmapModule />
        </div>
      );
    }
    if (view === "vernacular") {
      return (
        <div className="w-full flex flex-col items-center gap-12 px-6 pb-24">
          <div className="w-full max-w-7xl flex justify-start">
            <BackButton onClick={() => router.push("/", { scroll: false })} />
          </div>
          <VernacularModule />
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
      case "Coding":
        return (
          <div className="w-full max-w-7xl flex flex-col items-center gap-12 px-6 pb-24">
            <div className="w-full flex justify-start">
              <BackButton onClick={() => setSelectedModule(null)} />
            </div>
            <CodeCompiler />
          </div>
        );
      default:
        return (
          <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full max-w-6xl flex justify-start px-8">
              <BackButton onClick={() => setShowCards(false)} />
            </div>

            <div className="text-center mb-12 space-y-6 px-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Sparkles className="h-5 w-5 text-white/40" />
                <span className="text-[10px] md:text-[12px] font-black tracking-[0.6em] text-white/40 uppercase font-display">System Ready</span>
              </div>
              <h2 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white italic uppercase leading-none font-display">
                Select <span className="text-white/20">Protocol</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl px-4 md:px-8">
              <button
                onClick={() => setSelectedModule('Aptitude')}
                className="glass-dark p-8 md:p-14 rounded-none border border-white/10 group hover:border-white/40 transition-all text-left relative overflow-hidden"
              >
                <div className="h-12 w-12 md:h-16 md:w-16 bg-white/5 flex items-center justify-center mb-6 md:mb-10 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <Zap className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-4 font-display">Aptitude</h3>
                <p className="text-white/40 text-[10px] md:text-[12px] uppercase font-black tracking-widest leading-loose">Cognitive logic assessment protocol</p>
              </button>

              <button
                onClick={() => setSelectedModule('Communication')}
                className="glass-dark p-8 md:p-14 rounded-none border border-white/10 group hover:border-white/40 transition-all text-left relative overflow-hidden"
              >
                <div className="h-12 w-12 md:h-16 md:w-16 bg-white/5 flex items-center justify-center mb-6 md:mb-10 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <MessageSquare className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-4 font-display">Communication</h3>
                <p className="text-white/40 text-[10px] md:text-[12px] uppercase font-black tracking-widest leading-loose">Vocal and linguistic synchronization</p>
              </button>

              <button
                onClick={() => setSelectedModule('Interview')}
                className="glass-dark p-8 md:p-14 rounded-none border border-white/10 group hover:border-white/40 transition-all text-left relative overflow-hidden sm:col-span-2 md:col-span-1"
              >
                <div className="h-12 w-12 md:h-16 md:w-16 bg-white/5 flex items-center justify-center mb-6 md:mb-10 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <Shield className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-4 font-display">AI Interview</h3>
                <p className="text-white/40 text-[10px] md:text-[12px] uppercase font-black tracking-widest leading-loose">Multi-round stress simulator</p>
              </button>

              <button
                onClick={() => setSelectedModule('Coding')}
                className="glass-dark p-8 md:p-14 rounded-none border border-white/10 group hover:border-white/40 transition-all text-left relative overflow-hidden sm:col-span-2 md:col-span-1"
              >
                <div className="h-12 w-12 md:h-16 md:w-16 bg-white/5 flex items-center justify-center mb-6 md:mb-10 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <Zap className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-4 font-display">Coding</h3>
                <p className="text-white/40 text-[10px] md:text-[12px] uppercase font-black tracking-widest leading-loose">Algorithmic logic synchronization</p>
              </button>
            </div>

            {/* Advanced Simulations Grid */}
            <div className="w-full max-w-6xl px-8 mt-24 space-y-10">
              <div className="flex items-center gap-4 opacity-20">
                <div className="h-px w-12 bg-white" />
                <span className="text-[11px] font-black tracking-[0.5em] text-white uppercase italic font-display">Advanced Mastery Protocols</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {[
                  { id: 'leadership', title: 'Leadership', icon: Shield, desc: 'EI & Command simulations' },
                  { id: 'career', title: 'Career AI', icon: Zap, desc: 'Neural path prediction' },
                  { id: 'vernacular', title: 'Bharat', icon: Sparkles, desc: 'Regional language mode' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(`/?view=${item.id}`, { scroll: false });
                    }}
                    className="glass-dark p-6 md:p-10 rounded-none border border-white/5 group hover:border-white/40 transition-all text-left relative overflow-hidden bg-white/[0.01]"
                  >
                    <div className="h-10 w-10 md:h-12 md:w-12 bg-white/5 flex items-center justify-center mb-6 md:mb-8 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                      <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <h3 className="text-base md:text-lg font-black italic uppercase tracking-tighter mb-2 font-display">{item.title}</h3>
                    <p className="text-white/20 text-[9px] md:text-[10px] uppercase font-black tracking-widest leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-6rem)] selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {!showCards ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full flex flex-col items-center"
          >
            <div className="w-full max-w-7xl relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-32 px-4 md:px-12 min-h-[calc(100vh-6rem)] py-12 md:py-20">
              {/* Left: Orbiting Skills Animation - Purely decorative in landing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-full md:flex-1 flex justify-center items-center order-2 md:order-1 mt-12 md:mt-0 pointer-events-none"
              >
                <div className="pointer-events-auto scale-90 md:scale-110">
                  <OrbitingSkills />
                </div>
              </motion.div>

              {/* Right: Hero Text & Call to Action */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2 relative z-20">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-10 opacity-40">
                    <div className="h-px w-12 bg-white" />
                    <span className="text-[12px] font-black tracking-[0.6em] text-white uppercase font-display">
                      Protocol 01: Initialize
                    </span>
                  </div>
                </motion.div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black tracking-[-0.04em] mb-8 md:mb-16 flex flex-col items-center md:items-start leading-[0.8] md:leading-[0.75] text-white uppercase italic font-display">
                  <span className="drop-shadow-2xl whitespace-nowrap hover:text-white transition-all cursor-default">Code.</span>
                  <span className="drop-shadow-2xl opacity-50 whitespace-nowrap hover:opacity-100 transition-all cursor-default">Skill.</span>
                  <span className="drop-shadow-2xl opacity-10 whitespace-nowrap hover:opacity-100 transition-all cursor-default">Conquer.</span>
                </h1>

                <div className="flex justify-center md:justify-start mt-6">
                  <motion.button
                    onClick={() => setShowCards(true)}
                    whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-16 py-8 bg-white text-black font-black rounded-none transition-all flex items-center gap-6 shadow-[0_0_60px_rgba(255,255,255,0.2)] group hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] relative z-30 cursor-pointer"
                  >
                    <span className="tracking-[0.3em] uppercase text-sm font-display">Enter Experience</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-3 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* About Section Integrated into Landing */}
            <div id="about-container" className="w-full min-h-screen border-t border-white/5 bg-black/50 backdrop-blur-3xl relative z-20 flex items-center justify-center py-32">
              <AboutSection />
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
            className="w-full h-full relative z-20 flex flex-col items-center py-12"
          >
            {renderModule()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeContent />
    </Suspense>
  );
}

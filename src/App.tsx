import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ExternalLink,
  Code,
  Sparkles,
  Cpu,
  Layers,
  Globe,
  Terminal,
  Mail,
  Github,
  Linkedin,
  FileText,
  Sliders,
  CheckCircle,
  HelpCircle,
  Layers3
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Header from "./components/sections/Header";
import ContactForm from "./components/sections/ContactForm";
import Education from "./components/sections/Education";
import Internships from "./components/sections/Internships";
import TechStack from "./components/sections/TechStack";
import ProjectShowcaseSection from "./components/sections/ProjectShowcaseSection";

import ProjectCard from "./components/ui/ProjectCard";
import FadeInSection, { staggerChildVariants } from "./components/ui/FadeInSection";
import Ticker from "./components/ui/Ticker";
import { FullPageSkeletonLoader } from "./components/ui/SkeletonShimmer";
import TypewriterHeroTitle from "./components/ui/TypewriterHeroTitle";

import FloatingMascotPixel from "./components/interactive/FloatingMascotPixel";
import InteractivePlaygrounds from "./components/interactive/InteractivePlaygrounds";
import BackgroundGeometry from "./components/interactive/BackgroundGeometry";
import Hero3DTilt from "./components/interactive/Hero3DTilt";
import GizmoWelcomeIntro from "./components/interactive/GizmoWelcomeIntro";
import SmoothScroll from "./components/interactive/SmoothScroll";
import { PROJECTS, SKILL_CATEGORIES } from "./data";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export default function App() {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const hasVisited = sessionStorage.getItem("has_visited_site");
      if (!hasVisited) {
        // First time coming to website -> DO NOT show skeleton shimmer
        sessionStorage.setItem("has_visited_site", "true");
        return false;
      }
      // Reload or refresh -> show skeleton shimmer
      return true;
    }
    return false;
  });

  const [showWelcomeIntro, setShowWelcomeIntro] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("gizmo_welcome_seen");
    }
    return true;
  });
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string | null>("frontend");
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const [layoutMode, setLayoutMode] = useState<"carousel" | "grid">("grid");

  // Skeleton shimmer duration (active on page reload/refresh)
  useEffect(() => {
    if (isPageLoading) {
      const timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPageLoading]);

  // Load theme preference on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("yanshu_portfolio_theme");
    if (storedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  // Handle light/dark mode toggling
  const handleToggleTheme = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("yanshu_portfolio_theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("yanshu_portfolio_theme", "light");
    }
  };

  // Scroll and drag navigation handlers for 3D horizontal slider
  const [wheelCooldown, setWheelCooldown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Keep refs of state variables so the vanilla wheel listener always has fresh states
  const activeIdxRef = useRef(activeIdx);
  const wheelCooldownRef = useRef(wheelCooldown);
  const layoutModeRef = useRef(layoutMode);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
    wheelCooldownRef.current = wheelCooldown;
    layoutModeRef.current = layoutMode;
  }, [activeIdx, wheelCooldown, layoutMode]);

  useEffect(() => {
    const handleWheelVanilla = (e: WheelEvent) => {
      if (layoutModeRef.current !== "carousel") return;
      if (Math.abs(e.deltaY) < 35) return;

      // Prevent the main browser window from scrolling
      e.preventDefault();

      if (wheelCooldownRef.current) return;

      setWheelCooldown(true);
      if (e.deltaY > 0) {
        setActiveIdx((activeIdxRef.current + 1) % PROJECTS.length);
      } else {
        setActiveIdx((activeIdxRef.current - 1 + PROJECTS.length) % PROJECTS.length);
      }

      setTimeout(() => {
        setWheelCooldown(false);
      }, 850); // cooldown matches transition time + buffer
    };

    const currentStage = stageRef.current;
    if (currentStage) {
      currentStage.addEventListener("wheel", handleWheelVanilla, { passive: false });
    }
    return () => {
      if (currentStage) {
        currentStage.removeEventListener("wheel", handleWheelVanilla);
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        setActiveIdx((prev) => (prev + 1) % PROJECTS.length);
      } else {
        setActiveIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
      }
      setStartX(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX === null) return;
    const currentX = e.clientX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        setActiveIdx((prev) => (prev + 1) % PROJECTS.length);
      } else {
        setActiveIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
      }
      setStartX(null);
    }
  };

  const handleMouseUp = () => {
    setStartX(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] bg-grid-pattern text-[#FAF9F6] light:bg-[#FAF9F6] light:text-[#0B0B0C] transition-colors duration-300 overflow-x-hidden selection:bg-[#E53E3E] selection:text-white font-sans relative">
      <SmoothScroll />

      {/* Initial Page Skeleton Shimmer Loader */}
      <AnimatePresence>
        {isPageLoading && <FullPageSkeletonLoader key="page-skeleton-loader" />}
      </AnimatePresence>

      {/* Conditional Welcome Intro overlay showing only once per session */}
      <AnimatePresence>
        {showWelcomeIntro && (
          <GizmoWelcomeIntro
            key="gizmo-welcome-intro"
            onEnter={() => {
              sessionStorage.setItem("gizmo_welcome_seen", "true");
              setShowWelcomeIntro(false);
            }}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>

      {/* Sidebar vertical border lines framing the entire content container (Bauhaus architecture) */}
      <div className="absolute top-0 bottom-0 left-[6%] md:left-[10%] lg:left-[12%] w-[1px] bg-neutral-900 light:bg-neutral-200 pointer-events-none hidden md:block z-0"></div>
      <div className="absolute top-0 bottom-0 right-[6%] md:right-[10%] lg:right-[12%] w-[1px] bg-neutral-900 light:bg-neutral-200 pointer-events-none hidden md:block z-0"></div>

      {/* Top Header sticky layer */}
      <Header darkMode={darkMode} onToggleTheme={handleToggleTheme} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-start px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto w-full pt-28 pb-16 overflow-hidden z-10">
        {/* 3D Tilt geometric Bauhaus circle */}
        <Hero3DTilt className="absolute right-[-40px] sm:right-0 md:right-[5%] top-[15%] md:top-[12%] w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[480px] md:h-[480px] pointer-events-auto z-0 opacity-40 md:opacity-100">
          <div className="relative w-full h-full border border-neutral-900/80 light:border-neutral-200 rounded-full opacity-40 light:opacity-60 pointer-events-none">
            <BackgroundGeometry isDark={darkMode} />
            <div className="absolute inset-4 border border-dashed border-neutral-900/60 light:border-neutral-200/60 rounded-full animate-[spin_90s_linear_infinite]"></div>
            <div className="absolute inset-16 border border-neutral-900/40 light:border-neutral-200/40 rounded-full"></div>
            {/* Subtle colored accent nodes — offset in Z for depth illusion */}
            <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-[#E53E3E] rounded-full" style={{ transform: "translateZ(8px)" }}></div>
            <div className="absolute bottom-[30%] left-[10%] w-2.5 h-2.5 bg-[#2B6CB0] rounded-full" style={{ transform: "translateZ(16px)" }}></div>
          </div>
        </Hero3DTilt>

        <div className="w-full relative z-10 space-y-6 sm:space-y-8 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#E53E3E] light:text-[#2B6CB0] font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-black block"
          >
            Portfolio 2026 / AI • FULL-STACK ENG
          </motion.span>
          
          <TypewriterHeroTitle startTyping={!showWelcomeIntro} className="font-title text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight sm:tracking-tighter leading-[0.95] sm:leading-[0.9] text-white light:text-black break-words" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border-l-4 border-[#E53E3E] pl-4 sm:pl-6 max-w-2xl"
          >
            <p className="text-base sm:text-[17px] md:text-[19px] text-neutral-300 light:text-neutral-700 leading-relaxed font-sans font-medium">
              I build intelligent AI systems—from industrial computer vision and machine learning applications to modern software that solves real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2 sm:pt-4"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96, y: 0 }}
              className="px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-xs font-black uppercase tracking-widest bg-[#E53E3E] text-white border-2 border-white light:border-black shadow-bauhaus-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            
            <motion.a
              href="https://github.com/Yanshu04"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96, y: 0 }}
              className="px-6 sm:px-8 py-3.5 sm:py-4 font-mono text-xs font-black uppercase tracking-widest bg-[#D69E2E] text-black border-2 border-white light:border-black shadow-bauhaus-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>GitHub Codebases</span>
              <ExternalLink className="w-4 h-4 text-black" />
            </motion.a>
          </motion.div>
        </div>

        {/* Anchor link to move down */}
        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-6 md:left-10 animate-bounce z-10">
          <a href="#work" className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-colors">
            ↓ Scroll to explore
          </a>
        </div>
      </section>

      {/* Ticker marquee banner */}
      <FadeInSection>
        <Ticker />
      </FadeInSection>

      {/* Selected Work & Experiments Section */}
      <ProjectShowcaseSection />

      {/* About Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto w-full border-t border-neutral-900 light:border-neutral-200 z-10 relative scroll-mt-20" id="about">
        <FadeInSection className="mb-16">
          <span className="text-[#2B6CB0] font-mono text-xs uppercase tracking-widest font-black block mb-2">
            BACKGROUND
          </span>
          <h2 className="font-title text-[28px] md:text-[40px] font-black uppercase tracking-tight text-white light:text-black mb-4">
            About
          </h2>
          <div className="w-24 h-2 bg-[#D69E2E]"></div>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Prose section */}
          <div className="lg:col-span-7">
            <FadeInSection className="space-y-6">
              <p className="text-[17px] md:text-[19px] text-neutral-300 light:text-neutral-800 leading-snug font-sans">
                I'm a Data &amp; AI/ML Engineer who builds practical machine learning applications, speech processing tools, and high-performance web applications. I focus on developing software that is fast, intuitive, and reliably solves real problems.
              </p>
              
              <p className="text-[17px] md:text-[19px] text-neutral-400 light:text-slate-650 leading-relaxed font-sans">
                My experience spans end-to-end full-stack integration and machine learning pipelines—from training PyTorch models and building local RAG assistants to deploying REST APIs and responsive frontends.
              </p>
            </FadeInSection>
          </div>

          {/* Statistics counter panel */}
          <div className="lg:col-span-5 bg-black light:bg-[#fbfbf9] border-2 border-white light:border-black p-8 flex flex-col gap-6 md:flex-row lg:flex-col md:justify-around lg:justify-start shadow-bauhaus">
            <FadeInSection staggerChildren={0.1}>
              <motion.div variants={staggerChildVariants} whileHover={{ scale: 1.03, y: -2 }} className="flex items-start gap-5">
                <div className="w-11 h-11 bg-black light:bg-[#f5f2eb] text-[#E53E3E] border-2 border-[#E53E3E] flex items-center justify-center font-mono font-black">
                  08
                </div>
                <div>
                  <h4 className="text-[#E53E3E] text-3xl font-mono font-black leading-none">
                    8+
                  </h4>
                  <span className="text-[10px] tracking-widest font-mono uppercase text-neutral-400 light:text-neutral-500 mt-1 block font-bold">
                    Core AI Projects
                  </span>
                </div>
              </motion.div>
            </FadeInSection>

            {/* Divider */}
            <div className="h-[2px] w-full bg-neutral-800 light:bg-black hidden lg:block"></div>
            <div className="w-[2px] h-12 bg-neutral-800 light:bg-black hidden md:block lg:hidden"></div>

            <FadeInSection staggerChildren={0.1}>
              <motion.div variants={staggerChildVariants} whileHover={{ scale: 1.03, y: -2 }} className="flex items-start gap-5">
                <div className="w-11 h-11 bg-black light:bg-[#f5f2eb] text-[#2B6CB0] border-2 border-[#2B6CB0] flex items-center justify-center font-mono font-black">
                  AI
                </div>
                <div>
                  <h4 className="text-[#2B6CB0] text-3xl font-mono font-black leading-none">
                    SPECIALIST
                  </h4>
                  <span className="text-[10px] tracking-widest font-mono uppercase text-neutral-400 light:text-neutral-500 mt-1 block font-bold">
                    Focused Specialization
                  </span>
                </div>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Skills Matrix / How I Work Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto w-full border-t border-neutral-900 light:border-neutral-200 z-10 relative scroll-mt-20" id="skills">
        <FadeInSection className="mb-16">
          <span className="text-[#D69E2E] light:text-[#2B6CB0] font-mono text-xs uppercase tracking-widest font-black block mb-2">
            ARCHITECTURAL SCHEMATICS
          </span>
          <h2 className="font-title text-[28px] md:text-[40px] font-black uppercase tracking-tight text-white light:text-black mb-4">
            How I Work
          </h2>
          <div className="w-24 h-2 bg-[#E53E3E]"></div>
        </FadeInSection>

        {/* 3 Column Skill Blocks */}
        <FadeInSection staggerChildren={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((cat) => (
              <motion.div key={cat.id} variants={staggerChildVariants} className="h-full">
                <motion.button
                  onClick={() => setSelectedSkillCategory(cat.id === selectedSkillCategory ? null : cat.id)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-full text-left p-6 md:p-8 border-2 h-full transition-all group flex flex-col justify-between cursor-pointer shadow-bauhaus ${
                    selectedSkillCategory === cat.id
                      ? "bg-[#16161A] light:bg-[#fbfbf9] border-[#E53E3E]"
                      : "bg-[#16161A]/50 light:bg-[#f5f2eb] border-neutral-850 light:border-neutral-300 hover:border-white light:hover:border-black"
                  }`}
                >
                  <div>
                    <span className="font-mono text-[#2B6CB0] light:text-[#2B6CB0] text-xs font-black uppercase block tracking-wider mb-6">
                      {cat.num} / {cat.title}
                    </span>
                    <p className="text-[16px] md:text-[18px] text-neutral-400 light:text-neutral-700 leading-relaxed mb-6 font-sans">
                      {cat.description}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-[#E53E3E] font-black uppercase tracking-wider flex items-center gap-1">
                    <span>{selectedSkillCategory === cat.id ? "Minimize details" : "Explode Technologies"}</span>
                    <ArrowRight className={`w-4 h-4 transform transition-transform ${selectedSkillCategory === cat.id ? "rotate-90" : "group-hover:translate-x-1"}`} />
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </FadeInSection>

        {/* Collapsible details panel listing all chips & libraries used */}
        {selectedSkillCategory && (
          <FadeInSection className="mt-8" staggerChildren={0.05}>
            <div className="bg-[#16161A] light:bg-[#fbfbf9] border-2 border-white light:border-black p-6 md:p-8 shadow-bauhaus">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D69E2E] light:text-[#2B6CB0] block mb-4 font-black">
                [{SKILL_CATEGORIES.find(c => c.id === selectedSkillCategory)?.title.toUpperCase()} PIPELINE STACK]
              </span>
              
              <div className="flex flex-wrap gap-2.5">
                {SKILL_CATEGORIES.find(c => c.id === selectedSkillCategory)?.technologies.map((tech) => (
                  <motion.div
                    key={tech}
                    variants={staggerChildVariants}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-black light:bg-[#f5f2eb] border-2 border-neutral-800 light:border-black text-xs uppercase font-mono font-bold cursor-default"
                  >
                    <span className="w-2 h-2 bg-[#E53E3E]"></span>
                    <span>{tech}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}
      </section>

      {/* Technology Stack Section */}
      <TechStack />

      {/* Interactive Playgrounds Section */}
      <section className="hidden md:block py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto w-full border-t border-neutral-900 light:border-neutral-200 z-10 relative scroll-mt-20" id="playgrounds">
        <FadeInSection className="mb-16">
          <span className="text-[#E53E3E] light:text-[#2B6CB0] font-mono text-xs uppercase tracking-widest font-black block mb-2">
            LIVE SIMULATION SANDBOX
          </span>
          <h2 className="font-title text-[28px] md:text-[40px] font-black uppercase tracking-tight text-white light:text-black mb-4">
            Interactive Playgrounds
          </h2>
          <div className="w-24 h-2 bg-[#2B6CB0]"></div>
        </FadeInSection>

        <FadeInSection>
          <InteractivePlaygrounds />
        </FadeInSection>
      </section>

      {/* Education Section */}
      <Education />

      {/* Internship Experience Section */}
      <Internships />

      {/* Get In Touch Section containing the interactive Guestbook */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto w-full border-t border-neutral-900 light:border-neutral-200 z-10 relative scroll-mt-20" id="contact">
        <FadeInSection className="mb-12 text-center">
          <span className="text-[#E53E3E] font-mono text-xs uppercase tracking-widest font-black block mb-2">
            LET'S CONNECT
          </span>
          <h2 className="font-title text-[28px] md:text-[40px] font-black uppercase tracking-tight text-white light:text-black mb-4 text-center">
            Get In Touch
          </h2>
          <div className="w-24 h-2 bg-[#2B6CB0] mx-auto"></div>
          <p className="text-[16px] md:text-[18px] text-neutral-400 light:text-slate-600 max-w-lg mx-auto mt-4 text-center font-sans">
            Open for AI/ML engineering roles, full-stack development projects, and technical collaborations.
          </p>
        </FadeInSection>

        {/* Contact form combined with guest message loops */}
        <FadeInSection>
          <ContactForm />
        </FadeInSection>

        {/* Hotlink link triggers */}
        <FadeInSection className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center font-mono text-xs uppercase tracking-wider font-semibold">
          <motion.a
            href="mailto:yanshushingala@gmail.com"
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-colors"
          >
            <Mail className="w-4 h-4 text-blue-500" />
            <span>yanshushingala@gmail.com</span>
          </motion.a>
          
          <div className="hidden sm:block w-1.5 h-1.5 bg-neutral-800 rounded-full light:bg-slate-300"></div>

          <motion.a
            href="https://github.com/Yanshu04"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-colors"
          >
            <Github className="w-4 h-4 text-gray-500" />
            <span>github.com/Yanshu04</span>
          </motion.a>
        </FadeInSection>
      </section>

      {/* Footer boundary elements */}
      <FadeInSection>
        <footer className="bg-[#08080c] light:bg-[#f5f2eb] border-t border-neutral-950 light:border-slate-200 py-12 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto relative z-10">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-400 light:text-slate-500">
            <div className="font-mono text-lg font-bold tracking-tighter uppercase text-white light:text-slate-900">
              YS
            </div>

            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c909f] light:text-slate-400 text-center md:text-left h-fit leading-none mt-1">
              Built by Yanshu Shingala
            </span>

            <div className="flex gap-6 font-mono text-xs uppercase tracking-wider font-bold">
              <motion.a
                href="mailto:yanshushingala@gmail.com"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-all underline decoration-blue-500/50 underline-offset-4"
              >
                Email
              </motion.a>
              <motion.a
                href="https://github.com/Yanshu04"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-all underline decoration-blue-500/50 underline-offset-4"
              >
                GitHub
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-all underline decoration-blue-500/50 underline-offset-4"
              >
                LinkedIn
              </motion.a>
            </div>
          </div>
        </footer>
      </FadeInSection>

      {!showWelcomeIntro && <FloatingMascotPixel isDark={darkMode} />}
    </div>
  );
}

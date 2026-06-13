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

import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import FadeInSection from "./components/FadeInSection";
import Education from "./components/Education";
import Ticker from "./components/Ticker";
import { PROJECTS, SKILL_CATEGORIES } from "./data";


export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string | null>("frontend");
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const [layoutMode, setLayoutMode] = useState<"carousel" | "grid">("carousel");

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
    if (layoutMode !== "carousel") return;
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null || layoutMode !== "carousel") return;
    const currentX = e.touches[0].clientX;
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (layoutMode !== "carousel") return;
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX === null || layoutMode !== "carousel") return;
    const currentX = e.clientX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 60) {
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
      {/* Sidebar vertical border lines framing the entire content container (Bauhaus architecture) */}
      <div className="absolute top-0 bottom-0 left-[6%] md:left-[10%] lg:left-[12%] w-[1px] bg-neutral-900 light:bg-neutral-200 pointer-events-none hidden md:block z-0"></div>
      <div className="absolute top-0 bottom-0 right-[6%] md:right-[10%] lg:right-[12%] w-[1px] bg-neutral-900 light:bg-neutral-200 pointer-events-none hidden md:block z-0"></div>

      {/* Top Header sticky layer */}
      <Header darkMode={darkMode} onToggleTheme={handleToggleTheme} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-start px-6 md:px-24 lg:px-32 max-w-7xl mx-auto pt-20 overflow-hidden z-10">
        {/* Faint geometric Bauhaus circle representing core neural systems */}
        <div className="absolute right-[-50px] md:right-[5%] top-[20%] md:top-[15%] w-[280px] h-[280px] md:w-[480px] md:h-[480px] border border-neutral-900/80 light:border-neutral-200 rounded-full opacity-40 light:opacity-60 pointer-events-none z-0">
          <div className="absolute inset-4 border border-dashed border-neutral-900/60 light:border-neutral-200/60 rounded-full animate-[spin_90s_linear_infinite]"></div>
          <div className="absolute inset-16 border border-neutral-900/40 light:border-neutral-200/40 rounded-full"></div>
          {/* Subtle colored accent node */}
          <div className="absolute top-[20%] right-[20%] w-3 h-3 bg-[#E53E3E] rounded-full"></div>
          <div className="absolute bottom-[30%] left-[10%] w-2.5 h-2.5 bg-[#2B6CB0] rounded-full"></div>
        </div>

        <div className="w-full relative z-10 space-y-8 max-w-3xl">
          <span className="text-[#E53E3E] light:text-[#2B6CB0] font-mono text-xs uppercase tracking-[0.25em] font-black block animate-fade-in-up opacity-0">
            Portfolio 2026 / AI • FULL-STACK ENG
          </span>
          
          <h1 className="font-title text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white light:text-black animate-fade-in-up opacity-0 delay-100">
            Yanshu<br />Shingala
          </h1>

          <div className="border-l-4 border-[#E53E3E] pl-6 max-w-2xl animate-fade-in-up opacity-0 delay-200">
            <p className="text-[17px] md:text-[19px] text-neutral-300 light:text-neutral-700 leading-relaxed font-sans font-medium">
              I construct browser-native execution pipelines and high-performance intelligent interfaces — from real-time computer vision streams to custom ML model telemetry.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 animate-fade-in-up opacity-0 delay-300">
            <a
              href="#work"
              className="px-8 py-4 font-mono text-xs font-black uppercase tracking-widest bg-[#E53E3E] text-white border-2 border-white light:border-black shadow-bauhaus-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.03]"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a
              href="https://github.com/Yanshu04"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-[#D69E2E] text-black border-2 border-white light:border-black shadow-bauhaus-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.03]"
            >
              <span>GitHub Codebases</span>
              <ExternalLink className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>

        {/* Anchor link to move down */}
        <div className="absolute bottom-10 left-6 md:left-24 lg:left-32 animate-bounce z-10">
          <a href="#work" className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-colors">
            ↓ Scroll to explore
          </a>
        </div>
      </section>

      {/* Ticker marquee banner */}
      <Ticker />

      {/* Selected Work Section */}
      <section className="py-24 md:py-32 px-6 md:px-24 lg:px-32 max-w-7xl mx-auto border-t border-neutral-900 light:border-neutral-200 z-10 relative" id="work">
        <FadeInSection className="mb-16">
          <span className="text-[#E53E3E] font-mono text-xs uppercase tracking-widest font-black block mb-2">
            STRETCHING BOUNDARIES OF ML
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-title text-[28px] md:text-[40px] font-black uppercase tracking-tight text-white light:text-black mb-2">
                Selected Work
              </h2>
              <div className="w-24 h-2 bg-[#2B6CB0]"></div>
            </div>
            
            {/* Dynamic Layout Switcher */}
            <div className="flex bg-black light:bg-[#f5f2eb] border-2 border-white light:border-black p-1 font-mono text-[10px] sm:text-xs select-none shadow-bauhaus-sm">
              <button
                onClick={() => setLayoutMode("carousel")}
                className={`px-4 py-1.5 font-black uppercase tracking-wider transition-all cursor-pointer border-2 ${
                  layoutMode === "carousel"
                    ? "bg-[#E53E3E] text-white border-white light:border-black"
                    : "border-transparent text-neutral-400 hover:text-white light:text-neutral-600 light:hover:text-black"
                }`}
              >
                3D Slider
              </button>
              <button
                onClick={() => setLayoutMode("grid")}
                className={`px-4 py-1.5 font-black uppercase tracking-wider transition-all cursor-pointer border-2 ${
                  layoutMode === "grid"
                    ? "bg-[#E53E3E] text-white border-white light:border-black"
                    : "border-transparent text-neutral-400 hover:text-white light:text-neutral-600 light:hover:text-black"
                }`}
              >
                Grid View
              </button>
            </div>
          </div>
        </FadeInSection>

        {/* 1. Carousel Slider Layout */}
        {layoutMode === "carousel" && (
          <div className="relative w-full max-w-5xl mx-auto py-6">
            {/* Stage Area - Height configured for horizontal overlapping cards. Touch/drag/scroll listeners enabled */}
            <div 
              ref={stageRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative h-[1060px] sm:h-[980px] w-full flex items-start pt-8 sm:pt-12 justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
            >
              {PROJECTS.map((project, idx) => {
                // Calculate difference from active index
                let diff = idx - activeIdx;
                
                // Wrap around for carousel loop
                const len = PROJECTS.length;
                if (diff < -len / 2) diff += len;
                if (diff > len / 2) diff -= len;
                
                const isCenter = diff === 0;
                const isLeft = diff === -1;
                const isRight = diff === 1;
                const isVisible = Math.abs(diff) <= 1; // Only render left, center, right
                
                if (!isVisible) return null;
                
                // Determine position and styling
                let positionClass = "";
                let scaleClass = "";
                let opacityClass = "";
                let zIndexClass = "";
                
                if (isCenter) {
                  positionClass = "translate-x-0 translate-y-0";
                  scaleClass = "scale-100";
                  opacityClass = "opacity-100";
                  zIndexClass = "z-30";
                } else if (isLeft) {
                  positionClass = "-translate-x-[30%] md:-translate-x-[55%] lg:-translate-x-[70%] translate-y-0";
                  scaleClass = "scale-[0.85] pointer-events-none md:pointer-events-auto";
                  opacityClass = "opacity-20 md:opacity-45";
                  zIndexClass = "z-10";
                } else if (isRight) {
                  positionClass = "translate-x-[30%] md:translate-x-[55%] lg:translate-x-[70%] translate-y-0";
                  scaleClass = "scale-[0.85] pointer-events-none md:pointer-events-auto";
                  opacityClass = "opacity-20 md:opacity-45";
                  zIndexClass = "z-10";
                }
                
                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      if (!isCenter) {
                        setActiveIdx(idx);
                      }
                    }}
                    onWheel={(e) => {
                      if (isCenter) {
                        // Stop propagation so vertical scrolls inside the card content work normally
                        e.stopPropagation();
                      }
                    }}
                    className={`absolute top-4 sm:top-8 w-full max-w-md px-4 transition-all duration-500 ease-out transform ${positionClass} ${scaleClass} ${opacityClass} ${zIndexClass} ${isCenter ? 'max-h-[900px] overflow-y-auto cursor-default' : 'h-auto overflow-hidden cursor-pointer'}`}
                  >
                    <ProjectCard
                      project={project}
                      isActive={isCenter}
                    />
                  </div>
                );
              })}
            </div>

            {/* Tactile Editorial Carousel Control Bar */}
            <div className="flex items-center justify-center gap-6 mt-8 font-mono select-none relative z-20">
              <button
                onClick={() => setActiveIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)}
                className="p-3 border-2 border-white light:border-black bg-[#16161A] light:bg-white text-white light:text-black hover:bg-[#E53E3E] hover:text-white light:hover:bg-[#E53E3E] light:hover:text-white transition-all shadow-bauhaus-sm cursor-pointer"
                aria-label="Previous Project"
              >
                <ArrowRight className="w-4 h-4 transform rotate-180" />
              </button>
              
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-black light:bg-[#f5f2eb] border-2 border-white light:border-black px-5 py-2.5 shadow-bauhaus-sm">
                <span className="text-[#E53E3E]">0{activeIdx + 1}</span>
                <span className="text-neutral-500">/</span>
                <span>0{PROJECTS.length}</span>
              </div>

              <button
                onClick={() => setActiveIdx((prev) => (prev + 1) % PROJECTS.length)}
                className="p-3 border-2 border-white light:border-black bg-[#16161A] light:bg-white text-white light:text-black hover:bg-[#E53E3E] hover:text-white light:hover:bg-[#E53E3E] light:hover:text-white transition-all shadow-bauhaus-sm cursor-pointer"
                aria-label="Next Project"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2. Showcase Grid Layout */}
        {layoutMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-6">
            {PROJECTS.map((project) => (
              <div key={project.id} className="flex flex-col h-full">
                <ProjectCard
                  project={project}
                  isActive={true}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Skills Matrix / How I Work Section */}
      <section className="py-24 md:py-32 px-6 md:px-24 lg:px-32 max-w-7xl mx-auto border-t border-neutral-900 light:border-neutral-200 z-10 relative" id="skills">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.id} className="h-full">
              <FadeInSection className="h-full">
                <button
                  onClick={() => setSelectedSkillCategory(cat.id === selectedSkillCategory ? null : cat.id)}
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
                    <p className="text-[16px] md:text-[18px] text-neutral-400 light:text-neutral-700 leading-relaxed mb-6">
                      {cat.description}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-[#E53E3E] font-black uppercase tracking-wider flex items-center gap-1">
                    <span>{selectedSkillCategory === cat.id ? "Minimize details" : "Explode Technologies"}</span>
                    <ArrowRight className={`w-4 h-4 transform transition-transform ${selectedSkillCategory === cat.id ? "rotate-90" : "group-hover:translate-x-1"}`} />
                  </div>
                </button>
              </FadeInSection>
            </div>
          ))}
        </div>

        {/* Collapsible details panel listing all chips & libraries used */}
        {selectedSkillCategory && (
          <FadeInSection className="mt-8">
            <div className="bg-[#16161A] light:bg-[#fbfbf9] border-2 border-white light:border-black p-6 md:p-8 animate-slide-up shadow-bauhaus">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D69E2E] light:text-[#2B6CB0] block mb-4 font-black">
                [{SKILL_CATEGORIES.find(c => c.id === selectedSkillCategory)?.title.toUpperCase()} PIPELINE STACK]
              </span>
              
              <div className="flex flex-wrap gap-2.5">
                {SKILL_CATEGORIES.find(c => c.id === selectedSkillCategory)?.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-3.5 py-2 bg-black light:bg-[#f5f2eb] border-2 border-neutral-800 light:border-black text-xs uppercase font-mono font-bold"
                  >
                    <span className="w-2 h-2 bg-[#E53E3E]"></span>
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 px-6 md:px-24 lg:px-32 max-w-7xl mx-auto border-t border-neutral-900 light:border-neutral-200 z-10 relative" id="about">
        <FadeInSection className="mb-16">
          <span className="text-[#2B6CB0] font-mono text-xs uppercase tracking-widest font-black block mb-2">
            COMPUTATIONAL CREDENTIALS
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
                I am a developer dedicated to technical precision and academic rigor. My work explores the intersection of high-end browser interfaces and heavy computational intelligence. I believe in software that is functional, fast, and fundamentally logical.
              </p>
              
              <p className="text-[17px] md:text-[19px] text-neutral-400 light:text-slate-650 leading-relaxed font-sans">
                With comprehensive exploration of full-stack integration patterns and machine learning methodologies, I deploy models directly to edge nodes and cloud servers. My builds prioritize zero bloat, high responsiveness, and rigorous telemetry outputs.
              </p>
            </FadeInSection>
          </div>

          {/* Statistics counter panel */}
          <div className="lg:col-span-5 bg-black light:bg-[#fbfbf9] border-2 border-white light:border-black p-8 flex flex-col gap-6 md:flex-row lg:flex-col md:justify-around lg:justify-start shadow-bauhaus">
            <FadeInSection className="flex items-start gap-5">
              <div className="w-11 h-11 bg-black light:bg-[#f5f2eb] text-[#E53E3E] border-2 border-[#E53E3E] flex items-center justify-center font-mono font-black">
                05
              </div>
              <div>
                <h4 className="text-[#E53E3E] text-3xl font-mono font-black leading-none">
                  5+
                </h4>
                <span className="text-[10px] tracking-widest font-mono uppercase text-neutral-400 light:text-neutral-500 mt-1 block font-bold">
                  Core AI Projects
                </span>
              </div>
            </FadeInSection>

            {/* Divider */}
            <div className="h-[2px] w-full bg-neutral-800 light:bg-black hidden lg:block"></div>
            <div className="w-[2px] h-12 bg-neutral-800 light:bg-black hidden md:block lg:hidden"></div>

            <FadeInSection className="flex items-start gap-5">
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
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <Education />

      {/* Get In Touch Section containing the interactive Guestbook */}
      <section className="py-24 md:py-32 px-6 md:px-24 lg:px-32 max-w-7xl mx-auto border-t border-neutral-900 light:border-neutral-200 z-10 relative" id="contact">
        <FadeInSection className="mb-12 text-center">
          <span className="text-[#E53E3E] font-mono text-xs uppercase tracking-widest font-black block mb-2">
            ESTABLISH COMMUNICATION
          </span>
          <h2 className="font-title text-[28px] md:text-[40px] font-black uppercase tracking-tight text-white light:text-black mb-4 text-center">
            Get In Touch
          </h2>
          <div className="w-24 h-2 bg-[#2B6CB0] mx-auto"></div>
          <p className="text-[16px] md:text-[18px] text-neutral-400 light:text-slate-600 max-w-lg mx-auto mt-4 text-center">
            Open for collaborations, technical research opportunities in AI/ML engineering, and premium frontend UI design consulting.
          </p>
        </FadeInSection>

        {/* Contact form combined with guest message loops */}
        <FadeInSection>
          <ContactForm />
        </FadeInSection>

        {/* Hotlink link triggers */}
        <FadeInSection className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center font-mono text-xs uppercase tracking-wider font-semibold">
          <a
            href="mailto:yanshushingala@gmail.com"
            className="flex items-center gap-2 hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-colors"
          >
            <Mail className="w-4 h-4 text-blue-500" />
            <span>yanshushingala@gmail.com</span>
          </a>
          
          <div className="hidden sm:block w-1.5 h-1.5 bg-neutral-800 rounded-full light:bg-slate-300"></div>

          <a
            href="https://github.com/Yanshu04"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-colors"
          >
            <Github className="w-4 h-4 text-gray-500" />
            <span>github.com/Yanshu04</span>
          </a>
        </FadeInSection>
      </section>

      {/* Footer boundary elements */}
      <footer className="bg-[#08080c] light:bg-[#f5f2eb] border-t border-neutral-950 light:border-slate-200 py-16 px-6 md:px-24 lg:px-32 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-400 light:text-slate-500">
          <div className="font-mono text-lg font-bold tracking-tighter uppercase text-white light:text-slate-900">
            YS
          </div>

          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8c909f] light:text-slate-400 text-center md:text-left h-fit leading-none mt-1">
            © 2026 Yanshu Shingala. Built for technical precision.
          </span>

          <div className="flex gap-6 font-mono text-xs uppercase tracking-wider font-bold">
            <a
              href="mailto:yanshushingala@gmail.com"
              className="hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-all underline decoration-blue-500/50 underline-offset-4"
            >
              Email
            </a>
            <a
              href="https://github.com/Yanshu04"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-all underline decoration-blue-500/50 underline-offset-4"
            >
              GitHub
            </a>
            <a
              href="#"
              className="hover:text-[#E53E3E] light:hover:text-[#2B6CB0] transition-all underline decoration-blue-500/50 underline-offset-4"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, SlidersHorizontal, Layers, Sparkles } from "lucide-react";
import { PROJECTS } from "../data";
import ProjectCard from "./ProjectCard";
import FadeInSection, { staggerChildVariants } from "./FadeInSection";

interface ProjectShowcaseSectionProps {
  layoutMode: "carousel" | "grid";
  setLayoutMode: (mode: "carousel" | "grid") => void;
  stageRef: React.RefObject<HTMLDivElement | null>;
  activeIdx: number;
  setActiveIdx: React.Dispatch<React.SetStateAction<number>>;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
}

export default function ProjectShowcaseSection({
  layoutMode,
  setLayoutMode,
  stageRef,
  activeIdx,
  setActiveIdx,
  handleTouchStart,
  handleTouchMove,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
}: ProjectShowcaseSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "AI_ML" | "FRONTEND_AR">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "ALL", label: "All Projects" },
    { id: "AI_ML", label: "AI & ML Engineering" },
    { id: "FRONTEND_AR", label: "Frontend & AR" },
  ] as const;

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory === "AI_ML") {
        matchesCategory = [
          "laika", "vaani", "speech-asr", "ai-resume-analyzer",
          "ai-resume-builder", "house-predictor", "ipl-predication", "ai-planner"
        ].includes(project.id);
      } else if (selectedCategory === "FRONTEND_AR") {
        matchesCategory = ["ar-sketch", "arenahub", "devpulse", "solar-tracker"].includes(project.id);
      }

      // Search filter query
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = project.title.toLowerCase().includes(q);
        const inDesc = project.description.toLowerCase().includes(q);
        const inTags = project.tags.some(tag => tag.toLowerCase().includes(q));
        matchesSearch = inTitle || inDesc || inTags;
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="py-24 md:py-32 px-[8%] md:px-[12%] lg:px-[14%] w-full border-t border-neutral-900 light:border-neutral-200 z-10 relative" id="work">
      {/* Section Title Header */}
      <FadeInSection className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="text-[#E53E3E] font-mono text-xs uppercase tracking-widest font-black block mb-2">
              FULL PROJECT SHOWCASE
            </span>
            <h2 className="font-title text-[28px] md:text-[44px] font-black uppercase tracking-tight text-white light:text-black mb-2">
              Selected Work
            </h2>
            <div className="w-24 h-2 bg-[#2B6CB0]"></div>
          </div>

          {/* Desktop View Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <div className="bg-black light:bg-[#f5f2eb] border-2 border-white light:border-black p-1 font-mono text-xs select-none shadow-bauhaus-sm flex">
              <motion.button
                onClick={() => setLayoutMode("carousel")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-1.5 font-black uppercase tracking-wider transition-all cursor-pointer border-2 ${
                  layoutMode === "carousel"
                    ? "bg-[#E53E3E] text-white border-white light:border-black"
                    : "border-transparent text-neutral-400 hover:text-white light:text-neutral-600 light:hover:text-black"
                }`}
              >
                3D Slider
              </motion.button>
              <motion.button
                onClick={() => setLayoutMode("grid")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-1.5 font-black uppercase tracking-wider transition-all cursor-pointer border-2 ${
                  layoutMode === "grid"
                    ? "bg-[#E53E3E] text-white border-white light:border-black"
                    : "border-transparent text-neutral-400 hover:text-white light:text-neutral-600 light:hover:text-black"
                }`}
              >
                All Projects
              </motion.button>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Category Filter Pills & Live Search Control Bar */}
      <FadeInSection className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#141418] light:bg-[#f8f6f0] border-2 border-white light:border-black p-3 shadow-bauhaus">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs select-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 border-2 uppercase font-black tracking-wider transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-[#E53E3E] text-white border-white light:border-black shadow-bauhaus-sm"
                      : "bg-black light:bg-[#f5f2eb] text-neutral-400 light:text-neutral-700 border-neutral-800 light:border-neutral-300 hover:border-white light:hover:border-black hover:text-white"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative flex items-center min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, title, tags..."
              className="w-full bg-black light:bg-[#f5f2eb] text-white light:text-black font-mono text-xs py-2 pl-9 pr-8 border-2 border-neutral-800 light:border-black focus:outline-none focus:border-[#E53E3E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex justify-between items-center mt-3 px-1 font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-bold">
          <span>SHOWING {filteredProjects.length} OF {PROJECTS.length} PROJECTS</span>
          {searchQuery && (
            <span className="text-[#E53E3E]">Filtered by: "{searchQuery}"</span>
          )}
        </div>
      </FadeInSection>

      {/* 1. Carousel Slider Layout (Mobile or Desktop when carousel selected) */}
      <div className={`relative w-full py-6 ${layoutMode === "carousel" ? "block" : "block md:hidden"}`}>
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
            let diff = idx - activeIdx;
            const len = PROJECTS.length;
            if (diff < -len / 2) diff += len;
            if (diff > len / 2) diff -= len;
            
            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            const isVisible = Math.abs(diff) <= 1;
            
            if (!isVisible) return null;
            
            const cardStyle: React.CSSProperties = isCenter
              ? {
                  transform: "translateX(0) scale(1)",
                  opacity: 1,
                  zIndex: 30,
                }
              : isLeft
              ? {
                  transform: "translateX(-95%) scale(0.85)",
                  opacity: 0.5,
                  zIndex: 10,
                  pointerEvents: "auto",
                }
              : {
                  transform: "translateX(95%) scale(0.85)",
                  opacity: 0.5,
                  zIndex: 10,
                  pointerEvents: "auto",
                };
            
            return (
              <div
                key={project.id}
                onClick={() => {
                  if (!isCenter) setActiveIdx(idx);
                }}
                onWheel={(e) => {
                  if (isCenter) e.stopPropagation();
                }}
                style={cardStyle}
                className={`absolute top-4 sm:top-8 w-full max-w-md px-4 transition-all duration-500 ease-out ${isCenter ? 'max-h-[900px] overflow-y-auto cursor-default' : 'h-auto overflow-hidden cursor-pointer'}`}
              >
                <ProjectCard
                  project={project}
                  isActive={isCenter}
                />
              </div>
            );
          })}
        </div>

        {/* Carousel Control Bar */}
        <div className="flex items-center justify-center gap-6 mt-8 font-mono select-none relative z-20">
          <motion.button
            onClick={() => setActiveIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="p-3 border-2 border-white light:border-black bg-[#16161A] light:bg-white text-white light:text-black hover:bg-[#E53E3E] hover:text-white transition-all shadow-bauhaus-sm cursor-pointer"
            aria-label="Previous Project"
          >
            ←
          </motion.button>
          
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-black light:bg-[#f5f2eb] border-2 border-white light:border-black px-5 py-2.5 shadow-bauhaus-sm">
            <span className="text-[#E53E3E]">0{activeIdx + 1}</span>
            <span className="text-neutral-500">/</span>
            <span>0{PROJECTS.length}</span>
          </div>

          <motion.button
            onClick={() => setActiveIdx((prev) => (prev + 1) % PROJECTS.length)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="p-3 border-2 border-white light:border-black bg-[#16161A] light:bg-white text-white light:text-black hover:bg-[#E53E3E] hover:text-white transition-all shadow-bauhaus-sm cursor-pointer"
            aria-label="Next Project"
          >
            →
          </motion.button>
        </div>
      </div>

      {/* 2. Grid Layout View */}
      {layoutMode === "grid" && (
        <div className="hidden md:block">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-[#141418] light:bg-[#f8f6f0] border-2 border-white light:border-black shadow-bauhaus font-mono p-8">
              <Sparkles className="w-10 h-10 text-[#E53E3E] mx-auto mb-3" />
              <h3 className="text-lg font-black uppercase tracking-wider text-white light:text-black mb-2">
                NO MATCHING PROJECTS FOUND
              </h3>
              <p className="text-xs text-neutral-400 light:text-neutral-600 mb-6">
                Try searching for different terms or reset your active category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 bg-[#E53E3E] text-white font-black uppercase tracking-widest border-2 border-white light:border-black shadow-bauhaus-sm cursor-pointer"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={staggerChildVariants}
                    className="flex flex-col h-full"
                  >
                    <ProjectCard
                      project={project}
                      isActive={true}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}
    </section>
  );
}

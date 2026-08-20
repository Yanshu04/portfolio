import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, ExternalLink, Code, ShieldAlert, Cpu, Activity, Terminal } from "lucide-react";
import { PROJECTS } from "../../data";
import CaseStudy from "../interactive/CaseStudy";
import FadeInSection from "../ui/FadeInSection";

export default function ProjectShowcaseSection() {
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "AI_ML" | "FULL_STACK" | "MOBILE_EDGE">("ALL");
  const [expandedId, setExpandedId] = useState<string | null>("laika");

  const filterButtons = [
    { id: "ALL", label: "[ALL]" },
    { id: "AI_ML", label: "[AI / ML]" },
    { id: "FULL_STACK", label: "[FULL STACK]" },
    { id: "MOBILE_EDGE", label: "[MOBILE / EDGE]" },
  ] as const;

  // Format primary stack display string (bullet separated)
  const getPrimaryStackDisplay = (tags: string[]) => {
    return tags.slice(0, 3).join(" • ");
  };

  // Status designation: PRODUCTION if liveUrl present, otherwise LOCAL / EDGE
  const getStatusDisplay = (project: typeof PROJECTS[0]) => {
    return project.liveUrl ? "● PRODUCTION" : "● LOCAL / EDGE";
  };

  // Filter projects based on category selection
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      if (selectedFilter === "ALL") return true;
      if (selectedFilter === "AI_ML") {
        return ["laika", "vaani", "speech-asr", "ai-resume-analyzer", "ai-resume-builder", "house-predictor", "ipl-predication"].includes(project.id);
      }
      if (selectedFilter === "FULL_STACK") {
        return ["laika", "ai-resume-analyzer", "ai-resume-builder", "arenahub", "devpulse", "ai-planner"].includes(project.id);
      }
      if (selectedFilter === "MOBILE_EDGE") {
        return ["speech-asr", "ar-sketch", "solar-tracker", "vaani"].includes(project.id);
      }
      return true;
    });
  }, [selectedFilter]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto w-full border-t border-neutral-900 light:border-neutral-200 z-10 relative select-none scroll-mt-20" id="work">
      {/* Section Header with Category Filter Buttons */}
      <FadeInSection className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-2 border-neutral-800 light:border-neutral-200">
          <div>
            <span className="text-[#E53E3E] font-mono text-xs uppercase tracking-widest font-black block mb-2">
              FULL PROJECT SHOWCASE
            </span>
            <h2 className="font-title text-[28px] md:text-[44px] font-black uppercase tracking-tight text-white light:text-black mb-2">
              ALL PROJECTS
            </h2>
            <div className="w-24 h-2 bg-[#2B6CB0]"></div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {filterButtons.map((btn) => {
              const isActive = selectedFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => setSelectedFilter(btn.id)}
                  className={`px-3.5 py-1.5 font-black uppercase tracking-wider transition-all cursor-pointer border-2 ${
                    isActive
                      ? "bg-[#2B6CB0] light:bg-[#2B6CB0] text-white border-white light:border-black shadow-bauhaus-sm"
                      : "bg-black light:bg-[#f5f2eb] text-neutral-400 light:text-neutral-700 border-neutral-800 light:border-neutral-300 hover:border-white light:hover:border-black hover:text-white"
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Structured Index Table Container */}
      <FadeInSection>
        <div className="bg-[#16161A] light:bg-[#fbfbf9] border-2 border-white light:border-black shadow-bauhaus font-mono">
          
          {/* Table Column Headers */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b-2 border-neutral-800 light:border-neutral-200 text-[11px] font-mono font-black uppercase tracking-widest text-neutral-400 light:text-neutral-600 bg-black/40 light:bg-[#f0ede6]">
            <div className="col-span-1">INDEX</div>
            <div className="col-span-4">EXPERIMENT TITLE</div>
            <div className="col-span-4">PRIMARY STACK</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-1 text-right">ACTION</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y-2 divide-neutral-850 light:divide-neutral-200">
            {filteredProjects.map((project, idx) => {
              const isExpanded = expandedId === project.id;
              const formattedIndex = `#${(idx + 1).toString().padStart(2, "0")}`;
              const primaryStackStr = getPrimaryStackDisplay(project.tags);
              const statusStr = getStatusDisplay(project);

              return (
                <div key={project.id} className="transition-colors hover:bg-neutral-900/40 light:hover:bg-[#f4f1ea]">
                  {/* Row Header (Clickable Trigger) */}
                  <div
                    onClick={() => toggleExpand(project.id)}
                    className="p-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center cursor-pointer select-none"
                  >
                    {/* INDEX */}
                    <div className="md:col-span-1 text-[#2B6CB0] light:text-[#2B6CB0] font-black text-sm">
                      {formattedIndex}
                    </div>

                    {/* EXPERIMENT TITLE */}
                    <div className="md:col-span-4 font-title text-base md:text-lg font-black uppercase tracking-tight text-white light:text-black">
                      {project.title}
                    </div>

                    {/* PRIMARY STACK */}
                    <div className="md:col-span-4 font-mono text-xs text-neutral-400 light:text-neutral-600 truncate">
                      {primaryStackStr}
                    </div>

                    {/* STATUS */}
                    <div className="md:col-span-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-white light:text-black">
                      <span className={`w-2 h-2 rounded-full ${project.liveUrl ? 'bg-emerald-500' : 'bg-[#2B6CB0]'}`} />
                      <span>{statusStr}</span>
                    </div>

                    {/* ACTION */}
                    <div className="md:col-span-1 text-right font-mono text-xs font-black text-neutral-300 light:text-neutral-700 flex items-center justify-end gap-1.5">
                      <span>{isExpanded ? "[LESS]" : "[MORE]"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#E53E3E]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#2B6CB0]" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t-2 border-neutral-850 light:border-neutral-300 bg-black/60 light:bg-[#f5f2eb] p-6 md:p-8"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                          
                          {/* Left Column: Image Preview & Links */}
                          <div className="lg:col-span-5 flex flex-col gap-4">
                            <div className="overflow-hidden bg-black aspect-video border-2 border-neutral-800 light:border-black relative">
                              <img
                                alt={project.imageAlt}
                                src={project.image}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Action Buttons Row */}
                            <div className="flex flex-wrap gap-3 font-mono text-xs">
                              {project.liveUrl && (
                                <motion.a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.04, y: -2 }}
                                  whileTap={{ scale: 0.96 }}
                                  className="px-4 py-2 bg-[#E53E3E] text-white border-2 border-white light:border-black font-black uppercase tracking-wider shadow-bauhaus-sm flex items-center gap-2 cursor-pointer"
                                >
                                  <span>[LIVE DEMO]</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </motion.a>
                              )}

                              {project.githubUrl && (
                                <motion.a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.04, y: -2 }}
                                  whileTap={{ scale: 0.96 }}
                                  className="px-4 py-2 bg-black light:bg-white text-white light:text-black border-2 border-white light:border-black font-black uppercase tracking-wider shadow-bauhaus-sm flex items-center gap-2 cursor-pointer"
                                >
                                  <span>[REPOSITORY]</span>
                                  <Code className="w-3.5 h-3.5" />
                                </motion.a>
                              )}
                            </div>
                          </div>

                          {/* Right Column: Description & Case Study Tabs */}
                          <div className="lg:col-span-7 space-y-4">
                            <p className="text-sm md:text-[16px] text-neutral-300 light:text-neutral-800 leading-relaxed font-sans font-medium">
                              {project.description}
                            </p>

                            {/* Case Study Tabs (Challenge, Process, Telemetry) */}
                            <CaseStudy project={project} />
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </FadeInSection>
    </section>
  );
}

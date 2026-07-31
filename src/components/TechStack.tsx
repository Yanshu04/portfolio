import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Server, Layout, Database, Sparkles, Layers, CheckCircle2, X, ExternalLink, Info } from "lucide-react";
import { TECH_STACK_GROUPS, TECH_USAGE_DETAILS } from "../data";
import FadeInSection, { staggerChildVariants } from "./FadeInSection";

export default function TechStack() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Category Icon Resolver
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "ai_ml":
        return <Cpu className="w-5 h-5" />;
      case "backend":
        return <Server className="w-5 h-5" />;
      case "frontend":
        return <Layout className="w-5 h-5" />;
      case "databases":
        return <Database className="w-5 h-5" />;
      case "ai_libs":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const totalItemsCount = useMemo(() => {
    return TECH_STACK_GROUPS.reduce((acc, group) => acc + group.items.length, 0);
  }, []);

  const activeDetail = selectedTech ? TECH_USAGE_DETAILS[selectedTech] : null;

  return (
    <section className="py-24 md:py-32 px-[8%] md:px-[12%] lg:px-[14%] w-full border-t border-neutral-900 light:border-neutral-200 z-10 relative" id="tech-stack">
      <FadeInSection className="mb-12">
        <span className="text-[#E53E3E] font-mono text-xs uppercase tracking-widest font-black block mb-2">
          TECHNICAL SKILLS
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-title text-[28px] md:text-[40px] font-black uppercase tracking-tight text-white light:text-black mb-2">
              Technology Stack
            </h2>
            <div className="w-24 h-2 bg-[#2B6CB0]"></div>
          </div>

          <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 light:text-neutral-600 bg-black light:bg-[#f5f2eb] px-4 py-2 border border-neutral-800 light:border-neutral-300 w-fit">
            <span>{totalItemsCount} CORE TECHNOLOGIES & TOOLS</span>
          </div>
        </div>
      </FadeInSection>

      {/* Tech Stack Cards Grid */}
      <FadeInSection staggerChildren={0.08}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_STACK_GROUPS.map((group) => (
            <motion.div
              key={group.id}
              variants={staggerChildVariants}
              className="bg-[#16161A] light:bg-[#fbfbf9] border-2 border-white light:border-black p-6 shadow-bauhaus flex flex-col justify-between"
            >
              <div>
                {/* Card Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800 light:border-neutral-200">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 border-2 border-white light:border-black flex items-center justify-center text-white light:text-black font-black"
                      style={{ backgroundColor: group.accent }}
                    >
                      {getCategoryIcon(group.id)}
                    </div>
                    <h3 className="font-title text-lg font-black uppercase text-white light:text-black tracking-tight">
                      {group.title}
                    </h3>
                  </div>

                  <span className="font-mono text-xs font-black text-neutral-400 light:text-neutral-500">
                    0{group.items.length}
                  </span>
                </div>

                {/* List of Technology Buttons (Clickable for Usage Modal) */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {group.items.map((tech) => (
                    <motion.button
                      key={tech}
                      onClick={() => setSelectedTech(tech)}
                      whileHover={{ scale: 1.06, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      title={`Click to view where ${tech} is used in projects`}
                      className="flex items-center gap-2 px-3 py-1.5 bg-black light:bg-[#f5f2eb] border-2 border-neutral-800 light:border-black hover:border-white light:hover:border-black text-xs font-mono font-bold uppercase text-neutral-200 light:text-neutral-900 cursor-pointer transition-all shadow-bauhaus-sm group"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" style={{ color: group.accent }} />
                      <span>{tech}</span>
                      <Info className="w-3 h-3 text-neutral-500 group-hover:text-white light:group-hover:text-black transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer Tag */}
              <div className="mt-6 pt-4 border-t border-neutral-900 light:border-neutral-200 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                <span>CLICK BUTTON TO EXPLORE USAGE</span>
                <span style={{ color: group.accent }}>● ACTIVE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      {/* Interactive Technology Usage Modal */}
      <AnimatePresence>
        {selectedTech && activeDetail && (
          <div
            onClick={() => setSelectedTech(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121216] light:bg-[#FAF9F6] border-4 border-white light:border-black max-w-2xl w-full max-h-[85vh] flex flex-col shadow-bauhaus relative overflow-hidden"
            >
              {/* Modal Fixed Header */}
              <div className="p-6 sm:p-8 pb-4 border-b-2 border-neutral-800 light:border-neutral-300 flex items-center justify-between bg-[#121216] light:bg-[#FAF9F6] shrink-0">
                <div className="flex items-center gap-3 pr-12">
                  <span
                    className="px-3 py-1 text-xs font-mono font-black uppercase text-white light:text-black border-2 border-white light:border-black shadow-bauhaus-sm whitespace-nowrap"
                    style={{ backgroundColor: activeDetail.accent }}
                  >
                    {activeDetail.category}
                  </span>
                  <h3 className="font-title text-xl sm:text-2xl font-black uppercase text-white light:text-black tracking-tight">
                    {activeDetail.name}
                  </h3>
                </div>

                {/* Close X Button */}
                <button
                  onClick={() => setSelectedTech(null)}
                  className="p-2 bg-black light:bg-[#f5f2eb] border-2 border-white light:border-black text-white light:text-black hover:bg-[#E53E3E] hover:text-white transition-colors cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body Content */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
                {/* Section 1: Where We Use This Technology */}
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E53E3E] light:text-[#2B6CB0] font-black block mb-2">
                    [WHERE THIS TECHNOLOGY IS USED]
                  </span>
                  <p className="text-base sm:text-lg text-neutral-300 light:text-neutral-800 font-sans leading-relaxed bg-black/60 light:bg-[#f5f2eb] p-4 border-l-4 border-[#E53E3E] font-medium">
                    {activeDetail.whereUsed}
                  </p>
                </div>

                {/* Section 2: Projects Built With This Technology */}
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D69E2E] light:text-[#2B6CB0] font-black block mb-4">
                    [PROJECTS BUILT WITH {activeDetail.name.toUpperCase()}] ({activeDetail.projects.length})
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeDetail.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="bg-black light:bg-white border-2 border-neutral-800 light:border-black p-4 flex flex-col justify-between shadow-bauhaus-sm group"
                      >
                        <div>
                          <h4 className="font-title text-base font-black uppercase text-white light:text-black mb-2 group-hover:text-[#E53E3E] transition-colors">
                            {proj.title}
                          </h4>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {proj.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-neutral-900 light:bg-[#f5f2eb] text-[10px] font-mono uppercase font-bold text-neutral-400 light:text-neutral-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <a
                          href="#work"
                          onClick={() => setSelectedTech(null)}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-black uppercase text-[#E53E3E] light:text-[#2B6CB0] hover:underline pt-2 border-t border-neutral-900 light:border-neutral-200"
                        >
                          <span>Explore Project</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Always-Visible Pinned Footer */}
              <div className="p-4 sm:px-8 border-t-2 border-neutral-800 light:border-neutral-300 bg-[#16161C] light:bg-[#f5f2eb] flex items-center justify-between shrink-0">
                <span className="font-mono text-[10px] sm:text-xs uppercase text-neutral-400 light:text-neutral-600 font-bold">
                  TECHNOLOGY PROFILE
                </span>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="px-6 py-2.5 bg-[#E53E3E] text-white font-mono text-xs font-black uppercase tracking-wider border-2 border-white light:border-black shadow-bauhaus-sm cursor-pointer hover:bg-[#c53030] transition-colors"
                >
                  CLOSE DETAILS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

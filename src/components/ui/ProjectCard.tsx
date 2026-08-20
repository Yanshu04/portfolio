import React, { useState } from "react";
import { ExternalLink, Code } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "../../types";
import CaseStudy from "../interactive/CaseStudy";
import ProjectSpecs from "./ProjectSpecs";
import { SkeletonBlock } from "./SkeletonShimmer";

const PROJECT_INDEX: Record<string, string> = {
  laika: "01",
  vaani: "02",
  "speech-asr": "03",
  "ai-resume-analyzer": "04",
  "ai-resume-builder": "05",
  "ar-sketch": "06",
  arenahub: "07",
  "house-predictor": "08",
  "ipl-predication": "09",
  devpulse: "10",
  "ai-planner": "11",
  "solar-tracker": "12",
};

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
  layout?: "vertical" | "horizontal";
}

export default function ProjectCard({ project, isActive = true, layout = "vertical" }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const projectIndex = PROJECT_INDEX[project.id] ?? "00";

  // Map tag names to Bauhaus primary colors for a vibrant look
  const getTagColor = (tag: string, index: number) => {
    const colors = [
      "bg-[#E53E3E] text-white", // Bauhaus Red
      "bg-[#2B6CB0] text-white", // Bauhaus Blue
      "bg-[#D69E2E] text-black", // Bauhaus Yellow
      "bg-neutral-800 text-white light:bg-neutral-200 light:text-black",
    ];
    return colors[index % colors.length];
  };

  if (layout === "horizontal") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 180, damping: 24 }}
        style={{ willChange: "transform, opacity" }}
        className="bg-[#16161A] light:bg-[#fbfbf9] border-2 border-white light:border-black p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 justify-between h-full group shadow-bauhaus select-none"
      >
        {/* Left Column: Image and Tags */}
        <div className="w-full md:w-[42%] flex flex-col justify-start">
          <div className="overflow-hidden bg-black aspect-video border-2 border-neutral-800 light:border-black relative mb-4">
            {!imageLoaded && <SkeletonBlock className="absolute inset-0 z-10" />}
            <img
              alt={project.imageAlt}
              src={project.image}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 hover:scale-[1.02] ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              referrerPolicy="no-referrer"
            />

            {/* Badge indicator on image */}
            <div className="absolute bottom-3 right-3 bg-black text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 border border-neutral-700 light:border-black z-20">
              FEATURED BUILD
            </div>
          </div>

          {/* Render chips below image */}
          {isActive && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, idx) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                  className={`text-[10px] md:text-xs uppercase font-mono font-bold tracking-widest px-2.5 py-1 border border-black/10 ${getTagColor(tag, idx)}`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title, Narrative Case Study, and Links */}
        <div className="w-full md:w-[58%] flex flex-col justify-between">
          <div>
            {/* Project branding title */}
            <h3 className="font-title text-[22px] md:text-[28px] font-black uppercase tracking-tight text-white light:text-black mb-2 flex items-center justify-between">
              <span>{project.title}</span>
              <span className="font-mono text-xs font-bold text-[#E53E3E] light:text-[#2B6CB0]">
                // {projectIndex}
              </span>
            </h3>

            {/* Project description text */}
            <p className="text-sm md:text-[15px] text-neutral-400 light:text-neutral-700 leading-relaxed mb-4 font-sans font-medium">
              {project.description}
            </p>

            {/* Immersive Case Study (Challenge, Process, Telemetry) */}
            {isActive && <CaseStudy project={project} />}
          </div>

          {/* Button list action rows */}
          {isActive && (
            <div className="pt-4 mt-6 border-t border-neutral-800 light:border-neutral-200">
              <div className="flex items-center justify-between text-[12px] md:text-[13px] font-mono">
                {project.liveUrl ? (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, x: 2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="text-[#E53E3E] light:text-[#2B6CB0] hover:underline flex items-center gap-1.5 font-bold uppercase tracking-wider"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                ) : (
                  <span className="text-neutral-500 light:text-neutral-600 italic">Offline Pipeline (No Sandbox)</span>
                )}

                {project.githubUrl ? (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, x: 2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="text-neutral-400 light:text-neutral-600 hover:text-white light:hover:text-black flex items-center gap-1.5 font-bold uppercase tracking-wider"
                  >
                    <span>View Repository</span>
                    <Code className="w-3.5 h-3.5" />
                  </motion.a>
                ) : (
                  <span className="text-neutral-500 italic">Private Repo</span>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Default Vertical Layout (Used in grid showcases)
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      style={{ willChange: "transform, opacity" }}
      className="bg-[#16161A] light:bg-[#fbfbf9] border-2 border-white light:border-black p-6 md:p-8 flex flex-col justify-between h-full group shadow-bauhaus select-none"
    >
      <div>
        {/* Landscape Image with grayscale toggle and heavy border */}
        <div className="mb-6 overflow-hidden bg-black aspect-video border-2 border-neutral-800 light:border-black relative">
          {!imageLoaded && <SkeletonBlock className="absolute inset-0 z-10" />}
          <img
            alt={project.imageAlt}
            src={project.image}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 hover:scale-[1.02] ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            referrerPolicy="no-referrer"
          />

          {/* Badge indicator on image */}
          <div className="absolute bottom-3 right-3 bg-black text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 border border-neutral-700 light:border-black z-20">
            FEATURED BUILD
          </div>
        </div>

        {/* Project branding title */}
        <h3 className="font-title text-[20px] md:text-[24px] font-black uppercase tracking-tight text-white light:text-black mb-2 flex items-center justify-between">
          <span>{project.title}</span>
          <span className="font-mono text-xs font-bold text-[#E53E3E] light:text-[#2B6CB0]">
            // {projectIndex}
          </span>
        </h3>

        {/* Project description text */}
        <p className="text-sm md:text-[15px] text-neutral-400 light:text-neutral-700 leading-relaxed mb-4 font-sans font-medium">
          {project.description}
        </p>

        {/* Immersive Case Study */}
        {isActive && <CaseStudy project={project} />}

        {/* Render chips */}
        {isActive && (
          <div className="flex flex-wrap gap-1.5 mt-5 mb-4">
            {project.tags.map((tag, idx) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
                className={`text-[10px] md:text-xs uppercase font-mono font-bold tracking-widest px-2.5 py-1 border border-black/10 ${getTagColor(tag, idx)}`}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Button list action rows */}
      {isActive && (
        <div className="space-y-4 pt-3 border-t border-neutral-800 light:border-neutral-200">
          <div className="flex items-center justify-between text-[12px] md:text-[13px] font-mono">
            {project.liveUrl ? (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, x: 2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="text-[#E53E3E] light:text-[#2B6CB0] hover:underline flex items-center gap-1.5 font-bold uppercase tracking-wider"
              >
                <span>Launch Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            ) : (
              <span className="text-neutral-500 light:text-neutral-600 italic font-medium">Offline Pipeline</span>
            )}

            {project.githubUrl ? (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, x: 2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="text-neutral-400 light:text-neutral-600 hover:text-white light:hover:text-black flex items-center gap-1.5 font-bold uppercase tracking-wider"
              >
                <span>View Repository</span>
                <Code className="w-3.5 h-3.5" />
              </motion.a>
            ) : (
              <span className="text-neutral-500 italic">Private Repo</span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

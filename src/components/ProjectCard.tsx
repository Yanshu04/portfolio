import { ExternalLink, Code } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
}

export default function ProjectCard({ project, isActive = true }: ProjectCardProps) {

  // Map tag names to Bauhaus primary colors for a vibrant look
  const getTagColor = (tag: string, index: number) => {
    const colors = [
      "bg-[#DC3D24] text-white", // Bauhaus Red
      "bg-[#2E86AB] text-white", // Bauhaus Blue
      "bg-[#E3B448] text-black", // Bauhaus Yellow
      "bg-neutral-800 text-white light:bg-neutral-200 light:text-black",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-[#161619] light:bg-[#fbfbf9] border-2 border-white light:border-black p-6 md:p-8 flex flex-col justify-between h-full group shadow-bauhaus">
      <div>
        {/* Landscape Image with grayscale toggle and heavy border */}
        <div className="mb-6 overflow-hidden bg-black aspect-video border-2 border-neutral-800 light:border-black relative">
          <img
            alt={project.imageAlt}
            src={project.image}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          
          {/* Badge indicator on image */}
          <div className="absolute bottom-3 right-3 bg-black text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 border border-neutral-700 light:border-black">
            LOCAL BUILD
          </div>
        </div>

        {/* Project branding title */}
        <h3 className="font-title text-[22px] md:text-[26px] font-black uppercase tracking-tight text-white light:text-black mb-2 flex items-center justify-between">
          <span>{project.title}</span>
          <span className="font-mono text-xs md:text-sm font-bold text-[#E3B448] light:text-blue-700">
            [PROJ]
          </span>
        </h3>

        {/* Project description text */}
        <p className="text-[16px] md:text-[17px] text-neutral-400 light:text-neutral-700 leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {/* Highlights List */}
        <div className="mb-6 space-y-2">
          <span className="text-xs md:text-sm font-mono uppercase tracking-wider text-neutral-400 light:text-neutral-500 block mb-1 font-bold">
            Core Specifications
          </span>
          <ul className="text-[13px] md:text-[14px] text-neutral-300 light:text-neutral-800 font-mono space-y-1.5 list-none">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="flex gap-2 items-start leading-relaxed font-sans">
                <span className="text-[#DC3D24] light:text-red-600 shrink-0 font-bold font-mono">»</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Specs table */}
        {isActive && (
          <div className="mb-6 grid grid-cols-3 gap-2.5 bg-black light:bg-[#f0ede6] p-3.5 border-2 border-neutral-800 light:border-black">
            {project.specs.map((spec, i) => (
              <div key={i} className="flex flex-col min-w-0">
                <span className="text-xs md:text-sm uppercase text-neutral-500 light:text-neutral-600 tracking-wider font-bold">
                  {spec.label}
                </span>
                <span className="text-xs md:text-sm font-mono font-bold text-white light:text-black break-words leading-tight mt-0.5">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Render chips */}
        {isActive && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            {project.tags.map((tag, idx) => (
              <span
                key={tag}
                className={`text-xs md:text-sm uppercase font-mono font-bold tracking-widest px-2.5 py-1 border border-black/10 ${getTagColor(tag, idx)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Button list action rows */}
      {isActive && (
        <div className="space-y-4">
          {/* Demo and code reference items */}
          <div className="flex items-center justify-between pt-2 text-[12px] md:text-[13px] font-mono">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#adc6ff] light:text-blue-700 hover:text-white light:hover:text-black hover:underline flex items-center gap-1.5 font-bold uppercase tracking-wider"
              >
                <span>View Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-neutral-500 light:text-neutral-600 italic">No External Sandbox</span>
            )}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-400 light:text-neutral-600 hover:text-white light:hover:text-black flex items-center gap-1.5 font-bold uppercase tracking-wider"
              >
                <span>GitHub Src</span>
                <Code className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-neutral-500 italic">Private Repo</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

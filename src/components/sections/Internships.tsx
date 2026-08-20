import React from "react";
import { motion } from "motion/react";
import { Briefcase, CalendarDays, MapPin, ChevronRight, Award, ExternalLink } from "lucide-react";
import FadeInSection, { staggerChildVariants } from "../ui/FadeInSection";

interface Internship {
  id: string;
  num: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  type: "On-site" | "Remote" | "Hybrid";
  status: "Completed" | "In Progress";
  summary: string;
  highlights: string[];
  technologies: string[];
  accent: string;
  certificateUrl?: string;
}

const INTERNSHIPS: Internship[] = [
  {
    id: "sunchaser-structure",
    num: "01",
    role: "AI & Computer Vision Intern",
    company: "Sunchaser Structure Pvt. Ltd.",
    location: "Rajkot, Gujarat, India",
    period: "Jun 2026 – Aug 2026",
    duration: "2 Months",
    type: "On-site",
    status: "Completed",
    summary:
      "Engineered an automated computer vision system to detect surface welding defects on industrial steel components in real time during manufacturing.",
    highlights: [
      "Configured industrial cameras, specialized optical lenses, and LED lighting arrays to ensure precise image acquisition under factory conditions.",
      "Developed custom image processing algorithms using OpenCV to identify uneven weld beads, surface cracks, and seam irregularities.",
      "Integrated an automated alert system to trigger immediate visual and system warnings whenever a defective weld is detected.",
    ],
    technologies: [
      "Computer Vision",
      "OpenCV",
      "Python",
      "Image Processing",
      "Machine Vision Cameras",
      "Industrial Lighting",
    ],
    accent: "#E53E3E",
    certificateUrl: "/certificates/sunchaser_certificate.jpeg",
  },
  {
    id: "dcoded-innovations",
    num: "02",
    role: "Backend Developer Intern",
    company: "Dcoded Innovations LLP",
    location: "Rajkot, Gujarat, India",
    period: "May 2024 – Jun 2024",
    duration: "1 Month",
    type: "On-site",
    status: "Completed",
    summary:
      "Focused on building RESTful API services, server-side business logic, and database integrations for core software applications.",
    highlights: [
      "Developed high-performance async REST API endpoints using FastAPI and Python.",
      "Structured database schemas and wrote optimized SQL queries using MySQL for reliable data persistence.",
      "Tested API endpoints, handled edge cases, and integrated backend services into client workflows.",
    ],
    technologies: ["Python", "FastAPI", "REST APIs", "SQL", "MySQL"],
    accent: "#2B6CB0",
    certificateUrl: "/certificates/dcoded_certificate.pdf",
  },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-[#22543D] text-[#9AE6B4] border-[#276749]",
  "In Progress": "bg-[#744210] text-[#F6E05E] border-[#975A16]",
};

const typeStyles: Record<string, string> = {
  "On-site": "text-[#E53E3E]",
  Remote: "text-[#2B6CB0]",
  Hybrid: "text-[#D69E2E]",
};

export default function Internships() {
  return (
    <section
      className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-12 max-w-7xl mx-auto w-full border-t border-neutral-900 light:border-neutral-200 z-10 relative scroll-mt-20"
      id="experience"
    >
      <FadeInSection className="mb-16">
        <span className="text-[#D69E2E] light:text-[#2B6CB0] font-mono text-xs uppercase tracking-widest font-black block mb-2">
          PROFESSIONAL EXPOSURE
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-title text-[28px] md:text-[40px] font-black uppercase tracking-tight text-white light:text-black mb-4">
              Internship Experience
            </h2>
            <div className="w-24 h-2 bg-[#E53E3E]" />
          </div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 light:text-neutral-600 bg-black light:bg-[#f5f2eb] px-4 py-2 border border-neutral-800 light:border-neutral-300 w-fit flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{INTERNSHIPS.length} Internships Completed</span>
          </div>
        </div>
      </FadeInSection>

      <div className="flex flex-col gap-8">
        {INTERNSHIPS.map((intern) => (
          <FadeInSection key={intern.id} staggerChildren={0.06}>
            <motion.div
              variants={staggerChildVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
              style={{ willChange: "transform, opacity" }}
              className="bg-[#161619] light:bg-[#fbfbf9] border-2 border-white light:border-black p-8 shadow-bauhaus relative overflow-hidden"
            >
              <span
                className="absolute top-0 right-6 font-title text-[120px] md:text-[160px] font-black leading-none select-none pointer-events-none opacity-[0.04]"
                style={{ color: intern.accent }}
              >
                {intern.num}
              </span>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 flex flex-col gap-5">
                  <div>
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span
                        className="font-mono text-xs font-black uppercase px-2 py-0.5 border-2"
                        style={{ color: intern.accent, borderColor: intern.accent }}
                      >
                        {intern.num}
                      </span>
                      <span
                        className={`px-3 py-1 border font-mono text-[10px] font-black uppercase tracking-widest ${statusStyles[intern.status]}`}
                      >
                        {intern.status}
                      </span>
                    </div>

                    <h3 className="font-title text-[20px] md:text-[24px] font-black uppercase tracking-tight text-white light:text-black leading-tight mb-1">
                      {intern.role}
                    </h3>
                    <p
                      className="font-mono text-sm font-black uppercase tracking-widest mb-1"
                      style={{ color: intern.accent }}
                    >
                      {intern.company}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-[11px] font-mono font-bold uppercase text-neutral-400 light:text-neutral-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 shrink-0" style={{ color: intern.accent }} />
                      <span>{intern.period}</span>
                      <span className="text-neutral-600">·</span>
                      <span>{intern.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: intern.accent }} />
                      <span>{intern.location}</span>
                      <span className="text-neutral-600">·</span>
                      <span className={typeStyles[intern.type]}>{intern.type}</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest font-black text-neutral-500 block mb-2">
                      Stack Used
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {intern.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-black light:bg-[#f5f2eb] border border-neutral-700 light:border-neutral-400 font-mono text-[10px] text-neutral-300 light:text-neutral-600 font-bold uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex lg:col-span-1 justify-center">
                  <div className="w-[2px] h-full bg-neutral-800 light:bg-neutral-200" />
                </div>
                <div className="h-[2px] w-full bg-neutral-800 light:bg-neutral-200 lg:hidden" />

                <div className="lg:col-span-7 flex flex-col gap-6">
                  <p
                    className="text-[16px] md:text-[17px] text-neutral-300 light:text-neutral-700 leading-relaxed font-sans border-l-4 pl-5"
                    style={{ borderColor: intern.accent }}
                  >
                    {intern.summary}
                  </p>

                  <div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-widest font-black block mb-3"
                      style={{ color: intern.accent }}
                    >
                      [Key Deliverables]
                    </span>
                    <ul className="space-y-2.5">
                      {intern.highlights.map((hl, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[14px] md:text-[15px] text-neutral-400 light:text-neutral-700 font-sans leading-snug"
                        >
                          <ChevronRight
                            className="w-4 h-4 mt-0.5 shrink-0"
                            style={{ color: intern.accent }}
                          />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {intern.certificateUrl && (
                    <div className="pt-2">
                      <motion.a
                        href={intern.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-black light:bg-white text-white light:text-black border-2 border-neutral-700 light:border-black font-mono text-xs font-black uppercase tracking-wider shadow-bauhaus-sm hover:border-[#E53E3E] hover:text-[#E53E3E] transition-all cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-[#D69E2E]" />
                        <span>View Official Certificate</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </motion.a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}

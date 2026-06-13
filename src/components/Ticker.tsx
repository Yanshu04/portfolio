import React from "react";

const techStack = [
  "PYTHON", "REACT", "TYPESCRIPT", "VITE", "TAILWIND CSS", "MEDIAPIPE", "XGBOOST", "OLLAMA", "WHISPER", "FLASK", "NODE.JS", "DOCKER"
];

export default function Ticker() {
  return (
    <div className="bg-[#E3B448] text-[#121212] border-t-2 border-b-2 border-white light:border-black py-4 overflow-hidden relative select-none z-10">
      <div className="flex whitespace-nowrap overflow-hidden">
        {/* Repeating key technologies for loop */}
        <div className="animate-marquee flex gap-12 items-center px-4 font-mono font-black text-sm sm:text-base tracking-[0.2em]">
          {[...techStack, ...techStack, ...techStack].map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-3"
            >
              <span className="w-2.5 h-2.5 bg-[#DC3D24] shrink-0" />
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

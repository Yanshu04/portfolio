import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

interface GizmoWelcomeIntroProps {
  onEnter: () => void;
  darkMode: boolean;
}

// 16x22 pixel grid for Gizmo
const ACCENT = "#F6E05E";  // Yellow hoodie
const SKIN = "#F4C99B";    // Human skin tone
const OUTLINE = "#0F1115"; // Outlines
const HAIR = "#6A4E35";    // Brown hair
const JEANS = "#1A202C";   // Jeans
const SHOES = "#FAF9F6";   // Shoes

const COLORS: Record<number, string> = {
  1: HAIR,
  2: SKIN,
  3: OUTLINE,
  4: ACCENT,
  5: JEANS,
  6: SHOES,
  7: OUTLINE,
};

const BASE_FRAME = [
  [0,0,0,0,0,0,7,7,7,7,7,0,0,0,0,0],
  [0,0,0,7,7,7,1,1,1,1,1,7,7,7,0,0],
  [0,0,7,1,1,1,1,1,1,1,1,1,1,1,7,0],
  [0,7,1,1,1,1,1,1,1,1,1,1,1,1,1,7],
  [0,7,1,1,2,2,2,2,2,2,2,2,1,1,1,7],
  [0,7,1,2,2,2,2,2,2,2,2,2,2,1,1,7],
  [0,7,2,2,2,3,2,2,2,2,3,2,2,2,7,0],
  [0,7,2,2,2,3,2,2,2,2,3,2,2,2,7,0],
  [0,7,2,2,2,2,2,2,2,2,2,2,2,2,7,0],
  [0,7,2,2,3,2,2,2,2,2,2,3,2,2,7,0],
  [0,7,2,2,2,3,3,3,3,3,3,2,2,2,7,0],
  [0,0,7,2,2,2,2,2,2,2,2,2,2,7,0,0],
  [0,0,0,7,7,7,7,7,7,7,7,7,7,0,0,0],
  [0,0,7,4,4,4,4,4,4,4,4,4,4,7,0,0],
  [0,7,4,4,4,4,4,4,4,4,4,4,4,4,7,0],
  [0,7,2,4,4,4,4,4,4,4,4,4,4,2,7,0],
  [0,0,7,7,4,4,4,4,4,4,4,4,7,7,0,0],
  [0,0,0,7,5,5,5,7,7,5,5,5,7,0,0,0],
  [0,0,0,7,5,5,7,0,0,7,5,5,7,0,0,0],
  [0,0,0,7,5,5,7,0,0,7,5,5,7,0,0,0],
  [0,0,0,7,5,5,7,0,0,7,5,5,7,0,0,0],
  [0,0,0,7,6,6,7,0,0,7,6,6,7,0,0,0],
];

// Generate Wave Frame 1 (Hand raised to shoulder level)
const FRAME_WAVE_1 = BASE_FRAME.map(row => [...row]);
FRAME_WAVE_1[15][13] = 0;
FRAME_WAVE_1[14][14] = 7;
FRAME_WAVE_1[14][13] = 4;
FRAME_WAVE_1[13][13] = 2;

// Generate Wave Frame 2 (Hand raised higher waving outward)
const FRAME_WAVE_2 = BASE_FRAME.map(row => [...row]);
FRAME_WAVE_2[15][13] = 0;
FRAME_WAVE_2[14][14] = 7;
FRAME_WAVE_2[14][13] = 4;
FRAME_WAVE_2[12][13] = 2;

export default function GizmoWelcomeIntro({ onEnter, darkMode }: GizmoWelcomeIntroProps) {
  const [waveStep, setWaveStep] = useState(0);
  const [greetingStage, setGreetingStage] = useState(0);

  const greetings = [
    "Hi! Welcome! 👋",
    "Initializing Portfolio Pipeline... ⚡",
    "Let's Explore Yanshu's Work! 🚀"
  ];

  // Waving animation loop (cycles every 160ms)
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWaveStep((prev) => (prev === 0 ? 1 : 0));
    }, 160);
    return () => clearInterval(waveInterval);
  }, []);

  // Cycle text greeting messages
  useEffect(() => {
    const t1 = setTimeout(() => setGreetingStage(1), 900);
    const t2 = setTimeout(() => setGreetingStage(2), 1800);
    const t3 = setTimeout(() => onEnter(), 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onEnter]);

  const CELL_SIZE = 8;
  const activeFrame = waveStep === 0 ? FRAME_WAVE_1 : FRAME_WAVE_2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.92, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity" }}
      className={`fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 ${
        darkMode ? "bg-[#0B0B0C]" : "bg-[#FAF9F6]"
      } bg-grid-pattern select-none`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
        className="flex flex-col items-center space-y-6 relative z-10"
      >
        {/* Animated Waving Speech Bubble */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="px-5 py-2.5 border-2 border-black bg-white text-black font-mono text-xs sm:text-sm font-black uppercase tracking-widest relative shadow-bauhaus-sm"
        >
          <motion.span
            key={greetingStage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E53E3E]" />
            <span>{greetings[greetingStage]}</span>
          </motion.span>
          
          {/* Speech Bubble Arrow */}
          <div className="absolute bottom-[-6px] left-[50%] translate-x-[-50%] w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-black rotate-45" />
        </motion.div>

        {/* Animated Waving Gizmo Character Card */}
        <motion.div
          whileHover={{ scale: 1.04, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="p-5 rounded-xl border-3 border-black bg-[#16161A] light:bg-white shadow-bauhaus cursor-pointer"
          style={{
            filter: darkMode
              ? "drop-shadow(2px 2px 0px #FAF9F6) drop-shadow(-2px -2px 0px #FAF9F6)"
              : "drop-shadow(2px 2px 0px #0B0B0C)"
          }}
          onClick={onEnter}
        >
          <svg
            viewBox={`0 0 ${16 * CELL_SIZE} ${22 * CELL_SIZE}`}
            width={16 * CELL_SIZE}
            height={22 * CELL_SIZE}
            shapeRendering="crispEdges"
          >
            {activeFrame.map((row, y) =>
              row.map((c, x) => {
                if (c === 0) return null;
                return (
                  <rect
                    key={`${x}-${y}`}
                    x={x * CELL_SIZE}
                    y={y * CELL_SIZE}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    fill={COLORS[c]}
                  />
                );
              })
            )}
          </svg>
        </motion.div>

        {/* Enter Button Action */}
        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="mt-2 px-6 py-2.5 bg-[#E53E3E] text-white font-mono text-xs font-black uppercase tracking-widest border-2 border-white light:border-black shadow-bauhaus-sm flex items-center gap-2 cursor-pointer"
        >
          <span>ENTER PORTFOLIO</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {/* Auto Progress Bar */}
        <div className="w-44 h-1.5 bg-neutral-900 light:bg-neutral-300 border border-black overflow-hidden relative mt-2">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.7, ease: "linear" }}
            className="h-full bg-[#E53E3E]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

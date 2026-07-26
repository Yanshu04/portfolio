import React, { useState, useEffect } from "react";

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
FRAME_WAVE_1[15][13] = 0; // remove low hand
FRAME_WAVE_1[14][14] = 7; // add outline for raised sleeve
FRAME_WAVE_1[14][13] = 4; // yellow sleeve
FRAME_WAVE_1[13][13] = 2; // hand skin color

// Generate Wave Frame 2 (Hand raised higher waving outward)
const FRAME_WAVE_2 = BASE_FRAME.map(row => [...row]);
FRAME_WAVE_2[15][13] = 0; // remove low hand
FRAME_WAVE_2[14][14] = 7;
FRAME_WAVE_2[14][13] = 4; // yellow sleeve
FRAME_WAVE_2[12][13] = 2; // hand raised even higher

export default function GizmoWelcomeIntro({ onEnter, darkMode }: GizmoWelcomeIntroProps) {
  const [waveStep, setWaveStep] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  // Waving animation loop (cycles every 160ms)
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWaveStep((prev) => (prev === 0 ? 1 : 0));
    }, 160);
    return () => clearInterval(waveInterval);
  }, []);

  // Automatic page entrance timeout after 2.4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        onEnter();
      }, 350); // let fade animation finish
    }, 2400);

    return () => clearTimeout(timer);
  }, [onEnter]);

  const CELL_SIZE = 8;
  const activeFrame = waveStep === 0 ? FRAME_WAVE_1 : FRAME_WAVE_2;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 transition-all duration-300 ${
        isLeaving ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      } ${
        darkMode ? "bg-[#0B0B0C]" : "bg-[#FAF9F6]"
      } bg-grid-pattern`}
    >
      <div className="flex flex-col items-center space-y-6 relative z-10">
        
        {/* Waving Speech Bubble */}
        <div 
          className="px-4 py-2 border-2 border-black bg-white text-black font-mono text-xs font-black uppercase tracking-widest relative"
          style={{
            boxShadow: "3px 3px 0px 0px #000",
            animation: "bubble-bounce 1s ease-in-out infinite",
          }}
        >
          <span>Hi! Welcome! 👋</span>
          
          {/* Speech Bubble Arrow */}
          <div 
            className="absolute bottom-[-6px] left-[50%] translate-x-[-50%] w-2.5 h-2.5 bg-white border-r-2 border-b-2 border-black rotate-45"
          />
        </div>

        {/* Animated Waving Gizmo */}
        <div
          className="p-4 rounded-xl border-3 border-black bg-[#16161A] light:bg-white shadow-bauhaus"
          style={{
            filter: darkMode
              ? "drop-shadow(2px 2px 0px #FAF9F6) drop-shadow(-2px -2px 0px #FAF9F6)"
              : "drop-shadow(2px 2px 0px #0B0B0C)"
          }}
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
        </div>

      </div>

      <style>{`
        @keyframes bubble-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

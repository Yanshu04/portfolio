import React, { useEffect, useState, useRef } from "react";
import { Sun, Moon, Sunrise, Sliders, Play, Pause, RotateCcw } from "lucide-react";

// ==========================================
// PIXEL ART SHIPS MATRICES (28 columns x 10 rows)
// 0 = transparent, 1 = flag/mast accent (yellow/orange), 2 = white cabin, 
// 3 = window, 4 = cargo red/orange, 5 = cargo blue, 6 = cargo green/teal,
// 7 = hull base, 8 = mast pole (light gray), 9 = cargo wood/brown, 10 = deck piping (gray)
// ==========================================

const COLOR_MAP: Record<number, string> = {
  1: "#E3B448", // Mast flag (gold)
  2: "#FAF9F6", // Cabin (warm white)
  3: "#0F1115", // Window (black)
  4: "#E53E3E", // Cargo red
  5: "#2B6CB0", // Cargo blue
  6: "#319795", // Cargo green
  7: "#1A2530", // Hull primary (dark blue-gray)
  8: "#A0AEC0", // Mast pole (gray)
  9: "#DD6B20", // Cargo orange-brown
  10: "#718096", // Deck pipes
};

// Container Ship (Ship 1)
const SHIP_CONTAINER = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [2,3,2,0,4,4,4,4,5,5,5,5,6,6,6,6,4,4,4,4,5,5,5,5,0,0,0,0], 
  [2,2,2,0,5,5,5,5,6,6,6,6,4,4,4,4,5,5,5,5,6,6,6,6,0,0,0,0], 
  [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0], 
  [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7], 
  [0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0], 
  [0,0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0,0], 
];

// Bulk Carrier (Ship 2)
const SHIP_BULK = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [2,3,2,0,0,0,9,9,0,0,0,9,9,0,0,0,9,9,0,0,0,9,9,0,0,0,0,0], 
  [2,2,2,0,0,9,9,9,9,0,9,9,9,9,0,9,9,9,9,0,9,9,9,9,0,0,0,0], 
  [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0], 
  [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7], 
  [0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0], 
  [0,0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0,0], 
];

// Oil Tanker (Ship 3)
const SHIP_TANKER = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
  [2,3,2,0,0,0,0,0,0,4,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0], 
  [2,2,2,0,10,10,10,10,10,8,10,10,10,10,10,10,10,8,10,10,10,10,10,10,0,0,0,0], 
  [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0], 
  [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7], 
  [0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0], 
  [0,0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,0,0], 
];

const SHIP_TYPES = [
  { name: "Container Ship", matrix: SHIP_CONTAINER, color: "#1E3A8A" },
  { name: "Bulk Carrier", matrix: SHIP_BULK, color: "#1F2937" },
  { name: "Oil Tanker", matrix: SHIP_TANKER, color: "#065F46" },
];

// Helper to render ship SVG
function RenderShipSVG({ matrix, scale = 1.8, flip = false, activeColor }: { matrix: number[][], scale?: number, flip?: boolean, activeColor?: string }) {
  const pixelSize = 2.5; // size of each pixel rect
  const cols = matrix[0].length;
  const rows = matrix.length;
  const width = cols * pixelSize;
  const height = rows * pixelSize;

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      width={width * scale} 
      height={height * scale} 
      shapeRendering="crispEdges"
      style={{
        transform: flip ? "scaleX(-1)" : "none",
        imageRendering: "pixelated",
      }}
    >
      {matrix.map((row, y) =>
        row.map((c, x) => {
          if (c === 0) return null;
          let fill = COLOR_MAP[c];
          if (c === 7 && activeColor) {
            // Apply customized hull color if provided
            fill = activeColor;
          }
          return (
            <rect 
              key={`${x}-${y}`} 
              x={x * pixelSize} 
              y={y * pixelSize} 
              width={pixelSize} 
              height={pixelSize} 
              fill={fill} 
            />
          );
        })
      )}
    </svg>
  );
}

// Wave pattern path generator
// Simulates the pixelated diagonal waves from the reference image
function WaveLayer({ 
  width = 2000, 
  yOffset = 0, 
  waveColor = "#DCD7C9", 
  scrollOffset = 0 
}: { 
  width?: number; 
  yOffset?: number; 
  waveColor?: string; 
  scrollOffset?: number; 
}) {
  const wavePatternWidth = 64; // repeat block size
  const totalSegments = Math.ceil(width / wavePatternWidth) + 2;
  const paths: string[] = [];

  for (let s = -1; s < totalSegments; s++) {
    const xBase = s * wavePatternWidth + scrollOffset;
    
    // Create pixel steps for the wave crest
    // Matches the reference:   ..  ..  ..  
    //                        ... ... ... 
    paths.push(
      `M ${xBase} ${yOffset + 12} 
       h 8 v -4 h 4 v -4 h 8 v 4 h 4 v 4 h 8 v 4 h -32 Z`
    );
  }

  return (
    <path 
      d={paths.join(" ")} 
      fill={waveColor} 
      shapeRendering="crispEdges"
      className="transition-all duration-300"
    />
  );
}

// ==========================================
// MAIN PIXEL OCEAN COMPONENT
// ==========================================

interface PixelOceanProps {
  embeddedMode?: boolean; // If true, strips out full-page wrapper card styles
}

export default function PixelOcean({ embeddedMode = false }: PixelOceanProps) {
  // Config states
  const [timeOfDay, setTimeOfDay] = useState<"day" | "sunset" | "night">("day");
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.2);
  const [waveIntensity, setWaveIntensity] = useState<number>(3); // wave count or height offset
  const [shipCount, setShipCount] = useState<number>(3);
  const [sailingDirection, setSailingDirection] = useState<"left" | "right">("left");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(!embeddedMode);

  // Ship movement positions
  const [shipPositions, setShipPositions] = useState([
    { id: 1, type: 0, x: 80, y: 35, speed: 0.04, size: 2.0, color: "#1F2937" },
    { id: 2, type: 1, x: 45, y: 55, speed: 0.03, size: 1.8, color: "#132B4F" },
    { id: 3, type: 2, x: 15, y: 72, speed: 0.025, size: 2.2, color: "#065F46" },
  ]);

  // Wave offset positions for scrolling
  const [waveOffsets, setWaveOffsets] = useState([0, 0, 0]);

  // Animation frame ref
  const animationRef = useRef<number | null>(null);

  // Time of Day themes
  const themes = {
    day: {
      bg: "#FAF9F6", // Warm paper
      skyGlow: "rgba(227, 180, 72, 0.05)",
      sunColor: "#E3B448",
      waveColor: "#E2E0D5",
      waveShadow: "#D1CFC2",
      border: "#0F1115",
      titleColor: "#0F1115",
    },
    sunset: {
      bg: "#FBD38D", // Warm orange
      skyGlow: "radial-gradient(circle at 70% 30%, #ED8936 0%, #FBD38D 70%)",
      sunColor: "#DD6B20",
      waveColor: "#C05621",
      waveShadow: "#9C4221",
      border: "#0F1115",
      titleColor: "#2D3748",
    },
    night: {
      bg: "#0B0B0C", // Deep rich dark
      skyGlow: "radial-gradient(circle at 30% 20%, #1A202C 0%, #0B0B0C 80%)",
      sunColor: "#E2E8F0", // Moon
      waveColor: "#2D3748",
      waveShadow: "#1A202C",
      border: "#FAF9F6",
      titleColor: "#FAF9F6",
    }
  };

  const activeTheme = themes[timeOfDay];

  // Update positions in an animation loop
  useEffect(() => {
    let lastTime = performance.now();

    const updateLoop = (now: number) => {
      if (!isPlaying) {
        lastTime = now;
        animationRef.current = requestAnimationFrame(updateLoop);
        return;
      }

      const delta = (now - lastTime) / 16.666; // normalize to 60fps
      lastTime = now;

      // Update waves scrolling offsets
      setWaveOffsets((prev) => [
        (prev[0] + 0.3 * speedMultiplier * delta) % 64,
        (prev[1] + 0.6 * speedMultiplier * delta) % 64,
        (prev[2] + 1.0 * speedMultiplier * delta) % 64,
      ]);

      // Update ships horizontal position
      setShipPositions((prevShips) =>
        prevShips.map((ship) => {
          let nextX = ship.x;
          // Calculate movement increment
          const step = ship.speed * speedMultiplier * delta;

          if (sailingDirection === "left") {
            nextX -= step;
            // Wrap around to right side when off-screen
            if (nextX < -25) {
              nextX = 110;
            }
          } else {
            nextX += step;
            // Wrap around to left side when off-screen
            if (nextX > 115) {
              nextX = -20;
            }
          }

          return { ...ship, x: nextX };
        })
      );

      animationRef.current = requestAnimationFrame(updateLoop);
    };

    animationRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speedMultiplier, sailingDirection]);

  // Handle resets
  const handleReset = () => {
    setShipPositions([
      { id: 1, type: 0, x: 80, y: 35, speed: 0.04, size: 2.0, color: "#1F2937" },
      { id: 2, type: 1, x: 45, y: 55, speed: 0.03, size: 1.8, color: "#132B4F" },
      { id: 3, type: 2, x: 15, y: 72, speed: 0.025, size: 2.2, color: "#065F46" },
    ]);
    setWaveOffsets([0, 0, 0]);
  };

  const renderContent = () => {
    return (
      <div className="w-full select-none">
        {/* Sky + Ocean Screen Canvas */}
        <div 
          className="relative h-60 w-full overflow-hidden border-2 border-neutral-900 transition-colors duration-500 shadow-inner"
          style={{ 
            backgroundColor: activeTheme.bg,
            borderColor: activeTheme.border,
            background: timeOfDay === "sunset" || timeOfDay === "night" ? activeTheme.skyGlow : activeTheme.bg
          }}
        >
          {/* Celestial Body (Sun/Moon) */}
          <div 
            className="absolute rounded-full transition-all duration-700 ease-in-out"
            style={{
              width: timeOfDay === "night" ? "36px" : "48px",
              height: timeOfDay === "night" ? "36px" : "48px",
              backgroundColor: activeTheme.sunColor,
              top: timeOfDay === "sunset" ? "80px" : "32px",
              right: timeOfDay === "night" ? "70%" : "15%",
              boxShadow: timeOfDay === "night" ? "0 0 15px rgba(255,255,255,0.2)" : "none",
              clipPath: timeOfDay === "night" ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" : "none", // could make a crescent but simple circles fit pixel aesthetic well
              border: `2px solid ${activeTheme.border}`,
            }}
          />

          {/* Clouds or Twinkling Stars depending on Day/Night */}
          {timeOfDay === "night" ? (
            <>
              <div className="absolute top-6 left-[10%] w-1.5 h-1.5 bg-white opacity-40 animate-pulse"></div>
              <div className="absolute top-12 left-[45%] w-1 h-1 bg-white opacity-60 animate-pulse"></div>
              <div className="absolute top-8 left-[75%] w-1.5 h-1.5 bg-white opacity-50 animate-pulse"></div>
              <div className="absolute top-16 left-[85%] w-1 h-1 bg-white opacity-30 animate-pulse"></div>
            </>
          ) : (
            <>
              {/* Pixel Art Cloud 1 */}
              <div className="absolute top-10 left-[20%] opacity-20">
                <svg viewBox="0 0 24 8" width="48" height="16" fill={activeTheme.border}>
                  <rect x="4" y="0" width="12" height="2" />
                  <rect x="2" y="2" width="20" height="2" />
                  <rect x="0" y="4" width="24" height="4" />
                </svg>
              </div>
              {/* Pixel Art Cloud 2 */}
              <div className="absolute top-6 left-[65%] opacity-20">
                <svg viewBox="0 0 16 6" width="32" height="12" fill={activeTheme.border}>
                  <rect x="4" y="0" width="8" height="2" />
                  <rect x="2" y="2" width="12" height="2" />
                  <rect x="0" y="4" width="16" height="2" />
                </svg>
              </div>
            </>
          )}

          {/* SVG Parallax Waves and Ships container */}
          <div className="absolute bottom-0 w-full h-32">
            <svg width="100%" height="100%" preserveAspectRatio="none">
              
              {/* LAYER 1: Background Waves (Slowest, Lightest) */}
              <WaveLayer 
                width={2000} 
                yOffset={10} 
                waveColor={activeTheme.waveShadow} 
                scrollOffset={-waveOffsets[0]} 
              />
              <WaveLayer 
                width={2000} 
                yOffset={14} 
                waveColor={activeTheme.waveColor} 
                scrollOffset={-waveOffsets[0] * 1.1} 
              />

              {/* SHIP 3 (Oil Tanker) - sailing on background layer */}
              {shipCount >= 3 && (
                <foreignObject
                  x={`${shipPositions[2].x}%`}
                  y={40}
                  width={200}
                  height={80}
                  className="overflow-visible"
                >
                  <div className="transition-all duration-300">
                    <RenderShipSVG 
                      matrix={SHIP_TYPES[shipPositions[2].type].matrix} 
                      scale={shipPositions[2].size} 
                      flip={sailingDirection === "right"}
                      activeColor={shipPositions[2].color}
                    />
                  </div>
                </foreignObject>
              )}

              {/* LAYER 2: Midground Waves */}
              <WaveLayer 
                width={2000} 
                yOffset={35} 
                waveColor={activeTheme.waveShadow} 
                scrollOffset={-waveOffsets[1]} 
              />
              <WaveLayer 
                width={2000} 
                yOffset={40} 
                waveColor={activeTheme.waveColor} 
                scrollOffset={-waveOffsets[1] * 1.1} 
              />

              {/* SHIP 2 (Bulk Carrier) */}
              {shipCount >= 2 && (
                <foreignObject
                  x={`${shipPositions[1].x}%`}
                  y={60}
                  width={200}
                  height={80}
                  className="overflow-visible"
                >
                  <div className="transition-all duration-300">
                    <RenderShipSVG 
                      matrix={SHIP_TYPES[shipPositions[1].type].matrix} 
                      scale={shipPositions[1].size} 
                      flip={sailingDirection === "right"}
                      activeColor={shipPositions[1].color}
                    />
                  </div>
                </foreignObject>
              )}

              {/* LAYER 3: Foreground Waves (Fastest, Frontmost) */}
              <WaveLayer 
                width={2000} 
                yOffset={65} 
                waveColor={activeTheme.waveShadow} 
                scrollOffset={-waveOffsets[2]} 
              />
              <WaveLayer 
                width={2000} 
                yOffset={70} 
                waveColor={activeTheme.waveColor} 
                scrollOffset={-waveOffsets[2] * 1.1} 
              />

              {/* SHIP 1 (Container Ship) - Foreground */}
              {shipCount >= 1 && (
                <foreignObject
                  x={`${shipPositions[0].x}%`}
                  y={85}
                  width={200}
                  height={80}
                  className="overflow-visible"
                >
                  <div className="transition-all duration-300">
                    <RenderShipSVG 
                      matrix={SHIP_TYPES[shipPositions[0].type].matrix} 
                      scale={shipPositions[0].size} 
                      flip={sailingDirection === "right"}
                      activeColor={shipPositions[0].color}
                    />
                  </div>
                </foreignObject>
              )}

              {/* Extra foreground wave to lock the bottom border */}
              <rect x="0" y="110" width="100%" height="20" fill={activeTheme.waveColor} />
            </svg>
          </div>
        </div>

        {/* Dashboard Interactive Controls */}
        {showControls && (
          <div className="p-4 bg-neutral-900 border-2 border-t-0 border-neutral-900 text-white font-mono text-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-3">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                Simulation Controls
              </span>
              
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-3 py-1.5 flex items-center gap-1.5 border-2 text-[10px] uppercase font-black transition-all cursor-pointer shadow-sm ${
                    isPlaying 
                      ? "bg-amber-600 text-white border-amber-600" 
                      : "bg-emerald-600 text-white border-emerald-600"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-white" />
                      <span>PAUSE ANIMATION</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>START ANIMATION</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 flex items-center gap-1.5 border-2 border-neutral-700 bg-neutral-800 hover:text-white transition-all text-[10px] uppercase font-black cursor-pointer"
                  title="Reset ship starting coordinates"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET COORDINATES</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-1">
              
              {/* Col 1: Time of Day Selector */}
              <div>
                <span className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-2 font-bold">
                  Ambient Environment
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: "day", label: "Day", icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
                    { id: "sunset", label: "Sunset", icon: <Sunrise className="w-3.5 h-3.5 text-orange-500" /> },
                    { id: "night", label: "Night", icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTimeOfDay(t.id as any)}
                      className={`py-2 px-1 border flex flex-col items-center gap-1.5 transition-all text-[10px] uppercase cursor-pointer ${
                        timeOfDay === t.id
                          ? "bg-neutral-800 border-amber-500 text-amber-400 font-bold"
                          : "border-neutral-800 bg-[#16161A] text-neutral-400 hover:text-white"
                      }`}
                    >
                      {t.icon}
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Col 2: Sailing Direction */}
              <div>
                <span className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-2 font-bold">
                  Sailing Direction
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "left", label: "← Westbound" },
                    { id: "right", label: "Eastbound →" },
                  ].map((dir) => (
                    <button
                      key={dir.id}
                      onClick={() => setSailingDirection(dir.id as any)}
                      className={`py-2 px-2 border text-center transition-all text-[10px] uppercase cursor-pointer ${
                        sailingDirection === dir.id
                          ? "bg-neutral-800 border-amber-500 text-amber-400 font-bold"
                          : "border-neutral-800 bg-[#16161A] text-neutral-400 hover:text-white"
                      }`}
                    >
                      {dir.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Col 3: Speed Multiplier */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1.5 font-bold">
                    Engines Speed: <span className="text-amber-400">{speedMultiplier.toFixed(1)}x</span>
                  </span>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.2"
                    value={speedMultiplier}
                    onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="mt-2.5">
                  <span className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1 font-bold">
                    Active Fleet Count: <span className="text-amber-400">{shipCount}</span>
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setShipCount(num)}
                        className={`py-1 border text-center transition-all text-[10px] cursor-pointer ${
                          shipCount === num
                            ? "bg-neutral-800 border-amber-500 text-amber-400 font-bold"
                            : "border-neutral-800 bg-[#16161A] text-neutral-400 hover:text-white"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Col 4: Fleet Composition info */}
              <div className="bg-[#13131A] p-2.5 border border-neutral-800 text-[10px] text-neutral-400 leading-relaxed">
                <span className="text-white font-bold block mb-1">FLEET TELEMETRY:</span>
                <div>• Ship 1 (Container): Fast, light hull</div>
                <div>• Ship 2 (Bulk Carrier): Med speed, heavy cargo</div>
                <div>• Ship 3 (Oil Tanker): Slowest, long deck structure</div>
              </div>

            </div>
          </div>
        )}
      </div>
    );
  };

  if (embeddedMode) {
    return renderContent();
  }

  return (
    <div className="w-full bg-[#16161A] border-2 border-white light:border-black p-6 shadow-bauhaus transition-all duration-300">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
        <div>
          <h3 className="font-mono text-sm font-black uppercase text-white tracking-widest flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "10s" }} /> 
            Pixel Ocean Simulator
          </h3>
          <span className="text-[9px] text-neutral-500 font-mono tracking-widest block uppercase mt-0.5">
            Vectorized CSS/SVG Parallax Cartoon Rendering
          </span>
        </div>
        <button
          onClick={() => setShowControls(!showControls)}
          className="text-[10px] font-mono border-2 border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white px-2.5 py-1 uppercase font-bold cursor-pointer"
        >
          {showControls ? "Hide Parameters" : "Edit Parameters"}
        </button>
      </div>

      {renderContent()}
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "motion/react";
import GizmoStation, { OUTFIT_PALETTES, type OutfitKey, type VehicleId } from "./GizmoStation";

// Floating pixel-sprite mascot — 16-bit human style (brown hair, skin, blue shirt, dark jeans, boots)
// No image assets — built from SVG & crisp edges so it's fully self-contained.

const SKIN    = "#F4C99B";
const OUTLINE = "#0F1115";
const HAIR    = "#6A4E35";

// Build dynamic COLORS map from the active outfit palette
function buildColors(outfitKey: OutfitKey): Record<number, string> {
  const pal = OUTFIT_PALETTES[outfitKey];
  return {
    1: HAIR,
    2: SKIN,
    3: OUTLINE,
    4: pal.top,
    5: pal.jeans,
    6: pal.shoes,
    7: OUTLINE,
  };
}

// 16x22 pixel grid representing the human character (idle pose)
const FRAME_OPEN = [
  [0,0,0,0,0,0,7,7,7,7,7,0,0,0,0,0], // 0: Hair top
  [0,0,0,7,7,7,1,1,1,1,1,7,7,7,0,0], // 1: Hair
  [0,0,7,1,1,1,1,1,1,1,1,1,1,1,7,0], // 2: Hair sides
  [0,7,1,1,1,1,1,1,1,1,1,1,1,1,1,7], // 3: Hair
  [0,7,1,1,2,2,2,2,2,2,2,2,1,1,1,7], // 4: Face top / hair boundary
  [0,7,1,2,2,2,2,2,2,2,2,2,2,1,1,7], // 5: Forehead
  [0,7,2,2,2,3,2,2,2,2,3,2,2,2,7,0], // 6: Eyes
  [0,7,2,2,2,3,2,2,2,2,3,2,2,2,7,0], // 7: Eyes
  [0,7,2,2,2,2,2,2,2,2,2,2,2,2,7,0], // 8: Nose area
  [0,7,2,2,3,2,2,2,2,2,2,3,2,2,7,0], // 9: Smile corners
  [0,7,2,2,2,3,3,3,3,3,3,2,2,2,7,0], // 10: Smile bottom
  [0,0,7,2,2,2,2,2,2,2,2,2,2,7,0,0], // 11: Chin / skin separator
  [0,0,0,7,7,7,7,7,7,7,7,7,7,0,0,0], // 12: Neck / shoulders line
  [0,0,7,4,4,4,4,4,4,4,4,4,4,7,0,0], // 13: Shoulders start
  [0,7,4,4,4,4,4,4,4,4,4,4,4,4,7,0], // 14: Torso
  [0,7,2,4,4,4,4,4,4,4,4,4,4,2,7,0], // 15: Arms / hands
  [0,0,7,7,4,4,4,4,4,4,4,4,7,7,0,0], // 16: Shirt bottom
  [0,0,0,7,5,5,5,7,7,5,5,5,7,0,0,0], // 17: Pants hips
  [0,0,0,7,5,5,7,0,0,7,5,5,7,0,0,0], // 18: Leg separation
  [0,0,0,7,5,5,7,0,0,7,5,5,7,0,0,0], // 19: Legs mid
  [0,0,0,7,5,5,7,0,0,7,5,5,7,0,0,0], // 20: Legs bottom
  [0,0,0,7,6,6,7,0,0,7,6,6,7,0,0,0], // 21: Shoes
];

// Helper to compile frames based on walking cycles and blinks
function getFrame(blink: boolean, step: number) {
  let frame = FRAME_OPEN.map(row => [...row]);
  
  if (step === 1) {
    frame[20][9] = 7;
    frame[20][10] = 6;
    frame[20][11] = 6;
    frame[20][12] = 7;
    frame[21][9] = 0;
    frame[21][10] = 0;
    frame[21][11] = 0;
    frame[21][12] = 0;
  } else if (step === 2) {
    frame[20][3] = 7;
    frame[20][4] = 6;
    frame[20][5] = 6;
    frame[20][6] = 7;
    frame[21][3] = 0;
    frame[21][4] = 0;
    frame[21][5] = 0;
    frame[21][6] = 0;
  }

  if (blink) {
    frame[6][5] = 2; // cover with skin color
    frame[6][10] = 2;
    frame[7][5] = 2;
    frame[7][10] = 2;
  }

  return frame;
}

// Integrated renderer that layers Gizmo (hiding legs if riding) and his vehicles
function GizmoRide({ 
  frame, 
  step, 
  vehicle,
  colors
}: { 
  frame: number[][]; 
  step: number; 
  vehicle: "none" | "bicycle" | "motorbike" | "car";
  colors: Record<number, string>;
}) {
  const CELL_SIZE = 5;

  // 1. Walking mode (standard grid)
  if (vehicle === "none") {
    const width = 16 * CELL_SIZE;
    const height = 22 * CELL_SIZE;
    return (
      <svg viewBox={`0 0 ${width} ${height}`} width="80" height="110" shapeRendering="crispEdges">
        {frame.map((row, y) =>
          row.map((c, x) =>
            c === 0 ? null : (
              <rect key={`${x}-${y}`} x={x * CELL_SIZE} y={y * CELL_SIZE} width={CELL_SIZE} height={CELL_SIZE} fill={colors[c]} />
            )
          )
        )}
      </svg>
    );
  }

  // Slice Gizmo's upper body slightly higher (rows 0 to 14, height 75px) to prevent overhang
  const upperBody = frame.slice(0, 15);

  const renderUpperBody = () => (
    <g shapeRendering="crispEdges">
      {upperBody.map((row, y) =>
        row.map((c, x) =>
          c === 0 ? null : (
            <rect key={`${x}-${y}`} x={x * CELL_SIZE} y={y * CELL_SIZE} width={CELL_SIZE} height={CELL_SIZE} fill={colors[c]} />
          )
        )
      )}
    </g>
  );

  // 2. Bicycle mode
  if (vehicle === "bicycle") {
    // Pedaling animation: pedal offsets up and down based on step
    const pedalY = step === 1 ? 62 : (step === 2 ? 78 : 70);
    const leftFootY = step === 1 ? 58 : (step === 2 ? 74 : 66);

    return (
      <svg viewBox="0 0 120 110" width="120" height="110">
        {/* Wheels */}
        <circle cx="22" cy="78" r="15" fill="#E2E8F0" stroke="#0F1115" strokeWidth="4.5" />
        <circle cx="22" cy="78" r="4.5" fill="#0F1115" />
        <circle cx="98" cy="78" r="15" fill="#E2E8F0" stroke="#0F1115" strokeWidth="4.5" />
        <circle cx="98" cy="78" r="4.5" fill="#0F1115" />

        {/* Bicycle Frame */}
        <line x1="22" y1="78" x2="56" y2="78" stroke="#0F1115" strokeWidth="3" />
        <line x1="22" y1="78" x2="48" y2="52" stroke="#E53E3E" strokeWidth="4.5" />
        <line x1="56" y1="78" x2="78" y2="52" stroke="#E53E3E" strokeWidth="4.5" />
        <line x1="48" y1="52" x2="78" y2="52" stroke="#E53E3E" strokeWidth="4.5" />
        <line x1="56" y1="78" x2="48" y2="52" stroke="#E53E3E" strokeWidth="4.5" />
        <line x1="78" y1="52" x2="98" y2="78" stroke="#0F1115" strokeWidth="4.5" />
        
        {/* Handlebars */}
        <path d="M78 52 L78 38 L88 38" fill="none" stroke="#0F1115" strokeWidth="4.5" strokeLinecap="square" />
        {/* Seat padding */}
        <rect x="42" y="48" width="14" height="4.5" rx="1" fill="#0F1115" />

        {/* Bent Riding Jeans leg */}
        <path d={`M48 52 L58 ${leftFootY} L55 ${pedalY}`} fill="none" stroke={colors[5]} strokeWidth="6" strokeLinecap="square" />
        {/* Boot */}
        <rect x="51" y={pedalY} width="8" height="5.5" fill={colors[6]} stroke="#0F1115" strokeWidth="1.5" />
        
        {/* Pedal cranks */}
        <line x1="56" y1="78" x2="55" y2={pedalY} stroke="#718096" strokeWidth="3.5" />

        {/* Upper Body translated higher to sit nicely on the seat */}
        <g transform="translate(18, -12)">
          {renderUpperBody()}
        </g>
      </svg>
    );
  }

  // 3. Motorbike mode
  if (vehicle === "motorbike") {
    return (
      <svg viewBox="0 0 120 110" width="120" height="110">
        {/* Engine block / exhaust pipe details */}
        <rect x="44" y="62" width="30" height="15" fill="#718096" stroke="#0F1115" strokeWidth="3" />
        <line x1="54" y1="74" x2="16" y2="74" stroke="#4A5568" strokeWidth="5.5" />
        
        {/* Rear Wheel */}
        <circle cx="22" cy="74" r="16.5" fill="#4A5568" stroke="#0F1115" strokeWidth="5" />
        <circle cx="22" cy="74" r="5" fill="#CBD5E0" stroke="#0F1115" strokeWidth="2.5" />
        
        {/* Front Wheel */}
        <circle cx="98" cy="74" r="16.5" fill="#4A5568" stroke="#0F1115" strokeWidth="5" />
        <circle cx="98" cy="74" r="5" fill="#CBD5E0" stroke="#0F1115" strokeWidth="2.5" />

        {/* Motorbike Body (teal chassis) */}
        <path d="M30 46 L64 46 L78 56 L88 56 L88 66 L30 66 Z" fill="#319795" stroke="#0F1115" strokeWidth="3.5" />
        {/* Seat */}
        <rect x="36" y="41.5" width="24" height="5" rx="1.5" fill="#0F1115" />
        {/* Front Forks */}
        <line x1="78" y1="56" x2="98" y2="74" stroke="#0F1115" strokeWidth="4.5" />
        {/* Handlebars */}
        <path d="M78 46 L76 34 L84 34" fill="none" stroke="#0F1115" strokeWidth="4.5" strokeLinecap="square" />

        {/* Leaning Riding Jeans leg */}
        <path d="M46 46 L58 64 L66 64" fill="none" stroke={colors[5]} strokeWidth="7.5" strokeLinecap="square" />
        {/* Boot */}
        <rect x="64" y="60.5" width="8" height="6.5" fill={colors[6]} stroke="#0F1115" strokeWidth="2" />

        {/* Upper Body translated leaning forward on seat */}
        <g transform="translate(18, -14)">
          {renderUpperBody()}
        </g>
      </svg>
    );
  }

  // 4. Car mode
  if (vehicle === "car") {
    return (
      <svg viewBox="0 0 150 110" width="150" height="110">
        {/* Animated exhaust smoke particles */}
        <style>{`
          @keyframes smoke-drift {
            0% { transform: translate(0, 0) scale(1); opacity: 0.7; }
            50% { transform: translate(-12px, -4px) scale(1.4); opacity: 0.4; }
            100% { transform: translate(-25px, -8px) scale(1.8); opacity: 0; }
          }
        `}</style>
        
        {/* Exhaust pipe smoke */}
        <circle cx="16" cy="80" r="4.5" fill="#A0AEC0" opacity="0.6" style={{ animation: "smoke-drift 0.8s linear infinite" }} />
        <circle cx="20" cy="81" r="3.5" fill="#A0AEC0" opacity="0.5" style={{ animation: "smoke-drift 0.8s linear infinite 0.3s" }} />

        {/* Exhaust pipe metal */}
        <rect x="22" y="78" width="8" height="4" fill="#718096" stroke="#0F1115" strokeWidth="1.5" />

        {/* Gizmo sitting inside cabin window (translated to center him in the expanded window) */}
        <g transform="translate(32, -2)">
          {renderUpperBody()}
        </g>

        {/* Translucent Window Glass */}
        <polygon points="42,40 90,40 106,54 38,54" fill="#E0F7FA" opacity="0.3" />

        {/* Roof cabin frame outline (renders ON TOP of Gizmo to frame his face, expanded window width) */}
        <path d="M 18 48 L 42 38 L 90 38 L 106 54" fill="none" stroke="#0F1115" strokeWidth="9" strokeLinecap="round" />
        <path d="M 18 48 L 42 38 L 90 38 L 106 54" fill="none" stroke="#2D3748" strokeWidth="5" strokeLinecap="round" />

        {/* Sleek Delorean/Cyberpunk style metal door & bumper chassis (flat door line is wider at y=54, exposing face) */}
        <path d="M 12 80 L 12 44 L 24 48 L 38 48 L 42 54 L 106 54 L 110 54 L 142 54 L 142 80 Z" fill="#2D3748" stroke="#0F1115" strokeWidth="4.5" />

        {/* Silver side detail panels */}
        <path d="M 98 54 L 140 54 L 140 58 L 96 58 Z" fill="#718096" />
        <path d="M 12 46 L 24 48 L 24 52 L 12 50 Z" fill="#718096" />
        
        {/* Glowing Neon Cyan accent trim line */}
        <path d="M 24 58 L 132 58" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" />

        {/* Steering Wheel placed inside cabin */}
        <circle cx="82" cy="48" r="6" fill="none" stroke="#0F1115" strokeWidth="3.5" />
        <line x1="82" y1="54" x2="82" y2="52" stroke="#0F1115" strokeWidth="3.5" />

        {/* Door line divider */}
        <line x1="68" y1="58" x2="68" y2="80" stroke="#0F1115" strokeWidth="2.5" />

        {/* Wheels (glowing cyan rims + sports alloy spokes) */}
        <circle cx="34" cy="80" r="16.5" fill="#1A202C" stroke="#0F1115" strokeWidth="5" />
        <circle cx="34" cy="80" r="6.5" fill="#00F0FF" stroke="#0F1115" strokeWidth="2.5" />
        <line x1="34" y1="64" x2="34" y2="96" stroke="#0F1115" strokeWidth="2" />
        <line x1="18" y1="80" x2="50" y2="80" stroke="#0F1115" strokeWidth="2" />

        <circle cx="114" cy="80" r="16.5" fill="#1A202C" stroke="#0F1115" strokeWidth="5" />
        <circle cx="114" cy="80" r="6.5" fill="#00F0FF" stroke="#0F1115" strokeWidth="2.5" />
        <line x1="114" y1="64" x2="114" y2="96" stroke="#0F1115" strokeWidth="2" />
        <line x1="98" y1="80" x2="130" y2="80" stroke="#0F1115" strokeWidth="2" />

        {/* Neon headlights */}
        <rect x="136" y="58" width="8" height="5" fill="#00F0FF" stroke="#0F1115" strokeWidth="1.5" />
        
        {/* Tail lights */}
        <rect x="10" y="50" width="4" height="10" fill="#FF007F" stroke="#0F1115" strokeWidth="2" />
      </svg>
    );
  }

  return null;
}

export default function FloatingMascotPixel({ isDark }: { isDark: boolean }) {
  const isWelcomingRef = useRef(true);
  const [blink, setBlink] = useState(false);
  
  // Coordinate state (starts in Hero section on main screen)
  const [posX, setPosX] = useState(76); 
  const [posY, setPosY] = useState(8); 
  
  // Velocity refs to decouple drift updates from React state re-runs
  const velXRef = useRef(-0.25);
  const velYRef = useRef(-0.12);

  const [direction, setDirection] = useState<"left" | "right">("left");
  const [mascotState, setMascotState] = useState<"walking" | "idle">("idle");
  const [walkStep, setWalkStep] = useState(0); 
  
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  
  const [showMessage, setShowMessage] = useState(true);
  const [messageText, setMessageText] = useState("Hey! Welcome! 👋 I'm Gizmo, Yanshu's AI assistant!");
  const [showAssistantPanel, setShowAssistantPanel] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showStation, setShowStation] = useState(false);

  // Outfit & vehicle state
  const [activeOutfit, setActiveOutfit] = useState<OutfitKey>("hoodie");
  const [activeVehicle, setActiveVehicle] = useState<VehicleId>("none");

  // ── Autonomous Pitstop ────────────────────────────────────────────────────
  // Gizmo autonomously walks to the station, auto-changes outfit+vehicle, then leaves
  const [pitstopPhase, setPitstopPhase] = useState<"off" | "arrived">("off");
  const pitstopActiveRef  = useRef(false); // true while walking to station
  const pitstopArrivedRef = useRef(false); // true once Gizmo is at station
  // Shadow refs so we can read position inside setInterval without stale closure
  const posXShadow = useRef(76);
  const posYShadow = useRef(8);
  // Station target in viewport-% coords (matches fixed bottom-right button area)
  const STATION_X = 82;
  const STATION_Y = 80;
  const ARRIVE_DIST = 8; // % distance threshold to trigger arrival

  // Dynamic colour palette (recomputed whenever outfit changes)
  const COLORS = buildColors(activeOutfit);

  // Speed multiplier based on vehicle
  const getSpeedMultiplier = (vehicle: "none" | "bicycle" | "motorbike" | "car") => {
    switch (vehicle) {
      case "bicycle": return 1.8;
      case "motorbike": return 3.2;
      case "car": return 4.5;
      default: return 1.0;
    }
  };

  // Vibe rate / animation bobbing speed based on vehicle
  const getAnimationString = () => {
    if (isJumping) return "sprite-spin 0.6s linear infinite";
    if (mascotState === "idle") return "sprite-bounce 1.1s steps(2) infinite";
    
    switch (activeVehicle) {
      case "bicycle": return "sprite-bob 0.18s steps(2) infinite";
      case "motorbike": return "sprite-bob 0.1s steps(2) infinite";
      case "car": return "sprite-bob 0.08s steps(2) infinite";
      default: return "sprite-bob 0.28s steps(2) infinite";
    }
  };

  // Blink interval timer & initial welcome greeting
  useEffect(() => {
    const blinkInterval = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 120);
    }, 3800);

    const initialMessageTimeout = window.setTimeout(() => {
      isWelcomingRef.current = false;
      setShowMessage(false);
      setMascotState("walking");
    }, 7500);

    return () => {
      window.clearInterval(blinkInterval);
      window.clearTimeout(initialMessageTimeout);
    };
  }, []);

  // Listen to window click to dismiss the assistant panel when clicking away
  useEffect(() => {
    const handleOutsideClick = () => {
      if (showAssistantPanel) {
        setShowAssistantPanel(false);
        if (!isAnswering) {
          setShowMessage(false);
          setMascotState("walking");
        }
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [showAssistantPanel, isAnswering]);

  // Hover phrase triggers
  useEffect(() => {
    if (showAssistantPanel || isAnswering) return;

    if (isHovered) {
      isWelcomingRef.current = false; // dismiss welcoming state if they interact
      const hoverPhrases = [
        "Hello there! 👋",
        "Hover check: PASS!",
        "Click me to ask questions!",
        "Let's build together!",
        "Look at me fly!",
        "Need a human dev?",
        "Watching you scroll..."
      ];
      setMessageText(hoverPhrases[Math.floor(Math.random() * hoverPhrases.length)]);
      setShowMessage(true);
      setMascotState("idle");
      setWalkStep(0);
    } else {
      if (!isWelcomingRef.current) {
        setShowMessage(false);
        setMascotState("walking");
      }
    }
  }, [isHovered, showAssistantPanel, isAnswering]);

  // Click handler (toggles Q&A panel)
  const handleMascotClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent window listener from immediately closing it
    if (isJumping) return;
    
    setIsAnswering(false);
    const panelNextState = !showAssistantPanel;
    setShowAssistantPanel(panelNextState);
    
    if (panelNextState) {
      setMessageText("How can I help you?");
      setShowMessage(true);
      setMascotState("idle");
      setWalkStep(0);
    } else {
      setShowMessage(false);
      setMascotState("walking");
    }
  };

  // Question click handler
  const handleQuestionClick = (answer: string, isTrick: boolean) => {
    setIsAnswering(true);
    setMessageText(answer);
    setShowMessage(true);
    setShowAssistantPanel(false);

    if (isTrick) {
      setIsJumping(true);
      window.setTimeout(() => {
        setIsJumping(false);
        setIsAnswering(false);
        if (!isHovered) {
          setShowMessage(false);
          setMascotState("walking");
        }
      }, 850);
    } else {
      setMascotState("idle");
      setWalkStep(0);
      
      // Keep answer bubble up for 5.5 seconds, then resume walking
      window.setTimeout(() => {
        setIsAnswering(false);
        if (!isHovered && !showAssistantPanel) {
          setShowMessage(false);
          setMascotState("walking");
        }
      }, 5500);
    }
  };

  // Vehicle cycling handler
  const handleVehicleCycle = () => {
    const vehicles: VehicleId[] = ["none", "bicycle", "motorbike", "car"];
    const nextIdx = (vehicles.indexOf(activeVehicle) + 1) % vehicles.length;
    const nextVehicle = vehicles[nextIdx];
    setActiveVehicle(nextVehicle);

    let msg = "";
    switch (nextVehicle) {
      case "bicycle":   msg = "Bicycle mode active! Pedaling away! 🚲"; break;
      case "motorbike": msg = "Motorbike mode active! Vroom vroom! 🏍️"; break;
      case "car":       msg = "Car mode active! Beep beep! 🚗"; break;
      default:          msg = "Walking mode active! Back on my feet! 🚶";
    }
    
    setIsAnswering(true);
    setMessageText(msg);
    setShowMessage(true);
    setShowAssistantPanel(false);

    window.setTimeout(() => {
      setIsAnswering(false);
      if (!isHovered && !showAssistantPanel) {
        setShowMessage(false);
        setMascotState("walking");
      }
    }, 3500);
  };

  // Station outfit/vehicle change handlers
  const handleOutfitChange = (outfit: OutfitKey) => {
    setActiveOutfit(outfit);
    const names: Record<OutfitKey, string> = {
      hoodie: "Yellow Hoodie 🟡", streetwear: "Street Red 🔴",
      hacker: "Hacker Blue 🔵", summer: "Summer Green 🟢", retrowave: "Retrowave 🟣"
    };
    setMessageText(`Outfit changed to ${names[outfit]}!`);
    setShowMessage(true);
    window.setTimeout(() => { if (!isHovered) setShowMessage(false); }, 2800);
  };

  const handleStationVehicleChange = (v: VehicleId) => {
    setActiveVehicle(v);
    const labels: Record<VehicleId, string> = {
      none: "Walking 🚶", bicycle: "Bicycle 🚲", motorbike: "Motorbike 🏍️", car: "Sportscar 🚗"
    };
    setMessageText(`Switched to ${labels[v]}!`);
    setShowMessage(true);
    window.setTimeout(() => { if (!isHovered) setShowMessage(false); }, 2800);
  };

  // 2D Movement coordinate updates (pitstop-aware steering)
  useEffect(() => {
    if (isHovered || isJumping || mascotState === "idle" || showAssistantPanel) {
      return;
    }

    const interval = window.setInterval(() => {
      const mult = getSpeedMultiplier(activeVehicle);

      // ── PITSTOP STEERING: override velocity toward station target ──
      if (pitstopActiveRef.current && !pitstopArrivedRef.current) {
        setPosX((prevX) => {
          posXShadow.current = prevX;
          const dx = STATION_X - prevX;
          // smooth acceleration toward target, cap at 0.4
          velXRef.current = Math.sign(dx) * Math.min(0.4, Math.max(0.15, Math.abs(dx) * 0.05));
          if (dx > 1)  setDirection("right");
          else if (dx < -1) setDirection("left");
          return Math.max(2, Math.min(90, prevX + velXRef.current));
        });
        setPosY((prevY) => {
          posYShadow.current = prevY;
          const dy = STATION_Y - prevY;
          velYRef.current = Math.sign(dy) * Math.min(0.15, Math.max(0.05, Math.abs(dy) * 0.025));
          return Math.max(0.5, Math.min(98.5, prevY + velYRef.current));
        });

        // Arrival check using shadow refs (both axes updated above)
        const distX = posXShadow.current - STATION_X;
        const distY = posYShadow.current - STATION_Y;
        if (Math.sqrt(distX * distX + distY * distY) < ARRIVE_DIST) {
          if (!pitstopArrivedRef.current) {
            pitstopArrivedRef.current = true;
            setPitstopPhase("arrived");
          }
        }
        return;
      }

      // ── NORMAL BOUNCE MOVEMENT ──
      setPosX((prevX) => {
        posXShadow.current = prevX;
        let nextX = prevX + velXRef.current * mult;
        if (nextX <= 2) {
          velXRef.current = Math.abs(velXRef.current);
          setDirection("right");
          return 2;
        }
        if (nextX >= 90) {
          velXRef.current = -Math.abs(velXRef.current);
          setDirection("left");
          return 90;
        }
        return nextX;
      });

      setPosY((prevY) => {
        posYShadow.current = prevY;
        let nextY = prevY + velYRef.current * mult;
        if (nextY <= 0.5) {
          velYRef.current = Math.abs(velYRef.current);
          return 0.5;
        }
        if (nextY >= 98.5) {
          velYRef.current = -Math.abs(velYRef.current);
          return 98.5;
        }
        return nextY;
      });

    }, 30);

    return () => window.clearInterval(interval);
  }, [mascotState, isHovered, isJumping, showAssistantPanel, activeVehicle]);

  // Slower walk leg cycling steps
  useEffect(() => {
    if (mascotState === "idle" || isHovered || isJumping || showAssistantPanel) {
      setWalkStep(0);
      return;
    }

    let walkCycle = 0;
    const interval = window.setInterval(() => {
      walkCycle = (walkCycle + 1) % 4;
      if (walkCycle === 0 || walkCycle === 2) {
        setWalkStep(0); // symmetrical passing pose
      } else if (walkCycle === 1) {
        setWalkStep(1); // right leg up
      } else {
        setWalkStep(2); // left leg up
      }
    }, 150);

    return () => window.clearInterval(interval);
  }, [mascotState, isHovered, isJumping, showAssistantPanel]);

  // Occasional random directional shifts to wander organically
  useEffect(() => {
    const shiftInterval = window.setInterval(() => {
      if (isHovered || isJumping || mascotState === "idle" || showAssistantPanel) return;

      const deltaX = (Math.random() - 0.5) * 0.15;
      let nextVx = velXRef.current + deltaX;
      if (Math.abs(nextVx) < 0.05) nextVx = nextVx > 0 ? 0.08 : -0.08;
      if (Math.abs(nextVx) > 0.25) nextVx = nextVx > 0 ? 0.22 : -0.22;
      velXRef.current = nextVx;

      const deltaY = (Math.random() - 0.5) * 0.05; // smaller adjustment scale for height
      let nextVy = velYRef.current + deltaY;
      if (Math.abs(nextVy) < 0.01) nextVy = nextVy > 0 ? 0.02 : -0.02;
      if (Math.abs(nextVy) > 0.08) nextVy = nextVy > 0 ? 0.06 : -0.06;
      velYRef.current = nextVy;

    }, 3500);

    return () => window.clearInterval(shiftInterval);
  }, [mascotState, isHovered, isJumping, showAssistantPanel]);

  // Occasional random speech bubbles while wandering (suppressed during pitstop)
  useEffect(() => {
    const speakInterval = window.setInterval(() => {
      if (isHovered || isJumping || showAssistantPanel || isAnswering) return;
      if (pitstopActiveRef.current) return; // quiet during pitstop

      const randomPhrases = [
        "Wandering the DOM...",
        "Checking for warnings...",
        "Everything compiles!",
        "Gliding freely...",
        "Beep boop, clean code!",
        "Bauhaus is logic.",
        "Float status: STABLE!",
        "Vite dev server is active!"
      ];

      const phrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
      setMessageText(phrase);
      setShowMessage(true);
      setMascotState("idle");
      setWalkStep(0);

      window.setTimeout(() => {
        if (!isHovered && !showAssistantPanel && !isAnswering) {
          setShowMessage(false);
          setMascotState("walking");
        }
      }, 2500);

    }, 15000);

    return () => {
      window.clearInterval(speakInterval);
    };
  }, [isHovered, isJumping, showAssistantPanel, isAnswering]);

  // ── Autonomous Pitstop: schedule a visit every 40–60 seconds ────────────────
  useEffect(() => {
    let nextTimer: number;

    const scheduleNext = () => {
      const delay = 40000 + Math.random() * 20000; // 40–60s
      nextTimer = window.setTimeout(() => {
        // Only trigger if Gizmo is free (not interacting / already visiting)
        if (!pitstopActiveRef.current && !isHovered && !showAssistantPanel) {
          pitstopActiveRef.current = true;
          pitstopArrivedRef.current = false;
          setMascotState("walking");
          setShowMessage(true);
          setMessageText("Pit stop time! 🏪");
        }
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => window.clearTimeout(nextTimer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Pitstop arrival: auto-change outfit + vehicle, then resume wandering ──
  useEffect(() => {
    if (pitstopPhase !== "arrived") return;

    const ALL_OUTFITS: OutfitKey[] = ["hoodie", "streetwear", "hacker", "summer", "retrowave"];
    const ALL_VEHICLES: VehicleId[] = ["none", "bicycle", "motorbike", "car"];

    const OUTFIT_NAMES: Record<OutfitKey, string> = {
      hoodie: "Yellow Hoodie 🟡", streetwear: "Street Red 🔴",
      hacker: "Hacker Blue 🔵", summer: "Summer Green 🟢", retrowave: "Retrowave 🟣"
    };
    const VEHICLE_LABELS: Record<VehicleId, string> = {
      none: "on foot 🚶", bicycle: "bicycle 🚲", motorbike: "motorbike 🏍️", car: "sportscar 🚗"
    };

    // 1. Stop Gizmo at station and open the panel
    setMascotState("idle");
    setShowStation(true);
    setMessageText("✨ Changing look...");
    setShowMessage(true);

    // 2. After 1.2s apply the random new outfit + vehicle
    const changeTimer = window.setTimeout(() => {
      const newOutfit  = ALL_OUTFITS[Math.floor(Math.random() * ALL_OUTFITS.length)];
      const newVehicle = ALL_VEHICLES[Math.floor(Math.random() * ALL_VEHICLES.length)];
      setActiveOutfit(newOutfit);
      setActiveVehicle(newVehicle);
      setMessageText(`New look! ${OUTFIT_NAMES[newOutfit]} + ${VEHICLE_LABELS[newVehicle]}!`);
    }, 1200);

    // 3. After 3.5s close station and resume wandering
    const doneTimer = window.setTimeout(() => {
      setShowStation(false);
      pitstopActiveRef.current = false;
      setPitstopPhase("off");
      setMascotState("walking");
      setMessageText("Fresh new look! Let's roll! 🚀");
      window.setTimeout(() => setShowMessage(false), 3000);
    }, 3600);

    return () => {
      window.clearTimeout(changeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [pitstopPhase]);

  const currentFrame = getFrame(blink, walkStep);

  return (
    <>
      {/* ── Fixed Station Dock (always visible, bottom-right corner) ── */}
      <div
        style={{ position:"fixed", bottom:"24px", right:"24px", zIndex:10000, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"10px", pointerEvents:"auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence>
          {showStation && (
            <GizmoStation
              isDark={isDark}
              currentOutfit={activeOutfit}
              currentVehicle={activeVehicle}
              onOutfitChange={handleOutfitChange}
              onVehicleChange={handleStationVehicleChange}
              onClose={() => setShowStation(false)}
            />
          )}
        </AnimatePresence>

        <button
          id="gizmo-station-btn"
          onClick={() => setShowStation((prev) => !prev)}
          title="Gizmo Station — change outfit & vehicle"
          style={{ display:"flex", alignItems:"center", gap:"7px", padding:"9px 14px", background:showStation?"#E53E3E":(isDark?"#0B0C0E":"#FAF9F6"), color:showStation?"#FAF9F6":(isDark?"#FAF9F6":"#0F1115"), border:`2px solid ${isDark?"#FAF9F6":"#0F1115"}`, boxShadow:isDark?"4px 4px 0 #FAF9F6":"4px 4px 0 #0F1115", cursor:"pointer", fontFamily:"var(--font-mono)", fontSize:"10px", fontWeight:900, textTransform:"uppercase", letterSpacing:"0.1em", transition:"background 0.15s, color 0.15s, transform 0.1s, box-shadow 0.1s" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform="translate(-2px,-2px)"; e.currentTarget.style.boxShadow=isDark?"6px 6px 0 #FAF9F6":"6px 6px 0 #0F1115"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=isDark?"4px 4px 0 #FAF9F6":"4px 4px 0 #0F1115"; }}
        >
          <span style={{ fontSize:"14px" }}>🏪</span>
          <span>GIZMO STATION</span>
        </button>
      </div>

      {/* ── Roaming Gizmo Mascot ── */}
      <div 
        aria-hidden="true" 
        style={{ position:"absolute", top:`${posY}%`, left:`${posX}%`, width:"160px", height:"160px", zIndex:9999, pointerEvents:"auto", cursor:"pointer", transition:"none" }} 
        onClick={handleMascotClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Click me!"
      >
      <style>{`
        @keyframes sprite-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes sprite-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes sprite-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bubble-pop-in {
          0% { opacity: 0; transform: translate(-50%, 6px) scale(0.92); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
      `}</style>

      {/* Bubble Container */}
      {showMessage && (
        <div
          style={{
            position: "absolute",
            bottom: showAssistantPanel ? "320px" : "124px", 
            left: "50%",
            transform: "translateX(-50%)",
            width: "180px",
            padding: "8px 10px",
            border: isDark ? "2px solid #FAF9F6" : "2px solid #0F1115",
            background: isDark ? "#121212" : "#FAF9F6",
            color: isDark ? "#FAF9F6" : "#0F1115",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            textAlign: "center",
            boxShadow: isDark ? "4px 4px 0px 0px #FAF9F6" : "4px 4px 0px 0px #0F1115",
            pointerEvents: "none",
            zIndex: 65,
            animation: "bubble-pop-in 0.15s ease-out forwards",
          }}
        >
          {messageText}
        </div>
      )}

      {/* Q&A Assistant Control Panel Menu */}
      {showAssistantPanel && (
        <div
          style={{
            position: "absolute",
            bottom: "124px", 
            left: "50%",
            transform: "translateX(-50%)",
            width: "240px",
            background: isDark ? "#121212" : "#FAF9F6",
            border: isDark ? "2px solid #FAF9F6" : "2px solid #0F1115",
            color: isDark ? "#FAF9F6" : "#0F1115",
            padding: "10px",
            boxShadow: isDark ? "6px 6px 0px 0px #FAF9F6" : "6px 6px 0px 0px #0F1115",
            zIndex: 60,
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            pointerEvents: "auto", // enable inner clicks
          }}
          onClick={(e) => e.stopPropagation()} // block click-through to close
        >
          <div style={{ borderBottom: isDark ? "2px solid #FAF9F6" : "2px solid #0F1115", paddingBottom: "4px", marginBottom: "8px", fontWeight: "bold", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Gizmo Assistant</span>
            <button 
              onClick={() => {
                setShowAssistantPanel(false);
                setShowMessage(false);
                setMascotState("walking");
              }}
              style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "11px", color: "#E53E3E" }}
            >
              ✕
            </button>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { q: "Who is Yanshu?", a: "Yanshu is an AI/ML & Full-Stack Developer specializing in edge vision and high-performance interfaces!" },
              { q: "What is their tech stack?", a: "Expertise in React, TypeScript, Python, MediaPipe, Whisper, XGBoost, and Docker!" },
              { q: "Top featured projects?", a: "Vaani voice assistant, AR Sketch, House Price Predictor, and ArenaHub turf scheduler!" },
              { q: "How to connect?", a: "Email at yanshushingala@gmail.com, or check out GitHub at github.com/Yanshu04!" },
              { q: "Do a barrel roll! 🌀", a: "BARREL ROLL! Woohoo!", trick: true }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionClick(item.a, !!item.trick)}
                style={{
                  textAlign: "left",
                  padding: "6px 8px",
                  background: isDark ? "#121212" : "#FAF9F6",
                  border: isDark ? "1.5px solid #FAF9F6" : "1.5px solid #0F1115",
                  fontSize: "9px",
                  fontWeight: "bold",
                  color: isDark ? "#FAF9F6" : "#0F1115",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.1s ease",
                  boxShadow: isDark ? "2px 2px 0px #FAF9F6" : "2px 2px 0px #0F1115",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translate(-1px, -1px)";
                  e.currentTarget.style.boxShadow = isDark ? "3px 3px 0px #FAF9F6" : "3px 3px 0px #0F1115";
                  e.currentTarget.style.background = "#F6E05E";
                  e.currentTarget.style.color = "#0F1115";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = isDark ? "2px 2px 0px #FAF9F6" : "2px 2px 0px #0F1115";
                  e.currentTarget.style.background = isDark ? "#121212" : "#FAF9F6";
                  e.currentTarget.style.color = isDark ? "#FAF9F6" : "#0F1115";
                }}
              >
                {item.q}
              </button>
            ))}

            {/* Cycle Vehicle */}
            <button
              onClick={handleVehicleCycle}
              style={{ textAlign:"left",padding:"6px 8px",background:"#E53E3E",border:isDark?"1.5px solid #FAF9F6":"1.5px solid #0F1115",fontSize:"9px",fontWeight:"bold",color:"#FAF9F6",textTransform:"uppercase",cursor:"pointer",transition:"all 0.1s ease",boxShadow:isDark?"2px 2px 0px #FAF9F6":"2px 2px 0px #0F1115" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform="translate(-1px,-1px)"; e.currentTarget.style.boxShadow=isDark?"3px 3px 0px #FAF9F6":"3px 3px 0px #0F1115"; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=isDark?"2px 2px 0px #FAF9F6":"2px 2px 0px #0F1115"; }}
            >
              Cycle Vehicle 🚲🏍️🚗
            </button>

            {/* 🏪 Open Gizmo Station */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowAssistantPanel(false); setShowStation(prev => !prev); }}
              style={{ textAlign:"left",padding:"6px 8px",background:"#2B6CB0",border:isDark?"1.5px solid #FAF9F6":"1.5px solid #0F1115",fontSize:"9px",fontWeight:"bold",color:"#FAF9F6",textTransform:"uppercase",cursor:"pointer",transition:"all 0.1s ease",boxShadow:isDark?"2px 2px 0px #FAF9F6":"2px 2px 0px #0F1115" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform="translate(-1px,-1px)"; e.currentTarget.style.boxShadow=isDark?"3px 3px 0px #FAF9F6":"3px 3px 0px #0F1115"; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=isDark?"2px 2px 0px #FAF9F6":"2px 2px 0px #0F1115"; }}
            >
              🏪 Gizmo Station
            </button>
          </div>
        </div>
      )}

      {/* Sprite Container */}
      <div 
        style={{ 
          position: "absolute", 
          bottom: 0, 
          left: activeVehicle === "car" ? "5px" : (activeVehicle === "none" ? "40px" : "20px"), 
          width: activeVehicle === "car" ? "150px" : (activeVehicle === "none" ? "80px" : "120px"), 
          height: "110px", 
          animation: getAnimationString(), 
          imageRendering: "pixelated",
          transform: direction === "left" ? "scaleX(-1)" : "none",
          transition: "transform 0.12s ease",
          filter: isDark 
            ? "drop-shadow(1.5px 0px 0px #FAF9F6) drop-shadow(-1.5px 0px 0px #FAF9F6) drop-shadow(0px 1.5px 0px #FAF9F6) drop-shadow(0px -1.5px 0px #FAF9F6)" 
            : "none"
        }}
      >
        <GizmoRide frame={currentFrame} step={walkStep} vehicle={activeVehicle} colors={COLORS} />
      </div>
    </div>
    </>
  );
}
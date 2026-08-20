import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Outfit colour palettes ────────────────────────────────────────────────
const OUTFIT_PALETTES = {
  hoodie:    { top: "#F6E05E", jeans: "#1A202C", shoes: "#FAF9F6", label: "Hoodie", emoji: "🟡" },
  streetwear:{ top: "#E53E3E", jeans: "#2D3748", shoes: "#E2E8F0", label: "Street", emoji: "🔴" },
  hacker:    { top: "#1A202C", jeans: "#2B6CB0", shoes: "#63B3ED", label: "Hacker", emoji: "🔵" },
  summer:    { top: "#48BB78", jeans: "#F6E05E", shoes: "#FEEBC8", label: "Summer", emoji: "🟢" },
  retrowave: { top: "#9F7AEA", jeans: "#E53E3E", shoes: "#F6E05E", label: "Retro",  emoji: "🟣" },
} as const;
type OutfitKey = keyof typeof OUTFIT_PALETTES;

const VEHICLES = [
  { id: "none",      label: "Walking",  emoji: "🚶", speed: "1×" },
  { id: "bicycle",   label: "Bicycle",  emoji: "🚲", speed: "1.8×" },
  { id: "motorbike", label: "Motorbike",emoji: "🏍️", speed: "3.2×" },
  { id: "car",       label: "Sportscar",emoji: "🚗", speed: "4.5×" },
] as const;
type VehicleId = "none" | "bicycle" | "motorbike" | "car";

interface GizmoStationProps {
  isDark: boolean;
  currentOutfit: OutfitKey;
  currentVehicle: VehicleId;
  onOutfitChange: (o: OutfitKey) => void;
  onVehicleChange: (v: VehicleId) => void;
  onClose: () => void;
}

export default function GizmoStation({
  isDark,
  currentOutfit,
  currentVehicle,
  onOutfitChange,
  onVehicleChange,
  onClose,
}: GizmoStationProps) {
  const [tab, setTab] = useState<"outfit" | "vehicle">("outfit");
  const [changing, setChanging] = useState(false);
  const [flash, setFlash] = useState(false);

  const triggerChange = (fn: () => void) => {
    setChanging(true);
    setFlash(true);
    setTimeout(() => {
      fn();
      setFlash(false);
    }, 320);
    setTimeout(() => setChanging(false), 640);
  };

  const bg  = isDark ? "#0B0C0E" : "#FAF9F6";
  const bdr = isDark ? "#FAF9F6" : "#0F1115";
  const txt = isDark ? "#FAF9F6" : "#0F1115";
  const sub = isDark ? "#6B7280" : "#9CA3AF";

  const outfit = OUTFIT_PALETTES[currentOutfit];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 16 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "260px",
        background: bg,
        border: `2px solid ${bdr}`,
        boxShadow: isDark ? `6px 6px 0 ${bdr}` : `6px 6px 0 ${bdr}`,
        fontFamily: "var(--font-mono)",
        color: txt,
        overflow: "hidden",
      }}
    >
      {/* ── Station Header ── */}
      <div style={{
        background: isDark ? "#1A1B22" : "#F0EDE6",
        borderBottom: `2px solid ${bdr}`,
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14 }}>🏪</span>
          <span style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            GIZMO STATION
          </span>
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#E53E3E", fontWeight: 900, fontSize: 12 }}
        >
          ✕
        </button>
      </div>

      {/* ── Preview Pane (mini Gizmo with flash) ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 0 8px",
        background: isDark ? "#141418" : "#F8F6F0",
        borderBottom: `1px solid ${isDark ? "#2D3748" : "#E2E8F0"}`,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Flash overlay */}
        <AnimatePresence>
          {flash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ position: "absolute", inset: 0, background: "#F6E05E", zIndex: 10 }}
            />
          )}
        </AnimatePresence>

        {/* Mini pixel Gizmo preview */}
        <motion.div
          animate={changing ? { rotate: [0, -8, 8, -8, 0] } : {}}
          transition={{ duration: 0.5 }}
          style={{ position: "relative", zIndex: 5 }}
        >
          <MiniGizmo outfitKey={currentOutfit} />
        </motion.div>

        {/* Outfit label badge */}
        <div style={{
          position: "absolute",
          bottom: 8, right: 10,
          background: outfit.top,
          color: isDark ? "#0F1115" : "#FAF9F6",
          padding: "2px 6px",
          fontSize: 9,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          border: `1px solid ${bdr}`,
        }}>
          {outfit.emoji} {outfit.label}
        </div>
      </div>

      {/* ── Tab Selector ── */}
      <div style={{
        display: "flex",
        borderBottom: `2px solid ${bdr}`,
      }}>
        {(["outfit", "vehicle"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "7px 0",
              background: tab === t ? (isDark ? "#E53E3E" : "#E53E3E") : "transparent",
              color: tab === t ? "#FAF9F6" : sub,
              border: "none",
              borderRight: t === "outfit" ? `1px solid ${bdr}` : "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {t === "outfit" ? "👕 OUTFIT" : "🚗 VEHICLE"}
          </button>
        ))}
      </div>

      {/* ── Panel Content ── */}
      <div style={{ padding: "10px" }}>
        <AnimatePresence mode="wait">
          {tab === "outfit" && (
            <motion.div
              key="outfit-panel"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.18 }}
            >
              <p style={{ fontSize: 8, color: sub, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                SELECT GIZMO'S OUTFIT
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {(Object.entries(OUTFIT_PALETTES) as [OutfitKey, typeof OUTFIT_PALETTES[OutfitKey]][]).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => triggerChange(() => onOutfitChange(key))}
                    style={{
                      padding: "8px 6px",
                      background: currentOutfit === key ? val.top : (isDark ? "#1A1B22" : "#F0EDE6"),
                      color: currentOutfit === key ? (key === "summer" || key === "hoodie" ? "#0F1115" : "#FAF9F6") : txt,
                      border: `2px solid ${currentOutfit === key ? bdr : (isDark ? "#2D3748" : "#E2E8F0")}`,
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      textAlign: "center",
                      boxShadow: currentOutfit === key ? `2px 2px 0 ${bdr}` : "none",
                      transition: "all 0.1s",
                    }}
                  >
                    <div style={{ fontSize: 14, marginBottom: 2 }}>{val.emoji}</div>
                    <div>{val.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "vehicle" && (
            <motion.div
              key="vehicle-panel"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
            >
              <p style={{ fontSize: 8, color: sub, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                SELECT GIZMO'S RIDE
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {VEHICLES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => triggerChange(() => onVehicleChange(v.id))}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      background: currentVehicle === v.id ? "#E53E3E" : (isDark ? "#1A1B22" : "#F0EDE6"),
                      color: currentVehicle === v.id ? "#FAF9F6" : txt,
                      border: `2px solid ${currentVehicle === v.id ? bdr : (isDark ? "#2D3748" : "#E2E8F0")}`,
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      boxShadow: currentVehicle === v.id ? `2px 2px 0 ${bdr}` : "none",
                      transition: "all 0.1s",
                    }}
                  >
                    <span>{v.emoji} {v.label}</span>
                    <span style={{ fontSize: 8, opacity: 0.7 }}>SPEED {v.speed}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ── */}
      <div style={{
        borderTop: `1px solid ${isDark ? "#2D3748" : "#E2E8F0"}`,
        padding: "6px 10px",
        display: "flex",
        justifyContent: "center",
        background: isDark ? "#0B0C0E" : "#F0EDE6",
      }}>
        <span style={{ fontSize: 8, color: sub, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
          GIZMO CUSTOMIZATION LAB v1.0
        </span>
      </div>
    </motion.div>
  );
}

// ─── Mini pixel-art Gizmo preview (22 rows × 16 cols, 5px cells) ────────────
function MiniGizmo({ outfitKey }: { outfitKey: OutfitKey }) {
  const pal = OUTFIT_PALETTES[outfitKey];
  const SKIN    = "#F4C99B";
  const OUTLINE = "#0F1115";
  const HAIR    = "#6A4E35";

  const C: Record<number, string> = {
    1: HAIR,
    2: SKIN,
    3: OUTLINE,
    4: pal.top,
    5: pal.jeans,
    6: pal.shoes,
    7: OUTLINE,
  };

  const FRAME = [
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

  const S = 4; // cell px size for mini preview
  return (
    <svg viewBox={`0 0 ${16*S} ${22*S}`} width={16*S} height={22*S} shapeRendering="crispEdges">
      {FRAME.map((row, y) => row.map((c, x) => {
        if (!c) return null;
        return <rect key={`${x}-${y}`} x={x*S} y={y*S} width={S} height={S} fill={C[c]} />;
      }))}
    </svg>
  );
}

// Re-export palettes & vehicle list for use in FloatingMascotPixel
export { OUTFIT_PALETTES, VEHICLES };
export type { OutfitKey, VehicleId };

import React from "react";

export default function BackgroundGeometry({ isDark }: { isDark: boolean }) {

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <style>{`
        @keyframes float-hero-shape-1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, 20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes float-hero-shape-2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 15px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float-hero-shape-3 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -15px) rotate(-90deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes float-hero-shape-4 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-10px, -20px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
      
      <div 
        className="absolute inset-0" 
        style={{ 
          filter: isDark 
            ? "drop-shadow(1px 0px 0px #FAF9F6) drop-shadow(-1px 0px 0px #FAF9F6) drop-shadow(0px 1px 0px #FAF9F6) drop-shadow(0px -1px 0px #FAF9F6)" 
            : "none" 
        }}
      >
        {/* 1. Red Circle */}
        <div 
          className="absolute top-[22%] left-[18%] opacity-85"
          style={{ animation: "float-hero-shape-1 18s ease-in-out infinite" }}
        >
          <svg width="32" height="32" viewBox="0 0 12 12" shapeRendering="crispEdges">
            <path d="M4 0h4v1h2v2h1v4h-1v2H8v1H4v-1H2V8H1V4h1V2h2z" fill="#0F1115" />
            <path d="M4 1h4v1h1v1h1v4h-1v1H8v1H4v-1H3v-1H2V3h1v-1z" fill="#E53E3E" />
          </svg>
        </div>

        {/* 2. Blue Square */}
        <div 
          className="absolute bottom-[22%] right-[18%] opacity-80"
          style={{ animation: "float-hero-shape-2 20s ease-in-out infinite" }}
        >
          <svg width="36" height="36" viewBox="0 0 10 10" shapeRendering="crispEdges">
            <rect x="0" y="0" width="10" height="10" fill="#0F1115" />
            <rect x="1" y="1" width="8" height="8" fill="#4F8CFF" />
          </svg>
        </div>

        {/* 3. Yellow Triangle */}
        <div 
          className="absolute top-[42%] right-[15%] opacity-85"
          style={{ animation: "float-hero-shape-3 22s ease-in-out infinite" }}
        >
          <svg width="34" height="34" viewBox="0 0 11 11" shapeRendering="crispEdges">
            <path d="M5 0h1v1h1v1h1v1h1v1h1v1h1v2H0V5h1V4h1V3h1V2h1V1h1z" fill="#0F1115" />
            <path d="M5 1h1v1h1v1h1v1h1v1H2v-1h1v-1h1v-1h1z" fill="#F6E05E" />
          </svg>
        </div>

        {/* 4. White Cross */}
        <div 
          className="absolute bottom-[38%] left-[20%] opacity-80"
          style={{ animation: "float-hero-shape-4 16s ease-in-out infinite" }}
        >
          <svg width="28" height="28" viewBox="0 0 8 8" shapeRendering="crispEdges">
            <path d="M2 0h4v8H2z M0 2h8v4H0z" fill="#0F1115" />
            <path d="M3 1h2v6H3z M1 3h6v2H1z" fill="#FAF9F6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

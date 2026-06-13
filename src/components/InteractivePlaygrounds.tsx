import React, { useState, useRef, useEffect } from "react";
import { Play, Sparkles, RefreshCw, Trash2, Sliders, Volume2, Globe, Cpu, ChevronRight, Check } from "lucide-react";

// ==========================================
// INTERACTIVE AR DRAWING CANVAS (AR SKETCH)
// ==========================================
export function ARDrawingCanvasSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState("#3b82f6");
  const [brushSize, setBrushSize] = useState(6);
  const [brushStyle, setBrushStyle] = useState<"neon" | "solid" | "dotted">("neon");
  const [handMarkerMode, setHandMarkerMode] = useState<"cursor" | "auto">("cursor");
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Simulated hand landmarks representing actual MediaPipe 21-tracking points
  const [landmarks, setLandmarks] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Draw initial abstract drawing or guidelines
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#0c0c10";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add elegant neon onboarding guide text
        ctx.font = '14px "JetBrains Mono", monospace';
        ctx.fillStyle = "rgba(173, 198, 255, 0.4)";
        ctx.fillText("Move cursor or touch here to simulate hand-tracking brush", 40, 50);
        ctx.fillText("MediaPipe Gesture: PUNCHING INDEX PINCH => ACTIVE DRAW", 40, 75);
      }
    }
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Track dummy MediaPipe landmarks around the point
    const pts = [
      { x, y }, // Index tip
      { x: x - 15, y: y + 25 }, // Pip joint
      { x: x - 30, y: y + 45 }, // Knuckle
      { x: x - 50, y: y + 80 }, // Wrist base
      { x: x + 25, y: y + 25 }, // Thumb
      { x: x + 15, y: y + 55 }, // Ring finger
    ];
    setLandmarks(pts);

    if (isDrawing || e.buttons === 1) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = brushSize;

      if (brushStyle === "neon") {
        ctx.shadowBlur = brushSize * 1.5;
        ctx.shadowColor = color;
        ctx.strokeStyle = color;
      } else {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = color;
      }

      if (brushStyle === "dotted") {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        // Since we are simulating real-time coordinates, move & draw instantly
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
      }
      
      // Keep pointer path starter
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#0c0c10";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.shadowBlur = 0;
        ctx.font = '14px "JetBrains Mono", monospace';
        ctx.fillStyle = "rgba(173, 198, 255, 0.4)";
        ctx.fillText("Canvas cleared. Start drawing now!", 40, 50);
      }
    }
    setLandmarks([]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-[#0c0c10] border border-[#1f1f29] p-4 text-white">
      {/* Simulation Workspace */}
      <div className="flex-1 relative overflow-hidden bg-black flex flex-col justify-between" style={{ minHeight: "360px" }}>
        {/* Hardware Status Overlay */}
        <div className="absolute top-3 left-3 bg-[#13131a]/90 px-3 py-1 text-xs border border-[#1f1f29] font-mono flex items-center gap-2 z-10 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>WEBCAM ACTIVE [60 FPS] • MEDIAPAPE WASM ON</span>
        </div>

        {/* Dynamic Canvas drawing workspace */}
        <canvas
          ref={canvasRef}
          width={640}
          height={380}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={() => setIsDrawing(false)}
          className="w-full h-full cursor-crosshair bg-black border border-neutral-800 touch-none block"
        />

        {/* Custom Visualizer layer rendering active 21-hand Tracking Points */}
        {landmarks.length > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {landmarks.map((pt, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#adc6ff] border border-blue-500 rounded-full"
                style={{
                  left: pt.x - 4,
                  top: pt.y - 4,
                  boxShadow: "0 0 6px rgba(59, 130, 246, 0.8)",
                  transition: "left 0.05s linear, top 0.05s linear"
                }}
              />
            ))}
            {/* Draw abstract connecting skeleton vectors */}
            {landmarks.length >= 4 && (
              <svg className="absolute inset-0 w-full h-full">
                <line
                  x1={landmarks[0].x}
                  y1={landmarks[0].y}
                  x2={landmarks[1].x}
                  y2={landmarks[1].y}
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="1.5"
                />
                <line
                  x1={landmarks[1].x}
                  y1={landmarks[1].y}
                  x2={landmarks[2].x}
                  y2={landmarks[2].y}
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="1.5"
                />
                <line
                  x1={landmarks[2].x}
                  y1={landmarks[2].y}
                  x2={landmarks[3].x}
                  y2={landmarks[3].y}
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="1.5"
                />
                <line
                  x1={landmarks[0].x}
                  y1={landmarks[0].y}
                  x2={landmarks[4].x}
                  y2={landmarks[4].y}
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="1.5"
                />
                <line
                  x1={landmarks[0].x}
                  y1={landmarks[0].y}
                  x2={landmarks[5].x}
                  y2={landmarks[5].y}
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="1.5"
                />
              </svg>
            )}
          </div>
        )}

        <div className="p-3 bg-[#13131a] border-t border-[#1f1f29] text-[11px] font-mono flex justify-between text-neutral-400">
          <span>COORDS: {landmarks[0] ? `${Math.round(landmarks[0].x)}px, ${Math.round(landmarks[0].y)}px` : "STANDBY"}</span>
          <span>GESTURE: {isDrawing ? "INDEX PINCH (DRAWING)" : "OPEN HAND (TRACKING)"}</span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-72 bg-[#13131a] border border-[#1f1f29] p-4 flex flex-col justify-between">
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#adc6ff] mb-4 flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Brush Controls
          </h4>

          {/* Color Presets */}
          <div className="mb-4">
            <span className="text-[11px] uppercase text-neutral-400 block mb-2">Neon Palettes</span>
            <div className="flex gap-2">
              {["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a855f7", "#ec4899"].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setColor(preset)}
                  className={`w-7 h-7 border transition-transform ${
                    color === preset ? "border-white scale-110" : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
          </div>

          {/* Stroke Width Selector */}
          <div className="mb-4">
            <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
              <span>Brush Thickness</span>
              <span className="font-mono text-white">{brushSize}px</span>
            </div>
            <input
              type="range"
              min="2"
              max="24"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full h-1 bg-[#1f1f29] appearance-none cursor-pointer accent-[#3b82f6]"
            />
          </div>

          {/* Brush style */}
          <div className="mb-4">
            <span className="text-[11px] uppercase text-neutral-400 block mb-2">Render Mode</span>
            <div className="grid grid-cols-3 gap-1">
              {(["neon", "solid", "dotted"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setBrushStyle(style)}
                  className={`py-1.5 text-xs uppercase font-mono border text-center transition-all ${
                    brushStyle === style
                      ? "bg-[#adc6ff] text-[#002e6a] border-[#adc6ff] font-bold"
                      : "bg-[#0c0c10] text-neutral-300 border-[#1f1f29] hover:bg-[#1f1f29]"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 leading-relaxed bg-[#0c0c10] p-2.5 border border-[#1f1f29] mt-4 mb-2">
            <span className="text-[#adc6ff] font-semibold">Live Sandbox:</span> Click inside the black workspace on the left and drag to simulate physical hand-drawn canvas rendering. Check out how coordinates stream instantly!
          </p>
        </div>

        <button
          onClick={clearCanvas}
          className="w-full mt-4 py-2 border border-red-500/40 text-red-400 text-xs uppercase tracking-widest font-bold hover:bg-red-950/20 active:opacity-80 transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Frame
        </button>
      </div>
    </div>
  );
}


// ==========================================
// INTERACTIVE HOUSE PRICE PREDICTOR
// ==========================================
export function HousePricePredictorSimulator() {
  const [quality, setQuality] = useState(7);
  const [grLivArea, setGrLivArea] = useState(1800);
  const [basementSize, setBasementSize] = useState(1100);
  const [yearBuilt, setYearBuilt] = useState(2005);
  const [neighborhood, setNeighborhood] = useState("StoneBr");
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimateResult, setEstimateResult] = useState<number | null>(null);

  // Coefficients matching normalized scale patterns for Ames House prices
  const handleEstimate = () => {
    setIsEstimating(true);
    setEstimateResult(null);
    
    setTimeout(() => {
      // Base premium price
      let baseVal = 42000;
      
      // Neighborhood multipliers
      const neighMultipliers: Record<string, number> = {
        "StoneBr": 1.45,
        "NridgHt": 1.38,
        "CollgCr": 1.05,
        "OldTown": 0.82,
        "Somerst": 1.15
      };

      const multiplier = neighMultipliers[neighborhood] || 1.0;

      // Mathematical simulation mimicking regression weights
      const qualFactor = Math.pow(quality, 2.3) * 1950;
      const areaFactor = grLivArea * 82;
      const bsmtFactor = basementSize * 65;
      const ageFactor = (yearBuilt - 1940) * 850;

      const rawCalc = (baseVal + qualFactor + areaFactor + bsmtFactor + ageFactor) * multiplier;
      
      setEstimateResult(Math.round(rawCalc));
      setIsEstimating(false);
    }, 600);
  };

  // Run on first load
  useEffect(() => {
    handleEstimate();
  }, [quality, grLivArea, basementSize, yearBuilt, neighborhood]);

  const neighborhoodLabels: Record<string, string> = {
    "StoneBr": "Stone Brook (Premium)",
    "NridgHt": "Northridge Heights (Executive)",
    "CollgCr": "College Creek (Residential)",
    "OldTown": "Old Town (Historic)",
    "Somerst": "Somerset (Planned Comm)"
  };

  return (
    <div className="bg-[#0c0c10] border border-[#1f1f29] p-5 text-white">
      <div className="flex items-center justify-between border-b border-[#1f1f29] pb-4 mb-6">
        <h4 className="font-mono text-xs uppercase tracking-widest text-[#adc6ff] flex items-center gap-2">
          <Sliders className="w-4 h-4" /> Client-Side Regression Simulator
        </h4>
        <span className="text-[10px] bg-indigo-950 text-indigo-200 border border-indigo-800 font-mono px-2 py-0.5">
          MODEL: XGBOOST REGRESSOR • LATEST AMES WEIGHTS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Area (8 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Quality Slider */}
          <div>
            <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
              <span className="font-medium">Overall Construction Quality</span>
              <span className="font-mono text-[#adc6ff]">{quality} / 10 ({quality >= 9 ? "Excellent" : quality >= 7 ? "High" : quality >= 5 ? "Average" : "Basic"})</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full h-1 bg-[#1f1f29] appearance-none cursor-pointer accent-[#3b82f6]"
            />
          </div>

          {/* Gr Living Area */}
          <div>
            <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
              <span className="font-medium">Above Grade Ground Living Area</span>
              <span className="font-mono text-[#adc6ff]">{grLivArea.toLocaleString()} SQFT</span>
            </div>
            <input
              type="range"
              min="600"
              max="4500"
              step="50"
              value={grLivArea}
              onChange={(e) => setGrLivArea(parseInt(e.target.value))}
              className="w-full h-1 bg-[#1f1f29] appearance-none cursor-pointer accent-[#3b82f6]"
            />
          </div>

          {/* Basement Size */}
          <div>
            <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
              <span className="font-medium">Total Basement Area</span>
              <span className="font-mono text-[#adc6ff]">{basementSize.toLocaleString()} SQFT</span>
            </div>
            <input
              type="range"
              min="0"
              max="3000"
              step="50"
              value={basementSize}
              onChange={(e) => setBasementSize(parseInt(e.target.value))}
              className="w-full h-1 bg-[#1f1f29] appearance-none cursor-pointer accent-[#3b82f6]"
            />
          </div>

          {/* Year Built */}
          <div>
            <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
              <span className="font-medium">Year Built</span>
              <span className="font-mono text-[#adc6ff]">{yearBuilt} ({2026 - yearBuilt} years old)</span>
            </div>
            <input
              type="range"
              min="1920"
              max="2026"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(parseInt(e.target.value))}
              className="w-full h-1 bg-[#1f1f29] appearance-none cursor-pointer accent-[#3b82f6]"
            />
          </div>

          {/* Neighborhood Select */}
          <div>
            <span className="text-xs text-neutral-400 block mb-1.5">Ames Neighborhood Group</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.keys(neighborhoodLabels).map((key) => (
                <button
                  key={key}
                  onClick={() => setNeighborhood(key)}
                  className={`py-2 px-3 text-left text-xs font-mono border flex flex-col transition-all ${
                    neighborhood === key
                      ? "border-[#3b82f6] bg-[#3b82f6]/10 text-white"
                      : "border-[#1f1f29] bg-[#13131a] text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="font-bold">{key}</span>
                  <span className="text-[9px] opacity-75 truncate">{neighborhoodLabels[key].split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prediction Results Bar (5 cols) */}
        <div className="lg:col-span-5 bg-[#13131a] border border-[#1f1f29] p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">
              Inference Metrics Output
            </span>

            {/* Estimated Price Display */}
            <div className="bg-[#0c0c10] p-4 border border-[#1f1f29]">
              <span className="text-[11px] font-mono text-neutral-400 block mb-1">PREDICTED APPRAISAL VALUE</span>
              {isEstimating ? (
                <div className="flex items-center gap-2 py-2">
                  <RefreshCw className="w-5 h-5 text-[#adc6ff] animate-spin" />
                  <span className="text-sm font-mono text-neutral-300">Evaluating features...</span>
                </div>
              ) : (
                <div className="text-3xl font-mono font-bold text-[#adc6ff]">
                  ${estimateResult?.toLocaleString()}
                </div>
              )}
            </div>

            {/* Simulated Feature Impact charts */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Model Weights Contribution</span>
              
              {/* Quality contribution */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>Overall Quality Imp</span>
                  <span>{Math.round((quality / 10) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0c0c10]">
                  <div className="h-full bg-blue-500" style={{ width: `${(quality / 10) * 100}%` }}></div>
                </div>
              </div>

              {/* Square footage contribution */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>Sq Footage Imp</span>
                  <span>{Math.round((grLivArea / 4500) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0c0c10]">
                  <div className="h-full bg-emerald-500" style={{ width: `${(grLivArea / 4500) * 100}%` }}></div>
                </div>
              </div>

              {/* Neighborhood index */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                  <span>Neighborhood Index Imp</span>
                  <span>{neighborhood === "StoneBr" ? "95" : neighborhood === "NridgHt" ? "88" : neighborhood === "CollgCr" ? "68" : neighborhood === "Somerst" ? "78" : "42"}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0c0c10]">
                  <div
                    className="h-full bg-amber-500"
                    style={{
                      width: neighborhood === "StoneBr" ? "95%" : neighborhood === "NridgHt" ? "88%" : neighborhood === "CollgCr" ? "68%" : neighborhood === "Somerst" ? "78%" : "42%"
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1f1f29] pt-4 mt-6">
            <div className="text-[11px] text-neutral-400 leading-relaxed font-mono">
              <span className="text-[#adc6ff]">Notice:</span> XGBoost leverages a multi-tree ensemble. Changing the construction quality and neighborhood triggers non-linear pricing shifts immediately on the fly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// INTERACTIVE VAANI VOICE CONSOLE TERMINAL
// ==========================================
export function VaaniVoiceConsoleSimulator() {
  const [speechLanguage, setSpeechLanguage] = useState<"hi" | "gu" | "en">("en");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "VAANI OFFLINE SPEECH ENGINE STACKED.",
    "Whisper C++ state: READY [GPU model F16 Loaded].",
    "Meta NLLB translation map: BOUND [118 languages localized].",
    "SAPI5 Audio player: Standby.",
    "Ollama LLM status: Listening..."
  ]);
  const [modelResponse, setModelResponse] = useState<string>("");
  const [inputStage, setInputStage] = useState<"idle" | "stt" | "translate" | "llm" | "tts">("idle");
  const [waveformBars, setWaveformBars] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const hindiPresets = [
    { label: "आज मौसम कैसा है?", value: "आज मौसम कैसा है?" },
    { label: "क्या तुम इंटरनेट के बिना काम करते हो?", value: "क्या तुम इंटरनेट के बिना काम करते हो?" },
    { label: "स्थानीय भाषा मॉडल का क्या अर्थ है?", value: "स्थानीय भाषा मॉडल का क्या अर्थ है?" }
  ];

  const gujaratiPresets = [
    { label: "નમસ્તે, તમારી ક્ષમતાઓ શું છે?", value: "નમસ્તે, તમારી ક્ષમતાઓ શું છે?" },
    { label: "મને એક સારો વિજ્ઞાન પ્રોજેક્ટ આપો.", value: "મને એક સારો વિજ્ઞાન પ્રોજેક્ટ આપો." },
    { label: "ગૂગલ કઈ રીતે આઈ પ્રોજેક્ટ્સ બનાવે છે?", value: "ગૂગલ કઈ રીતે આઈ પ્રોજેક્ટ્સ બનાવે છે?" }
  ];

  const englishPresets = [
    { label: "Explain quantum computing simply.", value: "Explain quantum computing simply." },
    { label: "How is local user data protected?", value: "How is local user data protected?" },
    { label: "Give me an elegant system design layout.", value: "Give me an elegant system design layout." }
  ];

  const activePresets = speechLanguage === "hi" ? hindiPresets : speechLanguage === "gu" ? gujaratiPresets : englishPresets;

  // Custom waveform animation generator
  useEffect(() => {
    if (inputStage !== "idle") {
      intervalRef.current = setInterval(() => {
        const bars = Array.from({ length: 16 }, () => Math.floor(Math.random() * 45) + 5);
        setWaveformBars(bars);
      }, 95);
    } else {
      setWaveformBars(Array.from({ length: 16 }, () => 3));
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [inputStage]);

  const runAssistantPipeline = (prompt: string) => {
    if (!prompt) return;
    setSelectedPrompt(prompt);
    setModelResponse("");
    
    // Stage 1: Local STT Decoding Simulation
    setInputStage("stt");
    setTerminalLogs((prev) => [
      ...prev,
      `[USER SPEECH DETECTED] Processing multilingual buffer...`,
      `[Whisper-STT] Decoding speech audio segments via GPU...`
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[Whisper-STT] SUCCESS: "${prompt}"`
      ]);

      // Stage 2: Meta NLLB-200 Translation Translation
      setInputStage("translate");
      setTerminalLogs((prev) => [
        ...prev,
        `[Meta-NLLB-200] Mapping lexical vector representations...`,
        `[Meta-NLLB-200] Translation completed [Source Language: ${speechLanguage.toUpperCase()}]`
      ]);

      setTimeout(() => {
        // Enforce translation to english internally
        const englishTranslation =
          speechLanguage === "hi"
            ? "Simulated English translation: " + prompt + " (translated from Hindi)"
            : speechLanguage === "gu"
            ? "Simulated English translation: " + prompt + " (translated from Gujarati)"
            : prompt;

        setTerminalLogs((prev) => [
          ...prev,
          `[Meta-NLLB-200] Intermediate representation passed: "${englishTranslation}"`
        ]);

        // Stage 3: Ollama local LLM execution
        setInputStage("llm");
        setTerminalLogs((prev) => [
          ...prev,
          `[Ollama-LLM] Prompting local mistral/llama model...`,
          `[Ollama-LLM] Computing token arrays...`
        ]);

        setTimeout(() => {
          let answer = "";
          if (speechLanguage === "en") {
            if (prompt.includes("quantum")) {
              answer = "Quantum computing excels at complex probability matrices using qubits in superposition to evaluate parallel compute options instantly.";
            } else if (prompt.includes("protected")) {
              answer = "Vaani runs entirely off-grid. All raw microphone audio remains in RAM buffers, utilizing offline Whisper execution without dialing standard external APIs.";
            } else {
              answer = "Calculated custom semantic query locally. The offline neural pipeline operates bounds with low latency and high accuracy.";
            }
          } else if (speechLanguage === "hi") {
            answer = "नमस्ते! मैं वाणी हूँ, आपका पूरी तरह से ऑफलाइन काम करने वाला स्थानीय सुरक्षा-केन्द्रित वॉयस असिस्टेंट। आज मौसम बहुत सुहावना है।";
          } else {
            answer = "કેમ છો! વરસાણી હોસ્ટ હાર્ડવેર પર્ફોર્મન્સ ખુબ જ સરસ છે! આ મશીન લર્નિંગ પ્રોજેક્ટ સફળતાપૂર્વક લોકલ ડિસ્ક પર કાર્યરત થાય છે.";
          }

          setModelResponse(answer);
          setTerminalLogs((prev) => [
            ...prev,
            `[Ollama-LLM] Generation finished.`
          ]);

          // Stage 4: TTS generation
          setInputStage("tts");
          setTerminalLogs((prev) => [
            ...prev,
            `[SAPI5-TTS] Synthesizing audio voice response...`,
            `[SAPI5-TTS] Speech stream output: "Listening completed successfully."`
          ]);

          setTimeout(() => {
            setInputStage("idle");
          }, 1500);

        }, 1200);

      }, 800);

    }, 1000);
  };

  return (
    <div className="bg-[#0c0c10] border border-[#1f1f29] p-5 text-white font-mono">
      <div className="flex items-center justify-between border-b border-[#1f1f29] pb-4 mb-6">
        <h4 className="text-xs uppercase tracking-widest text-[#adc6ff] flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-400" /> Vaani Pipeline Console Logs
        </h4>
        <span className="text-[10px] bg-emerald-950 text-emerald-200 border border-emerald-800 px-2 py-0.5">
          100% OFF-GRID PIPELINE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings and Trigger presets Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <span className="text-[11px] text-neutral-400 uppercase block mb-2">Input Voice Language</span>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: "en", label: "English" },
                { id: "hi", label: "हिन्दी (Hindi)" },
                { id: "gu", label: "ગુજરાતી (Gu)" }
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setSpeechLanguage(lang.id as any);
                    setSelectedPrompt("");
                    setModelResponse("");
                  }}
                  className={`py-2 text-[11px] border text-center transition-all ${
                    speechLanguage === lang.id
                      ? "bg-emerald-950/40 border-emerald-500/80 text-emerald-400 font-bold"
                      : "bg-[#13131a] border-[#1f1f29] text-neutral-400 hover:text-white"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] text-neutral-400 uppercase block mb-2">Simulated Voice Questions</span>
            <div className="space-y-2">
              {activePresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => runAssistantPipeline(preset.value)}
                  disabled={inputStage !== "idle"}
                  className="w-full text-left py-2 px-3 text-xs bg-[#13131a] hover:bg-[#1f1f29]/80 border border-[#1f1f29] transition-all flex items-start gap-2.5 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span className="truncate">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="bg-[#13131a] border border-[#1f1f29] p-4 text-center">
            <span className="text-[10px] text-neutral-400 uppercase block mb-3">Speech Output Decibel Spectrogram</span>
            <div className="flex items-end justify-center gap-1.5 h-14">
              {waveformBars.map((height, i) => (
                <div
                  key={i}
                  className={`w-1.5 transition-all duration-75 ${
                    inputStage !== "idle" ? "bg-emerald-400" : "bg-neutral-700"
                  }`}
                  style={{ height: `${height * 2}%` }}
                />
              ))}
            </div>
            <span className="text-[9px] text-neutral-400 block mt-2.5 uppercase">
              {inputStage === "stt"
                ? "🎙️ Transcribing Audio Buffer..."
                : inputStage === "translate"
                ? "🌍 Translating..."
                : inputStage === "llm"
                ? "🧠 Evaluating Local LLM..."
                : inputStage === "tts"
                ? "🔊 Synthesizing speech speaker..."
                : "Standby for signal input"}
            </span>
          </div>
        </div>

        {/* Real-time logging terminal stdout (7 cols) */}
        <div className="lg:col-span-7 bg-[#050508] border border-[#1f1f29] p-4 flex flex-col justify-between" style={{ minHeight: "340px" }}>
          <div>
            <span className="text-[10px] text-neutral-500 uppercase block mb-2 font-bold select-none border-b border-neutral-900 pb-1">
              SYSTEM CONSOLE BACKEND STDOUT (SCROLLABLE)
            </span>
            <div className="space-y-1.5 h-44 overflow-y-auto pr-1 text-[11px] font-mono leading-normal text-emerald-300">
              {terminalLogs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-neutral-500 select-none">{"$"}</span>
                  <p className="break-all">{log}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#13131a] p-3 border-t border-[#1f1f29] mt-4 min-h-[90px]">
            <span className="text-[10px] text-neutral-400 block mb-1">LOCAL ASSISTANT RESPONSE VALUE (TTS):</span>
            {modelResponse ? (
              <p className="text-xs text-white leading-relaxed">{modelResponse}</p>
            ) : (
              <p className="text-xs text-neutral-500 italic">Select one of the simulated voice questions on the left to fire the private pipeline.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// CUSTOM SVG QR COMPONENT FOR ARENAHUB PASSES
// ==========================================
function QRComponent() {
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" className="text-white fill-current">
      <rect x="0" y="0" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="5" y="5" width="15" height="15" fill="currentColor" />
      <rect x="75" y="0" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="80" y="5" width="15" height="15" fill="currentColor" />
      <rect x="0" y="75" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="5" y="80" width="15" height="15" fill="currentColor" />
      <rect x="35" y="10" width="10" height="5" fill="currentColor" />
      <rect x="50" y="0" width="5" height="15" fill="currentColor" />
      <rect x="35" y="30" width="15" height="10" fill="currentColor" />
      <rect x="60" y="25" width="10" height="15" fill="currentColor" />
      <rect x="35" y="50" width="20" height="5" fill="currentColor" />
      <rect x="10" y="35" width="15" height="5" fill="currentColor" />
      <rect x="0" y="50" width="5" height="10" fill="currentColor" />
      <rect x="75" y="45" width="5" height="20" fill="currentColor" />
      <rect x="85" y="35" width="15" height="5" fill="currentColor" />
      <rect x="80" y="50" width="10" height="10" fill="currentColor" />
      <rect x="35" y="65" width="10" height="15" fill="currentColor" />
      <rect x="50" y="80" width="20" height="10" fill="currentColor" />
      <rect x="60" y="65" width="5" height="10" fill="currentColor" />
      <rect x="85" y="75" width="15" height="5" fill="currentColor" />
      <rect x="75" y="85" width="10" height="15" fill="currentColor" />
    </svg>
  );
}

// ==========================================
// INTERACTIVE ARENAHUB BOOKING PLATFORM
// ==========================================
export function ArenaHubSimulator() {
  const [arenaType, setArenaType] = useState<"turf" | "gaming">("turf");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("06:00 PM - 07:00 PM");
  const [addons, setAddons] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [ticketData, setTicketData] = useState<{
    id: string;
    type: "turf" | "gaming";
    dayName: string;
    slot: string;
    addons: string[];
    price: number;
  } | null>(null);

  const days = [
    { name: "Mon", date: "15" },
    { name: "Tue", date: "16" },
    { name: "Wed", date: "17" },
    { name: "Thu", date: "18" },
    { name: "Fri", date: "19" },
    { name: "Sat", date: "20" },
  ];

  const slots = [
    "09:00 AM - 10:00 AM",
    "02:00 PM - 03:00 PM",
    "06:00 PM - 07:00 PM",
    "08:00 PM - 09:00 PM",
    "09:00 PM - 10:00 PM",
  ];

  const addonsList =
    arenaType === "turf"
      ? [
          { id: "bibs", label: "Team Bibs & Cones Rental", price: 10 },
          { id: "balls", label: "Pro Ball Rental (x2)", price: 8 },
          { id: "beverage", label: "Energy Drinks Package (x5)", price: 15 },
        ]
      : [
          { id: "headset", label: "Premium Headset Upgrade", price: 5 },
          { id: "stream", label: "Live Broadcast/Stream Setup", price: 20 },
          { id: "keyboard", label: "Haptic Keyboard & Mouse", price: 8 },
        ];

  const toggleAddon = (id: string) => {
    if (addons.includes(id)) {
      setAddons(addons.filter((a) => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  const calculateTotal = () => {
    const basePrice = arenaType === "turf" ? 60 : 25;
    const addonsPrice = addons.reduce((sum, a) => {
      const item = addonsList.find((x) => x.id === a);
      return sum + (item ? item.price : 0);
    }, 0);
    return basePrice + addonsPrice;
  };

  const handleBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      setTicketData({
        id: `AH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        type: arenaType,
        dayName: `${days[selectedDay].name} June ${days[selectedDay].date}`,
        slot: selectedSlot,
        addons: addons.map((a) => addonsList.find((x) => x.id === a)?.label || ""),
        price: calculateTotal(),
      });
      setIsBooking(false);
    }, 800);
  };

  return (
    <div className="bg-[#0c0c10] border border-[#1f1f29] p-5 text-white">
      <div className="flex items-center justify-between border-b border-[#1f1f29] pb-4 mb-6">
        <h4 className="font-mono text-xs uppercase tracking-widest text-[#adc6ff] flex items-center gap-2 font-black">
          <Sliders className="w-4 h-4" /> Interactive Arena Booking Engine
        </h4>
        <span className="text-[10px] bg-blue-950 text-blue-200 border border-blue-800 font-mono px-2 py-0.5">
          STATEFUL CALENDAR & PASS GENERATION
        </span>
      </div>

      {!ticketData ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Arena Type Toggle */}
            <div>
              <span className="text-[11px] uppercase text-neutral-400 block mb-2 font-mono">Select Arena Experience</span>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setArenaType("turf");
                    setAddons([]);
                  }}
                  className={`py-3 px-4 text-left border font-mono transition-all flex flex-col justify-between cursor-pointer ${
                    arenaType === "turf"
                      ? "border-blue-500 bg-blue-500/10 text-white"
                      : "border-[#1f1f29] bg-[#13131a] text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="font-bold text-sm">FIFA-Pro Sports Turf</span>
                  <span className="text-[10px] opacity-75 mt-1">$60 / Hour</span>
                </button>
                <button
                  onClick={() => {
                    setArenaType("gaming");
                    setAddons([]);
                  }}
                  className={`py-3 px-4 text-left border font-mono transition-all flex flex-col justify-between cursor-pointer ${
                    arenaType === "gaming"
                      ? "border-blue-500 bg-blue-500/10 text-white"
                      : "border-[#1f1f29] bg-[#13131a] text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="font-bold text-sm">Esports Arena Seat</span>
                  <span className="text-[10px] opacity-75 mt-1">$25 / Hour</span>
                </button>
              </div>
            </div>

            {/* Simulated Weekly Calendar Row */}
            <div>
              <span className="text-[11px] uppercase text-neutral-400 block mb-2 font-mono">Select Booking Date</span>
              <div className="grid grid-cols-6 gap-2">
                {days.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay(idx)}
                    className={`py-2 text-center border font-mono flex flex-col items-center justify-center transition-all cursor-pointer ${
                      selectedDay === idx
                        ? "border-emerald-500 bg-emerald-500/10 text-white"
                        : "border-[#1f1f29] bg-[#13131a] text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-light">{day.name}</span>
                    <span className="text-sm font-bold mt-0.5">{day.date}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selector */}
            <div>
              <span className="text-[11px] uppercase text-neutral-400 block mb-2 font-mono">Available Time Slots</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 text-center text-xs font-mono border transition-all cursor-pointer ${
                      selectedSlot === slot
                        ? "border-blue-500 bg-blue-500/15 text-white"
                        : "border-[#1f1f29] bg-[#13131a] text-neutral-400 hover:text-white"
                    }`}
                  >
                    {slot.replace(" - ", " - \n")}
                  </button>
                ))}
              </div>
            </div>

            {/* Addons Selection */}
            <div>
              <span className="text-[11px] uppercase text-neutral-400 block mb-2 font-mono">Optional Service Add-ons</span>
              <div className="space-y-2">
                {addonsList.map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`w-full py-2.5 px-4 text-left border flex items-center justify-between font-mono text-xs transition-all cursor-pointer ${
                      addons.includes(addon.id)
                        ? "border-emerald-500 bg-emerald-500/5 text-emerald-400"
                        : "border-[#1f1f29] bg-[#13131a] text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 border flex items-center justify-center ${addons.includes(addon.id) ? "border-emerald-500 bg-emerald-500" : "border-neutral-700 bg-black"}`}>
                        {addons.includes(addon.id) && <Check className="w-2.5 h-2.5 text-black" />}
                      </div>
                      <span>{addon.label}</span>
                    </div>
                    <span className="font-bold">+${addon.price}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Booking Panel */}
          <div className="lg:col-span-5 bg-[#13131a] border border-[#1f1f29] p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">
                Booking Cost Overview
              </span>

              <div className="bg-[#0c0c10] p-4 border border-[#1f1f29] space-y-3 font-mono">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Base Rate ({arenaType === "turf" ? "Turf" : "Seat"})</span>
                  <span className="text-white">${arenaType === "turf" ? 60 : 25}</span>
                </div>
                {addons.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 block uppercase">ADD-ONS</span>
                    {addons.map((a) => {
                      const item = addonsList.find((x) => x.id === a);
                      return (
                        <div key={a} className="flex justify-between text-[11px] text-neutral-400">
                          <span className="truncate max-w-[180px]">• {item?.label}</span>
                          <span>+${item?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="h-[1px] bg-[#1f1f29] my-2"></div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-neutral-400">ESTIMATED TOTAL</span>
                  <span className="text-xl text-[#adc6ff]">${calculateTotal()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={isBooking}
              className="w-full py-4 bg-[#adc6ff] text-[#002e6a] border border-[#adc6ff] font-mono text-xs uppercase font-extrabold tracking-widest hover:brightness-110 active:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 mt-6 font-black"
            >
              {isBooking ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>TRANSACTING BOOKING...</span>
                </>
              ) : (
                <>
                  <span>CONFIRM & BOOK EXPERIENCE</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-6">
          {/* Stateful Ticket Pass Card */}
          <div className="w-full max-w-md bg-[#13131a] border border-blue-500/40 relative overflow-hidden rounded-sm shadow-xl font-mono">
            {/* Holographic Header Bar */}
            <div className="bg-gradient-to-r from-blue-900 to-emerald-900 px-6 py-3.5 border-b border-blue-500/20 flex justify-between items-center text-xs">
              <span className="font-bold text-white uppercase tracking-wider">BOARDING PASS • SECURITY APPROVED</span>
              <span className="text-[#adc6ff]">{ticketData.id}</span>
            </div>

            {/* Cutout side notches simulating classic ticket coupons */}
            <div className="absolute top-1/2 -left-3.5 w-7 h-7 bg-[#0c0c10] border border-[#1f1f29] rounded-full z-10"></div>
            <div className="absolute top-1/2 -right-3.5 w-7 h-7 bg-[#0c0c10] border border-[#1f1f29] rounded-full z-10"></div>

            {/* Ticket Core Content */}
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase block">ARENA SLOT EXPERIENCE</span>
                  <span className="text-lg font-bold text-white uppercase">
                    {ticketData.type === "turf" ? "⚽ Sports Turf Pitch" : "🎮 Pro Gaming Station"}
                  </span>
                </div>
                {/* Stateful QR */}
                <div className="bg-white p-2 border border-neutral-300 shadow-md text-black">
                  <QRComponent />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs border-t border-b border-[#1f1f29] py-4">
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase block">RESERVATION DATE</span>
                  <span className="font-semibold text-neutral-200">{ticketData.dayName}</span>
                </div>
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase block">TIME WINDOW</span>
                  <span className="font-semibold text-neutral-200">{ticketData.slot}</span>
                </div>
              </div>

              {ticketData.addons.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[9px] text-neutral-500 uppercase block">SERVICES ATTACHED</span>
                  <div className="text-[10px] text-neutral-400 space-y-0.5">
                    {ticketData.addons.map((a, i) => (
                      <div key={i}>• {a}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center bg-[#0c0c10] p-4 border border-[#1f1f29]">
                <div>
                  <span className="text-[9px] text-neutral-500 block">TRANSACTED AMOUNT</span>
                  <span className="text-lg font-bold text-emerald-400">${ticketData.price}</span>
                </div>
                <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[9px] px-2.5 py-1 uppercase font-bold tracking-widest rounded-sm font-black">
                  ✓ VERIFIED PASS
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setTicketData(null);
              setAddons([]);
            }}
            className="mt-6 py-2 px-6 border border-neutral-700 text-neutral-400 font-mono text-xs uppercase font-bold hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
          >
            ← Book Another Slot
          </button>
        </div>
      )}
    </div>
  );
}


// ==========================================
// INTERACTIVE AI STUDY PLANNER
// ==========================================
export function AIStudyPlannerSimulator() {
  const [subject, setSubject] = useState("ml");
  const [prepTime, setPrepTime] = useState("1week");
  const [intensity, setIntensity] = useState("medium");
  const [isGenerating, setIsGenerating] = useState(false);
  const [studySchedule, setStudySchedule] = useState<{ day: string; task: string; completed: boolean }[] | null>(null);

  const generateSchedule = () => {
    setIsGenerating(true);
    setStudySchedule(null);

    setTimeout(() => {
      let tasks: string[] = [];
      if (subject === "ml") {
        tasks = [
          "Feature engineering: Data normalization & Ames housing outlier cleanup.",
          "Model training: Hyperparameter tuning with Grid Search on XGBoost weights.",
          "Inference pipelines: Building schema validators with strict Flask data filters.",
          "Deployment setup: Docker setup & hosting checks on CPU bounds."
        ];
      } else if (subject === "react") {
        tasks = [
          "React 19 upgrades: Hook migrations & context state profiling.",
          "Tailwind CSS v4 layouts: Transition-delay settings & modern color token configs.",
          "Bundle tuning: Dynamic lazy loading of large components and visual modules.",
          "State synchronization: localStore theme preference checking and clean loads."
        ];
      } else if (subject === "speech") {
        tasks = [
          "Audio recording pipeline: Decibel threshold triggers & WebRTC silence detectors.",
          "Whisper STT: Whisper C++ model initialization and local GPU translations.",
          "Multilingual translation: Meta NLLB-200 lexical mapping checks.",
          "TTS synthesis: SAPI5 offline multi-threaded voice synthesizers."
        ];
      } else {
        tasks = [
          "Data structures: Vector math, geometry, and coordinates matrix overlays.",
          "Time complexities: Profiling latency logs to isolate rendering blockers.",
          "System architecture: Thread synchronization and callback loops optimization.",
          "Mock evaluation: Full application unit check and test cases checks."
        ];
      }

      // Slice or repeat tasks depending on the timeline selected
      const dayLabels = prepTime === "1week" ? ["Day 1", "Day 2", "Day 3", "Day 4"] : ["Week 1", "Week 2", "Week 3", "Week 4"];
      const generated = dayLabels.map((label, idx) => ({
        day: label,
        task: tasks[idx] || "Advanced system optimization reviews.",
        completed: false
      }));

      setStudySchedule(generated);
      setIsGenerating(false);
    }, 900);
  };

  const toggleTask = (index: number) => {
    if (!studySchedule) return;
    const updated = [...studySchedule];
    updated[index].completed = !updated[index].completed;
    setStudySchedule(updated);
  };

  const getCompletionPercent = () => {
    if (!studySchedule) return 0;
    const completed = studySchedule.filter((t) => t.completed).length;
    return Math.round((completed / studySchedule.length) * 100);
  };

  const subjectLabels: Record<string, string> = {
    ml: "Machine Learning (XGBoost/Scikit)",
    react: "Advanced React & Vite Architecture",
    speech: "Speech Processing (Whisper/TTS)",
    dsa: "Data Structures & Telemetry Log Math"
  };

  return (
    <div className="bg-[#0c0c10] border border-[#1f1f29] p-5 text-white font-mono">
      <div className="flex items-center justify-between border-b border-[#1f1f29] pb-4 mb-6">
        <h4 className="text-xs uppercase tracking-widest text-[#adc6ff] flex items-center gap-2 font-black">
          <Sliders className="w-4 h-4" /> AI Study Timeline Scheduler
        </h4>
        <span className="text-[10px] bg-purple-950 text-purple-200 border border-purple-800 px-2 py-0.5">
          DYNAMIC SCHEDULER ALGORITHM
        </span>
      </div>

      {!studySchedule ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* Subject Select */}
            <div>
              <span className="text-[11px] text-neutral-400 uppercase block mb-2 font-mono">Target Study Subject</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#13131a] border border-[#1f1f29] text-sm text-neutral-200 p-3 outline-none focus:border-purple-500 rounded-sm font-mono cursor-pointer"
              >
                {Object.entries(subjectLabels).map(([key, label]) => (
                  <option key={key} value={key} className="bg-[#13131a] text-neutral-200">
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Preparation Period */}
            <div>
              <span className="text-[11px] text-neutral-400 uppercase block mb-2 font-mono">Timeline Duration Limit</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "1week", label: "Short Prep (1 Week)" },
                  { id: "4weeks", label: "Full Prep (4 Weeks)" }
                ].map((time) => (
                  <button
                    key={time.id}
                    onClick={() => setPrepTime(time.id)}
                    className={`py-2 px-3 text-xs border text-center transition-all cursor-pointer ${
                      prepTime === time.id
                        ? "border-purple-500 bg-purple-500/10 text-purple-300 font-bold"
                        : "border-[#1f1f29] bg-[#13131a] text-neutral-400 hover:text-white"
                    }`}
                  >
                    {time.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity */}
            <div>
              <span className="text-[11px] text-neutral-400 uppercase block mb-2 font-mono">Daily Study Intensity</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "casual", label: "Casual (1h)" },
                  { id: "medium", label: "Medium (3h)" },
                  { id: "hardcore", label: "Hardcore (6h)" }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setIntensity(opt.id)}
                    className={`py-2 text-[11px] border text-center transition-all cursor-pointer ${
                      intensity === opt.id
                        ? "border-purple-500 bg-purple-500/10 text-purple-300 font-bold"
                        : "border-[#1f1f29] bg-[#13131a] text-neutral-400 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trigger Button & Preview Panel */}
          <div className="lg:col-span-5 bg-[#13131a] border border-[#1f1f29] p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">
                Study Config Info
              </span>

              <div className="bg-[#0c0c10] p-4 border border-[#1f1f29] text-xs text-neutral-400 space-y-2 leading-relaxed">
                <div>• <span className="text-white">Topic:</span> {subjectLabels[subject]}</div>
                <div>• <span className="text-white">Duration:</span> {prepTime === "1week" ? "4 study days" : "4 study weeks"}</div>
                <div>• <span className="text-white">Intensity Level:</span> {intensity.toUpperCase()}</div>
              </div>
            </div>

            <button
              onClick={generateSchedule}
              disabled={isGenerating}
              className="w-full py-4 bg-purple-600 text-white border border-purple-600 text-xs uppercase font-extrabold tracking-widest hover:brightness-110 active:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 mt-6 font-black"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI CALCULATING TIMELINE...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>GENERATE STUDY PLAN</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#13131a] border border-[#1f1f29] p-4">
            <div>
              <span className="text-[10px] text-neutral-500 block uppercase">PLAN FOCUS SUBJECT</span>
              <span className="text-xs font-bold text-white uppercase">{subjectLabels[subject]}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-neutral-500 block uppercase">COMPLETION</span>
                <span className="text-sm font-bold text-purple-400">{getCompletionPercent()}% Done</span>
              </div>
              <div className="w-24 h-2 bg-[#0c0c10] border border-[#1f1f29] rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: `${getCompletionPercent()}%` }}></div>
              </div>
            </div>
          </div>

          {/* Schedule list checklist */}
          <div className="space-y-3">
            {studySchedule.map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleTask(idx)}
                className={`w-full p-4 border text-left flex items-start gap-4 transition-all cursor-pointer ${
                  item.completed
                    ? "border-purple-900 bg-purple-950/15 text-neutral-400"
                    : "border-[#1f1f29] bg-[#13131a] text-neutral-100 hover:border-purple-500/50"
                }`}
              >
                <div className={`w-5 h-5 border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  item.completed ? "border-purple-500 bg-purple-500 text-white" : "border-neutral-700 bg-black"
                }`}>
                  {item.completed && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="space-y-1">
                  <span className={`text-[10px] uppercase font-bold tracking-widest font-mono ${item.completed ? "text-purple-500" : "text-[#adc6ff]"}`}>
                    {item.day}
                  </span>
                  <p className={`text-xs leading-relaxed ${item.completed ? "line-through text-neutral-500" : ""}`}>
                    {item.task}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setStudySchedule(null)}
              className="py-2 px-6 border border-neutral-700 text-neutral-400 text-xs uppercase font-bold hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
            >
              ← Configure New Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


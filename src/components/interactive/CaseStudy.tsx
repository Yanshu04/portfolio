import React, { useState } from "react";
import { Terminal, ShieldAlert, Cpu, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ProjectSpecs from "../ui/ProjectSpecs";
import { Project } from "../../types";

interface CaseStudyProps {
  project: Project;
}

export default function CaseStudy({ project }: CaseStudyProps) {
  const [activeTab, setActiveTab] = useState<"challenge" | "process" | "telemetry">("challenge");

  const caseStudiesMap: Record<string, {
    challenge: string;
    process: string[];
    formula?: string;
    metrics: { label: string; value: string; }[];
  }> = {
    "ar-sketch": {
      challenge: "Processing high-dimensional video streams in real-time on client browsers was bottlenecked by CPU overhead. Mapping 21 raw 3D hand coordinates accurately into a drawing canvas without introducing visual jitter or latency required edge WebAssembly optimizations.",
      process: [
        "Ported handlandmark tracking pipeline to WebAssembly using MediaPipe Web SDK.",
        "Implemented a double-buffered gesture stabilization filter using geometric distance thresholds.",
        "Wrote coordinate mapping algorithms to project screen landmarks into web viewport scales at 60fps."
      ],
      formula: "ProjectedCoords = (RawLandmark * ViewportScale) + AnchorOffset",
      metrics: [
        { label: "Pipeline Latency", value: "<16.6ms (Edge-run)" },
        { label: "Tracking Precision", value: "99.4% coordinates" },
        { label: "Wasm Size", value: "3.2 MB raw assets" }
      ]
    },
    "house-predictor": {
      challenge: "Developing an accurate Ames Housing model without causing overfitting or slow endpoint queries. Integrating feature engineering of 40+ high-cardinality structural parameters into a lightweight microservice deployable on standard server environments.",
      process: [
        "Processed high-skew ordinal features using log transformations and target encoding.",
        "Ran a hyperparameter grid sweep over depth, estimators, and learning rate limits.",
        "Wrapped the final XGBoost model inside a validated Flask REST API with JSON schema enforcement."
      ],
      formula: "PredPrice = \\sum_{m=1}^{M} f_m(X_{house})",
      metrics: [
        { label: "Model RMSE", value: "0.113 (Log Scale)" },
        { label: "Schema Validation", value: "Strict OpenAPI v3" },
        { label: "API Query", value: "42ms latency" }
      ]
    },
    "vaani": {
      challenge: "Chaining heavy neural networks (Speech-to-Text, Machine Translation, Local Large Language Model, and Speech Synthesis) to operate fully locally on standard consumer computers without API access, all while keeping memory allocations under a 16GB VRAM budget.",
      process: [
        "Chained quantized Whisper STT with Meta NLLB-200 local translation nodes.",
        "Integrated llama.cpp / Ollama with a thread-isolated prompt-dispatch queue.",
        "Configured asynchronous SAPI5 TTS engines to prevent audio synthesizers from blocking LLM token generation loops."
      ],
      formula: "AudioStream -> Whisper STT -> NLLB-200 -> Ollama LLM -> TTS",
      metrics: [
        { label: "Model Quantization", value: "Q4_K_M (Mistral-7B)" },
        { label: "VRAM Budget", value: "9.6 GB Allocated" },
        { label: "Generation Loop", value: "~1.2s round-trip" }
      ]
    },
    "arenahub": {
      challenge: "Building a booking scheduler platform with responsive analytics. Standard UI libraries introduced visual overhead and bloated bundle sizes. Creating a calendar scheduling grid that updates and visualizes real-time analytics demanded custom state architecture.",
      process: [
        "Designed a custom grid scheduler from scratch using React state management contexts.",
        "Integrated stateful QR boarding pass rendering to process entry passes instantly.",
        "Integrated SVG-based Recharts widgets to display hourly bookings dynamically."
      ],
      formula: "CalendarGrid = 7 Columns * (DynamicDaysOfMonth / 7)",
      metrics: [
        { label: "UI Library Weight", value: "0kb (Vanilla CSS Grid)" },
        { label: "Render Overhead", value: "Zero Virtual DOM lag" },
        { label: "Pass Generation", value: "Instant client-side QR" }
      ]
    },
    "ai-planner": {
      challenge: "Calculating adaptive preparation schedules based on changing deadlines and exam weights. Resolving the optimization problem in the browser without locking the execution thread during complex priority calculations.",
      process: [
        "Wrote a priority weight scheduler algorithm mapping subject volume to remaining prep days.",
        "Optimized scheduling calculations to run within requestIdleCallback blocks.",
        "Designed a dark mode layout optimized for focus and dashboard tracking."
      ],
      formula: "Priority = (SubjectWeight * Volume) / DaysToDeadline",
      metrics: [
        { label: "Optimizer Complexity", value: "O(N log N) scheduler" },
        { label: "Execution Layer", value: "Parallel Web Worker" },
        { label: "Theme Coverage", value: "100% Dark Mode native" }
      ]
    },
    "speech-asr": {
      challenge: "Building a continuous voice transcription system directly on local consumer hardware. The pipeline must filter background silence using Google's webrtcvad, extract 40-band log-mel acoustic frames, and run low-latency greedy sequence decoding without exceeding GPU memory ceilings.",
      process: [
        "Constructed a 3-layer 2D CNN encoder downsampling time sequences for temporal processing.",
        "Implemented a 2-layer thread-isolated BiLSTM sequence decoder to model global character dependencies.",
        "Created a custom character vocab (287 tokens) mapping Latin letters and unicode blocks for Hindi and Gujarati scripts."
      ],
      formula: "RawAudio(16kHz) -> webrtcvad -> MelSpectrogram -> CNNEncoder -> BiLSTMDecoder -> CTCLoss",
      metrics: [
        { label: "VRAM Occupancy", value: "<4.0 GB VRAM" },
        { label: "Best Eval Loss", value: "0.9358 (CTC loss)" },
        { label: "Pipeline Latency", value: "Real-time streaming" }
      ]
    },
    "solar-tracker": {
      challenge: "Designing a responsive Android dashboard that consolidates real-time solar panel telemetry, weather data, and performance forecasting into a single cohesive interface.",
      process: [
        "Architected a clean MVVM separation with Kotlin StateFlow for reactive UI updates from live panel status APIs.",
        "Integrated a weather REST API scoped to the Rajkot region to derive irradiance-adjusted performance forecasts.",
        "Designed a Jetpack Compose dashboard with dynamic status cards, health indicators, and a panel efficiency graph."
      ],
      formula: "PanelOutput(kW) = Irradiance(W/m²) * PanelArea * Efficiency * (1 - TempCoeff * ΔT)",
      metrics: [
        { label: "Platform Target", value: "Android API 26+" },
        { label: "UI Framework", value: "Jetpack Compose" },
        { label: "Architecture Pattern", value: "MVVM + StateFlow" }
      ]
    }
  };

  const study = caseStudiesMap[project.id] || {
    challenge: project.description,
    process: project.highlights,
    metrics: project.specs ?? []
  };

  return (
    <div className="border-t border-neutral-800 light:border-neutral-200 mt-6 pt-5">
      {/* Case Study Tabs Selector */}
      <div className="flex border-b border-neutral-850 light:border-neutral-200 pb-2 mb-5 select-none text-[11px] md:text-xs font-mono gap-4">
        {(["challenge", "process", "telemetry"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 uppercase font-bold tracking-widest relative cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === tab 
                ? "text-[#E53E3E] light:text-[#2B6CB0] font-black" 
                : "text-neutral-500 hover:text-white light:hover:text-black"
            }`}
          >
            <span>{tab}</span>
            {activeTab === tab && (
              <motion.div
                layoutId={`caseStudyActiveTab-${project.id}`}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E53E3E] light:bg-[#2B6CB0]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[140px] font-sans">
        <AnimatePresence mode="wait">
          {activeTab === "challenge" && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <h4 className="text-[10px] md:text-xs uppercase font-mono tracking-widest text-[#D69E2E] light:text-blue-800 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#E53E3E]" />
                <span>[THE CHALLENGE STATEMENT]</span>
              </h4>
              <p className="text-sm md:text-[15px] text-neutral-300 light:text-neutral-700 leading-relaxed font-sans font-medium">
                {study.challenge}
              </p>
            </motion.div>
          )}

          {activeTab === "process" && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-[10px] md:text-xs uppercase font-mono tracking-widest text-[#D69E2E] light:text-blue-800 font-bold flex items-center gap-1.5 mb-2">
                <Cpu className="w-3.5 h-3.5 text-[#2B6CB0]" />
                <span>[ENGINEERING MILESTONES]</span>
              </h4>
              <ul className="space-y-2.5">
                {study.process.map((step, idx) => (
                  <li key={idx} className="flex gap-3 items-start leading-snug">
                    <div className="w-5 h-5 border border-neutral-700 light:border-black flex items-center justify-center font-mono text-[10px] text-neutral-400 light:text-neutral-800 shrink-0 font-bold bg-black light:bg-[#f5f2eb]">
                      0{idx + 1}
                    </div>
                    <span className="text-sm text-neutral-300 light:text-neutral-700 font-sans">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {activeTab === "telemetry" && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-[10px] md:text-xs uppercase font-mono tracking-widest text-[#D69E2E] light:text-blue-800 font-bold flex items-center gap-1.5 mb-3">
                <Activity className="w-3.5 h-3.5 text-[#E53E3E]" />
                <span>[HARDWARE &amp; TELEMETRY SPECS]</span>
              </h4>
              
              {/* Specs Grid */}
              <ProjectSpecs specs={study.metrics} />

              {/* Code / Mathematical Equation Panel */}
              {study.formula && (
                <div className="bg-[#0B0B0C] border border-neutral-800 light:border-black p-3 flex items-center gap-3 font-mono text-[10px] md:text-[11px] text-emerald-400 light:text-emerald-700 select-all">
                  <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{study.formula}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

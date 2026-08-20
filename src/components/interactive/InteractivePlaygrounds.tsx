import React, { useState, useRef, useEffect } from "react";
import { Play, Sparkles, RefreshCw, Trash2, Sliders, Volume2, Globe, Cpu, ChevronRight, Check } from "lucide-react";


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
      setTerminalLogs((prev) => [...prev, "[NLLB-200] Mapping cross-lingual translation layer..."]);

      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, "[NLLB-200] Translation complete → English output token mapped."]);

        // Stage 3: Ollama LLM Evaluation Simulation
        setInputStage("llm");
        setTerminalLogs((prev) => [...prev, "[Ollama-LLM] Routing inference to local model layer..."]);

        const answers: Record<string, string> = {
          "Explain quantum computing simply.": "Quantum computing uses qubits instead of classical bits. Qubits can represent both 0 and 1 simultaneously via superposition, enabling massively parallel computation.",
          "How is local user data protected?": "All inference runs fully offline. No network requests are made. Audio is processed in memory and immediately discarded — no persistent logs on server.",
          "Give me an elegant system design layout.": "Client → API Gateway → Load Balancer → Microservices → Database Layer → CDN. Event-driven with async message queues for decoupled scaling.",
          "आज मौसम कैसा है?": "स्थानीय AI सिस्टम में रियल-टाइम मौसम API उपलब्ध नहीं है। कृपया ऑफलाइन पूर्वानुमान मॉड्यूल को कनेक्ट करें।",
          "क्या तुम इंटरनेट के बिना काम करते हो?": "हाँ, Vaani 100% ऑफलाइन काम करता है — Whisper, NLLB-200, और Ollama सभी लोकल GPU पर चलते हैं।",
          "स्थानीय भाषा मॉडल का क्या अर्थ है?": "लोकल लैंग्वेज मॉडल वे AI हैं जो आपके डिवाइस पर चलते हैं और किसी क्लाउड सर्वर को डेटा नहीं भेजते।",
          "નમસ્તે, તમારી ક્ષમતાઓ શું છે?": "Vaani ઓફલાઇન ભાષણ ઓળખ, અનુવાદ અને AI-સહાયક ક્ષમતાઓ ધરાવે છે — ઇન્ટરનેટ વિના.",
          "મને એક સારો વિજ્ઞાન પ્રોજેક્ટ આપો.": "ઑટોમેટેડ પ્લાન્ટ વૉટરિંગ સિસ્ટમ: IoT સેન્સર + Raspberry Pi + ML ભૂમિ ભેજ predictor.",
          "ગૂગલ કઈ રીતે આઈ પ્રોજેક્ટ્સ બનાવે છે?": "Google large transformer models (BERT, Gemini) ને TPU clusters પર fine-tune કરે છે અને production APIs via GCP expose કરે છે."
        };

        const answer = answers[prompt] || "Inference complete. Local model returned contextual response based on input query tokens.";

        setTimeout(() => {
          setModelResponse(answer);
          setTerminalLogs((prev) => [...prev, `[Ollama-LLM] Response generated successfully.`]);

          // Stage 4: TTS generation
          setInputStage("tts");
          setTerminalLogs((prev) => [
            ...prev,
            `[SAPI5-TTS] Synthesizing audio voice response...`,
            `[SAPI5-TTS] Speech stream output: "${answer}"`
          ]);

          setTimeout(() => {
            setInputStage("idle");
          }, 1500);

        }, 1200);

      }, 800);

    }, 1000);
  };

  return (
    // Dark panel — intentional terminal aesthetic; light-mode gets a slightly lighter panel bg
    <div className="bg-[#0c0c10] light:bg-[#1a1a22] border border-[#1f1f29] light:border-[#2e2e3a] p-5 text-white font-mono">
      <div className="flex items-center justify-between border-b border-[#1f1f29] light:border-[#2e2e3a] pb-4 mb-6">
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
                      : "bg-[#13131a] light:bg-[#22222e] border-[#1f1f29] light:border-[#2e2e3a] text-neutral-400 hover:text-white"
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
                  className="w-full text-left py-2 px-3 text-xs bg-[#13131a] light:bg-[#22222e] hover:bg-[#1f1f29]/80 border border-[#1f1f29] light:border-[#2e2e3a] transition-all flex items-start gap-2.5 disabled:opacity-50 text-neutral-200"
                >
                  <ChevronRight className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span className="truncate">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="bg-[#13131a] light:bg-[#22222e] border border-[#1f1f29] light:border-[#2e2e3a] p-4 text-center">
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
                ? "🔊 Synthesizing speech output..."
                : "Standby for signal input"}
            </span>
          </div>
        </div>

        {/* Real-time logging terminal stdout (7 cols) */}
        <div className="lg:col-span-7 bg-[#050508] light:bg-[#0f0f18] border border-[#1f1f29] light:border-[#2e2e3a] p-4 flex flex-col justify-between" style={{ minHeight: "340px" }}>
          <div>
            <span className="text-[10px] text-neutral-500 uppercase block mb-2 font-bold select-none border-b border-neutral-900 pb-1">
              SYSTEM CONSOLE BACKEND STDOUT (SCROLLABLE)
            </span>
            <div data-lenis-prevent className="space-y-1.5 h-44 overflow-y-auto pr-1 text-[11px] font-mono leading-normal text-emerald-300">
              {terminalLogs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-neutral-500 select-none">{"$"}</span>
                  <p className="break-all">{log}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#13131a] light:bg-[#22222e] p-3 border-t border-[#1f1f29] light:border-[#2e2e3a] mt-4 min-h-[90px]">
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
    <div className="bg-[#0c0c10] light:bg-[#1a1a22] border border-[#1f1f29] light:border-[#2e2e3a] p-5 text-white font-mono">
      <div className="flex items-center justify-between border-b border-[#1f1f29] light:border-[#2e2e3a] pb-4 mb-6">
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
                className="w-full bg-[#13131a] light:bg-[#22222e] border border-[#1f1f29] light:border-[#2e2e3a] text-sm text-neutral-200 p-3 outline-none focus:border-purple-500 rounded-sm font-mono cursor-pointer"
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
                        : "border-[#1f1f29] light:border-[#2e2e3a] bg-[#13131a] light:bg-[#22222e] text-neutral-400 hover:text-white"
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
                        : "border-[#1f1f29] light:border-[#2e2e3a] bg-[#13131a] light:bg-[#22222e] text-neutral-400 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trigger Button & Preview Panel */}
          <div className="lg:col-span-5 bg-[#13131a] light:bg-[#22222e] border border-[#1f1f29] light:border-[#2e2e3a] p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block">
                Study Config Info
              </span>

              <div className="bg-[#0c0c10] light:bg-[#0f0f18] p-4 border border-[#1f1f29] light:border-[#2e2e3a] text-xs text-neutral-400 space-y-2 leading-relaxed">
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#13131a] light:bg-[#22222e] border border-[#1f1f29] light:border-[#2e2e3a] p-4">
            <div>
              <span className="text-[10px] text-neutral-500 block uppercase">PLAN FOCUS SUBJECT</span>
              <span className="text-xs font-bold text-white uppercase">{subjectLabels[subject]}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-neutral-500 block uppercase">COMPLETION</span>
                <span className="text-sm font-bold text-purple-400">{getCompletionPercent()}% Done</span>
              </div>
              <div className="w-24 h-2 bg-[#0c0c10] light:bg-[#0f0f18] border border-[#1f1f29] light:border-[#2e2e3a] rounded-full overflow-hidden">
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
                    : "border-[#1f1f29] light:border-[#2e2e3a] bg-[#13131a] light:bg-[#22222e] text-neutral-100 hover:border-purple-500/50"
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

// ==========================================
// UNIFIED INTERACTIVE PLAYGROUNDS WRAPPER
// ==========================================
export default function InteractivePlaygrounds() {
  const [activePlayground, setActivePlayground] = useState<"vaani" | "ai-planner">("vaani");
  
  const playgrounds = [
    { id: "vaani", name: "Vaani Voice Assistant", component: <VaaniVoiceConsoleSimulator /> },
    { id: "ai-planner", name: "AI Study Planner", component: <AIStudyPlannerSimulator /> }
  ] as const;

  return (
    <div className="w-full bg-[#16161A] light:bg-[#fbfbf9] border-2 border-white light:border-black p-6 md:p-8 shadow-bauhaus">
      {/* Tab Selectors */}
      <div className="flex flex-wrap border-b-2 border-neutral-800 light:border-black pb-3 mb-6 gap-2">
        {playgrounds.map((pg) => (
          <button
            key={pg.id}
            onClick={() => setActivePlayground(pg.id)}
            className={`py-2.5 px-4 text-xs font-mono font-black uppercase tracking-wider transition-all border-2 cursor-pointer ${
              activePlayground === pg.id
                ? "bg-[#E53E3E] text-white border-white light:border-black shadow-bauhaus-sm"
                : "border-[#1f1f29] light:border-neutral-300 text-neutral-400 light:text-slate-700 hover:text-white light:hover:text-black hover:bg-neutral-850 light:hover:bg-[#f5f2eb]"
            }`}
          >
            {pg.name}
          </button>
        ))}
      </div>

      {/* Selected Simulator */}
      <div className="animate-scale-in">
        {playgrounds.find((pg) => pg.id === activePlayground)?.component}
      </div>
    </div>
  );
}

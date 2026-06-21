import { Project, SkillCategory } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "ipl-predication",
    title: "IPL Match Winner Predictor",
    description: "A machine learning project that predicts IPL match winners from pre-match data, and more importantly, a case study in why honest evaluation matters more than a high accuracy number.",
    image: "/assets/ipl_predication_preview.svg",
    imageAlt: "IPL Match Winner Predictor Preview",
    tags: ["Python", "scikit-learn", "Flask", "HTML/CSS/JavaScript"],
    githubUrl: "https://github.com/Yanshu04/IPL-Predication",
    highlights: [
      "Rebuilt the evaluation pipeline with a chronological train/test split to avoid leakage from future seasons.",
      "Engineered head-to-head, recent form, and venue-based features using only pre-match data.",
      "Documented the honest 42.65% result and the cold-start limits for new franchises.",
    ],
    specs: [
      { label: "Honest Accuracy", value: "42.65%" },
      { label: "Modeling Stack", value: "Logistic Regression / Random Forest" },
      { label: "Backend", value: "Flask + Pickled Artifacts" },
    ]
  },
  {
    id: "ar-sketch",
    title: "AR Sketch",
    description: "Real-time augmented reality drawing app using MediaPipe hand tracking. Detects 21 hand landmarks at 60fps to let users draw in mid-air using gestures — no controller or special hardware required.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGOtgXVXD8wlrAvYpVdz8Rg4tOv0hRKzNMyGDZbv3a_RriYBcrtjPxBgOsmVxuPMF5OSpew2BoK7oik3wrEgMnw8PoVO5Fz-vs3nKW3MJ_vMqR8GtXHL6-Z7A-NDVGQ9AxHljP34k7jbytk7onzv0n5Njv-Q_sB-aR1Uag6_Dr2yEILpS0_FTchkwnTITS-Eacc2iE8dbU3xwiFyNNFffQb0534fX0CTl6dzY3qkMuRzgcVuyTK518DuzRgr5MTJsvttrvhTTBspEj",
    imageAlt: "AR Sketch App Interface",
    tags: ["React", "TypeScript", "MediaPipe", "Vite"],
    liveUrl: "https://ar-drawing-canvas.vercel.app",
    githubUrl: "https://github.com/Yanshu04/AR-Drawing-Canvas",
    highlights: [
      "Sub-second latency hand gesture classification with MediaPipe Hands SDK.",
      "Optimized canvas coordinate-space mapping using geometric projection equations.",
      "Completely standalone browser-level inference, protecting user video privacy."
    ],
    specs: [
      { label: "Target Framerate", value: "60 FPS" },
      { label: "Landmarks Tracked", value: "21 keypoints per hand" },
      { label: "Execution Layer", value: "WebAssembly + WebGL" }
    ]
  },
  {
    id: "house-predictor",
    title: "House Price Predictor",
    description: "Machine learning model trained on 1,460 Iowa housing records to predict sale prices. Built a REST API with input validation using Flask, deployed on Render — returns predictions in real time.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsqBhdTzKymokMVtJV-KpyLcXZpyZ2u7Jvdy1ZylarPt31fy-DpR7uivyIYCskpNm9aM_wcic4TXv11Y6vZX8vnPOK2u3AL8qpnR9uwc4XmOIWn49FcVLmLXLTHF_j5GEbGuxPup6WIYi_q0sDh2fQ-rk4rqi5HckLcZQlqfikyR4xZftfoIJbkSyvvvYUUSvWLlNBBVtbcoeakbUlaU2LZfBdUi9CkgWF2CpogYodbNM8NjDR7oG_oFDG4--JMAgC7ed0EiD-6Djn",
    imageAlt: "Data Science Dashboard",
    tags: ["Python", "XGBoost", "Flask", "Render"],
    liveUrl: "https://house-price-predictor-ij4a.onrender.com",
    githubUrl: "https://github.com/Yanshu04/house-price-predictor",
    highlights: [
      "Feature engineered over 40 variables including quality score combinations and square footage metrics.",
      "Optimized hyperparameters utilizing grid search cross-validation, achieving low RMSE.",
      "Created highly restrictive JSON schema validators to catch data corruption before inference."
    ],
    specs: [
      { label: "Dataset Size", value: "1,460 samples (Iowa Ames)" },
      { label: "Algorithm Profile", value: "XGBoost Regressor" },
      { label: "API Latency", value: "<45ms average" }
    ]
  },
  {
    id: "vaani",
    title: "Vaani",
    description: "Fully offline multilingual voice assistant supporting Hindi, Gujarati, and English. Chains Whisper STT, Meta NLLB-200 translation, local Ollama LLM, and SAPI5 TTS into a single pipeline.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCedINCfHkhqyQrKj82VH7CccEMFrHC4CgU-aXAiRnROnQSK8mFs3Xm9xcaufb4EHOu16J3WBzIM_j_bTc8fy7tMa8YwP6YA4cbiwhsRGJExl8rXu5g-ds3Bo-q7-bSyfTFOCLedPCHvM3QRGt6E2WfbT39amSF5kgXfLF-R4hhnPUhpVqBSgX9JfG0NUWyls5fdwcIDCQkLhEiqqSO8fx49gHhhgtbf6LxOyMt0rY-XM2HEeVf6N9mWLqPWe1LVy0XSkVCUy3pTw_q",
    imageAlt: "Voice Assistant Visualization",
    tags: ["Whisper", "Ollama", "Transformers", "Streamlit"],
    githubUrl: "https://github.com/Yanshu04/Vaani",
    highlights: [
      "Zero-external API dependency voice loop, operating with complete confidentiality.",
      "Advanced multi-language prompt pipeline routing to specialized translation nodes.",
      "Multithreaded message queues preventing speech synthetic blocks during next-turn generation."
    ],
    specs: [
      { label: "Voice Latency", value: "~1.2s total loop (GPU accelerated)" },
      { label: "Supported Languages", value: "Hindi, Gujarati, English" },
      { label: "Weights Occupance", value: "approx. 14GB disk budget" }
    ]
  },
  {
    id: "arenahub",
    title: "ArenaHub Turf & Gaming",
    description: "A dual-purpose booking platform for sports turf and esports gaming. Engineered with React 19, TypeScript, and Tailwind CSS. Features an interactive custom monthly calendar with multi-pass session scheduling, stateful QR boarding passes, and a responsive analytics dashboard.",
    image: "/assets/arenahub_preview.png",
    imageAlt: "ArenaHub Turf & Gaming Dashboard Preview",
    tags: ["React 19", "TypeScript", "Tailwind CSS", "Recharts"],
    liveUrl: "https://arenahub-turf-gaming.vercel.app",
    githubUrl: "https://github.com/Yanshu04/arenahub-turf-gaming",
    highlights: [
      "Custom multi-pass session scheduler and calendar UI built from scratch.",
      "Dynamic stateful QR-code boarding passes for turf and esports players.",
      "Interactive data visualizations showcasing peak booking hours using Recharts."
    ],
    specs: [
      { label: "Target Platform", value: "Web / Responsive Desktop" },
      { label: "State Engine", value: "React Stateful Context" },
      { label: "Calendar Layout", value: "Interactive Monthly Grid" }
    ]
  },
  {
    id: "ai-planner",
    title: "AI Study Planner",
    description: "A smart exam prep planner that suggests what to study each day based on your deadlines and progress. Supports course tracking, timeline visualization, and custom study task generators.",
    image: "/assets/ai_planner_preview.png",
    imageAlt: "AI Study Planner Interface Preview",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    liveUrl: "https://ai-study-planner-inky.vercel.app",
    githubUrl: "https://github.com/Yanshu04/ai-study-planner",
    highlights: [
      "Dynamic study tracker analyzing remaining days and subject weights.",
      "Automated tasks and schedule list generation based on deadlines.",
      "Clean dark mode interface optimized for focus and scheduling."
    ],
    specs: [
      { label: "Framework Stack", value: "Vite + TypeScript" },
      { label: "Schedule Logic", value: "Dynamic Priority Scheduler" },
      { label: "UI Library", value: "Lucide + Custom CSS" }
    ]
  },
  {
    id: "speech-asr",
    title: "Offline Speech ASR",
    description: "A lightweight, fully offline, real-time speech recognition system built from scratch in PyTorch. Runs entirely locally on low-VRAM edge nodes, transcribing English, Hindi, and Gujarati scripts.",
    image: "/assets/speech_asr_preview.png",
    imageAlt: "Speech ASR Visual Spectrogram",
    tags: ["PyTorch", "Python", "BiLSTM", "webrtcvad"],
    githubUrl: "https://github.com/Yanshu04/speech-asr",
    highlights: [
      "100% Offline Speech Loop: Zero-API local Deep Learning ASR pipeline executing entirely on consumer GPU CUDA nodes.",
      "Hybrid CNN-BiLSTM-CTC Net: 4.97M param network trained dynamically with Connectionist Temporal Classification loss.",
      "Google VAD Integration: Ignores background noise by mapping 30ms window speech frame activity indicators."
    ],
    specs: [
      { label: "Model Complexity", value: "4.97M parameters" },
      { label: "Dataset Size", value: "8,516 training samples" },
      { label: "Vocab Dimensions", value: "287 multilingual tokens" }
    ]
  },
  {
    id: "solar-tracker",
    title: "Solar Tracker",
    description: "An Android application built in Kotlin to manage and monitor solar panel installations. Provides a comprehensive dashboard tracking real-time panel status, weather conditions, and performance forecasts for solar sites in the Rajkot region.",
    image: "/assets/solar_tracker_preview.png",
    imageAlt: "Solar Tracker Android App Dashboard",
    tags: ["Kotlin", "Android", "Jetpack Compose", "REST API"],
    githubUrl: "https://github.com/Yanshu04/solar-tracker",
    highlights: [
      "Real-time solar panel status dashboard with live power output metrics and panel health indicators.",
      "Integrated weather API for Rajkot region to correlate atmospheric conditions with panel performance forecasts.",
      "Built with modern Android architecture (MVVM) using Kotlin and Jetpack Compose for a fluid, responsive UI."
    ],
    specs: [
      { label: "Platform", value: "Android (Kotlin)" },
      { label: "Architecture", value: "MVVM + Jetpack Compose" },
      { label: "Focus Region", value: "Rajkot Solar Sites" }
    ]
  }
];


export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    num: "01",
    title: "Frontend",
    description: "I focus on building clean, performant, and intuitive user interfaces using modern frameworks like React and Vite. My design philosophy prioritizes usability and speed, often integrating complex browser-based technologies like MediaPipe for interactive experiences.",
    accent: "#3b82f6",
    technologies: ["React / React 19", "TypeScript", "Vite", "Tailwind CSS v4", "MediaPipe API", "Motion (Animate)", "Lucide Icons", "D3 / Recharts"]
  },
  {
    id: "ml",
    num: "02",
    title: "Machine Learning",
    description: "My expertise lies in developing end-to-end ML pipelines. From data preprocessing and model training with XGBoost and Scikit-learn to deploying local LLMs and translation models, I bridge the gap between complex research and functional applications.",
    accent: "#10b981",
    technologies: ["Python", "XGBoost", "Scikit-Learn", "Ollama (LLaMA/Mistral)", "Hugging Face Transformers", "NLLB-200 (Translation)", "Whisper STT"]
  },
  {
    id: "integration",
    num: "03",
    title: "Integration",
    description: "I specialize in creating robust backends and REST APIs that make AI accessible. Whether it's Flask for web deployment or Streamlit for prototyping, I ensure that my models are efficiently wrapped and ready for real-world production environments.",
    accent: "#f59e0b",
    technologies: ["Node.js / Express", "Flask (REST API)", "Streamlit Protyping", "Docker Containerization", "Render Deployment", "Git & CI/CD", "Local Persistence"]
  }
];

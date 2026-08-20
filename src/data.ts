import { Project, SkillCategory, TechStackGroup, TechUsageDetail } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "laika",
    title: "LAIKA",
    description: "A local AI knowledge assistant for private document Q&A with hybrid search, multi-turn chat, and clickable citations. Built with a FastAPI backend, a custom React + Vite frontend, and offline Ollama inference.",
    image: "/assets/laika_preview.svg",
    imageAlt: "LAIKA Local AI Knowledge Assistant Preview",
    tags: ["Python", "React", "FastAPI", "ChromaDB"],
    githubUrl: "https://github.com/Yanshu04/laika",
    highlights: [
      "Supports PDF, DOCX, TXT, and MD documents for private local Q&A.",
      "Combines semantic embeddings and SQLite FTS5 keyword search with RRF ranking.",
      "Streams answers with preserved chat context and expandable source citations."
    ],
    specs: [
      { label: "Search Modes", value: "Hybrid / Vector / Keyword" },
      { label: "Backend Stack", value: "FastAPI + ChromaDB + SQLite FTS5" },
      { label: "LLM Layer", value: "Local Ollama (qwen2.5:3b)" }
    ]
  },
  {
    id: "vaani",
    title: "Vaani",
    description: "Fully offline multilingual voice assistant supporting Hindi, Gujarati, and English. Chains Whisper STT, Meta NLLB-200 translation, local Ollama LLM, and SAPI5 TTS into a single pipeline.",
    image: "/assets/vaani_preview.svg",
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
    id: "vaani-online",
    title: "Vaani Online",
    description: "A cloud-deployed, multilingual voice AI REST API supporting English, Hindi, and Gujarati. Chains OpenAI Whisper STT, Groq LLM inference, and Microsoft Edge TTS neural voices into a single real-time streaming pipeline — deployed on Render.",
    image: "/assets/modern_ai_voice_interface_v1.png",
    imageAlt: "Vaani Online Voice AI API Preview",
    tags: ["FastAPI", "Groq", "Whisper", "Edge TTS"],
    liveUrl: "https://vaani-online.vercel.app/",
    githubUrl: "https://github.com/Yanshu04/vaani-online",
    highlights: [
      "Streams AI chat responses in real-time via Server-Sent Events (SSE) with Groq-powered LLM inference.",
      "Multilingual audio transcription using OpenAI Whisper with configurable model size (tiny → large).",
      "Neural Text-to-Speech via Edge TTS with 10+ voices across English, Hindi, and Gujarati locales."
    ],
    specs: [
      { label: "LLM Provider", value: "Groq (Cloud Inference)" },
      { label: "Languages", value: "English · Hindi · Gujarati" },
      { label: "Deployment", value: "Render (FastAPI + Uvicorn)" }
    ]
  },
  {
    id: "speech-asr",
    title: "Offline Speech ASR",
    description: "A lightweight, fully offline, real-time speech recognition system built from scratch in PyTorch. Runs entirely locally on low-VRAM edge nodes, transcribing English, Hindi, and Gujarati scripts.",
    image: "/assets/speech_asr_preview.svg",
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
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    description: "An offline-first resume analysis and improvement app that scores ATS compatibility, matches job descriptions, detects missing sections, and rewrites experience bullets locally.",
    image: "/assets/ai_resume_analyzer_preview.svg",
    imageAlt: "AI Resume Analyzer Dashboard Preview",
    tags: ["TypeScript", "React", "FastAPI", "spaCy"],
    githubUrl: "https://github.com/Yanshu04/AI-Resume-Analyzer",
    highlights: [
      "Scores resumes across ATS, skills, projects, formatting, and content quality signals.",
      "Matches resumes against job descriptions using local sentence-transformer embeddings.",
      "Uses offline Ollama rewriting to improve bullets without sending data to external APIs."
    ],
    specs: [
      { label: "Core Analysis", value: "ATS + JD Matching" },
      { label: "Backend Stack", value: "FastAPI + SQLite + ChromaDB" },
      { label: "AI Layer", value: "Offline Ollama (qwen2.5:1.5b)" }
    ]
  },
  {
    id: "ai-resume-builder",
    title: "AI Resume Builder",
    description: "An AI-powered resume builder from scratch with conversational inputs, editor layouts, live template previews, JD optimization, drag-and-drop ordering, imports, versioning, and multi-format exports.",
    image: "/assets/ai_resume_builder_preview.svg",
    imageAlt: "AI Resume Builder Project Preview",
    tags: ["TypeScript", "React", "FastAPI", "Ollama"],
    githubUrl: "https://github.com/Yanshu04/AI-Resume-Builder",
    highlights: [
      "Built a full-stack resume workflow with a React frontend and FastAPI backend.",
      "Added drag-and-drop resume ordering, live template previews, and versioned document flows.",
      "Integrated offline Ollama inference for AI-assisted resume generation and optimization."
    ],
    specs: [
      { label: "Frontend Stack", value: "React + TypeScript + Vite" },
      { label: "Backend Stack", value: "FastAPI + SQLAlchemy" },
      { label: "AI Layer", value: "Offline Ollama (qwen2.5:1.5b)" }
    ]
  },
  {
    id: "ar-sketch",
    title: "AR Sketch",
    description: "Real-time augmented reality drawing app using MediaPipe hand tracking. Detects 21 hand landmarks at 60fps to let users draw in mid-air using gestures — no controller or special hardware required.",
    image: "/assets/ar_sketch_preview.svg",
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
    id: "arenahub",
    title: "ArenaHub Turf & Gaming",
    description: "A dual-purpose booking platform for sports turf and esports gaming. Engineered with React 19, TypeScript, and Tailwind CSS. Features an interactive custom monthly calendar with multi-pass session scheduling, stateful QR boarding passes, and a responsive analytics dashboard.",
    image: "/assets/arenahub_preview.svg",
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
    id: "house-predictor",
    title: "House Price Predictor",
    description: "Machine learning model trained on 1,460 Iowa housing records to predict sale prices. Built a REST API with input validation using Flask, deployed on Render — returns predictions in real time.",
    image: "/assets/house_price_predictor_preview.svg",
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
    id: "devpulse",
    title: "DevPulse",
    description: "A local Git commit-history honesty dashboard that scans repositories, tracks recent activity, and highlights stalled projects with an optional offline AI summary.",
    image: "/assets/devpulse_preview.svg",
    imageAlt: "DevPulse Git Commit History Dashboard Preview",
    tags: ["TypeScript", "Python", "FastAPI", "React"],
    githubUrl: "https://github.com/Yanshu04/DevPulse-MVP",
    highlights: [
      "Scans local repositories with GitPython to surface commit counts and recent activity.",
      "Flags stalled projects automatically and sorts them to the top for quick review.",
      "Supports an optional Ollama-powered status summary for blunt, local project insights."
    ],
    specs: [
      { label: "Backend Stack", value: "FastAPI + GitPython + Uvicorn" },
      { label: "Frontend Stack", value: "React + Vite + Tailwind CSS" },
      { label: "AI Layer", value: "Optional Ollama (qwen2.5:3b)" }
    ]
  },
  {
    id: "ai-planner",
    title: "AI Study Planner",
    description: "A smart exam prep planner that suggests what to study each day based on your deadlines and progress. Supports course tracking, timeline visualization, and custom study task generators.",
    image: "/assets/ai_planner_preview.svg",
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
    id: "solar-tracker",
    title: "Solar Tracker",
    description: "An Android application built in Kotlin to manage and monitor solar panel installations. Provides a comprehensive dashboard tracking real-time panel status, weather conditions, and performance forecasts for solar sites in the Rajkot region.",
    image: "/assets/solar_tracker_preview.svg",
    imageAlt: "Solar Tracker Android App Dashboard",
    tags: ["Kotlin", "Android", "Jetpack Compose", "REST API"],
    githubUrl: "https://github.com/Yanshu04/solar-tracker",
    highlights: [
      "Real-time solar panel status dashboard with live power output metrics and panel health indicators.",
      "Integrated weather API for Rajkot region to correlate atmospheric conditions with panel performance forecasts.",
      "Built with modern Android architecture (MVVM) using Kotlin and Jetpack Compose for a fluid, responsive UI."
    ],
    specs: [
      { label: "Target Device", value: "Mobile Smartphone Only" },
      { label: "Platform", value: "Android Native (Kotlin)" },
      { label: "UI Framework", value: "Jetpack Compose MVVM" }
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

export const TECH_STACK_GROUPS: TechStackGroup[] = [
  {
    id: "ai_ml",
    title: "AI & ML",
    accent: "#E53E3E",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "RAG",
      "Semantic Search",
      "Local LLMs"
    ]
  },
  {
    id: "backend",
    title: "Backend",
    accent: "#2B6CB0",
    items: [
      "FastAPI",
      "Python",
      "REST APIs",
      "Groq",
      "Streaming APIs"
    ]
  },
  {
    id: "frontend",
    title: "Frontend",
    accent: "#D69E2E",
    items: [
      "React",
      "HTML",
      "CSS",
      "JavaScript"
    ]
  },
  {
    id: "databases",
    title: "Databases",
    accent: "#38A169",
    items: [
      "SQLite",
      "MySQL"
    ]
  },
  {
    id: "ai_libs",
    title: "AI Libraries",
    accent: "#805AD5",
    items: [
      "Sentence-BERT",
      "PyTorch",
      "OpenCV",
      "Transformers",
      "Edge TTS"
    ]
  }
];

export const TECH_USAGE_DETAILS: Record<string, TechUsageDetail> = {
  "Machine Learning": {
    name: "Machine Learning",
    category: "AI & ML",
    accent: "#E53E3E",
    whereUsed: "Used for feature engineering, model training, cross-validation, and predictive analytics using algorithms like XGBoost, Random Forest, and Logistic Regression.",
    projects: [
      { id: "house-predictor", title: "House Price Predictor", tags: ["Python", "XGBoost", "Flask"] },
      { id: "ipl-predication", title: "IPL Match Winner Predictor", tags: ["Python", "scikit-learn", "Flask"] }
    ]
  },
  "Deep Learning": {
    name: "Deep Learning",
    category: "AI & ML",
    accent: "#E53E3E",
    whereUsed: "Used to design, train, and evaluate multi-layer neural networks including Hybrid CNN-BiLSTM architectures with CTC loss for offline speech recognition.",
    projects: [
      { id: "speech-asr", title: "Offline Speech ASR", tags: ["PyTorch", "Python", "BiLSTM"] }
    ]
  },
  "Computer Vision": {
    name: "Computer Vision",
    category: "AI & ML",
    accent: "#E53E3E",
    whereUsed: "Used for real-time video frame processing, tracking 21 hand landmark points with sub-second latency, geometric projections, and spectrogram visual analysis.",
    projects: [
      { id: "ar-sketch", title: "AR Sketch", tags: ["React", "TypeScript", "MediaPipe"] },
      { id: "speech-asr", title: "Offline Speech ASR", tags: ["PyTorch", "webrtcvad"] }
    ]
  },
  "NLP": {
    name: "NLP",
    category: "AI & ML",
    accent: "#E53E3E",
    whereUsed: "Used for natural language parsing, ATS resume score evaluation, named entity extraction (spaCy), keyword ranking, multilingual prompt pipelines, and cloud-streamed conversational AI.",
    projects: [
      { id: "ai-resume-analyzer", title: "AI Resume Analyzer", tags: ["TypeScript", "FastAPI", "spaCy"] },
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["FastAPI", "ChromaDB"] },
      { id: "vaani", title: "Vaani Voice Assistant", tags: ["Whisper", "Ollama", "Transformers"] },
      { id: "vaani-online", title: "Vaani Online", tags: ["Groq", "Whisper", "Edge TTS"] }
    ]
  },
  "RAG": {
    name: "RAG",
    category: "AI & ML",
    accent: "#E53E3E",
    whereUsed: "Used to build Retrieval-Augmented Generation systems combining dense vector embeddings and keyword search (RRF ranking) for private, offline document Q&A.",
    projects: [
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["Python", "FastAPI", "ChromaDB"] },
      { id: "ai-resume-analyzer", title: "AI Resume Analyzer", tags: ["TypeScript", "FastAPI", "Ollama"] }
    ]
  },
  "Semantic Search": {
    name: "Semantic Search",
    category: "AI & ML",
    accent: "#E53E3E",
    whereUsed: "Used sentence-transformer vector embeddings and ChromaDB vector databases for semantic document retrieval and matching resumes to job descriptions.",
    projects: [
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["ChromaDB", "FastAPI"] },
      { id: "ai-resume-analyzer", title: "AI Resume Analyzer", tags: ["spaCy", "Sentence-BERT"] }
    ]
  },
  "Local LLMs": {
    name: "Local LLMs",
    category: "AI & ML",
    accent: "#E53E3E",
    whereUsed: "Used 100% offline inference with local Ollama models (Qwen2.5 / LLaMA) for private document Q&A, AI resume rewriting, and blunt project status summaries.",
    projects: [
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["Ollama (qwen2.5:3b)"] },
      { id: "vaani", title: "Vaani Voice Assistant", tags: ["Ollama", "Whisper"] },
      { id: "ai-resume-analyzer", title: "AI Resume Analyzer", tags: ["Ollama (qwen2.5:1.5b)"] },
      { id: "ai-resume-builder", title: "AI Resume Builder", tags: ["Ollama", "FastAPI"] },
      { id: "devpulse", title: "DevPulse Git Honesty Dashboard", tags: ["GitPython", "Ollama"] }
    ]
  },
  "FastAPI": {
    name: "FastAPI",
    category: "Backend",
    accent: "#2B6CB0",
    whereUsed: "Used as the core async Python REST API backend framework for document processing, RAG orchestration, SQLite queries, streaming AI endpoint responses, and cloud voice AI services.",
    projects: [
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["Python", "FastAPI", "SQLite"] },
      { id: "vaani-online", title: "Vaani Online", tags: ["FastAPI", "Groq", "Edge TTS"] },
      { id: "ai-resume-analyzer", title: "AI Resume Analyzer", tags: ["FastAPI", "spaCy"] },
      { id: "ai-resume-builder", title: "AI Resume Builder", tags: ["FastAPI", "SQLAlchemy"] },
      { id: "devpulse", title: "DevPulse Git Honesty Dashboard", tags: ["FastAPI", "GitPython"] }
    ]
  },
  "Groq": {
    name: "Groq",
    category: "Backend",
    accent: "#2B6CB0",
    whereUsed: "Used as the cloud LLM inference provider for Vaani Online, enabling ultra-fast, streamed conversational AI responses with low-latency generation across multilingual voice sessions.",
    projects: [
      { id: "vaani-online", title: "Vaani Online", tags: ["Groq", "FastAPI", "Streaming"] }
    ]
  },
  "Streaming APIs": {
    name: "Streaming APIs",
    category: "Backend",
    accent: "#2B6CB0",
    whereUsed: "Used Server-Sent Events (SSE) in Vaani Online to stream AI chat tokens to clients in real-time, enabling a live, incremental response feel in voice assistant sessions.",
    projects: [
      { id: "vaani-online", title: "Vaani Online", tags: ["SSE", "FastAPI", "Groq"] }
    ]
  },
  "Python": {
    name: "Python",
    category: "Backend",
    accent: "#2B6CB0",
    whereUsed: "Used as the primary language for AI model pipelines, machine learning model training (PyTorch / XGBoost), server backends, cloud voice APIs, and data processing.",
    projects: [
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["Python", "FastAPI"] },
      { id: "vaani-online", title: "Vaani Online", tags: ["Python", "FastAPI", "Groq"] },
      { id: "speech-asr", title: "Offline Speech ASR", tags: ["Python", "PyTorch"] },
      { id: "house-predictor", title: "House Price Predictor", tags: ["Python", "XGBoost", "Flask"] },
      { id: "ipl-predication", title: "IPL Match Winner Predictor", tags: ["Python", "scikit-learn"] },
      { id: "devpulse", title: "DevPulse", tags: ["Python", "GitPython"] }
    ]
  },
  "REST APIs": {
    name: "REST APIs",
    category: "Backend",
    accent: "#2B6CB0",
    whereUsed: "Used to build RESTful web services with strict request/response validation schemas, JSON endpoints, streaming SSE responses, and asynchronous client communication.",
    projects: [
      { id: "house-predictor", title: "House Price Predictor", tags: ["Flask", "Render"] },
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["FastAPI", "REST"] },
      { id: "vaani-online", title: "Vaani Online", tags: ["FastAPI", "SSE", "Render"] },
      { id: "solar-tracker", title: "Solar Tracker Android App", tags: ["Kotlin", "REST API"] }
    ]
  },
  "React": {
    name: "React",
    category: "Frontend",
    accent: "#D69E2E",
    whereUsed: "Used as the core UI framework to build highly responsive, component-driven, stateful web applications with modern hooks and custom UI systems.",
    projects: [
      { id: "arenahub", title: "ArenaHub Turf & Gaming", tags: ["React 19", "TypeScript", "Tailwind CSS"] },
      { id: "ar-sketch", title: "AR Sketch", tags: ["React", "TypeScript", "MediaPipe"] },
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["React", "Vite"] },
      { id: "ai-planner", title: "AI Study Planner", tags: ["React", "TypeScript"] },
      { id: "ai-resume-builder", title: "AI Resume Builder", tags: ["React", "TypeScript"] }
    ]
  },
  "HTML": {
    name: "HTML",
    category: "Frontend",
    accent: "#D69E2E",
    whereUsed: "Used semantic HTML5 elements, accessible ARIA attributes, dynamic canvas viewports, and clean document layouts.",
    projects: [
      { id: "arenahub", title: "ArenaHub Turf & Gaming", tags: ["React 19", "HTML5"] },
      { id: "ipl-predication", title: "IPL Match Winner Predictor", tags: ["HTML/CSS/JS", "Flask"] },
      { id: "ar-sketch", title: "AR Sketch", tags: ["HTML5 Canvas", "React"] }
    ]
  },
  "CSS": {
    name: "CSS",
    category: "Frontend",
    accent: "#D69E2E",
    whereUsed: "Used custom CSS variables, Tailwind CSS utilities, responsive grid structures, and high-contrast Bauhaus design systems with solid offset shadows.",
    projects: [
      { id: "arenahub", title: "ArenaHub Turf & Gaming", tags: ["Tailwind CSS", "React"] },
      { id: "ai-planner", title: "AI Study Planner", tags: ["Tailwind CSS", "Vite"] },
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["Custom CSS", "React"] }
    ]
  },
  "JavaScript": {
    name: "JavaScript",
    category: "Frontend",
    accent: "#D69E2E",
    whereUsed: "Used ES6+ JavaScript for browser DOM manipulation, async fetch API calls, client-side event listeners, and interactive canvas rendering.",
    projects: [
      { id: "ar-sketch", title: "AR Sketch", tags: ["JavaScript", "React"] },
      { id: "ipl-predication", title: "IPL Match Winner Predictor", tags: ["JavaScript", "HTML/CSS"] }
    ]
  },
  "SQLite": {
    name: "SQLite",
    category: "Databases",
    accent: "#38A169",
    whereUsed: "Used as an embedded, zero-configuration local database with FTS5 full-text search extensions for offline document indexing and session persistence.",
    projects: [
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["SQLite FTS5", "FastAPI"] },
      { id: "ai-resume-analyzer", title: "AI Resume Analyzer", tags: ["SQLite", "FastAPI"] }
    ]
  },
  "MySQL": {
    name: "MySQL",
    category: "Databases",
    accent: "#38A169",
    whereUsed: "Used for structured relational data storage, user booking management, multi-pass schedules, and transaction persistence.",
    projects: [
      { id: "arenahub", title: "ArenaHub Turf & Gaming", tags: ["MySQL", "React 19"] }
    ]
  },
  "Sentence-BERT": {
    name: "Sentence-BERT",
    category: "AI Libraries",
    accent: "#805AD5",
    whereUsed: "Used to generate dense semantic vector embeddings for document text chunks and job description resume similarity matching.",
    projects: [
      { id: "laika", title: "LAIKA Local AI Assistant", tags: ["Sentence-BERT", "ChromaDB"] },
      { id: "ai-resume-analyzer", title: "AI Resume Analyzer", tags: ["Sentence-BERT", "spaCy"] }
    ]
  },
  "PyTorch": {
    name: "PyTorch",
    category: "AI Libraries",
    accent: "#805AD5",
    whereUsed: "Used to program custom deep learning models from scratch, implementing CNN feature extractors, BiLSTM layers, and CTC loss functions.",
    projects: [
      { id: "speech-asr", title: "Offline Speech ASR", tags: ["PyTorch", "Python", "BiLSTM"] }
    ]
  },
  "OpenCV": {
    name: "OpenCV",
    category: "AI Libraries",
    accent: "#805AD5",
    whereUsed: "Used for computer vision image transformations, camera frame captures, color mapping, and spectrogram visual analysis.",
    projects: [
      { id: "ar-sketch", title: "AR Sketch", tags: ["MediaPipe", "React"] },
      { id: "speech-asr", title: "Offline Speech ASR", tags: ["webrtcvad", "PyTorch"] }
    ]
  },
  "Transformers": {
    name: "Transformers",
    category: "AI Libraries",
    accent: "#805AD5",
    whereUsed: "Used Hugging Face Transformers for sequence-to-sequence translation (Meta NLLB-200) and speech recognition tokenizers.",
    projects: [
      { id: "vaani", title: "Vaani Voice Assistant", tags: ["Transformers", "NLLB-200", "Whisper"] }
    ]
  },
  "Edge TTS": {
    name: "Edge TTS",
    category: "AI Libraries",
    accent: "#805AD5",
    whereUsed: "Used Microsoft Edge TTS neural voices in Vaani Online to synthesize lifelike speech across English, Hindi, and Gujarati locales, with configurable speech rate and volume.",
    projects: [
      { id: "vaani-online", title: "Vaani Online", tags: ["Edge TTS", "FastAPI", "Multilingual"] }
    ]
  }
};

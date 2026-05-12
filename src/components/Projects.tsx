import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const projects = [
  {
    title: "Email Spam Detection",
    category: "Machine Learning",
    description: "Robust NLP model for filtering malicious correspondence with 99% accuracy using specialized vectorization techniques.",
    link: "#",
    color: "bg-bauhaus-red",
    size: "small"
  },
  {
    title: "Financial Dashboard",
    category: "Data Viz",
    description: "Real-time analytical interface for tracking global market shifts and fiscal anomalies using D3.js and React.",
    link: "#",
    color: "bg-bauhaus-yellow",
    extra: true,
    size: "small"
  },
  {
    title: "StockIQ Predictor",
    category: "AI Model",
    description: "Long Short-Term Memory (LSTM) network designed to forecast equity volatility based on sentiment analysis.",
    link: "#",
    color: "bg-bauhaus-blue",
    size: "small"
  },
  {
    title: "AR Drawing Canvas",
    category: "Creative Tech",
    description: "Immersive spatial drawing application leveraging computer vision to map 3D strokes in physical environments.",
    link: "#",
    color: "bg-bauhaus-red",
    size: "large",
    graphicAction: true
  },
  {
    title: "AI Study Planner",
    category: "Utility",
    description: "Adaptive scheduling agent that optimizes learning paths using genetic algorithms and user feedback.",
    link: "#",
    color: "bg-bauhaus-blue",
    size: "small",
    isTriangle: true
  }
];

const categories = ["All", "Machine Learning", "Data Viz", "AI Model", "Creative Tech", "Utility"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="bg-bauhaus-blue p-8 md:p-16 border-b-4 border-bauhaus-black overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-black text-white mb-8 uppercase tracking-tight"
      >
        PROJECTS [02]
      </motion.h2>
      
      {/* Filter Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-4 mb-12"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2 border-4 border-bauhaus-black font-black text-sm uppercase transition-all neo-shadow-sm active:translate-x-1 active:translate-y-1 active:shadow-none ${
              activeFilter === cat 
                ? "bg-bauhaus-yellow text-bauhaus-black" 
                : "bg-white text-bauhaus-black hover:bg-bauhaus-gray"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`${
                project.size === "large" ? "md:col-span-2" : ""
              } bg-white border-4 border-bauhaus-black p-8 neo-shadow relative overflow-hidden flex flex-col gap-4`}
            >
              {/* Decorative Bauhaus shapes */}
              {project.isTriangle ? (
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-bauhaus-blue border-4 border-bauhaus-black" style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }} />
              ) : (
                <div className={`absolute -top-6 -right-6 w-16 h-16 ${project.color} rounded-full border-4 border-bauhaus-black`} />
              )}

              {project.graphicAction ? (
                <div className="flex flex-col md:flex-row gap-8 items-stretch h-full">
                  <div className="w-full md:w-1/2 min-h-[150px] bg-bauhaus-yellow relative border-4 border-bauhaus-black overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 dot-grid opacity-20"></div>
                    <div className="w-16 h-16 bg-bauhaus-red border-4 border-bauhaus-black rotate-45 relative z-10"></div>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                    <span className="font-bold text-sm text-bauhaus-blue uppercase tracking-widest">{project.category}</span>
                    <h3 className="text-2xl font-black uppercase leading-tight">{project.title}</h3>
                    <p className="text-sm text-bauhaus-black leading-relaxed">
                      {project.description}
                    </p>
                    <a href={project.link} className="font-bold text-sm border-b-4 border-bauhaus-red self-start uppercase tracking-wider">View Case Study</a>
                  </div>
                </div>
              ) : (
                <>
                  <span className="font-bold text-sm text-bauhaus-blue uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-2xl font-black uppercase leading-tight">{project.title}</h3>
                  <p className="text-sm text-bauhaus-black leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-auto pt-4 flex gap-4">
                    {project.extra ? (
                      <>
                        <a href={project.link} className="font-bold text-sm border-b-4 border-bauhaus-yellow uppercase tracking-wider">GO LIVE</a>
                        <a href={project.link} className="font-bold text-sm border-b-4 border-bauhaus-yellow uppercase tracking-wider">GITHUB</a>
                      </>
                    ) : (
                      <a href={project.link} className="font-bold text-sm border-b-4 border-bauhaus-blue uppercase tracking-wider">View Case Study</a>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

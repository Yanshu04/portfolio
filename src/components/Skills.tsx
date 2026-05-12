import { motion } from "motion/react";

const skillGroups = [
  {
    title: "Languages",
    color: "bg-bauhaus-red",
    skills: ["PYTHON", "JAVA", "SQL", "C++"]
  },
  {
    title: "ML/AI",
    color: "bg-bauhaus-blue",
    skills: ["TENSORFLOW", "PYTORCH", "NLP", "COMPUTER VISION"]
  },
  {
    title: "Data & Viz",
    color: "bg-bauhaus-yellow",
    skills: ["PANDAS", "D3.JS", "MATPLOTLIB", "TABLEAU"],
    textColor: "text-bauhaus-black"
  },
  {
    title: "Frontend",
    color: "bg-bauhaus-red",
    skills: ["REACT", "TAILWIND", "NEXT.JS", "TYPESCRIPT"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Skills() {
  return (
    <section id="skills" className="bg-bauhaus-gray p-8 md:p-16 border-b-4 border-bauhaus-black overflow-hidden">
      <h2 className="text-4xl font-black mb-12 uppercase tracking-tight">SKILLS [03]</h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {skillGroups.map((group, idx) => (
          <motion.div 
            key={idx} 
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white border-4 border-bauhaus-black neo-shadow-sm flex flex-col"
          >
            <div className={`${group.color} p-3 border-b-4 border-bauhaus-black`}>
              <span className={`font-bold text-sm uppercase tracking-widest ${group.textColor || 'text-white'}`}>
                {group.title}
              </span>
            </div>
            <div className="p-8 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 border-2 border-bauhaus-black rounded-full font-bold text-[10px] tracking-wider uppercase"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

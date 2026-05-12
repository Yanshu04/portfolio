import { motion } from "motion/react";

const cardVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const rightCardVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Education() {
  return (
    <section id="education" className="bg-bauhaus-red p-8 md:p-16 border-b-4 border-bauhaus-black overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-black text-white mb-12 uppercase tracking-tight"
      >
        EDUCATION [04]
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education 1 */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border-4 border-bauhaus-black p-8 neo-shadow flex flex-col"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-black uppercase tracking-tight">B.Tech in CSE</h3>
            <span className="bg-bauhaus-yellow px-3 py-1 font-bold text-[10px] border-2 border-bauhaus-black uppercase tracking-widest">
              In Progress
            </span>
          </div>
          <p className="font-black text-lg uppercase tracking-tight mb-2">Tech Institute of Excellence</p>
          <p className="text-sm mb-8 leading-relaxed">
            Specialization in AI and Machine Learning. Cumulative GPA: 9.2/10.0
          </p>
          <div className="mt-auto border-t-4 border-bauhaus-black pt-4">
            <span className="font-bold text-xs uppercase tracking-widest text-bauhaus-red">Core Subjects:</span>
            <p className="text-[10px] font-bold mt-1 opacity-60 tracking-wider">
              DATA STRUCTURES, ALGORITHMS, NEURAL NETWORKS, OS, DBMS
            </p>
          </div>
        </motion.div>

        {/* Education 2 */}
        <motion.div 
          variants={rightCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border-4 border-bauhaus-black p-8 neo-shadow flex flex-col"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-black uppercase tracking-tight">Diploma in IT</h3>
            <span className="bg-bauhaus-blue text-white px-3 py-1 font-bold text-[10px] border-2 border-bauhaus-black uppercase tracking-widest">
              Completed
            </span>
          </div>
          <p className="font-black text-lg uppercase tracking-tight mb-2">Polytechnic Foundation</p>
          <p className="text-sm mb-8 leading-relaxed">
            Foundational computer science principles. Final Grade: Distinction.
          </p>
          <div className="mt-auto border-t-4 border-bauhaus-black pt-4">
            <span className="font-bold text-xs uppercase tracking-widest text-bauhaus-blue">Core Subjects:</span>
            <p className="text-[10px] font-bold mt-1 opacity-60 tracking-wider">
              NETWORKING, WEB DEV, SOFTWARE ENG, SYSTEMS ANALYSIS
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      staggerChildren: 0.2
    } 
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" }
  },
};

export default function About() {
  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 bg-bauhaus-gray border-b-4 border-bauhaus-black overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-bauhaus-black"
      >
        <motion.h2 variants={sectionVariants} className="text-4xl font-black mb-8 uppercase tracking-tight">ABOUT [01]</motion.h2>
        <div className="space-y-8">
          <motion.p variants={sectionVariants} className="text-xl text-bauhaus-black leading-relaxed">
            I am a Data Scientist and AI researcher dedicated to deciphering high-dimensional chaos. My work sits at the intersection of mathematical rigor and visual clarity, transforming complex datasets into actionable geometric insights.
          </motion.p>
          <motion.p variants={sectionVariants} className="text-xl text-bauhaus-black leading-relaxed">
            With a foundation in Constructivist principles, I believe information is a structural medium. I build systems that don't just calculate—they communicate.
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        className="p-8 md:p-16 grid grid-cols-2 gap-8 bg-bauhaus-bg md:bg-bauhaus-gray"
      >
        <motion.div variants={cardVariants} className="bg-white p-8 border-4 border-bauhaus-black neo-shadow-red flex flex-col justify-center">
          <span className="text-6xl font-black text-bauhaus-red">5</span>
          <span className="font-bold text-sm uppercase tracking-widest mt-2">Projects</span>
        </motion.div>
        <motion.div variants={cardVariants} className="bg-bauhaus-blue p-8 border-4 border-bauhaus-black neo-shadow flex flex-col justify-center text-white">
          <span className="text-6xl font-black">10+</span>
          <span className="font-bold text-sm uppercase tracking-widest mt-2">Technologies</span>
        </motion.div>
        <motion.div variants={cardVariants} className="bg-bauhaus-yellow p-8 border-4 border-bauhaus-black neo-shadow flex flex-col justify-center">
          <span className="text-6xl font-black">2</span>
          <span className="font-bold text-sm uppercase tracking-widest mt-2">Degrees</span>
        </motion.div>
        <motion.div variants={cardVariants} className="bg-white p-8 border-4 border-bauhaus-black neo-shadow flex flex-col justify-center">
          <span className="text-6xl font-black">∞</span>
          <span className="font-bold text-sm uppercase tracking-widest mt-2">Curiosity</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

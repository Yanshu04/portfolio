import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] border-b-4 border-bauhaus-black overflow-hidden">
      {/* Left Hero */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-8 md:p-16 flex flex-col justify-center gap-10 bg-bauhaus-bg"
      >
        <motion.span variants={itemVariants} className="font-bold text-sm tracking-[0.2em] text-bauhaus-black/50 uppercase">
          SECTION MARKER / 2026
        </motion.span>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="w-32 h-32 bg-bauhaus-yellow border-4 border-bauhaus-black flex items-center justify-center neo-shadow"
        >
          <span className="text-4xl font-black text-bauhaus-black tracking-tighter">YS</span>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h1 className="text-7xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-bauhaus-black">
            YANSHU<br />SHINGALA
          </h1>
          <p className="text-2xl text-bauhaus-blue mt-4 uppercase font-black tracking-tight">
            Data Science · AI · Machine Learning
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="bg-bauhaus-red text-white border-4 border-bauhaus-black rounded-full px-8 py-3 font-bold text-sm uppercase flex items-center gap-2 neo-shadow-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            View Projects <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="bg-transparent text-bauhaus-black border-4 border-bauhaus-black rounded-full px-8 py-3 font-bold text-sm uppercase flex items-center gap-2 neo-shadow-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            Get in Touch <ArrowRight size={18} />
          </a>
        </motion.div>
      </motion.div>

      {/* Right Hero (Abstract Bauhaus) */}
      <div className="bg-bauhaus-blue relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-full dot-grid border-l-0 md:border-l-4 border-bauhaus-black">
        <div className="relative w-72 h-72">
          {/* Bauhaus shapes with floating animations */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 left-0 w-52 h-52 bg-white rounded-full border-4 border-bauhaus-black"
          />
          <motion.div 
            animate={{ 
              x: [0, 20, 0],
              y: [0, 10, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-0 right-0 w-52 h-52 bg-bauhaus-yellow border-4 border-bauhaus-black"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-bauhaus-red rounded-full border-4 border-bauhaus-black"
          />
        </div>
        
        {/* Simple geometric lines at the bottom right */}
        <div className="absolute bottom-12 right-12 flex flex-col gap-2">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-24 h-4 bg-bauhaus-black origin-right"
          />
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="w-24 h-4 bg-bauhaus-black origin-right"
          />
        </div>
      </div>
    </section>
  );
}

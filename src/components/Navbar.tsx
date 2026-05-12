import { motion } from "motion/react";

export default function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 z-50 flex justify-between items-center w-full px-8 md:px-16 py-3 bg-bauhaus-bg border-b-4 border-bauhaus-black neo-shadow-sm"
    >
      <a href="#" className="text-2xl font-black text-bauhaus-black uppercase tracking-tighter">
        YS
      </a>
      
      <nav className="hidden md:flex gap-10 items-center">
        {["projects", "about", "skills", "contact"].map((item) => (
          <motion.a
            key={item}
            href={`#${item}`}
            whileHover={{ y: -2 }}
            className="text-bauhaus-black font-bold text-sm hover:text-bauhaus-blue transition-colors uppercase tracking-wider block"
          >
            {item}
          </motion.a>
        ))}
      </nav>

      <div className="font-bold text-xs text-bauhaus-blue uppercase hidden md:block tracking-widest">
        Available for work
      </div>
    </motion.header>
  );
}

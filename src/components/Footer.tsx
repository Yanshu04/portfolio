import { motion } from "motion/react";

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="flex flex-col md:flex-row justify-between items-center gap-6 px-8 md:px-16 py-12 bg-bauhaus-black text-bauhaus-bg border-t-4 border-bauhaus-red"
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        className="text-2xl font-black uppercase tracking-tighter"
      >
        YS
      </motion.div>
      <div className="font-bold text-xs uppercase tracking-widest opacity-50">
        © 2024 YANSHU SHINGALA
      </div>
      <div className="flex gap-8">
        {["GITHUB", "LINKEDIN", "RESUME"].map((item) => (
          <motion.a
            key={item}
            href="#"
            whileHover={{ y: -2, color: "#F0C020" }}
            className="font-bold text-xs uppercase tracking-widest transition-colors"
          >
            {item}
          </motion.a>
        ))}
      </div>
    </motion.footer>
  );
}

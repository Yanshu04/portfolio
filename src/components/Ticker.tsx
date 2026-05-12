import { motion } from "motion/react";

const techStack = [
  "PYTHON", "TENSORFLOW", "PYTORCH", "REACT", "PANDAS", "NUMPY", "SCIKIT-LEARN", "D3.JS", "FASTAPI"
];

export default function Ticker() {
  return (
    <div className="bg-bauhaus-yellow border-b-4 border-bauhaus-black py-6 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-16 items-center px-8"
        >
          {[...techStack, ...techStack].map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-3 font-bold text-lg tracking-widest text-bauhaus-black"
            >
              <span className="w-4 h-4 bg-bauhaus-black block" />
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

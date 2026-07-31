import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

interface TypewriterHeroTitleProps {
  className?: string;
  startTyping?: boolean;
}

export default function TypewriterHeroTitle({ className = "", startTyping = true }: TypewriterHeroTitleProps) {
  const line1 = "Yanshu";
  const line2 = "Shingala";
  const shouldReduceMotion = useReducedMotion();

  const [isFirstVisit] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const played = sessionStorage.getItem("typewriter_hero_played");
      if (!played) {
        sessionStorage.setItem("typewriter_hero_played", "true");
        return true;
      }
    }
    return false;
  });

  const [displayedLine1, setDisplayedLine1] = useState(isFirstVisit && !shouldReduceMotion ? "" : line1);
  const [displayedLine2, setDisplayedLine2] = useState(isFirstVisit && !shouldReduceMotion ? "" : line2);
  const [isDone, setIsDone] = useState(!isFirstVisit || shouldReduceMotion);

  useEffect(() => {
    if (!isFirstVisit || shouldReduceMotion) {
      setDisplayedLine1(line1);
      setDisplayedLine2(line2);
      setIsDone(true);
      return;
    }

    // Wait until startTyping is triggered (e.g. after Gizmo intro finishes)
    if (!startTyping) return;

    let i = 0;
    let j = 0;

    // Typewriter timing sequence
    const interval = setInterval(() => {
      if (i < line1.length) {
        i++;
        setDisplayedLine1(line1.slice(0, i));
      } else if (j < line2.length) {
        j++;
        setDisplayedLine2(line2.slice(0, j));
      } else {
        clearInterval(interval);
        setIsDone(true);
      }
    }, 85);

    return () => clearInterval(interval);
  }, [isFirstVisit, shouldReduceMotion, startTyping]);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <span className="relative inline-block">
        {displayedLine1}
        {!isDone && startTyping && displayedLine1.length < line1.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="text-[#E53E3E] light:text-[#2B6CB0] ml-1 select-none font-sans"
          >
            ▌
          </motion.span>
        )}
      </span>
      <br />
      <span className="relative inline-block">
        {displayedLine2}
        {!isDone && startTyping && displayedLine1.length >= line1.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="text-[#E53E3E] light:text-[#2B6CB0] ml-1 select-none font-sans"
          >
            ▌
          </motion.span>
        )}
      </span>
    </motion.h1>
  );
}

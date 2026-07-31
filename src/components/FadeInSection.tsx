import React from "react";
import { motion, useReducedMotion, Variants } from "motion/react";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  staggerChildren?: number;
}

export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

export default function FadeInSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  staggerChildren,
}: FadeInSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialY = () => {
    if (direction === "up") return 24;
    if (direction === "down") return -24;
    return 0;
  };

  const getInitialX = () => {
    if (direction === "left") return 24;
    if (direction === "right") return -24;
    return 0;
  };

  const parentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : getInitialY(),
      x: shouldReduceMotion ? 0 : getInitialX(),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
        ...(staggerChildren && !shouldReduceMotion
          ? { staggerChildren, delayChildren: delay }
          : {}),
      },
    },
  };

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

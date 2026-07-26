import React, { useRef, useEffect, useState } from "react";

interface Hero3DTiltProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Hero3DTilt — pure CSS 3D perspective tilt driven by mouse position.
 *
 * Implementation:
 * - Uses CSS `perspective` + `rotateX/Y` on the wrapper div.
 * - `will-change: transform` promotes element to compositor layer.
 * - RAF loop PAUSES via IntersectionObserver when element scrolls out of
 *   view — releases GPU compositor budget, no memory leak on long scroll.
 * - Resets to flat (0,0) smoothly when mouse leaves.
 * - prefers-reduced-motion: component renders as flat static div, RAF and
 *   mousemove listener are never attached at all.
 * - Zero new packages — no WebGL, no Three.js.
 */
export default function Hero3DTilt({ children, className = "" }: Hero3DTiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);
  const targetRef = useRef({ rx: 0, ry: 0 });
  const currentRef = useRef({ rx: 0, ry: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    // --- RAF spring lerp loop ---
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Only compute/paint when in viewport — saves GPU when hero is offscreen
      if (isVisibleRef.current) {
        currentRef.current.rx = lerp(currentRef.current.rx, targetRef.current.rx, 0.08);
        currentRef.current.ry = lerp(currentRef.current.ry, targetRef.current.ry, 0.08);
        const { rx, ry } = currentRef.current;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // --- IntersectionObserver: pause RAF work when hero not in viewport ---
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // Reset spring target on re-entry so no stale tilt snaps into view
          targetRef.current = { rx: 0, ry: 0 };
        }
      },
      { threshold: 0.01 }
    );
    visibilityObserver.observe(el);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      visibilityObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !isVisibleRef.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 12;
    const rx = -((e.clientY - cy) / (rect.height / 2)) * 10;
    targetRef.current = { rx, ry };
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    targetRef.current = { rx: 0, ry: 0 };
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        willChange: prefersReducedMotion ? "auto" : "transform",
        transition: isHovering ? "none" : "transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeInSection({ children, className = "" }: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once the element is visible, do not unobserve so it stays visible
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      });
    }, {
      threshold: 0.1, // trigger early for better response
      rootMargin: "0px 0px -50px 0px" // offset to fire slightly before entering viewport
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

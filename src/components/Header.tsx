import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Cpu } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export default function Header({ darkMode, onToggleTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Playgrounds", href: "#playgrounds" },
    { label: "Skills", href: "#skills" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-20 border-b-2 ${isScrolled
            ? "bg-[#121212]/95 light:bg-[#FAF8F5]/95 backdrop-blur-md h-16 border-white light:border-black"
            : "bg-transparent border-transparent"
          }`}
      >
        <div className="w-full px-[8%] md:px-[12%] lg:px-[14%] h-full flex items-center justify-between">
          {/* Logo Name branding - bold title font */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 font-title text-[13px] sm:text-base font-black tracking-tight uppercase select-none whitespace-nowrap"
            style={{ color: darkMode ? "#FAF8F5" : "#121212" }}
          >
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-[#DC3D24]" />
            <span>YANSHU SHINGALA</span>
          </motion.a>

          {/* Desktop Right Side Control Actions */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 font-sans">
            <nav className="flex items-center gap-3.5 lg:gap-5 xl:gap-7 text-xs uppercase tracking-widest font-bold whitespace-nowrap">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -2, color: "#DC3D24" }}
                  whileTap={{ y: 0 }}
                  className="text-neutral-400 light:text-neutral-600 transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Split vertical divider */}
            <div className="w-[2px] h-5 bg-neutral-800 light:bg-neutral-300"></div>

            {/* Dark & Light mode controller */}
            <motion.button
              onClick={onToggleTheme}
              whileHover={{ scale: 1.08, rotate: 15 }}
              whileTap={{ scale: 0.92 }}
              className="p-1.5 border-2 border-white light:border-black hover:bg-neutral-800 light:hover:bg-neutral-200 bg-neutral-950 light:bg-white text-white light:text-black transition-all cursor-pointer"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            {/* Action Resume button in Bauhaus style */}
            <motion.a
              href="yanshu-shingala-resume.pdf"
              download="Yanshu_Shingala_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96, y: 0 }}
              className="px-5 py-2 border-2 border-white light:border-black font-mono text-xs uppercase font-black tracking-widest transition-all shadow-bauhaus-sm"
              style={{
                backgroundColor: "#E3B448",
                color: "#121212"
              }}
            >
              RESUME
            </motion.a>
          </div>

          {/* Mobile responsive toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <motion.button
              onClick={onToggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 border-2 border-white light:border-black bg-neutral-950 light:bg-white text-white light:text-black transition-all"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </motion.button>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 border-2 border-white light:border-black text-neutral-400 light:text-neutral-600 bg-neutral-950 light:bg-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#121212]/98 light:bg-[#FAF8F5]/98 flex flex-col justify-center items-center gap-8 h-screen w-screen md:hidden animate-fade-in">
          {navLinks.filter(link => link.label !== "Playgrounds").map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl uppercase tracking-widest font-black text-neutral-200 light:text-slate-900 hover:text-[#DC3D24] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="yanshu-shingala-resume.pdf"
            download="Yanshu_Shingala_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-8 py-3.5 border-2 border-white light:border-black font-mono text-sm uppercase font-black tracking-widest mt-4 shadow-bauhaus-sm"
            style={{
              backgroundColor: "#E3B448",
              color: "#121212"
            }}
          >
            RESUME
          </a>

          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-8 py-3.5 border-2 border-white light:border-black font-mono text-sm uppercase font-black tracking-widest mt-2 shadow-bauhaus-sm"
            style={{
              backgroundColor: "transparent",
              color: darkMode ? "#FAF8F5" : "#121212",
              borderColor: darkMode ? "#FAF8F5" : "#121212"
            }}
          >
            GET IN TOUCH
          </a>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Playgrounds", href: "#playgrounds" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-20 border-b-2 ${
          isScrolled
            ? "bg-[#121212]/95 light:bg-[#FAF8F5]/95 backdrop-blur-md h-16 border-white/20 light:border-black/20 shadow-md"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          {/* Logo Name branding */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 font-title text-sm sm:text-base md:text-lg font-black tracking-tight uppercase select-none shrink-0"
            style={{ color: darkMode ? "#FAF8F5" : "#121212" }}
          >
            <Cpu className="w-5 h-5 text-[#DC3D24] shrink-0" />
            <span className="truncate">YANSHU SHINGALA</span>
          </motion.a>

          {/* Desktop Navigation (visible on large screens >= lg) */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 font-sans shrink-0">
            <nav className="flex items-center gap-2.5 xl:gap-4 text-[11px] xl:text-xs uppercase tracking-wider font-bold whitespace-nowrap font-mono">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -2, color: "#DC3D24" }}
                  whileTap={{ y: 0 }}
                  className="text-neutral-400 light:text-neutral-600 hover:text-white light:hover:text-black transition-colors duration-200"
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
              className="p-2 border-2 border-white light:border-black hover:bg-neutral-800 light:hover:bg-neutral-200 bg-neutral-950 light:bg-white text-white light:text-black transition-all cursor-pointer"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            {/* Action Resume button */}
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

          {/* Mobile & Tablet responsive controls (< lg) */}
          <div className="flex items-center gap-3 lg:hidden">
            <motion.button
              onClick={onToggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-2 border-2 border-white light:border-black bg-neutral-950 light:bg-white text-white light:text-black transition-all cursor-pointer"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-2 border-2 border-white light:border-black text-neutral-300 light:text-neutral-700 bg-neutral-950 light:bg-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#DC3D24]" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Full-Screen Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0B0B0C]/98 light:bg-[#FAF8F5]/98 backdrop-blur-lg flex flex-col justify-center items-center px-6 py-24 h-screen w-screen lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col items-center gap-5 w-full max-w-xs text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl sm:text-2xl uppercase tracking-widest font-black font-mono text-neutral-200 light:text-slate-900 hover:text-[#DC3D24] transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}

              <div className="w-16 h-[2px] bg-neutral-800 light:bg-neutral-300 my-2"></div>

              <a
                href="yanshu-shingala-resume.pdf"
                download="Yanshu_Shingala_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 border-2 border-white light:border-black font-mono text-sm uppercase font-black tracking-widest shadow-bauhaus-sm"
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
                className="w-full py-3 border-2 border-white light:border-black font-mono text-sm uppercase font-black tracking-widest shadow-bauhaus-sm"
                style={{
                  backgroundColor: "transparent",
                  color: darkMode ? "#FAF8F5" : "#121212",
                  borderColor: darkMode ? "#FAF8F5" : "#121212"
                }}
              >
                GET IN TOUCH
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

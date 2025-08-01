"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, NAVBAR_LABELS } from "../data/navbar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Nav items for single page layout
  const navItems = useMemo(() => NAV_ITEMS, []);

  // Handle scroll to section with smooth behavior
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  // Update active section and scroll state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = navItems.map(item => item.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-950/50 backdrop-blur-xl shadow-xl shadow-black/20 border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
        <div className="hidden md:flex items-center">
          <div className="flex items-center space-x-1 px-2 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-xl shadow-black/10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href.substring(1))}
                className={`relative px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-medium tracking-wide ${
                  activeSection === item.href.substring(1)
                    ? "bg-white/10 text-white shadow-lg shadow-black/20"
                    : "text-white/60 hover:text-white/90 hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-3 rounded-xl hover:bg-paragraph/5 transition-all duration-300 text-paragraph hover:text-primary absolute right-6 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label={isOpen ? NAVBAR_LABELS.closeMenu : NAVBAR_LABELS.openMenu}
          aria-expanded={isOpen}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="md:hidden overflow-hidden bg-slate-950/80 backdrop-blur-xl border-t border-white/5"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col p-4 space-y-1">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href.substring(1))}
              className={`block py-3 px-4 rounded-2xl transition-all duration-300 text-base font-medium ${
                activeSection === item.href.substring(1)
                  ? "bg-white/10 text-white shadow-lg shadow-black/20"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </motion.nav>
    </motion.nav>
  );
};

export default Navbar;

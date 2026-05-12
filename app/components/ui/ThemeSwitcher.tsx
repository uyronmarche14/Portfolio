"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { id: "dark", label: "Dark", icon: "🎨", description: "Orange accent" },
    { id: "bw", label: "B&W", icon: "⚫", description: "Monochrome" },
    { id: "light", label: "Light", icon: "☀️", description: "White mode" },
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-16 right-0 bg-background border-2 border-foreground shadow-brutal p-2 min-w-[160px]"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-150 font-mono text-xs uppercase tracking-wider ${
                  theme === t.id
                    ? "bg-primary text-background font-bold"
                    : "text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                <div>
                  <div className="font-bold">{t.label}</div>
                  <div className="text-[10px] opacity-60 normal-case tracking-normal">{t.description}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 border-2 border-foreground bg-background shadow-brutal flex items-center justify-center text-xl hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all duration-150"
        aria-label="Toggle theme"
      >
        {currentTheme.icon}
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Prevent hydration mismatch
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
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 right-0 bg-card/95 backdrop-blur-xl border border-border/30 rounded-xl p-2 shadow-2xl min-w-[140px]"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  theme === t.id
                    ? "bg-primary/20 text-foreground"
                    : "text-paragraph hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                <div>
                  <div className="text-sm font-medium">{t.label}</div>
                  <div className="text-xs opacity-60">{t.description}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-xl border border-border/30 shadow-lg flex items-center justify-center text-xl hover:border-primary/50 transition-colors duration-300"
        aria-label="Toggle theme"
      >
        {currentTheme.icon}
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;

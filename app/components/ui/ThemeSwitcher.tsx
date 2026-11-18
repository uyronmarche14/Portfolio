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
    { id: "dark", label: "Dark", icon: "🎨", description: "Monochrome accent" },
    { id: "bw", label: "B&W", icon: "⚫", description: "Monochrome" },
    { id: "light", label: "Light", icon: "☀️", description: "White mode" },
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-12 right-0 sm:bottom-16 bg-background border border-foreground/15 rounded-xl shadow-soft p-2 min-w-[160px]"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-left transition-all duration-150 font-mono text-xs ${
                  theme === t.id
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                <div>
                  <div className="font-medium">{t.label}</div>
                  <div className="text-xs opacity-60 normal-case tracking-normal">{t.description}</div>
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
        className="h-10 w-10 border border-foreground/15 rounded-full bg-background shadow-soft flex items-center justify-center text-lg opacity-80 hover:opacity-100 sm:h-12 sm:w-12 sm:text-xl sm:opacity-100 hover:shadow-soft-lg transition-all duration-150"
        aria-label="Toggle theme"
      >
        {currentTheme.icon}
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;

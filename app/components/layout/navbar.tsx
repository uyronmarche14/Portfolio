"use client";
import ResumeDrawer from "@/components/ui/drawer/resumeDrawer";
import { Button } from "@/components/ui/shadcn/button";
import { NAV_ITEMS, NAVBAR_LABELS } from "@/lib/data/navbar";
import { motion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { type NavigationItem } from "./Navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  
  // Prevent hydration mismatch - only use theme after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Determine if we're in light mode (only after mounted)
  const isLight = mounted && theme === "light";

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Convert nav items to Navigation component format
  const navigationItems = useMemo(
    (): NavigationItem[] =>
      NAV_ITEMS.map((item) => ({
        label: item.label,
        href: item.href,
        active: activeSection === item.href.substring(1),
      })),
    [activeSection]
  );

  // Handle scroll to section with smooth behavior
  const handleNavigationClick = (
    item: NavigationItem,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    const sectionId = item.href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  // Use neutral classes before mount to prevent hydration mismatch
  const navBgClass = isScrolled
    ? "border-b border-foreground/[0.08] bg-gradient-to-b from-foreground/[0.05] to-transparent shadow-2xl shadow-black/30 backdrop-blur-2xl"
    : "bg-transparent";

  const containerClass = "hover:shadow-3xl flex items-center rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-500 border-foreground/[0.05] bg-foreground/[0.03] shadow-black/20 hover:shadow-black/30";
  
  const separatorClass = "h-8 w-px bg-foreground/[0.12]";
  
  const mobileNavClass = "overflow-hidden border-t backdrop-blur-2xl md:hidden border-foreground/[0.08] bg-foreground/[0.03]";
  
  const mobileBorderClass = "flex items-center gap-3 border-b pb-4 border-foreground/[0.08]";
  
  const mobileActionClass = "flex flex-col space-y-3 border-t pt-4 border-foreground/[0.08]";

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-500 ${navBgClass}`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 py-4 ">
        {/* Center - Main Navigation */}
        <div className="hidden items-center md:flex">
          <div className={containerClass}>
            {/* Avatar Section */}
            <div className="flex items-center px-4 py-3">
              <h1 
                className="text-xl font-extrabold font-rawkner bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-500"
              >
                Rhyss
              </h1>
            </div>

            {/* Vertical Separator */}
            <div className={separatorClass} />

            {/* Navigation Items */}
            <div className="flex items-center px-2">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => handleNavigationClick(item, e)}
                  className={`relative mx-1 rounded-xl px-4 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                    item.active
                      ? "bg-foreground/20 text-foreground shadow-lg shadow-black/20 backdrop-blur-sm"
                      : "text-foreground/60 hover:bg-foreground/[0.08] hover:text-foreground/90"
                  }`}
                >
                  {item.label}
                  {item.active && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border border-foreground/10 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Vertical Separator */}
            <div className={separatorClass} />

            {/* Action Buttons */}
            <div className="flex items-center gap-2 px-4 py-3">
              <ResumeDrawer />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="hover:shadow-3xl rounded-2xl border p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 focus:outline-none focus:ring-2 md:hidden border-foreground/[0.05] bg-foreground/[0.03] text-foreground/70 shadow-black/20 hover:bg-foreground/[0.08] hover:text-foreground hover:shadow-black/30 focus:ring-foreground/20"
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
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={mobileNavClass}
        aria-hidden={!isOpen}
      >
        <div className="space-y-4 p-6">
          {/* Mobile Avatar Section */}
          <div className={mobileBorderClass}>
             <h1 
                className="text-xl font-extrabold font-rawkner bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-500"
              >
                Rhyss
              </h1>
          </div>

          {/* Mobile Navigation Items */}
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={(e) => handleNavigationClick(item, e)}
                className={`block w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition-all duration-300 ${
                  item.active
                    ? "bg-foreground/20 text-foreground shadow-lg shadow-black/20 backdrop-blur-sm"
                    : "text-foreground/60 hover:bg-foreground/[0.08] hover:text-foreground/90"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <motion.div
            className={mobileActionClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <ResumeDrawer
              trigger={
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-2xl border px-4 py-3 backdrop-blur-sm transition-all duration-300 border-foreground/[0.08] text-foreground/60 hover:bg-foreground/[0.08] hover:text-foreground/90"
                >
                  <FileText className="mr-3 h-4 w-4" />
                  View Resume
                </Button>
              }
            />
          </motion.div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;

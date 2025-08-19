"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, Music, FileText } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import ResumeDrawer from "@/components/ui/drawer/resumeDrawer";
import MusicDrawer from "@/components/ui/drawer/musicDrawer";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/avatar";
import { NAV_ITEMS, NAVBAR_LABELS } from "@/lib/data/navbar";
import { type NavigationItem } from "./Navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "border-b border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent shadow-2xl shadow-black/30 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-6 py-4 ">
        {/* Center - Main Navigation */}
        <div className="hidden items-center md:flex">
          <div className="hover:shadow-3xl flex items-center rounded-2xl border border-white/[0.05] bg-white/[0.03] shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-500 hover:shadow-black/30">
            {/* Avatar Section */}
            <div className="flex items-center px-4 py-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1753097383/113_UY_RON_MARCHE_RHYSS_TCU02311_vvabi3.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            {/* Vertical Separator */}
            <div className="h-8 w-px bg-white/[0.12]" />

            {/* Navigation Items */}
            <div className="flex items-center px-2">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => handleNavigationClick(item, e)}
                  className={`relative mx-1 rounded-xl px-4 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                    item.active
                      ? "bg-white/20 text-white shadow-lg shadow-black/20 backdrop-blur-sm"
                      : "text-white/60 hover:bg-white/[0.08] hover:text-white/90"
                  }`}
                >
                  {item.label}
                  {item.active && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
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
            <div className="h-8 w-px bg-white/[0.12]" />

            {/* Action Buttons */}
            <div className="flex items-center gap-2 px-4 py-3">
              <MusicDrawer />
              <ResumeDrawer />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="hover:shadow-3xl rounded-2xl border border-white/[0.05] bg-white/[0.03] p-3 text-white/70 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.08] hover:text-white hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-white/20 md:hidden"
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
        className="overflow-hidden border-t border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl md:hidden"
        aria-hidden={!isOpen}
      >
        <div className="space-y-4 p-6">
          {/* Mobile Avatar Section */}
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium text-white/80">Menu</div>
          </div>

          {/* Mobile Navigation Items */}
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={(e) => handleNavigationClick(item, e)}
                className={`block w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition-all duration-300 ${
                  item.active
                    ? "bg-white/20 text-white shadow-lg shadow-black/20 backdrop-blur-sm"
                    : "text-white/60 hover:bg-white/[0.08] hover:text-white/90"
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
            className="flex flex-col space-y-3 border-t border-white/[0.08] pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <ResumeDrawer
              trigger={
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-2xl border border-white/[0.08] px-4 py-3 text-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:text-white/90"
                >
                  <FileText className="mr-3 h-4 w-4" />
                  View Resume
                </Button>
              }
            />

            <MusicDrawer
              trigger={
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-2xl border border-white/[0.08] px-4 py-3 text-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:text-white/90"
                >
                  <Music className="mr-3 h-4 w-4" />
                  Music Player
                </Button>
              }
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;

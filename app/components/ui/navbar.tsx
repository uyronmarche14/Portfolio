"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, Music, FileText } from "lucide-react";
import { NAV_ITEMS, NAVBAR_LABELS } from "@/data/navbar";
import { Button } from "@/components/ui/shadcn/button";
import ResumeDrawer from "@/components/ui/drawer/resumeDrawer";
import MusicDrawer from "@/components/ui/drawer/musicDrawer";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Nav items for single page layout
  const navItems = useMemo(() => NAV_ITEMS, []);

  // Handle scroll to section with smooth behavior
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
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
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center relative ">
        {/* Center - Main Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex items-center rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] shadow-2xl shadow-black/20 hover:shadow-3xl hover:shadow-black/30 transition-all duration-500">
            {/* Avatar Section */}
            <div className="flex items-center px-4 py-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1753097383/113_UY_RON_MARCHE_RHYSS_TCU02311_vvabi3.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            {/* Vertical Separator */}
            <div className="w-px h-8 bg-white/[0.12]" />

            {/* Navigation Items */}
            <div className="flex items-center px-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href.substring(1))}
                  className={`relative px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 text-sm font-medium tracking-wide ${
                    activeSection === item.href.substring(1)
                      ? "bg-white/20 text-white shadow-lg shadow-black/20 backdrop-blur-sm"
                      : "text-white/60 hover:text-white/90 hover:bg-white/[0.08]"
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 border border-white/10"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Vertical Separator */}
            <div className="w-px h-8 bg-white/[0.12]" />

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
          className="md:hidden p-3 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] shadow-2xl shadow-black/20 hover:bg-white/[0.08] hover:shadow-3xl hover:shadow-black/30 transition-all duration-500 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
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
        className="md:hidden overflow-hidden bg-white/[0.03] backdrop-blur-2xl border-t border-white/[0.08]"
        aria-hidden={!isOpen}
      >
        <div className="p-6 space-y-4">
          {/* Mobile Avatar Section */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08]">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-white/80 text-sm font-medium">Menu</div>
          </div>

          {/* Mobile Navigation Items */}
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href.substring(1))}
                className={`block py-3 px-4 rounded-2xl transition-all duration-300 text-base font-medium ${
                  activeSection === item.href.substring(1)
                    ? "bg-white/20 text-white shadow-lg shadow-black/20 backdrop-blur-sm"
                    : "text-white/60 hover:text-white/90 hover:bg-white/[0.08]"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <motion.div
            className="flex flex-col space-y-3 pt-4 border-t border-white/[0.08]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <ResumeDrawer
              trigger={
                <Button
                  variant="ghost"
                  className="justify-start text-white/60 hover:text-white/90 hover:bg-white/[0.08] transition-all duration-300 rounded-2xl py-3 px-4 border border-white/[0.08] backdrop-blur-sm w-full"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  View Resume
                </Button>
              }
            />

            <MusicDrawer
              trigger={
                <Button
                  variant="ghost"
                  className="justify-start text-white/60 hover:text-white/90 hover:bg-white/[0.08] transition-all duration-300 rounded-2xl py-3 px-4 border border-white/[0.08] backdrop-blur-sm w-full"
                >
                  <Music className="w-4 h-4 mr-3" />
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
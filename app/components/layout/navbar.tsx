"use client";
import ResumeDrawer from "@/components/ui/drawer/resumeDrawer";
import { Button } from "@/components/ui/shadcn/button";
import { NAV_ITEMS, NAVBAR_LABELS } from "@/lib/data/navbar";
import { motion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { type NavigationItem } from "./Navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const toggleMenu = () => setIsOpen((value) => (value ? false : true));

  useEffect(() => {
    if (pathname !== "/") {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navigationItems = useMemo(
    (): NavigationItem[] =>
      NAV_ITEMS.map((item) => ({
        label: item.label,
        href: item.href,
        active:
          item.kind === "route"
            ? pathname === item.href
            : pathname === "/" && activeSection === item.href.substring(1),
      })),
    [activeSection, pathname]
  );

  const handleNavigationClick = (
    item: NavigationItem,
    event: React.MouseEvent
  ) => {
    event.preventDefault();

    const navItem = NAV_ITEMS.find(
      (candidate) =>
        candidate.label === item.label && candidate.href === item.href
    );

    if (navItem?.kind === "route") {
      router.push(navItem.href);
      setIsOpen(false);
      return;
    }

    const sectionId = item.href.substring(1);

    if (pathname !== "/") {
      router.push("/" + item.href);
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
    setIsOpen(false);
  };


  const navFrameClass =
    isScrolled
      ? "bg-background/95 supports-[backdrop-filter]:bg-background/85 backdrop-blur"
      : "bg-background/90 supports-[backdrop-filter]:bg-background/75 backdrop-blur";

  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center">
        {/* Desktop Navigation */}
        <div className="hidden items-center md:flex">
          <div className={"flex items-center rounded-full border border-foreground/15 shadow-soft-sm transition-all duration-200 " + navFrameClass}>
            {/* Brand */}
            <div className="flex items-center px-5 py-3">
              <h1 className="text-xl font-extrabold font-display text-primary">
                Rhyss
              </h1>
            </div>

            <div className="h-6 w-px bg-foreground/15" />

            {/* Nav Links */}
            <div className="flex items-center px-2">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => handleNavigationClick(item, e)}
                  className={
                    "relative mx-0.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 " +
                    (item.active
                      ? "bg-foreground text-background"
                      : "text-foreground/60 hover:bg-foreground/10 hover:text-foreground")
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-foreground/15" />

            {/* Resume */}
            <div className="flex items-center gap-2 px-4 py-3">
              <ResumeDrawer />
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className={"rounded-full border border-foreground/15 p-3 shadow-soft-sm transition-colors duration-150 hover:bg-foreground/5 focus:outline-none md:hidden " + navFrameClass}
          aria-label={isOpen ? NAVBAR_LABELS.closeMenu : NAVBAR_LABELS.openMenu}
          aria-expanded={isOpen}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
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
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="mx-auto mt-3 w-full max-w-6xl overflow-hidden md:hidden"
        aria-hidden={!isOpen}
      >
        <div className={"space-y-4 rounded-2xl border border-foreground/15 p-6 shadow-soft " + navFrameClass}>
          {/* Brand */}
          <div className="flex items-center gap-3 border-b border-foreground/15 pb-4">
            <h1 className="text-xl font-extrabold font-display text-primary">
              Rhyss
            </h1>
          </div>

          {/* Links */}
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={(e) => handleNavigationClick(item, e)}
                className={
                  "block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-150 " +
                  (item.active
                    ? "bg-foreground text-background"
                    : "text-foreground/60 hover:bg-foreground/10 hover:text-foreground")
                }
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Resume */}
          <motion.div
            className="flex flex-col space-y-3 border-t border-foreground/15 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <ResumeDrawer
              trigger={
                <Button
                  variant="outline"
                  className="w-full justify-start px-4 py-3"
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

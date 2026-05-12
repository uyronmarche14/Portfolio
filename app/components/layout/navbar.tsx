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
    if (pathname !== "/" && pathname !== "/cli" && pathname !== "/chatbot") {
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

  const isSpecialPage = pathname === "/cli" || pathname === "/chatbot";
  const navFrameClass =
    isScrolled || isSpecialPage
      ? "bg-background/95 supports-[backdrop-filter]:bg-background/85 backdrop-blur"
      : "bg-background/90 supports-[backdrop-filter]:bg-background/75 backdrop-blur";

  return (
    <nav className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center">
        {/* Desktop Navigation */}
        <div className="hidden items-center md:flex">
          <div className={"flex items-center border-2 border-foreground shadow-brutal transition-all duration-200 " + navFrameClass}>
            {/* Brand */}
            <div className="flex items-center px-5 py-3">
              <h1 className="text-xl font-extrabold font-rawkner text-primary">
                Rhyss
              </h1>
            </div>

            <div className="w-px h-10 bg-foreground" />

            {/* Nav Links */}
            <div className="flex items-center px-2">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => handleNavigationClick(item, e)}
                  className={
                    "relative mx-1 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-150 " +
                    (item.active
                      ? "bg-primary text-background shadow-brutal-sm"
                      : "text-foreground/60 hover:bg-foreground hover:text-background")
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="w-px h-10 bg-foreground" />

            {/* Resume */}
            <div className="flex items-center gap-2 px-4 py-3">
              <ResumeDrawer />
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className={"border-2 border-foreground p-3 shadow-brutal-sm transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal focus:outline-none md:hidden " + navFrameClass}
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
        <div className={"space-y-4 border-2 border-foreground p-6 shadow-brutal " + navFrameClass}>
          {/* Brand */}
          <div className="flex items-center gap-3 border-b-2 border-foreground pb-4">
            <h1 className="text-xl font-extrabold font-rawkner text-primary">
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
                  "block w-full px-4 py-3 text-left font-mono text-sm font-bold uppercase tracking-widest transition-all duration-150 " +
                  (item.active
                    ? "bg-primary text-background border-2 border-foreground shadow-brutal-sm"
                    : "text-foreground/60 hover:bg-foreground hover:text-background border-2 border-transparent hover:border-foreground")
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
            className="flex flex-col space-y-3 border-t-2 border-foreground pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <ResumeDrawer
              trigger={
                <Button
                  variant="ghost"
                  className="w-full justify-start border-2 border-foreground px-4 py-3 font-mono text-sm uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-150"
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

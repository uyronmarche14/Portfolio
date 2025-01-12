"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Example nav items
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contacts", href: "/contacts" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed w-full z-50 bg-background/50"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
        <div className="hidden md:flex items-center">
          <div className="flex items-center space-x-6 px-6 py-2 rounded-full border border-paragraph/20 bg-background/20">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  relative px-1
                  transition-colors
                  group text-base
                  ${
                    pathname === item.href
                      ? "text-primary font-[700]" // Use explicit font weight
                      : "text-paragraph hover:text-primary font-[500]"
                  }
                `}
              >
                {item.label}
                <span
                  className={`
                    absolute -bottom-1 left-0 h-[2px]
                    bg-primary
                    transition-all duration-300
                    ${
                      pathname === item.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }
                  `}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile button with smaller size */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-paragraph/10 transition-colors text-primary font-normal absolute right-4"
        >
          {isOpen ? <RiCloseLine size={24} /> : <RiMenu4Line size={24} />}
        </button>
      </div>

      {/* Mobile Navigation with increased spacing */}
    </motion.nav>
  );
};

export default Navbar;

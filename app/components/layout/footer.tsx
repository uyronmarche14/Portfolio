"use client";
import { motion } from "framer-motion";
import { Calendar, Github, Linkedin, Mail } from "lucide-react";
import { useRef, useState } from "react";

const Footer = () => {
    // Enhanced social links with better labels and icons
    const enhancedSocialLinks = [
      {
        label: "Email Me Directly",
        href: "mailto:uyronmarcherhyssq@gmail.com",
        icon: Mail,
        color: "hover:text-blue-400"
      },
      {
        label: "Connect on LinkedIn",
        href: "https://www.linkedin.com/in/ron-marche-rhyss-uy-578b80240/",
        icon: Linkedin,
        color: "hover:text-blue-600"
      },
      {
        label: "View My Code",
        href: "https://github.com/uyronmarche14",
        icon: Github,
        color: "hover:text-gray-400"
      },
      {
        label: "Book a Call",
        href: process.env.NEXT_PUBLIC_CALENDLY_LINK || "https://calendly.com/your-calendar-link",
        icon: Calendar,
        color: "hover:text-green-400"
      }
    ];

    // Mask position state for "flashlight" effect only on the text area
    // Mask position state for "flashlight" effect only on the text area
    const [maskPosition, setMaskPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const textRef = useRef<HTMLHeadingElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!textRef.current) return;
        const { left, top } = textRef.current.getBoundingClientRect();
        setMaskPosition({
            x: e.clientX - left,
            y: e.clientY - top,
        });
    };
  
    return (
      <footer 
        className="relative w-full py-8 bg-transparent flex flex-col justify-center items-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Removed blobs as per user request */}
  
        <div className="relative max-w-6xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center ">
            {/* Brand & Social */}
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-xl font-extrabold font-rawkner bg-clip-text text-transparent bg-gradient-to-r from-white to-primary transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-500">
                Rhyss
              </h1>
              <div className="flex space-x-4">
                {enhancedSocialLinks.map(({ label, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-paragraph ${color} transition-colors duration-300`}
                    aria-label={label}
                    title={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
  
            {/* Let's Work Text - "Flashlight" Effect */}
            <div className="text-center relative">
               {/* Base dim text */}
              <h1 
                className="font-rawkner font-extrabold text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] text-zinc-800 select-none"
              >
                LET'S WORK
              </h1>

              {/* Revealed bright text using mask */}
              <motion.h1 
                 ref={textRef}
                 className="absolute inset-0 font-rawkner font-extrabold text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] text-white select-none pointer-events-none"
                 animate={{
                    WebkitMaskPosition: `${maskPosition.x - 300 / 2}px ${maskPosition.y - 300 / 2}px`,
                    WebkitMaskSize: "300px",
                 }}
                 transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
                 style={{
                     maskImage: "radial-gradient(circle, black 50%, transparent 100%)",
                     WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 100%)",
                     maskRepeat: "no-repeat",
                     WebkitMaskRepeat: "no-repeat",
                     opacity: isHovered ? 1 : 0
                 }}
              >
                LET'S WORK
              </motion.h1>
              
               {/* Fallback for non-hover state or mobile - maybe simple gradient */}
               <h1 
                className={`absolute inset-0 font-rawkner font-extrabold text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] bg-clip-text text-transparent bg-gradient-to-r from-white/10 to-primary/10 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`}
              >
                LET'S WORK
              </h1>
            </div>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;

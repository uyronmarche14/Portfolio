"use client";
import Link from "next/link";
import { socialLinks } from "@/lib/data/contacts";
import { Mail, Linkedin, Github, Calendar } from "lucide-react";

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

  return (
    <footer className="relative w-full py-8 bg-background flex flex-col justify-center items-center">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 left-80 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 right-80 w-40 h-40 bg-secondary/10 rounded-full blur-2xl" />
      </div>

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

          {/* Let's Work Text - Made Responsive */}
          <div className="text-center">
            <h1 className="font-rawkner font-extrabold text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] bg-clip-text text-transparent bg-gradient-to-r from-white to-primary hover:from-purple-300 hover:to-purple-500 transition-all duration-500">
              LET'S WORK
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

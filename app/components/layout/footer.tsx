"use client";
import { Calendar, Github, Linkedin, Mail } from "lucide-react";
import { contactInfo, socialLinks as profileSocialLinks } from "@/lib/data/contacts";

const Footer = () => {
    const primaryEmail = contactInfo.emails[0]?.address || "uyronmarcherhyssq@gmail.com";
    const linkedInUrl =
      profileSocialLinks.find((link) => link.label === "LinkedIn")?.href ||
      "https://www.linkedin.com/in/ron-marche-rhyss-uy-578b80240/";
    const githubUrl =
      profileSocialLinks.find((link) => link.label === "GitHub")?.href ||
      "https://github.com/uyronmarche14";
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_LINK;

    const socialLinks = [
      {
        label: "Email Me Directly",
        href: `mailto:${primaryEmail}`,
        icon: Mail,
      },
      {
        label: "Connect on LinkedIn",
        href: linkedInUrl,
        icon: Linkedin,
      },
      {
        label: "View My Code",
        href: githubUrl,
        icon: Github,
      },
      ...(calendlyUrl ? [{
        label: "Book a Call",
        href: calendlyUrl,
        icon: Calendar,
      }] : []),
    ];
  
    return (
      <footer className="relative w-full py-12 bg-transparent flex flex-col justify-center items-center overflow-hidden border-t-2 border-foreground">
        <div className="relative max-w-6xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Brand & Social */}
            <div className="flex items-center gap-6 mb-8">
              <h1 className="text-xl font-extrabold font-rawkner text-primary">
                Rhyss
              </h1>
              <div className="w-px h-6 bg-foreground" />
              <div className="flex gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border-2 border-foreground bg-background flex items-center justify-center text-foreground hover:bg-primary hover:text-background hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-sm transition-all duration-150"
                    aria-label={label}
                    title={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
  
            {/* Let's Work Text — always visible, raw brutalist */}
            <div className="text-center">
              <h2 className="font-rawkner font-extrabold text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] text-foreground select-none leading-none uppercase">
                LET&apos;S WORK
              </h2>
              <div className="w-full h-1 bg-primary mt-4" />
            </div>

            {/* Copyright */}
            <div className="mt-8 font-mono text-xs uppercase tracking-widest text-foreground/40">
              &copy; {new Date().getFullYear()} Rhyss. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;

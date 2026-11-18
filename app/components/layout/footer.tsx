"use client";
import { Calendar, Github, Linkedin, Mail } from "lucide-react";
import { FooterWordmark } from "./FooterWordmark";
import { Button } from "@/components/ui/shadcn/button";
import { contactInfo, socialLinks as profileSocialLinks } from "@/lib/data/contacts";

interface FooterProps {
  /** hide the giant wordmark (used on documentation-style pages) */
  compact?: boolean;
  /** accepted for dynamic-import callers; unused */
  onLoad?: () => void;
}

const Footer = ({ compact = false }: FooterProps) => {
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
      <footer className={`relative w-full overflow-hidden border-t border-foreground/15 pt-10${compact ? " pb-8" : ""}`}>
        {/* flare: a thin lime-to-orange line and a faint lime glow in the corner (plain gradients, no blur) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgb(var(--accent-2) / 0.7), rgb(var(--primary) / 0.7), transparent)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72"
          style={{ background: "radial-gradient(closest-side, rgb(var(--accent-2) / 0.10), transparent)" }}
        />
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-mono text-xs text-foreground/50">
            &copy; {new Date().getFullYear()} Rhyss. All rights reserved.
          </p>
          <nav aria-label="More pages" className="flex flex-wrap justify-center gap-x-5 gap-y-1 font-mono text-xs text-foreground/60">
            {[
              ["Analytics", "/analytics"],
              ["Design", "/design"],
              ["Process", "/process"],
              ["Experience", "/experience"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="underline-offset-4 hover:text-foreground hover:underline">{label}</a>
            ))}
          </nav>
          <div className="flex gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Button key={label} asChild variant="ghost" size="icon" title={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        {!compact && <FooterWordmark />}
      </footer>
    );
  };

export default Footer;

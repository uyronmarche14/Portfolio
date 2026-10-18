"use client";
import { Calendar, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
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
      <footer className="relative w-full overflow-hidden border-t border-foreground/15 pt-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-mono text-xs text-foreground/50">
            &copy; {new Date().getFullYear()} Rhyss. All rights reserved.
          </p>
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

        {/* textLength stretches the wordmark to exactly fill the viewport width */}
        <svg viewBox="82 0 826 340" className="mt-6 block w-full" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="rhyss-fade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="rgb(var(--foreground))" />
              <stop offset="0.55" stopColor="rgb(var(--foreground))" stopOpacity="0.7" />
              <stop offset="1" stopColor="rgb(var(--foreground))" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="285"
            fontSize="380"
            fontFamily="var(--font-display), sans-serif"
            fill="url(#rhyss-fade)"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
          >
            Rhyss
          </text>
        </svg>
      </footer>
    );
  };

export default Footer;

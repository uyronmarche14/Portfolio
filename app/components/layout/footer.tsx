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
      <footer className="relative w-full border-t border-foreground/15 py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-medium text-primary">Contact</p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-6xl md:text-7xl">
            Have something in mind? Let&apos;s build it.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={`mailto:${primaryEmail}`}>{primaryEmail}</a>
            </Button>
            {socialLinks.slice(1).map(({ label, href, icon: Icon }) => (
              <Button key={label} asChild variant="outline" size="lg">
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              </Button>
            ))}
          </div>
          <div className="mt-16 flex items-center justify-between border-t border-foreground/15 pt-6 font-mono text-xs text-foreground/50">
            <span>Rhyss</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;

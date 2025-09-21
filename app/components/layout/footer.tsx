"use client";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactInfo, socialLinks } from "@/lib/data/contacts";

const Footer = () => {
  return (
    <footer
      className="relative w-full py-8 bg-background flex justify-center"
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 left-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Brand & Social */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h1 className="text-xl font-extrabold font-rawkner bg-clip-text text-transparent bg-gradient-to-r from-white to-primary transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-500">
              Rhyss
            </h1>
            <div className="flex space-x-3">
              {socialLinks.slice(0, 4).map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paragraph hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 text-headline">Contact</h3>
            <ul className="space-y-2 text-sm text-paragraph">
              {contactInfo.emails.map(({ label, address }) => (
                <li key={label} className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <Link href={`mailto:${address}`} className="hover:text-primary transition-colors">
                    {address}
                  </Link>
                </li>
              ))}
              {contactInfo.phones.map(({ label, number }) => (
                <li key={label} className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <Link href={`tel:${number.replace(/\s+/g, "")}`} className="hover:text-primary transition-colors">
                    {number}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{contactInfo.location.address}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-headline">Quick Links</h3>
            <ul className="space-y-2 text-sm text-paragraph">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-3 text-headline">Social</h3>
            <ul className="space-y-2 text-sm text-paragraph">
              {socialLinks.slice(0, 3).map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6 text-center text-sm text-paragraph/60">
          <p>© {new Date().getFullYear()} Rhyss. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

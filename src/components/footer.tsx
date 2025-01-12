"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { contactInfo, socialLinks } from "../data/contacts";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full py-8 bg-background"
    >
      {/* Decorative gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Brand & Social */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-xl font-bold text-headline mb-3">Rhyss</h2>
            <div className="flex space-x-3">
              {socialLinks.slice(0, 4).map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-paragraph hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-headline mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-paragraph hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-paragraph hover:text-primary"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-paragraph hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-headline mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-paragraph">
              <li>{contactInfo.emails[0].address}</li>
              <li>{contactInfo.phones[0].number}</li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-semibold text-headline mb-3">
              Location
            </h3>
            <p className="text-sm text-paragraph">
              {contactInfo.location.address}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-paragraph">
            <p>© {new Date().getFullYear()} Rhyss. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link href="/privacy" className="hover:text-primary">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { contactInfo, socialLinks } from "@/lib/data/contacts";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
            <h1 
                className="text-xl font-extrabold font-rawkner bg-clip-text text-transparent bg-gradient-to-r from-white to-primary transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-300 hover:to-purple-500"
              >
                Rhyss
            </h1>
            <div className="flex space-x-3">
              {socialLinks.slice(0, 4).map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-paragraph hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-headline mb-3">Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
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
            <h3 className="text-sm sm:text-base font-semibold text-headline mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-paragraph">
              <li>{contactInfo.emails[0].address}</li>
              <li>{contactInfo.phones[0].number}</li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-headline mb-3">
              Location
            </h3>
            <p className="text-sm sm:text-base text-paragraph">
              {contactInfo.location.address}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-center items-center text-xs sm:text-sm text-paragraph">
            <p className="text-center md:text-left">© {new Date().getFullYear()} Rhyss. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0 md:ml-8">
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

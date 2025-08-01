"use client";

import React from "react";
import { motion } from "framer-motion";
import { contactInfo, socialLinks } from "../data/contacts";
import { CONTACT_CONTENT } from "../data/contactContent";
import AnimatedBackground from "./AnimatedBackground";

const ContactSection = () => {
  return (
    <section id="contact" className="bg-background min-h-screen py-16 px-4 flex justify-center relative overflow-hidden snap-start">
      <AnimatedBackground />

      <div className="relative max-w-7xl w-full rounded-2xl p-8 md:p-12 backdrop-blur-sm">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-6xl mx-auto px-4 pt-24 pb-16"
        >
          {/* Glass Effect Wrapper */}
          <div className="relative z-10 backdrop-blur-sm">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mb-16 relative"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-primary/60 uppercase tracking-wider text-sm mb-2 block"
              >
                Get in Touch
              </motion.span>
              <div className="flex flex-col gap-4 relative">
                <h1 className="text-5xl font-bold text-headline">
                  Contact Me
                </h1>
                <p className="text-paragraph/80 max-w-2xl text-lg">
                  Have a question or want to work together? Feel free to reach out
                  through any of the channels below.
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute -bottom-6 left-0 h-[1px] bg-gradient-to-r from-primary/50 to-transparent"
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Quick Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="backdrop-blur-md bg-background/30 p-6 rounded-2xl border border-primary/10 shadow-lg">
                  <h2 className="text-2xl font-semibold text-headline mb-6">
                    Quick Contact 
                  </h2>
                  <div className="space-y-6">
                    {/* Emails */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-headline">Email</h3>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 text-paragraph hover:text-primary transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <a
                          href={`mailto:${contactInfo.emails[0]?.address}`}
                          className="hover:underline"
                        >
                          {contactInfo.emails[0]?.address}
                        </a>
                      </motion.div>
                    </div>

                    {/* Phones */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-headline">Phone</h3>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 text-paragraph hover:text-primary transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <a
                          href={`tel:${contactInfo.phones[0]?.number.replace(/\s+/g, "")}`}
                          className="hover:underline"
                        >
                          {contactInfo.phones[0]?.number}
                        </a>
                      </motion.div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-headline">
                        Location
                      </h3>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 text-paragraph"
                      >
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{contactInfo.location.address}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="backdrop-blur-md bg-background/30 p-6 rounded-2xl border border-primary/10 shadow-lg"
                >
                  <h2 className="text-2xl font-semibold text-headline mb-6">
                    Connect With Me
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.slice(0, 4).map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.a
                          key={`social-${index}`}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-background/50 transition-colors"
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: social.color + "20" }}
                          >
                            <IconComponent className="w-5 h-5" style={{ color: social.color }} />
                          </div>
                          <span className="text-paragraph">{social.label}</span>
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="h-full"
              >
                <div className="backdrop-blur-md bg-background/30 p-6 rounded-2xl border border-primary/10 shadow-lg h-full">
                  <h2 className="text-2xl font-semibold text-headline mb-6">
                    {CONTACT_CONTENT.formTitle}
                  </h2>
                  <form
                    action={`mailto:${contactInfo.emails[0]?.address}`}
                    method="post"
                    encType="text/plain"
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-paragraph mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 bg-background/50 border border-paragraph/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder={CONTACT_CONTENT.namePlaceholder}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-paragraph mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 bg-background/50 border border-paragraph/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder={CONTACT_CONTENT.emailPlaceholder}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-paragraph mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-2 bg-background/50 border border-paragraph/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder={CONTACT_CONTENT.subjectPlaceholder}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-paragraph mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-4 py-2 bg-background/50 border border-paragraph/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                        placeholder={CONTACT_CONTENT.messagePlaceholder}
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    >
                      {CONTACT_CONTENT.sendButton}
                    </motion.button>
                  </form>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-paragraph/60">
                      Or reach out directly at{' '}
                      <a
                        href={`mailto:${contactInfo.emails[0]?.address}`}
                        className="text-primary hover:underline"
                      >
                        {contactInfo.emails[0]?.address}
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
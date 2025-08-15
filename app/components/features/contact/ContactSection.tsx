"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Sparkles } from "lucide-react";
import { contactInfo, socialLinks } from "@/lib/data/contacts";
import { Badge } from "@/components/ui/shadcn/badge";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  return (
    <section
      id="contact"
      className="via-background/98 relative min-h-screen overflow-hidden bg-gradient-to-br from-background to-background/95"
    >
      {/* Unique Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-full opacity-30">
          <div className="absolute left-1/4 top-1/4 h-2 w-2 animate-pulse rounded-full bg-primary" />
          <div className="absolute right-1/3 top-1/3 h-1 w-1 animate-pulse rounded-full bg-secondary delay-1000" />
          <div className="delay-2000 absolute bottom-1/4 left-1/3 h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60" />
          <div className="delay-3000 absolute bottom-1/3 right-1/4 h-1 w-1 animate-pulse rounded-full bg-secondary/60" />
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute right-20 top-20 h-32 w-32 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 left-16 h-24 w-24 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 blur-xl"
          animate={{
            y: [0, 15, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Let's Connect
            </span>
          </motion.div>

          <h1 className="mb-6 text-6xl font-light tracking-tight text-foreground md:text-7xl">
            Get In
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl font-normal text-transparent md:text-6xl">
              Touch
            </span>
          </h1>

          <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
            Ready to bring your ideas to life? Let's start a conversation about
            your next project.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 lg:col-span-4"
          >
            {/* Quick Contact */}
            <div className="space-y-6">
              <h2 className="mb-8 text-2xl font-light text-foreground">
                Quick Contact
              </h2>

              {/* Contact Methods */}
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${contactInfo.emails[0]?.address}`}
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 rounded-2xl border border-transparent bg-muted/20 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Email</div>
                    <div className="font-medium text-foreground transition-colors group-hover:text-primary">
                      {contactInfo.emails[0]?.address}
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href={`tel:${contactInfo.phones[0]?.number.replace(/\s+/g, "")}`}
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 rounded-2xl border border-transparent bg-muted/20 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 transition-colors group-hover:bg-secondary/20">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Phone</div>
                    <div className="font-medium text-foreground transition-colors group-hover:text-secondary">
                      {contactInfo.phones[0]?.number}
                    </div>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 rounded-2xl bg-muted/20 p-4 transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">
                      Location
                    </div>
                    <div className="font-medium text-foreground">
                      {contactInfo.location.address}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
                <Badge className="border-green-500/30 bg-green-500/20 text-green-700">
                  Available
                </Badge>
              </div>
              <div className="text-muted-foreground mb-2 text-sm">
                Response Time
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Usually within 24 hours</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-light text-foreground">Connect</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.slice(0, 4).map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={`social-${index}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setHoveredSocial(index)}
                      onHoverEnd={() => setHoveredSocial(null)}
                      className="group relative rounded-xl border border-transparent bg-muted/20 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                          style={{
                            backgroundColor:
                              hoveredSocial === index
                                ? social.color + "20"
                                : "transparent",
                          }}
                        >
                          <IconComponent
                            className="h-4 w-4 transition-colors"
                            style={{
                              color:
                                hoveredSocial === index
                                  ? social.color
                                  : "currentColor",
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                          {social.label}
                        </span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-8"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

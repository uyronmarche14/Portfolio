"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Sparkles
} from "lucide-react";
import { contactInfo, socialLinks } from "@/lib/data/contacts";
import { Badge } from "@/components/ui/shadcn/badge";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-gradient-to-br from-background via-background/98 to-background/95 overflow-hidden"
    >
      {/* Unique Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse delay-2000" />
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-secondary/60 rounded-full animate-pulse delay-3000" />
        </div>
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-xl"
          animate={{
            y: [0, 15, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Let's Connect</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-light text-foreground mb-6 tracking-tight">
            Get In
            <span className="block text-5xl md:text-6xl font-normal bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's start a conversation about your next project.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Quick Contact */}
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-foreground mb-8">
                Quick Contact
              </h2>
              
              {/* Contact Methods */}
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${contactInfo.emails[0]?.address}`}
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-muted/20 hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {contactInfo.emails[0]?.address}
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href={`tel:${contactInfo.phones[0]?.number.replace(/\s+/g, "")}`}
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-muted/20 hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium text-foreground group-hover:text-secondary transition-colors">
                      {contactInfo.phones[0]?.number}
                    </div>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-muted/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
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
              className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                  Available
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-2">Response Time</div>
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="w-4 h-4" />
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
                      className="group relative p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-all duration-300 border border-transparent hover:border-primary/20"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                          style={{ 
                            backgroundColor: hoveredSocial === index ? social.color + '20' : 'transparent'
                          }}
                        >
                          <IconComponent
                            className="w-4 h-4 transition-colors"
                            style={{ 
                              color: hoveredSocial === index ? social.color : 'currentColor'
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
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

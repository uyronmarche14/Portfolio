"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { contactInfo, socialLinks } from "@/lib/data/contacts";
import { CONTACT_CONTENT } from "@/lib/data/contactContent";
import { Input } from "@/components/ui/shadcn/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shadcn/card";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="bg-background min-h-screen py-16 px-4 flex justify-center relative overflow-hidden snap-start"
    >
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
                <h1 className="text-5xl font-bold text-headline">Contact Me</h1>
                <p className="text-paragraph/80 max-w-2xl text-lg">
                  Have a question or want to work together? Feel free to reach
                  out through any of the channels below.
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
                <Card className="backdrop-blur-md bg-background/30 p-6 rounded-2xl border border-primary/10 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-headline mb-6">
                      Quick Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Emails */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-headline">
                          Email
                        </h3>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-3 text-paragraph hover:text-primary transition-colors"
                        >
                          <Mail className="w-5 h-5 text-primary" />
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
                        <h3 className="text-lg font-medium text-headline">
                          Phone
                        </h3>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-3 text-paragraph hover:text-primary transition-colors"
                        >
                          <Phone className="w-5 h-5 text-primary" />
                          <a
                            href={`tel:${contactInfo.phones[0]?.number.replace(
                              /\s+/g,
                              ""
                            )}`}
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
                          <MapPin className="w-5 h-5 text-primary" />
                          <span>{contactInfo.location.address}</span>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="backdrop-blur-md bg-background/30 p-6 rounded-2xl border border-primary/10 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-semibold text-headline mb-6">
                        Connect With Me
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                <IconComponent
                                  className="w-5 h-5"
                                  style={{ color: social.color }}
                                />
                              </div>
                              <span className="text-paragraph">
                                {social.label}
                              </span>
                            </motion.a>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="h-full"
              >
                <Card className="backdrop-blur-md bg-background/30 p-6 rounded-2xl border border-primary/10 shadow-lg h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-headline mb-6">
                      {CONTACT_CONTENT.formTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      action={`mailto:${contactInfo.emails[0]?.address}`}
                      method="post"
                      encType="text/plain"
                      className="space-y-4"
                    >
                      <div>
                        <Label
                          htmlFor="name"
                          className="block text-sm font-medium text-paragraph mb-2"
                        >
                          Name
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder={CONTACT_CONTENT.namePlaceholder}
                          className=""
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="email"
                          className="block text-sm font-medium text-paragraph mb-2"
                        >
                          Email
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder={CONTACT_CONTENT.emailPlaceholder}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="subject"
                          className="block text-sm font-medium text-paragraph mb-2"
                        >
                          Subject
                        </Label>
                        <Input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          placeholder={CONTACT_CONTENT.subjectPlaceholder}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="message"
                          className="block text-sm font-medium text-paragraph mb-2"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          placeholder={CONTACT_CONTENT.messagePlaceholder}
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        {CONTACT_CONTENT.sendButton}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-paragraph/60">
                        Or reach out directly at{" "}
                        <a
                          href={`mailto:${contactInfo.emails[0]?.address}`}
                          className="text-primary hover:underline"
                        >
                          {contactInfo.emails[0]?.address}
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

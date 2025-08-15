"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";

import { contactInfo } from "@/lib/data/contacts";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = "" }) => {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:${contactInfo.emails[0]?.address}?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Simulate form submission feedback
    setTimeout(() => {
      setFormState("sent");
      setTimeout(() => {
        setFormState("idle");
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1000);
  };

  return (
    <div
      className={`relative rounded-3xl border border-primary/10 bg-gradient-to-br from-background/80 to-background/60 p-8 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {/* Form Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-light text-foreground">
            Send a Message
          </h2>
        </div>
        <p className="text-muted-foreground">
          Tell me about your project and let's create something amazing
          together.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              className="h-12 rounded-xl border-muted/30 bg-background/50 focus:border-primary/50"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="h-12 rounded-xl border-muted/30 bg-background/50 focus:border-primary/50"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="What's this about?"
            className="h-12 rounded-xl border-muted/30 bg-background/50 focus:border-primary/50"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            required
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell me about your project, timeline, and any specific requirements..."
            className="resize-none rounded-xl border-muted/30 bg-background/50 focus:border-primary/50"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <AnimatePresence mode="wait">
            {formState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  type="submit"
                  className="group h-12 rounded-xl bg-gradient-to-r from-primary to-secondary px-8 font-medium shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-secondary/90 hover:shadow-xl"
                >
                  <span>Send Message</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            )}

            {formState === "sending" && (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  disabled
                  className="h-12 rounded-xl bg-primary/50 px-8 font-medium"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Send className="mr-2 h-4 w-4" />
                  </motion.div>
                  Sending...
                </Button>
              </motion.div>
            )}

            {formState === "sent" && (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  disabled
                  className="h-12 rounded-xl bg-green-500 px-8 font-medium hover:bg-green-500"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Message Sent!
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </form>

      {/* Alternative Contact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 border-t border-muted/20 pt-6 text-center"
      >
        <p className="text-muted-foreground text-sm">
          Prefer email? Reach out directly at{" "}
          <a
            href={`mailto:${contactInfo.emails[0]?.address}`}
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            {contactInfo.emails[0]?.address}
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default ContactForm;

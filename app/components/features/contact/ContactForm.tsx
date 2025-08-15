"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  MessageCircle, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { contactInfo } from "@/lib/data/contacts";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = "" }) => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
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
      setFormState('sent');
      setTimeout(() => {
        setFormState('idle');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1000);
  };

  return (
    <div className={`relative p-8 rounded-3xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-primary/10 shadow-2xl ${className}`}>
      {/* Form Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-light text-foreground">
            Send a Message
          </h2>
        </div>
        <p className="text-muted-foreground">
          Tell me about your project and let's create something amazing together.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
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
              className="h-12 rounded-xl border-muted/30 focus:border-primary/50 bg-background/50"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
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
              className="h-12 rounded-xl border-muted/30 focus:border-primary/50 bg-background/50"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
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
            className="h-12 rounded-xl border-muted/30 focus:border-primary/50 bg-background/50"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
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
            className="rounded-xl border-muted/30 focus:border-primary/50 bg-background/50 resize-none"
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
            {formState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  type="submit"
                  className="group h-12 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}

            {formState === 'sending' && (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  disabled
                  className="h-12 px-8 bg-primary/50 rounded-xl font-medium"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                  </motion.div>
                  Sending...
                </Button>
              </motion.div>
            )}

            {formState === 'sent' && (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  disabled
                  className="h-12 px-8 bg-green-500 hover:bg-green-500 rounded-xl font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
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
        className="mt-8 pt-6 border-t border-muted/20 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Prefer email? Reach out directly at{" "}
          <a
            href={`mailto:${contactInfo.emails[0]?.address}`}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {contactInfo.emails[0]?.address}
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default ContactForm;
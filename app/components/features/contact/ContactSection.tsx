'use client';

import Header from "@/components/ui/header";
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import { initializeEmailJS, sendEmail } from '@/lib/services/email';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Mail, MessageCircle, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // 3D Perspective Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseXFromCenter = e.clientX - rect.left - width / 2;
      const mouseYFromCenter = e.clientY - rect.top - height / 2;
      const xPct = mouseXFromCenter / width;
      const yPct = mouseYFromCenter / height;
      x.set(xPct);
      y.set(yPct);
  };

  const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
  };

  // Initialize EmailJS on component mount
  useEffect(() => {
    initializeEmailJS();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailParams = {
        from_email: email,
        to_email: 'uyronmarcherhyssq@gmail.com',
        message: `New client inquiry from portfolio: ${email}`,
        reply_to: email,
        subject: 'New Client Inquiry - Portfolio',
      };

      await sendEmail(emailParams);
      
      // Success state
      setMessage('Thank you! I\'ll get back to you within 24 hours.');
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setMessage('Failed to send message. Please try again or contact me directly.');
      
      // Clear error message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <section className="min-h-screen w-full relative overflow-hidden perspective-1000 py-4 sm:py-6 md:my-6 lg:my-8">
      {/* Main CTA container */}
      <div className="w-full h-full flex items-center justify-center px-3 sm:px-4">
        <motion.div 
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] flex flex-col items-center justify-center bg-gradient-to-br from-primary/90 via-secondary/90 to-accent/90 backdrop-blur-xl transition-transform duration-200 ease-out rounded-2xl sm:rounded-3xl shadow-xl border-b-4 border-t-2 border-border/50 py-8 sm:py-12"
        >
          {/* Header - Hidden on mobile to save space */}
          <div className="mb-6 sm:mb-8 md:mb-12 hidden sm:block">
             <Header
               introText='Ready to'
               highlightText='Build Something Amazing?'
               description='Let&apos;s transform your vision into a high-performance web application'
             />
          </div>

          {/* CTA Content */}
          <div className="w-full max-w-6xl text-start px-3 sm:px-4">
            <div className="space-y-4 sm:space-y-6 md:space-y-8 py-6 sm:py-8 md:py-10 transform translate-z-20 border border-border/50 bg-background/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl px-4 sm:px-6 md:px-8">
              {/* Badge Label */}
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary">
                <span>Get In Touch</span>
              </div>

              {/* Main CTA Heading - Responsive sizing */}
              <Heading as="h2" className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Let's Create Something <br className="hidden sm:block"/><span className="text-primary">Extraordinary</span>
              </Heading>

              {/* CTA Description - Smaller on mobile */}
              <Text variant="large" className="text-muted-foreground max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed">
                I specialize in creating high-performance web applications that drive business results. 
                Whether you need a complete web solution, UI/UX improvements, or technical consultation, 
                I&apos;m here to help bring your vision to life.
              </Text>

              {/* Email form - Responsive */}
              <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md sm:max-w-xl">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background/50 border-input text-foreground placeholder:text-muted-foreground focus:bg-background/80 focus:border-primary transition-all duration-300 h-11 sm:h-12 text-sm rounded-xl px-4"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !email} 
                    className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-5 sm:px-6 h-11 sm:h-12 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Start Your Project</span>
                        <span className="sm:hidden">Start Project</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                </form>
                {message && (
                  <p className={`text-sm sm:text-base font-medium ${message.includes('Thank you') ? 'text-green-500' : 'text-destructive'}`}>
                    {message}
                  </p>
                )}
              </div>

              {/* Contact alternatives - Responsive grid */}
              <div className="pt-4 sm:pt-6 space-y-2 sm:space-y-3">
                <Text variant="small" className="text-muted-foreground font-medium text-xs sm:text-sm">
                  Prefer to reach out directly? I typically respond within 24 hours.
                </Text>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
                  <a href="mailto:ronbusinessemail4@gmail.com" className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">Email</span>
                  </a>
                  <a href="tel:+639605875124" className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">Call</span>
                  </a>
                  <a href="https://www.linkedin.com/in/ron-marche-rhyss-uy-578b80240/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
                    <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    LinkedIn
                  </a>
                  <a href="https://calendly.com/your-calendar-link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    Book
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
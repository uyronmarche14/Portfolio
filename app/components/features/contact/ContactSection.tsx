'use client';

import React, { useState } from 'react';
import { Facebook, Mail, Phone } from 'lucide-react';
import Header from "@/components/ui/header"
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { Badge } from '@/components/ui/shadcn/badge';

const CallToActionSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Email submitted:', email);
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Background gradient effects */}
   
      <Header
              introText='Get in'
              highlightText='Touch'
              description='Let&apos;s create something together'
            />

      {/* Main CTA container */}
      <div className="max-w-6xl w-full relative z-10 px-2 sm:px-4 pb-8 sm:pb-12 md:pb-16 pt-12 sm:pt-16 md:pt-24">
        <div className="relative bg-gradient-to-br from-primary/90 via-secondary/90 to-accent/90 backdrop-blur-xl rounded-3xl py-8 md:py-12 lg:py-16 shadow-2xl border border-border/50 max-w-7xl w-full hover:scale-105">

          {/* Floating badges */}
          <div className="absolute -top-4 right-16 md:right-20 animate-pulse">
            <Badge className="bg-accent text-accent-foreground hover:bg-accent/80 border-border shadow-lg">Building Your Brand</Badge>
          </div>
          <div className="absolute -bottom-4 left-32 md:left-40 animate-bounce">
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border shadow-lg">Vision</Badge>
          </div>
          <div className="absolute bottom-1/4 -right-4 md:-right-8 animate-bounce delay-500">
            <Badge className="bg-muted text-muted-foreground hover:bg-muted/80 border-border shadow-lg">Excellence</Badge>
          </div>
          <div className="absolute -top-1 left-1/4 -translate-y-1/2 animate-pulse delay-700">
            <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/80 border-border shadow-lg">Creative</Badge>
          </div>

          

          {/* CTA Content */}
          <div className="w-full max-w-7xl text-start space-y-6 md:space-y-8 px-6 md:px-8">

            

            {/* Main CTA Heading */}
            <div className="space-y-2 md:space-y-4">
              <h2 className="font-rawkner text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">Let&apos;s Create Something</h2>
              <h3 className="font-rawkner text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-muted-foreground">Remarkable <span className="text-secondary-foreground">Together</span></h3>
            </div>

            {/* CTA Description */}
            <p className="text-sm md:text-lg lg:text-xl text-muted-foreground leading-relaxed">Let&apos;s turn your ideas into a brand that connects and converts. Our expert team is ready to craft a unique identity that reflects your vision and drives results.</p>

            {/* Email form */}
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/20 border-border/50 text-foreground placeholder:text-muted-foreground focus:bg-background/30 focus:border-border/80 transition-all duration-300 h-12 rounded-xl"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting || !email} className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-3 h-12 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                  {isSubmitting ? (
                    <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />Sending...</div>
                  ) : ('Send Here Your Email')}
                </Button>
              </form>
            </div>

            {/* Trust text */}
            <div className="pt-6">
              <p className="text-sm text-gray-100">Let&apos;s create the brand that stands out. Contact me today to discuss your project.</p>
            </div>

            {/* Contact links */}
            <div className="flex flex-wrap gap-2 justify-start">
              <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-background/20 rounded-xl hover:bg-background/30 transition-all duration-300"><Facebook className="w-5 h-5" /><span>Facebook</span></a>
              <a href="mailto:your@email.com" className="flex items-center gap-2 px-4 py-2 bg-background/20 rounded-xl hover:bg-background/30 transition-all duration-300"><Mail className="w-5 h-5" /><span>Email</span></a>
              <a href="tel:+1234567890" className="flex items-center gap-2 px-4 py-2 bg-background/20 rounded-xl hover:bg-background/30 transition-all duration-300"><Phone className="w-5 h-5" /><span>Call Us</span></a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
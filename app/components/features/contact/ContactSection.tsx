'use client';

import Header from "@/components/ui/header";
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import { contactInfo, socialLinks as profileSocialLinks } from "@/lib/data/contacts";
import { initializeEmailJS, sendEmail } from '@/lib/services/email';
import { motion } from "framer-motion";
import { ArrowRight, Github, Mail, MessageCircle, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ContactSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const primaryEmail = contactInfo.emails[0]?.address || 'uyronmarcherhyssq@gmail.com';
  const primaryPhone = contactInfo.phones[0]?.number || '';
  const phoneHref = primaryPhone.replace(/[^\d+]/g, '');
  const linkedInUrl =
    profileSocialLinks.find((link) => link.label === 'LinkedIn')?.href ||
    'https://www.linkedin.com/in/ron-marche-rhyss-uy-578b80240/';
  const githubUrl =
    profileSocialLinks.find((link) => link.label === 'GitHub')?.href ||
    'https://github.com/uyronmarche14';

  useEffect(() => {
    initializeEmailJS();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailParams = {
        from_email: email,
        to_email: primaryEmail,
        message: `New client inquiry from portfolio: ${email}`,
        reply_to: email,
        subject: 'New Client Inquiry - Portfolio',
      };

      await sendEmail(emailParams);
      setMessage('Thank you! I\'ll get back to you within 24 hours.');
      setEmail('');
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setMessage('Failed to send message. Please try again or contact me directly.');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <section className="min-h-screen w-full relative overflow-hidden py-4 sm:py-6 md:my-6 lg:my-8">
      <div className="w-full h-full flex items-center justify-center px-3 sm:px-4">
        {/* Outer container — solid vivid primary background */}
        <div className="relative w-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] flex flex-col items-center justify-center bg-primary border-2 border-foreground shadow-brutal-lg py-8 sm:py-12">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8 md:mb-12 hidden sm:block w-full flex flex-col items-center">
            {/* Custom Header for high contrast on primary background */}
            <div className="w-full flex flex-col items-center">
              <div className="w-16 h-1 bg-background mb-6" />
              <h2 className="text-xl sm:text-2xl md:text-5xl font-bold leading-tight text-center mb-4"> 
                <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-foreground/80 block mb-2 font-bold">
                  Ready to
                </span>
                <span className="font-rawkner text-background"> 
                  Build Something Amazing?
                </span> 
              </h2>
              <p className="text-foreground/90 mx-auto max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4 text-center font-bold">
                Let&apos;s transform your vision into a high-performance web application
              </p>
            </div>
          </div>

          {/* Inner Card — solid background */}
          <div className="w-full max-w-6xl text-start px-3 sm:px-4">
            <div className="space-y-4 sm:space-y-6 md:space-y-8 py-6 sm:py-8 md:py-10 border-2 border-foreground bg-background shadow-brutal-lg px-4 sm:px-6 md:px-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-3 py-1 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-background shadow-brutal-sm">
                <span>Get In Touch</span>
              </div>

              {/* Main Heading */}
              <Heading as="h2" className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.4] sm:leading-[1.3] pb-2">
                Let&apos;s Create Something <br className="hidden sm:block"/>
                <span className="bg-primary text-background px-3 py-2 inline-block mt-4 sm:mt-6 border-2 border-foreground shadow-brutal-sm leading-none">Extraordinary</span>
              </Heading>

              {/* Description */}
              <Text variant="large" className="text-foreground/80 max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed mt-4 sm:mt-6">
                I specialize in creating high-performance web applications that drive business results. 
                Whether you need a complete web solution, UI/UX improvements, or technical consultation, 
                I&apos;m here to help bring your vision to life.
              </Text>

              {/* Email form */}
              <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md sm:max-w-xl">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="your.email@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background border-2 border-foreground text-foreground placeholder:text-foreground/30 focus:border-primary transition-all duration-150 h-11 sm:h-12 text-sm px-4 font-mono"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !email} 
                    className="bg-foreground text-background border-2 border-foreground px-5 sm:px-6 h-11 sm:h-12 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin" />
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
                  <p className={`font-mono text-sm sm:text-base font-bold uppercase tracking-wider ${message.includes('Thank you') ? 'text-green-600' : 'text-destructive'}`}>
                    {message}
                  </p>
                )}
              </div>

              {/* Contact alternatives */}
              <div className="pt-4 sm:pt-6 space-y-2 sm:space-y-3">
                <Text variant="small" className="text-foreground/50 font-mono text-xs font-bold uppercase tracking-wider">
                  Prefer to reach out directly? I typically respond within 24 hours.
                </Text>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
                  <a href={`mailto:${primaryEmail}`} className="flex items-center gap-1.5 sm:gap-2 text-foreground/80 hover:text-primary transition-colors duration-150 font-mono font-bold uppercase tracking-wider">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">Email</span>
                  </a>
                  <a href={`tel:${phoneHref}`} className="flex items-center gap-1.5 sm:gap-2 text-foreground/80 hover:text-primary transition-colors duration-150 font-mono font-bold uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">Call</span>
                  </a>
                  <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 sm:gap-2 text-foreground/80 hover:text-primary transition-colors duration-150 font-mono font-bold uppercase tracking-wider">
                    <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    LinkedIn
                  </a>
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 sm:gap-2 text-foreground/80 hover:text-primary transition-colors duration-150 font-mono font-bold uppercase tracking-wider">
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

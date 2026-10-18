'use client';

import HeaderTitle from "@/components/ui/header";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { contactInfo, socialLinks as profileSocialLinks } from "@/lib/data/contacts";
import { initializeEmailJS, sendEmail } from '@/lib/services/email';
import { ArrowRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
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
    <section id="contact" className="relative w-full overflow-hidden py-12 md:py-16">
      <div className="mx-auto mb-10 max-w-6xl px-4 sm:px-6 md:mb-12 lg:px-4">
        <HeaderTitle
          index="07"
          introText="Contact"
          highlightText="Ready to Build Something Amazing?"
          description="Let's transform your vision into a high-performance web application"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-4">
        <div className="overflow-hidden rounded-2xl border border-primary/25 bg-primary/[0.08]">
          <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14 lg:p-14">
            <div className="flex flex-col justify-center">
              <Badge variant="accent" dot className="w-fit">Get In Touch</Badge>
              <h3 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
                Let&apos;s Create Something{" "}
                <span className="marker !bg-[length:100%_46%] text-foreground">Extraordinary</span>
              </h3>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75">
                I specialize in creating high-performance web applications that drive business results.
                Whether you need a complete web solution, UI/UX improvements, or technical consultation,
                I&apos;m here to help bring your vision to life.
              </p>
              <p className="mt-6 text-sm text-foreground/60">
                Prefer to reach out directly? I typically respond within 24 hours.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${primaryEmail}`}><Mail className="h-4 w-4" />Email</a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={`tel:${phoneHref}`}><Phone className="h-4 w-4" />Call</a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" />LinkedIn</a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4" />GitHub</a>
                </Button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center gap-4 rounded-xl border border-foreground/15 bg-card p-6 sm:p-8"
            >
              <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                  Your email
                </label>
                <p className="mt-1 text-sm text-foreground/60">
                  Tell me where to reach you and I&apos;ll start from there.
                </p>
              </div>
              <Input
                id="contact-email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 text-sm"
              />
              <Button type="submit" size="lg" disabled={isSubmitting || !email}>
                {isSubmitting ? "Sending..." : "Start Your Project"}
                {!isSubmitting && <ArrowRight size={16} />}
              </Button>
              {message && (
                <p role="status" className={`text-sm ${message.includes('Thank you') ? 'text-primary' : 'text-destructive'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

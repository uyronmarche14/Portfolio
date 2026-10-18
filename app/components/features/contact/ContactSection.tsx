'use client';

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { contactInfo, socialLinks as profileSocialLinks } from "@/lib/data/contacts";
import { initializeEmailJS, sendEmail } from '@/lib/services/email';
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
    <section id="contact" className="relative w-full overflow-hidden py-10 md:py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          title="Contact"
          subtitle="Have a project, a role or just a question? Leave your email and I'll reply."
        />

        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Let&apos;s build something together.
            </h3>
            <p className="max-w-md text-base leading-relaxed text-secondary">
              I build web apps end to end: interface, API and data. Tell me what you need and I&apos;ll get back to you, usually within 24 hours.
            </p>
          </div>

          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-3">
              <label htmlFor="contact-email" className="font-mono text-xs text-secondary">
                Your email
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 flex-1 text-sm"
                />
                <Button type="submit" size="lg" disabled={isSubmitting || !email}>
                  {isSubmitting ? "Sending..." : "Send"}
                  {!isSubmitting && <ArrowRight size={16} />}
                </Button>
              </div>
              {message && (
                <p role="status" className={`text-sm ${message.includes('Thank you') ? 'text-primary' : 'text-destructive'}`}>
                  {message}
                </p>
              )}
            </form>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href={`mailto:${primaryEmail}`}><Mail className="h-4 w-4" />Email</a>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${phoneHref}`}><Phone className="h-4 w-4" />Call</a>
              </Button>
              <Button asChild variant="outline">
                <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />LinkedIn</a>
              </Button>
              <Button asChild variant="outline">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4" />GitHub</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

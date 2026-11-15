'use client';

import { Check, Copy } from "lucide-react";
import React, { useEffect, useState } from 'react';

import HeaderTitle from "@/components/ui/header";
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { Textarea } from '@/components/ui/shadcn/textarea';
import { contactInfo, socialLinks as profileSocialLinks } from "@/lib/data/contacts";
import { initializeEmailJS, sendEmail } from '@/lib/services/email';

const TOPICS = ["Job opportunity", "Project or collaboration", "Question about my work", "Something else"] as const;

const fieldClass =
  "h-12 w-full rounded-md border border-foreground/20 bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-ring";

type Status = 'idle' | 'sending' | 'sent' | 'error';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>(TOPICS[0]);
  const [body, setBody] = useState('');
  const [trap, setTrap] = useState(''); // honeypot: real visitors never fill this
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(primaryEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${primaryEmail}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) return; // bot
    setStatus('sending');
    try {
      await sendEmail({
        from_name: name.trim(),
        from_email: email.trim(),
        to_email: primaryEmail,
        reply_to: email.trim(),
        subject: `Portfolio: ${topic}`,
        message: body.trim(),
      });
      setStatus('sent');
      setName('');
      setEmail('');
      setBody('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden py-12 md:py-16">
      <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 md:mb-12 lg:px-8">
        <HeaderTitle
          index="08"
          introText="Contact"
          highlightText="Get in touch"
          description="For a role, a project, or a question about my work."
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-primary/25 bg-primary/[0.06]">
          <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:p-14">
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
                Let&apos;s talk
              </h3>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/75">
                Send a message here, or use any of the channels below.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-foreground/15 py-4">
                <a href={`mailto:${primaryEmail}`} className="break-all font-mono text-sm text-foreground underline underline-offset-4 hover:text-primary">
                  {primaryEmail}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md border border-foreground/20 px-3 font-mono text-xs uppercase tracking-wider text-foreground outline-none hover:border-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                  {copied ? "Copied" : "Copy email"}
                </button>
                <span role="status" className="sr-only">{copied ? "Email address copied to clipboard" : ""}</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                </Button>
                {phoneHref && (
                  <Button asChild variant="outline" size="sm">
                    <a href={`tel:${phoneHref}`}>Call</a>
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-foreground/15 bg-card p-6 sm:p-8">
              {status === 'sent' ? (
                <div role="status" className="space-y-3 py-6 text-center">
                  <h4 className="font-display text-2xl text-foreground">Message sent</h4>
                  <p className="text-sm text-foreground/70">Thank you! Your message was sent.</p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="text-sm text-primary underline underline-offset-4"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-name" className="text-sm font-medium text-foreground">Name</label>
                      <Input id="contact-name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="h-12 text-sm" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-sm font-medium text-foreground">Email</label>
                      <Input id="contact-email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="h-12 text-sm" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-topic" className="text-sm font-medium text-foreground">What is this about?</label>
                    <select id="contact-topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value as (typeof TOPICS)[number])} className={fieldClass}>
                      {TOPICS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className="text-sm font-medium text-foreground">Message</label>
                    <Textarea id="contact-message" name="message" required minLength={10} rows={5} value={body} onChange={(e) => setBody(e.target.value)} placeholder="A few lines about what you have in mind" className="text-sm" />
                  </div>

                  {/* Honeypot: hidden from people and assistive tech, bots tend to fill it */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="contact-website">Website</label>
                    <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                  </div>

                  <Button type="submit" variant="accent" size="lg" disabled={status === 'sending'} className="h-12">
                    {status === 'sending' ? "Sending..." : "Send message"}
                  </Button>
                  {status === 'error' && (
                    <p role="status" className="text-sm text-destructive">
                      Failed to send message. Please try again or email me directly.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

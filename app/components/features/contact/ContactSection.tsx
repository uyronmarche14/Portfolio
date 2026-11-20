'use client';

import { ArrowRight, ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from 'react';

import HeaderTitle from "@/components/ui/header";
import { contactInfo, socialLinks as profileSocialLinks } from "@/lib/data/contacts";
import { initializeEmailJS, sendEmail } from '@/lib/services/email';

const TOPICS = ["Job opportunity", "Project or collaboration", "Question about my work", "Something else"] as const;

const BG = "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766945618/photo_49_2025-12-29_02-02-12_srh1kr.jpg";

const Row = ({ label, icon: Icon, children }: { label: string; icon: LucideIcon; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 py-2 text-sm">
    <dt className="shrink-0" title={label}>
      <Icon aria-hidden="true" className="h-4 w-4 text-white/70" />
      <span className="sr-only">{label}</span>
    </dt>
    <dd className="flex min-w-0 flex-1 items-center gap-3">{children}</dd>
  </div>
);

const Out = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
    {children}
    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-white/60" />
  </a>
);

const LINE =
  "w-full border-0 border-b border-white/25 bg-transparent px-0 py-2 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-primary";

const Field = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-wider text-white/50">{label}</label>
    {children}
  </div>
);

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
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10">
          {/* the picture: heavily blurred, warmed with orange, darkened so the text stays readable */}
          <Image
            src={BG}
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={40}
            className="-z-30 scale-125 object-cover blur-2xl"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#120a0b]/70" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/45 via-primary/10 to-transparent mix-blend-soft-light" />
          <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />

          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14 lg:p-14">
            <div className="flex flex-col justify-center text-white">
              <p className="font-mono text-xs uppercase tracking-wider text-white/60">Ron Marche Rhyss Uy</p>

              <h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">Let&apos;s talk</h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-white/55">Open to messages about</p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Good reasons to write">
                {TOPICS.map((t) => (
                  <li key={t} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85">{t}</li>
                ))}
              </ul>

                            <dl className="mt-8 divide-y divide-white/10">
                <Row label="Email" icon={Mail}>
                  <a href={`mailto:${primaryEmail}`} className="break-all underline-offset-4 hover:underline">{primaryEmail}</a>
                  <button type="button" onClick={copyEmail} aria-label="Copy email address" className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-0.5 font-mono text-[11px] text-white/85 outline-none transition-colors hover:border-white/60 focus-visible:ring-2 focus-visible:ring-white/70">
                    {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <span role="status" className="sr-only">{copied ? "Email address copied to clipboard" : ""}</span>
                </Row>
                <Row label="LinkedIn" icon={Linkedin}><Out href={linkedInUrl}>Ron Marche Rhyss Uy</Out></Row>
                <Row label="GitHub" icon={Github}><Out href={githubUrl}>uyronmarche14</Out></Row>
                <Row label="Resume" icon={FileText}><Out href="/resume.pdf">Download PDF</Out></Row>
                {phoneHref && <Row label="Phone" icon={Phone}><a href={`tel:${phoneHref}`} className="underline-offset-4 hover:underline">{primaryPhone}</a></Row>}
                <Row label="Based in" icon={MapPin}><span className="text-white/80">{contactInfo.location.address}</span></Row>
              </dl>
            </div>

            <div className="flex flex-col justify-center rounded-3xl border border-white/15 bg-white/[0.07] p-6 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] backdrop-blur-2xl sm:p-8">
              {status === 'sent' ? (
                <div role="status" className="space-y-4 py-10 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check aria-hidden="true" className="h-6 w-6" /></span>
                  <h4 className="font-display text-2xl">Message sent</h4>
                  <p className="text-sm text-white/70">Thank you, I will reply by email.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="font-mono text-xs uppercase tracking-wider text-white/80 underline underline-offset-4 hover:text-white">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-white/50">Send a message</p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="contact-name" label="Name">
                      <input id="contact-name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={LINE} />
                    </Field>
                    <Field id="contact-email" label="Email">
                      <input id="contact-email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={LINE} />
                    </Field>
                  </div>

                  <fieldset>
                    <legend className="font-mono text-[11px] uppercase tracking-wider text-white/50">About</legend>
                    <div role="radiogroup" className="mt-3 flex flex-wrap gap-2">
                      {TOPICS.map((option) => {
                        const on = topic === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => setTopic(option)}
                            className={`rounded-full border px-3.5 py-1.5 text-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/70 ${on ? "border-primary bg-primary text-primary-foreground" : "border-white/20 text-white/75 hover:border-white/50 hover:text-white"}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <Field id="contact-message" label="Message">
                    <textarea id="contact-message" name="message" required minLength={10} rows={4} value={body} onChange={(e) => setBody(e.target.value)} placeholder="A few lines about what you have in mind" className={`${LINE} resize-none`} />
                  </Field>

                  {/* Honeypot: hidden from people and assistive tech, bots tend to fill it */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="contact-website">Website</label>
                    <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 text-sm font-medium text-primary-foreground outline-none transition-[filter,transform] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white/80 disabled:opacity-60"
                  >
                    {status === 'sending' ? "Sending..." : "Send message"}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  {status === 'error' && (
                    <p role="status" className="text-sm text-red-300">
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

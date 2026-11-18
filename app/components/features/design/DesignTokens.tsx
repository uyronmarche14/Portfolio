"use client";

import { useEffect, useState } from "react";

import { BackLink } from "@/components/layout/BackLink";
import { DocsLayout } from "@/components/layout/DocsLayout";
import Footer from "@/components/layout/footer";

const GROUPS: { title: string; note: string; tokens: string[] }[] = [
  { title: "Surface", note: "Page, card and line colors.", tokens: ["background", "card", "popover", "foreground", "border", "muted", "secondary"] },
  { title: "Brand and accent", note: "Primary drives links, focus and highlights. Project pages can override it.", tokens: ["primary", "accent", "tertiary", "ring"] },
  { title: "Tones", note: "Four supporting hues used for categories and charts.", tokens: ["tone-violet", "tone-teal", "tone-amber", "tone-rose"] },
  { title: "State", note: "Reserved for errors.", tokens: ["destructive"] },
];

const TYPE = [
  { name: "Display", cls: "font-display text-5xl", sample: "Business analysis" },
  { name: "Heading", cls: "font-sans text-3xl font-semibold tracking-tight", sample: "Requirements to release" },
  { name: "Body", cls: "font-sans text-base", sample: "Clear rules, testable behavior, one definition per metric." },
  { name: "Mono label", cls: "font-mono text-xs", sample: "KPI / grain / date basis" },
];

const PROCESS = [
  { step: "Discover", text: "Interview stakeholders, read the live workflow, list the roles and the questions the screen must answer." },
  { step: "Define", text: "Write the requirement, the business rule and the check for each behavior, and name each KPI's grain and date basis." },
  { step: "Sketch", text: "Wireframe the screen around the decision it supports, with empty, missing-data and error states drawn up front." },
  { step: "Build", text: "Implement against the same definitions, with the same tokens and components on every page." },
  { step: "Verify", text: "Compare cards, charts and tables for the same filter, then check the rules by hand and with tests." },
];

function useTokenValues(names: string[]) {
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const read = () => {
      const style = getComputedStyle(document.documentElement);
      setValues(Object.fromEntries(names.map((n) => [n, style.getPropertyValue(`--${n}`).trim()])));
    };
    read();
    // re-read whenever the theme class on <html> changes
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
    return () => observer.disconnect();
  }, [names]);
  return values;
}

const ALL = GROUPS.flatMap((g) => g.tokens);

/** Design tokens read live from the site's CSS variables, so this page cannot drift from the real theme. */
export default function DesignTokens() {
  const values = useTokenValues(ALL);

  return (
    <>
      <DocsLayout
        sidebar={
          <>
            <BackLink href="/">Back to home</BackLink>
            <p className="mt-8 font-mono text-xs text-foreground/50">Design</p>
            <ul className="mt-3 space-y-0.5">
              {["Process", "Color", "Type", "Shape"].map((t) => (
                <li key={t}>
                  <a href={`#${t.toLowerCase()}`} className="block rounded-md px-3 py-1.5 text-sm text-foreground/60 transition-colors hover:text-foreground">{t}</a>
                </li>
              ))}
            </ul>
          </>
        }
      >
        <header>
          <p className="font-mono text-xs text-primary">Design</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">How this site is designed</h1>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-foreground/70">
            The tokens below are read live from the site&apos;s CSS variables. Switch the theme and they update, so this page cannot drift from what the site really uses.
          </p>
        </header>

        <section id="process" className="scroll-mt-28 pt-12">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">Design process</h2>
          <ol className="mt-5 divide-y divide-foreground/10 border-y border-foreground/10">
            {PROCESS.map((p, i) => (
              <li key={p.step} className="grid gap-2 py-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
                <span className="font-mono text-xs text-foreground/60"><span className="text-primary">{String(i + 1).padStart(2, "0")}</span> / {p.step}</span>
                <span className="text-[15px] leading-relaxed text-foreground/80">{p.text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="color" className="scroll-mt-28 pt-12">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">Color</h2>
          {GROUPS.map((g) => (
            <div key={g.title} className="mt-6">
              <h3 className="font-mono text-xs text-primary">{g.title}</h3>
              <p className="mt-1 text-sm text-foreground/60">{g.note}</p>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {g.tokens.map((t) => (
                  <li key={t} className="overflow-hidden rounded-xl border border-foreground/15 bg-card">
                    <span aria-hidden="true" className="block h-14 border-b border-foreground/15" style={{ background: `rgb(var(--${t}))` }} />
                    <span className="block px-3 py-2">
                      <span className="block font-mono text-xs text-foreground">--{t}</span>
                      <span className="block font-mono text-[11px] text-foreground/55">{values[t] ? `rgb(${values[t]})` : "reading..."}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section id="type" className="scroll-mt-28 pt-12">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">Type</h2>
          <div className="mt-5 divide-y divide-foreground/10 border-y border-foreground/10">
            {TYPE.map((t) => (
              <div key={t.name} className="grid gap-2 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-baseline">
                <span className="font-mono text-xs text-foreground/60">{t.name}</span>
                <span className={`${t.cls} text-foreground`}>{t.sample}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="shape" className="scroll-mt-28 pt-12">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">Shape and depth</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Radius sm", cls: "rounded-md" },
              { label: "Radius lg", cls: "rounded-lg" },
              { label: "Card", cls: "rounded-2xl shadow-soft" },
            ].map((s) => (
              <div key={s.label} className={`${s.cls} border border-foreground/15 bg-card px-4 py-6 font-mono text-xs text-foreground/70`}>{s.label}</div>
            ))}
          </div>
        </section>
      </DocsLayout>
      <Footer />
    </>
  );
}

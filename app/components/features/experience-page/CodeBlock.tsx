"use client";

import { useState } from "react";

import { Button } from "@/components/ui/shadcn/button";

interface CodeBlockProps {
  label: string;
  code: string;
}

/** Read-only code block with a copy button. */
export function CodeBlock({ label, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-foreground/15 bg-foreground/[0.03]">
      <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-2">
        <span className="font-mono text-xs text-foreground/60">{label}</span>
        <Button variant="ghost" size="sm" onClick={copy} className="h-7 px-2 text-xs">
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground/85">
        <code>{code}</code>
      </pre>
    </div>
  );
}

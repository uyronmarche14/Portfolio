import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface BackLinkProps {
  href: string;
  children: string;
  className?: string;
}

/** Pill-shaped back button with an arrow that nudges left on hover. */
export function BackLink({ href, children, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card py-1.5 pl-2 pr-3.5 text-sm font-medium text-foreground/80 shadow-soft-sm transition-all duration-200 hover:border-foreground/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
        className
      )}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/[0.07] transition-colors group-hover:bg-primary/15 group-hover:text-primary">
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
      </span>
      {children}
    </Link>
  );
}

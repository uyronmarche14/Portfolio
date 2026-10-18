import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ index, title, subtitle, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-10 md:mb-14", className)}>
      <p className="font-mono text-xs font-medium text-primary">{index} / {title}</p>
      <h2 className="mt-3 font-display text-4xl font-semibold text-foreground md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-lg text-secondary">{subtitle}</p>}
    </header>
  );
}

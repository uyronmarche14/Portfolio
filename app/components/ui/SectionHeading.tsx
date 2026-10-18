import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ index, title, subtitle, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-10 text-center md:mb-12", className)}>
      <p className="font-mono text-xs font-medium text-primary">{index} / {title}</p>
      <h2 className="mt-4 font-display text-4xl font-semibold text-foreground md:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-secondary">{subtitle}</p>}
    </header>
  );
}

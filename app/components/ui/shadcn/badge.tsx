import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Tag-style badge: small rounded rectangle, tonal fill and an inset hairline ring
 * (no real border, so sizes stay crisp). `dot` adds a leading status dot.
 */
const badgeVariants = cva(
  "inline-flex h-6 items-center gap-1.5 rounded-md px-2 text-xs font-medium leading-none ring-1 ring-inset transition-colors duration-200 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "bg-foreground/[0.06] text-foreground/80 ring-foreground/10 hover:bg-foreground/10 hover:text-foreground",
        accent:
          "bg-primary/10 text-primary ring-primary/25 hover:bg-primary/15",
        outline:
          "bg-transparent text-foreground/80 ring-foreground/20 hover:ring-foreground/40 hover:text-foreground",
        solid: "bg-foreground text-background ring-transparent",
        glass:
          "bg-black/40 text-white ring-white/25 backdrop-blur-sm hover:bg-black/55",
        destructive:
          "bg-destructive/10 text-destructive ring-destructive/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a small leading dot in the badge's text color. */
  dot?: boolean
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }

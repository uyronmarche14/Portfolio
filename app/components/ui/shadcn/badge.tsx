import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-foreground/15 px-3 py-1 font-mono text-xs font-medium transition-all duration-200 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/10 text-primary hover:bg-primary/20",
        secondary:
          "border-transparent bg-foreground text-background",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline:
          "bg-foreground/[0.04] text-foreground/80 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary motion-reduce:hover:translate-y-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
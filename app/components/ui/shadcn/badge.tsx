import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border-2 border-foreground px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-background shadow-brutal-sm",
        secondary:
          "bg-foreground text-background shadow-brutal-sm",
        destructive:
          "bg-destructive text-white shadow-brutal-sm",
        outline: "bg-background text-foreground",
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
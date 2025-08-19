import * as React from "react";
import { cn } from "@/lib/utils";

export interface GridProps {
  /**
   * Grid content
   */
  children: React.ReactNode;
  /**
   * Number of columns for different breakpoints
   */
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /**
   * Gap between grid items
   */
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * HTML element type
   */
  as?: "div" | "section" | "ul" | "ol";
}

const gapClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

/**
 * Grid component for responsive grid layouts
 *
 * @example
 * ```tsx
 * <Grid
 *   cols={{ default: 1, md: 2, lg: 3 }}
 *   gap="lg"
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * ```
 */
const Grid = React.forwardRef<HTMLElement, GridProps>(
  (
    {
      children,
      cols = { default: 1 },
      gap = "md",
      className,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    // Generate responsive grid classes
    const gridClasses = React.useMemo(() => {
      const classes: string[] = [];

      if (cols.default) {
        classes.push(`grid-cols-${cols.default}`);
      }
      if (cols.sm) {
        classes.push(`sm:grid-cols-${cols.sm}`);
      }
      if (cols.md) {
        classes.push(`md:grid-cols-${cols.md}`);
      }
      if (cols.lg) {
        classes.push(`lg:grid-cols-${cols.lg}`);
      }
      if (cols.xl) {
        classes.push(`xl:grid-cols-${cols.xl}`);
      }

      return classes.join(" ");
    }, [cols]);

    return React.createElement(
      Component,
      {
        ref,
        className: cn("grid", gridClasses, gapClasses[gap], className),
        ...props,
      },
      children
    );
  }
);

Grid.displayName = "Grid";

/**
 * GridItem component for individual grid items with span control
 */
export interface GridItemProps {
  children: React.ReactNode;
  /**
   * Column span for different breakpoints
   */
  colSpan?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /**
   * Row span for different breakpoints
   */
  rowSpan?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  className?: string;
  as?: "div" | "li" | "article" | "section";
}

const GridItem = React.forwardRef<HTMLElement, GridItemProps>(
  (
    { children, colSpan, rowSpan, className, as: Component = "div", ...props },
    ref
  ) => {
    // Generate span classes
    const spanClasses = React.useMemo(() => {
      const classes: string[] = [];

      // Column spans
      if (colSpan?.default) {
        classes.push(`col-span-${colSpan.default}`);
      }
      if (colSpan?.sm) {
        classes.push(`sm:col-span-${colSpan.sm}`);
      }
      if (colSpan?.md) {
        classes.push(`md:col-span-${colSpan.md}`);
      }
      if (colSpan?.lg) {
        classes.push(`lg:col-span-${colSpan.lg}`);
      }
      if (colSpan?.xl) {
        classes.push(`xl:col-span-${colSpan.xl}`);
      }

      // Row spans
      if (rowSpan?.default) {
        classes.push(`row-span-${rowSpan.default}`);
      }
      if (rowSpan?.sm) {
        classes.push(`sm:row-span-${rowSpan.sm}`);
      }
      if (rowSpan?.md) {
        classes.push(`md:row-span-${rowSpan.md}`);
      }
      if (rowSpan?.lg) {
        classes.push(`lg:row-span-${rowSpan.lg}`);
      }
      if (rowSpan?.xl) {
        classes.push(`xl:row-span-${rowSpan.xl}`);
      }

      return classes.join(" ");
    }, [colSpan, rowSpan]);

    return React.createElement(
      Component,
      {
        ref,
        className: cn(spanClasses, className),
        ...props,
      },
      children
    );
  }
);

GridItem.displayName = "GridItem";

export { Grid, GridItem };

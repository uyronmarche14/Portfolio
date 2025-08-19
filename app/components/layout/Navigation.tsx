import * as React from 'react';
import { Button } from '@/components/ui/shadcn/button';
import { cn } from '@/lib/utils';

export interface NavigationItem {
  /**
   * Navigation item label
   */
  label: string;
  /**
   * Navigation item href or ID
   */
  href: string;
  /**
   * Whether the item is currently active
   */
  active?: boolean;
  /**
   * Optional icon component
   */
  icon?: React.ReactNode;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
}

export interface NavigationProps {
  /**
   * Navigation items
   */
  items: NavigationItem[];
  /**
   * Navigation orientation
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Navigation variant
   */
  variant?: 'default' | 'pills' | 'underline';
  /**
   * Size of navigation items
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Click handler for navigation items
   */
  onItemClick?: (item: NavigationItem, event: React.MouseEvent) => void;
}

const navigationVariants = {
  default: {
    container: 'space-x-1',
    item: 'hover:bg-accent hover:text-accent-foreground',
    active: 'bg-accent text-accent-foreground',
  },
  pills: {
    container: 'space-x-1',
    item: 'rounded-full hover:bg-accent hover:text-accent-foreground',
    active: 'bg-primary text-primary-foreground rounded-full',
  },
  underline: {
    container: 'space-x-6',
    item: 'border-b-2 border-transparent hover:border-accent-foreground/50',
    active: 'border-b-2 border-primary text-primary',
  },
};

/**
 * Navigation component for consistent navigation patterns
 * 
 * @example
 * ```tsx
 * <Navigation 
 *   items={navItems}
 *   variant="pills"
 *   onItemClick={(item) => scrollToSection(item.href)}
 * />
 * ```
 */
const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ 
    items, 
    orientation = 'horizontal',
    variant = 'default',
    size = 'default',
    className,
    onItemClick,
    ...props 
  }, ref) => {
    const variantStyles = navigationVariants[variant];

    const handleItemClick = (item: NavigationItem, event: React.MouseEvent) => {
      if (item.disabled) {
        event.preventDefault();
        return;
      }
      onItemClick?.(item, event);
    };

    return (
      <nav
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          orientation === 'horizontal' ? variantStyles.container : 'space-y-1',
          className
        )}
        role="navigation"
        {...props}
      >
        {items.map((item, index) => (
          <Button
            key={`${item.href}-${index}`}
            variant="ghost"
            size={size}
            className={cn(
              'justify-start transition-all duration-200',
              variantStyles.item,
              item.active && variantStyles.active,
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={(event) => handleItemClick(item, event)}
            disabled={item.disabled}
            aria-current={item.active ? 'page' : undefined}
          >
            {item.icon && (
              <span className="mr-2">
                {item.icon}
              </span>
            )}
            {item.label}
          </Button>
        ))}
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';

export { Navigation };
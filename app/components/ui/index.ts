/**
 * UI Components Index
 * 
 * This file exports all base UI components that form the design system.
 * These components are reusable across the entire application.
 */

// Re-export shadcn components
export { Button, buttonVariants } from './shadcn/button';
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from './shadcn/card';
export { Input } from './shadcn/input';
export { Label } from './shadcn/label';
export { Textarea } from './shadcn/textarea';
export { Badge } from './shadcn/badge';
export { Avatar, AvatarImage, AvatarFallback } from './shadcn/avatar';
export { 
  Dialog, 
  DialogPortal, 
  DialogOverlay, 
  DialogClose, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogFooter, 
  DialogTitle, 
  DialogDescription 
} from './shadcn/dialog';
export { Separator } from './shadcn/separator';
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './shadcn/accordion';
export { Slider } from './shadcn/slider';
export { Drawer } from './shadcn/drawer';

// Export custom UI components
export { LoadingSpinner } from './LoadingSpinner';
export { ErrorBoundary } from './ErrorBoundary';
export { Skeleton } from './Skeleton';
export { Toast } from './Toast';
export { Tooltip } from './Tooltip';
export { FormField } from './FormField';
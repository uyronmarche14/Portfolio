'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Code, CheckCircle2, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { Button } from '@/components/ui/shadcn/button';
import { Badge } from '@/components/ui/shadcn/badge';
import { Avatar, AvatarFallback } from '@/components/ui/shadcn/avatar';
import { Tooltip } from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';

export interface ProjectCardProps {
  /**
   * Project data
   */
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    liveDemoUrl?: string;
    githubUrl?: string;
    status?: 'active' | 'completed' | 'archived';
    featured?: boolean;
    createdAt?: Date;
    features: string[];
    paragraph: string;
    screenshots: string[];
    timeline?: Array<{
      date: string;
      title: string;
      description: string;
    }>;
  };
  /**
   * Card variant
   */
  variant?: 'default' | 'featured' | 'compact';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Click handler for the card
   */
  onClick?: () => void;
  /**
   * Animation delay for staggered animations
   */
  animationDelay?: number;
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: (delay: number) => ({
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: delay * 0.1,
      ease: [0.4, 0, 0.2, 1]
    }
  }),
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const statusColors = {
  active: 'bg-green-500/10 text-green-700 border-green-500/20',
  completed: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  archived: 'bg-gray-500/10 text-gray-700 border-gray-500/20',
};

/**
 * ProjectCard component for displaying project information
 * 
 * @example
 * ```tsx
 * <ProjectCard 
 *   project={projectData}
 *   variant="featured"
 *   onClick={() => router.push(`/projects/${project.id}`)}
 * />
 * ```
 */
const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ 
    project, 
    variant = 'default',
    className,
    onClick,
    animationDelay = 0,
    ...props 
  }, ref) => {
    const isFeatured = variant === 'featured' || project.featured;
    const isCompact = variant === 'compact';

    return (
      <motion.div
        ref={ref}
        custom={animationDelay}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-50px" }}
        className={cn(
          'group cursor-pointer',
          className
        )}
        onClick={onClick}
        {...props}
      >
        <Card className={cn(
          'h-full transition-all duration-300 border-border/50 hover:border-primary/20',
          'hover:shadow-lg hover:shadow-primary/10',
          isFeatured && 'ring-2 ring-primary/20 border-primary/30',
          'backdrop-blur-sm bg-card/50'
        )}>
          {/* Header */}
          <CardHeader className={cn(
            'pb-3',
            isCompact && 'pb-2'
          )}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className={cn(
                  'text-lg font-semibold text-foreground group-hover:text-primary transition-colors',
                  isFeatured && 'text-xl',
                  isCompact && 'text-base'
                )}>
                  {project.title}
                  {isFeatured && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Featured
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className={cn(
                  'mt-1 text-sm text-muted-foreground line-clamp-2',
                  isCompact && 'text-xs line-clamp-1'
                )}>
                  {project.description}
                </CardDescription>
              </div>
              
              {project.status && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    'text-xs capitalize ml-2',
                    statusColors[project.status]
                  )}
                >
                  {project.status}
                </Badge>
              )}
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-4">
            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, isCompact ? 3 : 6).map((tech, index) => (
                <Tooltip key={tech} content={tech}>
                  <Avatar className="w-6 h-6 bg-muted border border-border/50">
                    <AvatarFallback className="text-xs font-medium">
                      {tech.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Tooltip>
              ))}
              {project.technologies.length > (isCompact ? 3 : 6) && (
                <Tooltip content={`+${project.technologies.length - (isCompact ? 3 : 6)} more`}>
                  <Avatar className="w-6 h-6 bg-muted border border-border/50">
                    <AvatarFallback className="text-xs">
                      +{project.technologies.length - (isCompact ? 3 : 6)}
                    </AvatarFallback>
                  </Avatar>
                </Tooltip>
              )}
            </div>

            {/* Features List */}
            {!isCompact && project.features && project.features.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Zap className="w-4 h-4 text-primary" />
                  Key Features
                </div>
                <div className="space-y-1.5">
                  {project.features.slice(0, 3).map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle2 
                        className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-green-500"
                      />
                      <span className="text-xs leading-relaxed text-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {project.features.length > 3 && (
                    <div className="text-xs text-muted-foreground pl-5">
                      +{project.features.length - 3} more features
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Metadata */}
            {!isCompact && project.createdAt && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {project.createdAt.toLocaleDateString()}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubUrl, '_blank');
                    }}
                  >
                    <Github className="w-4 h-4" />
                    <span className="sr-only">View on GitHub</span>
                  </Button>
                )}
                
                {(project.liveUrl || project.liveDemoUrl) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.liveUrl || project.liveDemoUrl, '_blank');
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="sr-only">View live demo</span>
                  </Button>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-primary"
              >
                <Code className="w-3 h-3 mr-1" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export { ProjectCard };
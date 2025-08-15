'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/shadcn/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/shadcn/avatar';
import { Badge } from '@/components/ui/shadcn/badge';
import { cn } from '@/lib/utils';

export interface HeroSectionProps {
  /**
   * Hero title
   */
  title?: string;
  /**
   * Hero subtitle
   */
  subtitle?: string;
  /**
   * Hero description
   */
  description?: string;
  /**
   * Profile image URL
   */
  profileImage?: string;
  /**
   * Skills or technologies to highlight
   */
  skills?: string[];
  /**
   * Social links
   */
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  /**
   * Resume download URL
   */
  resumeUrl?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Scroll to next section handler
   */
  onScrollToNext?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

/**
 * HeroSection component for the main landing section
 * 
 * @example
 * ```tsx
 * <HeroSection 
 *   title="John Doe"
 *   subtitle="Full Stack Developer"
 *   description="I create amazing web experiences"
 *   skills={['React', 'Node.js', 'TypeScript']}
 *   socialLinks={{ github: 'https://github.com/johndoe' }}
 * />
 * ```
 */
const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ 
    title = "Your Name",
    subtitle = "Your Title",
    description = "Your description goes here",
    profileImage,
    skills = [],
    socialLinks = {},
    resumeUrl,
    className,
    onScrollToNext,
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'min-h-screen flex items-center justify-center relative overflow-hidden',
          'bg-gradient-to-br from-background via-background to-muted/20',
          className
        )}
        {...props}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '4s' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/5 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Profile Image */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary/20 shadow-2xl">
                  <AvatarImage src={profileImage} alt={title} />
                  <AvatarFallback className="text-2xl md:text-3xl font-bold">
                    {title.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium">
                {subtitle}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Skills */}
            {skills.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary Actions */}
              <div className="flex gap-4">
                {socialLinks.email && (
                  <Button size="lg" asChild>
                    <a href={`mailto:${socialLinks.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Get in Touch
                    </a>
                  </Button>
                )}
                
                {resumeUrl && (
                  <Button variant="outline" size="lg" asChild>
                    <a href={resumeUrl} download>
                      <Download className="w-4 h-4 mr-2" />
                      Resume
                    </a>
                  </Button>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.github && (
                  <Button variant="ghost" size="icon" asChild>
                    <a 
                      href={socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>
                )}
                
                {socialLinks.linkedin && (
                  <Button variant="ghost" size="icon" asChild>
                    <a 
                      href={socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            {onScrollToNext && (
              <motion.div
                variants={itemVariants}
                className="pt-8"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onScrollToNext}
                  className="animate-bounce"
                  aria-label="Scroll to next section"
                >
                  <ArrowDown className="w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = 'HeroSection';

export { HeroSection };
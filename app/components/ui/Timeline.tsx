import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle } from "lucide-react";

interface TimelineEvent {
  id?: string;
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const eventVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Timeline: React.FC<TimelineProps> = ({ events, className = "" }) => {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className} mb-12` }>
      <h3 className="text-2xl font-bold mb-6 text-headline">Project Timeline</h3>
      
      <motion.div 
        variants={timelineVariants}
        initial="hidden"
        animate="visible"
        className="relative pl-8"
      >
        {/* Vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border"></div>
        
        {events.map((event, index) => (
          <motion.div
            key={event.id || `${event.date}-${index}`}
            variants={eventVariants}
            className="relative mb-8 last:mb-0"
          >
            {/* Timeline dot */}
            <div className="absolute -left-8 top-1 w-6 h-6 bg-primary rounded-full border-4 border-background flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-primary-foreground" />
            </div>
            
            {/* Content */}
            <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <time className="text-sm font-medium text-muted-foreground">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <h4 className="text-lg font-semibold text-headline mb-1">
                {event.title}
              </h4>
              <p className="text-paragraph text-sm">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;

import React from "react";
import { motion } from "framer-motion";

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
    <motion.ol
      variants={timelineVariants}
      initial="hidden"
      animate="visible"
      className={`space-y-4 mt-4 ${className}`}
      aria-label="Timeline of events"
    >
      {events.map((event, index) => (
        <motion.li 
          key={event.id || `${event.date}-${index}`} 
          variants={eventVariants} 
          className="flex gap-4 group"
        >
          <div 
            className="flex flex-col items-center flex-shrink-0"
            aria-hidden="true"
          >
            <div className="w-3 h-3 bg-primary rounded-full transition-all duration-300 group-hover:scale-125 group-hover:bg-primary/80"></div>
            {index !== events.length - 1 && (
              <div className="w-0.5 h-full bg-primary/20 transition-colors duration-300 group-hover:bg-primary/30"></div>
            )}
          </div>
          <article className="flex-1 pb-4 transition-transform duration-300 group-hover:translate-x-1">
            <time 
              className="text-sm font-medium text-primary mb-1 block"
              dateTime={new Date(event.date).toISOString()}
            >
              {event.date}
            </time>
            <h3 className="font-semibold text-headline mb-2 text-base sm:text-lg">
              {event.title}
            </h3>
            <p className="text-sm text-paragraph leading-relaxed">
              {event.description}
            </p>
          </article>
        </motion.li>
      ))}
    </motion.ol>
  );
};

export default Timeline;

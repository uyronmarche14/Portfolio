import React from "react";
import { motion } from "framer-motion";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
    },
  },
};

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <motion.div
      variants={timelineVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 mt-4"
    >
      {events.map((event, index) => (
        <motion.div key={index} variants={eventVariants} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            {index !== events.length - 1 && (
              <div className="w-0.5 h-full bg-primary/20"></div>
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="text-sm text-primary mb-1">{event.date}</div>
            <div className="font-medium text-headline mb-1">{event.title}</div>
            <p className="text-sm text-paragraph">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Timeline;

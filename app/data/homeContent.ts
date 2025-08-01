// Home section content data
export const HOME_CONTENT = {
  name: "Rhyss",
  title: "My Journey To Be A Developer.",
  description: "I'm a backend, frontend, and mobile developer with a passion for data and a love for learning new things related to technology."
};

// Background animations configuration
export const BACKGROUND_ANIMATIONS = [
  {
    className: "absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-[100px]",
    animate: {
      x: [0, 100, -100, 0],
      y: [0, -100, 100, 0],
      scale: [1, 1.2, 0.8, 1],
      opacity: [0.4, 0.7, 0.4],
    },
    transition: { duration: 30, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" },
    style: { top: "20%", left: "15%" },
  },
  {
    className: "absolute w-[300px] h-[300px] rounded-full bg-gradient-to-l from-secondary/30 to-primary/30 blur-[80px]",
    animate: {
      x: [0, -50, 50, 0],
      y: [0, 50, -50, 0],
      scale: [1, 0.8, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    },
    transition: { duration: 25, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" },
    style: { bottom: "20%", right: "15%" },
  },
  {
    className: "absolute w-[250px] h-[250px] rounded-full bg-gradient-to-tr from-primary/20 via-secondary/20 to-primary/20 blur-[60px]",
    animate: {
      x: [0, 70, -70, 0],
      y: [0, -70, 70, 0],
      scale: [1, 1.1, 0.9, 1],
      opacity: [0.2, 0.5, 0.2],
    },
    transition: { duration: 20, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" },
    style: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  },
];

// Letter animation configuration
export const LETTER_ANIMATION = {
  initial: { opacity: 0, y: 50 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
    },
  }),
};
export const PROJECTS_CONTENT = {
  sectionTitle: "Featured Projects",
  sectionSubtitle: "My Work",
  sectionDescription: "Explore a collection of my latest works, showcasing innovative solutions and creative development approaches.",
  filterAll: "All",
  timelineTitle: "Development Timeline",
  viewScreenshots: "View Screenshots",
  liveDemo: "Live Demo",
  github: "GitHub",
};

export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  },
  project: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  },
};
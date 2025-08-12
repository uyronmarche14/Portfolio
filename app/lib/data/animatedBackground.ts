export const BACKGROUND_ANIMATIONS = {
  blur1: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.3, 0.5],
  },
  blur2: {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.2, 0.3],
  },
  float1: {
    y: [0, -20, 0],
    x: [0, 10, 0],
  },
  float2: {
    y: [0, 20, 0],
    x: [0, -10, 0],
  },
};

export const BACKGROUND_TRANSITIONS = {
  slow: {
    duration: 10,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
  medium: {
    duration: 8,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
  fast: {
    duration: 5,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
  slowFloat: {
    duration: 7,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
};
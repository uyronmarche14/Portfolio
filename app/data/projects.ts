export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  screenshots: string[];
  timeline?: {
    date: string;
    title: string;
    description: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Codex Express",
    description: "Appoinment Scheduling Web Application",
    image: "/images/Screenshot 2025-01-12 193709.png",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
    githubUrl: "https://github.com/your-username/portfolio",
    liveUrl: "https://uyronmarche14.github.io/CodexExpress/login",
    screenshots: [
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572290/Screenshot_2025-01-12_193709_pbh8ue.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572290/Screenshot_2025-01-12_193718_mmsb4q.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572291/Screenshot_2025-01-12_193727_ncdsz6.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572291/Screenshot_2025-01-12_193738_tlpqdr.png",
    ],
    timeline: [
      {
        date: "2024-12-20",
        title: "Project Started",
        description: "Initial project setup and planning phase",
      },
      {
        date: "2025-01-10",
        title: "Beta Release",
        description: "First beta version released for testing",
      },
    ],
  },
  {
    id: 2,
    title: "Reservation Desktop Application",
    description: "System Application for Clinic Reservation",
    image: "/images/cs1.png",
    technologies: ["C#", "MySql"],
    githubUrl: "https://github.com/your-username/ecommerce",
    liveUrl: "https://your-ecommerce.com",
    screenshots: [
      "/images/cs1.png",
      "/images/cs2.png",
      "/images/cs3.png",
      "/images/cs4.png",
      "/images/cs5.png",
    ],
    timeline: [
      {
        date: "2024-01-30",
        title: "Project Started",
        description: "Initial project setup and planning phase",
      },
      {
        date: "2023-04-8",
        title: "Beta Release",
        description: "First beta version released for testing",
      },
    ],
  },
  {
    id: 4,
    title: "Jobint AI interview Enhancing Communication and Soft Skills",
    description: "Mobile Application for AI Interview",
    image: "/images/th1.jpg",
    technologies: [
      "React Native",
      "Firebase",
      "Material-UI",
      "Expo",
      "Node.js",
      "Javascript",
    ],
    githubUrl: "https://github.com/your-username/taskapp",
    liveUrl: "https://your-taskapp.com",
    screenshots: [
      "/images/th1.jpg",
      "/images/th2.jpg",
      "/images/th3.jpg",
      "/images/th4.jpg",
      "/images/th5.jpg",
      "/images/th6.jpg",
      "/images/th7.jpg",
      "/images/th8.jpg",
      "/images/th9.jpg",
    ],
    timeline: [
      {
        date: "2024-01-30",
        title: "Project Started",
        description: "Initial project setup and planning phase",
      },
      {
        date: "2023-12-16",
        title: "Beta Release",
        description: "First beta version released for testing",
      },
    ],
  },
  {
    id: 5,
    title: "Best Brew Coffee",
    description: "Mobile Application for Coffee Shop",
    image: "/images/bbc1_1.jpg",
    technologies: ["android studio", "Firebase", "Java"],
    githubUrl: "https://github.com/your-username/taskapp",
    liveUrl: "https://your-taskapp.com",
    screenshots: [
      "/images/bbc1_1.jpg",
      "/images/bbc2.jpg",
      "/images/bbc3.jpg",
      "/images/bbc4.jpg",
      "/images/bbc5.jpg",
      "/images/bbc6.jpg",
      "/images/bbc7.jpg",
    ],
    timeline: [
      {
        date: "2023-08-30",
        title: "Project Started",
        description: "Initial project setup and planning phase",
      },
      {
        date: "2023-12-16",
        title: "Beta Release",
        description: "First beta version released for testing",
      },
    ],
  },
];

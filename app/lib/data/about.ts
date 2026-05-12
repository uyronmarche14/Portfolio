// Legacy interfaces for backward compatibility
export interface LegacyTechnology {
  name: string;
  iconName: string;
}

export interface TimelineFeature {
  title: string;
  description: string;
  icon: string;
}

export interface TimelineYear {
  year: string;
  features: TimelineFeature[];
}

export const technologies: LegacyTechnology[] = [
  { name: "Python", iconName: "python" },
  { name: "JavaScript", iconName: "javascript" },
  { name: "C#", iconName: "csharp" },
  { name: "React", iconName: "react" },
  { name: "Tailwind CSS", iconName: "tailwind" },
  { name: "React Native", iconName: "react" },
  { name: "Android Studio", iconName: "android" },
  { name: "Expo Router", iconName: "app-window" },
];

export const timelineYears: TimelineYear[] = [
  {
    year: "2018",
    features: [
      {
        title: "Started Learning Programming",
        description: "Created my first website project - a school web project using HTML and CSS",
        icon: "laptop"
      }
    ]
  },
  {
    year: "2020",
    features: [
      {
        title: "Pandemic Era Learning",
        description: "Studied technology and explored computer troubleshooting while learning to use the Terminal",
        icon: "code"
      },
      {
        title: "Entered College at STI for BSIT",
        description: "Learned basic coding and Java programming, including loops and fundamental concepts",
        icon: "graduation-cap"
      }
    ]
  },
  {
    year: "2021",
    features: [
      {
        title: "Moved to Public University TCU",
        description: "Built websites and created multiple systems using Java GUI while joining student organizations",
        icon: "university"
      }
    ]
  },
  {
    year: "2022",
    features: [
      {
        title: "Advanced Programming & Leadership",
        description: "Mastered Java OOP, SQL, and robotics. Explored Python, Flask, and Django. Became VP External for Robotics and won 1st place in Python Competition at TCU",
        icon: "trophy"
      }
    ]
  },
  {
    year: "2023",
    features: [
      {
        title: "Third Year & Mobile Development",
        description: "Learned React, React Native, Android Studio, and Expo Router. Became Auditor for ICT-SF and VP External for CSS organization",
        icon: "smartphone"
      },
      {
        title: "IT Olympics - Cybersecurity",
        description: "Participated in the IT Olympics at UMAK in the cybersecurity category",
        icon: "shield"
      }
    ]
  },
  {
    year: "2024",
    features: [
      {
        title: "Web Development Mastery",
        description: "Explored JavaScript, TypeScript, Next.js, React, and Tailwind CSS. Studied algorithms and became department course president",
        icon: "code"
      },
      {
        title: "IT Olympics - Android Productivity",
        description: "Competed in the IT Olympics at UMAK in the Android Productivity category",
        icon: "android"
      },
      {
        title: "Professional Internship",
        description: "Started internship at Aique Innovation Solutions Corporation, learning Next.js, Tailwind CSS, React, TypeScript, and Scrum Agile methodology",
        icon: "briefcase"
      },

    ]
  },
  {
    year: "2025",
    features: [
      {
        title: "Freelance Software Developer (Jan 2024 - Present)",
        description: "Designed and delivered full-stack web and mobile solutions for startup and enterprise clients, balancing hands-on engineering with AI-assisted tooling to improve quality, refactoring, and delivery speed.",
        icon: "briefcase"
      },
      {
        title: "Frontend Developer at Aique (Jan 2025 - Jun 2025)",
        description: "Built responsive and reusable React interfaces, integrated backend APIs across multiple user roles, and worked in an Agile environment with reviews, sprint planning, and iterative feature delivery.",
        icon: "code"
      },
      {
        title: "Software Developer at Beyondgen (Aug 2025 - May 2026)",
        description: "Developed a supplier quality management platform with multi-step approval workflows, audit logs, status tracking, and a Microsoft SQL Server backend built without an ORM.",
        icon: "briefcase"
      },
      {
        title: "Software Engineer at KeepItSimpleOS (Sep 2025 - Nov 2025)",
        description: "Built a centralized fitness platform for trainers to manage clients, messaging, and performance tracking while integrating third-party APIs and AI-assisted communication flows.",
        icon: "smartphone"
      },
      {
        title: "Full-Stack Developer at BuildFast (2025 - 2026)",
        description: "Worked on AI-powered platforms with modern frontend and backend architecture, clearer separation of concerns, and production-ready workflows for shipping features under tight timelines.",
        icon: "code"
      },
    ]
  },
  {
    year: "2026",
    features: [
      {
        title: "Freelance Software Developer (Jan 2024 - Present)",
        description: "Continued delivering production-ready applications for clients while combining manual engineering discipline with AI-assisted workflows for refactoring, backend services, and scalable product delivery.",
        icon: "briefcase"
      },
      {
        title: "Beyondgen Delivery Phase (Aug 2025 - May 2026)",
        description: "Closed out supplier compliance and approval workflow work, including reviewer and approver flows, audit visibility, and structured backend status tracking.",
        icon: "briefcase"
      },
      {
        title: "BuildFast AI Product Work (2025 - 2026)",
        description: "Expanded into AI-focused product delivery, contributing to script generation, video workflow tooling, maintainable components, and architecture decisions across modern TypeScript stacks.",
        icon: "code"
      },
    ]
  }

];

// Legacy export for backward compatibility
export const timelineEvents = timelineYears.flatMap(year => 
  year.features.map(feature => ({
    year: year.year,
    title: feature.title,
    description: feature.description,
    icon: feature.icon
  }))
);

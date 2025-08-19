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
      }
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

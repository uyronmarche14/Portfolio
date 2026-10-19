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
        description: "Mastered Java OOP, SQL, and robotics. Explored Python, Flask, and Django. Served as ROBOTCU Vice President for External Affairs (2022 - 2023) and won 1st place in the Python Competition at TCU",
        icon: "trophy"
      }
    ]
  },
  {
    year: "2023",
    features: [
      {
        title: "Third Year & Mobile Development",
        description: "Learned React, React Native, Android Studio, and Expo Router. Served as ICT-SF Auditor and Computer Science Society Vice President for External Affairs (2023 - 2024)",
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
        description: "Explored JavaScript, TypeScript, Next.js, React, and Tailwind CSS, and studied algorithms",
        icon: "code"
      },
      {
        title: "ICT-SF Student Director (2024 - 2025)",
        description: "Led student representation, coordination, and communication across the ICT student formation",
        icon: "trophy"
      },
      {
        title: "SwiftPass Guard thesis (2024 - 2025)",
        description: "Built a mobile and ESP32 access-control thesis: QR scanning, a Supabase backend, and a relay-controlled lock",
        icon: "shield"
      },
      {
        title: "Started freelance development (Jan 2024)",
        description: "Began self-described independent work across web and mobile, from requirements to delivery",
        icon: "briefcase"
      },
      {
        title: "IT Olympics - Android Productivity",
        description: "Competed in the IT Olympics at UMAK in the Android Productivity category",
        icon: "android"
      },
    ]
  },
  {
    year: "2025",
    features: [
      {
        title: "Graduated Cum Laude, BS Computer Science",
        description: "Completed the degree at Taguig City University (2021 - 2025), with a Best Thesis finalist recognition and the Hon. Maria Laarni L. Cayetano Leadership Award.",
        icon: "graduation-cap"
      },
      {
        title: "Frontend Developer Intern at Aique (Jan 2025 - Jun 2025)",
        description: "Built responsive React interfaces, connected them to backend APIs, debugged and refined features, and took part in an Agile team with code reviews.",
        icon: "code"
      },
      {
        title: "Full-Stack Software Developer / Project Manager at Beyondgen via Stockly (Aug 2025 - Jul 2026)",
        description: "Worked on enterprise supplier quality management modernization: legacy analysis, approval workflows, roles and permissions, documentation, code review, regression checks, and CI validation.",
        icon: "briefcase"
      },
      {
        title: "Software Engineer at KeepItSimpleOS (Sep 2025 - Nov 2025)",
        description: "Worked on application functionality, troubleshooting, and data-flow refinement for a trainer-client fitness platform with messaging and performance tracking.",
        icon: "smartphone"
      },
      {
        title: "Full-Stack Developer at BuildFast (Dec 2025 - Feb 2026)",
        description: "Built backend services, APIs, reusable interfaces, and AI-assisted features aligned with contract milestones.",
        icon: "code"
      },
    ]
  },
  {
    year: "2026",
    features: [
      {
        title: "Technical Business Analyst at iOPEX Technologies (Aug 2026 - Present)",
        description: "Analyzing live enterprise workflows, turning issues and requests into clear requirements, and building management and recruitment dashboards with KPI, SLA, and trend reporting.",
        icon: "briefcase"
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

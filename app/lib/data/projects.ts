// This will be transformed by the ProjectRepository to match the new Project interface
export interface LegacyProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveDemoUrl?: string;
  screenshots: string[];
  paragraph: string;
  features: string[];
  timeline?: {
    date: string;
    title: string;
    description: string;
  }[];
}

export const projects: LegacyProject[] = [
  {
    id: "codex-express",
    title: "Codex Express",
    description:
      "A modern appointment scheduling web application built with Next.js and TypeScript for seamless booking management.",
    image: "/images/codex-express-preview.png",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
    githubUrl: "https://github.com/ronmarche14/codex-express",
    liveUrl: "https://uyronmarche14.github.io/CodexExpress/login",
    liveDemoUrl: "https://uyronmarche14.github.io/CodexExpress/login",
    features: [
      "Real-time availability checking system",
      "Automated email notifications for appointments",
      "Comprehensive admin dashboard",
      "Multi-location appointment management",
      "Interactive calendar scheduling interface",
    ],
    paragraph:
      "Codex Express revolutionizes appointment scheduling with a modern, intuitive interface that simplifies booking, tracking, and managing appointments. Built with cutting-edge technologies including Next.js 14 for optimal performance, TypeScript for type safety, and TailwindCSS for responsive design. The application features real-time availability checking, automated email notifications, and a comprehensive admin dashboard for managing appointments across multiple locations.",
    screenshots: [
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572290/Screenshot_2025-01-12_193709_pbh8ue.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572290/Screenshot_2025-01-12_193718_mmsb4q.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572291/Screenshot_2025-01-12_193727_ncdsz6.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572291/Screenshot_2025-01-12_193738_tlpqdr.png",
    ],
    timeline: [
      {
        date: "2024-12-20",
        title: "Project Planning",
        description: "Initial requirements gathering and architecture design",
      },
      {
        date: "2025-01-10",
        title: "Beta Launch",
        description: "First version released with core booking functionality",
      },
      {
        date: "2025-01-15",
        title: "Feature Complete",
        description: "Added admin dashboard and email notifications",
      },
    ],
  },
  {
    id: "reservation-desktop",
    title: "Reservation Desktop Application",
    description:
      "A comprehensive clinic reservation system built with C# and MySQL for efficient appointment management.",
    image: "/images/reservation-desktop-preview.png",
    technologies: ["C#", "MySQL", "WinForms"],
    githubUrl: "https://github.com/ronmarche14/clinic-reservation-system",
    liveDemoUrl:
      "https://github.com/ronmarche14/clinic-reservation-system/releases",
    features: [
      "Multi-user access control system",
      "Automated SMS appointment reminders",
      "Crystal Reports integration for analytics",
      "Real-time clinic availability tracking",
      "Integrated billing management system",
    ],
    paragraph:
      "A robust desktop application designed specifically for medical clinics to manage patient appointments, doctor schedules, and billing processes. Features include multi-user access control, automated appointment reminders via SMS, comprehensive reporting with Crystal Reports integration, and real-time availability checking across multiple clinic locations.",
    screenshots: [
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572287/cs2_kshoze.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572288/cs5_rv2q9p.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572287/cs1_zribt6.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572287/cs3_jqtotw.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572288/cs4_b34tjb.png",
    ],
    timeline: [
      {
        date: "2024-01-30",
        title: "Requirements Analysis",
        description:
          "Conducted detailed requirements gathering with clinic staff",
      },
      {
        date: "2024-03-15",
        title: "Core Development",
        description: "Implemented appointment booking and patient management",
      },
      {
        date: "2024-04-08",
        title: "Testing & Deployment",
        description: "Completed testing and deployed to production environment",
      },
    ],
  },
  {
    id: "jobint-ai-interview",
    title: "Jobint AI Interview",
    description:
      "AI-powered mobile application for interview preparation and communication skills enhancement.",
    image: "/images/jobint-ai-preview.png",
    technologies: ["React Native", "Firebase", "Node.js", "JavaScript"],
    githubUrl: "https://github.com/ronmarche14/jobint-ai-interview",
    liveDemoUrl:
      "https://play.google.com/store/apps/details?id=com.jobint.ai.interview",
    features: [
      "AI-powered mock interview simulations",
      "Real-time speech analysis and feedback",
      "Personalized interview preparation plans",
      "Performance analytics dashboard",
      "Industry-specific question banks",
    ],
    paragraph:
      "Jobint AI Interview is a cutting-edge mobile application designed to help job seekers prepare for interviews through AI-powered mock interviews and personalized feedback. The app uses advanced AI algorithms to simulate real interview scenarios, analyze user responses, and provide actionable insights to improve communication and soft skills.",
    screenshots: [
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572295/th9_zwmzt6.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572295/th8_diyurr.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572295/th7_yfb0sj.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572295/th6_gxlpku.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572294/th5_il0ak5.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572294/th4_vfaduj.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572294/th3_rrdryw.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572294/th2_utufeh.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572291/th1_gzkitz.jpg",
    ],
    timeline: [
      {
        date: "2024-01-30",
        title: "Concept Development",
        description:
          "Research and concept validation for AI interview training",
      },
      {
        date: "2024-05-15",
        title: "MVP Development",
        description: "Built core AI interview simulation and feedback system",
      },
      {
        date: "2024-08-20",
        title: "Beta Testing",
        description: "Released beta version with 100+ beta testers",
      },
      {
        date: "2024-12-16",
        title: "App Store Launch",
        description: "Successfully launched on Google Play Store",
      },
    ],
  },
  {
    id: "best-brew-coffee",
    title: "Best Brew Coffee",
    description:
      "A mobile coffee shop application for ordering, loyalty rewards, and store management.",
    image: "/images/best-brew-coffee-preview.png",
    technologies: ["Android Studio", "Firebase", "Java"],
    githubUrl: "https://github.com/ronmarche14/best-brew-coffee",
    liveDemoUrl:
      "https://play.google.com/store/apps/details?id=com.bestbrew.coffee",
    features: [
      "Mobile ordering and payment system",
      "Loyalty rewards program",
      "Store locator with real-time updates",
      "Inventory management dashboard",
      "Personalized drink recommendations",
    ],
    paragraph:
      "Best Brew Coffee is a comprehensive mobile application that transforms the coffee shop experience. Customers can browse the menu, place orders ahead of time, earn loyalty points, and locate nearby stores. For coffee shop owners, the app provides inventory management, sales analytics, and customer engagement tools. Features include real-time order tracking, mobile payments, and personalized recommendations based on purchase history.",
    screenshots: [
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572284/bbc1_1_nozgkp.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572284/bbc1_n9rvis.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572285/bbc2_opd1zz.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572285/bbc4_xhecgl.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572285/bbc5_c8ljss.jpg",
    ],
    timeline: [
      {
        date: "2023-08-30",
        title: "Concept & Design",
        description: "Market research and UI/UX design phase",
      },
      {
        date: "2023-10-15",
        title: "Core Features",
        description: "Developed ordering system and user authentication",
      },
      {
        date: "2023-12-16",
        title: "Launch",
        description: "Successfully launched on Google Play Store",
      },
    ],
  },
  {
    id: "swiftpass-guard",
    title: "SwiftPass Guard",
    description:
      "A QR code-based identification and attendance monitoring platform designed for students of Taguig City University, ensuring secure, efficient, and reliable entry/exit logging.",
    image: "/images/swiftpass-guard-preview.png",
    technologies: [
      "QR Code Scanner",
      "Express Js",
      "Supabase",
      "HTML",
      "Node Js",
      "JavaScript",
      "ESP32",
      "C++",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    features: [
      "QR Code-based scanning for entry/exit",
      "Real-time data logging and cloud synchronization",
      "Offline caching with auto-sync on reconnection",
      "Department verification for access control",
      "Schedule-based access restrictions",
      "Professor unrestricted access",
      "QR code validity checks for security",
      "Admin control panel for log monitoring and reporting",
      "Power failure backup mode with battery operation",
      "Durable wooden frame and secure lock mechanism",
    ],
    paragraph:
      "SwiftPass Guard is an automated Entry and Exit ID System built to enhance campus security and streamline attendance tracking. Using QR code scanning, the system records student entry and exit in real-time, storing the data in a cloud database while offering offline caching during network disruptions. It enforces department and schedule-based restrictions, grants professors unrestricted access, and prevents unauthorized entry through rigorous QR code validity checks. The admin control panel provides real-time monitoring, report generation, and log management. The system also features a backup battery power mode for uninterrupted operation during power outages.",
    screenshots: [
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572284/swiftpass1.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572284/swiftpass2.jpg",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572285/swiftpass3.jpg",
    ],
    timeline: [
      {
        date: "2023-08-30",
        title: "Concept & Design",
        description:
          "Conducted market research, designed UI/UX, and defined system features.",
      },
      {
        date: "2023-10-15",
        title: "Prototype Development",
        description:
          "Integrated QR scanning, cloud database, and access control.",
      },
      {
        date: "2023-12-16",
        title: "Pilot Testing",
        description:
          "Successfully tested usability, functionality, and reliability with students.",
      },
    ],
  },
  {
    id: "solace-hotel",
    title: "Solace Hotel",
    description:
      "A hotel booking platform with user and admin portals. Users can register, browse room categories, check availability, and reserve rooms. Admins can manage rooms, view all bookings, and oversee users.",
    image: "/images/solace-hotel-preview.png",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Express.js (API)",
      "Supabase (Postgres, Auth, RLS)",
      "Render (Express API hosting)",
      "Netlify (Next.js hosting)",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    features: [
      "Supabase Auth (email/password, OAuth optional) with Row Level Security",
      "Room categories (Standard, Deluxe, Suite, Family, Executive)",
      "Availability search with date range and guest count",
      "Create, view, cancel reservations",
      "User dashboard: upcoming stays, history, profile",
      "Admin dashboard: rooms CRUD, pricing, inventory, bookings, users",
      "Server-side validation on Express API + client-side form validation",
      "Image upload via Supabase Storage",
      "Deployed split: Netlify (web) + Render (API)",
    ],
    paragraph:
      "Solace Hotel is a full-stack booking system built with a modern TypeScript stack. Next.js/React powers the user-facing app on Netlify, while an Express.js API—hosted on Render—handles secure server logic. Supabase provides Postgres, authentication, storage, and row-level security. Guests can register, browse categories, check availability, and reserve rooms. Administrators manage rooms, pricing, and inventory and can review every booking and user. The architecture cleanly separates the web client and API, making it scalable and easy to maintain.",
    screenshots: [
      "https://res.cloudinary.com/demo/image/upload/solace-hotel-home.jpg",
      "https://res.cloudinary.com/demo/image/upload/solace-hotel-rooms.jpg",
      "https://res.cloudinary.com/demo/image/upload/solace-hotel-admin.jpg",
    ],
    timeline: [
      {
        date: "2025-01-10",
        title: "Planning",
        description: "Defined user stories, data model, and API contract.",
      },
      {
        date: "2025-02-15",
        title: "Core Build",
        description:
          "Implemented Supabase Auth, room catalog, availability & booking flow.",
      },
      {
        date: "2025-03-05",
        title: "Admin & Deploy",
        description:
          "Finished admin features and deployed to Netlify (web) and Render (API).",
      },
    ],
  },
];

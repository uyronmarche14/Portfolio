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
  category?: string;
  status?: 'completed' | 'in-development' | 'planned';
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
    githubUrl: "https://github.com/uyronmarche14/codex-express",
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
    githubUrl: "https://github.com/uyronmarche14/clinic-reservation-system",
    liveDemoUrl:
      "https://github.com/uyronmarche14/clinic-reservation-system/releases",
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
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572284/cs1_zribt6.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572288/cs5_rv2q9p.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1754572287/cs2_kshoze.png",
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
      "AI-powered mobile interview training app built to improve communication skills, delivery, and confidence through mock interview feedback.",
    image: "/images/jobint-ai-preview.png",
    technologies: [
      "React Native",
      "Firebase",
      "JavaScript",
      "AI/ML",
      "Speech Recognition",
      "Android",
      "iOS",
    ],
    githubUrl: "https://github.com/uyronmarche14/jobint-ai-interview",
    liveDemoUrl:
      "https://play.google.com/store/apps/details?id=com.jobint.ai.interview",
    features: [
      "AI-powered mock interview simulations",
      "Speech analysis for clarity, pacing, and communication effectiveness",
      "Personalized feedback and performance insights",
      "Interview preparation flows tailored to user progress",
      "Performance analytics dashboard",
      "Android and iOS device support",
    ],
    paragraph:
      "Jobint AI Interview is a mobile interview training app designed to help job seekers practice real scenarios, receive personalized feedback, and improve communication confidence. The experience combines AI-assisted mock interviews with speech analysis to assess clarity, pacing, and delivery while surfacing actionable performance insights across Android and iOS devices.",
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
    githubUrl: "https://github.com/uyronmarche14/best-brew-coffee",
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
      "A QR-based attendance and access control platform for Taguig City University with real-time synchronization, offline support, and role-aware monitoring.",
    image: "/images/swiftpass-guard-preview.png",
    technologies: [
      "React Native",
      "Supabase",
      "WebSockets",
      "ESP32",
      "OpenAI",
      "Node.js",
      "C++",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    features: [
      "QR Code-based scanning for entry/exit",
      "Real-time data synchronization with offline fallback support",
      "Administrative dashboards for attendance, access logs, and user roles",
      "Department and schedule-based access restrictions",
      "QR code validation and secure access control",
      "ESP32 hardware integration for campus entry workflows",
      "Rapid AI-assisted iteration during a tight delivery timeline",
    ],
    paragraph:
      "SwiftPass Guard is a QR-based attendance and access control system built to improve campus security and streamline entry and exit monitoring. It combines real-time synchronization, offline support, ESP32 hardware integration, and administrative visibility so attendance, access logs, and role permissions stay reliable even under tight delivery constraints.",
    screenshots: [
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758386796/photo_15_2025-08-20_20-59-19_our2dv1758386201_1_kdj7rk.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387198/photo_6_2025-08-20_20-59-19_ssje1v1758386198_jxtzcx.png", // removed broken .wpg
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387200/photo_5_2025-08-20_20-59-19_cspw4p1758386198_jjbzv9.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387198/photo_8_2025-08-20_20-59-19_xyv9rw1758386198_jwbf1n.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387198/photo_7_2025-08-20_20-59-19_yjvchl1758386198_owbgvu.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387198/photo_9_2025-08-20_20-59-19_dgo8hp1758386198_zibe1d.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387081/photo_1_2025-08-20_20-59-19_nw6f5b1758386199_is6scd.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387091/photo_2_2025-08-20_20-59-19_rzierg1758386200_hsvj1i.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387079/photo_14_2025-08-20_20-59-19_kbxb621758386201_mtnjvf.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387079/photo_16_2025-08-20_20-59-19_owprmr1758386201_cyykgi.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387203/photo_4_2025-08-20_20-59-19_v2hit41758386197_1_yrzmfi.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387200/photo_5_2025-08-20_20-59-19_cspw4p1758386198_jjbzv9.png"

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
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387130/Screenshot_2025-08-13_204741_jllxby1758386199_duuocw.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387081/Screenshot_2025-08-13_204820_cdqm7r1758386200_ouutb0.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387473/Screenshot_2025-08-13_204832_uw2j8o1758385843_glakyn.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387473/Screenshot_2025-08-13_204843_em8hwf1758385843_ba9dny.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387478/Screenshot_2025-08-13_205010_zulckd1758385842_mujgow.png",
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1758387204/Screenshot_2025-08-13_204941_pwzf4f1758385845_ekih08.png",
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
  // ============ IN DEVELOPMENT PROJECTS ============
  {
    id: "lms-learning-management",
    title: "LMS Learning Management System",
    description:
      "A secure learning management platform with role-based access, media workflows, and containerized delivery for modern education teams.",
    image: "",
    technologies: [
      "React",
      "TypeScript",
      "Docker",
      "AWS",
      "Tailwind CSS",
      "Vitest",
      "JWT Authentication",
      "AWS S3",
      "LocalStack",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    category: "Web App",
    status: "in-development" as const,
    features: [
      "JWT authentication with email verification and role-based access control",
      "Media uploads using AWS S3 with secure pre-signed URLs",
      "LocalStack-powered local cloud workflow for file handling",
      "Dockerized services for consistent development and deployment",
      "Course management, progress tracking, and interactive learning flows",
      "Testing workflow supported with Vitest",
    ],
    paragraph:
      "A modern learning management system designed to streamline education delivery while keeping access control, media handling, and deployment reliable. The platform combines secure JWT auth, email verification, role-based permissions, AWS S3 uploads, LocalStack-backed local development, and Dockerized services to support scalable course and student workflows.",
    screenshots: [],
  },
  {
    id: "sqm-supplier-quality",
    title: "Supplier Quality Management (SQM)",
    description:
      "An enterprise supplier quality platform for managing change requests, nonconformance, new-product inspection, approvals, and related master data.",
    image: "",
    technologies: ["React", "TypeScript", "Vite", "Node.js", "Express", "Microsoft SQL Server"],
    githubUrl: "https://github.com/uyronmarche14/sqm-v3",
    liveDemoUrl: "",
    category: "Enterprise",
    features: [
      "5M1E supplier-change process: draft, submission, review, approval, conditional approval, rejection, action tracking, and notification rules",
      "Role and permission logic for suppliers, checkers, SQE staff, and approvers",
      "MNR and NPI documentation that maps legacy fields and process behavior to modern modules",
      "Separation of frontend forms, backend service logic, SQL access, and reporting-related data",
    ],
    paragraph:
      "A modernization effort across legacy and newer application layers. The frontend includes authentication, permission gates, forms, tables, and dashboard pages; the backend contains controllers, services, repositories, routes, and SQL schema material. Module documents show the analysis needed to convert existing forms and process diagrams into explicit field mappings, statuses, validation rules, approver roles, and testable behavior. Rules described here are documented or proposed, and production scope is still to be confirmed.",
    screenshots: [],
  },
  {
    id: "cict-organization-website",
    title: "CICT Web & Mobile Platform",
    description:
      "A web, administration, and mobile platform for the College of Information and Communication Technology.",
    image: "",
    technologies: ["Next.js", "React", "TypeScript", "Express", "MongoDB", "Expo", "React Native"],
    githubUrl: "https://github.com/uyronmarche14/CICT",
    liveDemoUrl: "",
    category: "Web & Mobile",
    status: "in-development" as const,
    features: [
      "Public website and administrative content workflows",
      "Student-facing mobile authentication, profile, event discovery, registration, and attendance flows",
      "Shared backend APIs and role-aware access across web and mobile",
      "QR attendance, with architecture maps, implementation plans, tests, and CI configuration",
    ],
    paragraph:
      "A monorepo with separate backend, web, mobile, and shared-contract packages. The mobile app is a student-facing companion that reuses the backend APIs instead of duplicating business logic. The value is the breadth of product boundaries: public content, protected administration, membership, event registration, attendance, and mobile access all share reliable data and roles. The repository also holds roadmaps, so planned features are not presented as complete.",
    screenshots: [],
  },
  {
    id: "archon-project-workspace",
    title: "Archon Project Workspace",
    description:
      "A full-stack project delivery workspace with project membership, Kanban boards, task collaboration, and activity history.",
    image: "",
    technologies: ["Next.js", "React", "NestJS", "TypeScript", "Prisma", "MySQL", "TanStack Query"],
    githubUrl: "https://github.com/uyronmarche14/archon",
    liveDemoUrl: "",
    category: "Project Management",
    features: [
      "Protected workspace with signup, login, and session recovery",
      "Project ownership, membership, and email-bound invite links",
      "Kanban status management, task drawer, comments, links, subtasks, and activity logs",
      "NestJS API with Prisma and MySQL persistence, and a drag-and-drop interface",
    ],
    paragraph:
      "A monorepo that documents the main-branch behavior: access-token handling with refresh cookies, project-defined workflow statuses, task movement, comments, attachments, activity logs, and notifications. It ties product rules to database boundaries and API authorization. Email verification is present but dormant, and no hosted release is claimed.",
    screenshots: [],
  },
  {
    id: "ai-command-center-fitness",
    title: "AI Command Center - Health & Fitness",
    description:
      "AI-powered health and fitness command center that provides personalized workout plans, nutrition tracking, and wellness insights.",
    image: "",
    technologies: ["Vite", "React", "Prisma", "MySQL", "TypeScript"],
    githubUrl: "",
    liveDemoUrl: "",
    category: "Mobile App",
    status: "in-development" as const,
    features: [
      "AI-generated personalized workout plans",
      "Nutrition tracking and meal suggestions",
      "Progress analytics and insights",
      "Voice-activated commands",
      "Wearable device integration",
      "Community challenges and leaderboards",
    ],
    paragraph:
      "An AI-powered fitness companion that generates personalized workout and nutrition plans based on user goals, tracks progress, and provides actionable wellness insights through an intuitive command center interface.",
    screenshots: [],
  },
  {
    id: "ai-script-video-generator",
    title: "AiLead - AI Script & Video Generator",
    description:
      "Automated content creation platform that turns structured prompts into AI-generated scripts and avatar-based videos.",
    image: "",
    technologies: [
      "Vite",
      "React",
      "TypeScript",
      "Prisma",
      "MySQL",
      "OpenAI",
      "Gemini",
      "D-ID API",
    ],
    githubUrl: "",
    liveDemoUrl: "",
    category: "AI Tool",
    status: "in-development" as const,
    features: [
      "AI script generation with OpenAI and Gemini",
      "D-ID avatar video creation",
      "History tracking and output management for generated content",
      "Multiple language support",
      "Voice customization options",
      "Batch video processing",
      "Template library for quick starts",
      "Export workflows for generated assets",
    ],
    paragraph:
      "AiLead is an AI content creation platform that combines OpenAI, Gemini, and D-ID to generate scripts and avatar-based videos from structured prompts. The product also tracks generated outputs and history so creators can manage content iterations more cleanly across repeated production workflows.",
    screenshots: [],
  },
];

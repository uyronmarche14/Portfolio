import {
  Award,
  BookOpen,
  Briefcase,
  Code,
  GraduationCap,
  Medal,
  ShieldCheck,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

export type AchievementCategory =
  | "all"
  | "school"
  | "college"
  | "competitions"
  | "certifications"
  | "professional";

export interface Achievement {
  id: string;
  title: string;
  category: Exclude<AchievementCategory, "all">;
  issuer: string;
  date: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  tags?: string[];
  certificateUrl?: string;
  impact?: string;
}

export const categoryFilters: { key: AchievementCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "school", label: "Academic Honors" },
  { key: "college", label: "Leadership & Service" },
  { key: "competitions", label: "Competitions" },
  { key: "certifications", label: "Certifications" },
  { key: "professional", label: "Events & Support" },
];

export const achievementsData: Achievement[] = [
  {
    id: "cum-laude-2025",
    title: "Cum Laude",
    category: "school",
    issuer: "Taguig City University",
    date: "2025",
    description:
      "Graduated with Cum Laude honors after balancing academic work, student leadership, technical projects, competitions, and real-world software experience throughout college.",
    icon: GraduationCap,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1752335710/pic1_hrf9ju.jpg",
    tags: ["Academic Honor", "TCU", "Computer Science"],
    impact: "Recognized for strong academic performance through graduation.",
  },
  {
    id: "student-leadership-year-2025",
    title: "Student Leadership of the Year",
    category: "school",
    issuer: "CICT",
    date: "2025",
    description:
      "Received leadership recognition for visible service, student representation, and consistent involvement in organizing department initiatives, programs, and collaborative student activities.",
    icon: Star,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766945619/photo_51_2025-12-29_02-02-12_xyzcw2.jpg",
    tags: ["Leadership", "Recognition", "CICT"],
    impact: "Recognized as one of the department’s standout student leaders.",
  },
  {
    id: "best-thesis-runner-up-2025",
    title: "1st Runner Up for Best Thesis",
    category: "school",
    issuer: "CICT",
    date: "2025",
    description:
      "Earned 1st runner-up recognition for best thesis among more than 100 thesis entries, reflecting both the technical quality of the system and the strength of the research presentation.",
    icon: Medal,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1752335592/6b6ef327-1f76-44d9-a06e-38f2063dbf3b_jnhllj.jpg",
    tags: ["Thesis", "Research", "Recognition"],
    impact: "Placed near the top of a 100+ thesis field in CICT.",
  },
  {
    id: "student-director-ictsf-2024-2025",
    title: "Student Director",
    category: "college",
    issuer: "ICT-SF",
    date: "2024 - 2025",
    description:
      "Served as Student Director and helped guide departmental initiatives, communication, planning, and the execution of student-led programs within the ICT student formation.",
    icon: Users,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766945618/photo_49_2025-12-29_02-02-12_srh1kr.jpg",
    tags: ["ICT-SF", "Leadership", "Planning", "Representation"],
    impact: "Led student-facing initiatives across the academic year.",
  },
  {
    id: "student-auditor-vp-external-2024",
    title: "Student Auditor & VP External",
    category: "college",
    issuer: "ICT-SF and CSS",
    date: "2024",
    description:
      "Held dual organizational responsibilities as Student Auditor for ICT-SF and Vice President External for CSS, helping support operations, accountability, coordination, and external-facing student activities.",
    icon: Award,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660318/459388087_1210395166778357_1242381946816835441_n_vrx5th.jpg",
    tags: ["Auditor", "VP External", "CSS", "ICT-SF"],
    impact: "Balanced leadership and accountability roles across multiple student groups.",
  },
  {
    id: "student-vp-robotics-2023",
    title: "Student VP for Robotics",
    category: "college",
    issuer: "Campus Robotics Organization",
    date: "2023",
    description:
      "Served as Vice President in a robotics-focused student organization, supporting initiatives that mixed technical exploration, leadership, and student participation in innovation-related activities.",
    icon: Users,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1752335474/368576070_1121807142514499_6167900994398008158_n_k2psm9.jpg",
    tags: ["Robotics", "Vice President", "Student Org"],
    impact: "Expanded leadership experience into technical and innovation spaces.",
  },
  {
    id: "handled-and-proposed-events",
    title: "Handled and Proposed Student Events",
    category: "college",
    issuer: "TCU CICT Organizations",
    date: "2023 - 2025",
    description:
      "Helped propose, organize, and support events across the department. This involved planning activities, assisting execution, coordinating teams, and making sure student-centered programs ran smoothly.",
    icon: Briefcase,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766939519/IMG_20250517_203753_807_ljfmdc.jpg",
    tags: ["Event Planning", "Student Service", "Coordination"],
    impact: "Built a strong reputation for reliable student event support.",
  },
  {
    id: "apcis-thesis-presentation-2025",
    title: "Asia Pacific Conference Thesis Presentation",
    category: "competitions",
    issuer: "1st Asia Pacific Conference on Interdisciplinary Studies",
    date: "2025",
    description:
      "Presented thesis work in an international conference setting during APCIS2025, gaining experience in academic competition, public presentation, and interdisciplinary research exposure.",
    icon: BookOpen,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660321/be429328-3ebb-4d4f-b425-8f5f07654ce1_mgwu5h.jpg",
    tags: ["APCIS2025", "International", "Research", "Presentation"],
    impact: "Brought thesis work into an international academic presentation space.",
  },
  {
    id: "python-competition-2024",
    title: "TCU CICT Python Competition",
    category: "competitions",
    issuer: "Taguig City University CICT",
    date: "2024",
    description:
      "Competed in the university Python competition and used the event as a way to strengthen problem-solving speed, logic, and technical confidence in a timed environment.",
    icon: Code,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766945648/photo_8_2025-12-29_02-02-12_isahur.jpg",
    tags: ["Python", "Competition", "Logic"],
    impact: "Strengthened confidence in solving coding tasks under pressure.",
  },
  {
    id: "it-olympics-cybersecurity-2024",
    title: "IT Olympics Cybersecurity",
    category: "competitions",
    issuer: "IT Olympics",
    date: "2024",
    description:
      "Represented the school in the cybersecurity category of IT Olympics, gaining more exposure to competitive technical problem solving and applied security thinking.",
    icon: Trophy,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1752335699/P1180874_yxh5ly.jpg",
    tags: ["Cybersecurity", "IT Olympics", "Representation"],
    impact: "Expanded technical competition experience beyond software building.",
  },
  {
    id: "it-olympics-mobile-productivity-2025",
    title: "IT Olympics Mobile Productivity",
    category: "competitions",
    issuer: "IT Olympics",
    date: "2025",
    description:
      "Competed in the Mobile Productivity category, representing the school and sharpening speed, focus, and execution in a practical technology competition setting.",
    icon: Trophy,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660324/ict4_qnkh2y.jpg",
    tags: ["Mobile Productivity", "IT Olympics", "Competition"],
    impact: "Continued representing the school in high-pressure tech competitions.",
  },
  {
    id: "lean-six-sigma-white-belt",
    title: "Lean Six Sigma White Belt",
    category: "certifications",
    issuer: "Certification Program",
    date: "Mar 20, 2025",
    description:
      "Completed foundational Lean Six Sigma training focused on process awareness, structured improvement thinking, and the discipline of examining workflows with clarity and consistency.",
    icon: ShieldCheck,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766945648/photo_8_2025-12-29_02-02-12_isahur.jpg",
    tags: ["Lean Six Sigma", "Process", "White Belt"],
    impact: "Strengthened process-oriented thinking for systems and workflows.",
  },
  {
    id: "freecodecamp-web-beginner-2023",
    title: "freeCodeCamp Web Beginner",
    category: "certifications",
    issuer: "freeCodeCamp",
    date: "2023",
    description:
      "Completed beginner web learning focused on the fundamentals of building for the web and strengthening the foundation that later grew into frontend and full-stack development work.",
    icon: ShieldCheck,
    tags: ["HTML", "CSS", "Web Basics"],
    impact: "Helped strengthen the base for modern frontend development.",
  },
  {
    id: "scrimba-basic-web-2024",
    title: "Scrimba Basic Web Course",
    category: "certifications",
    issuer: "Scrimba",
    date: "2024",
    description:
      "Completed foundational web coursework in HTML, CSS, and JavaScript to reinforce practical interface-building skills and improve web development fluency.",
    icon: ShieldCheck,
    tags: ["HTML", "CSS", "JavaScript", "Scrimba"],
    impact: "Reinforced core frontend skills through structured practice.",
  },
  {
    id: "coursera-python-part-1-2024",
    title: "Basics of Python Part 1",
    category: "certifications",
    issuer: "Coursera",
    date: "2024",
    description:
      "Finished introductory Python coursework covering core concepts and strengthening programming fundamentals that support scripting, logic building, and technical exploration.",
    icon: ShieldCheck,
    tags: ["Python", "Coursera", "Programming Basics"],
    impact: "Added stronger programming depth to an already growing stack.",
  },
  {
    id: "coursera-data-analytics-part-1-2026",
    title: "Basics of Data Analytics Part 1",
    category: "certifications",
    issuer: "Coursera",
    date: "2026",
    description:
      "Completed an introductory data analytics course focused on foundational analysis concepts, helping extend understanding of structured data, interpretation, and decision-support thinking.",
    icon: ShieldCheck,
    tags: ["Data Analytics", "Coursera", "Foundations"],
    impact: "Broadened technical range toward data-informed work.",
  },
  {
    id: "safe-space-round-table-support",
    title: "Technical Support for Safe Space Round Table Discussion",
    category: "professional",
    issuer: "Campus Event Support",
    date: "2025",
    description:
      "Provided technical support for the “Harassment? Not in Our Space!” Safe Space Round Table Discussion, helping keep the program flow stable and ensuring the event experience ran properly behind the scenes.",
    icon: Briefcase,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766939342/500442052_681027907890621_3151875760700323871_n_mkssn9.jpg",
    tags: ["Technical Support", "Safe Space", "Campus Program"],
    impact: "Supported a sensitive and important campus dialogue through reliable execution.",
  },
  {
    id: "technofair-support-2023-2025",
    title: "Technical Support for TCU CICT Technofair",
    category: "professional",
    issuer: "TCU CICT",
    date: "2023 - 2025",
    description:
      "Contributed technical and operational support for TCU CICT Technofair across multiple years, helping with execution, coordination, and the smooth flow of one of the department’s visible activities.",
    icon: Briefcase,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766945618/photo_45_2025-12-29_02-02-12_utofwa.jpg",
    tags: ["Technofair", "Technical Support", "Events"],
    impact: "Supported a recurring department event across multiple cycles.",
  },
  {
    id: "oathtaking-support-2025",
    title: "Technical Support for Oathtaking",
    category: "professional",
    issuer: "Campus Event Support",
    date: "2025",
    description:
      "Helped support the technical and operational side of the 2025 Oathtaking event, contributing to execution quality and making sure the event environment stayed organized and dependable.",
    icon: Briefcase,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766939337/500109484_681028714557207_3640813171578940291_n_yqiz9a.jpg",
    tags: ["Oathtaking", "Technical Support", "Execution"],
    impact: "Added dependable technical support to a formal campus milestone event.",
  },
  {
    id: "invited-event-organizer-support",
    title: "Invited to Support Event Organizing",
    category: "professional",
    issuer: "Partner Campus Events",
    date: "2025",
    description:
      "Was invited to assist with event organization beyond regular responsibilities, reflecting trust in planning, coordination, and execution skills developed through student leadership and technical event work.",
    icon: Users,
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766939316/500122427_681028194557259_7080048757823211543_n_yeecku.jpg",
    tags: ["Invited Support", "Coordination", "Event Organizing"],
    impact: "Recognized as someone trusted to help run events well.",
  },
];

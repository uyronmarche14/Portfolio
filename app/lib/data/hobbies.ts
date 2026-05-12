import {
  Briefcase,
  Building2,
  CalendarDays,
  Camera,
  Code,
  GraduationCap,
  Medal,
  Monitor,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface HobbyLink {
  label: string;
  url: string;
  icon?: LucideIcon;
}

export interface Hobby {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  colorClass: string;
  borderClass: string;
  image?: string;
  tags?: string[];
  years?: string;
  quote?: string;
  links?: HobbyLink[];
}

export const hobbiesData: Hobby[] = [
  {
    id: "coding-build-sessions",
    title: "Coding & Build Sessions",
    description:
      "A big part of my life outside classes and events has always been building. I spend long hours designing interfaces, fixing bugs, trying new stacks, and turning ideas into working systems. That habit became the bridge between school projects, freelance work, and professional software development.",
    icon: Code,
    colorClass: "bg-primary/10 text-primary",
    borderClass: "border-primary",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766945648/photo_8_2025-12-29_02-02-12_isahur.jpg",
    tags: ["Coding", "UI Building", "Problem Solving", "Systems"],
    years: "2018 - Present",
    quote: "Most of my best ideas start while building",
  },
  {
    id: "internship-journey",
    title: "Internship Journey",
    description:
      "My internship chapter helped sharpen how I work in real product environments. It pushed me to be more disciplined with collaboration, implementation quality, and communication while turning classroom knowledge into production habits.",
    icon: Briefcase,
    colorClass: "bg-accent/10 text-accent",
    borderClass: "border-accent",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766945647/photo_2_2025-12-29_02-02-12_il7zqb.jpg",
    tags: ["Internship", "Growth", "Product Work", "Collaboration"],
    years: "2024 - 2025",
    quote: "Learning by shipping changed how I build",
  },
  {
    id: "student-leadership",
    title: "Student Leadership",
    description:
      "Leadership became one of the strongest parts of my college journey. I handled officer roles, represented student groups, helped coordinate projects, and learned how to guide teams, support members, and keep work moving during busy academic seasons.",
    icon: Users,
    colorClass: "bg-primary/10 text-primary",
    borderClass: "border-primary",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766945619/photo_51_2025-12-29_02-02-12_xyzcw2.jpg",
    tags: ["Leadership", "Student Affairs", "Teamwork", "Representation"],
    years: "2023 - 2025",
    quote: "Leadership taught me how to serve and organize at the same time",
  },
  {
    id: "multimedia-team",
    title: "Multimedia Team",
    description:
      "I also spent time supporting the visual and media side of school activities. From assisting with event materials to helping capture moments and support presentation flow, this side of my work shaped how I think about communication and audience experience.",
    icon: Camera,
    colorClass: "bg-accent/10 text-accent",
    borderClass: "border-accent",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766945618/photo_45_2025-12-29_02-02-12_utofwa.jpg",
    tags: ["Multimedia", "Documentation", "Visual Support", "Creative Work"],
    years: "2024 - 2025",
    quote: "Good visuals help people feel the event, not just see it",
  },
  {
    id: "event-organizing",
    title: "Event Organizing",
    description:
      "Beyond coding, I’ve been deeply involved in planning, proposing, and handling events. I enjoy the pressure of making programs run smoothly, supporting technical needs, and helping teams turn an idea into something people actually experience.",
    icon: CalendarDays,
    colorClass: "bg-primary/10 text-primary",
    borderClass: "border-primary",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766939519/IMG_20250517_203753_807_ljfmdc.jpg",
    tags: ["Event Planning", "Execution", "Technical Support", "Coordination"],
    years: "2023 - 2025",
    quote: "I like being where planning turns into action",
  },
  {
    id: "invited-event-support",
    title: "Invited Event Support",
    description:
      "Being invited to help other events meant a lot to me because it showed trust in my ability to execute. Whether the work was technical, operational, or organizational, I became someone people could rely on when a program needed structure and support.",
    icon: Building2,
    colorClass: "bg-accent/10 text-accent",
    borderClass: "border-accent",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1766939316/500122427_681028194557259_7080048757823211543_n_yeecku.jpg",
    tags: ["Invited Support", "Campus Events", "Trust", "Execution"],
    years: "2025",
    quote: "Trust is earned when people ask you to help run the next one too",
  },
  {
    id: "it-olympics",
    title: "IT Olympics",
    description:
      "Competing in IT Olympics pushed me to perform under pressure and represent what I learned outside the classroom. These competitions strengthened my discipline, confidence, and ability to stay sharp in technical problem-solving environments.",
    icon: Trophy,
    colorClass: "bg-primary/10 text-primary",
    borderClass: "border-primary",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660322/cict5_wspa6y.jpg",
    tags: ["IT Olympics", "Cybersecurity", "Mobile Productivity", "Competition"],
    years: "2024 - 2025",
    quote: "Competition gave my skills a real stage",
  },
  {
    id: "research-competition",
    title: "Research Competition",
    description:
      "Research became more meaningful when I was able to present work in competitive and academic spaces. From thesis milestones to conference presentation opportunities, this part of my journey taught me how to defend ideas, present clearly, and treat systems as serious academic work.",
    icon: GraduationCap,
    colorClass: "bg-accent/10 text-accent",
    borderClass: "border-accent",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660321/be429328-3ebb-4d4f-b425-8f5f07654ce1_mgwu5h.jpg",
    tags: ["Research", "Thesis", "Presentation", "Conference"],
    years: "2025",
    quote: "Presenting your work teaches you to understand it even more deeply",
  },
  {
    id: "organization-life",
    title: "Organization Life",
    description:
      "Student organizations gave me a real place to practice responsibility. Meetings, proposals, projects, announcements, collaboration, and member support all trained me to work with structure while still staying flexible with people and changing situations.",
    icon: Users,
    colorClass: "bg-primary/10 text-primary",
    borderClass: "border-primary",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660318/459388087_1210395166778357_1242381946816835441_n_vrx5th.jpg",
    tags: ["Organizations", "Operations", "Campus Work", "Service"],
    years: "2023 - 2025",
    quote: "Organizations were where I learned to lead with other people, not above them",
  },
  {
    id: "system-fair-showcase",
    title: "System Fair & Showcases",
    description:
      "Showcasing systems in public spaces helped me grow more comfortable explaining products, demos, and technical decisions. It made me better at presenting not just what I built, but why it matters and how it solves real problems.",
    icon: Monitor,
    colorClass: "bg-accent/10 text-accent",
    borderClass: "border-accent",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1752335555/DSC01719_z6sgd6.jpg",
    tags: ["Showcase", "Demos", "Presentation", "System Fair"],
    years: "2024 - 2025",
    quote: "A system becomes stronger when you can explain it clearly",
  },
  {
    id: "academic-awards",
    title: "Academic Awards",
    description:
      "Recognition like graduating Cum Laude, becoming Student Leadership of the Year, and placing in thesis recognition carried weight because they reflected years of consistent work across academics, leadership, and project delivery.",
    icon: Medal,
    colorClass: "bg-primary/10 text-primary",
    borderClass: "border-primary",
    image:
      "https://res.cloudinary.com/ddnxfpziq/image/upload/v1752335710/pic1_hrf9ju.jpg",
    tags: ["Cum Laude", "Leadership", "Best Thesis", "Recognition"],
    years: "2025",
    quote: "Recognition feels best when it reflects the work behind it",
  },
];

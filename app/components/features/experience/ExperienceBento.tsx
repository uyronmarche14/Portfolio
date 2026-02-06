"use client";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import HeaderTitle from "@/components/ui/header";
import { timelineYears } from "@/lib/data/about";
import {
  Box,
  Briefcase,
  Code,
  GraduationCap,
  Laptop,
  Shield,
  Smartphone,
  Trophy,
} from "lucide-react";

// Helper to map icon strings to components
const getIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "trophy": return <Trophy className="h-4 w-4 text-muted-foreground" />;
    case "school": 
    case "graduation-cap": return <GraduationCap className="h-4 w-4 text-muted-foreground" />;
    case "laptop": return <Laptop className="h-4 w-4 text-muted-foreground" />;
    case "shield": return <Shield className="h-4 w-4 text-muted-foreground" />;
    case "android": return <Smartphone className="h-4 w-4 text-muted-foreground" />;
    case "blender": return <Box className="h-4 w-4 text-muted-foreground" />;
    case "code": return <Code className="h-4 w-4 text-muted-foreground" />;
    default: return <Briefcase className="h-4 w-4 text-muted-foreground" />;
  }
};

const ExperienceBento = () => {
  // Extract and transform specific experiences
  // We need to flatten the timelineYears to get accessible features
  
  // 1. Hero Item: Professional Contract (Freelance Developer)
  const freelanceExp = timelineYears
    .find(y => y.year === "2025")
    ?.features.find(f => f.title.includes("Professional Contract"));

  // 2. Internship
  const internshipExp = timelineYears
    .find(y => y.year === "2024")
    ?.features.find(f => f.title.includes("Internship"));

  // 3. 3D Architecture
  const blenderExp = timelineYears
    .find(y => y.year === "2025")
    ?.features.find(f => f.title.includes("3d Architechture"));

  // 4. IT Olympics (Cybersecurity)
  const olympicsCyberExp = timelineYears
    .find(y => y.year === "2023")
    ?.features.find(f => f.title.includes("Cybersecurity"));
    
  // 5. IT Olympics (Android)
  const olympicsAndroidExp = timelineYears
    .find(y => y.year === "2024")
    ?.features.find(f => f.title.includes("Android"));

  // 6. University (Summary)
  const universityExp = {
    title: "Bachelor of Science in IT",
    description: "Taguig City University (2021-2025). Dean's Lister, Officer roles in CSS and Robotics organizations.",
    icon: "school",
    header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 animate-pulse" />
  };

  // Construct items array with specific content from user reference
  const items = [
    {
      title: "Freelance Developer",
      description: (
        <div className="flex flex-col gap-3 h-full justify-end">
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">Building modern web and mobile applications for clients around the world.</p>
            <div className="flex flex-wrap gap-1.5">
                {["React.js", "React Native", "Node.js"].map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">{tag}</span>
                ))}
            </div>
            <div className="mt-2 pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="text-[10px] font-bold text-foreground">2 years</span>
                </div>
                <p className="text-[10px] text-muted-foreground italic">"Provided over 8 clients with different project mobile, web and such more"</p>
            </div>
        </div>
      ),
      header: (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/ddnxfpziq/image/upload/v1761991336/bg1_t0hqmn.jpg')] bg-cover bg-center opacity-60 transition-all duration-500 group-hover/bento:opacity-80" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/95 to-transparent" />
        </div>
      ),
      icon: <Briefcase className="h-5 w-5 text-primary" />,
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Student Leadership",
      description: (
        <div className="flex flex-col gap-3 h-full justify-end">
            <p className="text-xs text-muted-foreground leading-relaxed">Leading student organizations and clubs to success through effective planning.</p>
             <div className="flex flex-wrap gap-1.5">
                {["Leadership", "Event Planning", "Management"].map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">{tag}</span>
                ))}
            </div>
            <div className="mt-2 pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="text-[10px] font-bold text-foreground">4 years in College</span>
                </div>
                <p className="text-[10px] text-muted-foreground italic">"Organizational leadership & Team Management"</p>
            </div>
        </div>
      ),
      header: (
        <div className="relative w-full h-full overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/ddnxfpziq/image/upload/v1752335587/photo_2024-09-22_21-31-55_2_zegp01.jpg')] bg-cover bg-center opacity-60" />
             <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/95 to-transparent" />
        </div>
      ),
      icon: (
        <div className="flex gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <Briefcase className="h-4 w-4 text-primary" />
        </div>
      ),
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Mobile Development",
      description: (
         <div className="flex flex-col gap-3 h-full justify-end">
            <p className="text-xs text-muted-foreground leading-relaxed">Building cross-platform mobile applications with modern frameworks.</p>
             <div className="flex flex-wrap gap-1.5">
                {["React Native", "Android Studio", "Expo"].map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">{tag}</span>
                ))}
            </div>
            <div className="mt-2 pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="text-[10px] font-bold text-foreground">3 years</span>
                </div>
                <p className="text-[10px] text-muted-foreground italic">"Specialized in modern mobile applications"</p>
            </div>
        </div>
      ),
      header: (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/ddnxfpziq/image/upload/v1752335562/ict4_hibmup.jpg')] bg-cover bg-center opacity-60" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/95 to-transparent" />
        </div>
      ),
      icon: (
        <div className="flex gap-2">
            <Smartphone className="h-4 w-4 text-primary" />
            <Code className="h-4 w-4 text-primary" />
        </div>
      ),
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Poster Graphic Design",
      description: (
        <div className="flex flex-col gap-3 h-full justify-end">
            <p className="text-xs text-muted-foreground leading-relaxed">Creating visually appealing posters for events and promotions.</p>
             <div className="flex flex-wrap gap-1.5">
                {["Canva", "Design", "Visual Communication"].map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">{tag}</span>
                ))}
            </div>
            <div className="mt-2 pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="text-[10px] font-bold text-foreground">2 years</span>
                </div>
                <p className="text-[10px] text-muted-foreground italic">"Modern Designs"</p>
            </div>
        </div>
      ),
      header: (
        <div className="relative w-full h-full overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/ddnxfpziq/image/upload/v1752335526/a80b9819-8deb-4203-a284-a421b32dc81e_lrlptk.jpg')] bg-cover bg-center opacity-60" />
             <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/95 to-transparent" />
        </div>
      ),
      icon: (
        <div className="flex gap-2">
            <Box className="h-4 w-4 text-primary" />
            <Laptop className="h-4 w-4 text-primary" />
        </div>
      ),
      className: "md:col-span-1",
    },
    {
      title: "Web Development",
      description: (
         <div className="flex flex-col gap-3 h-full justify-end">
            <p className="text-xs text-muted-foreground leading-relaxed">Building responsive and intuitive user interfaces.</p>
             <div className="flex flex-wrap gap-1.5">
                {["React.js", "Next.js", "Tailwind CSS"].map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">{tag}</span>
                ))}
            </div>
            <div className="mt-2 pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="text-[10px] font-bold text-foreground">1 year</span>
                </div>
                <p className="text-[10px] text-muted-foreground italic">"Specialized in modern web applications"</p>
            </div>
        </div>
      ),
      header: (
        <div className="relative w-full h-full overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/ddnxfpziq/image/upload/v1770363154/photo_2026-02-06_15-30-20_iyrqgb.jpg')] bg-cover bg-center opacity-60" />
             <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/95 to-transparent" />
        </div>
      ),
      icon: (
         <div className="flex gap-2">
            <Code className="h-4 w-4 text-primary" />
            <Laptop className="h-4 w-4 text-primary" />
        </div>
      ),
      className: "md:col-span-2",
    },
  ];

  return (
    <section id="experience" className="py-20 relative w-full">
         <div className="mb-12 md:mb-16">
             <HeaderTitle 
            introText="About"
            highlightText="My Experiences"
            description="Your nonstop to experience everything"
          />  
        </div>
      <BentoGrid className="max-w-6xl ">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
);

export default ExperienceBento;

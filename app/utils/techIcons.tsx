import React from 'react';
import { 
  Code, 
  Laptop, 
  Smartphone, 
  Rocket, 
  Briefcase, 
  BookOpen, 
  Award
} from 'lucide-react';

// React Icons imports for programming languages
import { 
  FaPython, 
  FaJsSquare, 
  FaReact, 
  FaNodeJs, 
  FaJava, 
  FaGitAlt, 
  FaGithub, 
  FaDocker, 
  FaAws
} from 'react-icons/fa';

import { 
  SiTypescript, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiMongodb, 
  SiPostgresql, 
  SiFirebase, 
  SiGraphql, 
  SiRedux, 
  SiAndroidstudio, 
  SiFigma, 
  SiVercel, 
  SiNetlify, 
  SiHeroku
} from 'react-icons/si';

interface TechIconMap {
  [key: string]: {
    icon: React.ComponentType<{ className?: string; color?: string }>;
    color: string;
    type: 'react-icon' | 'lucide';
  };
}

export const techIconMap: TechIconMap = {
  // Programming Languages - React Icons
  python: { icon: FaPython, color: "#3776AB", type: "react-icon" },
  javascript: { icon: FaJsSquare, color: "#F7DF1E", type: "react-icon" },
  typescript: { icon: SiTypescript, color: "#3178C6", type: "react-icon" },
  csharp: { icon: Code, color: "#239120", type: "lucide" },
  java: { icon: FaJava, color: "#007396", type: "react-icon" },
  
  // Frameworks & Libraries - React Icons
  react: { icon: FaReact, color: "#61DAFB", type: "react-icon" },
  nextjs: { icon: SiNextdotjs, color: "#000000", type: "react-icon" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4", type: "react-icon" },
  nodejs: { icon: FaNodeJs, color: "#339933", type: "react-icon" },
  
  // Mobile Development - React Icons
  android: { icon: SiAndroidstudio, color: "#3DDC84", type: "react-icon" },
  reactnative: { icon: FaReact, color: "#61DAFB", type: "react-icon" },
  
  // General Tools - Lucide Icons
  laptop: { icon: Laptop, color: "#6B7280", type: "lucide" },
  code: { icon: Code, color: "#10B981", type: "lucide" },
  smartphone: { icon: Smartphone, color: "#3B82F6", type: "lucide" },
  rocket: { icon: Rocket, color: "#EF4444", type: "lucide" },
  briefcase: { icon: Briefcase, color: "#8B5CF6", type: "lucide" },
  book: { icon: BookOpen, color: "#F59E0B", type: "lucide" },
  award: { icon: Award, color: "#F59E0B", type: "lucide" },
  
  // Databases - React Icons
  mongodb: { icon: SiMongodb, color: "#47A248", type: "react-icon" },
  postgresql: { icon: SiPostgresql, color: "#336791", type: "react-icon" },
  mysql: { icon: SiPostgresql, color: "#4479A1", type: "react-icon" },
  firebase: { icon: SiFirebase, color: "#FFCA28", type: "react-icon" },
  
  // Cloud & DevOps - React Icons
  docker: { icon: FaDocker, color: "#2496ED", type: "react-icon" },
  aws: { icon: FaAws, color: "#FF9900", type: "react-icon" },
  vercel: { icon: SiVercel, color: "#000000", type: "react-icon" },
  netlify: { icon: SiNetlify, color: "#00C7B7", type: "react-icon" },
  heroku: { icon: SiHeroku, color: "#430098", type: "react-icon" },
  
  // APIs & Tools - React Icons
  git: { icon: FaGitAlt, color: "#F05032", type: "react-icon" },
  github: { icon: FaGithub, color: "#181717", type: "react-icon" },
  graphql: { icon: SiGraphql, color: "#E10098", type: "react-icon" },
  redux: { icon: SiRedux, color: "#764ABC", type: "react-icon" },
  
  // Design - React Icons
  figma: { icon: SiFigma, color: "#F24E1E", type: "react-icon" },
  
  // Default fallback
  default: { icon: Code, color: "#6B7280", type: "lucide" },
};

export const getTechIcon = (techName: string) => {
  if (!techName || typeof techName !== 'string') {
    return null;
  }

  // Normalize the tech name for better matching
  const normalizedName = techName.trim();
  
  // Direct match first
  if (techIconMap[normalizedName]) {
    return techIconMap[normalizedName];
  }
  
  // Case-insensitive search
  const lowerName = normalizedName.toLowerCase();
  
  // Check for exact case-insensitive match
  const caseInsensitiveMatch = Object.keys(techIconMap).find(
    key => key.toLowerCase() === lowerName
  );
  if (caseInsensitiveMatch) {
    return techIconMap[caseInsensitiveMatch];
  }
  
  // Handle common variations and aliases
  const variations: { [key: string]: string } = {
    // Language variations
    'javascript': 'javascript',
    'js': 'javascript',
    'typescript': 'typescript',
    'ts': 'typescript',
    'python': 'python',
    'py': 'python',
    'java': 'java',
    'csharp': 'csharp',
    'c#': 'csharp',
    
    // Framework variations
    'react': 'react',
    'reactjs': 'react',
    'react.js': 'react',
    'react native': 'react',
    'react-native': 'react',
    'reactnative': 'react',
    'next': 'nextjs',
    'nextjs': 'nextjs',
    'next.js': 'nextjs',
    'tailwind': 'tailwind',
    'tailwindcss': 'tailwind',
    'tailwind-css': 'tailwind',
    'tailwind css': 'tailwind',
    'nodejs': 'nodejs',
    'node.js': 'nodejs',
    
    // Mobile development
    'android': 'android',
    'android studio': 'android',
    'androidstudio': 'android',
    'android-studio': 'android',
    
    // Database variations
    'mongodb': 'mongodb',
    'mongo': 'mongodb',
    'postgresql': 'postgresql',
    'postgres': 'postgresql',
    'firebase': 'firebase',
    
    // Cloud & DevOps
    'docker': 'docker',
    'aws': 'aws',
    'vercel': 'vercel',
    'netlify': 'netlify',
    'heroku': 'heroku',
    
    // APIs & Tools
    'git': 'git',
    'github': 'github',
    'graphql': 'graphql',
    'redux': 'redux',
    
    // Design tools
    'figma': 'figma',
  };
  
  // Check variations
  if (variations[lowerName]) {
    return techIconMap[variations[lowerName]];
  }
  
  // Partial matching for compound names
  for (const [key, value] of Object.entries(variations)) {
    if (lowerName.includes(key) || key.includes(lowerName)) {
      return techIconMap[value];
    }
  }
  
  console.warn(`No icon found for technology: ${techName}`);
  return null;
};

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiPython,
  SiPhp,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiGraphql,
  SiRedux,
  SiFigma,
  SiAdobexd,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiAndroidstudio,
  SiXcode,
} from "react-icons/si";
import { IconType } from "react-icons";

interface TechIconMap {
  [key: string]: {
    icon: IconType;
    color: string;
  };
}

export const techIconMap: TechIconMap = {
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  Vue: { icon: SiVuedotjs, color: "#4FC08D" },
  Angular: { icon: SiAngular, color: "#DD0031" },
  Python: { icon: SiPython, color: "#3776AB" },
  PHP: { icon: SiPhp, color: "#777BB4" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  PostgreSQL: { icon: SiPostgresql, color: "#336791" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  Firebase: { icon: SiFirebase, color: "#FFCA28" },
  Tailwind: { icon: SiTailwindcss, color: "#06B6D4" },
  Bootstrap: { icon: SiBootstrap, color: "#7952B3" },
  SASS: { icon: SiSass, color: "#CC6699" },
  Git: { icon: SiGit, color: "#F05032" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  GCP: { icon: SiGooglecloud, color: "#4285F4" },
  Vercel: { icon: SiVercel, color: "#000000" },
  Netlify: { icon: SiNetlify, color: "#00C7B7" },
  Heroku: { icon: SiHeroku, color: "#430098" },
  GraphQL: { icon: SiGraphql, color: "#E10098" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  Figma: { icon: SiFigma, color: "#F24E1E" },
  "Adobe XD": { icon: SiAdobexd, color: "#FF61F6" },
  Flutter: { icon: SiFlutter, color: "#02569B" },
  Swift: { icon: SiSwift, color: "#FA7343" },
  Kotlin: { icon: SiKotlin, color: "#7F52FF" },
  Android: { icon: SiAndroidstudio, color: "#3DDC84" },
  iOS: { icon: SiXcode, color: "#147EFB" },
};

export const getTechIcon = (techName: string) => {
  const tech = techIconMap[techName];
  if (!tech) {
    console.warn(`No icon found for technology: ${techName}`);
    return null;
  }
  return tech;
};

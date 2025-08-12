import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiReact, 
  SiPrisma, 
  SiPostgresql, 
  SiMysql, 
  SiFirebase, 
  SiNodedotjs, 
  SiJavascript, 
  SiGooglemaps, 
  SiStripe, 
  SiRedux
} from 'react-icons/si';
import { IconType } from 'react-icons';

const techIconMap: Record<string, { icon: IconType; color: string }> = {
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'TailwindCSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'React': { icon: SiReact, color: '#61DAFB' },
  'Prisma': { icon: SiPrisma, color: '#2D3748' },
  'PostgreSQL': { icon: SiPostgresql, color: '#336791' },
  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'Firebase': { icon: SiFirebase, color: '#FFCA28' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'Google Maps API': { icon: SiGooglemaps, color: '#4285F4' },
  'Stripe API': { icon: SiStripe, color: '#635BFF' },
  'Redux': { icon: SiRedux, color: '#764ABC' },
  'C#': { icon: SiReact, color: '#239120' },
  'Java': { icon: SiReact, color: '#ED8B00' },
  'Android Studio': { icon: SiReact, color: '#3DDC84' },
  'WinForms': { icon: SiReact, color: '#0078D4' },
  'OpenAI API': { icon: SiReact, color: '#412991' },
};

export const getTechIcon = (technology: string) => {
  return techIconMap[technology] || { icon: SiReact, color: '#61DAFB' };
};
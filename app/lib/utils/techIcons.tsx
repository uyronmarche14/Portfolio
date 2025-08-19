import { Cpu, QrCode } from 'lucide-react';
import type { IconType } from 'react-icons';
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
  SiRedux,
  SiExpress,
  SiSupabase,
  SiHtml5,
  SiCplusplus,
  SiNetlify,
  SiRender
} from 'react-icons/si';

const techIconMap: Record<string, { icon: IconType; color: string }> = {
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  TailwindCSS: { icon: SiTailwindcss, color: '#06B6D4' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  React: { icon: SiReact, color: '#61DAFB' },
  Prisma: { icon: SiPrisma, color: '#2D3748' },
  PostgreSQL: { icon: SiPostgresql, color: '#336791' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  Firebase: { icon: SiFirebase, color: '#FFCA28' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Node Js': { icon: SiNodedotjs, color: '#339933' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  'Google Maps API': { icon: SiGooglemaps, color: '#4285F4' },
  'Stripe API': { icon: SiStripe, color: '#635BFF' },
  Redux: { icon: SiRedux, color: '#764ABC' },
  'C#': { icon: SiReact, color: '#239120' },
  Java: { icon: SiReact, color: '#ED8B00' },
  'Android Studio': { icon: SiReact, color: '#3DDC84' },
  WinForms: { icon: SiReact, color: '#0078D4' },
  'OpenAI API': { icon: SiReact, color: '#412991' },
  
  // SwiftPass Guard technologies
  'QR Code Scanner': { icon: QrCode, color: '#000000' },
  'Express Js': { icon: SiExpress, color: '#000000' },
  'Express.js': { icon: SiExpress, color: '#000000' },
  'Express.js (API)': { icon: SiExpress, color: '#000000' },
  Supabase: { icon: SiSupabase, color: '#3ECF8E' },
  'Supabase (Postgres, Auth, RLS)': { icon: SiSupabase, color: '#3ECF8E' },
  HTML: { icon: SiHtml5, color: '#E34F26' },
  ESP32: { icon: Cpu, color: '#FF6B35' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  
  // Solace Hotel technologies
  'Render (Express API hosting)': { icon: SiRender, color: '#46E3B7' },
  'Netlify (Next.js hosting)': { icon: SiNetlify, color: '#00C7B7' },
};

export const getTechIcon = (technology: string) => {
  return techIconMap[technology] || { icon: SiReact, color: '#61DAFB' };
};
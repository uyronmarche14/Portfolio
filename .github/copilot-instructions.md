# AI Agent Instructions for Portfolio Project

## Project Overview
This is a modern, single-page portfolio website built with Next.js 15, React 19, TypeScript, and TailwindCSS. The project uses the App Router pattern and emphasizes smooth animations and transitions using Framer Motion.

## Key Architecture Patterns

### Component Structure
- **Layout Components** (`app/components/`)
  - Single page layout with smooth scroll navigation
  - Each section (Home, About, Projects, Contact) is a separate component
  - UI components use shadcn/ui patterns with Radix UI primitives
  - Example: See `navbar.tsx` for component composition patterns

### Navigation & Routing
- Uses client-side smooth scrolling between sections
- Section active states are managed through scroll position
- Pattern: `scrollToSection` function in `Navbar` component

### Styling Conventions
- TailwindCSS with custom animations
- Consistent glassmorphism design pattern:
  ```tsx
  // Common glass effect classes
  "bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] shadow-2xl shadow-black/20"
  ```
- Dark mode friendly with opacity-based colors

### State Management
- React hooks for local state
- Example pattern from Navbar:
  ```tsx
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  ```

## Development Workflow

### Setup & Installation
```bash
npm install
npm run dev --turbopack
```

### Key Scripts
- `npm run dev` - Starts development server with Turbopack
- `npm run build` - Production build
- `npm run lint` - ESLint checking

### Component Development Guidelines
1. Follow existing patterns for animations using Framer Motion
2. Use shadcn/ui components from `components/ui/` for consistent design
3. Maintain responsive design with mobile-first approach

## Common Integration Points
- Framer Motion for animations
- Radix UI for accessible primitives
- Custom UI components in `components/ui/`

## Testing & Debugging
- Components should maintain smooth scroll behavior
- Check responsive design in both mobile and desktop views
- Verify animations work smoothly across browsers

## File/Directory Reference
- `/app/components/` - Main UI components
- `/app/data/` - Static data and constants
- `/app/lib/` - Utility functions and shared logic
- `/app/providers.tsx` - React context providers

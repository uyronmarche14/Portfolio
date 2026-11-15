# Portfolio V2 Component Map (AI draft)

New:
- `components/ui/CommandPalette.tsx`: Ctrl/Cmd+K (cmdk); entries derive from navbar, workExperience, projects, contacts data.
- `components/illustrations/HairlineFigure.tsx`, `LazyHairlineFigure.tsx`: themed, code-split Hairline wrapper.
- `components/features/stack/TechStackSection.tsx`: category filter + technology to projects.
- `components/features/projects/FeaturedProject.tsx`: editorial row.
- `components/architecture/ArchitectureDiagram.tsx`: lazy React Flow, read-only, with text fallback.
- `lib/data/architectures.ts`: diagrams (Solace Hotel only; others need verified repo docs).
- `lib/site.ts`, `app/robots.ts`, `app/sitemap.ts`.

Rewritten: `experience/ExperienceSection.tsx` (rail + panel, mobile accordion), `projects/ProjectsSection.tsx` (featured + filter/search archive), `work/WorkWithMeSection.tsx` (selectable 12 steps from `process.ts`).
Edited: `HomeSection`, `AboutSection`, `AchievementExplorer` (search), `navbar` (inert closed menu, no extra h1), `HobbyCarousel` (24px targets), `TechBadge`, `projectCard`, `projects/[id]/page.tsx` (architecture section, overflow fix).
Removed: `components/ui/illustrations` (robot mascot).
Now unused but kept: `experience/ExperienceVisuals*`, `experience/visuals`.

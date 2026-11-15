# Portfolio V2 Audit (AI draft, not approved)

Date: 2026-11-15. Read-only findings from the `portfolio-v2` copy.

## Stack
- Next.js 16.1.5 (App Router), React 19.2, TypeScript 5, Tailwind 3.4, `output: "standalone"`.
- UI deps already installed: Radix (accordion, avatar, dialog, separator, slider, slot), framer-motion 11, embla-carousel-react, lucide-react, reactflow 11, vaul, next-themes, react-icons.
- Not installed: cmdk, shiki, Hairline.
- Tests: jest (2 test files found). Quality: `typecheck`, `lint`, `format:check`, `test:ci`.

## Content inventory (preserve all)
- Projects: 12 (`app/lib/data/projects.ts`).
- Achievements: 22 (`achievements.ts`). Experience: 6 (`workExperience.ts`).
- Activities: `hobbies.ts` (count not yet verified).

## Routes
`/`, `/experience`, `/experience/[id]`, `/process`, `/projects/[id]`.

## Findings / risks
- Deployment target not determined: no wrangler config; last commit mentions a Cloudflare Worker. CI uses npm (`npm ci`) while CORE says Bun. Needs owner decision.
- Three lockfiles (npm, pnpm, bun). Not removed without approval.
- `NAV_ITEMS` has only Home/About/Projects/Contact; Experience route is not in the navbar.
- Themes: dark (default), bw, light. Dark tokens now follow the V2 palette.
- `bun install` blocked one postinstall script; not yet reviewed.
- Lint: 0 errors, 11 warnings.

## Not yet audited
Lighthouse baseline, image assets/alt text, broken links, SEO metadata, a11y pass.

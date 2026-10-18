# Portfolio Redesign Plan (AI draft, not approved)

Status: proposal. Nothing here is an approved requirement.

## Goal
Replace the neo-brutalist look with a calm, stable, personal design. A restyle must be a token edit, not a hunt through components.

## Direction
- Base: Notion (warm off-white, near-black text, hairline borders, whitespace) + Expo (one sans family + mono, near-monochrome, one accent for interactive elements only).
- Structure: numbered sections (01-05), numbered project list with year / role / stack, status line ("Accepting new projects"). Refs: Pablo Miguez, Jeff Brokaw, cagd.as.
- Assets: real project screenshots with "Fig. N" captions, not stock or icons.
- Personality: first-person, specific, slightly self-aware copy; mono sticker labels; one signature interaction (decided in Phase 6).
- Avoid: gradients, glows, uniform card grids, mixed accents.
- Open question for the owner: the motif / signature interaction (Phase 6).

## Branch rules
- `main` is never touched. It keeps the current design.
- `staging` is the integration branch. Local only unless the owner says otherwise.
- Each phase = one branch cut from the latest `staging`, merged back into `staging` with `--no-ff` after its checks pass.
- Branch names: `phase-N/<slug>`.
- Per phase: `npm run type-check`, `npm run lint`, `npm run build`, then a visual check in `npm run dev` before merging.
- Rollback = `git revert -m 1 <merge commit>` on `staging`.

## Phase 0 - Baseline and cleanup  (`phase-0/baseline`)
- [ ] Commit the already-made CLI + chatbot removal (currently uncommitted on `staging`).
- [ ] Fix `npm ci` (package-lock vs pnpm-lock conflict; pick one, with owner approval).
- [ ] Fix `app/fonts/Poppins-Variable.ttf` (it is a saved HTML page, not a font).
- [ ] Record a clean baseline: type-check, lint, build.
- [ ] Screenshot current pages for before/after comparison.
Done when: install, type-check, lint and build pass with no design change.

## Phase 1 - Design tokens  (`phase-1/tokens`)
- [ ] `globals.css`: semantic tokens with foreground pairs (`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--muted`, `--border`, `--accent`, `--radius`, `--shadow-*`).
- [ ] Type scale and spacing scale tokens.
- [ ] `tailwind.config.js`: map every color / radius / font to the tokens; remove raw hex (`tertiary`, `card`, `popover`, `muted`, `destructive`).
- [ ] Keep light + dark; dark overrides the same tokens.
- [ ] Old `.brutalist-*` classes stay for now so the site looks unchanged.
Done when: the site is visually identical but all colors come from tokens.

## Phase 2 - Typography and fonts  (`phase-2/typography`)
- [ ] Pick the font pairing from the reference sites' real CSS (curl each site), one sans + one mono.
- [ ] Load via `next/font`, remove unused fonts (Rawkner, broken Poppins).
- [ ] Heading / body / mono-label styles as tokens.

## Phase 3 - Primitives  (`phase-3/primitives`)
- [ ] `Button` (cva variants: primary, secondary, ghost, link; sizes), `Card`, `Badge`/`Label`, `Section` + numbered heading.
- [ ] Replace the 19 raw `<button>` tags and one-off styles with `Button`.
- [ ] `TechBadge`, `projectCard`, `header` use tokens only.
Done when: changing `--primary` or `--radius` restyles every button and card.

## Phase 4 - Layout and navigation  (`phase-4/layout`)
- [ ] Navbar, footer, `SinglePageLayout`, container widths, section rhythm.
- [ ] Replace `CleanGridBackground` (8000 DOM cells) with plain background or a cheap CSS pattern.
- [ ] Remove the footer blur blobs and `GlobalBackground` effects if not in the new direction.

## Phase 5 - Sections  (one branch per section, in this order)
- [ ] `phase-5a/hero` - stacked name, status line, one CTA.
- [ ] `phase-5b/projects` - numbered list: year, role, stack, "Fig." screenshots; update `projectCard` and `projects/[id]`.
- [ ] `phase-5c/about` - accordion / numbered blocks, timeline (see `docs/PLAN-timeline-redesign.md`).
- [ ] `phase-5d/work-with-me-contact` - header consistent with other sections, contact form (EmailJS), testimonials if available.
- [ ] `phase-5e/process-and-misc` - `/process`, 404 pages, error and loading states.

## Phase 6 - Personality  (`phase-6/personality`)
- [ ] Rewrite copy in first person (hero, section intros, empty states, 404, footer).
- [ ] Mono sticker labels ("currently building", "open to work").
- [ ] One signature interaction chosen by the owner (custom cursor, cursor glow, or scroll-changing name). Respect `prefers-reduced-motion`.

## Phase 7 - Quality pass  (`phase-7/qa`)
- [ ] Accessibility: contrast on both themes, focus states, keyboard nav, alt text.
- [ ] Responsive check at 360 / 768 / 1280.
- [ ] Performance: Lighthouse, bundle (`build:analyze`), image sizes.
- [ ] Remove dead `.brutalist-*` CSS, `shadow-brutal*`, unused components, duplicate lockfile.
- [ ] Tests: update or add Jest tests for `Button` and any new logic.

## Phase 8 - Release decision (owner only)
- [ ] Owner reviews `staging`.
- [ ] Only on explicit approval: PR `staging` -> `main`.

## Risks
- No working install yet, so type-check, lint and build are currently unverified (Phase 0).
- Reference-site values come from third-party descriptions; confirm with real CSS in Phase 2.
- Tailwind is v3; staying on v3 avoids a migration mid-redesign.

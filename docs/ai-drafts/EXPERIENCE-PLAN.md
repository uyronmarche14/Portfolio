# Experience Section Redesign Plan (AI draft, not approved)

Status: proposal. Nothing here is an approved requirement.

## Input
The pasted "Universal Adaptive UI/UX Design System" prompt. It refers to a "supplied reference image" that did not come through; this plan is built from the prompt text plus the current site direction (warm paper / ink / one orange accent, Rawkner display, Inter body, Geist Mono labels, numbered sections).

## Current state
`app/components/features/experience/ExperienceBento.tsx` + `ui/bento-grid.tsx`: 5 roles in a 2-column grid of identical image cards (grayscale photo, corner pattern, icon box, mono tags). It is the same card repeated 5 times; the photos carry no information about the role.

Data (`app/lib/data/workExperience.ts`): id, role, company, dateRange (free text), summary, stack[], highlight, image.

## Section analysis (per the prompt's steps 1-5)
- **Purpose:** show where, when and in what capacity the owner has worked; credibility for hiring/clients.
- **Content hierarchy:** role + company > dates > what was built (summary/highlight) > stack > photo.
- **What is distinctive in the data:** the dates. Roles overlap (Freelance Jan 2024 - Present runs under the others), which a card grid hides.
- **Layout choice:** other sections already use grid (Projects, Activities carousel, Achievements list+panel, Journey accordion). Experience should be different: an editorial ledger with a timeline visual, not another card grid or master-detail.
- **Visual medium:** one original, data-driven SVG (a "tenure strip" showing each role as a bar on a shared 2024-2026 time axis) plus text-led rows. Photos become small captioned figures, not the hero of each row.

## Target design
1. **Header:** existing `HeaderTitle` (index 02), unchanged.
2. **Tenure strip (SVG):** horizontal axis Jan 2024 to the latest end date; one bar per role, stacked in rows, labelled with company in mono; the open-ended role (Freelance) fades out to the right edge as "Present". Bars draw in once on scroll (stroke/width transform), static under reduced motion. On small screens it collapses to a vertical list (no horizontal scroll).
3. **Role rows (editorial split, not cards):** per role, a hairline-separated row:
   - left (mono, small): date range + duration
   - main: role (Rawkner), company (mono, primary), summary (sans), stack as outline badges
   - right/below: highlight as a pull-quote line + one small rounded photo with "Fig. NN / Company" caption
   - Hovering a row highlights its bar in the strip (and vice versa); keyboard focus does the same.
4. Rows alternate nothing: consistent left alignment keeps it calm; variety comes from the strip, not from zig-zagging.
5. No fake controls: any hover/focus linking is real and works without JS motion.

## Data changes
Add `start` and `end` (ISO `YYYY-MM`, `end: null` for present) to `WorkExperienceEntry`; keep `dateRange` for display. `buildfast` has only "2025 - 2026" (no months) -> needs owner confirmation of real months, or it is drawn as a full-year bar and labelled approximate.

## Implementation phases (one branch each, cut from `staging`, merged with --no-ff)
| Phase | Branch | Work | Check |
|---|---|---|---|
| 6a | `phase-6a/experience-data` | Add `start`/`end` to data + a small `tenure` helper (months, duration label, axis range). Unit test the helper. | jest passes |
| 6b | `phase-6b/experience-strip` | `ExperienceTenureStrip.tsx` (SVG, responsive via viewBox, a11y: `role="img"` + `aria-label`, data table fallback via visually hidden list). | tsc, screenshot dark+light, 360/768/1280 |
| 6c | `phase-6c/experience-rows` | `ExperienceRow.tsx` + rewrite `ExperienceBento` -> `ExperienceSection`; wire hover/focus link with the strip. | screenshots, keyboard check |
| 6d | `phase-6d/experience-motion` | Scroll-reveal (opacity/transform, 300-500ms), bar draw-in, `prefers-reduced-motion` off-switch. | reduced-motion check |
| 6e | `phase-6e/experience-cleanup` | Delete `bento-grid.tsx` and `BrutalistCornerPattern.tsx` if unused; update docs. | build, lint, grep for dead refs |

Order: 6a -> 6b -> 6c -> 6d -> 6e. `main` untouched; `staging` only.

## Reuse
Badge, Button, SectionHeading/HeaderTitle, tokens (`--primary`, `--foreground`, `--secondary`, `--radius`), framer-motion 11 (already installed). No new dependencies.

## Risks / open questions for the owner
1. Reference image missing: send it if the target look differs from the above.
2. `buildfast` and `keepitsimpleos` dates: confirm months (affects the strip).
3. Are the role photos meaningful? If not, drop them and keep the rows text-only.
4. Keep an "Experience" photo at all, or let the strip be the only graphic?
5. Light mode and phone widths must be checked per phase (previous phases skipped this).

# Experience Visuals: Depth Plan (AI draft, not approved)

Status: proposal. Nothing here is an approved requirement.

## Problem
The five SVGs in `app/components/features/experience/ExperienceVisuals.tsx` are flat wireframes: grey bars as text, boxes nested in boxes, thin outlines, almost no overlap. They read as placeholders next to the rest of the site.

## Principles (from the earlier briefs)
- Original artwork per role; no invented products or features. Details come only from the role summaries in `workExperience.ts`.
- 2-3 visual layers per drawing, not nested boxes.
- One orange focal element per drawing; everything else neutral.
- Motion only where it explains the role; respect `prefers-reduced-motion`.
- Colors from theme tokens so light/dark both work. No heavy glow or gradients.

## Depth system (shared, built first)
New file `ExperienceVisualKit.tsx` with reusable SVG primitives so each illustration stays short:
| Primitive | Purpose |
|---|---|
| `<DepthDefs />` | one `<defs>` block: soft drop shadow filter (`feDropShadow`, color = `--foreground` at 10-16%), a subtle top-light gradient for surfaces |
| `Surface` | rounded rect with fill, 1px inset hairline, optional elevation 1-3 (shadow strength) |
| `Window` | browser/app window: title bar, traffic dots, content slot |
| `Device` | phone frame with notch |
| `Label` | mono text with a fixed size scale (11/12/13) |
| `Pill` | tag/status chip matching the site's Badge |
| `Connector` | dashed or solid path between layers, optionally animated draw |

Elevation rule: back layer elevation 0 (flat on the panel), middle 1, front 2. Overlaps of 12-24px between layers sell depth; shadows fall down-right consistently.

## Per-role redesign
| Role | Concept (from the data) | Layers | Focal accent | Motion |
|---|---|---|---|---|
| Freelance | one product delivered to web and mobile, AI-assisted | back: browser window; front: phone overlapping its right edge; small "refactored" chip | the phone's primary button | phone slides in 400ms after the window |
| Aique | reusable React UI across user roles + API | back: component sheet (button/input/toggle); front: role switcher card (Admin/Staff/Member) with the active role changing the cards' content | active role pill | switching role crossfades the card content (real interaction, not a fake control: label it a preview) |
| Beyondgen | multi-step approval workflow + audit logs, SQL Server | back: workflow track with 3 steps; front: audit-log card overlapping, rows with real status words (submitted / reviewed / approved) | the current step node | track draws step by step; log rows appear in sequence |
| KeepItSimpleOS | trainer-client messaging + performance tracking | back: progress chart card; front: chat panel overlapping with 3 messages | the newest message bubble | message bubble pops in once |
| BuildFast | script generation + video tooling | back: timeline panel; front: script card with highlighted line feeding a preview frame | the highlighted script line | playhead scrubs across, then rests |

Text inside drawings uses only generic, true-to-role words (no fabricated company data, names or metrics).

## Panel styling
Visual panel keeps the surface tint (`bg-foreground/[0.05]`) and gets a very soft radial highlight at the top-left (opacity <= 6%) so shadows have light to fall away from. No border between halves.

## Phases (each on its own branch from `staging`, merged --no-ff)
| Phase | Branch | Work | Check |
|---|---|---|---|
| 9a | `phase-9a/visual-kit` | `ExperienceVisualKit.tsx` primitives + defs; no visible change yet | tsc, build |
| 9b | `phase-9b/visual-freelance` | rebuild Freelance with the kit | screenshots dark/light, 1280 + 390 |
| 9c | `phase-9c/visual-workflow` | Beyondgen (draw-in workflow + log) | same + reduced-motion |
| 9d | `phase-9d/visual-aique` | Aique with role-switch preview | same + keyboard |
| 9e | `phase-9e/visual-chat` | KeepItSimpleOS | same |
| 9f | `phase-9f/visual-video` | BuildFast | same |
| 9g | `phase-9g/visual-polish` | consistent shadow/light across the five, panel highlight, remove old helpers | side-by-side review |

## Verification per phase
- Screenshot at 1280 and 390, light and dark; compare against the previous version.
- Contrast check on text inside the drawings.
- `prefers-reduced-motion`: drawings static and complete.
- No horizontal overflow on mobile; drawing scales via viewBox.
- Build, type-check, lint.

## Risks / open questions
1. Drop-shadow filters on five SVGs are cheap, but animated filters are not; shadows stay static.
2. The Aique role-switch is a small interactive preview; confirm it is wanted, otherwise use a static state.
3. Which role first? Suggested order above (Freelance first as the most visible).
4. Real screenshots of your actual work would beat any illustration; if you have safe-to-show ones, tell me which roles.

# Illustrations & Mascot Plan (AI draft — not approved)

Status: proposal. Not an approved requirement. Do not build until reviewed.

## Goal
Replace small icons with large, modern flat-editorial vector illustrations plus one recurring mascot, themed per project, to position the portfolio as Technical Business Analyst + full-stack (requirements, dashboards, data).

## Style rules
- Flat vector, bold shapes, 2–3 tones from existing `--tone-*` tokens, 1px ink outline, offset shadow, dot-grid backdrop (matches current globals.css).
- Colors read from CSS variables only, so light/dark and per-project accents recolor automatically.
- Inline SVG React components; no raster unless later needed. Target < 15 KB each.
- Mascot: simple character ("analyst bot" / clipboard face), 5 poses: wave, think, present-chart, debug, sleep.

## Scene list
| Area | Scene |
|---|---|
| Home hero | Mascot at desk, floating KPI/workflow cards (large, ~50% viewport) |
| Requirements | Workflow board with traceability arrows |
| Analytics | KPI wall + funnel chart |
| Process | Handoff: analyst → dev → QA |
| Contact | Mailbox / mascot waving |
| 404 / empty / loading | Mascot poses |
| Projects (12) | One banner each (16:7): Codex Express (calendar), Reservation Desktop, Jobint (interview), Best Brew (cafe), SwiftPass (gate), Solace Hotel (lobby), LMS, SQM, CICT, Archon, AiLead, Command Center |
| Experience roles (6) | iOPEX, Beyondgen, BuildFast, Keep It Simple, Aique, Freelance |

## Implementation sketch (keep simple)
1. Add optional `theme: { accent: 'orange'|'violet'|'teal'|'amber'|'rose'; scene: string }` to project data (`app/lib/data/projects.ts`).
2. One `app/components/ui/illustrations/` folder: one component per scene + `Mascot.tsx` (`pose` prop). A plain lookup map by scene name; no registry/factory.
3. Case-study and experience pages set `--accent` from `theme.accent` and render the banner.
4. Draft SVGs in Figma first, export, then wrap as components.

## Phases
1. Mascot + hero + tokens per project (visible win).
2. Project banners (start with 3 flagship projects).
3. Section illustrations (Requirements, Analytics, Process, Contact).
4. Remaining projects, experience scenes, 404/empty states.

## Validation
Typecheck, lint, visual check light/dark at mobile and desktop, contrast of accents, bundle size check, reduced-motion respected for any animation.

## Open questions
- Mascot concept and name?
- Which 3 projects are flagship?
- Draft SVGs by Claude, or designed in Figma by owner?

# Interactive role graphics (AI draft, not approved)

Status: proposal. Not an approved requirement.

**Progress (2026-11-19):** phase 1 is built and verified in a browser: shared `useAutoplay` hook (`features/experience/useAutoplay.ts`),
interactive iOPEX (KPI/SLA/Trend/Triage tabs on synthetic data) and Beyondgen (role-gated approval workflow with audit log),
the Visual/Photo toggle moved out of the overlay into its own row, and an "At a glance" section on every `/experience/<role>` page.
Still static loops: Aique, KeepItSimpleOS, BuildFast, Freelance (phases 2 and 3). The owner confirmed the panels should also appear on the role pages.

## Goal
The six "Where I have worked" card graphics are clean now but they only loop on their own. Make each one a small
**working UI the visitor can use** (tabs, toggles, drag, click) so the section feels modern and shows how the work behaved,
without a literal "step 1, step 2" stepper.

## Design pattern (shared by all six)
1. **Autoplay first, then hand over control.** The loop keeps playing until the first touch, click or keypress, then stops
   and the visitor drives. A small "Auto" chip resumes the loop. This keeps the card alive for people who never interact.
2. **One segmented control per panel**, drawn in HTML (not SVG) so it is accessible: `role="tablist"`, arrow-key
   navigation, visible focus. The active indicator slides between options using a shared `layoutId` (Motion layout
   animation), which is the standard, documented tabs technique.
3. **The graphic reacts to the control.** The SVG scene stays, but its state comes from React state instead of a fixed
   timeline, so every click animates between real states.
4. **Reduced motion:** no autoplay, instant state changes, resting pose.
5. **No new dependency.** The site already uses framer-motion 11 (`motion` renamed upstream; `layout`/`layoutId` are available).

## Per role
| Role | Interaction | What it shows |
|---|---|---|
| iOPEX | Tabs: KPI, SLA, Trend, Triage; click a bar or point for its definition (reuses `KPI_DEFINITIONS`) | How a dashboard is read, and that each KPI has a definition |
| Beyondgen | Role switch (Supplier, Checker, Approver) plus a "Submit" button that advances a record; allowed actions change per role and each action adds an audit-log row | Role-gated approval workflow and audit trail |
| Aique | The role pills and toggles become clickable; the shown request line updates | One interface adapting to role |
| BuildFast | Draggable timeline playhead; clicking a script line jumps the playhead and the preview | Script to video workflow |
| KeepItSimpleOS | Tabs: Chat, Progress; "Send" adds a message and a reply; progress bars fill on selecting a metric | Trainer-client messaging next to tracking |
| Freelance | Web / Mobile toggle morphs the same product between layouts; "Book now" shows a confirmation | One product, two surfaces |

## Implementation sketch
- New shared pieces in `app/components/features/experience/`:
  - `ExperienceControls.tsx`: `SegmentedControl` (tablist, `layoutId` indicator) and the "Auto" chip.
  - `useAutoplay.ts`: autoplay that stops on first interaction and respects reduced motion (generalizes `Lifecycle` in
    `features/projects/ProjectDeepDive.tsx`).
- Convert the six `visuals/*.tsx` from fixed `Loop` timelines to state-driven scenes, reusing `Panel`, `Grow`, `DrawPath`.
- `ExperienceSection.tsx` keeps its Visual/Photo toggle; controls sit inside the visual's panel.
- Pause the loops when off screen (already done through `usePlay`).

## Phases
1. Shared controls and autoplay hook, then iOPEX and Beyondgen (the analyst-relevant ones).
2. Aique, KeepItSimpleOS.
3. BuildFast, Freelance.

## Verification
Typecheck, lint, tests; a Playwright pass per card (click each control, keyboard-tab through, reduced motion, 390 px width);
no hydration errors in the console.

## Open questions
- The Qube Locker site was not reachable during research (the likely domains failed SSL, did not resolve, or were an
  unrelated store). Which URL, or which parts of it, should this borrow from?
- Should the interactive panels also appear on the `/experience/<role>` pages, or only on the home cards?

## Sources consulted
- Motion layout animations: https://motion.dev/docs/react-layout-animations
- Shared layout / tabs indicator pattern: https://www.mintlify.com/motiondivision/motion/api/shared-layout
- Scrollytelling references: https://github.com/jsonkao/react-scrollama and https://hsunpei.github.io/react-scrollytelling/framer-motion

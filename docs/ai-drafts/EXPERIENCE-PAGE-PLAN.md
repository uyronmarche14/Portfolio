# Experience Page (docs/reading style) Plan (AI draft, not approved)

Status: proposal. Nothing here is an approved requirement.

## Goal
A dedicated `/experience` page in a documentation / API-reference reading style: calm, very readable, generous spacing, pictures as figures. The home page Experience section gets a button that leads to it.

## Research summary (secondhand, check live sites before copying numbers)
- Common docs layout: left navigation, a constrained reading column, and a right "On this page" rail; right rail hides under ~1024px, left nav under ~720px. Example proportions seen: ~240px nav, ~760px article, ~220px rail.
- Body 16-18px, line-height ~1.5-1.7, line length ~50-75 characters (66 is the common target), paragraph spacing ~0.5-1em, code at 1.5-1.7 line height.
- Headings get stable anchors; sticky rail with scrollspy highlights the current section; `position: sticky` is enough, no library needed.
- Sources were generic typography guides; I found no primary analysis of Stripe/Mintlify/Vercel docs. Visual details below are my own design choices, not copies.

## Content reality check (important)
`workExperience.ts` has, per role: role, company, dates, one 40-word summary, 4 stack items, one highlight line, one photo. That is thin for a long reading page. Options:
1. Use only what exists, structured clearly (page is short, spaced, easy to read).
2. Owner supplies 3-5 bullets per role (responsibilities, what was built, outcome); page becomes a real reference document. I will not invent work history.
Recommendation: build with option 1 now, with a data field `details?: string[]` ready so option 2 is a content-only change.

## Page design
Route `app/experience/page.tsx`, reuses the site Navbar/Footer and theme tokens (light/dark).

Layout (desktop >= 1024px): 240px left nav | article max 720px (about 66 characters) | 200px "On this page" rail. Tablet: article + rail hidden. Mobile: single column, nav becomes a horizontal role switcher at the top.

Left nav: page title "Experience", list of roles (company + dates), active role highlighted; links jump to anchors.

Article (one section per role, 96px between sections, `scroll-margin-top` for the fixed navbar):
- Eyebrow: dates and duration (mono 12px).
- H2: role title (Inter semibold ~32px, tight tracking); H3-level labels: Overview, Stack, Highlight.
- **Meta table** (definition list): Role / Company / Period / Duration / Stack. Hairline rows, no boxes.
- **Overview**: the summary as prose (17px / 1.7), the existing marker phrases kept as plain emphasis (weight 500), not highlighter, to keep it calm.
- **Stack**: tag badges (site Badge).
- **Callout**: the role highlight as a quiet note block (left rule, small label "Highlight").
- **Figure**: the role photo, full article width, 16:9 crop, rounded 12px, caption in mono ("Aique Innovation Solutions Corporation").
- **Response block** (docs flavor, optional): a code-style block showing the same facts as a small JSON object (`role`, `company`, `period`, `stack`) with a copy button. Real data only. If it feels gimmicky in review, drop it.
- Prev/next role links at the bottom of each section.

Right rail "On this page": the sections of the role currently in view (Overview, Stack, Highlight, Photo) with scrollspy; sticky.

Typography: Inter for everything on this page including headings (no Rawkner) to keep it reading-oriented; mono for dates, code and captions. One accent (orange) for the active nav item and links only.

## Home page button
In `ExperienceSection` (home): a centered `Button` ("Read the full experience") below the cards, linking to `/experience`; each card also gets a small "Read more" text link to `/experience#<role-id>`.

## Phases (branches from `staging`, merged --no-ff)
| Phase | Branch | Work | Check |
|---|---|---|---|
| 11a | `phase-11a/experience-route` | route, page shell, 3-column layout, responsive collapse | screenshots 1440/1024/390 |
| 11b | `phase-11b/experience-content` | role sections: meta table, prose, stack, callout, figure, response block | screenshots dark/light, copy button |
| 11c | `phase-11c/experience-nav` | left nav + right rail with scrollspy (IntersectionObserver), anchors, prev/next | keyboard, reduced motion, deep link to `#aique` |
| 11d | `phase-11d/experience-links` | home button + per-card links, back link on the page | click-through test |
| 11e | `phase-11e/experience-qa` | contrast, focus states, line length check (~66ch), Lighthouse a11y, build/lint | report |

## Risks / questions for the owner
1. Do you want to provide extra bullets per role (option 2)? Without them the page is short and the docs framing may feel larger than the content.
2. Keep the JSON-style "response block"? It signals the API-docs idea but is decorative.
3. Headings in Inter (not Rawkner) on this page: OK? It will look different from the home sections by design.
4. Include an "On this page" rail when each role section is small? Could be limited to role-level links.

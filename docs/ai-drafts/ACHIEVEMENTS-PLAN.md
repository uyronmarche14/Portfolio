# Achievements Redesign Plan (AI draft, not approved)

Status: proposal. Nothing here is an approved requirement.

## Current state
`app/components/features/achievements/AchievementExplorer.tsx`: sliding-pill category tabs, then a master-detail layout (scrolling list of 20 items on the left, one large detail card on the right), plus a horizontal carousel on mobile.
Data (`achievements.ts`): 20 items, 5 categories (school 3, college 4, competitions 4, certifications 5, professional 4), 16 with photos. Fields: title, issuer, date, description, icon, image?, tags?, certificateUrl?, impact?.

Problems:
- Long titles truncate in the left list ("Student Leadership of t...").
- Only one item is readable at a time; 20 items means a lot of clicking to scan.
- The detail card repeats the Experience/Activities pattern of "big photo + text".
- Mostly photos; certificates (the strongest proof) are not shown as such.

## Direction
Different shape from the other sections (Experience = stacked cards, Activities = carousel, Journey = accordion): a **featured highlight + scannable ledger**, with details opening on demand.

### 1. Featured highlight (top)
One large editorial card for the most important item (Cum Laude), same card system as Experience: two halves, same background, rounded 16px, hairline border. Left: label, title, issuer, date, short description, tags. Right: photo (rounded inset) or a custom badge illustration if no photo. Which item is featured is a data flag (`featured: true`), default the first.

### 2. Category tabs (keep)
Existing sliding-pill tabs with the 5 custom icons; they filter the ledger.

### 3. Ledger (main change)
A compact table-like list, one row per achievement, grouped by the active filter:
| Date | Title (full, wraps) | Issuer | Category tag | arrow |
- 56px rows, hairline separators, no nested boxes.
- Hover: the row tints; on desktop a small photo preview follows into view at the right (reuse the thumbnail preview pattern from Experience).
- Rows animate in with a short stagger when the filter changes (opacity/translate only, reduced-motion safe).
- Full titles, no truncation; wraps to two lines on mobile.

### 4. Detail dialog (on click)
Click/Enter opens a dialog (shadcn `Dialog` already in the app): photo on top, title, issuer and date, description, impact line, tags, and a "View certificate" button when `certificateUrl` exists. Arrow keys / buttons go to previous/next item in the current filter. Replaces the permanent detail panel, which frees the layout.

### 5. Mobile
Ledger rows stack (date above title); dialog is full width; no horizontal carousel.

## Visual language
Same tokens as the rest: Rawkner section heading (centered, existing header), Inter body, mono for dates/labels, tag badges from the new Badge system, one orange accent for the active tab and focus states. Icons: the 5 custom category icons in the category tag and tabs.

## Phases (each on its own branch from `staging`, merged --no-ff)
| Phase | Branch | Work | Check |
|---|---|---|---|
| 10a | `phase-10a/achievements-data` | add optional `featured` flag + helper to pick the featured item; no UI change | tsc, build |
| 10b | `phase-10b/achievements-featured` | featured card (two halves, same bg) | screenshots dark/light, 1280/390 |
| 10c | `phase-10c/achievements-ledger` | ledger rows + hover preview + filter animation | screenshots, keyboard, reduced motion |
| 10d | `phase-10d/achievements-dialog` | detail dialog with prev/next + certificate button | keyboard, focus trap, mobile |
| 10e | `phase-10e/achievements-cleanup` | remove old master-detail/carousel code, update header copy | build, lint, grep dead refs |

## Risks / questions for the owner
1. Which item should be featured (default: Cum Laude)?
2. Do certificates have images or links? `certificateUrl` exists in the type; if values are missing the button is hidden.
3. Okay to drop the always-visible detail panel in favor of the dialog?
4. 4 of 20 items have no photo: they get a clean icon tile instead of a blank image.

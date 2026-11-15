# Portfolio V2 Design System (AI draft, not approved)

## Dark theme tokens (`app/globals.css`, `.dark`)
Stored as RGB triplets so Tailwind opacity works (`rgb(var(--token) / a)`).
| Token | Hex | Use |
|---|---|---|
| background | #0B0D0E | page |
| card | #141718 | surfaces |
| popover | #1C2021 | elevated (palette) |
| foreground | #EAECE7 | primary text |
| secondary | #A6AFAB | secondary text |
| muted | #838C88 | metadata |
| border | #303637 | rules |
| primary | #7FD1AE | accent: Signal mint (10.8:1 on background) |
| accent | #A3E0C6 | accent hover |
Background: solid `#0B0D0E` (the grid and later isometric ambient layers were tried and removed). Light and B&W themes unchanged. Accent used sparingly: active states, section numbers, focus rings, links, timeline dots.

## Typography
Space Grotesk (display, 500/700), Inter (body), JetBrains Mono (metadata). Loaded with `next/font/google`.
Rawkner font files remain in `app/fonts` but are unused.

## Patterns
Numbered section headings (`NN / Title`), thin 1px rules, mono metadata labels, tab/filter chips (`FilterTabs`), editorial alternating rows.

## Illustration
Hairline `Stack` figure in About floats on the page with no card (hero uses the profile photo). Colors map to theme tokens via `--hairline-*`. Lazy-loaded, client only.

## Motion
framer-motion only; short opacity/transform transitions (about 200 to 500 ms); `useReducedMotion` respected. No shared motion-token file was created (not needed yet).

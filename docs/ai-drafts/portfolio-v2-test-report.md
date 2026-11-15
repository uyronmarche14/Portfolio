# Portfolio V2 Test Report (AI draft)

Date: 2026-11-15. Production build (`next start`, port 3218), headless Chromium via Playwright, Lighthouse (default mobile emulation) on `/`.

| Check | Result |
|---|---|
| typecheck | pass |
| lint | 0 errors, 11 warnings (pre-existing) |
| jest | 7/7 pass |
| build | pass |
| Routes | `/`, `/experience`, `/process`, 12 `/projects/*`, 6 `/experience/*`, robots.txt, sitemap.xml, resume.pdf all 200 |
| Missing | `/favicon.ico`, `/apple-touch-icon.png` 404 |
| Overflow at 360, 390, 768, 1024, 1440, 1920 | none after fixing 8px case-study bleed at 1024 (first run showed it; fix not re-run at 1024) |
| Console errors | none apart from favicon |
| Reduced motion | h1 visible, no errors |
| Command palette | opens with Ctrl+K, closes with Esc |
| Experience | keyboard arrows, deep link, refresh, back navigation verified |
| Projects | filters Web 8, Mobile 4, Desktop 1, AI 3, In development 4; search and empty state verified |

Lighthouse (before final fixes / after): Performance 77 / 78, Accessibility 91 / 97, Best Practices 96, SEO 100. LCP 1.1 s, CLS 0, TBT about 1.0 s (above goal; one large JS chunk). Remaining flags: console error (favicon 404) and carousel dot target size (fixed afterwards, not re-measured).

Not tested: other browsers, real devices, screen readers, INP, activities gallery, contact form submission, resume download beyond HTTP 200.

## Update (phase-26, production build)
- Overflow at 360/390/768/1024/1440/1920: none on `/`, `/experience`, `/projects/solace-hotel`, `/process` (1024 bleed fixed).
- Lighthouse (single runs; Performance varies 74 to 82 between runs): Performance 74 to 82, Accessibility 100, Best Practices 96, SEO 100, LCP 1.1 to 1.2 s, CLS 0, TBT 0.7 to 1.5 s. Performance goal (90) NOT met. Only remaining flagged audit: console error from missing favicon.
- Activities lightbox: opens from "View photo", ArrowRight advances, Esc closes; verified at 1440 and 390 px.
- Re-verified after changes: tech filters, project filters/search, experience keyboard/deep links/back.
- Not tested: INP, other browsers, real devices, screen readers.

## Update (phase-27, quiet machine, production build)
Lighthouse (default mobile emulation, localhost) over 6 runs with the dev server stopped: Performance 80, 96, 96, 97, 98, 98; Accessibility 100; Best Practices 100; SEO 100; LCP 1.1 s; CLS 0; TBT 160 to 830 ms. The earlier 74 to 82 readings were taken while a dev server and other projects were running, so they overstate the cost. Treat the 80 outlier as noise of unknown cause. Lab data on localhost, not field data (INP and real-device results not measured).
Also verified: journey timeline (8 years, 18 milestones, type filters), navbar search button opens the palette, mobile menu closes on Esc, palette dialog has an accessible title, favicon/apple icon served (placeholder monogram, replace with real artwork if desired).

## Update (phase-28)
- Interaction latency (lab, mobile emulation, 4x CPU throttle, production build, 36 interaction events across menu, tech/project filters, experience expand): worst 128 ms, so under 200 ms. Not field INP.
- Firefox (Playwright): home loads, no horizontal overflow, command palette opens, no page errors. WebKit: could not run (needs system libraries that require sudo); not tested.
- Contact form (EmailJS request intercepted, no real email sent): success and failure paths both render correctly and the request carries the configured IDs. Real delivery not tested (needs the owner's EmailJS credentials).
- Secret scan of tracked files before pushing: no env files or key-like strings.
- GitHub Actions: all runs `startup_failure` including a trivial probe workflow; CI result unknown.
- Still not tested: real devices, screen readers, WebKit/Safari.

# Business analysis and dashboard documentation

Status: AI-authored implementation documentation, pending review. This records implemented behavior; it does not establish new employer achievements or verified business outcomes.

## Purpose and page flow

The portfolio explains how existing records and newly defined event capture can support analysis of growth and decline, operational friction, and missing evidence.

- `/` shows a compact floating **Explore dashboard** link on the iOPEX experience visual. The expanded documentation stays off the homepage.
- `/experience` identifies the iOPEX role as the entry point for business analysis and the sample dashboard.
- `/experience/iopex#iopex-analysis` contains the capability description, source examples, fixed dashboard preview, and sample records. Its contents list links to data sources and sample records.
- `/analytics` contains the interactive recruitment example, analysis approach, broader source opportunities, filtered source records, KPI definitions, and data limits. Its back link returns to the iOPEX analysis section.
- Other role pages retain their existing role-specific content. Generic capabilities are not presented as work performed for every employer.

## Content ownership

`app/lib/data/businessAnalysis.ts` is the shared source for the introduction, three analysis themes, method, and source/capture examples. `BusinessAnalysisContent.tsx` renders it in both the dashboard and experience documentation.

The three themes are:

1. Growth and decline: changes in demand, sales, conversion, and retention where supporting records exist.
2. Friction and loss: delays, repeated work, abandoned steps, and failed handoffs.
3. Gaps and early warnings: missing updates, recurring issues, unusual patterns, and differences between segments.

The source opportunities cover sales/customer activity, workflow events, feedback/operational notes, and missing or inconsistent evidence. Each names example records, a business question, and fields worth capturing. These are capabilities and investigation opportunities, not additional datasets or employer results.

## Working sample and provenance

The only working dataset is the deterministic recruitment sample in `app/lib/analytics/dataset.ts`. It is generated from a fixed seed. Every record is fictional; IDs begin with `DEMO-`. It contains no employer records or real candidate information.

The example covers 26 fictional weeks, indexed internally as `0..25` and displayed as `W1..W26`. The final week is a running week, not a completed observation period. These are synthetic week labels, not actual calendar dates.

### Application record

| Field | Meaning |
| --- | --- |
| `id` | Fictional application identifier; one row represents one application |
| `week` | Zero-based application week |
| `source` | Job board, referral, walk-in, social media, or agency |
| `recruiter` | Fictional recruiter label A through D |
| `stage` | Furthest reached stage: Applied, Screened, Interviewed, Offered, or Hired |
| `hoursSinceUpdate` | Hours since the last meaningful update; `null` means no recorded evidence |

### Appointment record

| Field | Meaning |
| --- | --- |
| `id` | Fictional appointment identifier; one row represents one appointment |
| `week` | Zero-based appointment week |
| `source` | Recruitment channel |
| `arrival` | Arrival recorded, no arrival evidence, or upcoming |
| `waitMinutes` | Recorded wait after arrival; `null` means unrecorded or unreadable |

`SourceRecords.tsx` displays up to five application rows and five appointment rows. The counts identify the excerpt versus the full selection. On `/analytics`, these are taken directly from the filtered `computeKpis()` result. The experience page uses the fixed preview selection: 13 weeks and all sources. Empty selections have explicit messages.

## KPI rules and limits

`app/lib/analytics/kpis.ts` remains the calculation source. `KPI_DEFINITIONS` supplies each metric's question, formula, grain, date basis, and exclusions to the dashboard.

- Received volume counts application rows, not unique people.
- Update compliance uses applications with a recorded update time. Missing evidence is reported separately.
- Show-up excludes upcoming appointments. No arrival evidence does not establish a confirmed no-show.
- Unreadable waiting durations stay in arrival totals and are excluded from the median and waiting-time bands.
- The funnel represents furthest stage reached. True stage-to-stage conversion needs transition history.
- A missing denominator produces an unavailable rate, not a healthy zero.
- The recruitment sample does not measure revenue, customer retention, profitability, or causes of business failure. Those require appropriate additional records and context.

Existing biography and work-experience records are kept separate from the sample and general capability copy. No new numeric achievements are added to the employment history.

## Implementation map

- `BusinessAnalysisContent.tsx`: shared capability and source/capture documentation.
- `SourceRecords.tsx`: accessible, collapsible record excerpts with horizontally scrollable tables.
- `BusinessAnalysisShowcase.tsx`: experience-page capability content, fixed preview, and record excerpts.
- `AnalyticsShowcase.tsx`: period/source selection, charts, definitions, and filtered record excerpts.
- `ExperienceRolePage.tsx`: iOPEX-only integration and contents links.
- `ExperienceSection.tsx`: homepage floating dashboard card.

## Verification

Relevant checks are `bun run typecheck`, targeted ESLint, and `bun run test --runInBand app/lib/analytics/kpis.test.ts`. Runtime review should confirm that the dashboard and role pages share the content, changing filters changes the displayed source rows, the homepage remains compact, and synthetic labels and missing-evidence states remain visible.

Browser-based visual and interaction review was unavailable in the agent environment when this documentation was prepared; HTTP rendering and source-data checks do not replace that review.

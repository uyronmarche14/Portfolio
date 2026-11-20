# Project visuals: what changed and what to review (AI draft, not approved)

Status: proposal. Not an approved requirement.

## What was built
- A shared kit (`app/components/features/projects/visuals/kit.tsx`): one canvas (560 x 380, 24px safe area, hidden overflow), theme tokens only, a three-size type scale, and primitives (card, chip, label, fill, dot, tick, beam, reveal).
- Twelve scenes rebuilt on it, one per project. Each is a story of four beats that plays once when scrolled into view, rests on its finished frame, and can be replayed with a Replay button. Reduced motion and the home-page cards show only the finished frame.
- Scenes load separately (`next/dynamic`), so a page downloads only the scene it shows.
- The architecture diagram's edges now use the accent colour and a travelling dash, switched off for reduced motion.
- Tests (`visuals/scenes.test.ts`): every project has one scene, 3 to 5 beats, a text description, no overflow-visible, no glow filters, no employer names.

## Please confirm
- **Scene content is illustrative.** Labels (time slots, "Presenter 2", "Warm", the sample suggestion, the log lines) are examples drawn from each project's feature list, not real data. SQM's permission matrix is a sample rule set.
- **Wording changes in `projects.ts`:** removed hype and unverified claims from Codex Express, Reservation Desktop and Best Brew (for example the exact "Next.js 14", "revolutionizes", and sales analytics, which the feature list does not mention). Please check the new text is accurate.
- **Skills:** nothing third-party was installed. The review followed the ideas in the animation-review skills (animate cheap properties, short purposeful motion, respect reduced motion, no motion for its own sake) without adding their files to the repository.

## Measured
Production build, CPU slowed 4x: no long tasks while SwiftPass and SQM play; Archon shows two short tasks (65 ms and 76 ms).

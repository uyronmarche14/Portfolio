# PLAN-ui-ux-improve.md

> **Task**: UI/UX Audit & Component Improvements
> **Status**: Proposed
> **Refs**: `app/components/ui/`, `app/components/features/`

## 1. Context & Objectives
The user requested a component-level check and improvements based on "UI/UX Pro Max" standards. The current codebase works but suffers from:
- **Hardcoded Data**: Content mixed with presentation (e.g., `AboutSection`).
- **Inconsistent Patterns**: Mixed use of `shadcn` and raw Tailwind.
- **Maintenance Debt**: `TechBadge` map growing inside component.
- **Broken Tooling**: ESLint config needs a final fix.

**Goal**: Elevate the codebase to a "Senior Engineer" standard by decoupling data, standardizing UI tokens, and polishing interactions.

## 2. Technical Approach

### Phase 1: Infrastructure & Cleanup (P0)
- **Fix ESLint**: Resolve the "Circular structure" error by using a verified minimal config for Next.js 16.
- **Update Dependencies**: Ensure all peer dependencies match the new Next.js 16 version.

### Phase 2: Design System & Tokens (P1)
- **Typography Components**: Create `Heading` and `Text` components to enforce font-family (`Rawkner`) and size consistency.
- **Color System**: Verify `tailwind.config.js` aligns with "Pro Max" standards (richer palettes, semantic names).
- **Icon System**: Centralize `techIconMap` into `lib/data/icons.ts`.

### Phase 3: Component Refactoring (P2)
- **`AboutSection`**:
    - Extract text content to `lib/data/about.ts`.
    - Fix hardcoded Cloudinary URLs to use environment variables.
- **`TechBadge`**:
    - Refactor to consume centralized icon map.
    - Optimize animations for lists.
- **`ProjectCard`**:
    - Extract `accent` logic to a utility hook.
    - Standardize gradient overlays using Tailwind classes instead of inline styles.

### Phase 4: Visual Polish "Pro Max" (P3)
- **Glassmorphism**: Apply consistent `backdrop-blur` and border opacity strategies to cards.
- **Micro-interactions**: Standardize hover effects (scale, glow) using a shared `motion` wrapper or utility.

## 3. Implementation Steps

### 3.1. Infrastructure
1.  [ ] **ESLint Fix**: Replace `eslint.config.mjs` with minimal functional version.
2.  [ ] **Lint Check**: Verify `pnpm lint` passes.

### 3.2. Refactoring
3.  [ ] **Extract Data**: Move `AboutSection` content to `lib/data`.
4.  [ ] **Centralize Icons**: Create `lib/data/icons.ts` for TechBadge.
5.  [ ] **Refactor `TechBadge`**: Update to use new data source.

### 3.3. UI System
6.  [ ] **New Components**: Create `components/ui/typography/Heading.tsx` & `Text.tsx`.
7.  [ ] **Refactor `AboutSection`**: Use new Typography components.

## 4. Verification Plan
- **Automated**:
    - `pnpm lint` should pass without errors.
    - `pnpm build` should complete.
- **Manual**:
    - Check "About" section for correct data rendering.
    - Verify `TechBadge` icons load correctly.
    - Test Dark/Light mode contrast on new cards.

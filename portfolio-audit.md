# 🎼 Orchestration Plan: Portfolio Audit & Optimization

## 1. Goal
Comprehensive audit of the portfolio website focusing on **UI/UX Excellence** (`ui-ux-pro-max`) and **Technical Health** (`debug`).

## 2. Team & Roles

| Role | Agent | Intent |
|------|-------|--------|
| **Lead** | `orchestrator` | Coordination, consolidation of reports. |
| **Design** | `frontend-specialist` | Evaluate against "Pro Max" standards (Aesthetics, Motion, Typography). |
| **Tech** | `test-engineer` | Systematic debugging, linting, type safety, and security checks. |
| **Ops** | `project-planner` | Plan management and verification. |

## 3. Execution Strategy

### Phase 1: Planning (Current)
- [x] Analyze Request: `audit the portfolio` + `debug` + `ui-ux-pro-max`.
- [x] Map Codebase: Next.js (App Router), Tailwind, Framer Motion.
- [x] Define Plan: `portfolio-audit.md`.

### Phase 2: The Audit (Execution) -> *Requires Approval*

#### A. UI/UX "Pro Max" Audit (`frontend-specialist`)
*Goal: Ensure the site feels "Premium" and uses modern patterns.*
1.  **Aesthetic Review**:
    *   Does it use "Standard Hero Split" (Forbidden)?
    *   Are colors consistent or mixed (Hex vs CSS Vars)?
    *   Is there a "Purple Ban" violation?
2.  **Responsiveness**:
    *   Check for mobile-first (`md:`, `lg:` prefixes).
    *   Verify `AboutTimeline` duplicate JSX issue (Mobile vs Desktop).
3.  **Motion & Depth**:
    *   Are animations generic or "Organic"?
    *   Is `backdrop-blur` used efficiently?

#### C. User-Requested Design Changes (New)
*Goal: Address specific aesthetic feedback.*
1.  **CTA Section**:
    *   **Current**: "Floating rectangle eats all screen".
    *   **Plan**: Redesign with "Perspective" and "Different Vibes" (e.g., 3D tilt, full-width with depth, or asymmetric layout).
2.  **Global Background**:
    *   **Current**: Only top/bottom.
    *   **Plan**: Apply background effects/squares globally to the entire application.
3.  **Footer**:
    *   **Current**: Floating orange sphere.
    *   **Plan**: Remove sphere. Implement "Flashlight" shadow effect on text hover (left side directional).
4.  **"Work With Me" Section**:
    *   **Current**: Missing header?
    *   **Plan**: Ensure it has a header consistent with other components.

#### B. Technical & Debug Audit (`test-engineer`)
*Goal: Fix the "linting broken" issue and ensure code quality.*
1.  **Code Quality**:
    *   Run `npm run lint` (Investigate "Circular structure" error).
    *   Run `npm run type-check`.
2.  **Configuration**:
    *   Verify `next.config.ts` matches generic standards.
    *   Check `env` variables (Cloudinary).
3.  **Performance**:
    *   Analyze bundle size.
    *   Check for heavy dependencies in `package.json`.

### Phase 3: Reporting & Fixes
- Compile findings into `docs/AUDIT_REPORT.md` (Updating existing draft).
- **Auto-Fix**: If simple configuration errors (like lint config) are found, fix them immediately.
- **Proposal**: Create `implementation_plan.md` for major UI refactors.

## 4. Verification Criteria
- [ ] **Design Verification**:
    - [ ] CTA is no longer a "floating rectangle".
    - [ ] Background effects are visible globally.
    - [ ] Footer has no orange path; Shadow effect works on hover.
    - [ ] "Work With Me" has consistent header.
- [ ] `npm run lint` passes without error.
- [ ] `npm run type-check` passes.
- [ ] Security Scan (`security_scan.py`) executed.

## 5. Next Steps
Upon approval:
1.  I will invoke `frontend-specialist` and `test-engineer` in parallel (simulated).
2.  I will generate the implementation plan for any fixes.

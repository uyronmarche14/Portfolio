# implementation_plan.md

## Goal
Implement specific design requests ("Pro Max" standards) and fix technical debt found during audit.

## 1. Technical Fixes
### [FIX] TypeScript Error (`WorkWithMeSection.tsx`)
- **Error**: `variant="lead"` is invalid for `Text` component.
- **Fix**: Change to `variant="large"` or add `lead` type to `Text.tsx`. (Decision: Change to `large` to match existing system).

## 2. Design Implementation (User Requests)

### A. Header Consistency (`WorkWithMeSection.tsx`)
- **Action**: Replace custom `<Heading>` block with reusable `<HeaderTitle />` component to match `About` and `Contact` sections.
- **Inputs**: Use strings like "Elevate Your Vision" or similar for the intro.

### B. Global Background (`bgRipple.tsx`)
- **Problem**: User feels effects are only "top/bottom".
- **Likely Cause**: The `bg-gradient-to-t` overlay in `CleanGridBackground` fades out the grid in the middle.
- **Fix**: Remove the fade overlay. increasing grid opacity slightly for visibility across full height.

### C. Footer "Flashlight" Effect (`footer.tsx`)
- **Action**:
    1.  Remove absolute "blur blobs" (orange sphere).
    2.  Implement "Flashlight" text reveal: The text is dim by default. A radial-gradient mask follows the mouse, revealing the bright text (shadow effect inverted).
    3.  Alternatively: Text Shadow follows mouse.

### D. CTA Section Redesign (`ContactSection.tsx`)
- **Action**: "Perspective & Different Vibes".
- **Design**:
    - Remove `max-w-6xl` floating card.
    - Use **3D Tilt** on the form container using `framer-motion` (useScroll/useTransform).
    - Make the background immersive (e.g., dark, neon accent).
    - "Eat all screen": Use `w-full` and split layout or massive typography.

## 3. Verification
- `npm run type-check` must pass.
- User review of new designs.

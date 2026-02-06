# PLAN-timeline-redesign.md

> **Task**: Implement "Interactive List Timeline" Design
> **Status**: Proposed
> **Refs**: `app/components/ui/aboutTimeline.tsx`, `app/lib/data/timeline.ts` (new)

## 1. Context & Objectives
User wants to redesign the "About Timeline" to match a specific reference image:
- **Visual Style**: Clean, typographic list (Year | Title | Indicator).
- **Interaction**: Hovering a row reveals a rich detail card (Text + Image) floating over or expanding within the list.
- **Theme**: Strict adherence to System Orange (`#ff8906`).

## 2. Technical Approach

### Data Structure
The current timeline data might be simple. We need a richer structure for the "Card" content.
- **New Data File**: `app/lib/data/timeline.ts`
- **Fields**: Year, Title, Description, Image (for the card), Stats/Tags.

### Component Architecture
We will refactor `AboutTimeline.tsx` into smaller parts:
1.  **`TimelineLayout`**: Main container.
2.  **`TimelineItem`**: Individual row (Year | Title).
3.  **`TimelinePreviewCard`**: The rich card component that appears on hover.

### Animation Strategy (Framer Motion)
- **Hover State**:
    - The active row highlights (Orange text/accent).
    - The `PreviewCard` appears. Use `layoutId` or absolute positioning relative to the cursor/row.
    - **Reference Logic**: The image shows the card appearing *under* the row or *replacing* space. A "Hover Reveal" where the card floats nearby or an "Accordion" style is safer for mobile.
    - **Decision**: **Floating Hover Card** for Desktop, **Accordion/Modal** for Mobile.

## 3. Implementation Steps

### Phase 1: Data & Setup
1.  [ ] **Create Data**: `lib/data/timeline.ts` with mock data matching the user's "Career/History" but using the new rich format.
2.  [ ] **Scaffold Component**: Create `components/ui/timeline/TimelineList.tsx`.

### Phase 2: Building the List (Row)
3.  [ ] **Implement Row**:
    - Left: Year (Font `Rawkner`, large).
    - Center: Title (Font `San-serif`, clean).
    - Right: Indicator (Dot or Icon).
4.  [ ] **Styling**: Apply `border-b` separators, hover `text-primary` colors.

### Phase 3: The "Hover Card"
5.  [ ] **Implement Card**: Dark theme (`#1a1a1a`), rounded corners, image on right, text on left (matching the reference).
6.  [ ] **Interaction**:
    - Use `onMouseEnter` to set `activeParam`.
    - Render `AnimatePresence` to show the card.
    - **Positioning**: Fixed or Absolute based on the row's position?
    - *Plan*: Render the card *inside* the row but visible via absolute overflow, OR use a shared fixed preview area if the list is tight. *Reference seems to show it inline-ish.* Let's go with **Accordion Expand** (smoother) or **Fixed Overlay**?
    - **Refined Plan**: The image looks like the card *is* the content for that year. Let's make it so clicking or hovering *expands* that year to show the card.

### Phase 4: Polish & Theme
7.  [ ] **Orange Theme**: Ensure all highlights use `var(--primary)`.
8.  [ ] **Responsiveness**: Check mobile view (stack year/title, card always visible or tap-to-expand).

## 4. Verification Plan
- **Visual**: Compare against uploaded image (Clean list, dark card).
- **Interaction**: Smooth hover/expand without layout jank.
- **Theme**: Orange must be the dominant accent.

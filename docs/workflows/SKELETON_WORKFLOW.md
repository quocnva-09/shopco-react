# Skeleton Loading Implementation Workflow & Conventions

This document serves as a reference guide for how Skeleton loading states were implemented in this project, outlining the specific architectural rules and CSS methodologies established during the session.

## 1. Architectural Principles
- **Atomic Design Alignment**: Skeletons must mirror the atomic level of the component they are mocking. For example, a `ProductCard` (Molecule) must have a corresponding `ProductCardSkeleton` (Molecule).
- **Composition over Wrappers**: Parent structural wrappers (like `ProductDetailSection`) were deprecated if their only purpose was wrapping. Instead, page-level components (`ProductDetailPage`) directly compose the child skeletons (`ProductGallerySkeleton`, `ProductDetailInfoSkeleton`) to allow granular loading layouts.
- **Data Fetching State**: Text-based loading components (such as `isLoading` states inside `SectionStateWrapper`) are **obsolete**. `SectionStateWrapper` is now strictly reserved for handling `error` and `isRetryable` states. Loading is handled purely by Skeletons.

## 2. CSS / Styling Rules (Strict BEM)
- **No Inline Styles**: Skeletons must never use inline styles (e.g., `style={{ width: "80%" }}`) to define dimensions.
- **Isolated SCSS**: Skeleton-specific BEM modifiers and elements must NOT pollute the main component's SCSS file. 
  - *Correct*: `ProductCardSkeleton/index.scss` contains the `.product-card--skeleton` logic.
  - *Incorrect*: Appending skeleton logic to `ProductCard/index.scss`.
- **Responsive Parity**: Skeletons must include the exact same media query breakpoints as the component they mock to prevent Layout Shift when the actual data renders.

## 3. Implementation Steps for a New Skeleton
Whenever building a new Skeleton for a component (e.g., `ReviewCard`), follow these steps:

1. **Create the Skeleton Component**: 
   - Create `ReviewCardSkeleton/index.tsx`.
   - Mimic the exact DOM structure (`div`, `figure`, etc.) of the real component.
   - Replace dynamic text/images with the `<Skeleton variant="rectangular" | "text" | "circular" />` atom.
2. **Create the Skeleton Stylesheet**:
   - Create `ReviewCardSkeleton/index.scss`.
   - Add BEM classes (e.g., `.review-card__skeleton-title`) defining width, height, margins, and mobile breakpoints.
3. **Integrate into the Parent**:
   - In the parent (e.g., `FeedbackSection` or a Page component), add an `isLoading` prop.
   - Use `Array.from({ length: X }).map(...)` to render the correct number of mock skeleton items when `isLoading === true`.

## 4. Notable Refactors Completed
- **`Skeleton` Atom**: Created base atom with `@keyframes shimmer` sliding gradient.
- **`ProductCardSkeleton`**: Isolated styles, integrated into `ProductCollectionSection`.
- **`ReviewCardSkeleton`**: Isolated styles, integrated into `FeedbackSection` with slider stability.
- **`ProductGallerySkeleton` & `ProductDetailInfoSkeleton`**: Built modularly to replace the deprecated `ProductDetailSection` wrapper.
- **`SectionStateWrapper`**: Stripped of `isLoading` and `loadingMessage` responsibilities.

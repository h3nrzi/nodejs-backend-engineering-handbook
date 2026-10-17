---
name: Roshan Education
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#434655'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#6b3700'
  on-tertiary: '#ffffff'
  tertiary-container: '#8d4b00'
  on-tertiary-container: '#ffcba3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display:
    fontFamily: Vazirmatn
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 54px
  display-mobile:
    fontFamily: Vazirmatn
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 42px
  headline-lg:
    fontFamily: Vazirmatn
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Vazirmatn
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Vazirmatn
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 36px
  headline-sm:
    fontFamily: Vazirmatn
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: Vazirmatn
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Vazirmatn
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Vazirmatn
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Vazirmatn
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
  label-md:
    fontFamily: Vazirmatn
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Vazirmatn
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system is engineered for adult Iranian professionals, university students, and independent lifelong learners engaging in structured online education, certification tracks, and upskilling programs. The cognitive climate is serious, focused, and scholarly—eschewing gamification tropes, non-functional micro-interactions, and ornamental visual noise in favor of deep clarity, rapid legibility, and pedagogical momentum.

### Visual Tone & Aesthetic
- **Minimalist Academic Utility:** Generous negative space, structured structural lines, and crisp division of lesson content, assessments, and reference documents.
- **RTL-Native Ergonomics:** Built ground-up for Persian reading habits, prioritizing rightward gaze anchors, balanced vertical rhythm for naskh-derived glyph metrics, and visual equilibrium.
- **Dignified Professionalism:** High semantic contrast, restrained architectural borders, and deliberate status coding (completion, review required, pending revision) that treat learners as capable adults rather than passive spectators.

## Colors

The palette establishes an authoritative, distraction-free environment calibrated for extended reading sessions on desktop and mobile displays.

### Role Assignments
- **Primary Canvas (`#FFFFFF`, `#F8FAFC`):** The app canvas rests on `#F8FAFC` to alleviate eye strain, while lesson modules, reading sheets, and cards utilize pure white `#FFFFFF` for sharp structural hierarchy.
- **Borders & Dividers (`#E2E8F0`, `#CBD5E1`):** Micro-borders provide low-noise containerization. Darker `#CBD5E1` is reserved for focused inputs and active states.
- **Primary Ink & Structure (`#1E293B`, `#0F172A`):** The deepest slate provides the primary text color, navigation sidebars, and high-emphasis anchors, avoiding harsh pure black while maintaining WCAG AAA contrast ratios against light backgrounds.
- **Action & Interactive Primary (`#1D4ED8`, `#2563EB`):** Applied exclusively to intentional interactive states: primary buttons, current lesson indicators, active tab rules, and navigational links.
- **Success & Completion (`#059669`, `#10B981`):** Applied to mastered competencies, finished modules, passed quizzes, and validated sync states.
- **Warning & Revision (`#D97706`, `#F59E0B`):** Denotes modules requiring re-take, unconfirmed exercise submissions, and time-sensitive deadlines.
- **Secondary Copy & Metadata (`#64748B`):** Captions, reading estimates, Persian numeral timestamps, and subtle instructional tooltips.

## Typography

Typography is centered entirely on **Vazirmatn** (with systematic fallback to **Shabnam** and modern system sans-serif). Persian text rendering demands greater line-height ratios than Latin equivalents to prevent ascenders, descenders, and tashkeel diacritics from overlapping.

### RTL & Character Rules
- **Persian Numerals:** All quantitative interfaces (lesson progress percentages, durations, chapter indexes, pagination, and timestamps) must strictly render native Persian digits (`۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹`) using OpenType font features (`font-feature-settings: "ss01"` or explicit localized formatting).
- **Line Heights:** Body copy defaults to a generous minimum of `1.75` line-height (`28px` leading on `16px` font) to guarantee sustained reading stamina without ocular fatigue.
- **Tracking:** Letter-spacing remains `0` or slightly positive (`0.01em`) on large headlines; negative tracking is prohibited as it causes Persian cursive ligatures to break or clatter unnaturally.
- **Bidirectional Isolation:** Embedded Latin words, code snippets, or mathematical formulas must use explicit Unicode Bidirectional Algorithm wrappers (`<bdi>` or `dir="ltr"`) to prevent directional punctuation flips.

## Layout & Spacing

The layout is strictly RTL-oriented, prioritizing right-anchored navigation, logical content progressions, and fixed vertical rhythm.

### Grid & Responsiveness
- **Desktop (1200px+):** Asymmetrical 12-column layout. 
  - Standard study layout: 3-column sticky right-hand syllabus sidebar (320px width), 7-column centered reading/video document canvas (maximum readable measure ~720px), and optional 2-column left-hand ancillary panel for annotations, index bookmarks, and term glossaries.
- **Tablet (768px - 1199px):** 8-column layout. The lesson tree collapses into an off-canvas drawer triggered from the top-right header; core content expands to full viewport width with `1.5rem` margins.
- **Mobile (Below 768px):** 4-column layout. 100% fluid horizontal stretch with a fixed `1rem` safe margin. Global navigation converts into a bottom persistent bar oriented RTL (Right: Dashboard/Current Course; Left: Account/Settings).

## Elevation & Depth

This system utilizes low-contrast outlines combined with crisp, minimal ambient shadows. Skeuomorphic depths, vibrant glows, and blurred glassmorphism are omitted to maintain enterprise rigor.

### Elevation Hierarchy
- **Level 0 (Flat Ground):** `#F8FAFC` base application background. Zero shadow, no border.
- **Level 1 (Card & Content Surface):** `#FFFFFF` background bound by a `1px` border of `#E2E8F0`. Shadow: `0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)`. Used for course cards, quiet panels, and content modules.
- **Level 2 (Active & Hover Cards):** `#FFFFFF` surface with `#CBD5E1` border. Shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Sticky Headers, Drawers & Lesson Navigation):** `#FFFFFF` surface with a bottom or border-left border of `#E2E8F0` and diffuse separation: `0 10px 15px -3px rgba(15, 23, 42, 0.04)`.
- **Level 4 (Modals & Command Palettes):** Backdrop overlay `#0F172A` at `40%` opacity. Elevated surface with border `#E2E8F0` and deep anchor: `0 20px 25px -5px rgba(15, 23, 42, 0.08)`.

## Shapes

A subtle, disciplined shape geometry (`roundedness: 1`) reflects modern technical publication standards:
- Base elements (buttons, text inputs, segmented pills, inline badges): `0.25rem` (4px).
- Structural containers (cards, callouts, course module units, video frames): `0.5rem` (8px).
- Modals, large study sheet frames, and main navigation sheets: `0.75rem` (12px).
- Fully circular treatments (`rounded-full`) are reserved strictly for user avatars, step-progress indicator nodes, and status icon badges.

## Components

### Buttons
- **Primary:** Solid `#1D4ED8` background, `#FFFFFF` text, `4px` radius. Hover: `#1E40AF`. Active: `#1E3A8A`. Padding: `10px 18px` (`label-lg`). Focus: `2px` offset outline in `#2563EB`.
- **Secondary:** `#FFFFFF` background, `1px` border `#CBD5E1`, text `#1E293B`. Hover: `#F8FAFC` and border `#94A3B8`.
- **Tertiary/Ghost:** Transparent background, text `#1D4ED8`, padding `8px 12px`. Hover: `#EFF6FF`.
- **Icon Placement:** Icons must be correctly slotted for RTL. Forward/disclosure arrows point to the left (`←`); backward/return arrows point to the right (`→`).

### Badges & Status Chips
- Non-interactive status tokens using muted backgrounds with high-contrast foreground text:
  - **Completed / Verified:** Background `#ECFDF5`, text `#065F46`, border `#A7F3D0`.
  - **Needs Revision / Pending:** Background `#FFFBEB`, text `#92400E`, border `#FDE68A`.
  - **Informational / Prerequisite:** Background `#EFF6FF`, text `#1E40AF`, border `#BFDBFE`.
  - **Neutral / Draft:** Background `#F1F5F9`, text `#475569`, border `#E2E8F0`.

### Form Controls (Inputs, Checkboxes, Radios)
- **Text Inputs:** `#FFFFFF` surface, `1px` border `#CBD5E1`, text `#1E293B`, placeholder `#94A3B8`. RTL text alignment by default. Focus shifts border to `#1D4ED8` with a crisp `3px` focus ring at `rgba(29, 78, 216, 0.15)`.
- **Checkboxes & Radios:** Right-aligned relative to label text with an `8px` gap. Checked state: `#1D4ED8` fill with sharp white glyph.

### Lesson Tree & Course Sidebar
- Pinned to the right margin in desktop viewports.
- Hierarchical tree: Chapter headers in `headline-sm`, individual lesson rows in `body-sm`.
- **States:**
  - *Completed:* Green check circle (`#059669`) aligned right, title in `#334155`.
  - *Current:* Navy left-border accent (`3px` solid `#1D4ED8`), background `#EFF6FF`, font weight `600`, text `#1D4ED8`.
  - *Locked:* Gray padlock icon (`#94A3B8`), text `#94A3B8`.

### Course Cards
- Constructed of `#FFFFFF` with a `1px` border in `#E2E8F0`. 
- Top aspect-ratio container for preview media or technical icon badge.
- Body area: Category badge (top right), Persian headline (`headline-sm`), two-line summary (`body-sm`), and footer with instructor meta and completion progress bar.

### Progress Indicators
- Linear progress tracks: Height `6px`, background `#E2E8F0`, rounded `3px`. Fill bar in `#059669` (or `#1D4ED8` for active in-progress courses). Fills strictly from right to left (`transform-origin: right`).

### Callouts & Pedagogical Notices
- Surface `#F8FAFC` with a pronounced `4px` solid border on the right edge.
  - *Tip/Note:* Right border `#1D4ED8`, icon `#1D4ED8`.
  - *Important/Exam Note:* Right border `#D97706`, icon `#D97706`.
  - *Key Takeaway:* Right border `#059669`, icon `#059669`.

### Breadcrumbs
- Right-to-left trail with a slash or left-chevron (`‹`) separator. The terminal item represents the current lesson in bold slate (`#0F172A`), while ancestor links sit in secondary slate (`#64748B`).
---
name: VidyaPrayog Industrial Professional
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4e5e81'
  primary: '#031635'
  on-primary: '#ffffff'
  primary-container: '#1a2b4b'
  on-primary-container: '#8293b8'
  inverse-primary: '#b6c6ef'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#6bff8f'
  on-secondary-container: '#007432'
  tertiary: '#05005f'
  on-tertiary: '#ffffff'
  tertiary-container: '#0e009b'
  on-tertiary-container: '#8286ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#b6c6ef'
  on-primary-fixed: '#081b3a'
  on-primary-fixed-variant: '#364768'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is engineered for a high-stakes educational environment where technical proficiency meets career advancement. The brand personality is **authoritative, precise, and forward-looking**, bridging the gap between academic learning and industrial application.

The design style follows a **Modern Corporate** aesthetic with a **Data-Rich** focus. It prioritizes clarity and information density without overwhelming the user. By utilizing a "clean-room" approach—ample whitespace, structured grids, and high-contrast typography—the UI instills a sense of "Industry Readiness" and professional rigor. AI features are subtly distinguished through the use of indigo accents and refined motion, suggesting intelligence rather than gimmickry.

## Colors

The palette is anchored by **Deep Tech Blue**, providing a foundation of institutional trust and stability. **Vibrant Green** is used strategically as a "success state" color, signifying progress, completion, and market readiness. **Indigo/Violet** is reserved specifically for AI-powered components, such as personalized recommendations or automated insights, to create a distinct visual mental model for "intelligence."

The background utilizes a very cool-toned light grey/blue to reduce eye strain during long study sessions, while pure white is reserved for content containers to maximize legibility and visual separation.

## Typography

This design system utilizes **Inter** for its exceptional legibility in data-heavy interfaces. The hierarchy is strictly enforced to guide users through complex learning paths. 

- **Headlines:** Use Slate 900 (`#0F172A`) with tight letter-spacing to appear modern and "industrial."
- **Body Text:** Use Slate 600 (`#475569`) for optimal long-form reading comfort.
- **Data/Code:** **JetBrains Mono** is introduced for technical snippets, variables, and progress metrics to reinforce the technical nature of the platform.
- **Labels:** Small, uppercase labels are used for metadata and category tags to differentiate them from actionable text.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. A strict 8px spacing power-of-two scale ensures mathematical harmony across all components.

Information is grouped into logical "sectors" using vertical stacking. The system prioritizes a **Fixed Grid** for main content to maintain professional readability, centered on the screen. For data-rich dashboards, a "Dashboard Sidebar" layout is preferred, where the sidebar remains fixed and the content area scrolls.

## Elevation & Depth

Depth is achieved through **Tonal layering** and **Ambient shadows**. Surfaces do not "float" aggressively; instead, they sit subtly above the background to maintain a grounded, professional feel.

- **Level 0 (Background):** `#F8FAFC` - The canvas.
- **Level 1 (Cards):** `#FFFFFF` - Primary content containers with a 1px border of `#E2E8F0` and a very soft, diffused shadow (`0 4px 6px -1px rgb(0 0 0 / 0.05)`).
- **Level 2 (Overlays):** Modals and dropdowns use a more pronounced shadow to indicate temporary focus, with a backdrop blur of 8px on the layer beneath.

## Shapes

The design system uses a **Rounded** (0.5rem / 8px) base language, but specifically scales up to **12px (0.75rem)** for main content cards to provide a friendlier, modern feel without appearing "bubbly."

Buttons and interactive inputs maintain the 8px radius for a crisper, more actionable appearance. Progress bars and status tags use a full pill-radius to distinguish them from structural elements.

## Components

### Buttons
- **Primary:** Deep Tech Blue background, white text. No gradient. High-contrast.
- **Success (Career-Ready):** Vibrant Green background, Slate 900 text for maximum legibility.
- **AI-Action:** Indigo background with a subtle glow effect on hover.

### Cards
- White background, 12px border-radius, 1px light border.
- Headers within cards should have a subtle bottom border (`#F1F5F9`).

### Input Fields
- Slate 50 background with a 1px Slate 200 border. 
- On focus, the border transitions to Deep Tech Blue with a 2px outer glow.

### Progress Indicators
- Use the Vibrant Green for completed segments.
- Background tracks should be a light Slate 100.
- Labels for progress should use the `label-caps` typography style.

### Icons
- Use **thin-line (2pt stroke)** icons.
- Icons should match the text color they accompany, or use the Indigo accent for AI-related functions.

### Chips/Tags
- **Status Tags:** Low-saturation background versions of the semantic color (e.g., light green background with dark green text) for a refined look.
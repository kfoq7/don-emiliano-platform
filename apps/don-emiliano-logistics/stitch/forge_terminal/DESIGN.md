# Design System Specification: The Clinical Architect

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Clinical Architect."** 

In a high-pressure POS environment, the cashier requires more than just a grid of buttons; they require a high-performance instrument. This system moves away from the "cluttered spreadsheet" aesthetic of legacy POS software, instead adopting an editorial, high-end dashboard approach. We achieve this through **Precision Asymmetry** and **Tonal Depth**. By utilizing generous white space and a strict typographic scale, we create an environment that feels authoritative and calm, reducing cognitive load during peak transaction hours.

The "Architect" aspect is realized through structural integrity—using depth and color shifts rather than lines to define the workspace. The result is a signature interface that feels custom-built for professional environments where speed and trust are paramount.

## 2. Colors
The palette is rooted in deep, authoritative tones balanced by high-contrast functional accents.

*   **Primary Foundation:** Use `primary` (#003345) for the most critical navigational elements. It provides a "Trustworthy" anchor.
*   **The Action Accents:** `secondary` (#006a6a) represents successful flow (Complete Transaction), while `tertiary_fixed_dim` (#ffba38) is reserved for high-attention alerts or pending states.

### The "No-Line" Rule
To achieve a premium, editorial feel, **1px solid borders are prohibited for sectioning.** Structural boundaries must be defined solely through background color shifts.
*   *Implementation:* Place a `surface_container_low` sidebar against a `surface` main stage. The change in hex value is the "line."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
*   **Level 0 (The Floor):** `background` (#f7fafb).
*   **Level 1 (The Stage):** `surface_container` (#ebeeef) for major functional zones (e.g., the product grid).
*   **Level 2 (The Interactive):** `surface_container_lowest` (#ffffff) for interactive cards or data entry fields.
*   **Level 3 (The Focus):** `surface_container_highest` (#e0e3e4) for active or selected states.

### The "Glass & Gradient" Rule
To break the monotony of flat UI, apply a subtle linear gradient to primary action buttons, transitioning from `primary` (#003345) to `primary_container` (#004b63). For floating "quick-action" overlays (like a numeric keypad), use Glassmorphism: `surface_container_low` at 80% opacity with a `20px` backdrop-blur.

## 3. Typography
Typography is our primary tool for hierarchy. We use **Inter** for its neutral, high-legibility architecture.

*   **The "Grand Total":** Use `display-lg` for the final transaction amount. It must be the visual anchor of the screen.
*   **Product Names:** Use `title-md` or `title-lg` to ensure items are readable from a standing distance.
*   **Technical Data:** Use `label-md` or `label-sm` for SKUs and tax IDs. 
*   **Editorial Spacing:** Maintain a generous line-height (1.5x) for body text to ensure that even in dense lists, the cashier's eye can track rows without strain.

## 4. Elevation & Depth
We eschew traditional "drop shadows" in favor of **Tonal Layering.**

*   **The Layering Principle:** Depth is achieved by stacking. A `surface_container_lowest` card sitting on a `surface_container_low` background creates a natural, soft lift.
*   **Ambient Shadows:** If a floating element (like a modal payment confirmation) requires a shadow, it must be an "Ambient Shadow": 
    *   `X: 0, Y: 12, Blur: 40, Spread: 0`
    *   Color: `on_surface` (#181c1d) at 6% opacity. This mimics natural light rather than digital "glow."
*   **The "Ghost Border" Fallback:** For accessibility in input fields, use a "Ghost Border." Apply the `outline_variant` (#c0c7cd) at **15% opacity**. This provides a hint of structure without the "boxiness" of standard UI.

## 5. Components

### Buttons (Touch-First)
All buttons use the `xl` (0.75rem) roundedness scale to feel approachable yet modern.
*   **Primary:** `primary_container` background with `on_primary_container` text. Apply the subtle gradient shift for depth.
*   **Secondary:** `surface_container_highest` background. No border.
*   **Sizing:** Minimum height of `16` (3.5rem) for desktop touch-targets.

### The Transaction Cart (Lists)
Forbid the use of divider lines. 
*   **Separation:** Use `spacing-4` (0.9rem) between items.
*   **Alternating Tones:** Use a subtle shift between `surface` and `surface_container_low` for alternating rows if density is extremely high.
*   **Leading Elements:** Use `primary_fixed` backgrounds for quantity indicators to make them pop against the neutral list.

### Product Cards
*   **Style:** `surface_container_lowest` background. 
*   **Interactions:** On hover or tap, transition the background to `primary_fixed_dim`. 
*   **Typography:** The price should be `title-lg` in `on_surface`, positioned in the top-right corner for immediate scanning.

### Input Fields
*   **Style:** No background (transparent). Use the "Ghost Border" (15% `outline_variant`).
*   **Focus State:** The border transitions to 100% opacity `secondary` (#006a6a) with a 2px thickness. This provides a "Trustworthy" high-contrast indicator of the active field.

### Keypads & Modals
Use the Glassmorphism rule. A payment modal should blur the product grid behind it, using `surface_container_low` with a backdrop-blur. This keeps the cashier's focus entirely on the transaction finalization.

## 6. Do's and Don'ts

### Do
*   **DO** use whitespace (from the `spacing` scale) as your primary separator.
*   **DO** use `surface_container` tiers to group related data (e.g., grouping "Tax," "Subtotal," and "Total").
*   **DO** use `tertiary` (#402a00) and `tertiary_fixed_dim` (#ffba38) for "Review Required" or "Low Stock" warnings.

### Don't
*   **DON'T** use 1px solid black or grey borders to separate columns.
*   **DON'T** use standard Material Design "elevated" shadows; they look "templated." Stick to tonal layering.
*   **DON'T** use pure black (#000000) for text. Always use `on_surface` (#181c1d) to maintain the "Clinical Architect" sophistication.
*   **DON'T** crowd the interface. If a screen feels busy, increase the container tier rather than adding a border.
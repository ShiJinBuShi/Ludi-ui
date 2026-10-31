# Accessibility

Use the sections that apply to the changed interaction. These are a targeted quality floor, not a complete WCAG conformance audit.

## A11Y-01 · Semantics and names

**Contract.** Prefer native buttons, links, inputs, selects, and form labels. Use a button for an action and a link for navigation; an icon alone needs an accessible name. Visible labels should match the accessible name. Do not add menu, combobox, or dialog roles without their corresponding behavior. Reuse the library's tested primitive and inspect the rendered semantics, not just its component name.

**Verify:** inspect names, roles, state, and label/error associations for the changed controls. Decorative icons are hidden from assistive technology.

## A11Y-02 · Keyboard and focus

**Contract.** Complete the primary flow without a pointer. Keep focus visible and unobscured by sticky regions, sheets, or notifications. Use the widget's expected keyboard model rather than making every menu/list option a page tab stop. Scope shortcuts to the active surface and respect text entry and IME. When an item disappears, move focus to a meaningful surviving target.

**Verify:** Tab/Shift+Tab, Enter/Space, applicable arrow keys, Esc, opening/closing overlays, and focus restoration. Do not use a global `outline: none` rule.

## A11Y-03 · Contrast and non-color cues

**Contract.** For WCAG 2.2 AA targets, check normal text at 4.5:1, large text at 3:1, and relevant non-text controls/state indicators at 3:1, with the criteria's exceptions. “Large” means at least 18pt regular or 14pt bold, not any heading. Measure actual composited colors in supported themes. Errors, selection, and trend direction need text, shapes, or icons as well as color. Subtle decorative surfaces may have lower contrast; control boundaries and focus still need to be perceivable.

**Verify:** contrast on actual backgrounds, including disabled/hover/focus treatment where the criterion applies; color-independent meaning in charts and forms.

## A11Y-04 · Feedback, errors, and timing

**Contract.** Keep field errors visible until corrected or revalidated and associate them with their fields. Announce useful asynchronous status without moving focus unnecessarily; reserve assertive announcements for urgent interruptions. Do not announce every streamed token. Do not place an essential recovery action only in an expiring toast.

**Verify:** failure, correction, retry, pending state, and notification timeout behavior. Automated checks do not establish that announcements are understandable; test assistive technology when required and available.

## A11Y-05 · Reflow, targets, and motion

**Contract.** Check narrow layouts and zoom with real content. A 320 CSS-pixel width is a useful WCAG reflow check; two-dimensional tables/diagrams have specific exceptions, not an exemption for the whole page. WCAG 2.2 AA target size is generally 24×24 CSS pixels or satisfies spacing/other exceptions; use the platform/design system's larger touch targets where appropriate. Respect reduced motion, provide alternatives to dragging, and avoid interaction that depends only on hover.

**Verify:** keyboard or visible buttons can perform essential drag actions; touch, zoom, long localized text, and reduced motion preserve the same task.

## Standards to consult

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): success criteria 1.4.3, 1.4.10–13, 2.1.1–2, 2.4.7, 2.4.11, 2.5.7–8, 3.3.1–2, and 4.1.2–3 as applicable.
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/): use the relevant widget pattern; APG is implementation guidance, not itself the WCAG conformance standard.

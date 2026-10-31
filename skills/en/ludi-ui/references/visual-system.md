# Visual system and polish

## VIS-01 · Hierarchy with sufficient distinction

**Default.** Reuse semantic surface/text/border/action/status tokens and the incumbent component system. On new work, choose a coherent visual direction suited to the product and content; on refinement, improve hierarchy without replacing identity. Spacing, alignment, type scale, surface contrast, and selective borders should reveal structure and task priority.

Avoid redundant nested boxes, but do not ban borders, black backgrounds, or strong contrast globally. A media viewer or high-contrast theme may need them. The source notes' 1–3% lightness separation is a stylistic starting point, not a measurable accessibility guarantee. Check rendered content in light/dark/high-contrast contexts supported by the project.

**Verify:** primary action, grouping, control boundaries, and selected/disabled states remain distinguishable at actual display sizes.

## VIS-02 · Focus and state without layout shift

**Contract.** Keep an obvious keyboard focus indicator. A subtle double shadow can supplement it but is not automatically a substitute. Preserve forced-colors support. Reserve border space or use outline/inset shadow so focus/selection does not resize the control. Do not globally remove outlines or halve borders merely because the device has a high pixel ratio.

Example, adapting tokens to measured contrast:

```css
.control { box-sizing: border-box; border: 1px solid transparent; }
.control:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
@media (forced-colors: active) {
  .control:focus-visible { outline-color: Highlight; }
}
```

**Verify:** keyboard focus in every supported theme, forced colors where available, and unchanged geometry across hover/focus/selection.

## VIS-03 · Typography and stable numbers

**Default.** Establish readable type, line height, content width, and hierarchy using the project's fonts and localization. Use `tabular-nums` for changing numerical columns/counters where the font supports it; reserve enough space when digit count changes. A line icon offset such as `-0.125em` is a per-font optical adjustment, not a universal transform.

Dark-mode weight adjustment is optional: inspect actual font rendering first. Intermediate weights need a suitable variable font or actual font face; setting 360 on a static font does not guarantee that appearance. Do not claim a fixed 10% perception effect or apply “minus 40” globally. `text-wrap: pretty` can progressively improve prose where supported, with normal wrapping as fallback.

**Verify:** real CJK/Latin strings, unavailable font fallback, long headings, changing digit counts, and both themes.

## VIS-04 · Geometric consistency and disclosure

**Default.** For genuinely concentric nested shapes with uniform padding, start with `innerRadius = max(0, outerRadius - gap)`. It is not a rule for every child in a rounded container; content alignment and existing tokens matter. Use a small consistent spacing/radius vocabulary rather than arbitrary near-duplicates.

For intrinsic-height disclosure, Grid `0fr`→`1fr` can avoid repeated JS measurement, but needs a shrinkable inner wrapper (`min-height: 0; overflow: hidden`). CSS clipping alone does not hide controls from keyboard/assistive technology: synchronize collapsed state, focus, `hidden`/`inert` or the primitive's equivalent, including reduced-motion/no-animation paths. If an exit transition delays removal, make the content non-interactive immediately and complete hiding reliably.

**Verify:** zero/long/dynamic content, focused descendants during collapse, transition interruption, and layout stability.

## VIS-05 · Motion follows purpose

**Default.** Direct manipulation follows the pointer promptly; a short settle can indicate a snap. Confirmation feedback may have a restrained spring if it fits the product. Use named duration/easing tokens, prefer transform/opacity when suitable, and avoid `transition: all`. Do not let animation delay committing state or recovery controls.

Per-character blur, large scaling, and perpetual motion are optional and potentially costly. Prefer a bounded chunk effect when it improves the intended experience. With `prefers-reduced-motion: reduce`, remove or simplify nonessential effects and smooth scrolling while preserving feedback. Scope overrides to the component rather than disabling every application transition blindly.

**Verify:** interruption/repeated clicks, slow devices or long streams when relevant, reduced motion, and cleanup on unmount. [Reduced-motion reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) explains the preference; it does not prescribe one universal duration.

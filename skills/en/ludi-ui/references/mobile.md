# Mobile and touch patterns

Apply to responsive web/H5. For a native app or mini-program, use its established platform components and lifecycle instead of transplanting DOM/ARIA mechanics.

## MOB-01 · Bottom sheets for interactive content

**Default.** Use a bottom sheet when content benefits from staying near the current context and progressive height. Choose only useful detents, bounded by content, available viewport, and the keyboard; 30/60/80% are example proportions, not a required set. Distinguish modal sheets from nonmodal panels. Long content scrolls inside the appropriate region without fighting the drag handle.

Provide a visible close/collapse/expand alternative to gestures, preserve focus, and make collapsed content non-interactive. Decide whether dragging downward closes or moves to another detent, particularly with dirty forms. Do not create an empty peek state merely to have three states.

**Verify:** small/landscape screen, expanded text, scrolling at the top/bottom, keyboard opening, detent transitions, and accessible alternatives to drag.

## MOB-02 · Action sheets for commands

**Default.** Use a short action list for contextual commands such as camera/library or item actions. Keep cancel easy to find and separate from destructive commands according to the platform's convention. Name destructive consequences and use more than color to distinguish them. Logout is not inherently equivalent to data destruction. A longer explanatory flow belongs in a sheet/page rather than a crowded command list.

**Verify:** tap targets, screen-reader labels, safe cancellation, and that each command fires once. Destructive confirmation still follows [Overlays](overlays.md).

## MOB-03 · Viewport, keyboard, and input reach

**Contract.** Respect safe-area insets and the actual visible viewport. Use `dvh` or an equivalent supported approach with a fallback when the browser matrix needs one. Keep the focused field, error, primary action, and close control reachable as the keyboard changes available space. Scroll lock must be restored when a modal closes or unmounts. Do not apply `touch-action: none` to the whole page to fix a handle.

Design for touch and keyboard without relying on hover or a particular hand. Keep gestures from colliding with page scrolling or platform navigation; prefer proven primitives. Responsive adaptation preserves the task, not just desktop proportions.

**Verify:** browser chrome expansion, safe areas, keyboard resize, orientation, back/cancel behavior, and opening/closing repeatedly without trapped page scroll.

## MOB-04 · Tours, media, and validation

**Default.** A tour should be skippable and dismissible, show progress, and tolerate a missing target, changed layout, or route change. Keep ordinary help available outside the tour; onboarding is not a prerequisite for operating the UI.

A media viewer/lightbox should preserve origin/return focus, fit content, expose zoom/navigation controls when useful, and offer accessible close. Dark backgrounds and swipe gestures are choices; a standalone image route or native viewer can be valid. Supply meaningful alternative text/captions. A form error is inline, associated, and persistent, never only a fading toast.

**Verify:** exit mid-tour, missing target, first/last media item, non-gesture controls, and persistent field error/correction.

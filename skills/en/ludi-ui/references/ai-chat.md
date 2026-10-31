# AI chat and dynamic workspaces

## AI-01 · Composition-safe submission

**Contract.** Inspect the project's send/newline shortcut first. Track `compositionstart`/`compositionend` and consult the keyboard event's `isComposing` (or the framework's native event). Enter that commits IME text must not send. Respect modifiers, repeated keydown, empty/disabled/pending state, and the explicit Send button. Share one submission path so button, shortcut, and form handlers cannot double-send.

Some browser/IME event orders require a targeted compatibility guard. Observe the actual sequence in supported browsers before adding one; deprecated keyCode 229 may be a narrowly scoped fallback, not the primary model. Do not add a blanket 500ms cooldown after composition: it can suppress the user's intentional next Enter. Synthetic composition tests verify logic, not the real browser/IME sequence.

**Verify:** real Chinese/Japanese composition where supported, candidate-confirm Enter, an immediately intentional next Enter, Shift+Enter/newline convention, held Enter, click Send, and no double submit. State explicitly when real IME/Safari testing is unavailable. [UI Events composition semantics](https://www.w3.org/TR/uievents/#events-compositionevents) and [isComposing documentation](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing) inform the event model, not a universal debounce duration.

## AI-02 · Reader-controlled following

**Contract.** Model following the latest output as explicit state. Only follow while the reader is near the end or has deliberately requested latest. A deliberate move away pauses following. New tokens, images, code blocks, and resize must not pull a reader out of history. Reaching the end or activating “Jump to latest” can resume following; ordinary wheel activity at the bottom need not disable it forever.

Use a bottom sentinel or a measured distance with tolerance rather than exact equality. One/three line heights are starting heuristics; choose thresholds from actual density and viewport. Show a keyboard/touch-accessible latest button or unread indicator while paused. Coalesce scroll work; do not smooth-scroll on every token. Honor reduced motion.

**Verify:** stream → scroll upward → receive more content → maintain position → jump latest → resume, including asynchronous media and input-area resizing.

## AI-03 · Streaming, recovery, and rendering cost

**Contract.** Preserve message IDs, text selection, copy behavior, Markdown/code structure, and assistive-technology reading. Batch rendering work and avoid a DOM element/animation timer per character for unbounded streams. Partial markup must not break the tree; sanitize untrusted rendered content through the project's established pipeline.

Keep pending, streaming, stopped, failed, and complete states distinguishable. Abort/clean up obsolete streams on the appropriate lifecycle. Retry must not silently duplicate messages; do not invent resume support that the service lacks. Announce meaningful milestones rather than every token.

**Verify:** long output, fenced code split across chunks, stream failure/stop/retry, navigation away, copy/select, and no growing timer/listener leak. A brief chunk fade is optional visual polish, disabled or simplified under reduced motion.

## AI-04 · Resizable split panes

**Default.** Clamp panes to useful minimum sizes and switch to tabs/stacking when both no longer fit. During dragging, use pointer capture and, where needed, a temporary iframe interaction shield. Remove the shield, listeners, and cursor overrides on release, cancel, blur/unmount. Provide a keyboard-operable separator with name, orientation, current value, and bounds; expose buttons for equivalent collapse/restore where needed.

Esc can cancel the current drag back to its starting size. Double-click reset and collapse near 20% are optional conventions, not requirements; use the product's useful default/minimum width. Preserve a visible restore affordance after collapse.

**Verify:** crossing iframe boundaries, pointer cancellation, keyboard resize, narrow viewport, reset/collapse/restore, and focus when a pane disappears. [APG window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/) is useful working guidance; check its current status when implementing a custom pattern.

## AI-05 · Attachment names and metadata

**Default.** For long filenames, preserve an informative extension using a flexible basename and nonshrinking suffix where useful. Keep the full name available through an accessible name and focus/tap detail, not only hover. Use `min-width: 0` on the truncating flex child. Derive compound-extension handling from product needs; display extensions are not MIME/security validation.

**Verify:** no extension, `.env`, compound extensions, Unicode/RTL names, duplicate names, very narrow containers, and that the accessible full name does not change the upload payload.

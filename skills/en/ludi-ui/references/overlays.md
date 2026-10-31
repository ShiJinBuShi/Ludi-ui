# Overlays and feedback

## OVR-01 · Match purpose to interruption

**Default.** Choose the lightest surface that preserves comprehension and recovery.

| Need | Likely surface | Important boundary |
| --- | --- | --- |
| Supplemental short explanation | Tooltip | Available on focus as well as hover; no essential instructions or interactive content |
| Brief result with no required action | Toast/status | Does not steal focus; persistent errors remain elsewhere |
| Recoverable result with an action | Snackbar/banner | The undo action must be real and discoverable |
| Ongoing page/system condition | Inline/banner alert | Stays until resolved or intentionally dismissed |
| Local, short confirmation | Popconfirm or small dialog | Same keyboard/focus obligations as the actual interaction |
| Focused form or consequential decision | Modal dialog | Not restricted to destructive operations |
| Contextual edit/reference | Drawer or nonmodal panel | A drawer may itself be modal; choose behavior deliberately |
| Long, shareable, independent flow | Page/route | Preserve navigation and return context |

Widths such as 400/520/720px are design tokens, bounded by viewport and content. Do not add an overlay merely because an action exists.

**Verify:** the user can locate the message, act or cancel, and continue the previous task.

## OVR-02 · Modal lifecycle and safe cancellation

**Contract.** Give dialogs a name, appropriate initial focus, background inertness when modal, an internal tab sequence, and focus restoration. Use `alertdialog` only for an urgent, brief message needing a response; a form is not automatically an alert dialog. Prefer a tested primitive over hand-built focus trapping.

Esc normally cancels/dismisses, including destructive confirmations; it never confirms. Backdrop dismissal is a separate product choice. Provide a visible cancel/close route. For irreversible actions, state the affected object and consequence, use explicit action labels, and initially focus a safe target. A narrowly justified non-dismissible pending transaction still needs a defined completion/failure path; do not infer such a requirement from “dangerous.”

**Verify:** open, Tab/Shift+Tab, Esc, cancel, confirm, pending/failure, and return focus. Read [APG modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) and [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) for their respective semantics.

## OVR-03 · Dirty forms and dismissal

**Contract.** Specify what happens to entered data on close, backdrop, Esc, navigation, and save failure. A dirty form may route dismissal through a discard decision or preserve its in-memory draft. Do not silently lose edits. Do not introduce server autosave or persistent local storage without an appropriate product/data decision; sensitive content, user switching, and schema changes affect persistence.

If confirmation is needed, prefer the current surface or the library's supported dialog stack; prevent duplicate overlays and restore focus coherently. Canceling the discard decision returns to editing.

**Verify:** clean vs dirty close, explicit discard, canceled discard, reopen, failed save, and any supported draft restoration.

## OVR-04 · Lifetime and placement

**Contract.** Duration depends on the message and required action. About 2–3 seconds can suit a short, nonessential success hint; it is insufficient as a universal timeout for errors, undo, or long text. Preserve essential information and recovery after a transient message disappears. Pause/extend interactive notifications as needed for keyboard/focus and reading. Deduplicate repeated events and avoid covering active controls or the software keyboard.

Tooltips must remain usable when moving from trigger to tooltip, be dismissible, and be available without a mouse. If content needs buttons/links, use a popover/dialog rather than pretending it is a tooltip. The [APG tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) is working guidance; relevant hover/focus requirements also appear in WCAG 1.4.13.

**Verify:** hover/focus, Esc, multiple messages, slow reading, narrow view, and hidden/unmounted routes.

## OVR-05 · Undo is a data capability

**Contract.** Offer immediate action plus undo only when the service/local state can truly restore the previous state. Specify pending, failure, undo deadline, and concurrent-change behavior. Do not show a cosmetic Undo button or promise reversibility after a permanent delete. When undo is unavailable and consequences warrant it, use confirmation appropriate to the risk; frequency alone does not make bulk deletion safe.

**Verify:** failed operation, failed undo, repeated activation, timeout, and correct row/focus restoration. A canceled dialog makes no destructive request.

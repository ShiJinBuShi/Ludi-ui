# Selection controls

## SEL-01 · Value or command

**Contract.** A Select/combobox chooses a value that remains visible and participates in form/filter state. A menu exposes actions such as export, rename, or delete. Choose by semantics, not whether the trigger has a border. Keep value, label, disabled state, and submitted ID distinct; translated labels are not identifiers. Do not turn a destructive command into a select option just to reuse styling.

**Verify:** selecting a value updates the intended field; an action invokes only its command. Preserve the request payload and prevent unintended submit/navigation.

## SEL-02 · Expose useful choices

**Default.** For a few short, comparable choices, consider radios or a segmented control. Use a switch for a boolean setting that takes effect immediately; use a checkbox for a submitted boolean or agreement. A compact Select can still suit two choices in a dense table or native mobile UI. Count, label length, space, frequency, and consistency decide; “two options forbid Select” is not a universal rule.

For familiar user data, choose an appropriate input. Phone numbers and identifiers are strings, often with leading zero or `+`; use text/tel with suitable input hints, not a numeric spinner. Dates may use direct entry plus a calendar; preserve locale and validation requirements.

**Verify:** the chosen control communicates when a value is applied and accepts valid real-world input.

## SEL-03 · Long and remote option lists

**Default.** Provide search/typeahead when scanning becomes difficult; more than about ten options is a review signal, not a threshold mandated by a standard. Bound the popup to available viewport space and allow internal scrolling. Prefer the positioning primitive's flip/shift behavior over hardcoded up/down rules. A 264px max-height may be a starting token, never a guarantee that the panel fits.

For remote search, expose pending, empty, error, and retry states. Cancel obsolete work or reject stale responses. Preserve selected values when they leave the current results. Introduce virtualization only if needed and retain the active option's accessibility semantics.

**Verify:** type, navigate, select, clear, reopen, and recover from a slow/out-of-order request near every relevant viewport edge.

## SEL-04 · Accessible interaction

**Contract.** Use native Select unless the task needs capabilities it lacks. For custom controls, follow the appropriate combobox/listbox/menu pattern. Keep accessible name separate from current value; maintain expanded state, popup relationship, active option, and selection. Esc closes exploration safely. Search text entry must not be intercepted by application shortcuts.

**Verify:** complete the flow by keyboard and inspect the roles/states produced by the library. Follow [APG combobox guidance](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) when a custom combobox is actually required.

## SEL-05 · Multi-selection presentation

**Default.** Compress selected labels with a group/count and `+N` when space is limited, while keeping the real selected IDs intact. Offer focus/tap access to all selections, removal, and clear actions; a hover-only list is insufficient. Do not trade away review/edit access to enforce a one-line appearance. For tree semantics and all-results selection, also read DATA-03 in [Data dashboards](data-dashboards.md).

**Verify:** long labels, partial selection, collapsed groups, disabled items, and mobile removal do not change the selected set.

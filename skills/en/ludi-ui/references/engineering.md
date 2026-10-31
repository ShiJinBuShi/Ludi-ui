# Implementation and verification

## ENG-01 · Establish current truth

**Contract.** Read applicable repository instructions, working changes, package manager/lockfile, actual scripts, target routes/components, adjacent design patterns, tokens, data types, and existing checks. Inspect only what is needed. Start the app using its documented scripts when possible; identify the correct route, role, theme, and test data. Screenshots are evidence of a state, not proof of underlying behavior or live data.

**Verify:** know which files and behavior the request covers, which interfaces must stay stable, and which verification tools are actually available. Never overwrite unrelated changes to get a cleaner starting point.

## ENG-02 · Scale the plan and architecture

**Default.** For a small change, use a short plan; for a multi-surface change, use the [change brief](../templates/change-brief.md) or the project's equivalent. Specify the primary user task, current vs intended behavior, relevant rule IDs, affected components, states, and acceptance examples. Reuse existing components/tokens before extracting a new abstraction; create a shared primitive when repeated behavior justifies it. Keep domain/query state outside purely visual presentation where the project architecture expects it.

For greenfield work, use the requested stack, or choose a proportionate existing setup; do not silently migrate an incumbent project. Establish a minimal token/component vocabulary and a complete primary path before secondary polish. Do not require a design system document for a two-line fix.

**Verify:** the plan maps to the user's requested outcome, without speculative features or unnecessary dependencies.

## ENG-03 · Explicit state and async ownership

**Contract.** Define applicable idle/loading/empty/error/success states and transitions. Distinguish disabled, read-only, and pending. Preserve user input on failure and provide a real recovery path. Reject stale results, cancel obsolete requests when supported, prevent duplicate consequential actions, and clean up listeners/timers/observers/streams on the correct lifecycle. Reopening or unmounting must not leak a scroll lock, focus trap, pointer shield, or background operation.

Keep draft/applied/selected/expanded state separate when their semantics differ. Preserve stable IDs, payload shape, sorting/pagination, permission behavior, localized text handling, and URL/history contracts. Do not replace the project's state library or add global state for a local visual fix.

**Verify:** adversarial orderings such as request B returning before A, close while pending, quick reopen, repeated submit, and failed recovery, scoped to the changed behavior.

## ENG-04 · Evidence-based verification

**Contract.** Discover existing commands; do not invent script names. Run appropriate lint/type/build checks and relevant tests, with recorded results. Add behavioral regression coverage for meaningful changed logic when the project's tooling supports it. Do not add snapshots/tests that merely restate CSS or reproduce implementation details. Do not install a new test/browser framework just to claim coverage for a minor edit.

| Changed surface | Useful evidence |
| --- | --- |
| Spacing, type, borders, themes | Rendered comparison at relevant sizes/themes, plus existing static checks |
| Selection, modal, form | Pointer and keyboard path, cancellation, focus return, persistent errors |
| Async filters/export | Request/state assertions, out-of-order/failure path, visible applied criteria |
| Chat/stream | Composition logic, real IME when available, reader-controlled scroll, stop/retry |
| Touch sheet/drag | Narrow viewport, touch/keyboard alternatives, keyboard resize, release/cancel cleanup |

Look at the rendered change in the app or available browser tool. Batch visible corrections before recapturing. If the app cannot run, perform static/logic checks and explain the exact missing runtime evidence. A synthetic event test cannot establish real IME, layout, screen-reader, mobile keyboard, or performance behavior. Use project budgets; measure before asserting a performance improvement.

**Verify:** no relevant introduced console/runtime errors; classify pre-existing failures separately. Run focused checks again after relevant fixes, not endless unrelated suites.

## ENG-05 · Deliver an auditable result

**Contract.** For implementation, give changed files, user-visible behavior, material decisions/deviations, and actual validation evidence. Use `PASS`, `FAIL`, `NOT_TESTED`, and `N/A` accurately. List missing prerequisites and impact when a relevant check could not run. Do not call the UI production-ready or fully WCAG-compliant based on a build or automated scanner alone.

For review, prioritize findings by user consequence: data loss/unintended actions, blocked/inaccessible flows, incorrect state/data, then visual inconsistency. Supply file/line evidence, reproduction or observed condition, and a concrete remedy. Separate confirmed defects from unverified risks. If no actionable findings remain, say so with the evidence boundary.

**Verify:** another engineer can reproduce the key checks and understand what remains unknown without reading the conversation.

## ENG-06 · Scope and external effects

**Contract.** A UI task authorizes its requested local implementation and proportionate checks. Follow the host/user's existing permission boundaries for external effects; it does not automatically authorize deployment, publication, permanent data deletion, account changes, paid dependencies, or replacing business APIs. Test destructive flows using appropriate isolated fixtures or sanctioned test data. Preserve unrelated files and changes. Never place credentials or personal production data in screenshots, fixtures, or reports.

**Verify:** the diff stays in scope, generated files are intentional, and the final flow does not depend on invented backend capabilities.

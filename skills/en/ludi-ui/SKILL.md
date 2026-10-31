---
name: ludi-ui
description: "Build, modify, or review frontend UI in an existing or new codebase. Use for component selection, forms and overlays, admin dashboards, AI chat, responsive behavior, and visual refinement with implementation and verification. Do not use for backend-only work or static artwork."
metadata:
  version: "1.0.0"
  language: "en"
---

# Ludi UI

Turn a UI request into a working, verified change while respecting the product, framework, and design system. This package is framework-independent; use the host's available file, terminal, browser, and testing tools. No specific MCP, CLI, network access, or second skill is required.

## Start from the requested outcome

Determine the target route/component, the user's task, and whether this is **build**, **modify**, or **review**. Review requests stay read-only unless fixes are requested. A refinement preserves the current identity; a redesign follows the requested replacement direction. Do not quietly turn either into a product rewrite.

Inspect local project instructions, package scripts, target code, nearby components, tokens, data contracts, and existing tests. Look at the rendered target when available. Existing code and observed behavior outweigh assumptions from screenshots or filenames. Preserve unrelated working changes.

Resolve routine choices from project evidence. Ask only when missing information changes the product outcome, data meaning, or authorized scope; continue independent work. A missing design document alone does not block a narrow change. For a new UI, derive a coherent typography, spacing, color, and component vocabulary from the brief; do not automatically impose an AI-chat aesthetic.

## Load knowledge selectively

Read the relevant sections of [Engineering](references/engineering.md) and [Accessibility](references/accessibility.md) for implementation or review. Then load only the scenario modules needed; do not read the entire package for a small task.

| Trigger in the request or code | Reference | Decision it supports |
| --- | --- | --- |
| Select, command menu, few/many options, multi-select | [Selection controls](references/selection-controls.md) | Choose by value vs action; support search and stable selection |
| Tooltip, toast, confirmation, modal, drawer, dirty form | [Overlays](references/overlays.md) | Match interruption, persistence, and dismissal to consequences |
| Touch UI, sheet, action sheet, media viewer, tour | [Mobile](references/mobile.md) | Handle gestures, keyboard, safe areas, and alternate controls |
| Composer, IME, streaming, chat scroll, split preview, attachments | [AI chat](references/ai-chat.md) | Protect input, reading position, and streaming performance |
| Admin filters, date ranges, tags, charts, drill-down, export | [Data dashboards](references/data-dashboards.md) | Preserve query meaning and connect information to action |
| Theme, borders, typography, radii, layout stability, animation | [Visual system](references/visual-system.md) | Improve craft without reducing usability |
| State, async requests, component boundaries, checks, handoff | [Engineering](references/engineering.md) | Deliver a maintainable change with honest evidence |
| Keyboard, focus, naming, contrast, announcements, reflow | [Accessibility](references/accessibility.md) | Verify interaction beyond mouse-only success |

For source provenance or a disputed recommendation, read [Sources](references/sources.md). For a substantial task, adapt the [change brief](templates/change-brief.md); a small fix needs only a short inline plan. Do not create process documents unless they help the requested work.

## Make the decision explicit, then implement

1. State the observed problem, intended behavior, affected surface, and relevant rule IDs. For new work, name the primary task, visual direction, and necessary states. Prioritize lost data, unintended actions, inaccessible controls, and broken flows before decoration.
2. Define the interaction contract: value vs command; draft vs applied state; loading/empty/error/success; dismissal/undo; keyboard and mobile behavior. Use the existing library's accessible primitives before building custom infrastructure.
3. Implement within existing boundaries. Preserve API payloads, validation, authorization visibility, localization, routes, and analytics unless the request changes them. Do not invent data, permissions, undo endpoints, persistent drafts, or business capabilities to satisfy a visual suggestion.
4. Verify the changed behavior with the project's appropriate checks and the rendered result. Exercise applicable failure, keyboard, narrow-viewport, long-content, theme, and reduced-motion paths. Choose checks proportional to the change; a spacing fix does not need an unrelated test suite or a new framework.
5. Report what changed, why, and how it was verified. Give actual commands/results and remaining limits. If a required capability is absent, mark that check `NOT_TESTED`; identify the missing evidence and perform the checks still possible.

## Resolve rules without flattening context

- **Contract** rules protect behavior, data, or accessibility in their applicable scenario. **Default** rules are starting choices; record the reason when project evidence warrants another choice. **Optional** effects require a demonstrated benefit. These labels describe this skill's engineering policy, not a claim that every sentence is a web standard.
- The user's task sets scope and style; applicable project constraints and functional/accessibility needs bound implementation. If they conflict, name the concrete consequence and propose an alternative instead of silently discarding one. Source-note slogans do not outrank product facts or verified standards.
- Numbers such as 264px, 30/60/80%, 2.5 seconds, a 20% collapse threshold, or a font-weight offset are examples, not global constants. Choose tokens and thresholds for the actual content, viewport, device, latency, font, and component library.
- Preserve a visible focus indicator, an operable cancellation path, and critical information outside ephemeral/hover-only UI. Esc normally dismisses a dialog or cancels safely; it never confirms a destructive action.
- Rich effects, hidden filters, chart comparisons, exports, autosave, and hierarchical selection are conditional capabilities. Add them only within the requested scope and supported data contract.

## Delivery contract

For implementation, deliver changed files and a usable flow, not only recommendations. For review, give prioritized findings with file/line evidence, user consequence, and a specific remedy; distinguish observed failures from untested risks. Do not claim browser, real-IME, screen-reader, or production validation from static review or synthetic events.

When maintaining the skill itself, use the [knowledge module template](templates/knowledge-module.md) and `manifest.json`: preserve rule IDs, add bilingual equivalents, register the module in this routing table, and validate both language packages. Ordinary UI work does not authorize editing this skill.

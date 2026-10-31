# English forward evaluation: chat review

Date: 2026-11-01. Evaluator: independent local agent `/root/forward_eval_en`, using the inherited session model (no model override). Mode: read-only. Target: [chat-panel.jsx](../fixtures/chat-panel.jsx). This intentionally defective source fixture has no running project.

## Prompt provided

“Please review this chat panel before we ship. Chinese and Japanese users type here, and responses stream while users read history. Give actionable findings and explain what you could verify.”

The evaluator received only the request, English entrypoint, target path, and read-only/evidence constraints. It was instructed not to read the expected criteria, root documentation, other locale, or other fixture.

## Returned findings

The evaluator returned `CHANGES_REQUIRED` with these source-backed issues:

| Priority | Finding | Source line | Rule |
| --- | --- | --- | --- |
| P1 | Candidate-confirm Enter can send and clear unfinished composition | 38 | AI-01 |
| P1 | Asynchronous send clears the draft before success, accepts empty/repeated sends | 12 | ENG-03, AI-01 |
| P1 | Every message-array update requests smooth scrolling, even while reading history | 8 | AI-02 |
| P2 | Focus outline removed without replacement | 20 | A11Y-02 |
| P2 | Composer lacks an accessible name | 35 | A11Y-01 |
| P2 | Whole streaming transcript uses assertive announcements | 25 | A11Y-04, AI-03 |
| P2 | Per-code-unit spans split Unicode and grow DOM/animation work | 28 | AI-03, A11Y-05 |

The proposed remedies used composition state instead of a blanket cooldown, preserved an intentional next Enter, introduced explicit follow/pause state, and kept draft recovery and visible focus. The reviewer did not propose an unrelated redesign or modify files.

## Evidence boundary

The evaluator reported six in-memory Node probes of the verbatim handlers: composing Enter, rejected send, repeated Enter, whitespace, UTF-16 splitting, and Shift+Enter. Those probe commands were not persisted; they are evaluator-reported supplemental observations, not reproducible browser-test artifacts. The primary evidence for this evaluation is the source and returned review above.

`NOT_TESTED`: mounted React, real IMEs/Safari ordering, actual scroll geometry, screen-reader output, focus rendering, Unicode shaping, reduced-motion rendering, and performance. The evaluator explicitly disclosed these limits. The maintainer re-read the fixture and checked the cited conditions; this evaluation passes the source-review criteria of EV-03, not a runtime UI acceptance gate.

## References actually read

- `skills/en/ludi-ui/SKILL.md`
- `references/engineering.md`
- `references/accessibility.md`
- `references/ai-chat.md`

Only three of the eight modules were needed. No expected-answer material was supplied.

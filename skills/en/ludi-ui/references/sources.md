# Sources and normalization

Reviewed: 2026-11-01. This skill synthesizes six user-supplied video notes and adds engineering guidance. The original video's author, links, source code, and measurements were not supplied. Claims such as “183 standards,” “90% coverage,” “58% fewer steps,” and “40% faster” are unverified note content, not promises or evidence of product performance. No affiliation with the referenced companies is implied.

## Source map

Original filenames are retained as provenance labels; the package does not require those files at runtime.

| Source | Original note in the repository root | Destination |
| --- | --- | --- |
| S01 | 下拉组件选型与设计规范Skill.md | SEL-01–05; DATA-03 |
| S02 | 弹出层交互设计选型与避坑skill.md | OVR-01–05 |
| S03 | 移动端浮层组件开发规范Skill.md | MOB-01–04; OVR-02/04/05; A11Y-04 |
| S04 | 大厂AI界面设计规范skill.md | AI-01/02/04/05; VIS-01/02/04 |
| S05 | 大厂AI客户端UI质感优化Skill.md | VIS-01–05; AI-03; OVR-04 |
| S06 | 数据后台四刀优化法.md | DATA-01–05; SEL-05 |

ENG rules, cross-cutting accessibility, async ownership, evidence levels, and language/package maintenance are engineering additions. They are not attributed to the unnamed blogger. Module IDs and rule levels are this project's editorial model.

## Decisions that deliberately refine the notes

| Note recommendation | Engineering interpretation and reason |
| --- | --- |
| Ban outlines; subtle shadows are sufficient | VIS-02 preserves visible focus and forced-color behavior; polish cannot silently remove keyboard affordances |
| Dangerous dialogs must disable Esc | OVR-02 treats Esc as safe cancellation, consistent with modal keyboard guidance; cancellation never executes destruction |
| Block Enter for 0.5 seconds after composition | AI-01 uses composition state plus evidence-based compatibility handling; a global delay can swallow intentional sends |
| Every character needs blur animation | AI-03/VIS-05 make it optional, bounded, and reduced-motion aware; preserve rendering cost and text behavior |
| Fixed weights, radii, heights, counts, timeouts | Condition them on actual fonts, geometry, viewport, latency, and task; examples do not become universal tokens |
| Every form needs autosave; every delete can undo | OVR-03/05 require supported persistence/recovery and explicit data semantics |
| More than ten options require search; two forbid Select | SEL-02/03 use discoverability, space, and interaction cost instead of rigid counts |
| Phone numbers should be numeric inputs | SEL-02 preserves string semantics, leading zeros, and international prefixes |
| Always use black lightboxes; never view images in another route | MOB-04 preserves platform/product choice and accessible controls |
| Add comparison, chart linking, export to every dashboard | DATA rules condition those features on the task and service contract; no fabricated data or business features |

## Primary references and limits

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): normative accessibility criteria, with scope and exceptions; targeted checks here are not a full conformance evaluation.
- [APG modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) and [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/): keyboard/focus and role guidance; an alert dialog inherits modal keyboard interaction.
- [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/): custom selection semantics and keyboard models.
- [APG tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) and [window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/): useful working patterns with status notes; not universal proof of conformance.
- [UI Events](https://www.w3.org/TR/uievents/#events-compositionevents): composition model in a working draft; actual browser/IME event sequences require testing.
- [MDN isComposing](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing) and [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion): platform behavior and compatibility references, not product-specific timing mandates.

When extending a rule, record its source, applicability, reviewed date, and remaining uncertainty. Prefer current project evidence and primary implementation/standards documentation over an unqualified “big-company standard.”

# Extension contract

## Knowledge and runtime boundaries

`skills/en/ludi-ui` and `skills/zh-CN/ludi-ui` are independently self-contained. The entrypoint owns scope/workflow/routing, references own scenario decisions, and templates support recurring artifacts. `manifest.json` is the structural/parity contract, not required reading for every UI task. Originals, maintainer tooling, and evaluation materials are outside the runtime reading path.

Give each piece of knowledge one primary maintenance location and link to it from other modules. Add framework-specific modules, such as `react-forms.md`, only when needed, with precise triggers. Do not present a React implementation as a universal frontend requirement.

## Incorporate a new note

1. Record provenance, author/link when known, date, target context, and evidence limits. Treat unsourced experience as experience, not a standard; separate raw material from executable guidance.
2. Deduplicate against existing rule IDs. Extend an existing rule for new conditions/exceptions; add a module for a distinct task. Resolve platform differences, product choices, outdated implementations, and genuine errors instead of concatenating conflicting advice.
3. Follow [knowledge-module.md](../skills/en/ludi-ui/templates/knowledge-module.md): problem → criteria → implementable behavior → exception/fallback → observable verification. Explain the applicability of numerical examples.
4. Update both language modules, stable IDs, levels, and manifests. Each module has `id`, `path`, and a `rules` map whose values are `contract`, `default`, or `optional`.
5. Add scenario routes to both entrypoints and update both provenance pages and behavioral cases. Split substantial knowledge by scenario rather than inflating the entrypoint.
6. Run structural/defect-injection checks, then review meaning and behavior. Matching versions, IDs, and paths does not prove equivalent translations or sound decisions.

## Structural example

After writing a complete bilingual form module, add this object to both manifests' `modules`:

```json
{
  "id": "forms",
  "path": "references/forms.md",
  "rules": {
    "FORM-01": "contract",
    "FORM-02": "default"
  }
}
```

Use headings such as `## FORM-01 · Preserve input after failure`, followed by `**Contract.**`; the Chinese equivalent uses `**Contract（契约）。**`. This format lets the validator compare rule IDs and levels; translated titles need not match word for word. Every module needs an entrypoint route. Do not ship heading-only scaffolds or unfilled template copies as modules.

## IDs and versions

- Module IDs use lowercase hyphenated words. Paths are case-sensitive for packaging, and links stay inside each language package.
- Rule IDs use an uppercase alphanumeric prefix and number, such as `AI-01` or `A11Y-02`. Never renumber or reuse an established ID. Record retirements/replacements below and update both languages together.
- Use patch for wording/corrections, minor for compatible additions, and major for removals, changed level semantics, or incompatible workflows. Keep both entrypoints' metadata and manifests at the same version.
- `schemaVersion` versions the maintenance format. Update validator/tests when changing the manifest shape, rather than changing only the skill version.

## Maintainer checks

```sh
node tools/validate.mjs
node --test tests/validate.test.mjs
```

Add bilingual prompts, relevant rules, and observable pass criteria to `evals/cases.json`. An independent evaluator receives the request, one language package, and necessary fixtures, without expected answers. Run mutating tasks in an isolated directory. Record agent/version/environment, outcomes, and untested checks. An existing validation report does not automatically cover a new module.

The validator does not judge appearance, translation meaning, or comprehensive WCAG conformance. Add scripts/framework fixtures only for a concrete repeated use and execute them before delivery. Ordinary advice does not need programs or dependencies merely to appear engineered.

## Release distributions

Runtime changes do not automatically update ZIP files in `dist/`. After validation and behavioral review, archive each complete `ludi-ui` directory under the new version, retaining a top-level `ludi-ui/` folder. Name files `ludi-ui-VERSION-LOCALE.zip`. Compare the archive entry set and each file's bytes with the source package, then regenerate `SHA256SUMS`. Exclude original notes, evaluation targets, and maintainer tooling from runtime archives.

The structural validator normally checks source directories; it does not establish that a published ZIP matches them. Update README versions/counts/distribution links and record fresh evidence rather than inheriting an earlier behavioral pass for new knowledge.

## Retired IDs

None currently.

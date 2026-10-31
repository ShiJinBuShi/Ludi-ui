# Knowledge module authoring template

This is a maintainer template, not a runtime UI checklist. Replace the instructional example when authoring a real module.

## Module contract

- Stable module ID and lowercase-hyphen filename:
- Trigger/scenario; non-applicable situations:
- Source note or primary source, section, reviewed date, evidence limits:
- Existing rule overlap and conflict resolution:
- Corresponding English/Chinese file and matching rule IDs:

## Rule format

Give every rule a stable heading such as `## FORM-01 · Preserve input after failure` and declare **Contract**, **Default**, or **Optional**. Use the same ID and level in both manifests. A default needs decision criteria and legitimate alternatives; an optional effect needs a reason to exist. A contract needs a concrete behavior/data/accessibility consequence, not just a taste preference.

Each rule should contain:

1. Applicability and the user's problem.
2. Decision criteria, implementable behavior, and exceptions/fallback.
3. Observable verification, including a negative/failure case when relevant.
4. Source and evidence limit where the claim is non-obvious.

## Registration and validation

Add the module path/rule IDs/levels to both `manifest.json` files and a scenario route to both `SKILL.md` files. Update source provenance and behavioral cases. Keep local links inside each language package. Validate structure and bilingual parity, then run a realistic scenario without feeding its expected answer to the evaluating agent. Do not renumber or reuse retired rule IDs; document replacements.

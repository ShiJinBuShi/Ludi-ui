# Ludi UI

[简体中文](README.md)

A frontend UI engineering skill for coding agents, built from the six video notes in this repository. It connects scenario decisions to implementation, interaction and visual quality, verification, and delivery. It is framework-independent and requires no particular component library, MCP, or commercial model.

## Language packages

| Language | Entrypoint | Use |
| --- | --- | --- |
| Simplified Chinese | [skills/zh-CN/ludi-ui/SKILL.md](skills/zh-CN/ludi-ui/SKILL.md) | Chinese instructions and references |
| English | [skills/en/ludi-ui/SKILL.md](skills/en/ludi-ui/SKILL.md) | Equivalent English instructions and references |

Both are `ludi-ui` v1.0.0 and can be copied independently. Each contains eight scenario/engineering modules, 40 stable rule IDs, provenance notes, two templates, and optional host UI metadata. Rules distinguish contracts, defaults, and optional effects. Numerical examples are not global requirements.

Distributions: [English ZIP](dist/ludi-ui-1.0.0-en.zip) · [简体中文 ZIP](dist/ludi-ui-1.0.0-zh-CN.zip) · [SHA-256 checksums](dist/SHA256SUMS). Each archive extracts to a complete `ludi-ui` folder.

## Use with an agent

For a host supporting `SKILL.md`, choose one language and copy its complete `ludi-ui` folder into that host's configured skill search path, or use its local-skill import feature. Discovery paths and behavior depend on the current host configuration. Copy the entire folder and install only one locale within a given search scope to avoid duplicate names.

For other agents, provide the absolute entrypoint path and instruct them to read it, then follow its selective reference routing:

```text
Read E:/dev/Ludi-ui/skills/en/ludi-ui/SKILL.md first, then use its workflow to update this project's user-management page.
Use explicit Apply for filters, preserve the existing API, permissions, and visual identity, implement the change, and verify the affected flow.
```

For a new surface:

```text
Use ludi-ui to build a team settings page in the current stack, including members, invitation form, and loading/empty/error states.
Reuse existing components and tokens, establish the primary flow and state contract, then implement and report actual verification.
```

State “read-only review” for an evidence-based review with prioritized findings and file/line references. The skill language does not determine product-copy language; loading English instructions does not authorize translating the interface.

`agents/openai.yaml` is optional host UI metadata. Core instructions do not depend on it. A host that does not load references automatically must read the relative files itself. Missing file/browser capabilities must be reported as verification limits. This is a portable file protocol, not a claim that every agent product has been tested.

## Structure

```text
skills/{zh-CN,en}/ludi-ui/
  SKILL.md                  Scope, workflow, selective routing
  manifest.json             Version, modules, rule IDs and levels
  references/               Eight modules plus source/normalization notes
  templates/                Change brief and knowledge-module template
  agents/openai.yaml        Optional UI metadata
docs/                       Plan, extension contract, validation report
evals/                      Behavioral cases and read-only fixtures
tools/validate.mjs          Dependency-free structural/parity validator
tests/validate.test.mjs     Defect-injection tests for the validator
```

Modules cover selection, overlays, mobile, AI chat, dashboards, visual systems, accessibility, and engineering. Read only what the task needs instead of loading everything into one large system prompt.

## Extend the knowledge

Follow the [extension contract](docs/EXTENDING.en.md): route new notes to an existing or new module, write conditional and verifiable rules, update both locales/manifests/routes, then validate. Stable IDs survive translated headings and moved paragraphs.

[Provenance and normalization](skills/en/ludi-ui/references/sources.md) maps all six originals and explains deliberate corrections to absolute recommendations. Originals remain at the root. No license was assigned to source notes whose authorship and redistribution permissions were not supplied.

## Validate

Maintainer commands require Node.js 20+; agents need neither Node nor Python to read the skill. From the repository root:

```sh
node tools/validate.mjs
node --test tests/validate.test.mjs
```

To validate a standalone copied package:

```sh
node tools/validate.mjs --package "/path/to/skills/ludi-ui"
```

Checks cover frontmatter/manifest consistency, files and relative links, reachability, routing, rule IDs/levels, metadata, and bilingual structural parity. Failures return exit code 1; CLI misuse returns 2. The validator supports this project's simple single-line YAML scalar format, not arbitrary YAML/Markdown. It does not check external-link availability, fragments, or translation semantics.

See [behavioral evaluation instructions](evals/README.md) and the [validation report](docs/VALIDATION.md) for executed evidence and remaining gaps. Only the chosen locale's `ludi-ui` folder is needed for runtime use; the rest is maintenance material.

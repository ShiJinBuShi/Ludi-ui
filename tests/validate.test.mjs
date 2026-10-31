import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { validatePackage, validateRepository } from '../tools/validate.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tempRoot = fs.realpathSync(os.tmpdir());

function removeOwnedTemporary(target) {
  const resolved = fs.realpathSync(target);
  const relative = path.relative(tempRoot, resolved);
  assert.ok(!path.isAbsolute(relative) && relative !== '..' && !relative.startsWith(`..${path.sep}`));
  assert.match(relative.split(path.sep)[0], /^ludi-ui-validator-/);
  fs.rmSync(resolved, { recursive: true, force: true });
}

function fixture(t) {
  const directory = fs.mkdtempSync(path.join(tempRoot, 'ludi-ui-validator-'));
  fs.cpSync(path.join(root, 'skills'), path.join(directory, 'skills'), { recursive: true });
  t.after(() => removeOwnedTemporary(directory));
  return { directory, en: path.join(directory, 'skills/en/ludi-ui'), zh: path.join(directory, 'skills/zh-CN/ludi-ui') };
}

const mutateManifest = (directory, edit) => {
  const file = path.join(directory, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
  edit(manifest);
  fs.writeFileSync(file, JSON.stringify(manifest, null, 2));
};

test('both deliverable language packages validate', () => {
  const result = validateRepository(root);
  assert.deepEqual(result.errors, []);
  assert.ok(result.packages.every(item => item.ruleCount > 0));
});

test('a language package works after being copied without its counterpart', t => {
  const { directory, en } = fixture(t);
  const standalone = path.join(directory, 'standalone/ludi-ui');
  fs.cpSync(en, standalone, { recursive: true });
  removeOwnedTemporary(path.join(directory, 'skills'));
  assert.deepEqual(validatePackage(standalone).errors, []);
});

test('missing routed module is detected', t => {
  const { en } = fixture(t);
  fs.unlinkSync(path.join(en, 'references/ai-chat.md'));
  assert.ok(validatePackage(en).errors.some(error => error.includes('missing file')));
});

test('cross-package relative links are rejected', t => {
  const { en } = fixture(t);
  fs.appendFileSync(path.join(en, 'SKILL.md'), '\n[other locale](../../zh-CN/ludi-ui/SKILL.md)\n');
  assert.ok(validatePackage(en).errors.some(error => error.includes('escapes package')));
});

test('casing errors fail even on a case-insensitive filesystem', t => {
  const { en } = fixture(t);
  fs.appendFileSync(path.join(en, 'SKILL.md'), '\n[wrong case](references/AI-chat.md)\n');
  assert.ok(validatePackage(en).errors.some(error => error.includes('case mismatch')));
});

test('a module must be routed, not merely registered', t => {
  const { en } = fixture(t);
  const file = path.join(en, 'SKILL.md');
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('[AI chat](references/ai-chat.md)', 'AI chat'));
  assert.ok(validatePackage(en).errors.some(error => error.includes('no entrypoint route')));
});

test('duplicate rule IDs across modules fail', t => {
  const { en } = fixture(t);
  mutateManifest(en, manifest => { manifest.modules[1].rules['A11Y-01'] = 'contract'; });
  assert.ok(validatePackage(en).errors.some(error => error.includes('duplicate rule ID')));
});

test('translated rule level drift fails parity even when each package is internally valid', t => {
  const { directory, zh } = fixture(t);
  mutateManifest(zh, manifest => { manifest.modules.find(module => module.id === 'ai-chat').rules['AI-04'] = 'optional'; });
  const file = path.join(zh, 'references/ai-chat.md');
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('**Default（默认）。** 为面板', '**Optional（可选）。** 为面板'));
  assert.deepEqual(validatePackage(zh).errors, []);
  assert.ok(validateRepository(directory).errors.some(error => error.includes('parity mismatch')));
});

test('manifest and rule body disagreeing about severity fails', t => {
  const { en } = fixture(t);
  mutateManifest(en, manifest => { manifest.modules[0].rules['A11Y-01'] = 'optional'; });
  assert.ok(validatePackage(en).errors.some(error => error.includes('level/body mismatch')));
});

test('frontmatter must agree with manifest version', t => {
  const { en } = fixture(t);
  const file = path.join(en, 'SKILL.md');
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('version: "1.0.0"', 'version: "1.0.1"'));
  assert.ok(validatePackage(en).errors.some(error => error.includes('version mismatch')));
});

test('unregistered knowledge and missing template links are detected', t => {
  const { en } = fixture(t);
  fs.writeFileSync(path.join(en, 'references/unregistered.md'), '# Unregistered knowledge\n');
  fs.appendFileSync(path.join(en, 'SKILL.md'), '\n[missing template](templates/no-such-file.md)\n');
  const result = validatePackage(en);
  assert.ok(result.errors.some(error => error.includes('unregistered Markdown')));
  assert.ok(result.errors.some(error => error.includes('broken link')));
});

test('malformed manifests produce actionable failures without escaping exceptions', t => {
  const { en } = fixture(t);
  fs.writeFileSync(path.join(en, 'manifest.json'), '{');
  assert.ok(validatePackage(en).errors.length > 0);
});

test('CLI returns a failure status for invalid packages and misuse', t => {
  const { en } = fixture(t);
  fs.unlinkSync(path.join(en, 'templates/change-brief.md'));
  const cli = path.join(root, 'tools/validate.mjs');
  const failed = spawnSync(process.execPath, [cli, '--package', en], { encoding: 'utf8' });
  assert.equal(failed.status, 1);
  assert.match(failed.stderr, /missing file|broken link/);
  const misuse = spawnSync(process.execPath, [cli, '--unknown'], { encoding: 'utf8' });
  assert.equal(misuse.status, 2);
});

test('behavioral cases reference existing rules and provide both language prompts and criteria', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'skills/en/ludi-ui/manifest.json'), 'utf8'));
  const rules = new Set(manifest.modules.flatMap(module => Object.keys(module.rules)));
  const cases = JSON.parse(fs.readFileSync(path.join(root, 'evals/cases.json'), 'utf8'));
  assert.equal(new Set(cases.map(item => item.id)).size, cases.length);
  for (const item of cases) {
    for (const rule of item.rules) assert.ok(rules.has(rule), `${item.id}: unknown rule ${rule}`);
    for (const locale of ['en', 'zh-CN']) {
      assert.ok(item.prompt[locale]?.trim(), `${item.id}: missing prompt ${locale}`);
      assert.ok(item.passCriteria[locale]?.length, `${item.id}: missing criteria ${locale}`);
    }
    if (item.fixture) assert.ok(fs.existsSync(path.join(root, 'evals', item.fixture)));
  }
});

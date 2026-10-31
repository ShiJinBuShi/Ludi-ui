#!/usr/bin/env node
// Zero-dependency checks for this repository's intentionally small package schema.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const levels = new Set(['contract', 'default', 'optional']);
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const toPosix = value => value.split(path.sep).join('/');
const inside = (base, target) => {
  const relative = path.relative(base, target);
  return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
};

function walk(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const relative = prefix + entry.name;
    if (entry.isSymbolicLink()) throw new Error(`symbolic links are not portable: ${relative}`);
    return entry.isDirectory()
      ? walk(path.join(directory, entry.name), relative + '/')
      : [relative];
  });
}

function prose(markdown) {
  let fence = null;
  return markdown.split(/\r?\n/).map(line => {
    const match = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (match) {
      if (!fence) fence = match[1];
      else if (match[1][0] === fence[0] && match[1].length >= fence.length && !match[2].trim()) fence = null;
      return '';
    }
    return fence ? '' : line;
  }).join('\n');
}

// SKILL.md uses plain or JSON-double-quoted, one-line scalar values. This is
// deliberately not a general YAML parser; unsupported syntax fails explicitly.
function parseHeader(markdown) {
  const match = markdown.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) throw new Error('SKILL.md needs YAML frontmatter at the start (UTF-8, no BOM)');
  const result = {};
  let section;
  for (const line of match[1].split('\n')) {
    const field = line.match(/^( {0}| {2})([a-z][a-z0-9-]*):(?: (.+))?$/);
    if (!field) throw new Error(`unsupported frontmatter syntax: ${line}`);
    const [, indent, key, raw] = field;
    if (!indent && raw === undefined) {
      if (key !== 'metadata' || result[key]) throw new Error(`invalid frontmatter section: ${key}`);
      result[key] = {};
      section = key;
      continue;
    }
    if (raw === undefined || (indent && !section)) throw new Error(`invalid frontmatter field: ${key}`);
    if (!indent) section = undefined;
    const target = indent ? result[section] : result;
    if (Object.hasOwn(target, key)) throw new Error(`duplicate frontmatter field: ${key}`);
    if (!raw.startsWith('"') && /[:#\[\]{}>|&*!'`]/.test(raw)) throw new Error(`quote frontmatter scalar: ${key}`);
    target[key] = raw.startsWith('"') ? JSON.parse(raw) : raw;
  }
  for (const key of Object.keys(result)) {
    if (!['name', 'description', 'metadata', 'license', 'allowed-tools'].includes(key)) throw new Error(`unsupported frontmatter key: ${key}`);
  }
  return result;
}

export function validatePackage(packagePath) {
  const errors = [];
  const check = (condition, message) => { if (!condition) errors.push(message); };
  const root = path.resolve(packagePath);
  let manifest;
  try {
    const files = walk(root);
    const texts = new Map(files.filter(file => file.endsWith('.md')).map(file => [file, fs.readFileSync(path.join(root, file), 'utf8')]));
    manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
    check(manifest.schemaVersion === 1, 'unsupported manifest schemaVersion');
    check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(manifest.name ?? '') && manifest.name.length < 64, 'invalid skill name');
    check(path.basename(root) === manifest.name, 'folder name differs from skill name');
    check(/^\d+\.\d+\.\d+$/.test(manifest.version ?? ''), 'version must be major.minor.patch');
    check(['en', 'zh-CN'].includes(manifest.locale), 'unsupported locale');
    check(manifest.entrypoint === 'SKILL.md', 'entrypoint must be SKILL.md');
    check(Array.isArray(manifest.modules) && manifest.modules.length > 0, 'modules must be a nonempty array');
    for (const field of ['references', 'templates', 'adapters']) check(Array.isArray(manifest[field]), `${field} must be an array`);
    if (errors.length) return { errors, manifest };

    const registered = new Set(['manifest.json', manifest.entrypoint]);
    const paths = [...manifest.references, ...manifest.templates, ...manifest.adapters];
    const ids = new Set();
    const rules = new Set();
    for (const module of manifest.modules) {
      check(isObject(module), 'module must be an object');
      if (!isObject(module)) continue;
      check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(module.id ?? '') && !ids.has(module.id), `invalid/duplicate module ID: ${module.id}`);
      ids.add(module.id);
      check(isObject(module.rules) && Object.keys(module.rules).length > 0, `rules missing in ${module.id}`);
      paths.push(module.path);
      for (const [id, level] of Object.entries(module.rules ?? {})) {
        check(/^[A-Z][A-Z0-9]*-\d{2,}$/.test(id) && !rules.has(id), `invalid/duplicate rule ID: ${id}`);
        check(levels.has(level), `invalid rule level: ${id}`);
        rules.add(id);
      }
    }
    for (const relative of paths) {
      if (typeof relative !== 'string' || !/^(references|templates|agents)\/[a-z0-9][a-z0-9./-]*$/.test(relative) || relative.split('/').includes('..')) {
        errors.push(`invalid package path: ${relative}`);
        continue;
      }
      check(!registered.has(relative), `duplicate registered path: ${relative}`);
      registered.add(relative);
      check(files.includes(relative), `missing file or case mismatch: ${relative}`);
    }

    const entry = texts.get(manifest.entrypoint) ?? '';
    const header = parseHeader(entry);
    check(header.name === manifest.name, 'frontmatter/manifest name mismatch');
    check(typeof header.description === 'string' && header.description.trim().length > 0 && header.description.length <= 1024 && !/[<>]/.test(header.description), 'invalid description');
    check(header.metadata?.version === manifest.version, 'frontmatter/manifest version mismatch');
    check(header.metadata?.language === manifest.locale, 'frontmatter/manifest locale mismatch');

    const links = new Map();
    for (const [file, markdown] of texts) {
      check(registered.has(file), `unregistered Markdown file: ${file}`);
      check(!/^\s*\[TODO:[^\n]*\]\s*$/m.test(prose(markdown)), `unfinished scaffold: ${file}`);
      const targets = [];
      for (const match of prose(markdown).matchAll(/!?\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
        let target = match[1].trim().replace(/^<([^>]+)>$/, '$1');
        if (/^https?:\/\//i.test(target) || target.startsWith('#')) continue;
        if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.includes('\\')) {
          errors.push(`nonportable local link in ${file}: ${target}`);
          continue;
        }
        target = decodeURIComponent(target.split('#')[0]);
        const absolute = path.resolve(root, path.dirname(file), target);
        if (!inside(root, absolute)) errors.push(`link escapes package in ${file}: ${target}`);
        else {
          const relative = toPosix(path.relative(root, absolute));
          check(files.includes(relative), `broken link or case mismatch in ${file}: ${target}`);
          targets.push(relative);
        }
      }
      links.set(file, targets);
    }

    for (const module of manifest.modules) {
      if (!isObject(module) || typeof module.path !== 'string') continue;
      check((links.get('SKILL.md') ?? []).includes(module.path), `module has no entrypoint route: ${module.id}`);
      const text = prose(texts.get(module.path) ?? '');
      const headings = [...text.matchAll(/^## ([A-Z][A-Z0-9]*-\d{2,}) · .+$/gm)];
      check(new Set(headings.map(match => match[1])).size === headings.length, `duplicate rule heading: ${module.path}`);
      const declared = Object.keys(module.rules ?? {}).sort();
      check(JSON.stringify(headings.map(match => match[1]).sort()) === JSON.stringify(declared), `rule headings/manifest mismatch: ${module.path}`);
      for (const heading of headings) {
        const remainder = text.slice(heading.index + heading[0].length);
        const section = remainder.split(/^## /m)[0];
        const level = section.match(/^\*\*(Contract|Default|Optional)(?:\.|（)/m)?.[1]?.toLowerCase();
        check(level === module.rules[heading[1]], `rule level/body mismatch: ${heading[1]}`);
      }
    }

    const reachable = new Set();
    const pending = ['SKILL.md'];
    while (pending.length) {
      const file = pending.pop();
      if (reachable.has(file)) continue;
      reachable.add(file);
      pending.push(...(links.get(file) ?? []));
    }
    for (const file of texts.keys()) check(reachable.has(file), `Markdown is not reachable from SKILL.md: ${file}`);

    for (const adapter of manifest.adapters) {
      if (adapter !== 'agents/openai.yaml' || !files.includes(adapter)) continue;
      const text = fs.readFileSync(path.join(root, adapter), 'utf8');
      const get = key => JSON.parse(text.match(new RegExp(`^  ${key}: (".*")$`, 'm'))?.[1] ?? 'null');
      check(Boolean(get('display_name')), 'adapter display_name is missing');
      const short = get('short_description');
      check(typeof short === 'string' && [...short].length >= 25 && [...short].length <= 64, 'adapter short_description must be 25-64 characters');
      check(get('default_prompt')?.includes(`$${manifest.name}`), 'adapter default_prompt must name the skill');
    }
    return { errors, manifest, fileCount: files.length, ruleCount: rules.size };
  } catch (error) {
    errors.push(error.message);
    return { errors, manifest };
  }
}

function parityShape(manifest) {
  return JSON.stringify({
    schemaVersion: manifest.schemaVersion, name: manifest.name, version: manifest.version,
    entrypoint: manifest.entrypoint,
    modules: manifest.modules.map(module => ({ id: module.id, path: module.path, rules: Object.entries(module.rules).sort() })).sort((a, b) => a.id.localeCompare(b.id)),
    references: [...manifest.references].sort(), templates: [...manifest.templates].sort(), adapters: [...manifest.adapters].sort()
  });
}

export function validateRepository(root = repoRoot) {
  const packages = ['en', 'zh-CN'].map(locale => ({ locale, ...validatePackage(path.join(root, 'skills', locale, 'ludi-ui')) }));
  const errors = packages.flatMap(result => result.errors.map(error => `${result.locale}: ${error}`));
  if (!errors.length) {
    for (const result of packages) if (result.manifest.locale !== result.locale) errors.push(`${result.locale}: manifest locale differs from package directory`);
    if (parityShape(packages[0].manifest) !== parityShape(packages[1].manifest)) errors.push('bilingual manifest parity mismatch');
  }
  return { errors, packages };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length && !(args.length === 2 && ['--root', '--package'].includes(args[0]))) {
    console.error('Usage: node tools/validate.mjs [--root REPOSITORY | --package SKILL_FOLDER]');
    process.exitCode = 2;
  } else {
    const result = args[0] === '--package' ? validatePackage(args[1]) : validateRepository(args[1] ?? repoRoot);
    if (result.errors.length) {
      result.errors.forEach(error => console.error(`FAIL ${error}`));
      process.exitCode = 1;
    } else {
      const packages = result.packages ?? [result];
      for (const item of packages) console.log(`PASS ${item.manifest.locale}: ${item.manifest.name}@${item.manifest.version}, ${item.manifest.modules.length} modules, ${item.ruleCount} rules, ${item.fileCount} files`);
      if (result.packages) console.log('PASS bilingual structural parity (semantic equivalence requires review)');
    }
  }
}

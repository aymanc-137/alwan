#!/usr/bin/env node
/*
 * Bake harvested component values into twilight.json field defaults.
 *
 * Workflow:
 *   1. Run `pnpm dev` (preview) on the demo store home page so every component renders.
 *   2. In the browser console run: downloadComponentDefaults()
 *      -> saves component-defaults.json  (path => { fieldId: value, ... })
 *   3. node tools/fill-component-defaults.js component-defaults.json
 *
 * It writes each captured value into the matching field's `value` in twilight.json
 * (matched by component `path` + field `id`). A backup is written to twilight.json.bak.
 *
 * Flags:
 *   --skip-data-sources   don't overwrite variable-list fields (products/categories/
 *                         brands/pages selections reference demo-store IDs)
 *   --dry-run             report what would change without writing
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flags = new Set(args.filter(a => a.startsWith('--')));
const positional = args.filter(a => !a.startsWith('--'));

const TWILIGHT = path.resolve('twilight.json');
const CAPTURE = path.resolve(positional[0] || 'component-defaults.json');
const skipDataSources = flags.has('--skip-data-sources');
const dryRun = flags.has('--dry-run');

if (!fs.existsSync(CAPTURE)) {
  console.error(`Capture file not found: ${CAPTURE}`);
  process.exit(1);
}

const twilight = JSON.parse(fs.readFileSync(TWILIGHT, 'utf8'));
const captured = JSON.parse(fs.readFileSync(CAPTURE, 'utf8'));

let changed = 0;
const report = [];

(twilight.components || []).forEach(component => {
  const data = captured[component.path];
  if (!data) return;

  (component.fields || []).forEach(field => {
    if (!field.id || !(field.id in data)) return;
    if (field.type === 'static') return; // description/title/line are display-only
    if (skipDataSources && field.format === 'variable-list') {
      report.push(`  skip (data-source) ${component.path} -> ${field.id}`);
      return;
    }

    const next = data[field.id];
    const before = JSON.stringify(field.value);
    const after = JSON.stringify(next);
    if (before === after) return;

    report.push(`  set  ${component.path} -> ${field.id}`);
    if (!dryRun) field.value = next;
    changed++;
  });
});

console.log(report.join('\n') || '  (no matching fields found)');
console.log(`\n${dryRun ? '[dry-run] would update' : 'updated'} ${changed} field default(s)`);

if (!dryRun && changed) {
  fs.writeFileSync(TWILIGHT + '.bak', fs.readFileSync(TWILIGHT));
  fs.writeFileSync(TWILIGHT, JSON.stringify(twilight, null, 4) + '\n');
  console.log(`Wrote twilight.json (backup at twilight.json.bak)`);
}

#!/usr/bin/env node
/*
 * Bake harvested component values into twilight.json field defaults.
 *
 * Workflow:
 *   1. `pnpm dev` (preview) on the demo store home page so every component renders.
 *   2. Browser console: downloadComponentDefaults()  ->  component-defaults.json
 *   3. node tools/fill-component-defaults.js [component-defaults.json] [--dry-run]
 *
 * Matching is schema-driven: for each component (by `path`) and each field (by `id`)
 * the captured value is written into that field's `value`. For collection fields the
 * example items are rebuilt from the captured array.
 *
 * Entity references are ALWAYS stripped (they point at demo-store IDs that won't exist
 * in other merchants' stores):
 *   - fields/sub-fields with format "variable-list"  (products, brands, blogs, pages, links)
 *   - values that are a list of plain numbers          (e.g. category: [421039210])
 *   - values that are a list of objects each with `id` (full product/brand/blog objects)
 * Multilang `ar`/`en` grouped artifacts in captured items are dropped; the flat value is
 * used, matching how twilight.json already stores multilang defaults.
 *
 * Flags:
 *   --dry-run   report what would change without writing
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flags = new Set(args.filter(a => a.startsWith('--')));
const positional = args.filter(a => !a.startsWith('--'));
const dryRun = flags.has('--dry-run');

const TWILIGHT = path.resolve('twilight.json');
const CAPTURE = path.resolve(positional[0] || 'component-defaults.json');

if (!fs.existsSync(CAPTURE)) {
  console.error(`Capture file not found: ${CAPTURE}`);
  process.exit(1);
}

const twilight = JSON.parse(fs.readFileSync(TWILIGHT, 'utf8'));
const captured = JSON.parse(fs.readFileSync(CAPTURE, 'utf8'));

const isNum = v => typeof v === 'number';
const isObj = v => v && typeof v === 'object' && !Array.isArray(v);

// A value is an entity reference (demo-store specific) if it's a non-empty list of
// plain numbers (id array) or a non-empty list of objects that each carry an `id`.
function isEntityRef(value) {
  if (!Array.isArray(value) || value.length === 0) return false;
  if (value.every(isNum)) return true;
  if (value.every(v => isObj(v) && 'id' in v)) return true;
  return false;
}

// Should this field's captured value be dropped entirely?
function shouldStrip(fieldDef, value) {
  if (fieldDef && fieldDef.format === 'variable-list') return true;
  if (isEntityRef(value)) return true;
  return false;
}

// Rebuild a collection's example items: keep only defined sub-fields, drop static
// display fields, strip entity sub-fields, and discard ar/en multilang artifacts.
function cleanCollection(fieldDef, items) {
  const subDefs = {};
  (fieldDef.fields || []).forEach(sf => {
    subDefs[String(sf.id).split('.').pop()] = sf;
  });
  return (Array.isArray(items) ? items : []).map(item => {
    const out = {};
    Object.keys(item || {}).forEach(k => {
      const sub = subDefs[k];
      if (!sub) return;                    // drop ar/en/key artifacts & unknown keys
      if (sub.type === 'static') return;   // display-only
      const v = item[k];
      if (shouldStrip(sub, v)) return;     // strip entity sub-fields
      if (sub.format === 'collection') { out[k] = cleanCollection(sub, v); return; }
      out[k] = v;
    });
    return out;
  });
}

let set = 0;
const setLog = [];
const stripLog = [];

(twilight.components || []).forEach(component => {
  const data = captured[component.path];
  if (!data) return;

  (component.fields || []).forEach(field => {
    if (!field.id || !(field.id in data)) return;
    if (field.type === 'static') return;

    const value = data[field.id];

    if (shouldStrip(field, value)) {
      stripLog.push(`  strip ${component.path} -> ${field.id} (entity reference)`);
      return;
    }

    const next = field.format === 'collection' ? cleanCollection(field, value) : value;
    if (JSON.stringify(field.value) === JSON.stringify(next)) return;

    setLog.push(`  set   ${component.path} -> ${field.id}`);
    if (!dryRun) field.value = next;
    set++;
  });
});

console.log(setLog.join('\n'));
if (stripLog.length) console.log('\n' + stripLog.join('\n'));
console.log(`\n${dryRun ? '[dry-run] would update' : 'updated'} ${set} field default(s); stripped ${stripLog.length} entity field(s)`);

if (!dryRun && set) {
  fs.writeFileSync(TWILIGHT + '.bak', fs.readFileSync(TWILIGHT));
  fs.writeFileSync(TWILIGHT, JSON.stringify(twilight, null, 4) + '\n');
  console.log('Wrote twilight.json (backup at twilight.json.bak)');
}

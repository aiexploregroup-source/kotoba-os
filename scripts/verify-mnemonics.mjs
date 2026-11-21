// Validates that the parallel-authored mnemonic chunks cover every Jōyō kanji.
// Usage: node scripts/verify-mnemonics.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const chunkDir = path.join(root, 'scripts/.kanji-chunks');
const dataDir = path.join(root, 'src/data/mnemonics');

let failures = 0;
for (let i = 1; i <= 8; i += 1) {
  const id = String(i).padStart(2, '0');
  const jsonPath = path.join(chunkDir, `chunk-${id}.json`);
  const tsPath = path.join(dataDir, `chunk-${id}.ts`);
  if (!fs.existsSync(jsonPath) || !fs.existsSync(tsPath)) {
    console.error(`chunk ${id}: MISSING (${fs.existsSync(jsonPath) ? 'ts' : 'json'})`);
    failures += 1;
    continue;
  }
  const expected = JSON.parse(fs.readFileSync(jsonPath, 'utf8')).map((e) => e.char);
  const source = fs.readFileSync(tsPath, 'utf8');
  const keys = [...source.matchAll(/^\s*'([^']+)'\s*:/gm)].map((m) => m[1]);
  const missing = expected.filter((ch) => !keys.includes(ch));
  const extra = keys.filter((ch) => !expected.includes(ch));
  const generic = keys.filter((ch) => /Trace the |Start with |say the meaning aloud/i.test(source.split(`'${ch}':`)[1]?.split(/^\s*'/m)[0] ?? ''));
  if (missing.length || extra.length || generic.length || keys.length !== expected.length) {
    console.error(`chunk ${id}: ${keys.length}/${expected.length} keys; missing=${missing.join('') || '-'} extra=${extra.join('') || '-'} generic=${generic.join('') || '-'}`);
    failures += 1;
  } else {
    console.log(`chunk ${id}: OK (${keys.length})`);
  }
}
process.exit(failures ? 1 : 0);

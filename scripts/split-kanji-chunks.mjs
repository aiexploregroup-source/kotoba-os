// Splits the official Jōyō set into balanced chunks for parallel mnemonic authoring.
// Usage: node scripts/split-kanji-chunks.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'src/data/joyo.ts');
const outDir = path.join(root, 'scripts/.kanji-chunks');
const text = fs.readFileSync(source, 'utf8');

const entries = [];
for (const line of text.split(/\r?\n/)) {
  if (!line.trimStart().startsWith('{ char:')) continue;
  const char = line.match(/char:\s*'([^']+)'/)?.[1];
  const meaning = line.match(/meaning:\s*'([^']*)'/)?.[1];
  const radical = line.match(/radical:\s*'([^']*)'/)?.[1];
  const level = line.match(/level:\s*'([^']*)'/)?.[1];
  const strokes = Number(line.match(/strokes:\s*(\d+)/)?.[1]);
  if (!char) continue;
  entries.push({ char, meaning: meaning ?? '', radical: radical ?? '', level: level ?? '', strokes });
}

const CHUNKS = 8;
fs.mkdirSync(outDir, { recursive: true });
const size = Math.ceil(entries.length / CHUNKS);
for (let i = 0; i < CHUNKS; i += 1) {
  const slice = entries.slice(i * size, (i + 1) * size);
  if (!slice.length) continue;
  const file = path.join(outDir, `chunk-${String(i + 1).padStart(2, '0')}.json`);
  fs.writeFileSync(file, JSON.stringify(slice, null, 2), 'utf8');
  console.log(`${path.basename(file)}: ${slice.length} entries`);
}
console.log(`total: ${entries.length}`);

// Merges the parallel-authored mnemonics into src/data/joyo.ts.
// Curated, hand-written mnemonics in content.ts still take priority at runtime.
// Usage: node scripts/merge-mnemonics.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const joyoPath = path.join(root, 'src/data/joyo.ts');
const mnemonicDir = path.join(root, 'src/data/mnemonics');

const map = new Map();
for (let i = 1; i <= 8; i += 1) {
  const id = String(i).padStart(2, '0');
  const file = path.join(mnemonicDir, `chunk-${id}.ts`);
  const source = fs.readFileSync(file, 'utf8');
  // Keys are single-quoted kanji; values are backtick template literals.
  for (const match of source.matchAll(/^\s*'([^']+)'\s*:\s*`([^`]*)`\s*,?\s*$/gm)) {
    const [, char, value] = match;
    if (map.has(char)) throw new Error(`Duplicate mnemonic for ${char} in chunk ${id}`);
    map.set(char, value);
  }
}

const original = fs.readFileSync(joyoPath, 'utf8');
let missing = 0;
const updated = original.replace(/^(\s*\{ char: '([^']+)'.*?mnemonic: )'[^']*'(,.*)$/gm, (full, prefix, char, suffix) => {
  const mnemonic = map.get(char);
  if (!mnemonic) {
    missing += 1;
    return full;
  }
  // Escape single quotes (none expected) for TypeScript string literal safety.
  return `${prefix}'${mnemonic.replace(/'/g, "\\'")}'${suffix}`;
});

if (missing) throw new Error(`Missing authored mnemonics for ${missing} Jōyō characters; refusing to write.`);
if (map.size !== 2136) throw new Error(`Expected 2136 mnemonics, got ${map.size}; refusing to write.`);

fs.writeFileSync(joyoPath, updated, 'utf8');
console.log(`Merged ${map.size} original mnemonics into ${path.relative(root, joyoPath)}`);

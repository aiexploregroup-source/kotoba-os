import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'japanese-learning-resources-2026.csv');
const targetDir = path.join(root, 'src', 'data');
const target = path.join(targetDir, 'resources.json');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field.trim());
      field = '';
    } else if (char === '\n') {
      row.push(field.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field.trim());
    if (row.some(Boolean)) rows.push(row);
  }
  return rows;
}

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

const rows = parseCsv(fs.readFileSync(source, 'utf8'));
const [header, ...data] = rows;
const index = Object.fromEntries(header.map((key, i) => [key, i]));

const resources = data
  .filter((row) => row[index.Resource] && row[index.Link])
  .map((row, i) => {
    const category = row[index.Category] || 'Other';
    const name = row[index.Resource];
    return {
      id: `${slug(name)}-${i + 1}`,
      category,
      group: category.split('/')[0].trim(),
      name,
      provider: row[index['Provider/Platform']] || '',
      cost: row[index['Cost (indicative)']] || '',
      level: row[index.Level] || '',
      bestFor: row[index['Best For']] || '',
      link: row[index.Link] || '',
    };
  });

fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(target, `${JSON.stringify(resources, null, 2)}\n`, 'utf8');
console.log(`Imported ${resources.length} resources into ${target}`);

/**
 * External mnemonic references. These are curated LINKS ONLY — no third-party
 * text, PDFs, or video content is copied into this app. The in-app mnemonics
 * are original and work offline; these sources are for going deeper online.
 */
export interface MnemonicSource {
  name: string;
  format: string;
  detail: string;
  url: string;
  note: string;
}

export const mnemonicSources: MnemonicSource[] = [
  {
    name: "Ulrike's Mnemonics",
    format: 'Web · all 2,136 Jōyō',
    detail: 'Shape, meaning, and reading mnemonics for every official Jōyō kanji, with radical breakdowns and footnotes.',
    url: 'https://www.joyokanji.com/ulrikes-mnemonics',
    note: 'Free to read · follow the site terms',
  },
  {
    name: 'Kanji Koohii',
    format: 'Web · community stories',
    detail: 'User-contributed stories and Heisig-style keyword workflows; strong for building your own recall hooks.',
    url: 'https://kanji.koohii.com/',
    note: 'Free account · AGPL code, separate content terms',
  },
  {
    name: 'WaniKani Kanji',
    format: 'Web · hand-made mnemonics',
    detail: 'Radical-first mnemonics for roughly 2,000 kanji; individual kanji pages are browsable without an account.',
    url: 'https://www.wanikani.com/kanji/',
    note: 'First 3 levels free · paid beyond',
  },
  {
    name: 'Visual Kanji',
    format: 'Video + PDF',
    detail: '110 narrated videos grouping kanji by shared components, with ancient script forms and downloadable PDF exercises.',
    url: 'https://www.visualkanji.com/',
    note: 'Free video course · PDF worksheets',
  },
  {
    name: 'Kanji Damage',
    format: 'Web · 1,700 mnemonics',
    detail: 'Component breakdowns, usefulness ranking, look-alike hints, and irreverent mnemonics plus an Anki deck.',
    url: 'https://www.kanjidamage.com/',
    note: 'Free to browse · site terms apply',
  },
  {
    name: 'Kanji Trainer',
    format: 'Web · etymology-based',
    detail: 'Memory phrases built from 538 recurring components, with a radical training mode and multilingual interface.',
    url: 'https://kanji-trainer.org/',
    note: 'Free web trainer',
  },
  {
    name: 'Uchisen',
    format: 'Web · picture mnemonics',
    detail: 'Visual stories combining kanji components into images, with SRS and community-shared mnemonics.',
    url: 'https://uchisen.com/',
    note: 'Free tier · paid books/apps',
  },
  {
    name: 'Kanji Memory Hint',
    format: 'Mobile apps · Japan Foundation',
    detail: 'Official mnemonic picture apps for Starter through Elementary 2 kanji, with audio and games.',
    url: 'https://sydney.jpf.go.jp/language/for-learners/free-japanese-learning-resources',
    note: 'Free official apps',
  },
  {
    name: 'Tofugu: Radicals & Mnemonics',
    format: 'Article',
    detail: 'A practical introduction to learning kanji through radicals, stories, and visual hooks.',
    url: 'https://www.tofugu.com/japanese/learn-kanji/',
    note: 'Free guide',
  },
  {
    name: 'Kanji alive',
    format: 'Web · open data',
    detail: 'Radicals, stroke animations, readings, and examples with openly licensed data and media.',
    url: 'https://kanjialive.com/',
    note: 'CC BY 4.0 data · Apache-2.0 code',
  },
  {
    name: 'Wiktionary: Japanese kanji',
    format: 'Wiki · etymology',
    detail: 'Collaboratively edited character pages with meanings, readings, and etymology sections where available.',
    url: 'https://en.wiktionary.org/wiki/Category:Japanese_kanji',
    note: 'CC BY-SA 4.0',
  },
  {
    name: 'awesome-kanji',
    format: 'Curated index',
    detail: 'A maintained directory of open kanji datasets, decomposition tools, etymology resources, and Anki decks.',
    url: 'https://github.com/hellokurt/awesome-kanji',
    note: 'Open index · check each licence',
  },
];

export function mnemonicSearchLinks(char: string) {
  const q = encodeURIComponent(`${char} kanji mnemonic`);
  return [
    { label: 'Web search', url: `https://www.google.com/search?q=${q}` },
    { label: 'Videos', url: `https://www.youtube.com/results?search_query=${q}` },
    { label: 'WaniKani', url: `https://www.wanikani.com/kanji/${encodeURIComponent(char)}` },
    { label: 'Jisho', url: `https://jisho.org/search/${encodeURIComponent(char)}` },
  ];
}

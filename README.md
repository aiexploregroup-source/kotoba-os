# Kotoba OS

A premium local-first Japanese learning command center for self-study through JLPT N4.

## Features

- Full Jōyō coverage — all 2,136 official kanji with original mnemonics.
- Kana, kanji, vocabulary, grammar, listening, speaking, dictionary, and JLPT tools.
- Spaced-repetition review queue with browser-native speech and typing fallbacks.
- Eight-phase N4 self-study curriculum with checkpoints and drills.
- Desktop workspace and a dedicated mobile app shell with grouped native-style settings.
- Background Studio: 16 bundled scenes, custom upload, drag-to-position cropping, and look controls.
- Collapsible desktop navigation rail; preference persists locally.
- All progress stays in `localStorage`; export/import JSON backups at any time.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Tech stack

React 18, TypeScript, Vite, lucide-react, plain CSS, and browser `localStorage`.

The bundled background photographs are free-to-use Unsplash images saved locally; Japanese SVG patterns and the brand mark are original artwork. External study resources are curated links only.

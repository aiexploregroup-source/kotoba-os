# Sharin Bhaiya — 2D character pack (v2: 6'5", glasses, dark-smart)

A layered, scalable vector character built for reuse: thumbnails, YouTube videos, shorts, explainers, comics and animation.

> The AI raster image generator was unavailable in this session (authentication error), so the character is hand-authored SVG artwork built from the design bible. It is fully editable, transparent and animation-ready.

## Open these

| File | What it is |
|---|---|
| `live-character.html` | **Interactive live character** — click any action, expression or face turn and the rig performs it |
| `animation-sheet.html` | **12 live animated poses** — wave, walk, run, jump/legs-up, think, explain, point, thumbs-up, laugh, confused, celebrate, idle |
| `expression-sheet.html` | All **15 expressions** on the identical face |
| `model-sheet.html` | Front / three-quarter / profile / back turnaround + palette |
| `backgrounds.html` | 8 background options (1200×800 SVG) |
| `mouth-shapes.svg` | 8 lip-sync mouth shapes |
| `sharin-emblem.svg` | Comet brand emblem |
| `sharin-bhaiya-base.svg` | Clean neutral full-body character with expression layers |
| `sharin-bhaiya-rig.svg` | Animated rig: head, hair, upper arms, forearms, hands, legs |
| `CHARACTER-BIBLE.md` | Canon identity, proportions and HEX codes |

Open the `.html` files in any browser — animations play automatically.

## Design summary

- 6'5" (196 cm), lean 7.5–8-head anime proportions
- Sharp jaw, narrow amber-brown eyes, **thin dark glasses with gold hinges**
- Espresso layered hair with a long fringe strand across one lens
- Midnight long coat over a deep-teal shirt, cream collar, slim black trousers
- Dark boots with a coral sole line, gold comet pin, slim gold watch
- Palette: `#1B2233` `#1F4E5A` `#FF6B5E` `#C88A5A` `#15131C` `#F2ECE2` `#1A1D24` `#FFD166`

## Use it

**Still image** — open the SVG in Figma, Illustrator, Inkscape or a browser and export PNG at any size.

**Expression** — add a class to the `<svg>` root:
`expr-rest`, `expr-happy`, `expr-laugh`, `expr-surprised`, `expr-confused`, `expr-thinking`, `expr-curious`, `expr-excited`, `expr-annoyed`, `expr-serious`, `expr-mischief`, `expr-explain`, `expr-embarrassed`, `expr-proud`, `expr-sleepy`

**Animation** — add an action class to the rig SVG root:
`a-wave`, `a-walk`, `a-run`, `a-jump`, `a-think`, `a-explain`, `a-point`, `a-thumbs`, `a-laugh`, `a-confused`, `a-celebrate`

Face turns: `turn-3q`, `turn-profile`, `view-back`

Combine, for example: `class="expr-mischief a-explain"`.

**After Effects / Moho / Toon Boom** — import the rig SVG, split the named groups onto layers, and animate with the built-in pivots (shoulders, elbows, hips, neck).

## Identity locks — never change

Sharp jaw + clean chin · narrow amber eyes behind dark glasses · one long fringe strand across the lens · midnight coat + deep-teal shirt + cream collar · coral sole line · gold comet pin · gold watch on his left wrist · tall 7.5–8-head proportions.

## Rebuild

`build-rig.js` rebuilds the rig from `sharin-bhaiya-base.svg`.
`build-sheets.js` rebuilds all sheets, mouth shapes, emblem and backgrounds.
Run both with `node` from this folder.

# Sharin Bhaiya — usable 2D character pack

This is a **layered vector character**, not a single flat picture. That is deliberate: it stays sharp at any size, has a transparent background, and can be animated.

> Note: the AI raster image generator was unavailable in this session (authentication error), so the character was built directly as hand-authored SVG artwork from the design bible. Everything below is real, editable artwork.

## Open these first

| File | What it is |
|---|---|
| `animation-sheet.html` | **12 live animated poses** — wave, walk, run, jump/legs-up, think, explain, point, thumbs-up, laugh, confused, celebrate, idle |
| `expression-sheet.html` | All **15 facial expressions** on the identical face |
| `model-sheet.html` | Front / three-quarter / profile / back turnaround + exact color palette |
| `backgrounds.html` | 8 background options (1200×800 SVG) |
| `mouth-shapes.svg` | 8 lip-sync mouth shapes on separate layer |
| `sharin-emblem.svg` | Comet brand emblem |
| `sharin-bhaiya-base.svg` | Clean neutral full-body character, expression layers included |
| `sharin-bhaiya-rig.svg` | Animated rig with independent head, hair, arms and legs |
| `CHARACTER-BIBLE.md` | The identity rules and exact HEX codes |

Open the `.html` files in any browser. The animations play automatically.

## How to use the character

**As a still image**
- Open `sharin-bhaiya-base.svg` in Figma, Illustrator, Inkscape or a browser, then export PNG at any resolution.
- To change expression, add a class to the `<svg>` root, e.g. `class="expr-mischief"`.

**As an animation**
- Open `sharin-bhaiya-rig.svg` in a browser to see a looping action. Add one of the action classes below to the `<svg>` root.
- For After Effects: import the SVG, then split the named groups (`#head-group`, `#front-hair`, `#back-hair`, `#arm-left`, `#arm-right`, `#leg-left`, `#leg-right`, `#torso`) onto separate layers and animate with pivot points.
- For web/CSS: the keyframes are already written inside the SVG `<style>` block.

## Class reference

Expressions (add to SVG root):
`expr-rest`, `expr-happy`, `expr-laugh`, `expr-surprised`, `expr-confused`, `expr-thinking`, `expr-curious`, `expr-excited`, `expr-annoyed`, `expr-serious`, `expr-mischief`, `expr-explain`, `expr-embarrassed`, `expr-proud`, `expr-sleepy`

Actions (add to rig SVG root):
`a-idle` (default), `a-wave`, `a-walk`, `a-run`, `a-jump`, `a-think`, `a-explain`, `a-point`, `a-thumbs`, `a-laugh`, `a-confused`, `a-celebrate`

Face turns: `turn-3q`, `turn-profile`, `view-back`

Combine them, for example: `class="expr-mischief a-wave"`.

## Color palette

Teal `#1F7A8C` · Coral `#FF6B5E` · Warm tan `#C88A5A` · Espresso hair `#1E1B29` · Cream `#F7F0E6` · Charcoal `#2E3440` · Gold `#FFD166`

## Identity locks — never change these

Signature sweeping forelock + cowlick · soft-square jaw with rounded chin · large amber-brown eyes · oversized teal hoodie with coral lining and drawstrings · coral high-tops · single thin coral bracelet on his left wrist · small circular comet emblem on the left chest · approximately 5.5–6 heads tall.

## Regenerating the sheets

`build-rig.js` rebuilds the rig from the base artwork. `build-sheets.js` rebuilds all HTML sheets, mouth shapes, emblem and backgrounds. Run both with `node` from this folder.

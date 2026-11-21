import fs from 'fs';
import path from 'path';

const dir = import.meta.dirname;
const base = fs.readFileSync(path.join(dir, 'sharin-bhaiya-base.svg'), 'utf8');
const rig = fs.readFileSync(path.join(dir, 'sharin-bhaiya-rig.svg'), 'utf8');

const write = (name, content) => fs.writeFileSync(path.join(dir, name), content);

const shell = (title, sub, body, extraCSS = '') => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} — Sharin Bhaiya</title>
<style>
*{box-sizing:border-box}
body{margin:0;padding:34px;background:#12161d;color:#eef3f6;font-family:ui-sans-serif,system-ui,"Segoe UI",sans-serif}
h1{font-size:30px;margin:0 0 6px;letter-spacing:-.5px}
p.sub{margin:0 0 28px;color:#9fb1bd;font-size:14px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:18px;max-width:1500px}
.card{background:#1b222c;border:1px solid #2d3945;border-radius:14px;padding:14px;display:flex;flex-direction:column;align-items:center;box-shadow:0 8px 22px rgba(0,0,0,.25)}
.card svg{width:100%;height:auto;max-height:330px;display:block}
.label{margin-top:10px;font-size:13px;font-weight:650;color:#f4c14e;text-align:center}
.tag{font-size:10px;color:#7f95a4;margin-top:3px;letter-spacing:.06em;text-transform:uppercase}
.palette{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px;max-width:1500px}
.sw{width:120px;border-radius:10px;overflow:hidden;background:#1b222c;border:1px solid #2d3945}
.sw i{display:block;height:62px}
.sw span{display:block;padding:8px;font-size:11px;color:#c9d6de}
.note{margin-top:26px;max-width:1500px;background:#1b222c;border:1px solid #2d3945;border-radius:12px;padding:16px 20px;color:#a9bbc7;font-size:13px;line-height:1.6}
code{color:#7fd3df}
${extraCSS}
</style></head><body>
<h1>${title}</h1><p class="sub">${sub}</p>
${body}
</body></html>`;

/* ---------------- 1. EXPRESSION SHEET ---------------- */
const expressions = [
  ['rest','Natural neutral'],['happy','Happy / cheerful'],['laugh','Laughing'],
  ['surprised','Surprised'],['confused','Confused'],['thinking','Thinking deeply'],
  ['curious','Curious'],['excited','Excited'],['annoyed','Slightly annoyed'],
  ['serious','Serious / focused'],['mischief','Mischievous smile'],['explain','Explaining enthusiastically'],
  ['embarrassed','Embarrassed'],['proud','Proud / confident'],['sleepy','Sleepy / relaxed'],
];
const exprBody = '<div class="grid">' + expressions.map(([c,l]) =>
  `<div class="card"><svg class="expr-${c}" viewBox="0 -140 760 1140">${base.replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg><div class="label">${l}</div><div class="tag">expr-${c}</div></div>`
).join('') + '</div>' + `<div class="note">Add a class to the SVG root to switch expressions: <code>&lt;svg class="expr-happy"&gt;</code>. Every expression keeps the same face, hair, outfit and proportions — only brows, eyelids and mouth change. Use <code>expr-mischief</code> as the signature look.</div>`;
write('expression-sheet.html', shell('Expression Sheet', '15 expressions — one locked character identity.', exprBody));

/* ---------------- 2. ANIMATION / POSE SHEET ---------------- */
const poses = [
  ['','idle','Standing casually','idle'],
  ['expr-happy','a-wave','Waving hello','wave'],
  ['expr-rest','a-walk','Walking','walk'],
  ['expr-excited','a-run','Running','run'],
  ['expr-surprised','a-jump','Jumping — legs up','jump'],
  ['expr-thinking','a-think','Thinking — hand at chin','think'],
  ['expr-explain','a-explain','Explaining with gestures','explain'],
  ['expr-serious','a-point','Pointing at something','point'],
  ['expr-proud','a-thumbs','Thumbs up','thumbs'],
  ['expr-laugh','a-laugh','Laughing naturally','laugh'],
  ['expr-confused','a-confused','Looking confused','confused'],
  ['expr-excited','a-celebrate','Small victory celebration','celebrate'],
];
const poseBody = '<div class="grid">' + poses.map(([e,a,l,t]) =>
  `<div class="card"><svg class="${e} ${a}" viewBox="0 -140 760 1140">${rig.replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg><div class="label">${l}</div><div class="tag">${t}</div></div>`
).join('') + '</div>' + `<div class="note">These are <strong>live CSS animations</strong> — open this file in a browser and every character loops its action. Apply <code>a-wave</code>, <code>a-walk</code>, <code>a-run</code>, <code>a-jump</code>, etc. to the SVG root. Combine with any <code>expr-*</code> class. Limbs, head and hair are separate groups in <code>sharin-bhaiya-rig.svg</code>, so you can retime or re-pose them in After Effects, Moho, Toon Boom or SVG/CSS.</div>`;
write('animation-sheet.html', shell('Animation & Pose Sheet', '12 live animated poses — rigged and loopable.', poseBody));

/* ---------------- 3. MODEL / TURNAROUND SHEET ---------------- */
const views = [
  ['','Front — full body'],['turn-3q','Three-quarter — full body'],
  ['turn-profile','Side profile — full body'],['view-back','Back — full body'],
];
const modelBody = '<div class="grid">' + views.map(([c,l]) =>
  `<div class="card"><svg class="${c}" viewBox="0 -140 760 1140">${rig.replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg><div class="label">${l}</div></div>`
).join('') + '</div>' +
`<div class="palette">${[['#1B2233','Midnight / coat'],['#1F4E5A','Deep teal / shirt'],['#FF6B5E','Coral / accent'],['#C88A5A','Tan / skin'],['#15131C','Espresso / hair'],['#F2ECE2','Cream / collar'],['#FFD166','Gold / emblem + watch']].map(([h,n])=>`<div class="sw"><i style="background:${h}"></i><span>${n}<br>${h}</span></div>`).join('')}</div>
<div class="note"><strong>Identity locks:</strong> 6'5" (196 cm) tall, lean 7.5–8-head anime proportions · sharp jaw with a defined chin · slim amber-brown eyes behind thin dark glasses with gold hinges · layered espresso-black hair with a long side-swept fringe crossing the right lens · midnight long coat over a deep-teal shirt, cream collar, slim black trousers, dark boots with a coral sole line · gold comet pin on the left chest · slim gold watch on his left wrist. The back view hides the face layer and shows the tapered hair and coat back.</div>`;
write('model-sheet.html', shell('Character Model Sheet', 'Turnaround, palette and identity locks.', modelBody, '.view-back #head-group,.view-back #ears{display:none} .view-back #back-hair{transform:none}'));

/* ---------------- 4. LIP-SYNC MOUTH SHAPES ---------------- */
const mouths = [
  ['REST','M264 316 C282 316 318 316 336 316'],
  ['A / E','M268 300 C284 334 316 334 332 300 C316 314 284 314 268 300 Z'],
  ['O','M286 302 C298 296 302 296 314 302 C322 312 318 330 300 332 C282 330 278 312 286 302 Z'],
  ['U','M290 302 C296 296 304 296 310 302 C316 308 314 326 300 328 C286 326 284 308 290 302 Z'],
  ['M / B / P','M280 314 L320 314'],
  ['F / V','M282 306 L318 306 M282 306 C292 314 308 314 318 306'],
  ['L','M280 310 C292 302 308 302 320 310 M292 314 C296 326 304 326 308 314'],
  ['WIDE SMILE','M270 304 C288 330 312 330 330 304 C312 318 288 318 270 304 Z'],
];
const mouthSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 620" width="1200" height="620">
<rect width="1200" height="620" fill="#F7F4EE"/>
<text x="40" y="54" font-family="sans-serif" font-size="30" font-weight="700" fill="#25212B">Sharin Bhaiya — Lip-sync mouth shapes</text>
<text x="40" y="82" font-family="sans-serif" font-size="16" fill="#6b7785">Draw these on a separate mouth layer. Keep the head, eyes and hair unchanged.</text>
${mouths.map(([l,d],i)=>{
  const x=40+(i%4)*290, y=120+Math.floor(i/4)*245;
  return `<g transform="translate(${x},${y})">
  <rect width="265" height="215" rx="14" fill="#fff" stroke="#d8dde2" stroke-width="2"/>
  <circle cx="132" cy="96" r="62" fill="#C88A5A" stroke="#25212B" stroke-width="4"/>
  <g transform="translate(32,-24)"><path d="${d}" fill="${['none','#7A2E32','#7A2E32','#7A2E32','none','none','none','#fff'][i]}" stroke="#25212B" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/></g>
  <text x="132" y="192" text-anchor="middle" font-family="sans-serif" font-size="17" font-weight="700" fill="#1F7A8C">${l}</text>
  </g>`;}).join('')}
</svg>`;
write('mouth-shapes.svg', mouthSvg);

/* ---------------- 5. EMBLEM ---------------- */
write('sharin-emblem.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
<circle cx="200" cy="200" r="180" fill="#1F7A8C" stroke="#25212B" stroke-width="12"/>
<circle cx="200" cy="200" r="150" fill="none" stroke="#FF6B5E" stroke-width="10"/>
<path d="M172 118 L196 174 L266 156 L216 204 L256 258 L194 226 L150 272 L160 210 L104 190 L162 176 Z" fill="#FFD166" stroke="#25212B" stroke-width="10" stroke-linejoin="round"/>
<circle cx="196" cy="198" r="20" fill="#FF6B5E"/>
</svg>`);

/* ---------------- 6. BACKGROUNDS ---------------- */
const bg = (name, defs, art) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
<defs>${defs}</defs>${art}</svg>`;
const grad = (id,a,b,vertical=true)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${vertical?0:1}" y2="${vertical?1:0}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

write('bg-01-cozy-bedroom.svg', bg('cozy bedroom', grad('g','#F7E3C6','#E7C39A')+grad('w','#FFD98A','#FFE9BC'),
`<rect width="1200" height="800" fill="url(#g)"/>
<rect x="700" y="90" width="400" height="380" rx="10" fill="#9FC3D0" stroke="#2E3440" stroke-width="8"/>
<path d="M900 90 V470 M700 280 H1100" stroke="#2E3440" stroke-width="8"/>
<rect x="60" y="470" width="640" height="30" rx="8" fill="#8B5E3C"/>
<rect x="110" y="500" width="18" height="180" fill="#6D472E"/><rect x="630" y="500" width="18" height="180" fill="#6D472E"/>
<rect x="170" y="392" width="250" height="78" rx="8" fill="#1F7A8C"/>
<rect x="196" y="416" width="90" height="12" rx="6" fill="#F7F0E6" opacity=".8"/>
<circle cx="470" cy="428" r="34" fill="#FF6B5E"/>
<path d="M470 394 V366" stroke="#2E3440" stroke-width="6"/>
<ellipse cx="470" cy="360" rx="46" ry="14" fill="#FFD166" opacity=".65"/>
<rect y="680" width="1200" height="120" fill="#C98F62"/>
<path d="M0 680 H1200" stroke="#2E3440" stroke-width="6" opacity=".3"/>`));

write('bg-02-sunny-park.svg', bg('sunny park', grad('sky','#7FD1E8','#DFF4F5'),
`<rect width="1200" height="800" fill="url(#sky)"/>
<circle cx="980" cy="150" r="70" fill="#FFD166"/>
<circle cx="980" cy="150" r="94" fill="#FFD166" opacity=".25"/>
<path d="M0 520 Q300 450 600 520 T1200 500 V800 H0 Z" fill="#8CCB7A"/>
<path d="M0 620 Q320 560 640 620 T1200 600 V800 H0 Z" fill="#6FB45F"/>
<path d="M120 540 V300" stroke="#7A5A3C" stroke-width="22"/>
<circle cx="120" cy="280" r="110" fill="#4E9B56"/><circle cx="70" cy="320" r="70" fill="#5FAE62"/><circle cx="180" cy="322" r="66" fill="#5FAE62"/>
<path d="M1030 550 V330" stroke="#7A5A3C" stroke-width="18"/>
<circle cx="1030" cy="312" r="88" fill="#4E9B56"/>
<path d="M520 800 Q540 700 600 700 Q660 700 680 800 Z" fill="#D9B27A"/>
<circle cx="600" cy="676" r="30" fill="#FF6B5E"/>`));

write('bg-03-golden-city.svg', bg('golden city', grad('sky','#F7B267','#6C7A9C'),
`<rect width="1200" height="800" fill="url(#sky)"/>
<circle cx="880" cy="230" r="80" fill="#FFE0A3"/>
<rect x="60" y="300" width="220" height="500" fill="#3C4A63"/><rect x="300" y="200" width="180" height="600" fill="#4B5B76"/>
<rect x="500" y="360" width="200" height="440" fill="#35425B"/><rect x="720" y="260" width="190" height="540" fill="#465571"/>
<rect x="930" y="340" width="220" height="460" fill="#3C4A63"/>
<g fill="#FFD166" opacity=".8">${Array.from({length:30},(_,i)=>`<rect x="${80+(i%5)*42}" y="${340+Math.floor(i/5)*90}" width="20" height="30"/>`).join('')}</g>
<rect y="700" width="1200" height="100" fill="#2E3440"/>
<path d="M0 700 H1200" stroke="#FF6B5E" stroke-width="8" opacity=".6"/>`));

write('bg-04-cozy-cafe.svg', bg('cozy cafe', grad('wall','#F2DFC4','#DCC09A'),
`<rect width="1200" height="800" fill="url(#wall)"/>
<rect x="80" y="110" width="360" height="300" rx="12" fill="#8FB9C4" stroke="#2E3440" stroke-width="8"/>
<path d="M260 110 V410 M80 260 H440" stroke="#2E3440" stroke-width="8"/>
<rect x="620" y="150" width="420" height="260" rx="10" fill="#1F7A8C" stroke="#2E3440" stroke-width="8"/>
<text x="830" y="310" text-anchor="middle" font-family="sans-serif" font-size="64" font-weight="700" fill="#FFD166">CAFE</text>
<rect x="0" y="560" width="1200" height="40" fill="#8B5E3C"/>
<rect x="120" y="600" width="24" height="200" fill="#6D472E"/><rect x="1050" y="600" width="24" height="200" fill="#6D472E"/>
<ellipse cx="380" cy="552" rx="80" ry="18" fill="#2E3440" opacity=".2"/>
<path d="M330 470 h100 l-12 84 h-76 Z" fill="#F7F0E6" stroke="#2E3440" stroke-width="6"/>
<path d="M430 490 q40 0 40 26 t-40 24" fill="none" stroke="#2E3440" stroke-width="6"/>
<path d="M360 460 q-14 -26 6 -42 M390 460 q14 -26 -6 -42" fill="none" stroke="#FF6B5E" stroke-width="5" opacity=".7"/>`));

write('bg-05-night-sky.svg', bg('night sky', grad('night','#141B33','#394B70'),
`<rect width="1200" height="800" fill="url(#night)"/>
<circle cx="920" cy="190" r="72" fill="#FFD166"/>
<circle cx="950" cy="168" r="68" fill="#141B33"/>
${Array.from({length:55},(_,i)=>{const x=(i*137)%1180+10,y=(i*83)%430+20,r=i%5===0?4:2.4;return `<circle cx="${x}" cy="${y}" r="${r}" fill="#F7F0E6" opacity="${0.3+(i%7)*0.1}"/>`;}).join('')}
<path d="M0 640 Q260 520 520 620 T1200 560 V800 H0 Z" fill="#202B45"/>
<path d="M0 720 Q300 640 620 720 T1200 680 V800 H0 Z" fill="#151D33"/>
<path d="M120 640 V520" stroke="#2E3440" stroke-width="14"/><path d="M120 540 L60 470 L120 480 L180 460 Z" fill="#2E3440"/>`));

write('bg-06-abstract-gradient.svg', bg('abstract gradient', grad('a','#1F7A8C','#FF6B5E',false)+'<radialGradient id="b"><stop offset="0" stop-color="#FFD166" stop-opacity=".8"/><stop offset="1" stop-color="#FFD166" stop-opacity="0"/></radialGradient>',
`<rect width="1200" height="800" fill="url(#a)"/>
<circle cx="880" cy="240" r="420" fill="url(#b)"/>
<circle cx="260" cy="640" r="300" fill="#F7F0E6" opacity=".14"/>
<circle cx="980" cy="700" r="180" fill="#1E1B29" opacity=".18"/>
<path d="M0 620 Q300 500 600 620 T1200 580 V800 H0 Z" fill="#F7F0E6" opacity=".1"/>
<path d="M120 180 C260 100 380 260 520 180" fill="none" stroke="#F7F0E6" stroke-width="10" opacity=".35" stroke-linecap="round"/>`));

write('bg-07-study-room.svg', bg('study room', grad('wall','#E8E0D0','#CFD8D2'),
`<rect width="1200" height="800" fill="url(#wall)"/>
<rect x="80" y="90" width="340" height="360" rx="8" fill="#A8C8CE" stroke="#2E3440" stroke-width="8"/>
<path d="M250 90 V450 M80 270 H420" stroke="#2E3440" stroke-width="8"/>
<rect x="520" y="120" width="560" height="300" rx="8" fill="#F7F0E6" stroke="#2E3440" stroke-width="8"/>
<rect x="556" y="156" width="488" height="228" fill="#1F7A8C"/>
<path d="M590 340 L680 250 L750 310 L840 200 L920 280 L1010 190" fill="none" stroke="#FFD166" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="100" y="540" width="1000" height="36" rx="8" fill="#8B5E3C"/>
<rect x="150" y="576" width="22" height="224" fill="#6D472E"/><rect x="1020" y="576" width="22" height="224" fill="#6D472E"/>
<g fill="#FF6B5E"><rect x="260" y="500" width="50" height="40"/><rect x="320" y="490" width="42" height="50"/></g>
<g fill="#FFD166"><rect x="380" y="506" width="46" height="34"/></g>`));

write('bg-08-flat-loop.svg', bg('flat loopable', '',
`<rect width="1200" height="800" fill="#EAF3F4"/>
<circle cx="990" cy="150" r="70" fill="#FFD166"/>
<path d="M0 560 Q300 470 600 560 T1200 540 V800 H0 Z" fill="#1F7A8C"/>
<path d="M0 650 Q300 570 600 650 T1200 630 V800 H0 Z" fill="#165C6B"/>
<circle cx="180" cy="180" r="46" fill="#FF6B5E" opacity=".7"/>
<circle cx="320" cy="110" r="26" fill="#FF6B5E" opacity=".4"/>
<circle cx="1030" cy="380" r="30" fill="#FF6B5E" opacity=".5"/>`));

const bgNames = ['Cozy bedroom','Sunny park','Golden city street','Cozy cafe','Night sky','Abstract gradient','Study room','Flat loopable'];
const bgBody = '<div class="grid">' + bgNames.map((n,i)=>{
  const f=`bg-0${i+1}-${['cozy-bedroom','sunny-park','golden-city','cozy-cafe','night-sky','abstract-gradient','study-room','flat-loop'][i]}.svg`;
  return `<div class="card"><img src="${f}" style="width:100%;border-radius:8px" alt="${n}"><div class="label">${n}</div><div class="tag">${f}</div></div>`;}).join('')+'</div>';
write('backgrounds.html', shell('Background Pack', '8 ready-to-use 2D backgrounds — 1200×800 SVG, scalable.', bgBody));

console.log('built: expression-sheet.html, animation-sheet.html, model-sheet.html, mouth-shapes.svg, sharin-emblem.svg, 8 backgrounds, backgrounds.html');

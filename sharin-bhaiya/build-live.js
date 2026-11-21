import fs from 'fs';
import path from 'path';

const dir = import.meta.dirname;
let rig = fs.readFileSync(path.join(dir, 'sharin-bhaiya-rig.svg'), 'utf8');
rig = rig.replace('<svg xmlns=', '<svg id="char" class="expr-rest" xmlns=');

const actions = [
  ['', 'Idle'], ['a-wave', 'Wave'], ['a-walk', 'Walk'], ['a-run', 'Run'],
  ['a-jump', 'Jump'], ['a-think', 'Think'], ['a-explain', 'Explain'], ['a-point', 'Point'],
  ['a-thumbs', 'Thumbs up'], ['a-laugh', 'Laugh'], ['a-confused', 'Confused'], ['a-celebrate', 'Celebrate'],
];
const exprs = [
  ['expr-rest', 'Neutral'], ['expr-happy', 'Happy'], ['expr-laugh', 'Laughing'], ['expr-surprised', 'Surprised'],
  ['expr-confused', 'Confused'], ['expr-thinking', 'Thinking'], ['expr-curious', 'Curious'], ['expr-excited', 'Excited'],
  ['expr-annoyed', 'Annoyed'], ['expr-serious', 'Serious'], ['expr-mischief', 'Mischief'], ['expr-explain', 'Explaining'],
  ['expr-embarrassed', 'Embarrassed'], ['expr-proud', 'Proud'], ['expr-sleepy', 'Sleepy'],
];
const views = [['', 'Front'], ['turn-3q', '3/4'], ['turn-profile', 'Profile'], ['view-back', 'Back']];

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sharin Bhaiya — Live Character</title>
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;background:radial-gradient(1200px 700px at 30% 20%,#1b2733,#0d1117 70%);color:#eef3f6;font-family:ui-sans-serif,system-ui,"Segoe UI",sans-serif}
.wrap{display:grid;grid-template-columns:minmax(340px,1fr) 420px;gap:26px;padding:26px;max-width:1500px;margin:0 auto;min-height:100vh}
@media(max-width:1000px){.wrap{grid-template-columns:1fr}}
.stage{position:relative;border-radius:20px;background:radial-gradient(600px 500px at 50% 40%,#223140,#141a22 75%);border:1px solid #2b3947;overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:640px}
.stage:before{content:"";position:absolute;inset:0;background-image:linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(circle at 50% 45%,#000 30%,transparent 78%)}
.stage svg{position:relative;width:min(92%,640px);height:auto;max-height:94vh;filter:drop-shadow(0 24px 30px rgba(0,0,0,.45));z-index:1}
.stage .floor{position:absolute;bottom:7%;width:46%;height:26px;border-radius:50%;background:#000;opacity:.35;filter:blur(8px)}
.badge{position:absolute;top:16px;left:16px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#7fd3df;background:#0f1a22cc;border:1px solid #24414b;padding:7px 11px;border-radius:999px;z-index:2}
.state{position:absolute;top:16px;right:16px;font-size:12px;color:#f4c14e;background:#0f1a22cc;border:1px solid #4a3d1e;padding:7px 11px;border-radius:999px;z-index:2}
.panel{background:#121922;border:1px solid #26323e;border-radius:20px;padding:22px;height:max-content}
h1{font-size:23px;margin:0 0 4px;letter-spacing:-.4px}
.sub{color:#8ea2af;font-size:13px;margin:0 0 20px}
h2{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#6f8797;margin:20px 0 9px}
.row{display:flex;flex-wrap:wrap;gap:8px}
button{cursor:pointer;border:1px solid #2f3d4a;background:#1a232d;color:#dbe6ed;padding:8px 12px;border-radius:999px;font-size:12.5px;transition:.16s}
button:hover{border-color:#3f8a98;color:#fff}
button.on{background:linear-gradient(180deg,#2b8b9c,#1f6e7a);border-color:#4bb6c6;color:#fff;box-shadow:0 0 0 3px #2b8b9c22}
.toggles{display:flex;gap:8px;margin-top:18px}
.toggles button{flex:1}
.hint{margin-top:18px;font-size:11.5px;color:#6f8797;line-height:1.6}
kbd{background:#1c2731;border:1px solid #33414e;border-radius:5px;padding:1px 5px;font-size:10px}
.paused *{animation-play-state:paused !important}
.view-back #head-group,.view-back #ears{display:none}
.view-back #back-hair{transform:none}
</style></head>
<body>
<div class="wrap">
  <div class="stage">
    <div class="badge">Sharin Bhaiya · 6'5" · live rig</div>
    <div class="state" id="state">Idle · Neutral</div>
    <div class="floor"></div>
    ${rig}
  </div>
  <div class="panel">
    <h1>Live Character</h1>
    <p class="sub">Every button drives the real SVG rig — no video, no fake frames.</p>

    <h2>Action</h2>
    <div class="row" id="actions">
      ${actions.map(([c,l],i)=>`<button data-a="${c}" class="${i===0?'on':''}">${l}</button>`).join('')}
    </div>

    <h2>Expression</h2>
    <div class="row" id="exprs">
      ${exprs.map(([c,l],i)=>`<button data-e="${c}" class="${i===0?'on':''}">${l}</button>`).join('')}
    </div>

    <h2>Face turn</h2>
    <div class="row" id="views">
      ${views.map(([c,l],i)=>`<button data-v="${c}" class="${i===0?'on':''}">${l}</button>`).join('')}
    </div>

    <div class="toggles">
      <button id="pause">Pause motion</button>
      <button id="random">Random pose</button>
    </div>

    <p class="hint">Shortcuts: <kbd>W</kbd> wave · <kbd>J</kbd> jump · <kbd>E</kbd> explain · <kbd>P</kbd> point · <kbd>Space</kbd> pause. Export by opening <code>sharin-bhaiya-rig.svg</code> in Figma / Illustrator, or screenshot this stage.</p>
  </div>
</div>
<script>
const char = document.getElementById('char');
const state = document.getElementById('state');
let action = '', expr = 'expr-rest', view = '', paused = false;
const actionNames = ${JSON.stringify(Object.fromEntries(actions.map(([c,l])=>[c,l])))};
const exprNames = ${JSON.stringify(Object.fromEntries(exprs.map(([c,l])=>[c,l])))};

function apply(){
  const cls = [expr, action, view, paused ? 'paused' : ''].filter(Boolean).join(' ');
  char.setAttribute('class', cls);
  state.textContent = (actionNames[action] || 'Idle') + ' · ' + (exprNames[expr] || 'Neutral') + (view ? ' · ' + (view==='view-back'?'Back':view==='turn-profile'?'Profile':'3/4') : '');
}
function pick(container, attr, value){
  container.querySelectorAll('button').forEach(b=>b.classList.toggle('on', b.dataset[attr] === value));
}
document.getElementById('actions').addEventListener('click', e=>{
  const b = e.target.closest('button'); if(!b) return;
  action = b.dataset.a; pick(e.currentTarget,'a',action); apply();
});
document.getElementById('exprs').addEventListener('click', e=>{
  const b = e.target.closest('button'); if(!b) return;
  expr = b.dataset.e; pick(e.currentTarget,'e',expr); apply();
});
document.getElementById('views').addEventListener('click', e=>{
  const b = e.target.closest('button'); if(!b) return;
  view = b.dataset.v; pick(e.currentTarget,'v',view); apply();
});
document.getElementById('pause').addEventListener('click', e=>{
  paused = !paused; e.currentTarget.textContent = paused ? 'Resume motion' : 'Pause motion'; apply();
});
document.getElementById('random').addEventListener('click', ()=>{
  const a = ${JSON.stringify(actions.map(([c])=>c))};
  const ex = ${JSON.stringify(exprs.map(([c])=>c))};
  action = a[Math.floor(Math.random()*a.length)];
  expr = ex[Math.floor(Math.random()*ex.length)];
  pick(document.getElementById('actions'),'a',action);
  pick(document.getElementById('exprs'),'e',expr);
  apply();
});
document.addEventListener('keydown', e=>{
  const k = e.key.toLowerCase();
  if(k==='w'){ action='a-wave'; pick(document.getElementById('actions'),'a',action); apply(); }
  if(k==='j'){ action='a-jump'; pick(document.getElementById('actions'),'a',action); apply(); }
  if(k==='e'){ action='a-explain'; pick(document.getElementById('actions'),'a',action); apply(); }
  if(k==='p'){ action='a-point'; pick(document.getElementById('actions'),'a',action); apply(); }
  if(k===' '){ e.preventDefault(); document.getElementById('pause').click(); }
});
apply();
</script>
</body></html>`;

fs.writeFileSync(path.join(dir, 'live-character.html'), html);
console.log('wrote live-character.html');

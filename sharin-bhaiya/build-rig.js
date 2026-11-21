// Builds the v2 animation rig (tall, glasses, dark-smart) from the base artwork.
// Head / hair artwork is extracted from sharin-bhaiya-base.svg and re-assembled
// with independently animatable upper arms, forearms, hands, legs and head.
import fs from 'fs';
import path from 'path';

const dir = import.meta.dirname;
const base = fs.readFileSync(path.join(dir, 'sharin-bhaiya-base.svg'), 'utf8');

function extractGroup(id, src) {
  const open = `<g id="${id}">`;
  const start = src.indexOf(open);
  if (start < 0) throw new Error(`missing group ${id}`);
  let i = start + open.length;
  let depth = 1;
  while (depth > 0) {
    const nextOpen = src.indexOf('<g', i);
    const nextClose = src.indexOf('</g>', i);
    if (nextClose < 0) throw new Error(`unbalanced group ${id}`);
    if (nextOpen >= 0 && nextOpen < nextClose) { depth++; i = nextOpen + 2; }
    else { depth--; i = nextClose + 4; }
  }
  return src.slice(start + open.length, i - 4);
}

const backHair = extractGroup('back-hair', base);
const headArt = extractGroup('head', base);
const earsArt = extractGroup('ears', base);
const frontHair = extractGroup('front-hair', base);

const css = `
  :root{
    --coat:#1B2233; --coat-lt:#2A3448; --coat-dk:#121826;
    --teal:#1F4E5A; --teal-lt:#2E6C7A; --teal-dk:#153A43;
    --coral:#FF6B5E; --coral-dk:#D95046;
    --tan:#C88A5A; --tan-dk:#A96E43; --tan-lt:#DFA877;
    --hair:#15131C; --hair-lt:#2E2A45;
    --cream:#F2ECE2; --charcoal:#1A1D24; --gold:#FFD166; --ink:#1A1720;
  }
  .ln{stroke:var(--ink);stroke-width:3.4;stroke-linejoin:round;stroke-linecap:round}
  .thin{stroke:var(--ink);stroke-width:2.6;fill:none;stroke-linecap:round}
  .expr{display:none} .expr.rest{display:inline}
  .expr-happy .expr.rest,.expr-laugh .expr.rest,.expr-surprised .expr.rest,
  .expr-confused .expr.rest,.expr-thinking .expr.rest,.expr-curious .expr.rest,
  .expr-excited .expr.rest,.expr-annoyed .expr.rest,.expr-serious .expr.rest,
  .expr-mischief .expr.rest,.expr-explain .expr.rest,.expr-embarrassed .expr.rest,
  .expr-proud .expr.rest,.expr-sleepy .expr.rest{display:none}
  .expr-happy .expr.happy,.expr-laugh .expr.laugh,.expr-surprised .expr.surprised,
  .expr-confused .expr.confused,.expr-thinking .expr.thinking,.expr-curious .expr.curious,
  .expr-excited .expr.excited,.expr-annoyed .expr.annoyed,.expr-serious .expr.serious,
  .expr-mischief .expr.mischief,.expr-explain .expr.explain,.expr-embarrassed .expr.embarrassed,
  .expr-proud .expr.proud,.expr-sleepy .expr.sleepy{display:inline}
  #blush{opacity:0} .expr-embarrassed #blush{opacity:.5}

  /* pivots */
  #rig{transform-box:view-box;transform-origin:350px 720px}
  #head-group,#front-hair,#back-hair,#ears{transform-box:view-box;transform-origin:350px 200px}
  #arm-left{transform-box:view-box;transform-origin:260px 222px}
  #arm-right{transform-box:view-box;transform-origin:440px 222px}
  #forearm-left{transform-box:view-box;transform-origin:238px 378px}
  #forearm-right{transform-box:view-box;transform-origin:462px 378px}
  #leg-left{transform-box:view-box;transform-origin:306px 526px}
  #leg-right{transform-box:view-box;transform-origin:394px 526px}

  /* idle */
  #front-hair{animation:hairIdle 3.4s ease-in-out infinite}
  #head-group,#ears{animation:headIdle 3.8s ease-in-out infinite}
  @keyframes hairIdle{0%,100%{transform:rotate(0)}50%{transform:rotate(1.4deg)}}
  @keyframes headIdle{0%,100%{transform:rotate(0)}50%{transform:rotate(-1deg)}}

  /* wave */
  .a-wave #arm-right{animation:wUp 1.15s ease-in-out infinite}
  .a-wave #forearm-right{animation:wFore 1.15s ease-in-out infinite}
  .a-wave #front-hair{animation:hairLag 1.15s ease-in-out infinite}
  @keyframes wUp{0%,100%{transform:rotate(-58deg)}50%{transform:rotate(-68deg)}}
  @keyframes wFore{0%,100%{transform:rotate(-95deg)}50%{transform:rotate(-78deg)}}
  @keyframes hairLag{0%,100%{transform:rotate(0)}50%{transform:rotate(2.2deg)}}

  /* walk */
  .a-walk #rig{animation:bob .7s ease-in-out infinite}
  .a-walk #leg-left{animation:legA .7s ease-in-out infinite}
  .a-walk #leg-right{animation:legB .7s ease-in-out infinite}
  .a-walk #arm-left{animation:armB .7s ease-in-out infinite}
  .a-walk #arm-right{animation:armA .7s ease-in-out infinite}
  @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes legA{0%,100%{transform:rotate(16deg)}50%{transform:rotate(-16deg)}}
  @keyframes legB{0%,100%{transform:rotate(-16deg)}50%{transform:rotate(16deg)}}
  @keyframes armA{0%,100%{transform:rotate(-13deg)}50%{transform:rotate(13deg)}}
  @keyframes armB{0%,100%{transform:rotate(13deg)}50%{transform:rotate(-13deg)}}

  /* run */
  .a-run #rig{animation:runBob .4s ease-in-out infinite}
  .a-run #leg-left{animation:legRunA .4s ease-in-out infinite}
  .a-run #leg-right{animation:legRunB .4s ease-in-out infinite}
  .a-run #arm-left{animation:armRunB .4s ease-in-out infinite}
  .a-run #arm-right{animation:armRunA .4s ease-in-out infinite}
  .a-run #forearm-left{animation:foreRun .4s ease-in-out infinite}
  .a-run #forearm-right{animation:foreRun .4s ease-in-out infinite}
  .a-run #front-hair{animation:hairFast .4s ease-in-out infinite}
  @keyframes runBob{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-14px) rotate(-5deg)}}
  @keyframes legRunA{0%,100%{transform:rotate(30deg)}50%{transform:rotate(-28deg)}}
  @keyframes legRunB{0%,100%{transform:rotate(-28deg)}50%{transform:rotate(30deg)}}
  @keyframes armRunA{0%,100%{transform:rotate(-30deg)}50%{transform:rotate(26deg)}}
  @keyframes armRunB{0%,100%{transform:rotate(26deg)}50%{transform:rotate(-30deg)}}
  @keyframes foreRun{0%,100%{transform:rotate(-55deg)}50%{transform:rotate(-20deg)}}
  @keyframes hairFast{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}

  /* jump / legs up */
  .a-jump #rig{animation:jump 1s cubic-bezier(.3,.7,.3,1) infinite}
  .a-jump #leg-left{animation:jLegL 1s ease-in-out infinite}
  .a-jump #leg-right{animation:jLegR 1s ease-in-out infinite}
  .a-jump #arm-left{animation:jArmL 1s ease-in-out infinite}
  .a-jump #arm-right{animation:jArmR 1s ease-in-out infinite}
  .a-jump #forearm-left,.a-jump #forearm-right{animation:jFore 1s ease-in-out infinite}
  @keyframes jump{0%,100%{transform:translateY(0)}35%,65%{transform:translateY(-66px)}}
  @keyframes jLegL{0%,100%{transform:rotate(0)}35%,65%{transform:rotate(-70deg)}}
  @keyframes jLegR{0%,100%{transform:rotate(0)}35%,65%{transform:rotate(-105deg)}}
  @keyframes jArmL{0%,100%{transform:rotate(0)}35%,65%{transform:rotate(118deg)}}
  @keyframes jArmR{0%,100%{transform:rotate(0)}35%,65%{transform:rotate(-118deg)}}
  @keyframes jFore{0%,100%{transform:rotate(0)}35%,65%{transform:rotate(-12deg)}}

  /* think */
  .a-think #arm-right{transform:rotate(77deg)}
  .a-think #forearm-right{transform:rotate(137deg)}
  .a-think #head-group,.a-think #ears{transform:rotate(4deg)}
  .a-think #front-hair{animation:hairIdle 4s ease-in-out infinite}

  /* explain */
  .a-explain #arm-left{animation:exUpL 1.3s ease-in-out infinite}
  .a-explain #arm-right{animation:exUpR 1.3s ease-in-out infinite}
  .a-explain #forearm-left{animation:exForeL 1.3s ease-in-out infinite}
  .a-explain #forearm-right{animation:exForeR 1.3s ease-in-out infinite}
  .a-explain #head-group,.a-explain #ears{animation:headTalk 1.3s ease-in-out infinite}
  @keyframes exUpL{0%,100%{transform:rotate(35deg)}50%{transform:rotate(58deg)}}
  @keyframes exUpR{0%,100%{transform:rotate(-58deg)}50%{transform:rotate(-35deg)}}
  @keyframes exForeL{0%,100%{transform:rotate(-70deg)}50%{transform:rotate(-30deg)}}
  @keyframes exForeR{0%,100%{transform:rotate(-30deg)}50%{transform:rotate(-70deg)}}
  @keyframes headTalk{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}

  /* point */
  .a-point #arm-right{transform:rotate(-70deg)}
  .a-point #forearm-right{transform:rotate(-8deg)}
  .a-point #head-group,.a-point #ears{transform:rotate(-3deg)}

  /* thumbs up */
  .a-thumbs #arm-left{transform:rotate(-120deg)}
  .a-thumbs #forearm-left{transform:rotate(60deg)}
  .a-thumbs #head-group,.a-thumbs #ears{transform:rotate(3deg)}

  /* laugh */
  .a-laugh #rig{animation:laughBounce .5s ease-in-out infinite}
  .a-laugh #head-group,.a-laugh #ears{animation:laughTilt .5s ease-in-out infinite}
  .a-laugh #arm-left,.a-laugh #arm-right{animation:laughArm .5s ease-in-out infinite}
  @keyframes laughBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  @keyframes laughTilt{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
  @keyframes laughArm{0%,100%{transform:rotate(18deg)}50%{transform:rotate(30deg)}}

  /* confused */
  .a-confused #head-group,.a-confused #ears{transform:rotate(9deg)}
  .a-confused #arm-right{transform:rotate(60deg)}
  .a-confused #forearm-right{transform:rotate(80deg)}

  /* celebrate */
  .a-celebrate #rig{animation:celeb .8s ease-in-out infinite}
  .a-celebrate #arm-left{animation:celebL .8s ease-in-out infinite}
  .a-celebrate #arm-right{animation:celebR .8s ease-in-out infinite}
  .a-celebrate #forearm-left,.a-celebrate #forearm-right{animation:celebFore .8s ease-in-out infinite}
  @keyframes celeb{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
  @keyframes celebL{0%,100%{transform:rotate(118deg)}50%{transform:rotate(132deg)}}
  @keyframes celebR{0%,100%{transform:rotate(-118deg)}50%{transform:rotate(-132deg)}}
  @keyframes celebFore{0%,100%{transform:rotate(10deg)}50%{transform:rotate(-8deg)}}

  /* face turn */
  .turn-3q #head-group,.turn-3q #ears,.turn-3q #front-hair,.turn-3q #back-hair{transform:scaleX(.8) skewX(-4deg)}
  .turn-profile #head-group,.turn-profile #ears,.turn-profile #front-hair,.turn-profile #back-hair{transform:scaleX(.52) skewX(-7deg)}
`;

const rig = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -140 760 1140" role="img" aria-label="Sharin Bhaiya animation rig v2">
  <title>Sharin Bhaiya — animation rig v2</title>
  <defs><style>${css}</style></defs>
  <g id="rig">
    <g id="back-hair">${backHair}</g>

    <g id="leg-left">
      <path class="ln" fill="var(--charcoal)" d="M272 522 L342 526 L334 912 L288 912 Z"/>
      <path fill="#262B36" opacity=".9" d="M284 548 L298 548 L294 898 L288 898 Z"/>
      <path class="thin" stroke="#3A414F" d="M294 712 C306 706 322 706 334 712"/>
      <path class="thin" stroke="#3A414F" d="M292 560 L332 562"/>
      <path class="ln" fill="#14171E" d="M286 902 L334 902 L336 942 C336 952 330 958 320 958 L278 958 C270 958 266 952 270 946 C276 940 282 932 282 924 Z"/>
      <path fill="var(--coral)" d="M268 950 L338 950 L338 956 C338 960 332 962 324 962 L278 962 C271 962 267 958 268 954 Z"/>
      <path class="thin" stroke="#2C313C" d="M288 920 C296 916 306 916 314 920"/>
    </g>
    <g id="leg-right">
      <path class="ln" fill="var(--charcoal)" d="M358 526 L428 522 L412 912 L366 912 Z"/>
      <path fill="#262B36" opacity=".9" d="M404 548 L418 548 L410 898 L404 898 Z"/>
      <path class="thin" stroke="#3A414F" d="M366 712 C378 706 394 706 406 712"/>
      <path class="thin" stroke="#3A414F" d="M368 562 L408 560"/>
      <path class="ln" fill="#14171E" d="M366 902 L414 902 L418 924 C418 932 424 940 430 946 C434 952 430 958 422 958 L380 958 C370 958 364 952 364 942 Z"/>
      <path fill="var(--coral)" d="M362 950 L432 950 L432 954 C433 958 429 962 422 962 L376 962 C368 962 362 958 362 956 Z"/>
      <path class="thin" stroke="#2C313C" d="M386 920 C394 916 404 916 412 920"/>
    </g>

    <g id="torso">
      <path class="ln" fill="var(--tan-dk)" d="M334 160 L366 160 L368 202 L332 202 Z"/>
      <path fill="var(--tan)" d="M334 160 L350 168 L366 160 L366 180 L334 180 Z"/>
      <path fill="var(--tan-dk)" opacity=".35" d="M334 160 C340 172 360 172 366 160 L366 172 C356 180 344 180 334 172 Z"/>
      <path class="ln" fill="var(--teal-dk)" d="M330 194 L370 194 L372 216 L328 216 Z"/>
      <path class="ln" fill="var(--cream)" d="M338 206 L350 224 L362 206 L358 218 L350 230 L342 218 Z"/>
      <path class="ln" fill="var(--teal)" d="M322 228 L350 260 L378 228 L372 246 L350 270 L328 246 Z"/>
      <path fill="var(--teal-lt)" opacity=".5" d="M322 228 L334 234 L342 262 L328 246 Z"/>
      <path class="ln" fill="var(--coat)" d="M226 300 C230 350 262 380 270 406 C260 442 250 480 254 520 L446 520 C450 480 440 442 430 406 C438 380 470 350 474 300 C474 268 466 244 452 236 C430 226 400 226 378 228 L350 260 L322 228 C300 226 270 226 248 236 C234 244 226 268 226 300 Z"/>
      <path fill="var(--coat-dk)" opacity=".4" d="M452 236 C466 244 474 268 474 300 C470 350 438 380 430 406 C440 442 450 480 446 520 L424 520 L414 300 Z"/>
      <path class="thin" d="M350 492 L338 520 M350 492 L362 520"/>
      <path class="ln" fill="var(--coat-lt)" d="M322 228 L338 242 L350 260 L336 252 Z"/>
      <path class="ln" fill="var(--coat-lt)" d="M378 228 L362 242 L350 260 L364 252 Z"/>
      <path class="thin" d="M350 260 L350 520"/>
      <circle cx="350" cy="322" r="4" fill="var(--gold)" stroke="var(--ink)" stroke-width="1.6"/>
      <circle cx="350" cy="362" r="4" fill="var(--gold)" stroke="var(--ink)" stroke-width="1.6"/>
      <path class="ln" fill="var(--charcoal)" d="M266 424 L434 424 L436 446 L264 446 Z"/>
      <rect x="338" y="428" width="24" height="16" rx="4" fill="var(--gold)" stroke="var(--ink)" stroke-width="2.6"/>
      <path class="thin" d="M388 344 L426 344 L422 384 C408 390 396 390 390 384 Z"/>
      <g transform="translate(422,306)">
        <circle r="10" fill="var(--gold)" stroke="var(--ink)" stroke-width="2.6"/>
        <path d="M-2 -5 L1 -2 L5 -3 L3 0 L4 4 L1 2 L-3 4 L-2 1 L-5 0 L-2 -1 Z" fill="var(--coral-dk)"/>
      </g>
    </g>

    <g id="arm-left">
      <path class="ln" fill="var(--coat)" d="M260 238 C240 246 228 268 222 300 L210 372 L238 378 L246 310 Z"/>
      <path fill="var(--coat-dk)" opacity=".4" d="M220 292 L210 372 L238 378 L240 360 Z"/>
      <g id="forearm-left">
        <path class="ln" fill="var(--coat)" d="M210 372 L238 378 L228 496 L202 500 Z"/>
        <path fill="var(--coat-dk)" opacity=".35" d="M202 500 L228 496 L228 508 L204 512 Z"/>
        <path class="ln" fill="var(--teal-dk)" d="M202 490 L230 486 L232 506 L204 510 Z"/>
        <path class="ln" fill="var(--tan)" d="M198 498 C188 498 182 508 184 520 C186 532 198 540 208 534 C218 528 220 516 214 506 C212 500 206 497 198 498 Z"/>
        <path class="thin" d="M184 512 C178 516 180 524 186 524"/>
        <path class="thin" d="M192 518 C196 522 202 524 208 522 M196 510 C200 512 206 512 210 510"/>
      </g>
    </g>
    <g id="arm-right">
      <path class="ln" fill="var(--coat)" d="M440 238 C460 246 472 268 478 300 L490 372 L462 378 L454 310 Z"/>
      <path fill="var(--coat-dk)" opacity=".4" d="M480 292 L490 372 L462 378 L460 360 Z"/>
      <g id="forearm-right">
        <path class="ln" fill="var(--coat)" d="M490 372 L462 378 L472 496 L498 500 Z"/>
        <path fill="var(--coat-dk)" opacity=".35" d="M498 500 L472 496 L472 508 L496 512 Z"/>
        <path class="ln" fill="var(--teal-dk)" d="M470 486 L498 490 L496 510 L468 506 Z"/>
        <path class="ln" fill="var(--tan)" d="M502 498 C512 498 518 508 516 520 C514 532 502 540 492 534 C482 528 480 516 486 506 C488 500 494 497 502 498 Z"/>
        <path class="thin" d="M516 512 C522 516 520 524 514 524"/>
        <path class="thin" d="M508 518 C504 522 498 524 492 522 M504 510 C500 512 494 512 490 510"/>
        <path class="ln" fill="#2B3140" d="M470 480 L496 486 L494 498 L468 492 Z"/>
        <circle cx="482" cy="489" r="5.5" fill="var(--gold)" stroke="var(--ink)" stroke-width="2"/>
      </g>
    </g>

    <g id="ears">${earsArt}</g>
    <g id="head-group">
      <g id="head">${headArt}</g>
      <g id="front-hair">${frontHair}</g>
    </g>
  </g>
</svg>
`;

fs.writeFileSync(path.join(dir, 'sharin-bhaiya-rig.svg'), rig);
console.log('wrote sharin-bhaiya-rig.svg (v2)');

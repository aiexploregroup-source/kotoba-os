import { useEffect, useRef, useState } from 'react';
import './Brand.css';

/**
 * Original Kotoba OS mark.
 * A rounded indigo→cyan tile holding a hand-built 言 (word) glyph,
 * wrapped by two orbital arcs. Every path is authored here, not imported.
 */
export function BrandMark({
  size = 48,
  animated = false,
  className = '',
}: {
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`kb-mark ${animated ? 'is-animated' : ''} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      role="img"
      aria-label="Kotoba OS"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="kbTile" x1="8" y1="6" x2="120" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="48%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="kbRing" x1="14" y1="14" x2="114" y2="114" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
        <linearGradient id="kbGlyph" x1="38" y1="28" x2="90" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <radialGradient id="kbAura" cx="64" cy="56" r="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
        <filter id="kbSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

      {/* tile */}
      <rect x="3" y="3" width="122" height="122" rx="32" fill="url(#kbTile)" />
      <rect x="3.75" y="3.75" width="120.5" height="120.5" rx="31.25" fill="none" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1.5" />
      <circle className="kb-aura" cx="64" cy="56" r="56" fill="url(#kbAura)" />

      {/* orbital arcs */}
      <circle className="kb-orbit kb-orbit-a" cx="64" cy="64" r="51" fill="none" stroke="url(#kbRing)" strokeOpacity="0.85" strokeWidth="2.6" strokeLinecap="round" pathLength={100} strokeDasharray="30 70" />
      <circle className="kb-orbit kb-orbit-b" cx="64" cy="64" r="44" fill="none" stroke="#e0e7ff" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" pathLength={100} strokeDasharray="14 86" />
      <circle className="kb-orbit-dot" cx="103" cy="35" r="3.6" fill="#a5f3fc" filter="url(#kbSoft)" />
      <circle className="kb-orbit-dot-core" cx="103" cy="35" r="2.1" fill="#ecfeff" />

      {/* 言 — three bars + mouth, drawn as strokes */}
      <g className="kb-glyph" fill="none" stroke="url(#kbGlyph)" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M57 30 L71 30" pathLength={100} />
        <path d="M47 43 H81" pathLength={100} />
        <path d="M43 55 H85" pathLength={100} />
        <path d="M39 67 H89" pathLength={100} />
        <path d="M47 75 H81 V99 H47 Z" pathLength={100} />
      </g>

      {/* small sparkle */}
      <path className="kb-spark" d="M100 88 L101.6 93 L106.5 94.6 L101.6 96.2 L100 101 L98.4 96.2 L93.5 94.6 L98.4 93 Z" fill="#f0abfc" fillOpacity="0.9" />
    </svg>
  );
}

function prefersReducedMotion() {
  try {
    const raw = window.localStorage.getItem('kotoba-os-state-v1');
    if (!raw) return false;
    return Boolean((JSON.parse(raw) as { settings?: { reduceMotion?: boolean } }).settings?.reduceMotion);
  } catch {
    return false;
  }
}

/** Full-screen brand animation played once before the command center is revealed. */
export function BrandIntro({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const hold = reduced ? 350 : 2350;
    const exit = reduced ? 450 : 2750;

    const finish = () => {
      if (done.current) return;
      done.current = true;
      onComplete();
    };
    const leaveTimer = window.setTimeout(() => setLeaving(true), hold);
    const endTimer = window.setTimeout(finish, exit);
    const clickTimer = window.setTimeout(() => {
      window.addEventListener('pointerdown', finish, { once: true });
      window.addEventListener('keydown', finish, { once: true });
    }, 250);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(endTimer);
      window.clearTimeout(clickTimer);
      window.removeEventListener('pointerdown', finish);
      window.removeEventListener('keydown', finish);
    };
  }, [onComplete]);

  return (
    <div className={`kb-intro ${leaving ? 'is-leaving' : ''}`} role="presentation" aria-label="Loading Kotoba OS">
      <div className="kb-intro-grid" />
      <div className="kb-intro-aura kb-intro-aura-a" />
      <div className="kb-intro-aura kb-intro-aura-b" />

      <div className="kb-intro-core">
        <div className="kb-halo">
          <span className="kb-halo-ring kb-halo-1" />
          <span className="kb-halo-ring kb-halo-2" />
          <span className="kb-halo-ring kb-halo-3" />
          <BrandMark size={132} animated />
        </div>

        <div className="kb-wordmark">
          <span className="kb-wordmark-main">KOTOBA</span>
          <span className="kb-wordmark-os">OS</span>
        </div>
        <div className="kb-tagline">JAPANESE LEARNING COMMAND CENTER</div>

        <div className="kb-load-track"><span className="kb-load-fill" /></div>
        <div className="kb-footnote">LOCAL-FIRST&nbsp;&nbsp;·&nbsp;&nbsp;2,136 JŌYŌ KANJI&nbsp;&nbsp;·&nbsp;&nbsp;N4 READY</div>
      </div>

      <div className="kb-skip">click anywhere to skip</div>
    </div>
  );
}

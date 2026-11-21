import { useEffect, useRef, useState } from 'react';
import { Check, Minus, Plus, RotateCcw, X } from 'lucide-react';

type Ratio = '16:9' | '9:16' | '1:1' | 'free';

const ratios: Ratio[] = ['16:9', '9:16', '1:1', 'free'];

const ratioValue = (ratio: Ratio, natural: number) => {
  if (ratio === 'free') return natural || 16 / 9;
  const [w, h] = ratio.split(':').map(Number);
  return w / h;
};

/** Lightweight, dependency-free image cropper with pan, zoom and aspect presets. */
export default function ImageCropper({ src, onCancel, onSave }: {
  src: string;
  onCancel: () => void;
  onSave: (dataUrl: string) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const [natural, setNatural] = useState({ w: 1600, h: 900 });
  const [frame, setFrame] = useState({ w: 480, h: 270 });
  const [ratio, setRatio] = useState<Ratio>('16:9');
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = src;
    imageRef.current = img;
  }, [src]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setFrame({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ratio]);

  const ar = ratioValue(ratio, natural.w / natural.h);
  const coverScale = Math.max(frame.w / natural.w, frame.h / natural.h);
  const displayW = natural.w * coverScale * zoom;
  const displayH = natural.h * coverScale * zoom;
  const maxX = Math.max(0, (displayW - frame.w) / 2);
  const maxY = Math.max(0, (displayH - frame.h) / 2);
  const clampOffset = (x: number, y: number) => ({
    x: Math.max(-maxX, Math.min(maxX, x)),
    y: Math.max(-maxY, Math.min(maxY, y)),
  });

  const changeZoom = (next: number) => {
    const z = Math.max(1, Math.min(3, Math.round(next * 100) / 100));
    setZoom(z);
    setOffset((current) => {
      const scale = Math.max(frame.w / natural.w, frame.h / natural.h) * z;
      const mx = Math.max(0, (natural.w * scale - frame.w) / 2);
      const my = Math.max(0, (natural.h * scale - frame.h) / 2);
      return { x: Math.max(-mx, Math.min(mx, current.x)), y: Math.max(-my, Math.min(my, current.y)) };
    });
  };

  const save = () => {
    const img = imageRef.current;
    if (!img || !img.complete || busy) return;
    setBusy(true);
    try {
      const scale = Math.max(frame.w / natural.w, frame.h / natural.h) * zoom;
      const renderedW = natural.w * scale;
      const renderedH = natural.h * scale;
      const left = frame.w / 2 + offset.x - renderedW / 2;
      const top = frame.h / 2 + offset.y - renderedH / 2;
      const sx = Math.max(0, (-left / renderedW) * natural.w);
      const sy = Math.max(0, (-top / renderedH) * natural.h);
      const sw = Math.min(natural.w - sx, (frame.w / renderedW) * natural.w);
      const sh = Math.min(natural.h - sy, (frame.h / renderedH) * natural.h);

      let outW: number;
      let outH: number;
      if (ratio === '16:9') { outW = 1600; outH = 900; }
      else if (ratio === '9:16') { outW = 900; outH = 1600; }
      else if (ratio === '1:1') { outW = 1200; outH = 1200; }
      else if (natural.w >= natural.h) { outW = 1600; outH = Math.round(1600 * (sh / sw)); }
      else { outH = 1600; outW = Math.round(1600 * (sw / sh)); }

      const canvas = document.createElement('canvas');
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable');
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);
      onSave(canvas.toDataURL('image/jpeg', 0.82));
    } catch {
      onCancel();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="crop-backdrop" onMouseDown={onCancel}>
      <div className="crop-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label="Crop background">
        <div className="crop-head">
          <div><span className="eyebrow">Custom background</span><h3>Crop & position</h3></div>
          <button className="icon-btn" onClick={onCancel} aria-label="Cancel"><X size={18} /></button>
        </div>

        <div
          ref={frameRef}
          className="crop-frame"
          style={{ aspectRatio: `${ar}` }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            setOffset(clampOffset(
              drag.current.ox + (e.clientX - drag.current.x),
              drag.current.oy + (e.clientY - drag.current.y),
            ));
          }}
          onPointerUp={() => { drag.current = null; }}
          onPointerCancel={() => { drag.current = null; }}
        >
          <img
            src={src}
            alt="Crop preview"
            draggable={false}
            style={{
              transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})`,
            }}
          />
          <div className="crop-grid" aria-hidden="true"><i /><i /><i /><i /></div>
        </div>
        <p className="crop-hint">Drag to reposition · use zoom to frame the shot</p>

        <div className="crop-controls">
          <div className="crop-ratios">
            {ratios.map((item) => (
              <button key={item} className={ratio === item ? 'active' : ''} onClick={() => { setRatio(item); setOffset({ x: 0, y: 0 }); }}>{item}</button>
            ))}
          </div>
          <div className="crop-zoom">
            <button onClick={() => changeZoom(zoom - 0.15)} aria-label="Zoom out"><Minus size={15} /></button>
            <input type="range" min="1" max="3" step="0.01" value={zoom} onChange={(e) => changeZoom(Number(e.target.value))} aria-label="Zoom" />
            <button onClick={() => changeZoom(zoom + 0.15)} aria-label="Zoom in"><Plus size={15} /></button>
            <span>{zoom.toFixed(1)}×</span>
          </div>
          <button className="crop-reset" onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}><RotateCcw size={14} /> Reset</button>
        </div>

        <div className="crop-actions">
          <button className="btn btn-secondary btn-md" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary btn-md" onClick={save} disabled={busy}><Check size={15} /> Apply crop</button>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import {
  Check, ImagePlus, Info, RotateCcw, Sparkles, Trash2, Upload, WandSparkles,
} from 'lucide-react';
import ImageCropper from '../components/ImageCropper';
import { Button, SectionHeader } from '../components';
import { backgroundPresets, presetById, type BackgroundPreset } from '../data/backgrounds';
import { useApp } from '../store';
import type { BackgroundSettings } from '../types';
import type { PageProps } from '../pageTypes';

const categories = ['All', 'Nature', 'Atmosphere', 'Japanese'] as const;

/** Shared background studio — works in both the desktop workspace and mobile shell. */
export default function Backgrounds({ notify }: PageProps) {
  const { state, setBackground } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const [pending, setPending] = useState<string | null>(null);

  const bg = state.background;
  const activePreset = presetById(bg.presetId);
  const activeImage = bg.mode === 'custom' && bg.image ? bg.image : activePreset?.src ?? null;
  const activeName = bg.mode === 'custom' ? 'Custom background' : activePreset?.name ?? 'Default atmosphere';

  const visible = useMemo(
    () => backgroundPresets.filter((item) => filter === 'All' || item.category === filter),
    [filter],
  );

  const patch = (values: Partial<BackgroundSettings>) => setBackground({ ...bg, ...values });

  const applyPreset = (preset: BackgroundPreset) => {
    setBackground({ ...bg, mode: 'preset', presetId: preset.id, image: null });
    notify(`${preset.name} applied`);
  };

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { notify('Choose an image file'); return; }
    if (file.size > 15 * 1024 * 1024) { notify('Image is larger than 15 MB'); return; }
    const reader = new FileReader();
    reader.onload = () => setPending(String(reader.result));
    reader.onerror = () => notify('Could not read that image');
    reader.readAsDataURL(file);
  };

  const applyCrop = (dataUrl: string) => {
    setBackground({ ...bg, mode: 'custom', presetId: null, image: dataUrl });
    setPending(null);
    notify('Custom background applied');
  };

  return (
    <div className="page backgrounds-page">
      <SectionHeader
        eyebrow="Personalize"
        title="Background Studio"
        subtitle="Download a curated scene, upload your own, crop it, and apply it across the whole app."
      />

      <section className={`bg-current card ${activeImage ? 'has-image' : ''}`}>
        {activeImage && <div className="bg-current-image" style={{ backgroundImage: `url("${activeImage}")` }} />}
        <div className="bg-current-copy">
          <span className="eyebrow">Currently applied</span>
          <h2>{activeName}</h2>
          <p>{bg.mode === 'default' ? 'The built-in atmosphere is active. Pick a scene below to change it.' : 'Applied to every screen, in both the desktop workspace and the mobile app.'}</p>
        </div>
        {bg.mode !== 'default' && (
          <Button variant="secondary" size="sm" onClick={() => { setBackground({ ...bg, mode: 'default', presetId: null, image: null }); notify('Background removed'); }}>
            <RotateCcw size={14} /> Remove
          </Button>
        )}
      </section>

      <section className="bg-upload card">
        <div className="bg-upload-copy">
          <span className="eyebrow">Your own image</span>
          <h2>Add a custom background</h2>
          <p>Upload a photo, choose a crop, then fine-tune how it looks. The cropped image stays on this device.</p>
        </div>
        <div className="row-actions">
          <Button onClick={() => fileRef.current?.click()}><Upload size={15} /> Choose image</Button>
          {bg.mode === 'custom' && bg.image && (
            <Button variant="secondary" onClick={() => fileRef.current?.click()}><ImagePlus size={15} /> Replace</Button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onUpload} />
      </section>

      <section>
        <div className="bg-section-head">
          <div>
            <span className="eyebrow">Curated library</span>
            <h2>Downloaded scenes</h2>
          </div>
          <div className="row-actions wrap">
            {categories.map((category) => (
              <button key={category} className={`pill ${filter === category ? 'active' : ''}`} onClick={() => setFilter(category)}>{category}</button>
            ))}
          </div>
        </div>
        <div className="bg-grid">
          {visible.map((preset) => {
            const active = bg.mode === 'preset' && bg.presetId === preset.id;
            return (
              <button key={preset.id} className={`bg-card ${active ? 'active' : ''}`} onClick={() => applyPreset(preset)}>
                <span className="bg-thumb" style={{ backgroundImage: `url("${preset.src}")` }}>
                  {active && <span className="bg-check"><Check size={15} /></span>}
                </span>
                <span className="bg-card-copy">
                  <span className="bg-card-top"><strong>{preset.name}</strong><small>{preset.category}</small></span>
                  <span className="bg-credit">
                    {preset.link ? <a href={preset.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>{preset.credit}</a> : preset.credit}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-effects card">
        <div className="bg-effects-head">
          <div>
            <span className="eyebrow">Fine tune</span>
            <h2><WandSparkles size={17} /> Look & feel</h2>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => { patch({ opacity: 100, dim: 42, blur: 2 }); notify('Effects reset'); }}><RotateCcw size={14} /> Reset</button>
        </div>
        <div className="bg-sliders">
          <label>
            <span>Visibility <b>{bg.opacity}%</b></span>
            <input type="range" min="0" max="100" value={bg.opacity} onChange={(e) => patch({ opacity: Number(e.target.value) })} />
          </label>
          <label>
            <span>Text contrast <b>{bg.dim}%</b></span>
            <input type="range" min="0" max="80" value={bg.dim} onChange={(e) => patch({ dim: Number(e.target.value) })} />
          </label>
          <label>
            <span>Softness <b>{bg.blur}px</b></span>
            <input type="range" min="0" max="12" value={bg.blur} onChange={(e) => patch({ blur: Number(e.target.value) })} />
          </label>
        </div>
        <p className="small faint"><Info size={13} /> Lower visibility or raise text contrast if cards become hard to read.</p>
      </section>

      <div className="bg-note"><Sparkles size={14} /> Photographs are free-to-use Unsplash images saved locally. Japanese patterns are original artwork. <Trash2 size={13} /> Removing a background never touches your study data.</div>

      {pending && <ImageCropper src={pending} onCancel={() => setPending(null)} onSave={applyCrop} />}
    </div>
  );
}

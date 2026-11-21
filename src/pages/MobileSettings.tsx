import { useRef, useState } from 'react';
import {
  ChevronRight, Download, Flame, Image as ImageIcon, Moon, RotateCcw, ShieldCheck,
  Sparkles, Sun, Trash2, Trophy, Upload, Zap,
} from 'lucide-react';
import { BrandMark } from '../components/Brand';
import { useApp } from '../store';
import type { PageProps } from '../pageTypes';

type ToggleKey = 'sound' | 'reduceMotion' | 'autoAdvance' | 'showFurigana';

/** Native-feeling grouped settings screen for the mobile shell. */
export default function MobileSettings({ notify, navigate }: PageProps) {
  const { state, update, setTheme, exportData, importData, resetData } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirm, setConfirm] = useState(false);

  const toggle = (key: ToggleKey) =>
    update((s) => ({ ...s, settings: { ...s.settings, [key]: !s.settings[key] } }));

  const Toggle = ({ label, sub, setting }: { label: string; sub: string; setting: ToggleKey }) => (
    <div className="ms-row">
      <div className="ms-copy"><strong>{label}</strong><span>{sub}</span></div>
      <button
        className={`ms-switch ${state.settings[setting] ? 'on' : ''}`}
        role="switch"
        aria-checked={state.settings[setting]}
        aria-label={label}
        onClick={() => toggle(setting)}
      ><i /></button>
    </div>
  );

  return (
    <div className="m-settings">
      <section className="ms-profile">
        <div className="ms-avatar"><BrandMark size={34} /></div>
        <div className="ms-profile-copy">
          <span className="m-eyebrow">Learner profile</span>
          <input
            value={state.name}
            onChange={(e) => update((s) => ({ ...s, name: e.target.value }))}
            aria-label="Display name"
            placeholder="Your name"
            maxLength={24}
          />
          <div className="ms-profile-meta">
            <span><Trophy size={12} /> Level {state.level}</span>
            <span><Sparkles size={12} /> {state.xp.toLocaleString()} XP</span>
            <span><Flame size={12} /> {state.streak} days</span>
          </div>
        </div>
      </section>

      <section className="ms-group">
        <h2>Study</h2>
        <div className="ms-group-card">
          <div className="ms-row ms-stepper-row">
            <div className="ms-copy"><strong>Daily goal</strong><span>Minutes of focused study each day</span></div>
            <div className="ms-stepper">
              <button aria-label="Decrease daily goal" onClick={() => update((s) => ({ ...s, dailyGoal: Math.max(5, s.dailyGoal - 5) }))}>−</button>
              <span>{state.dailyGoal}</span>
              <button aria-label="Increase daily goal" onClick={() => update((s) => ({ ...s, dailyGoal: Math.min(240, s.dailyGoal + 5) }))}>+</button>
            </div>
          </div>
          <div className="ms-row">
            <div className="ms-copy"><strong>Target level</strong><span>Drills and resources are tuned to this level</span></div>
            <div className="ms-select-wrap">
              <select value={state.selectedLevel} onChange={(e) => update((s) => ({ ...s, selectedLevel: e.target.value as typeof s.selectedLevel }))} aria-label="Target level">
                <option>N5</option><option>N4</option><option>N3</option><option>N2</option><option>N1</option>
              </select>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </section>

      <section className="ms-group">
        <h2>Appearance</h2>
        <div className="ms-group-card">
          <div className="ms-row ms-theme-row">
            <div className="ms-copy"><strong>Theme</strong><span>Choose the look that suits your eyes</span></div>
            <div className="ms-segment">
              <button className={state.theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')} aria-label="Dark theme"><Moon size={16} /></button>
              <button className={state.theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')} aria-label="Light theme"><Sun size={16} /></button>
            </div>
          </div>
          <Toggle label="Reduce motion" sub="Minimize animations and transitions" setting="reduceMotion" />
          <button className="ms-row ms-action-row" onClick={() => navigate('backgrounds')}>
            <span className="ms-action-icon"><ImageIcon size={17} /></span>
            <div className="ms-copy"><strong>Background</strong><span>Scenes, photos, and custom crops</span></div>
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <section className="ms-group">
        <h2>Experience</h2>
        <div className="ms-group-card">
          <Toggle label="Sound effects" sub="Audio for kana, words, and examples" setting="sound" />
          <Toggle label="Auto advance" sub="Move to the next review automatically" setting="autoAdvance" />
          <Toggle label="Show furigana" sub="Display readings above graded text" setting="showFurigana" />
        </div>
      </section>

      <section className="ms-group">
        <h2>Your data</h2>
        <div className="ms-group-card">
          <button className="ms-row ms-action-row" onClick={() => { exportData(); notify('Backup downloaded'); }}>
            <span className="ms-action-icon"><Download size={17} /></span>
            <div className="ms-copy"><strong>Export backup</strong><span>Save a JSON copy of all progress</span></div>
            <ChevronRight size={16} />
          </button>
          <button className="ms-row ms-action-row" onClick={() => fileRef.current?.click()}>
            <span className="ms-action-icon"><Upload size={17} /></span>
            <div className="ms-copy"><strong>Import backup</strong><span>Restore progress from a JSON file</span></div>
            <ChevronRight size={16} />
          </button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try { await importData(file); notify('Backup imported'); } catch { notify('Invalid backup file'); }
            e.target.value = '';
          }} />
          <button className="ms-row ms-action-row danger" onClick={() => setConfirm(true)}>
            <span className="ms-action-icon"><Trash2 size={17} /></span>
            <div className="ms-copy"><strong>Reset app</strong><span>Clear cards, progress, and preferences</span></div>
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <div className="ms-summary">
        <span>{state.srs.length} cards</span>
        <span>{state.activity.length} activities</span>
        <span>{state.completedPhases.length} phases</span>
        <span>{state.favorites.length} saved</span>
      </div>

      <div className="ms-footnote">
        <ShieldCheck size={15} />
        <span>Local-first — nothing leaves this device unless you export a backup.</span>
      </div>

      {confirm && (
        <div className="m-sheet-backdrop" onMouseDown={() => setConfirm(false)}>
          <div className="m-sheet ms-confirm" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label="Reset all data">
            <div className="m-sheet-handle" />
            <div className="ms-confirm-icon"><RotateCcw size={22} /></div>
            <h2>Reset all local data?</h2>
            <p>This removes your cards, progress, notes, phase completions, and preferences from this browser. It cannot be undone unless you exported a backup.</p>
            <div className="ms-confirm-actions">
              <button onClick={() => setConfirm(false)}>Cancel</button>
              <button className="danger" onClick={() => { resetData(); setConfirm(false); notify('App reset'); }}><Trash2 size={15} /> Reset everything</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

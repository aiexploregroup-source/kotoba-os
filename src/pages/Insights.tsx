import { useMemo, useRef, useState } from 'react';
import { Activity as ActivityIcon, Check, Download, Flame, Image as ImageIcon, Moon, Plus, RotateCcw, Sun, Target, Trash2, Trophy, Upload, Zap } from 'lucide-react';
import { Button, Card, Modal, ProgressBar, ProgressRing, SectionHeader, StatCard } from '../components';
import { useApp } from '../store';
import type { PageProps } from '../pageTypes';

interface PlannerTask { id: string; label: string; minutes: number; done: boolean; }

const defaultTasks: PlannerTask[] = [
  { id: 'p1', label: 'SRS reviews', minutes: 15, done: false },
  { id: 'p2', label: 'Grammar or lesson', minutes: 20, done: false },
  { id: 'p3', label: 'Graded reading', minutes: 10, done: false },
  { id: 'p4', label: 'Speaking / shadowing', minutes: 10, done: true },
];

function LineChart({ values, labels }: { values: number[]; labels: string[] }) {
  const width = 720;
  const height = 220;
  const pad = 28;
  const max = Math.max(1, ...values);
  const points = values.map((value, i) => {
    const x = pad + (i / Math.max(1, values.length - 1)) * (width - pad * 2);
    const y = height - pad - (value / max) * (height - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  const last = points.split(' ').at(-1)?.split(',').map(Number) ?? [0, 0];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="line-chart" preserveAspectRatio="none">
      <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" /><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" /></linearGradient></defs>
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} className="chart-axis" />
      <polygon points={`${pad},${height - pad} ${points} ${width - pad},${height - pad}`} fill="url(#chartFill)" />
      <polyline points={points} className="chart-line" />
      <circle cx={last[0]} cy={last[1]} r="5" className="chart-dot" />
      <text x={pad} y={height - 6} className="chart-label">{labels[0]}</text>
      <text x={width - pad} y={height - 6} textAnchor="end" className="chart-label">{labels.at(-1)}</text>
    </svg>
  );
}

export function Progress({ navigate }: PageProps) {
  const { state, todayStats } = useApp();
  const chartData = state.stats.slice(-14);
  const totalXp = state.stats.reduce((sum, s) => sum + s.xp, 0);
  const totalReviews = state.stats.reduce((sum, s) => sum + s.reviews, 0);
  const totalMinutes = state.stats.reduce((sum, s) => sum + s.minutes, 0);

  const heat = useMemo(() => {
    const days = state.stats.slice(-35);
    return days.map((d) => ({ date: d.date, level: Math.min(4, Math.floor(d.reviews / 5)) }));
  }, [state.stats]);

  return (
    <div className="page">
      <SectionHeader eyebrow="Analytics" title="Progress Studio" subtitle="See consistency, volume, and skill balance at a glance." action={<Button variant="secondary" size="sm" onClick={() => navigate('planner')}><Target size={15} /> Edit plan</Button>} />
      <div className="stat-grid four">
        <StatCard icon={<Zap size={20} />} label="Total XP" value={totalXp.toLocaleString()} delta="All recorded sessions" tone="violet" />
        <StatCard icon={<ActivityIcon size={20} />} label="Total reviews" value={totalReviews.toLocaleString()} delta="Across all card types" tone="cyan" />
        <StatCard icon={<Flame size={20} />} label="Focus time" value={`${Math.round(totalMinutes / 60)}h`} delta={`${totalMinutes} minutes`} tone="rose" />
        <StatCard icon={<Trophy size={20} />} label="Current level" value={state.level} delta={`${state.xp.toLocaleString()} lifetime XP`} tone="amber" />
      </div>
      <div className="progress-grid">
        <Card className="span-8">
          <SectionHeader eyebrow="Last 14 days" title="XP momentum" subtitle="Daily experience earned." />
          <LineChart values={chartData.map((d) => d.xp)} labels={chartData.map((d) => d.date.slice(5))} />
        </Card>
        <Card className="span-4">
          <SectionHeader eyebrow="Today" title="Goal status" />
          <div className="goal-ring"><ProgressRing value={todayStats.minutes} max={state.dailyGoal} size={150} label={`${todayStats.minutes}m`} sublabel={`/ ${state.dailyGoal}m`} /></div>
          <div className="goal-facts"><div><span>Reviews</span><strong>{todayStats.reviews}</strong></div><div><span>XP</span><strong>+{todayStats.xp}</strong></div></div>
        </Card>
      </div>
      <div className="progress-grid">
        <Card className="span-7">
          <SectionHeader eyebrow="Consistency" title="Study heatmap" subtitle="Each square is one day; brighter means more reviews." />
          <div className="heatmap">{heat.map((d) => <div key={d.date} className={`heat-cell heat-${d.level}`} title={`${d.date}: level ${d.level}`} />)}</div>
        </Card>
        <Card className="span-5">
          <SectionHeader eyebrow="Skill radar" title="Layer balance" />
          <div className="skill-list">
            {[['Kana', 82, 'violet'], ['Kanji', 48, 'cyan'], ['Grammar', 61, 'amber'], ['Listening', 42, 'green'], ['Speaking', 27, 'rose']].map(([label, value, tone]) => <ProgressBar key={label as string} label={label as string} value={value as number} tone={tone as string} />)}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function Planner({ notify }: PageProps) {
  const { state, setNote } = useApp();
  const stored = useMemo(() => {
    try {
      const parsed: unknown = JSON.parse(state.notes['planner-tasks'] ?? '');
      return Array.isArray(parsed) ? (parsed as PlannerTask[]) : defaultTasks;
    } catch { return defaultTasks; }
  }, [state.notes]);
  const tasks = stored.length ? stored : defaultTasks;
  const [newTask, setNewTask] = useState('');
  const [modal, setModal] = useState(false);
  const total = tasks.reduce((sum, t) => sum + t.minutes, 0);
  const done = tasks.filter((t) => t.done).reduce((sum, t) => sum + t.minutes, 0);
  const save = (next: PlannerTask[]) => setNote('planner-tasks', JSON.stringify(next));

  const milestones = [
    { title: 'Finish kana chart', detail: '46 hiragana + 46 katakana', done: true },
    { title: 'First 100 words', detail: 'Recognize without translation', done: true },
    { title: 'N5 grammar core', detail: '50 basic points with examples', done: false },
    { title: 'First 300 kanji', detail: 'Recognition + basic readings', done: false },
    { title: 'First solo conversation', detail: 'Describe your day for 10 minutes', done: false },
  ];

  return (
    <div className="page">
      <SectionHeader eyebrow="Plan" title="Study Planner" subtitle="A simple weekly system: review, learn, read, speak." action={<Button onClick={() => setModal(true)}><Plus size={16} /> Add task</Button>} />
      <div className="planner-layout">
        <Card>
          <SectionHeader eyebrow="Today" title="Your task list" subtitle={`${done} of ${total} focused minutes complete.`} />
          <ProgressBar value={done} max={Math.max(1, total)} tone="green" />
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className={`task-row ${task.done ? 'done' : ''}`}>
                <button className="task-check" onClick={() => save(tasks.map((t) => t.id === task.id ? { ...t, done: !t.done } : t))}>{task.done && <Check size={14} />}</button>
                <div><strong>{task.label}</strong><span>{task.minutes} minutes</span></div>
                <button className="icon-btn" onClick={() => save(tasks.filter((t) => t.id !== task.id))}><Trash2 size={15} /></button>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader eyebrow="Roadmap" title="Milestones" subtitle="Measurable checkpoints, not vague wishes." />
          <div className="milestone-list">
            {milestones.map((m) => <div key={m.title} className={`milestone ${m.done ? 'done' : ''}`}><div className="milestone-dot">{m.done ? <Check size={13} /> : ''}</div><div><strong>{m.title}</strong><span>{m.detail}</span></div></div>)}
          </div>
          <div className="coach-note"><Zap size={18} /><div><strong>Weekly rule</strong><span>Five focused days beat one heroic day. Protect the streak, but never force a session when exhausted.</span></div></div>
        </Card>
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title="Add a study task">
        <div className="form-grid"><label className="full">Task name<input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="e.g. Review N5 particles" /></label></div>
        <div className="row-actions end"><Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button><Button onClick={() => { if (!newTask.trim()) return; save([...tasks, { id: `task-${Date.now()}`, label: newTask.trim(), minutes: 15, done: false }]); setNewTask(''); setModal(false); notify('Task added'); }}>Add task</Button></div>
      </Modal>
    </div>
  );
}

export function Settings({ notify, navigate }: PageProps) {
  const { state, update, setTheme, exportData, importData, resetData } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="page settings-page">
      <SectionHeader eyebrow="Preferences" title="Settings" subtitle="Shape the app around how you study. All data stays on this device unless you export it." />
      <div className="settings-grid">
        <Card>
          <SectionHeader eyebrow="Profile" title="Learner identity" />
          <div className="form-grid">
            <label className="full">Display name<input value={state.name} onChange={(e) => update((s) => ({ ...s, name: e.target.value }))} /></label>
            <label>Daily goal (minutes)<input type="number" min="5" max="240" value={state.dailyGoal} onChange={(e) => update((s) => ({ ...s, dailyGoal: Math.max(5, Number(e.target.value) || 30) }))} /></label>
            <label>Target level<select value={state.selectedLevel} onChange={(e) => update((s) => ({ ...s, selectedLevel: e.target.value as typeof s.selectedLevel }))}><option>N5</option><option>N4</option><option>N3</option><option>N2</option><option>N1</option></select></label>
          </div>
        </Card>
        <Card>
          <SectionHeader eyebrow="Appearance" title="Theme & motion" />
          <div className="theme-switch">
            <button className={state.theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}><Moon size={18} /> Dark</button>
            <button className={state.theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}><Sun size={18} /> Light</button>
          </div>
          <Button variant="secondary" onClick={() => navigate('backgrounds')}><ImageIcon size={15} /> Change background</Button>
          <div className="toggle-list">
            {[
              ['sound', 'Sound effects', 'Play audio for kana, words, and examples'],
              ['reduceMotion', 'Reduce motion', 'Minimize transitions and animations'],
              ['autoAdvance', 'Auto advance', 'Move to the next review item automatically'],
              ['showFurigana', 'Show furigana', 'Display readings above graded text'],
            ].map(([key, title, sub]) => (
              <label key={key} className="toggle-row"><div><strong>{title}</strong><span>{sub}</span></div><input type="checkbox" checked={state.settings[key as keyof typeof state.settings] as boolean} onChange={(e) => update((s) => ({ ...s, settings: { ...s.settings, [key]: e.target.checked } }))} /><span className="switch" /></label>
            ))}
          </div>
        </Card>
        <Card className="span-2">
          <SectionHeader eyebrow="Data" title="Backup & reset" subtitle="Your progress is stored in this browser. Export a backup before clearing data." />
          <div className="row-actions">
            <Button onClick={() => { exportData(); notify('Backup downloaded'); }}><Download size={16} /> Export data</Button>
            <Button variant="secondary" onClick={() => fileRef.current?.click()}><Upload size={16} /> Import backup</Button>
            <input ref={fileRef} type="file" accept="application/json" hidden onChange={async (e) => { const file = e.target.files?.[0]; if (!file) return; try { await importData(file); notify('Backup imported'); } catch { notify('Invalid backup file'); } }} />
            <Button variant="danger" onClick={() => setConfirm(true)}><Trash2 size={16} /> Reset app</Button>
          </div>
          <div className="data-summary"><span>{state.srs.length} SRS cards</span><span>{state.activity.length} activities</span><span>{state.completedPhases.length} completed phases</span><span>{state.favorites.length} saved resources</span></div>
        </Card>
      </div>
      <Modal open={confirm} onClose={() => setConfirm(false)} title="Reset all local data?">
        <p>This will remove your cards, progress, notes, phase completions, and preferences from this browser. This cannot be undone unless you exported a backup.</p>
        <div className="row-actions end"><Button variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button><Button variant="danger" onClick={() => { resetData(); setConfirm(false); notify('App reset'); }}><RotateCcw size={15} /> Reset everything</Button></div>
      </Modal>
    </div>
  );
}

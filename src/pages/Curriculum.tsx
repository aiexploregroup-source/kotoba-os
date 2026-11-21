import { useMemo, useState } from 'react';
import {
  ArrowRight, BarChart3, BookOpen, Check, Clock3, Compass, GraduationCap, Layers3, ShieldCheck,
} from 'lucide-react';
import { Badge, Button, Card, Pill, ProgressBar, ProgressRing, SectionHeader, StatCard } from '../components';
import { grammar, kanji, lessons, readings, vocab } from '../data/content';
import { selfStudyPrinciples, studyPhases } from '../data/curriculum';
import type { PageProps } from '../pageTypes';
import { useApp } from '../store';
import type { Page, StudyPhase } from '../types';

type Tone = 'violet' | 'cyan' | 'amber' | 'green' | 'rose' | 'slate';
type PhaseFilter = 'All' | StudyPhase['level'];

interface LedgerRowData {
  label: string;
  level: string;
  tone: Tone;
}

const drillLabels: Partial<Record<Page, string>> = {
  kana: 'Kana Lab',
  learn: 'Learn',
  kanji: 'Kanji Lab',
  vocab: 'Vocabulary Vault',
  grammar: 'Grammar Studio',
  listening: 'Listening & Reading',
  jlpt: 'JLPT Command Center',
};

const kanjiLevels: LedgerRowData[] = [
  { label: 'N5', level: 'N5', tone: 'cyan' },
  { label: 'N4', level: 'N4', tone: 'violet' },
  { label: 'N3', level: 'N3', tone: 'amber' },
  { label: 'N2', level: 'N2', tone: 'green' },
  { label: 'N1', level: 'N1', tone: 'rose' },
  { label: 'Jōyō', level: 'Joyo', tone: 'violet' },
];

const grammarLevels: LedgerRowData[] = [
  { label: 'N5', level: 'N5', tone: 'cyan' },
  { label: 'N4', level: 'N4', tone: 'violet' },
];

const vocabLevels: LedgerRowData[] = [
  { label: 'N5', level: 'N5', tone: 'cyan' },
  { label: 'N4', level: 'N4', tone: 'violet' },
];

const loopBlocks: { time: string; title: string; detail: string; tone: Tone }[] = [
  { time: '0–5 min', title: 'SRS sweep', detail: 'Clear every due card before adding anything new; lapses first, then fresh reviews.', tone: 'violet' },
  { time: '5–15 min', title: 'New input', detail: 'One grammar point or eight kanji, each with meaning, reading, and one original example.', tone: 'cyan' },
  { time: '15–30 min', title: 'Production', detail: 'Write five sentences and say them aloud, self-correcting particles, verb forms, and pitch.', tone: 'amber' },
  { time: '30–40 min', title: 'Reading & listening', detail: 'One graded passage or audio clip: gist pass, detail pass, then a short shadowing pass.', tone: 'green' },
  { time: '40–45 min', title: 'Recall close', detail: 'Blind-recall the day’s items, note weak points, and log one line in your study record.', tone: 'rose' },
];

const countAtLevel = (items: readonly { level: string }[], level: string) =>
  items.filter((item) => item.level === level).length;

const phaseTone = (level: StudyPhase['level']): Tone =>
  level === 'Foundation' ? 'amber' : level === 'N5' ? 'cyan' : 'violet';

function LedgerRow({ label, count, total, tone }: { label: string; count: number; total: number; tone: Tone }) {
  return (
    <div className="ledger-row">
      <span>{label}</span>
      <ProgressBar value={count} max={Math.max(1, total)} tone={tone} />
      <strong>{count.toLocaleString()}</strong>
    </div>
  );
}

export default function Curriculum({ notify, navigate }: PageProps) {
  const { state, update } = useApp();
  const [filter, setFilter] = useState<PhaseFilter>('All');

  const completed = useMemo(() => new Set(state.completedPhases), [state.completedPhases]);
  const completedCount = studyPhases.filter((phase) => completed.has(phase.id)).length;
  const visiblePhases = useMemo(
    () => (filter === 'All' ? studyPhases : studyPhases.filter((phase) => phase.level === filter)),
    [filter],
  );

  const ledger = useMemo(() => ({
    kanji: kanjiLevels.map((row) => ({ ...row, count: countAtLevel(kanji, row.level) })),
    grammar: grammarLevels.map((row) => ({ ...row, count: countAtLevel(grammar, row.level) })),
    vocab: vocabLevels.map((row) => ({ ...row, count: countAtLevel(vocab, row.level) })),
  }), []);

  const togglePhase = (phase: StudyPhase) => {
    const wasDone = completed.has(phase.id);
    update((current) => ({
      ...current,
      completedPhases: wasDone
        ? current.completedPhases.filter((id) => id !== phase.id)
        : Array.from(new Set([...current.completedPhases, phase.id])),
    }));
    notify(wasDone
      ? `Phase ${String(phase.number).padStart(2, '0')} reopened`
      : `Phase ${String(phase.number).padStart(2, '0')} marked complete`);
  };

  const checkpointKey = (phaseId: string, index: number) => `${phaseId}::checkpoint:${index}`;

  const toggleCheckpoint = (phase: StudyPhase, index: number) => {
    const key = checkpointKey(phase.id, index);
    const wasDone = completed.has(key);
    update((current) => ({
      ...current,
      completedPhases: wasDone
        ? current.completedPhases.filter((id) => id !== key)
        : Array.from(new Set([...current.completedPhases, key])),
    }));
  };

  return (
    <div className="page curriculum-page">
      <Card className="hero curriculum-hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="eyebrow">Self-study syllabus · N5 → N4</div>
          <h1>Twenty-two weeks.<br />One complete system.</h1>
          <p>
            Eight focused phases take you from your first kana to timed N4 performance using only the lessons,
            drills, and reference data already inside Kotoba OS. No scheduling, no subscriptions — just a
            repeatable daily loop you can verify yourself.
          </p>
          <div className="hero-chips">
            <span><Clock3 size={13} /> 15–50 min/day</span>
            <span><Layers3 size={13} /> {studyPhases.length} structured phases</span>
            <span><ShieldCheck size={13} /> Offline & local-first</span>
          </div>
          <div className="hero-actions">
            <Button onClick={() => navigate(studyPhases[0]?.drill ?? 'kana')}>Start phase 01 <ArrowRight size={15} /></Button>
            <Button variant="secondary" onClick={() => navigate('review')}>Clear reviews</Button>
          </div>
        </div>
        <div className="hero-ring">
          <ProgressRing
            value={completedCount}
            max={studyPhases.length}
            size={118}
            label={`${completedCount}/${studyPhases.length}`}
            sublabel="phases"
          />
          <ProgressBar value={completedCount} max={studyPhases.length} tone="violet" label="Syllabus completion" />
          <div className="curriculum-hero-meta">
            <small className="muted">{studyPhases.length - completedCount} phases remaining</small>
            <Badge tone={completedCount === studyPhases.length ? 'green' : 'slate'}>
              {completedCount === studyPhases.length ? 'Syllabus cleared' : 'In progress'}
            </Badge>
          </div>
        </div>
      </Card>

      <div className="curriculum-stats">
        <StatCard icon={<Layers3 size={20} />} label="Study phases" value={studyPhases.length} delta="Foundation → N4" tone="violet" />
        <StatCard icon={<BookOpen size={20} />} label="Jōyō kanji" value={kanji.length.toLocaleString()} delta="Official character set" tone="cyan" />
        <StatCard icon={<GraduationCap size={20} />} label="Grammar points" value={grammar.length} delta="Explained locally" tone="amber" />
        <StatCard icon={<BarChart3 size={20} />} label="Vocabulary" value={vocab.length} delta="Tagged by level" tone="green" />
        <StatCard icon={<Compass size={20} />} label="Lessons" value={lessons.length} delta="Guided practice" tone="rose" />
        <StatCard icon={<BookOpen size={20} />} label="Readings" value={readings.length} delta="Graded texts" tone="violet" />
      </div>

      <div>
        <SectionHeader
          eyebrow="Roadmap"
          title="The eight-phase roadmap"
          subtitle="Every phase is self-contained: learn, drill, recall, read, speak, then verify. Click any checkpoint to lock in the phase."
          action={<Badge tone="violet">{visiblePhases.length} / {studyPhases.length} shown</Badge>}
        />
        <div className="pill-row curriculum-filters">
          {(['All', 'Foundation', 'N5', 'N4'] as PhaseFilter[]).map((level) => (
            <Pill key={level} active={filter === level} onClick={() => setFilter(level)}>
              {level}<span className="faint"> · {level === 'All' ? studyPhases.length : studyPhases.filter((phase) => phase.level === level).length}</span>
            </Pill>
          ))}
        </div>
        <div className="phase-roadmap">
          {visiblePhases.map((phase) => {
            const done = completed.has(phase.id);
            const passedCheckpoints = phase.checkpoints.filter((_, index) => completed.has(checkpointKey(phase.id, index))).length;
            const number = String(phase.number).padStart(2, '0');
            return (
              <Card key={phase.id} className={`phase-card ${done ? 'done' : ''}`}>
                <div className="phase-head">
                  <div className="phase-number">{number}</div>
                  <div className="phase-heading">
                    <div className="row">
                      <Badge tone={phaseTone(phase.level)}>{phase.level}</Badge>
                      <span className="small faint">{phase.duration}</span>
                      {done && <Badge tone="green">Complete</Badge>}
                    </div>
                    <h3>{phase.title}</h3>
                    <p className="phase-goal">{phase.goal}</p>
                  </div>
                  <button
                    type="button"
                    className={`phase-toggle ${done ? 'done' : ''}`}
                    onClick={() => togglePhase(phase)}
                    aria-pressed={done}
                    aria-label={done ? `Reopen phase ${number}` : `Complete phase ${number}`}
                    title={done ? 'Mark phase incomplete' : 'Mark phase complete'}
                  >
                    <Check size={18} />
                  </button>
                </div>
                <div className="phase-body">
                  <div className="phase-column">
                    <div className="phase-block-title">Daily loop <span>{phase.dailyLoop.length} steps</span></div>
                    <ol className="phase-list">
                      {phase.dailyLoop.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                  </div>
                  <div className="phase-column">
                    <div className="phase-block-title">Topics & targets <span>{phase.topics.length} blocks</span></div>
                    <div className="phase-topics">
                      {phase.topics.map((topic) => (
                        <div key={topic.title} className="phase-topic">
                          <div className="spread">
                            <strong>{topic.title}</strong>
                            <span className="tag">{topic.target}</span>
                          </div>
                          <p>{topic.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="phase-column">
                    <div className="phase-block-title">Checkpoints <span>{passedCheckpoints} / {phase.checkpoints.length} passed</span></div>
                    <div className="phase-checkpoints">
                      {phase.checkpoints.map((checkpoint, index) => {
                        const passed = completed.has(checkpointKey(phase.id, index));
                        return (
                          <button
                            key={checkpoint}
                            type="button"
                            className={`phase-checkpoint ${passed ? 'done' : ''}`}
                            onClick={() => toggleCheckpoint(phase, index)}
                            aria-pressed={passed}
                          >
                            <span className="phase-check-box">{passed && <Check size={12} />}</span>
                            <span>{checkpoint}</span>
                          </button>
                        );
                      })}
                    </div>
                    <Button variant={done ? 'secondary' : 'cyan'} size="sm" className="phase-drill" onClick={() => navigate(phase.drill)}>
                      Open {drillLabels[phase.drill] ?? phase.drill} <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <SectionHeader
          eyebrow="Method"
          title="Self-study rules"
          subtitle="Six habits that keep every phase honest, repeatable, and entirely self-directed."
          action={<Badge tone="slate">{selfStudyPrinciples.length} rules</Badge>}
        />
        <div className="principle-grid">
          {selfStudyPrinciples.map((principle, index) => (
            <Card key={principle.title} className="principle-card">
              <span className="principle-index">RULE {String(index + 1).padStart(2, '0')}</span>
              <strong>{principle.title}</strong>
              <p>{principle.detail}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader
          eyebrow="Inventory"
          title="Coverage ledger"
          subtitle="Live counts from the local catalogue. Every bar is computed from the data bundled with this app."
          action={<Badge tone="slate"><ShieldCheck size={12} /> Local data</Badge>}
        />
        <div className="grid grid-3 curriculum-ledger">
          <Card>
            <div className="ledger-head"><strong>Kanji by level</strong><span>{kanji.length.toLocaleString()} total</span></div>
            {ledger.kanji.map((row) => (
              <LedgerRow key={row.label} label={row.label} count={row.count} total={kanji.length} tone={row.tone} />
            ))}
            <div className="ledger-note">Share of the full official Jōyō set stored on this device.</div>
          </Card>
          <Card>
            <div className="ledger-head"><strong>Grammar by level</strong><span>{grammar.length} points</span></div>
            {ledger.grammar.map((row) => (
              <LedgerRow key={row.label} label={row.label} count={row.count} total={grammar.length} tone={row.tone} />
            ))}
            <div className="ledger-note">Additional advanced points sit outside the N5/N4 core.</div>
          </Card>
          <Card>
            <div className="ledger-head"><strong>Vocabulary by level</strong><span>{vocab.length} entries</span></div>
            {ledger.vocab.map((row) => (
              <LedgerRow key={row.label} label={row.label} count={row.count} total={vocab.length} tone={row.tone} />
            ))}
            <div className="ledger-note">Mine new words from readings and save them to your SRS queue.</div>
          </Card>
        </div>
      </div>

      <div>
        <SectionHeader
          eyebrow="Daily rhythm"
          title="Daily operating loop"
          subtitle="A repeatable 45-minute session. Extend the middle blocks as the phases get longer."
          action={<Badge tone="cyan"><Clock3 size={12} /> 45 min</Badge>}
        />
        <Card className="loop-card">
          <div className="loop-timetable">
            {loopBlocks.map((block) => (
              <div key={block.time} className="loop-slot">
                <span className="loop-time">{block.time}</span>
                <div>
                  <strong className="loop-title">{block.title}</strong>
                  <span className="loop-detail">{block.detail}</span>
                </div>
                <span className={`loop-accent tone-bg-${block.tone}`} />
              </div>
            ))}
          </div>
          <div className="callout cyan">
            <strong>Short on time?</strong> Keep the SRS sweep and the recall close, then pick one middle block.
            Consistency beats length — the phases scale the same loop from 15 to 50 minutes.
          </div>
        </Card>
      </div>
    </div>
  );
}

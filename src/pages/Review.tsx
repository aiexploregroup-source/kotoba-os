import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Clock3,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Volume2,
  X,
  Zap,
} from 'lucide-react';
import { Badge, Button, Card, EmptyState, ProgressBar, SectionHeader } from '../components';
import { useApp } from '../store';
import { stageName, stageTone, usePath, type PathItem } from '../lib/pathStore';
import { speak } from '../speech';
import { cn, matchesAnswer, shuffle } from '../lib/utils';
import type { SrsItem } from '../types';
import type { PageProps } from '../pageTypes';

type Mode = 'path' | 'library';
type CardType =
  | { key: string; id: string; item: PathItem; field: 'meaning' | 'reading'; accepted: string[]; prompt: string; source: 'path' }
  | { key: string; id: string; item: SrsItem; field: 'meaning'; accepted: string[]; prompt: string; source: 'library' };

const splitAnswers = (value: string) =>
  value.split(/[,/;·]|\s+-\s+/).map((part) => part.trim()).filter(Boolean);

export default function Review({ notify, navigate }: PageProps) {
  const { reviewsDue, gradeSrs, logActivity } = useApp();
  const path = usePath();
  const [mode, setMode] = useState<Mode>('path');
  const [queue, setQueue] = useState<CardType[] | null>(null);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const libraryDue = useMemo<SrsItem[]>(() => shuffle(reviewsDue), [reviewsDue]);
  const totalDue = path.due.length + libraryDue.length;

  const buildQueue = (selected: Mode) => {
    if (selected === 'path') {
      const cards: CardType[] = [];
      for (const item of path.due) {
        cards.push({
          key: `${item.id}-meaning`,
          id: item.id,
          item,
          field: 'meaning',
          accepted: splitAnswers(item.meaning),
          prompt: item.kind === 'radical' ? 'What is this radical called?' : 'What does this mean?',
          source: 'path',
        });
        if (item.kind !== 'radical' && item.reading) {
          cards.push({
            key: `${item.id}-reading`,
            id: item.id,
            item,
            field: 'reading',
            accepted: splitAnswers(item.reading),
            prompt: item.kind === 'kanji' ? 'Give one reading (on or kun)' : 'How is this word read?',
            source: 'path',
          });
        }
      }
      setQueue(shuffle(cards));
    } else {
      setQueue(
        libraryDue.map((item) => ({
          key: item.id,
          id: item.id,
          item,
          field: 'meaning' as const,
          accepted: splitAnswers(item.back),
          prompt: `What does ${item.front} mean?`,
          source: 'library' as const,
        })),
      );
    }
    setIndex(0);
    setValue('');
    setRevealed(false);
    setResults([]);
  };

  const current = queue?.[index];
  const accuracy = results.length ? Math.round((results.filter(Boolean).length / results.length) * 100) : 0;

  const check = () => {
    if (!current || !value.trim()) return;
    const ok = matchesAnswer(value, current.accepted, current.field === 'reading' ? 1 : 2);
    setCorrect(ok);
    setRevealed(true);
  };

  const grade = (decision: 'again' | 'hard' | 'good' | 'easy') => {
    if (!current) return;
    const passed = decision !== 'again';
    setResults((previous) => [...previous, passed]);
    if (current.source === 'path') {
      path.answer(current.id, passed);
      logActivity('review', `Reviewed ${current.item.char} — ${current.field}`, passed ? 8 : 3);
    } else {
      gradeSrs(current.id, decision);
    }
    notify(passed ? 'Scheduled for later — nicely done' : 'No worries — you will see it again soon');
    setValue('');
    setRevealed(false);
    if (index + 1 >= (queue?.length ?? 0)) {
      setQueue([]);
    } else {
      setIndex((currentIndex) => currentIndex + 1);
    }
  };

  const restart = () => setQueue(null);

  if (queue === null) {
    return (
      <div className="stack">
        <div className="page-head">
          <div>
            <div className="eyebrow">Spaced repetition</div>
            <h1>Reviews build the memory.</h1>
            <p>Recall — not rereading — is what makes kanji stick. Answer honestly: the algorithm adapts the schedule to you.</p>
          </div>
        </div>

        <div className="grid grid-3">
          <Card className="card-accent">
            <div className="spread">
              <div className="lesson-icon tone-bg-violet"><RotateCcw size={19} /></div>
              <Badge tone={path.due.length ? 'violet' : 'slate'}>{path.due.length} due</Badge>
            </div>
            <h3 style={{ margin: '12px 0 4px', fontSize: 15 }}>Path reviews</h3>
            <p className="small muted" style={{ lineHeight: 1.6 }}>Radicals, kanji and vocabulary from your progression queue, with meaning and reading prompts.</p>
            <Button variant="primary" className="btn-block" style={{ marginTop: 16 }} disabled={!path.due.length} onClick={() => { setMode('path'); buildQueue('path'); }}>
              Start path reviews <ArrowRight size={15} />
            </Button>
          </Card>
          <Card className="card-accent" style={{ borderLeftColor: 'var(--cyan)' }}>
            <div className="spread">
              <div className="lesson-icon tone-bg-cyan"><Zap size={19} /></div>
              <Badge tone={libraryDue.length ? 'cyan' : 'slate'}>{libraryDue.length} due</Badge>
            </div>
            <h3 style={{ margin: '12px 0 4px', fontSize: 15 }}>Library reviews</h3>
            <p className="small muted" style={{ lineHeight: 1.6 }}>Cards you have added from kana, grammar, vocabulary and the wider library.</p>
            <Button variant="cyan" className="btn-block" style={{ marginTop: 16 }} disabled={!libraryDue.length} onClick={() => { setMode('library'); buildQueue('library'); }}>
              Start library reviews <ArrowRight size={15} />
            </Button>
          </Card>
          <Card>
            <div className="spread">
              <div className="lesson-icon tone-bg-amber"><Clock3 size={19} /></div>
              <Badge tone="amber">Up next</Badge>
            </div>
            <h3 style={{ margin: '12px 0 4px', fontSize: 15 }}>Queue health</h3>
            <div className="stack" style={{ gap: 10, marginTop: 14 }}>
              <div className="spread small"><span className="muted">Total due now</span><strong>{totalDue}</strong></div>
              <div className="spread small"><span className="muted">Apprentice items</span><strong>{path.counts.apprentice}</strong></div>
              <div className="spread small"><span className="muted">At Guru or above</span><strong>{path.counts.guru}</strong></div>
              <div className="spread small"><span className="muted">Lifetime accuracy</span><strong>{path.counts.accuracy}%</strong></div>
            </div>
            <Button variant="ghost" size="sm" className="btn-block" style={{ marginTop: 16 }} onClick={() => navigate('progress')}>View analytics</Button>
          </Card>
        </div>

        <Card>
          <SectionHeader eyebrow="How grading works" title="Honest answers make a smarter queue" subtitle="Each item moves through Apprentice → Guru → Master → Enlightened → Burned" />
          <div className="grid grid-4">
            {['Apprentice I–IV', 'Guru I–II', 'Master', 'Enlightened / Burned'].map((stage, index) => (
              <div className="callout" key={stage}>
                <Badge tone={(['violet', 'cyan', 'amber', 'green'] as const)[index]}>Stage {index + 1}</Badge>
                <p style={{ margin: '9px 0 0' }}>{stage}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (queue.length === 0) {
    return (
      <div className="review-stage">
        <Card className="review-done">
          <div className="big">🎉</div>
          <h2>Queue cleared</h2>
          <p>You answered {results.length} cards with {accuracy}% accuracy. Your next reviews have been scheduled.</p>
          <div className="row" style={{ justifyContent: 'center', marginTop: 22 }}>
            <Button variant="secondary" onClick={restart}><RotateCcw size={15} /> Back to overview</Button>
            <Button variant="primary" onClick={() => navigate('learn')}>Learn new items <ArrowRight size={15} /></Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!current) return null;

  const glyph = current.source === 'path' ? current.item.char : current.item.front;
  const acceptedLabel = current.accepted.slice(0, 4).join(' / ');
  const itemStage = current.source === 'path' ? path.progressFor(current.id).stage : 0;

  return (
    <div className="review-stage">
      <div className="review-progress">
        <span className="small muted">{index + 1} / {queue.length}</span>
        <ProgressBar value={index + (revealed ? 1 : 0)} max={queue.length} tone={mode === 'path' ? 'violet' : 'cyan'} />
        <Badge tone={revealed ? (correct ? 'green' : 'rose') : 'slate'}>{revealed ? (correct ? 'Correct' : 'Review again') : `${accuracy}% session`}</Badge>
      </div>

      <Card className="review-card glow" style={{ borderTop: '3px solid var(--violet)' }}>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Badge tone={stageTone(itemStage) as 'violet'}>{current.source === 'path' ? stageName(itemStage) : current.item.level}</Badge>
          <Badge tone="slate">{current.field}</Badge>
        </div>
        <div className="review-prompt" style={{ marginTop: 16 }}>{current.prompt}</div>
        <div className="review-glyph jp">{glyph}</div>
        {current.source === 'path' && current.item.reading && current.field === 'meaning' && (
          <button className="icon-btn" style={{ margin: '0 auto' }} onClick={() => speak(glyph)} aria-label="Play audio"><Volume2 size={17} /></button>
        )}
        <div className="review-sub">
          {current.source === 'path' ? (current.item.detail ?? current.item.meaning) : current.item.detail}
        </div>

        <div className="answer-input">
          <input
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter' && !revealed) check(); }}
            placeholder={current.field === 'reading' ? 'Enter the reading (romaji or kana)' : 'Type your answer…'}
            disabled={revealed}
          />
        </div>

        {!revealed ? (
          <Button variant="primary" size="lg" disabled={!value.trim()} onClick={check}><Check size={16} /> Reveal answer</Button>
        ) : (
          <>
            <div className={cn('feedback', correct ? 'good' : 'bad')}>
              <strong>{correct ? 'Correct!' : `Answer: ${acceptedLabel}`}</strong>
              {correct ? <span>Accepted: {acceptedLabel}</span> : <span>Don't worry — mistakes are where the learning happens.</span>}
              {current.source === 'path' && <div style={{ marginTop: 8 }}><Lightbulb size={13} style={{ verticalAlign: 'middle' }} /> {current.item.mnemonic}</div>}
            </div>
            {correct ? (
              <div className="grade-row">
                <button className="grade-btn hard" onClick={() => grade('hard')}>Hard<small>Short delay</small></button>
                <button className="grade-btn good" onClick={() => grade('good')}>Good<small>Next stage</small></button>
                <button className="grade-btn easy" onClick={() => grade('easy')}>Easy<small>Longer gap</small></button>
              </div>
            ) : (
              <div className="grade-row">
                <button className="grade-btn again" onClick={() => grade('again')}><X size={15} /> Again<small>15 min</small></button>
              </div>
            )}
          </>
        )}
      </Card>
      <div className="row" style={{ justifyContent: 'center', marginTop: 16 }}>
        <Button variant="ghost" size="sm" onClick={() => { setQueue(null); navigate('learn'); }}><Sparkles size={14} /> Pause and learn something new</Button>
      </div>
    </div>
  );
}

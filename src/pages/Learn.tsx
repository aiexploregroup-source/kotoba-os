import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Headphones,
  Layers,
  Lock,
  Mic,
  Play,
  RotateCcw,
  Sparkles,
  Type,
  Volume2,
} from 'lucide-react';
import { Badge, Button, Card, EmptyState, Modal, ProgressBar, SectionHeader } from '../components';
import { useApp } from '../store';
import { stageName, stageTone, usePath, type PathItem } from '../lib/pathStore';
import { lessons, pathways } from '../data/content';
import { speak, startRecognition, normalizeSpeech } from '../speech';
import { cn, normalize } from '../lib/utils';
import type { Lesson, Question } from '../types';
import type { PageProps } from '../pageTypes';

type Tab = 'path' | 'lessons' | 'foundations';

export default function Learn({ notify, navigate }: PageProps) {
  const { completeLesson } = useApp();
  const path = usePath();
  const [tab, setTab] = useState<Tab>('path');
  const [kindFilter, setKindFilter] = useState<'all' | 'radical' | 'kanji' | 'vocab'>('all');
  const [preview, setPreview] = useState<PathItem | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [transcript, setTranscript] = useState('');
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const availableByKind = useMemo(
    () => ({
      radical: path.available.filter((item) => item.kind === 'radical'),
      kanji: path.available.filter((item) => item.kind === 'kanji'),
      vocab: path.available.filter((item) => item.kind === 'vocab'),
    }),
    [path.available],
  );

  const shownItems = kindFilter === 'all' ? path.available : availableByKind[kindFilter];

  const closePreview = () => setPreview(null);

  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setQuestionIndex(0);
    setChoice(null);
    setTyped('');
    setTranscript('');
    setChecked(false);
    setResults([]);
    setFinished(false);
  };

  const currentQuestion: Question | undefined = activeLesson?.questions[questionIndex];

  const evaluate = (answer: string, accepted: string) => {
    const ok = normalize(answer) === normalize(accepted) || normalizeSpeech(answer) === normalizeSpeech(accepted);
    setResults((prev) => [...prev, ok]);
    setChecked(true);
    if (ok) notify('Correct — nice work!');
  };

  const nextQuestion = () => {
    if (!activeLesson) return;
    if (questionIndex + 1 >= activeLesson.questions.length) {
      setFinished(true);
      completeLesson(activeLesson.id, activeLesson.title, activeLesson.xp);
      notify(`Lesson complete · +${activeLesson.xp} XP`);
      return;
    }
    setQuestionIndex((index) => index + 1);
    setChoice(null);
    setTyped('');
    setTranscript('');
    setChecked(false);
  };

  return (
    <div className="stack">
      <div className="page-head">
        <div>
          <div className="eyebrow">Acquisition engine</div>
          <h1>Build the memory, then use it.</h1>
          <p>Learn radicals first, combine them into kanji, then unlock real vocabulary. Every item enters your spaced-repetition queue the moment you learn it.</p>
        </div>
        <div className="row">
          <Button variant="secondary" onClick={() => navigate('review')}><RotateCcw size={15} /> Review queue</Button>
          <Button variant="primary" onClick={() => navigate('review')}><Play size={15} /> Start session</Button>
        </div>
      </div>

      <div className="tabs">
        <button className={cn('tab', tab === 'path' && 'active')} onClick={() => setTab('path')}>Progression path</button>
        <button className={cn('tab', tab === 'lessons' && 'active')} onClick={() => setTab('lessons')}>Guided lessons</button>
        <button className={cn('tab', tab === 'foundations' && 'active')} onClick={() => setTab('foundations')}>Foundations</button>
      </div>

      {tab === 'path' && (
        <>
          <div className="path-strip">
            {([
              { kind: 'radical' as const, title: 'Radicals', icon: Layers, tone: 'violet', unlocked: true, list: availableByKind.radical, note: 'The building blocks' },
              { kind: 'kanji' as const, title: 'Kanji', icon: BookOpen, tone: 'cyan', unlocked: path.kindUnlocked('kanji'), list: availableByKind.kanji, note: 'Meaning + reading' },
              { kind: 'vocab' as const, title: 'Vocabulary', icon: Sparkles, tone: 'amber', unlocked: path.kindUnlocked('vocab'), list: availableByKind.vocab, note: 'Words in context' },
            ]).map((stage) => {
              const Icon = stage.icon;
              return (
                <Card key={stage.kind} className={cn(!stage.unlocked && 'locked')} style={!stage.unlocked ? { opacity: 0.6 } : undefined}>
                  <div className="spread">
                    <div className={cn('lesson-icon', `tone-bg-${stage.tone}`)}><Icon size={19} /></div>
                    {stage.unlocked ? <Badge tone={stage.tone as 'violet'}>{stage.list.length} ready</Badge> : <Badge tone="slate"><Lock size={11} /> Locked</Badge>}
                  </div>
                  <h4 style={{ margin: '12px 0 3px', fontSize: 14 }}>{stage.title}</h4>
                  <p className="small muted" style={{ margin: 0 }}>{stage.note}</p>
                  <div style={{ marginTop: 12 }}>
                    <ProgressBar
                      value={stage.kind === 'radical' ? path.radicalPercent : stage.kind === 'kanji' ? path.kanjiPercent : path.vocabPercent}
                      tone={stage.tone}
                    />
                  </div>
                  {!stage.unlocked && <p className="small faint" style={{ marginTop: 10, lineHeight: 1.5 }}>{stage.kind === 'kanji' ? 'Learn 10 radicals to unlock kanji.' : 'Learn 25 kanji to unlock vocabulary.'}</p>}
                </Card>
              );
            })}
          </div>

          <Card>
            <SectionHeader
              eyebrow="Lesson queue"
              title="Items ready to learn"
              subtitle="Tap an item to see its memory hook, then add it to your review queue"
              action={<Badge tone="violet">{shownItems.length} available</Badge>}
            />
            <div className="pill-row" style={{ marginBottom: 15 }}>
              {(['all', 'radical', 'kanji', 'vocab'] as const).map((kind) => (
                <button key={kind} className={cn('pill', kindFilter === kind && 'active')} onClick={() => setKindFilter(kind)}>
                  {kind === 'all' ? 'All' : kind === 'radical' ? 'Radicals' : kind === 'kanji' ? 'Kanji' : 'Vocabulary'}
                </button>
              ))}
            </div>
            {shownItems.length === 0 ? (
              <EmptyState icon={<CheckCircle2 size={24} />} title="Nothing new unlocked right now" text="Clear some reviews or learn more of the previous tier. New items appear as their prerequisites are met." />
            ) : (
              <div className="kana-grid">
                {shownItems.slice(0, 60).map((item) => (
                  <div className="kana-cell" key={item.id} onClick={() => setPreview(item)} role="button">
                    <span className="glyph jp">{item.char}</span>
                    <span className="romaji">{item.label === item.char ? item.meaning.split(',')[0] : item.label}</span>
                    <span className="example">{item.kind}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}

      {tab === 'lessons' && (
        <div className="grid grid-3">
          {lessons.map((lesson, index) => {
            const Icon = lesson.track === 'Speaking' ? Mic : lesson.track === 'Immersion' ? BookOpen : lesson.track === 'Kanji Lab' ? Type : lesson.track === 'Foundations' ? Sparkles : GraduationCap;
            const tone = lesson.track === 'Speaking' ? 'rose' : lesson.track === 'Immersion' ? 'green' : lesson.track === 'Kanji Lab' ? 'cyan' : 'violet';
            return (
              <Card className="lesson-card" key={lesson.id}>
                <div className="lesson-top">
                  <div className={cn('lesson-icon', `tone-bg-${tone}`)}><Icon size={19} /></div>
                  <Badge tone={tone as 'violet'}>{lesson.level}</Badge>
                </div>
                <h3>{lesson.title}</h3>
                <p>{lesson.subtitle}</p>
                <div className="lesson-meta">
                  <span>{lesson.minutes} min · {lesson.questions.length} questions</span>
                  <Button size="sm" variant="secondary" onClick={() => startLesson(lesson)}>
                    {index === 0 ? 'Start' : 'Open'} <ChevronRight size={13} />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {tab === 'foundations' && (
        <div className="grid grid-2">
          {pathways.map((pathway) => (
            <Card className="pathway-card" key={pathway.id}>
              <div className="orb" style={{ background: pathway.color }} />
              <div className="spread"><h3 style={{ margin: 0, fontSize: 15 }}>{pathway.title}</h3><Badge tone="violet">{pathway.levels.length} stages</Badge></div>
              <p className="small muted" style={{ margin: '8px 0 14px' }}>{pathway.subtitle}</p>
              {pathway.levels.map((level, index) => (
                <div className="check-row" key={level}><span className="badge badge-slate">{index + 1}</span><span>{level}</span></div>
              ))}
              <Button variant="secondary" size="sm" className="btn-block" style={{ marginTop: 14 }} onClick={() => navigate(pathway.id === 'pw-foundations' ? 'kana' : 'kanji')}>
                Open path <ArrowRight size={14} />
              </Button>
            </Card>
          ))}
        </div>
      )}

      {/* --- item preview modal --- */}
      <Modal open={!!preview} onClose={closePreview} title={preview ? `${preview.kind} · ${preview.char}` : ''}>
        {preview && (
          <div className="stack">
            <div className="center" style={{ padding: '4px 0' }}>
              <div className="jp" style={{ fontSize: 72, lineHeight: 1.1 }}>{preview.char}</div>
              <div className="small muted">{preview.detail}</div>
            </div>
            <div className="callout violet"><strong>Why it means this:</strong><br />{preview.mnemonic}</div>
            <div className="grid grid-2">
              <div><label>Meaning</label><div style={{ fontSize: 13 }}>{preview.meaning}</div></div>
              <div><label>Reading</label><div style={{ fontSize: 13 }}>{preview.reading || '—'}</div></div>
            </div>
            <div className="spread">
              <Badge tone={stageTone(path.progressFor(preview.id).stage) as 'violet'}>{stageName(path.progressFor(preview.id).stage)}</Badge>
              <div className="row">
                <Button variant="ghost" onClick={() => { speak(preview.char); }}><Volume2 size={15} /> Hear it</Button>
                {preview.kind === 'kanji' && (
                  <Button variant="secondary" onClick={() => {
                    try { sessionStorage.setItem('kotoba-open-kanji', preview.char); } catch { /* ignore blocked storage */ }
                    navigate('kanji');
                  }}><BookOpen size={15} /> Open in Kanji Lab</Button>
                )}
                <Button
                  variant="primary"
                  disabled={path.progressFor(preview.id).stage > 0}
                  onClick={() => {
                    path.learn(preview.id);
                    notify(`${preview.char} added to your review queue`);
                    closePreview();
                  }}
                >
                  {path.progressFor(preview.id).stage > 0 ? <><Check size={15} /> In queue</> : <><GraduationCap size={15} /> Learn it</>}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* --- lesson runner --- */}
      <Modal open={!!activeLesson} onClose={() => setActiveLesson(null)} title={activeLesson?.title ?? ''} width="720px">
        {activeLesson && !finished && currentQuestion && (
          <div className="review-stage">
            <div className="review-progress">
              <span className="small muted">{questionIndex + 1} / {activeLesson.questions.length}</span>
              <ProgressBar value={questionIndex + (checked ? 1 : 0)} max={activeLesson.questions.length} tone="violet" />
            </div>

            <Card className="review-card">
              <div className="review-prompt">{currentQuestion.type === 'listen' ? 'Listening' : currentQuestion.type === 'speak' ? 'Speaking' : currentQuestion.type === 'input' ? 'Type your answer' : 'Choose the answer'}</div>
              <div className="review-glyph jp">{currentQuestion.type === 'listen' ? '🎧' : currentQuestion.type === 'speak' ? '🎤' : currentQuestion.prompt}</div>
              {currentQuestion.type === 'choice' && (
                <div className="pill-row" style={{ justifyContent: 'center', marginTop: 18 }}>
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      className={cn('pill', choice === option && (checked ? (option === currentQuestion.answer ? 'active' : '') : 'active'))}
                      disabled={checked}
                      onClick={() => { setChoice(option); }}
                    >{option}</button>
                  ))}
                </div>
              )}
              {currentQuestion.type === 'input' && (
                <div className="answer-input">
                  <input
                    value={typed}
                    onChange={(event) => setTyped(event.target.value)}
                    onKeyDown={(event) => { if (event.key === 'Enter' && typed.trim()) evaluate(typed, currentQuestion.answer); }}
                    placeholder="Type your answer…"
                    disabled={checked}
                  />
                </div>
              )}
              {currentQuestion.type === 'speak' && (
                <div className="stack" style={{ alignItems: 'center', gap: 10, marginTop: 12 }}>
                  <p className="small muted">Target: <span className="jp">{currentQuestion.answer}</span></p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      const recorder = startRecognition((text) => setTranscript(text), () => undefined);
                      if (!recorder) notify('Speech recognition is not available in this browser');
                    }}
                  ><Mic size={15} /> Speak now</Button>
                  <input
                    className="answer-input"
                    value={transcript}
                    onChange={(event) => setTranscript(event.target.value)}
                    onKeyDown={(event) => { if (event.key === 'Enter' && transcript.trim()) evaluate(transcript, currentQuestion.answer); }}
                    placeholder="Or type what you said…"
                    disabled={checked}
                  />
                  <p className="small faint">Speech recognition is optional — typing your answer works too.</p>
                  {transcript && <div className="small">Heard: <span className="jp">{transcript}</span></div>}
                </div>
              )}
              {currentQuestion.type === 'listen' && (
                <div className="stack" style={{ alignItems: 'center', gap: 12, marginTop: 12 }}>
                  <Button variant="secondary" onClick={() => speak(currentQuestion.audio)}><Headphones size={15} /> Play audio</Button>
                  <div className="pill-row" style={{ justifyContent: 'center' }}>
                    {currentQuestion.options.map((option) => (
                      <button key={option} className={cn('pill', choice === option && 'active')} disabled={checked} onClick={() => setChoice(option)}>{option}</button>
                    ))}
                  </div>
                </div>
              )}

              {currentQuestion.note && checked && <div className="callout cyan" style={{ marginTop: 16 }}>{currentQuestion.note}</div>}

              {!checked ? (
                <div style={{ marginTop: 24 }}>
                  <Button
                    variant="primary"
                    disabled={currentQuestion.type === 'choice' || currentQuestion.type === 'listen' ? !choice : currentQuestion.type === 'input' ? !typed.trim() : !transcript}
                    onClick={() => {
                      if (currentQuestion.type === 'choice' || currentQuestion.type === 'listen') evaluate(choice ?? '', currentQuestion.answer);
                      else if (currentQuestion.type === 'input') evaluate(typed, currentQuestion.answer);
                      else evaluate(transcript, currentQuestion.answer);
                    }}
                  ><Check size={15} /> Check answer</Button>
                </div>
              ) : (
                <div style={{ marginTop: 20 }}>
                  <Button variant="primary" onClick={nextQuestion}>{questionIndex + 1 >= activeLesson.questions.length ? 'Finish lesson' : 'Next question'} <ArrowRight size={15} /></Button>
                </div>
              )}
            </Card>
          </div>
        )}
        {activeLesson && finished && (
          <div className="review-done">
            <div className="big">🏆</div>
            <h2>Lesson complete</h2>
            <p>You scored {results.filter(Boolean).length} / {results.length} and earned {activeLesson.xp} XP.</p>
            <div className="row" style={{ justifyContent: 'center', marginTop: 20 }}>
              <Button variant="secondary" onClick={() => setActiveLesson(null)}>Back to lessons</Button>
              <Button variant="primary" onClick={() => { setActiveLesson(null); navigate('review'); }}>Go to reviews <ArrowRight size={15} /></Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

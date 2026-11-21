import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, BrainCircuit, ChevronLeft, ChevronRight, Eraser, ExternalLink, Headphones, Lightbulb, Mic, PenLine, Play, Search, Sparkles, Volume2 } from 'lucide-react';
import { Badge, Button, Card, ListItem, Pill, ProgressBar, SectionHeader } from '../components';
import { grammar, hiragana, katakana, kanji, readings, vocab } from '../data/content';
import { mnemonicSearchLinks, mnemonicSources } from '../data/mnemonicSources';
import { normalizeSpeech, speak, startRecognition } from '../speech';
import { useApp } from '../store';
import type { PageProps } from '../pageTypes';
import type { KanaChar, KanjiItem, Reading } from '../types';

function TraceCanvas({ seed }: { seed: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const clear = () => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };
  const pos = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = ref.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * (canvas.width / rect.width), y: (event.clientY - rect.top) * (canvas.height / rect.height) };
  };
  const down = (event: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const ctx = ref.current?.getContext('2d');
    if (!ctx) return;
    const p = pos(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#a78bfa';
  };
  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = ref.current?.getContext('2d');
    if (!ctx) return;
    const p = pos(event);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  return (
    <div className="trace-wrap">
      <div className="trace-guide">{seed}</div>
      <canvas ref={ref} width={360} height={360} onPointerDown={down} onPointerMove={move} onPointerUp={() => { drawing.current = false; }} onPointerLeave={() => { drawing.current = false; }} />
      <Button variant="ghost" size="sm" onClick={clear}><Eraser size={14} /> Clear</Button>
    </div>
  );
}

export function Kana({ notify }: PageProps) {
  const { addSrs, state, update } = useApp();
  const [type, setType] = useState<'hiragana' | 'katakana'>('hiragana');
  const [selected, setSelected] = useState<KanaChar>(hiragana[0]);
  const [quiz, setQuiz] = useState(false);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const list = type === 'hiragana' ? hiragana : katakana;

  const chooseType = (value: 'hiragana' | 'katakana') => {
    setType(value);
    const next = value === 'hiragana' ? hiragana[0] : katakana[0];
    setSelected(next);
    speak(next.char);
  };

  const check = () => {
    if (normalizeSpeech(answer) !== selected.romaji) {
      setFeedback(`Not quite — ${selected.char} is "${selected.romaji}".`);
      return;
    }
    setFeedback(`Correct — ${selected.char} = ${selected.romaji}`);
    update((s) => ({ ...s, xp: s.xp + 4, level: Math.floor((s.xp + 4) / 500) + 1 }));
    setTimeout(() => {
      const next = list[Math.floor(Math.random() * list.length)];
      setSelected(next);
      setAnswer('');
      setFeedback('');
    }, 900);
  };

  return (
    <div className="page">
      <SectionHeader eyebrow="Scripts" title="Kana Lab" subtitle="See it, hear it, trace it, recall it." action={
        <div className="row-actions"><Pill active={!quiz} onClick={() => setQuiz(false)}>Chart</Pill><Pill active={quiz} onClick={() => setQuiz(true)}>Quick quiz</Pill></div>
      } />
      <div className="segmented">
        <button className={type === 'hiragana' ? 'active' : ''} onClick={() => chooseType('hiragana')}>ひらがな Hiragana</button>
        <button className={type === 'katakana' ? 'active' : ''} onClick={() => chooseType('katakana')}>カタカナ Katakana</button>
      </div>

      {!quiz ? (
        <div className="kana-layout">
          <Card className="kana-chart-card">
            <div className="kana-chart">
              {list.map((item) => (
                <button
                  key={`${item.char}-${item.romaji}`}
                  className={`kana-cell ${selected.char === item.char ? 'active' : ''}`}
                  onClick={() => { setSelected(item); speak(item.char); }}
                >
                  <strong>{item.char}</strong><span>{item.romaji}</span>
                </button>
              ))}
            </div>
          </Card>
          <Card className="kana-detail">
            <div className="kana-detail-top">
              <div className="kana-big">{selected.char}</div>
              <div><div className="eyebrow">{selected.type}</div><h2>{selected.romaji}</h2><p>{selected.example}</p></div>
            </div>
            <div className="row-actions">
              <Button onClick={() => speak(selected.char)}><Volume2 size={16} /> Hear it</Button>
              <Button variant="secondary" onClick={() => { addSrs({ kind: 'kana', front: selected.char, back: selected.romaji, detail: `${selected.type} character`, level: 'Foundation' }); notify('Added to review queue'); }}><BrainCircuit size={16} /> Add to SRS</Button>
            </div>
            <div className="trace-title"><PenLine size={16} /> Trace it</div>
            <TraceCanvas seed={selected.char} />
            {state.settings.showFurigana && <p className="hint">Tip: trace 3–5 times while saying the sound aloud.</p>}
          </Card>
        </div>
      ) : (
        <Card className="quiz-card">
          <div className="quiz-prompt">What sound does this make?</div>
          <div className="quiz-char" onClick={() => speak(selected.char)}>{selected.char}<Volume2 size={20} /></div>
          <div className="answer-line">
            <input className="answer-input" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') check(); }} placeholder="Type romaji…" />
            <Button onClick={check}>Check</Button>
          </div>
          {feedback && <div className={`feedback ${feedback.startsWith('Correct') ? 'good' : 'bad'}`}>{feedback}</div>}
        </Card>
      )}
    </div>
  );
}

export function Kanji({ notify }: PageProps) {
  const { addSrs } = useApp();
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const pendingChar = () => {
    try { return sessionStorage.getItem('kotoba-open-kanji') ?? ''; } catch { return ''; }
  };
  const [selected, setSelected] = useState<KanjiItem>(() => kanji.find((item) => item.char === pendingChar()) ?? kanji[0]);
  const [detailOpen, setDetailOpen] = useState(() => Boolean(pendingChar()));
  useEffect(() => {
    try { sessionStorage.removeItem('kotoba-open-kanji'); } catch { /* ignore blocked storage */ }
  }, []);
  const levels = useMemo(() => {
    const order = ['N5', 'N4', 'N3', 'N2', 'N1', 'Jōyō'];
    const present = new Set(kanji.map((item) => item.level));
    return ['All', ...order.filter((item) => present.has(item))];
  }, []);

  const filtered = useMemo(() => kanji.filter((item) => {
    const matchesLevel = level === 'All' || item.level === level;
    const haystack = `${item.char}${item.meaning}${item.on.join('')}${item.kun.join('')}`.toLowerCase();
    return matchesLevel && haystack.includes(query.toLowerCase());
  }), [query, level]);

  const selectedIndex = filtered.findIndex((item) => item.char === selected.char);
  const openItem = (item: KanjiItem) => {
    setSelected(item);
    setDetailOpen(true);
    speak(item.char);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };
  const step = (delta: number) => {
    if (!filtered.length) return;
    const base = selectedIndex < 0 ? 0 : selectedIndex;
    openItem(filtered[(base + delta + filtered.length) % filtered.length]);
  };

  const detailCard = (
    <Card className="kanji-detail">
      <div className="kanji-detail-hero">
        <div className="kanji-glyph">{selected.char}</div>
        <div><div className="eyebrow">{selected.level} · {selected.strokes} strokes · radical {selected.radical}</div><h2>{selected.meaning}</h2>
          <div className="reading-row"><span><b>On:</b> {selected.on.join('・') || '—'}</span><span><b>Kun:</b> {selected.kun.join('・') || '—'}</span></div>
        </div>
      </div>
      <div className="mnemonic"><Lightbulb size={17} /><div><strong>Mnemonic</strong><p>{selected.mnemonic}</p></div></div>
      <div className="mnemonic-links">
        <span className="small faint">Find more mnemonics for {selected.char}:</span>
        {mnemonicSearchLinks(selected.char).map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="source-link">{link.label}<ExternalLink size={11} /></a>
        ))}
      </div>
      <div className="detail-block-title">Example words</div>
      <div className="example-list">
        {selected.examples.length === 0 ? (
          <p className="small faint">Open reference entry — no curated compound examples yet. Add it to your queue to meet it again in reviews.</p>
        ) : (
          selected.examples.map((ex) => (
            <div key={ex.word} className="example-row" onClick={() => speak(ex.word)}>
              <div><strong>{ex.word}</strong><span>{ex.reading}</span></div><span>{ex.meaning}</span><Volume2 size={15} />
            </div>
          ))
        )}
      </div>
      <div className="row-actions">
        <Button onClick={() => speak(selected.char)}><Volume2 size={16} /> Hear kanji</Button>
        <Button variant="secondary" onClick={() => { addSrs({ kind: 'kanji', front: selected.char, back: selected.meaning, detail: `${selected.on.join('/')} · ${selected.kun.join('/')}`, level: selected.level }); notify(`${selected.char} added to SRS`); }}><BrainCircuit size={16} /> Add to SRS</Button>
      </div>
      <div className="trace-title"><PenLine size={16} /> Handwriting practice</div>
      <TraceCanvas seed={selected.char} />
    </Card>
  );

  if (detailOpen) {
    return (
      <div className="page kanji-detail-page">
        <div className="kanji-detail-bar">
          <Button variant="ghost" size="sm" onClick={() => { setDetailOpen(false); window.scrollTo({ top: 0, behavior: 'auto' }); }}><ArrowLeft size={15} /> All kanji</Button>
          <div className="row-actions">
            <Button variant="secondary" size="sm" onClick={() => step(-1)} aria-label="Previous kanji"><ChevronLeft size={15} /> Prev</Button>
            <span className="small faint">{selectedIndex + 1} / {filtered.length}</span>
            <Button variant="secondary" size="sm" onClick={() => step(1)} aria-label="Next kanji">Next <ChevronRight size={15} /></Button>
          </div>
        </div>
        {detailCard}
      </div>
    );
  }

  return (
    <div className="page">
      <SectionHeader eyebrow="Characters" title="Kanji Lab" subtitle="Tap any kanji to open its full detail page — meaning, readings, mnemonic, examples, and writing practice." />
      <div className="toolbar">
        <div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search kanji, meaning, reading…" /></div>
        <div className="row-actions">{levels.map((l) => <Pill key={l} active={level === l} onClick={() => setLevel(l)}>{l}</Pill>)}</div>
        <Badge tone="slate">{filtered.length} kanji</Badge>
      </div>
      <Card className="kanji-grid-card">
        <div className="kanji-grid">
          {filtered.map((item) => (
            <button key={item.char} className={`kanji-cell ${selected.char === item.char ? 'active' : ''}`} onClick={() => openItem(item)}>
              <strong>{item.char}</strong><span>{item.meaning}</span><small>{item.level}</small>
            </button>
          ))}
        </div>
      </Card>
      <Card className="mnemonic-sources">
        <SectionHeader eyebrow="Offline first · deeper online" title="Mnemonic reference library" subtitle="Every in-app mnemonic is original and works offline. These external references are links only — no third-party text, PDFs, or video content is stored here." />
        <div className="source-grid">
          {mnemonicSources.map((source) => (
            <a key={source.name} href={source.url} target="_blank" rel="noreferrer" className="source-card">
              <div className="row"><strong>{source.name}</strong><Badge tone="slate">{source.format}</Badge></div>
              <p>{source.detail}</p>
              <span className="small faint">{source.note}</span>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function Vocabulary({ notify }: PageProps) {
  const { addSrs } = useApp();
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('All');
  const tags = ['All', 'greeting', 'verb', 'adjective', 'food', 'time', 'place', 'nature', 'language'];
  const filtered = useMemo(() => vocab.filter((item) => {
    const haystack = `${item.word}${item.reading}${item.meaning}${item.tags.join('')}`.toLowerCase();
    return (tag === 'All' || item.tags.includes(tag)) && haystack.includes(query.toLowerCase());
  }), [query, tag]);

  return (
    <div className="page">
      <SectionHeader eyebrow="Words" title="Vocabulary Vault" subtitle="High-frequency words with audio, context, and one-tap SRS." />
      <div className="toolbar">
        <div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Japanese, romaji, or English…" /></div>
        <div className="row-actions wrap">{tags.map((t) => <Pill key={t} active={tag === t} onClick={() => setTag(t)}>{t}</Pill>)}</div>
        <Badge tone="slate">{filtered.length} words</Badge>
      </div>
      <Card className="word-table">
        <div className="word-row header"><span>Japanese</span><span>Reading</span><span>Meaning</span><span>Tags</span><span /></div>
        {filtered.map((item) => (
          <div key={item.word} className="word-row">
            <div className="word-jp"><strong>{item.word}</strong>{item.example && <small>{item.example}</small>}</div>
            <span>{item.reading}</span><span>{item.meaning}</span>
            <div className="tag-list">{item.tags.slice(0, 2).map((t) => <Badge key={t} tone="slate">{t}</Badge>)}</div>
            <div className="row-actions">
              <button className="icon-btn" onClick={() => speak(item.word)} title="Hear word"><Volume2 size={16} /></button>
              <button className="icon-btn" onClick={() => { addSrs({ kind: 'vocab', front: item.word, back: item.meaning, detail: item.reading, level: item.level }); notify(`${item.word} added to SRS`); }} title="Add to SRS"><BrainCircuit size={16} /></button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

export function Grammar({ notify }: PageProps) {
  const { addSrs, setNote, state } = useApp();
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('All');
  const [selected, setSelected] = useState(grammar[0]);
  const filtered = useMemo(() => grammar.filter((g) => {
    const haystack = `${g.title}${g.meaning}${g.structure}${g.tags.join('')}`.toLowerCase();
    return (level === 'All' || g.level === level) && haystack.includes(query.toLowerCase());
  }), [query, level]);

  return (
    <div className="page">
      <SectionHeader eyebrow="Reference + SRS" title="Grammar Studio" subtitle="Clear explanations, real examples, and sentence-level review." />
      <div className="toolbar">
        <div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search grammar points…" /></div>
        <div className="row-actions">{['All', 'N5', 'N4', 'N3'].map((l) => <Pill key={l} active={level === l} onClick={() => setLevel(l)}>{l}</Pill>)}</div>
      </div>
      <div className="grammar-layout">
        <Card className="grammar-list">
          {filtered.map((g) => (
            <ListItem key={g.id} title={g.title} subtitle={g.meaning} meta={<Badge tone={g.level === 'N5' ? 'cyan' : g.level === 'N4' ? 'amber' : 'rose'}>{g.level}</Badge>} onClick={() => setSelected(g)} active={selected.id === g.id} />
          ))}
        </Card>
        <Card className="grammar-detail">
          <div className="grammar-title-row"><div><div className="eyebrow">{selected.level} · Grammar point</div><h2>{selected.title}</h2><p>{selected.meaning}</p></div><Badge tone="violet">{selected.tags[0]}</Badge></div>
          <div className="grammar-box"><strong>Structure</strong><code>{selected.structure}</code></div>
          <p className="grammar-explanation">{selected.explanation}</p>
          <div className="detail-block-title">Examples</div>
          {selected.examples.map((ex, index) => (
            <div key={`${ex.jp}-${index}`} className="grammar-example" onClick={() => speak(ex.jp)}>
              <div><strong>{ex.jp}</strong><span>{ex.en}</span></div><Volume2 size={16} />
            </div>
          ))}
          <div className="row-actions">
            <Button onClick={() => { addSrs({ kind: 'grammar', front: selected.title, back: selected.meaning, detail: selected.examples[0]?.jp, level: selected.level }); notify('Grammar point added to SRS'); }}><BrainCircuit size={16} /> Add to SRS</Button>
            <Button variant="secondary" onClick={() => speak(selected.examples[0]?.jp ?? selected.title)}><Play size={16} /> Hear example</Button>
          </div>
          <div className="detail-block-title">My notes</div>
          <textarea className="note-area" value={state.notes[`grammar-${selected.id}`] ?? ''} onChange={(e) => setNote(`grammar-${selected.id}`, e.target.value)} placeholder="Write your own example or correction…" />
        </Card>
      </div>
    </div>
  );
}

export function Listening({ notify }: PageProps) {
  const { state, update } = useApp();
  const [selected, setSelected] = useState<Reading>(readings[0]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const showFurigana = state.settings.showFurigana;

  const select = (reading: Reading) => { setSelected(reading); setAnswers({}); setChecked(false); };
  const check = () => { setChecked(true); const correct = selected.questions.filter((q, i) => answers[i] === q.answer).length; notify(`You got ${correct}/${selected.questions.length} correct`); update((s) => ({ ...s, xp: s.xp + correct * 5, level: Math.floor((s.xp + correct * 5) / 500) + 1 })); };

  return (
    <div className="page">
      <SectionHeader eyebrow="Comprehensible input" title="Listening & Reading" subtitle="Graded passages with furigana, audio, and comprehension checks." action={<Button variant="ghost" size="sm" onClick={() => update((s) => ({ ...s, settings: { ...s.settings, showFurigana: !s.settings.showFurigana } }))}>{showFurigana ? 'Hide' : 'Show'} furigana</Button>} />
      <div className="reading-layout">
        <Card className="reading-list">
          {readings.map((r) => (
            <ListItem key={r.id} title={r.title} subtitle={`${r.level} · ${r.minutes} min · ${r.source}`} onClick={() => select(r)} active={selected.id === r.id} icon={<BookOpen size={16} />} />
          ))}
        </Card>
        <Card className="reading-content">
          <div className="reading-head"><div><div className="eyebrow">{selected.level} · {selected.minutes} min read</div><h2>{selected.title}</h2></div><Button onClick={() => speak(selected.body.map((b) => b.text).join(' '), 'ja-JP', 0.82)}><Headphones size={16} /> Play passage</Button></div>
          <div className="passage">
            {selected.body.map((line, i) => (
              <div key={i} className="passage-line" onClick={() => speak(line.text, 'ja-JP', 0.8)}>
                {showFurigana && line.reading && <span className="furigana">{line.reading}</span>}
                <span className="jp-line">{line.text}</span><Volume2 size={14} />
              </div>
            ))}
          </div>
          <div className="detail-block-title">Comprehension</div>
          {selected.questions.map((q, i) => (
            <div key={q.q} className="comprehension-q">
              <strong>{i + 1}. {q.q}</strong>
              <div className="option-grid compact">
                {q.options.map((option) => (
                  <button key={option} className={`option ${answers[i] === option ? 'selected' : ''} ${checked && option === q.answer ? 'correct' : ''}`} onClick={() => !checked && setAnswers({ ...answers, [i]: option })}>{option}</button>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={check} disabled={checked || Object.keys(answers).length < selected.questions.length}>Check answers</Button>
        </Card>
      </div>
    </div>
  );
}

const speakingPhrases = [
  { jp: 'こんにちは、はじめまして。', en: 'Hello, nice to meet you.' },
  { jp: '日本語を勉強しています。', en: 'I am studying Japanese.' },
  { jp: '少しゆっくり話してください。', en: 'Please speak a little more slowly.' },
  { jp: '今日はいい天気ですね。', en: 'Nice weather today, isn’t it?' },
  { jp: 'もう一度お願いします。', en: 'One more time, please.' },
  { jp: 'これはどういう意味ですか。', en: 'What does this mean?' },
];

function similarity(a: string, b: string) {
  const x = normalizeSpeech(a);
  const y = normalizeSpeech(b);
  if (!x || !y) return 0;
  if (x === y) return 100;
  const set = new Set(x.split(''));
  let hits = 0;
  y.split('').forEach((ch) => { if (set.has(ch)) hits += 1; });
  return Math.max(0, Math.min(100, Math.round((hits / Math.max(x.length, y.length)) * 100)));
}

export function Speaking({ notify }: PageProps) {
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [listening, setListening] = useState(false);
  const phrase = speakingPhrases[index];

  const listen = () => {
    setListening(true);
    setScore(null);
    const controller = startRecognition((text) => {
      setTranscript(text);
      setScore(similarity(text, phrase.jp));
      setListening(false);
    }, () => setListening(false));
    if (!controller) {
      notify('Speech recognition is unavailable here. Speak aloud, then type the phrase to self-check.');
      setListening(false);
    }
  };

  return (
    <div className="page">
      <SectionHeader eyebrow="Output" title="Speaking Lab" subtitle="Shadow, speak, compare, repeat. Browser speech recognition is used when available." />
      <div className="speaking-layout">
        <Card className="speaking-main">
          <div className="eyebrow">Phrase {index + 1} of {speakingPhrases.length}</div>
          <div className="phrase-jp" onClick={() => speak(phrase.jp, 'ja-JP', 0.85)}>{phrase.jp}<Volume2 size={20} /></div>
          <p className="phrase-en">{phrase.en}</p>
          <div className="mic-row">
            <button className={`mic-large ${listening ? 'listening' : ''}`} onClick={listen}><Mic size={34} /></button>
            <div><strong>{listening ? 'Listening…' : 'Tap and say the phrase'}</strong><span>Speak naturally. Do not rush.</span></div>
          </div>
          <div className="transcript-box">
            <span>Your transcript</span>
            <input value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Speech appears here, or type manually" />
          </div>
          {score !== null && (
            <div className="score-panel">
              <div className="score-value">{score}%</div>
              <ProgressBar value={score} tone={score >= 80 ? 'green' : score >= 50 ? 'amber' : 'rose'} />
              <span>{score >= 80 ? 'Excellent — natural enough.' : score >= 50 ? 'Good. Repeat slowly and cleanly.' : 'Listen again, then shadow each chunk.'}</span>
            </div>
          )}
          <div className="row-actions between">
            <Button variant="ghost" onClick={() => speak(phrase.jp, 'ja-JP', 0.7)}><Play size={16} /> Slow audio</Button>
            <div className="row-actions">
              <Button variant="secondary" onClick={() => { setIndex((i) => (i - 1 + speakingPhrases.length) % speakingPhrases.length); setTranscript(''); setScore(null); }}>Previous</Button>
              <Button onClick={() => { setIndex((i) => (i + 1) % speakingPhrases.length); setTranscript(''); setScore(null); }}>Next phrase <ArrowRight size={15} /></Button>
            </div>
          </div>
        </Card>
        <Card className="speaking-side">
          <SectionHeader eyebrow="Method" title="Shadowing loop" />
          <div className="steps-list">
            {[
              ['1', 'Listen to the full phrase.', 'Hear the rhythm before speaking.'],
              ['2', 'Repeat in small chunks.', 'Copy pitch, length, and pauses.'],
              ['3', 'Say it with the audio.', 'Overlap your voice with the model.'],
              ['4', 'Record or use the mic.', 'Compare and correct one thing.'],
              ['5', 'Use it in a real sentence.', 'Move from practice to possession.'],
            ].map(([n, title, sub]) => (
              <div key={n} className="step-row"><span>{n}</span><div><strong>{title}</strong><small>{sub}</small></div></div>
            ))}
          </div>
          <div className="coach-note"><Sparkles size={18} /><div><strong>Next level</strong><span>Record yourself once a week and compare it with the model phrase — careful listening and repeat passes are your feedback loop.</span></div></div>
        </Card>
      </div>
    </div>
  );
}

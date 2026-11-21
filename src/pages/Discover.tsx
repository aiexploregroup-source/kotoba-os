import { useMemo, useState } from 'react';
import { ArrowUpRight, BookMarked, ExternalLink, Globe2, GraduationCap, Heart, Search, Sparkles, Trophy } from 'lucide-react';
import { Badge, Button, Card, EmptyState, Pill, ProgressBar, ProgressRing, SectionHeader } from '../components';
import { grammar, kanji, vocab } from '../data/content';
import resourcesData from '../data/resources.json';
import { useApp } from '../store';
import type { PageProps } from '../pageTypes';
import type { Resource } from '../types';

const resources = resourcesData as Resource[];

export function Dictionary() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const words = useMemo(() => vocab.filter((v) => `${v.word}${v.reading}${v.meaning}${v.tags.join('')}`.toLowerCase().includes(q)).slice(0, 12), [q]);
  const kanjiResults = useMemo(() => kanji.filter((k) => `${k.char}${k.meaning}${k.on.join('')}${k.kun.join('')}`.toLowerCase().includes(q)).slice(0, 12), [q]);
  const grammarResults = useMemo(() => grammar.filter((g) => `${g.title}${g.meaning}${g.structure}`.toLowerCase().includes(q)).slice(0, 8), [q]);
  const encoded = encodeURIComponent(query || '日本語');

  return (
    <div className="page">
      <SectionHeader eyebrow="Lookups" title="Dictionary Hub" subtitle="Search your built-in dataset, then jump to the deeper external dictionaries." />
      <div className="search-hero">
        <Search size={22} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Japanese, romaji, English, kanji, or grammar…" autoFocus />
        {query && <button className="icon-btn" onClick={() => setQuery('')}>✕</button>}
      </div>
      <div className="external-dicts">
        <a href={`https://jisho.org/search/${encoded}`} target="_blank" rel="noreferrer"><Button variant="secondary" size="sm">Jisho <ExternalLink size={13} /></Button></a>
        <a href={`https://www.japandict.com/?s=${encoded}`} target="_blank" rel="noreferrer"><Button variant="secondary" size="sm">Japandict <ExternalLink size={13} /></Button></a>
        <a href={`https://jotoba.de/search/${encoded}`} target="_blank" rel="noreferrer"><Button variant="secondary" size="sm">Jotoba <ExternalLink size={13} /></Button></a>
        <a href="https://www.weblio.jp/" target="_blank" rel="noreferrer"><Button variant="secondary" size="sm">Weblio <ExternalLink size={13} /></Button></a>
      </div>

      {!q ? (
        <Card><EmptyState icon={<Search size={28} />} title="Start with a word" text="Type a Japanese word, English meaning, kanji character, or grammar pattern above." /></Card>
      ) : (
        <div className="dict-results">
          <Card>
            <SectionHeader eyebrow="Words" title={`${words.length} vocabulary matches`} />
            {words.length === 0 && <p className="muted">No local matches. Try an external dictionary.</p>}
            {words.map((w) => <div key={w.word} className="dict-row"><div><strong>{w.word}</strong><span>{w.reading}</span></div><p>{w.meaning}</p><Badge tone="slate">{w.level}</Badge></div>)}
          </Card>
          <Card>
            <SectionHeader eyebrow="Characters" title={`${kanjiResults.length} kanji matches`} />
            {kanjiResults.map((k) => <div key={k.char} className="dict-row"><div className="dict-kanji">{k.char}</div><div><strong>{k.meaning}</strong><span>{k.on.join('・')} / {k.kun.join('・')}</span></div><Badge tone="cyan">{k.level}</Badge></div>)}
          </Card>
          <Card>
            <SectionHeader eyebrow="Grammar" title={`${grammarResults.length} grammar matches`} />
            {grammarResults.map((g) => <div key={g.id} className="dict-row"><div><strong>{g.title}</strong><span>{g.structure}</span></div><p>{g.meaning}</p><Badge tone="amber">{g.level}</Badge></div>)}
          </Card>
        </div>
      )}
    </div>
  );
}

export function Immersion({ notify }: PageProps) {
  const { state, toggleFavorite, setNote } = useApp();
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All');
  const [savedOnly, setSavedOnly] = useState(false);
  const groups = ['All', 'Official/Institution', 'App', 'Free Web/Reference', 'YouTube', 'Paid/Course/Textbook'];

  const filtered = useMemo(() => resources.filter((r) => {
    const haystack = `${r.name}${r.provider}${r.bestFor}${r.level}${r.cost}`.toLowerCase();
    return (group === 'All' || r.group === group) && (!savedOnly || state.favorites.includes(r.id)) && haystack.includes(query.toLowerCase());
  }), [query, group, savedOnly, state.favorites]);

  return (
    <div className="page">
      <SectionHeader eyebrow="Resource library" title="Immersion Directory" subtitle={`All ${resources.length} curated resources from your complete study list, filterable in one place.`} />
      <div className="toolbar">
        <div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the full library…" /></div>
        <Button variant={savedOnly ? 'primary' : 'secondary'} size="sm" onClick={() => setSavedOnly((v) => !v)}><Heart size={14} /> Saved ({state.favorites.length})</Button>
      </div>
      <div className="row-actions wrap filter-row">
        {groups.map((g) => <Pill key={g} active={group === g} onClick={() => setGroup(g)}>{g}</Pill>)}
      </div>
      <div className="resource-grid">
        {filtered.map((r) => {
          const saved = state.favorites.includes(r.id);
          return (
            <Card key={r.id} className="resource-card">
              <div className="resource-top"><Badge tone={r.group === 'Official/Institution' ? 'green' : r.group === 'YouTube' ? 'rose' : r.group === 'App' ? 'cyan' : 'violet'}>{r.group}</Badge><button className={`icon-btn ${saved ? 'fav' : ''}`} onClick={() => { toggleFavorite(r.id); notify(saved ? 'Removed from saved' : 'Saved to library'); }}><Heart size={16} fill={saved ? 'currentColor' : 'none'} /></button></div>
              <h3>{r.name}</h3>
              <p className="provider">{r.provider}</p>
              <p className="resource-best">{r.bestFor}</p>
              <div className="resource-meta"><span>{r.level}</span><span>{r.cost}</span></div>
              <textarea className="mini-note" value={state.notes[`resource-${r.id}`] ?? ''} onChange={(e) => setNote(`resource-${r.id}`, e.target.value)} placeholder="Add a note…" />
              <a href={r.link} target="_blank" rel="noreferrer"><Button variant="secondary" size="sm" className="full-btn">Open resource <ArrowUpRight size={13} /></Button></a>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function JLPT() {
  const { state, update } = useApp();
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'] as const;
  const level = state.selectedLevel;
  const levelGrammar = grammar.filter((g) => g.level === level);
  const levelKanji = kanji.filter((k) => k.level === level);
  const levelVocab = vocab.filter((v) => v.level === level);
  const readiness = Math.min(100, Math.round((levelGrammar.length / 8) * 30 + (levelKanji.length / 20) * 35 + (levelVocab.length / 25) * 35));

  const quiz = useMemo(() => {
    const pool = vocab.filter((v) => v.level === level).slice(0, 5);
    return pool.map((item, i) => {
      const distractors = vocab
        .filter((v) => v.level === level && v.word !== item.word && v.meaning !== item.meaning)
        .slice(i, i + 3)
        .map((v) => v.meaning);
      // Dense data can repeat meanings; unique options avoid duplicate React keys and ambiguous questions.
      return { word: item.word, answer: item.meaning, options: Array.from(new Set([item.meaning, ...distractors])).slice(0, 4) };
    });
  }, [level]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const selectLevel = (l: typeof level) => { update((s) => ({ ...s, selectedLevel: l })); setAnswers({}); setChecked(false); };

  return (
    <div className="page">
      <SectionHeader eyebrow="Exam track" title="JLPT Command Center" subtitle="Target level, readiness, official samples, and quick vocabulary checks." />
      <div className="segmented">
        {levels.map((l) => <button key={l} className={level === l ? 'active' : ''} onClick={() => selectLevel(l)}>{l}</button>)}
      </div>
      <div className="jlpt-layout">
        <Card className="jlpt-overview">
          <div className="jlpt-ring"><ProgressRing value={readiness} size={140} label={`${readiness}%`} sublabel="readiness" /></div>
          <div><div className="eyebrow">Target level</div><h2>{level}</h2><p>Based on the curated local content available for this level. Treat this as a study signal, not an official score estimate.</p>
            <div className="readiness-bars">
              <ProgressBar label="Grammar coverage" value={levelGrammar.length} max={8} tone="violet" />
              <ProgressBar label="Kanji coverage" value={levelKanji.length} max={20} tone="cyan" />
              <ProgressBar label="Vocabulary coverage" value={levelVocab.length} max={25} tone="amber" />
            </div>
          </div>
        </Card>
        <Card className="jlpt-actions">
          <SectionHeader eyebrow="Official practice" title="Use the real samples" />
          <a href="https://www.jlpt.jp/e/samples/sampleindex.html" target="_blank" rel="noreferrer"><Button className="full-btn">Open JLPT official samples <ExternalLink size={14} /></Button></a>
          <div className="coach-note"><Sparkles size={18} /><div><strong>Exam + real ability</strong><span>Pair exam practice with speaking and reading. Passing a test and using Japanese are related but different skills.</span></div></div>
          <div className="jlpt-links">
            <a href="https://www.youtube.com/@nihongonomori" target="_blank" rel="noreferrer"><div><Globe2 size={16} /> Nihongo no Mori</div><ArrowUpRight size={14} /></a>
            <a href="https://bunpro.jp/" target="_blank" rel="noreferrer"><div><GraduationCap size={16} /> Bunpro grammar path</div><ArrowUpRight size={14} /></a>
            <a href="https://www.wanikani.com/" target="_blank" rel="noreferrer"><div><BookMarked size={16} /> WaniKani kanji path</div><ArrowUpRight size={14} /></a>
          </div>
        </Card>
      </div>
      <Card className="jlpt-quiz">
        <SectionHeader eyebrow="Quick check" title={`${level} vocabulary`} subtitle="Five fast recognition questions." />
        {quiz.length === 0 ? <EmptyState icon={<Trophy size={26} />} title="Content coming soon" text="This level has no local quiz items yet. Use official samples for now." /> : (
          <>
            {quiz.map((q, i) => (
              <div key={q.word} className="comprehension-q">
                <strong>{i + 1}. What does「{q.word}」mean?</strong>
                <div className="option-grid compact">
                  {q.options.map((option) => <button key={option} className={`option ${answers[i] === option ? 'selected' : ''} ${checked && option === q.answer ? 'correct' : ''}`} onClick={() => !checked && setAnswers({ ...answers, [i]: option })}>{option}</button>)}
                </div>
              </div>
            ))}
            <Button onClick={() => setChecked(true)} disabled={checked || Object.keys(answers).length < quiz.length}>Check answers</Button>
          </>
        )}
      </Card>
    </div>
  );
}


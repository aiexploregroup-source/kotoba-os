import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { kanji as kanjiData, vocab as vocabData } from '../data/content';
import { radicals } from '../data/radicals';
import { percent } from './utils';

export type PathKind = 'radical' | 'kanji' | 'vocab';

export interface PathItem {
  id: string;
  kind: PathKind;
  char: string;
  label: string;
  meaning: string;
  reading?: string;
  mnemonic: string;
  level: string;
  detail?: string;
}

export interface PathProgress {
  stage: number; // 0 = locked/lesson, 1-4 apprentice, 5-6 guru, 7 master, 8 enlightened, 9 burned
  due: number;
  correct: number;
  wrong: number;
  lastAt?: number;
}

type ProgressMap = Record<string, PathProgress>;

const STORAGE_KEY = 'kotoba-os-path-v1';
const HOUR = 3_600_000;
const STAGE_HOURS = [0, 4, 8, 24, 48, 168, 336, 720, 2880, 0];

const STAGE_NAMES = [
  'Locked',
  'Apprentice I',
  'Apprentice II',
  'Apprentice III',
  'Apprentice IV',
  'Guru I',
  'Guru II',
  'Master',
  'Enlightened',
  'Burned',
];

export const stageName = (stage: number) => STAGE_NAMES[stage] ?? 'Locked';
export const stageTone = (stage: number) =>
  stage === 0 ? 'slate' : stage <= 4 ? 'violet' : stage <= 6 ? 'cyan' : stage <= 8 ? 'amber' : 'green';

export const pathItems: PathItem[] = [
  ...radicals.map(
    (r): PathItem => ({
      id: `radical:${r.id}`,
      kind: 'radical',
      char: r.char,
      label: r.name,
      meaning: r.meaning,
      mnemonic: r.mnemonic,
      level: 'Radicals',
      detail: r.hint,
    }),
  ),
  ...kanjiData.map(
    (k): PathItem => ({
      id: `kanji:${k.char}`,
      kind: 'kanji',
      char: k.char,
      label: k.char,
      meaning: k.meaning,
      reading: [...k.on, ...k.kun].filter(Boolean).join(' · '),
      mnemonic: k.mnemonic,
      level: k.level,
      detail: `${k.strokes} strokes · radical ${k.radical}`,
    }),
  ),
  ...vocabData.map(
    (v): PathItem => ({
      id: `vocab:${v.word}`,
      kind: 'vocab',
      char: v.word,
      label: v.word,
      meaning: v.meaning,
      reading: v.reading,
      mnemonic: `Built from kanji you already know. ${v.example ? `Try it in context: ${v.example}` : 'Read it aloud in a sentence.'}`,
      level: v.level,
      detail: v.tags.join(' · '),
    }),
  ),
];

const itemById = new Map(pathItems.map((item) => [item.id, item]));
const emptyProgress = (): ProgressMap => ({});

function loadProgress(): ProgressMap {
  if (typeof window === 'undefined') return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as ProgressMap;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return emptyProgress();
    return parsed;
  } catch {
    return emptyProgress();
  }
}

interface PathContextValue {
  items: PathItem[];
  progress: ProgressMap;
  counts: {
    radicals: number;
    kanji: number;
    vocab: number;
    learned: number;
    burned: number;
    apprentice: number;
    guru: number;
    accuracy: number;
  };
  radicalPercent: number;
  kanjiPercent: number;
  vocabPercent: number;
  level: number;
  kindUnlocked: (kind: PathKind) => boolean;
  unlocked: (item: PathItem) => boolean;
  available: PathItem[];
  due: PathItem[];
  upcoming: PathItem[];
  progressFor: (id: string) => PathProgress;
  learn: (id: string) => void;
  answer: (id: string, correct: boolean) => void;
  reset: () => void;
}

const PathContext = createContext<PathContextValue | null>(null);

export function PathProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>(loadProgress);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const reset = () => setProgress(emptyProgress());
    window.addEventListener('kotoba-os-reset', reset);
    return () => window.removeEventListener('kotoba-os-reset', reset);
  }, []);

  const counts = useMemo(() => {
    let radicals = 0;
    let kanji = 0;
    let vocab = 0;
    let learned = 0;
    let burned = 0;
    let apprentice = 0;
    let guru = 0;
    let correct = 0;
    let wrong = 0;
    for (const item of pathItems) {
      const p = progress[item.id];
      if (item.kind === 'radical') radicals += 1;
      if (item.kind === 'kanji') kanji += 1;
      if (item.kind === 'vocab') vocab += 1;
      if (!p || p.stage === 0) continue;
      learned += 1;
      correct += p.correct;
      wrong += p.wrong;
      if (p.stage === 9) burned += 1;
      else if (p.stage <= 4) apprentice += 1;
      else guru += 1;
    }
    return {
      radicals,
      kanji,
      vocab,
      learned,
      burned,
      apprentice,
      guru,
      accuracy: correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 100,
    };
  }, [progress]);

  const stagePercent = useCallback(
    (kind: PathKind, minStage: number) => {
      const list = pathItems.filter((item) => item.kind === kind);
      if (!list.length) return 0;
      const passed = list.filter((item) => (progress[item.id]?.stage ?? 0) >= minStage).length;
      return percent(passed, list.length);
    },
    [progress],
  );

  const radicalPercent = stagePercent('radical', 2);
  const kanjiPercent = stagePercent('kanji', 5);
  const vocabPercent = stagePercent('vocab', 5);

  // Thresholds are count-based so adding the full 2,136-kanji Jōyō set does not
  // push vocabulary and level-ups permanently out of reach.
  const startedByKind = useMemo(() => {
    const started = { radical: 0, kanji: 0, vocab: 0 };
    for (const item of pathItems) if ((progress[item.id]?.stage ?? 0) > 0) started[item.kind] += 1;
    return started;
  }, [progress]);

  const unlockedKind = useCallback(
    (kind: PathKind) => {
      if (kind === 'radical') return true;
      if (kind === 'kanji') return startedByKind.radical >= 10 || radicalPercent >= 40;
      return startedByKind.kanji >= 25 || kanjiPercent >= 30;
    },
    [startedByKind, radicalPercent, kanjiPercent],
  );

  const unlocked = useCallback((item: PathItem) => unlockedKind(item.kind), [unlockedKind]);

  const available = useMemo(
    () => pathItems.filter((item) => unlocked(item) && (progress[item.id]?.stage ?? 0) === 0),
    [progress, unlocked],
  );

  const due = useMemo(
    () =>
      pathItems
        .filter((item) => {
          const p = progress[item.id];
          return p && p.stage > 0 && p.stage < 9 && p.due <= Date.now();
        })
        .sort((a, b) => progress[a.id].due - progress[b.id].due),
    [progress],
  );

  const upcoming = useMemo(
    () =>
      pathItems
        .filter((item) => {
          const p = progress[item.id];
          return p && p.stage > 0 && p.stage < 9 && p.due > Date.now();
        })
        .sort((a, b) => progress[a.id].due - progress[b.id].due)
        .slice(0, 12),
    [progress],
  );

  const level = startedByKind.kanji >= 100 || kanjiPercent >= 90 ? 2 : 1;

  const progressFor = useCallback(
    (id: string): PathProgress => progress[id] ?? { stage: 0, due: 0, correct: 0, wrong: 0 },
    [progress],
  );

  const learn = useCallback((id: string) => {
    setProgress((current) => {
      if (!itemById.has(id)) return current;
      const existing = current[id];
      if (existing && existing.stage > 0) return current;
      return { ...current, [id]: { stage: 1, due: Date.now() + STAGE_HOURS[1] * HOUR, correct: 0, wrong: 0, lastAt: Date.now() } };
    });
  }, []);

  const answer = useCallback((id: string, correct: boolean) => {
    setProgress((current) => {
      const previous = current[id];
      if (!previous || previous.stage === 0) return current;
      const stage = correct
        ? Math.min(9, previous.stage + 1)
        : Math.max(1, previous.stage - (previous.stage >= 5 ? 2 : 1));
      const wait = correct ? STAGE_HOURS[stage] * HOUR : 15 * 60_000;
      return {
        ...current,
        [id]: {
          stage,
          due: stage === 9 ? 0 : Date.now() + wait,
          correct: previous.correct + (correct ? 1 : 0),
          wrong: previous.wrong + (correct ? 0 : 1),
          lastAt: Date.now(),
        },
      };
    });
  }, []);

  const reset = useCallback(() => setProgress(emptyProgress()), []);

  const value = useMemo<PathContextValue>(
    () => ({
      items: pathItems,
      progress,
      counts,
      radicalPercent,
      kanjiPercent,
      vocabPercent,
      level,
      kindUnlocked: unlockedKind,
      unlocked,
      available,
      due,
      upcoming,
      progressFor,
      learn,
      answer,
      reset,
    }),
    [progress, counts, radicalPercent, kanjiPercent, vocabPercent, level, unlockedKind, unlocked, available, due, upcoming, progressFor, learn, answer, reset],
  );

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
}

export function usePath() {
  const ctx = useContext(PathContext);
  if (!ctx) throw new Error('usePath must be used inside PathProvider');
  return ctx;
}

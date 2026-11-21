import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import resourcesData from './data/resources.json';
import type { Activity, AppState, BackgroundSettings, Resource, SrsItem, Theme } from './types';

const STORAGE_KEY = 'kotoba-os-state-v1';
const resources = resourcesData as Resource[];
const validResourceIds = new Set(resources.map((resource) => resource.id));
const favoriteAliases: Record<string, string> = {
  'minato-jf-1': 'jf-japanese-e-learning-minato-1',
  'nhk-easy-japanese-lessons-12': 'nhk-easy-japanese-lessons-11',
};

const todayKey = (date = new Date()) => date.toISOString().slice(0, 10);

/** A genuinely fresh install: no borrowed XP, cards, history, or favourites. */
const initialState = (): AppState => ({
  version: 1,
  name: 'Learner',
  theme: 'dark',
  dailyGoal: 30,
  streak: 0,
  xp: 0,
  level: 1,
  lastActive: todayKey(),
  selectedLevel: 'N4',
  srs: [],
  activity: [],
  stats: [],
  favorites: [],
  completedLessons: [],
  completedPhases: [],
  notes: {},
  background: { mode: 'default', presetId: null, image: null, opacity: 100, dim: 42, blur: 2 },
  settings: {
    sound: true,
    reduceMotion: false,
    autoAdvance: true,
    showFurigana: true,
  },
});

const levelChoices: AppState['selectedLevel'][] = ['N5', 'N4', 'N3', 'N2', 'N1'];

/** Merge saved/imported data over defaults and repair legacy or malformed fields. */
function normalizeState(parsed: AppState): AppState {
  const defaults = initialState();
  const merged = {
    ...defaults,
    ...parsed,
    settings: { ...defaults.settings, ...parsed.settings },
    background: { ...defaults.background, ...parsed.background },
  };
  const clamp = (value: unknown, min: number, max: number, fallback: number) =>
    Number.isFinite(value) ? Math.max(min, Math.min(max, Number(value))) : fallback;
  const bg: BackgroundSettings = {
    mode: ['default', 'preset', 'custom'].includes(merged.background.mode) ? merged.background.mode : 'default',
    presetId: typeof merged.background.presetId === 'string' ? merged.background.presetId : null,
    image: typeof merged.background.image === 'string' ? merged.background.image : null,
    opacity: clamp(merged.background.opacity, 0, 100, defaults.background.opacity),
    dim: clamp(merged.background.dim, 0, 80, defaults.background.dim),
    blur: clamp(merged.background.blur, 0, 12, defaults.background.blur),
  };
  return {
    ...merged,
    background: bg,
    dailyGoal: Number.isFinite(merged.dailyGoal) ? Math.max(5, Math.round(merged.dailyGoal)) : defaults.dailyGoal,
    selectedLevel: levelChoices.includes(merged.selectedLevel) ? merged.selectedLevel : defaults.selectedLevel,
    srs: Array.isArray(merged.srs) ? merged.srs : defaults.srs,
    activity: Array.isArray(merged.activity) ? merged.activity : defaults.activity,
    stats: Array.isArray(merged.stats) ? merged.stats : defaults.stats,
    favorites: Array.isArray(merged.favorites) ? merged.favorites : defaults.favorites,
    completedLessons: Array.isArray(merged.completedLessons) ? merged.completedLessons : defaults.completedLessons,
    completedPhases: Array.isArray(merged.completedPhases)
      ? merged.completedPhases.filter((phase): phase is string => typeof phase === 'string')
      : defaults.completedPhases,
    notes: merged.notes && typeof merged.notes === 'object' && !Array.isArray(merged.notes) ? merged.notes : defaults.notes,
  };
}

function loadState(): AppState {
  if (typeof window === 'undefined') return initialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState();
    const parsed = JSON.parse(raw) as AppState;
    if (parsed.version !== 1) return initialState();
    const merged = normalizeState(parsed);
    const favorites = merged.favorites.map((id) => favoriteAliases[id] ?? id).filter((id) => validResourceIds.has(id));
    return { ...merged, favorites };
  } catch {
    return initialState();
  }
}

interface AppContextValue {
  state: AppState;
  update: (fn: (state: AppState) => AppState) => void;
  reviewsDue: SrsItem[];
  todayStats: { reviews: number; minutes: number; xp: number };
  addSrs: (item: Omit<SrsItem, 'id' | 'interval' | 'ease' | 'due' | 'reps' | 'lapses' | 'added'>) => void;
  gradeSrs: (id: string, grade: 'again' | 'hard' | 'good' | 'easy') => void;
  logActivity: (type: Activity['type'], label: string, xp: number) => void;
  completeLesson: (id: string, title: string, xp: number) => void;
  toggleFavorite: (id: string) => void;
  setNote: (key: string, value: string) => void;
  setTheme: (theme: Theme) => void;
  setBackground: (background: BackgroundSettings) => void;
  exportData: () => void;
  importData: (file: File) => Promise<void>;
  resetData: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* A custom background may exceed the browser quota; the session still works. */
    }
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.classList.toggle('reduce-motion', state.settings.reduceMotion);
  }, [state]);

  const update = useCallback((fn: (current: AppState) => AppState) => setState(fn), []);

  const logActivity = useCallback(
    (type: Activity['type'], label: string, xp: number) => {
      setState((current) => {
        const today = todayKey();
        const stats = [...current.stats];
        const idx = stats.findIndex((s) => s.date === today);
        const stat = idx >= 0 ? stats[idx] : { date: today, reviews: 0, minutes: 0, xp: 0 };
        if (type === 'review') stat.reviews += 1;
        stat.xp += xp;
        stat.minutes += type === 'review' ? 1 : 2;
        if (idx >= 0) stats[idx] = stat;
        else stats.push(stat);
        const level = Math.floor((current.xp + xp) / 500) + 1;
        return {
          ...current,
          xp: current.xp + xp,
          level,
          lastActive: today,
          stats: stats.slice(-60),
          activity: [
            { id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, date: Date.now(), type, label, xp },
            ...current.activity,
          ].slice(0, 80),
        };
      });
    },
    [],
  );

  const addSrs = useCallback(
    (item: Omit<SrsItem, 'id' | 'interval' | 'ease' | 'due' | 'reps' | 'lapses' | 'added'>) => {
      setState((current) => {
        if (current.srs.some((s) => s.front === item.front && s.kind === item.kind)) return current;
        return {
          ...current,
          srs: [
            ...current.srs,
            {
              ...item,
              id: `srs-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              interval: 0,
              ease: 2.5,
              due: Date.now(),
              reps: 0,
              lapses: 0,
              added: Date.now(),
            },
          ],
        };
      });
    },
    [],
  );

  const gradeSrs = useCallback(
    (id: string, grade: 'again' | 'hard' | 'good' | 'easy') => {
      setState((current) => {
        const now = Date.now();
        const multiplier = { again: 0, hard: 1.2, good: 2.2, easy: 3.5 }[grade];
        const srs = current.srs.map((item) => {
          if (item.id !== id) return item;
          const ease = Math.max(1.3, Math.min(3.0, item.ease + (grade === 'easy' ? 0.15 : grade === 'again' ? -0.2 : 0)));
          const interval = grade === 'again' ? 0 : Math.max(1, Math.round(item.interval * multiplier * (ease / 2.5) || 1));
          const due = now + (grade === 'again' ? 60_000 : interval * 86_400_000);
          return {
            ...item,
            ease,
            interval,
            due,
            reps: item.reps + 1,
            lapses: item.lapses + (grade === 'again' ? 1 : 0),
          };
        });
        const xp = { again: 2, hard: 4, good: 6, easy: 8 }[grade];
        const stats = [...current.stats];
        const today = todayKey();
        const idx = stats.findIndex((s) => s.date === today);
        const stat = idx >= 0 ? stats[idx] : { date: today, reviews: 0, minutes: 0, xp: 0 };
        stat.reviews += 1;
        stat.minutes += 1;
        stat.xp += xp;
        if (idx >= 0) stats[idx] = stat;
        else stats.push(stat);
        return {
          ...current,
          srs,
          xp: current.xp + xp,
          level: Math.floor((current.xp + xp) / 500) + 1,
          lastActive: today,
          stats: stats.slice(-60),
          activity: [
            { id: `rev-${now}-${Math.random().toString(36).slice(2, 6)}`, date: now, type: 'review' as const, label: `Reviewed ${srs.find((s) => s.id === id)?.front ?? 'card'}`, xp },
            ...current.activity,
          ].slice(0, 80),
        };
      });
    },
    [],
  );

  const completeLesson = useCallback(
    (id: string, title: string, xp: number) => {
      setState((current) => ({ ...current, completedLessons: Array.from(new Set([...current.completedLessons, id])) }));
      logActivity('lesson', `Finished ${title}`, xp);
    },
    [logActivity],
  );

  const toggleFavorite = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      favorites: current.favorites.includes(id) ? current.favorites.filter((f) => f !== id) : [...current.favorites, id],
    }));
  }, []);

  const setNote = useCallback((key: string, value: string) => {
    setState((current) => ({ ...current, notes: { ...current.notes, [key]: value } }));
  }, []);

  const setTheme = useCallback((theme: Theme) => setState((current) => ({ ...current, theme })), []);
  const setBackground = useCallback((background: BackgroundSettings) => setState((current) => ({ ...current, background })), []);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kotoba-os-backup-${todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  const importData = useCallback(async (file: File) => {
    const text = await file.text();
    const parsed = JSON.parse(text) as AppState;
    if (parsed.version !== 1) throw new Error('Unsupported backup version');
    setState(normalizeState(parsed));
  }, []);

  const resetData = useCallback(() => {
    setState(initialState());
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem('kotoba-os-path-v1');
    window.dispatchEvent(new Event('kotoba-os-reset'));
  }, []);

  const reviewsDue = useMemo(() => state.srs.filter((item) => item.due <= Date.now()), [state.srs]);
  const todayStats = useMemo(() => {
    const today = todayKey();
    return state.stats.find((s) => s.date === today) ?? { reviews: 0, minutes: 0, xp: 0 };
  }, [state.stats]);

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      update,
      reviewsDue,
      todayStats,
      addSrs,
      gradeSrs,
      logActivity,
      completeLesson,
      toggleFavorite,
      setNote,
      setTheme,
      setBackground,
      exportData,
      importData,
      resetData,
    }),
    [state, update, reviewsDue, todayStats, addSrs, gradeSrs, logActivity, completeLesson, toggleFavorite, setNote, setTheme, setBackground, exportData, importData, resetData],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

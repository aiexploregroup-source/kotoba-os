export type Theme = 'dark' | 'light';

export type Page =
  | 'dashboard'
  | 'backgrounds'
  | 'learn'
  | 'review'
  | 'kana'
  | 'kanji'
  | 'vocab'
  | 'grammar'
  | 'listening'
  | 'speaking'
  | 'dictionary'
  | 'immersion'
  | 'jlpt'
  | 'curriculum'
  | 'progress'
  | 'planner'
  | 'settings';

export interface Resource {
  id: string;
  category: string;
  group: string;
  name: string;
  provider: string;
  cost: string;
  level: string;
  bestFor: string;
  link: string;
}

export interface SrsItem {
  id: string;
  kind: 'kanji' | 'vocab' | 'grammar' | 'kana' | 'phrase';
  front: string;
  back: string;
  detail?: string;
  level: string;
  interval: number;
  ease: number;
  due: number;
  reps: number;
  lapses: number;
  added: number;
}

export interface Activity {
  id: string;
  date: number;
  type: 'review' | 'lesson' | 'speaking' | 'reading' | 'kanji' | 'grammar' | 'kana';
  label: string;
  xp: number;
}

export interface DailyStat {
  date: string;
  reviews: number;
  minutes: number;
  xp: number;
}

export interface BackgroundSettings {
  mode: 'default' | 'preset' | 'custom';
  presetId: string | null;
  image: string | null;
  opacity: number;
  dim: number;
  blur: number;
}

export interface AppState {
  version: number;
  name: string;
  theme: Theme;
  dailyGoal: number;
  streak: number;
  xp: number;
  level: number;
  lastActive: string;
  selectedLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  srs: SrsItem[];
  activity: Activity[];
  stats: DailyStat[];
  favorites: string[];
  completedLessons: string[];
  completedPhases: string[];
  notes: Record<string, string>;
  background: BackgroundSettings;
  settings: {
    sound: boolean;
    reduceMotion: boolean;
    autoAdvance: boolean;
    showFurigana: boolean;
  };
}

export interface KanaChar {
  char: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  example?: string;
}

export interface KanjiItem {
  char: string;
  meaning: string;
  kun: string[];
  on: string[];
  level: string;
  radical: string;
  strokes: number;
  mnemonic: string;
  examples: { word: string; reading: string; meaning: string }[];
}

export interface VocabItem {
  word: string;
  reading: string;
  meaning: string;
  level: string;
  tags: string[];
  example?: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  level: string;
  meaning: string;
  explanation: string;
  structure: string;
  examples: { jp: string; en: string }[];
  tags: string[];
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  minutes: number;
  xp: number;
  track: string;
  questions: Question[];
}

export type Question =
  | {
      id: string;
      type: 'choice';
      prompt: string;
      options: string[];
      answer: string;
      note?: string;
    }
  | {
      id: string;
      type: 'input';
      prompt: string;
      answer: string;
      note?: string;
    }
  | {
      id: string;
      type: 'speak';
      prompt: string;
      answer: string;
      note?: string;
    }
  | {
      id: string;
      type: 'listen';
      prompt: string;
      audio: string;
      answer: string;
      options: string[];
      note?: string;
    };

export interface Reading {
  id: string;
  title: string;
  level: string;
  minutes: number;
  source: string;
  body: { text: string; reading?: string }[];
  questions: { q: string; options: string[]; answer: string }[];
}

export interface StudyPhase {
  id: string;
  number: number;
  title: string;
  level: 'Foundation' | 'N5' | 'N4';
  duration: string;
  goal: string;
  dailyLoop: string[];
  topics: { title: string; detail: string; target: string }[];
  checkpoints: string[];
  drill: Page;
}

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  BarChart3, BookMarked, BookOpen, BrainCircuit, CalendarDays, ChevronRight,
  Flame, GraduationCap, Headphones, Home, Image as ImageIcon, Languages, LayoutGrid, MessageCircle,
  Moon, Play, Search, Settings, Sparkles, Sun, Target, X, Zap,
} from 'lucide-react';
import { useApp } from '../store';
import type { Page } from '../types';
import { BrandMark } from './Brand';

export const MOBILE_TITLES: Record<Page, string> = {
  dashboard: 'Home', learn: 'Learn', review: 'Review Studio', backgrounds: 'Backgrounds', kana: 'Kana Lab', kanji: 'Kanji Lab',
  vocab: 'Vocabulary', grammar: 'Grammar', listening: 'Listening', speaking: 'Speaking',
  dictionary: 'Dictionary', immersion: 'Resources', jlpt: 'JLPT', curriculum: 'Curriculum',
  progress: 'Progress', planner: 'Planner', settings: 'Settings',
};

type NavItem = { page: Page; label: string; icon: typeof Home; hint: string };

const groups: { label: string; items: NavItem[] }[] = [
  { label: 'Workspace', items: [
    { page: 'dashboard', label: 'Home', icon: Home, hint: 'Your daily command center' },
    { page: 'learn', label: 'Learn', icon: Play, hint: 'Lessons and progression path' },
    { page: 'review', label: 'Review', icon: BrainCircuit, hint: 'Spaced repetition queue' },
    { page: 'planner', label: 'Planner', icon: CalendarDays, hint: 'Build your study week' },
  ] },
  { label: 'Skills', items: [
    { page: 'kana', label: 'Kana Lab', icon: Languages, hint: 'Hiragana & katakana' },
    { page: 'kanji', label: 'Kanji Lab', icon: BookMarked, hint: 'All 2,136 Jōyō kanji' },
    { page: 'vocab', label: 'Vocabulary', icon: LayoutGrid, hint: 'Word collection' },
    { page: 'grammar', label: 'Grammar', icon: GraduationCap, hint: 'N5–N4 patterns' },
    { page: 'listening', label: 'Listening', icon: Headphones, hint: 'Audio & graded reading' },
    { page: 'speaking', label: 'Speaking', icon: MessageCircle, hint: 'Shadowing practice' },
  ] },
  { label: 'Discover', items: [
    { page: 'dictionary', label: 'Dictionary', icon: Search, hint: 'Look up any word' },
    { page: 'immersion', label: 'Resources', icon: BookOpen, hint: 'Curated learning sources' },
    { page: 'jlpt', label: 'JLPT', icon: Target, hint: 'Exam command center' },
    { page: 'curriculum', label: 'Curriculum', icon: GraduationCap, hint: 'Self-study roadmap to N4' },
  ] },
  { label: 'Insights', items: [
    { page: 'progress', label: 'Progress', icon: BarChart3, hint: 'Stats and achievements' },
    { page: 'settings', label: 'Settings', icon: Settings, hint: 'Preferences and data' },
    { page: 'backgrounds', label: 'Backgrounds', icon: ImageIcon, hint: 'Scenes, photos & custom crops' },
  ] },
];

const tabs: { page: Page; label: string; icon: typeof Home; primary?: boolean }[] = [
  { page: 'dashboard', label: 'Home', icon: Home },
  { page: 'learn', label: 'Learn', icon: Play },
  { page: 'review', label: 'Review', icon: BrainCircuit, primary: true },
  { page: 'progress', label: 'Progress', icon: BarChart3 },
];

/** Native-feeling mobile shell: compact header, thumb-friendly tabs, bottom sheet. */
export default function MobileShell({
  page, navigate, onSearch, children,
}: {
  page: Page;
  navigate: (page: Page) => void;
  onSearch: () => void;
  children: ReactNode;
}) {
  const { state, setTheme, reviewsDue } = useApp();
  const [moreOpen, setMoreOpen] = useState(false);
  const [sheetQuery, setSheetQuery] = useState('');
  const isHome = page === 'dashboard';
  const activeTab = tabs.some((tab) => tab.page === page) ? page : null;

  useEffect(() => { setMoreOpen(false); setSheetQuery(''); }, [page]);

  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMoreOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [moreOpen]);

  const filteredGroups = useMemo(() => {
    const q = sheetQuery.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(q)),
      }))
      .filter((group) => group.items.length > 0);
  }, [sheetQuery]);

  const go = (next: Page) => { setMoreOpen(false); navigate(next); };

  return (
    <div className="mobile-shell">
      <header className="m-header">
        <button className="m-avatar" onClick={() => go('settings')} aria-label="Open profile and settings">
          {state.name.slice(0, 1).toUpperCase() || 'L'}
        </button>
        <div className="m-header-copy">
          <strong>{isHome ? `こんにちは、${state.name}` : MOBILE_TITLES[page]}</strong>
          <span>{isHome ? `${state.streak} day streak · Level ${state.level} · ${state.selectedLevel}` : 'Kotoba OS'}</span>
        </div>
        <button className="m-header-chip" onClick={() => go('progress')} aria-label="View progress">
          <Flame size={15} /> {state.streak}
        </button>
        <button className="m-header-icon" onClick={onSearch} aria-label="Search">
          <Search size={19} />
        </button>
      </header>

      <main className="mobile-content">{children}</main>

      <nav className="m-tabs" aria-label="Primary navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const badge = tab.page === 'review' ? reviewsDue.length : 0;
          return (
            <button
              key={tab.page}
              className={`m-tab ${tab.primary ? 'm-tab-primary' : ''} ${activeTab === tab.page ? 'active' : ''}`}
              onClick={() => go(tab.page)}
            >
              <span className="m-tab-icon">
                <Icon size={tab.primary ? 23 : 21} strokeWidth={activeTab === tab.page ? 2.4 : 2} />
                {badge > 0 && <em>{badge > 99 ? '99+' : badge}</em>}
              </span>
              <span className="m-tab-label">{tab.label}</span>
            </button>
          );
        })}
        <button className={`m-tab ${moreOpen ? 'active' : ''}`} onClick={() => setMoreOpen(true)}>
          <span className="m-tab-icon"><LayoutGrid size={21} strokeWidth={moreOpen ? 2.4 : 2} /></span>
          <span className="m-tab-label">More</span>
        </button>
      </nav>

      {moreOpen && (
        <div className="m-sheet-backdrop" onMouseDown={() => setMoreOpen(false)}>
          <div className="m-sheet" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label="All tools">
            <div className="m-sheet-handle" />
            <div className="m-sheet-head">
              <div className="m-sheet-brand"><BrandMark size={30} /><div><strong>Kotoba OS</strong><span>Everything in one place</span></div></div>
              <button className="m-header-icon" onClick={() => setMoreOpen(false)} aria-label="Close"><X size={19} /></button>
            </div>
            <div className="m-sheet-search">
              <Search size={16} />
              <input autoFocus value={sheetQuery} onChange={(e) => setSheetQuery(e.target.value)} placeholder="Find a tool…" />
              {sheetQuery && <button onClick={() => setSheetQuery('')} aria-label="Clear"><X size={15} /></button>}
            </div>
            <div className="m-sheet-list">
              {filteredGroups.length === 0 && <p className="m-sheet-empty">No tools match “{sheetQuery}”.</p>}
              {filteredGroups.map((group) => (
                <section key={group.label} className="m-sheet-group">
                  <h3>{group.label}</h3>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button key={item.page} className={`m-sheet-item ${page === item.page ? 'active' : ''}`} onClick={() => go(item.page)}>
                        <span className={`m-sheet-item-icon tone-bg-${item.page === 'review' ? 'violet' : 'cyan'}`}><Icon size={18} /></span>
                        <span className="m-sheet-item-copy"><strong>{item.label}</strong><small>{item.hint}</small></span>
                        <ChevronRight size={16} className="m-sheet-chevron" />
                      </button>
                    );
                  })}
                </section>
              ))}
            </div>
            <div className="m-sheet-foot">
              <button onClick={() => setTheme(state.theme === 'dark' ? 'light' : 'dark')}>
                {state.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {state.theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
              <span><Sparkles size={14} /> {state.xp.toLocaleString()} XP</span>
              <span><Zap size={14} /> Lv {state.level}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BarChart3, BookMarked, BookOpen, BrainCircuit, CalendarDays, Command, Flame, GraduationCap,
  Headphones, Home, Image as ImageIcon, Languages, LayoutGrid, Menu, MessageCircle, Moon, PanelLeftClose, PanelLeftOpen,
  Play, Search, Settings, Sparkles, Sun, Target, Trophy, X, Zap,
} from 'lucide-react';
import { Toast } from './components';
import { BrandMark } from './components/Brand';
import MobileShell from './components/MobileShell';
import resourcesData from './data/resources.json';
import { MOBILE_QUERY, useMediaQuery } from './hooks/useMediaQuery';
import { PathProvider } from './lib/pathStore';
import Dashboard from './pages/Dashboard';
import MobileHome from './pages/MobileHome';
import MobileSettings from './pages/MobileSettings';
import Backgrounds from './pages/Backgrounds';
import { presetById } from './data/backgrounds';
import Learn from './pages/Learn';
import Review from './pages/Review';
import { Grammar, Kanji, Kana, Listening, Speaking, Vocabulary } from './pages/Skills';
import { Dictionary, Immersion, JLPT } from './pages/Discover';
import Curriculum from './pages/Curriculum';
import { Planner, Progress, Settings as SettingsPage } from './pages/Insights';
import { AppProvider, useApp } from './store';
import type { Page, Resource } from './types';

const resources = resourcesData as Resource[];
const NAV_COLLAPSE_KEY = 'kotoba-os-nav-collapsed-v1';

const navGroups: { label: string; items: { page: Page; label: string; icon: typeof Home }[] }[] = [
  { label: 'Workspace', items: [
    { page: 'dashboard', label: 'Dashboard', icon: Home },
    { page: 'learn', label: 'Learn', icon: Play },
    { page: 'review', label: 'Review', icon: BrainCircuit },
    { page: 'planner', label: 'Planner', icon: CalendarDays },
    { page: 'backgrounds', label: 'Backgrounds', icon: ImageIcon },
  ] },
  { label: 'Skills', items: [
    { page: 'kana', label: 'Kana Lab', icon: Languages },
    { page: 'kanji', label: 'Kanji Lab', icon: BookMarked },
    { page: 'vocab', label: 'Vocabulary', icon: LayoutGrid },
    { page: 'grammar', label: 'Grammar', icon: GraduationCap },
    { page: 'listening', label: 'Listening', icon: Headphones },
    { page: 'speaking', label: 'Speaking', icon: MessageCircle },
  ] },
  { label: 'Discover', items: [
    { page: 'dictionary', label: 'Dictionary', icon: Search },
    { page: 'immersion', label: 'Resources', icon: BookOpen },
    { page: 'jlpt', label: 'JLPT', icon: Target },
    { page: 'curriculum', label: 'N4 Curriculum', icon: GraduationCap },
  ] },
  { label: 'Insights', items: [
    { page: 'progress', label: 'Progress', icon: BarChart3 },
    { page: 'settings', label: 'Settings', icon: Settings },
  ] },
];

const titles: Record<Page, string> = {
  dashboard: 'Dashboard', learn: 'Learn', review: 'Review Studio', backgrounds: 'Background Studio', kana: 'Kana Lab', kanji: 'Kanji Lab',
  vocab: 'Vocabulary Vault', grammar: 'Grammar Studio', listening: 'Listening & Reading', speaking: 'Speaking Lab',
  dictionary: 'Dictionary Hub', immersion: 'Resource Library', jlpt: 'JLPT Command Center', curriculum: 'N4 Self-Study Curriculum',
  progress: 'Progress Studio', planner: 'Study Planner', settings: 'Settings',
};

function validPage(value: string): value is Page {
  return Object.prototype.hasOwnProperty.call(titles, value);
}

function Shell() {
  const { state, setTheme, reviewsDue } = useApp();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const bg = state.background;
  const bgImage = bg.mode === 'custom'
    ? bg.image
    : bg.mode === 'preset' ? presetById(bg.presetId)?.src ?? null : null;
  const [page, setPage] = useState<Page>(() => {
    const hash = window.location.hash.replace(/^#\/?/, '') || 'dashboard';
    return validPage(hash) ? hash : 'dashboard';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(() => window.localStorage.getItem(NAV_COLLAPSE_KEY) === 'true');
  const [palette, setPalette] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    window.localStorage.setItem(NAV_COLLAPSE_KEY, String(navCollapsed));
  }, [navCollapsed]);

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace(/^#\/?/, '') || 'dashboard';
      if (validPage(hash)) setPage(hash);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPalette((open) => !open);
      }
      if (event.key === 'Escape') {
        setPalette(false);
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navigate = useCallback((next: Page) => {
    window.location.hash = `/${next}`;
    setPage(next);
    setSidebarOpen(false);
    setPalette(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const commands = useMemo(() => {
    const pages = navGroups.flatMap((group) => group.items).map((item) => ({
      id: `page-${item.page}`, label: item.label, sub: `Open ${item.label}`, page: item.page, icon: item.icon,
    }));
    const resourceCommands = resources.slice(0, 120).map((r) => ({
      id: r.id, label: r.name, sub: `${r.group} · ${r.provider}`, page: 'immersion' as Page, icon: BookOpen,
    }));
    return [...pages, ...resourceCommands];
  }, []);

  const filteredCommands = useMemo(() => {
    const q = paletteQuery.toLowerCase().trim();
    if (!q) return commands.slice(0, 12);
    return commands.filter((c) => `${c.label} ${c.sub}`.toLowerCase().includes(q)).slice(0, 14);
  }, [commands, paletteQuery]);

  const notify = useCallback((message: string) => setToast(message), []);
  const props = { notify, navigate };

  const renderPage = () => {
    if (isMobile && page === 'dashboard') return <MobileHome {...props} />;
    if (isMobile && page === 'settings') return <MobileSettings {...props} />;
    switch (page) {
      case 'dashboard': return <Dashboard {...props} />;
      case 'learn': return <Learn {...props} />;
      case 'review': return <Review {...props} />;
      case 'backgrounds': return <Backgrounds {...props} />;
      case 'kana': return <Kana {...props} />;
      case 'kanji': return <Kanji {...props} />;
      case 'vocab': return <Vocabulary {...props} />;
      case 'grammar': return <Grammar {...props} />;
      case 'listening': return <Listening {...props} />;
      case 'speaking': return <Speaking {...props} />;
      case 'dictionary': return <Dictionary />;
      case 'immersion': return <Immersion {...props} />;
      case 'jlpt': return <JLPT />;
      case 'curriculum': return <Curriculum {...props} />;
      case 'progress': return <Progress {...props} />;
      case 'planner': return <Planner {...props} />;
      case 'settings': return <SettingsPage {...props} />;
      default: return <Dashboard {...props} />;
    }
  };

  return (
    <>
      {bgImage && (
        <div className="user-backdrop" aria-hidden="true" style={{
          backgroundImage: `url("${bgImage}")`,
          opacity: bg.opacity / 100,
          filter: `blur(${bg.blur}px)`,
        }}>
          <i style={{ background: `rgba(0,0,0,${bg.dim / 100})` }} />
        </div>
      )}
      {isMobile ? (
        <MobileShell page={page} navigate={navigate} onSearch={() => setPalette(true)}>
          {renderPage()}
        </MobileShell>
      ) : (
        <div className={`app-shell ${navCollapsed ? 'nav-collapsed' : ''}`}>
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="brand" onClick={() => navigate('dashboard')}>
          <div className="brand-mark"><BrandMark size={34} /></div>
          <div><strong>Kotoba OS</strong><span>Complete Japanese system</span></div>
        </div>
        <nav className="nav">
          {navGroups.map((group) => (
            <div key={group.label} className="nav-group">
              <div className="nav-label">{group.label}</div>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.page} className={`nav-item ${page === item.page ? 'active' : ''}`} onClick={() => navigate(item.page)} title={navCollapsed ? item.label : undefined}>
                    <Icon size={18} /><span>{item.label}</span>
                    {item.page === 'review' && reviewsDue.length > 0 && <em>{reviewsDue.length}</em>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="mini-progress">
            <div className="mini-progress-top"><Sparkles size={14} /><span>Level {state.level}</span></div>
            <div className="mini-bar"><i style={{ width: `${(state.xp % 500) / 5}%` }} /></div>
            <small>{500 - (state.xp % 500)} XP to next level</small>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="scrim" onClick={() => setSidebarOpen(false)} />}

      <div className="main-column">
        <header className="topbar">
          <button className="icon-btn mobile-menu" onClick={() => setSidebarOpen((v) => !v)} aria-label="Open menu"><Menu size={20} /></button>
          <button
            className="icon-btn desktop-collapse"
            onClick={() => setNavCollapsed((v) => !v)}
            aria-label={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            title={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            {navCollapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          </button>
          <div className="topbar-title"><span>{titles[page]}</span><small>Kotoba OS / {titles[page]}</small></div>
          <button className="topbar-search" onClick={() => setPalette(true)}>
            <Search size={16} /><span>Search anything…</span><kbd>Ctrl K</kbd>
          </button>
          <div className="topbar-actions">
            <div className="top-chip rose"><Flame size={15} /> {state.streak}</div>
            <div className="top-chip amber"><Zap size={15} /> {state.xp.toLocaleString()}</div>
            <div className="top-chip violet"><Trophy size={15} /> Lv {state.level}</div>
            <button className="icon-btn" onClick={() => setTheme(state.theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
              {state.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="avatar" onClick={() => navigate('settings')}>{state.name.slice(0, 1).toUpperCase() || 'L'}</button>
          </div>
        </header>
        <main className="content">{renderPage()}</main>
        <footer className="app-footer"><span>Kotoba OS · Built for complete Japanese learning</span><span>Local-first · {resources.length} curated resources · v1.0</span></footer>
      </div>
        </div>
      )}

      {palette && (
        <div className="palette-backdrop" onMouseDown={() => setPalette(false)}>
          <div className="palette" onMouseDown={(e) => e.stopPropagation()}>
            <div className="palette-input">
              <Search size={20} />
              <input autoFocus value={paletteQuery} onChange={(e) => setPaletteQuery(e.target.value)} placeholder="Jump to a tool, resource, or page…" />
              <button className="icon-btn" onClick={() => setPalette(false)}><X size={17} /></button>
            </div>
            <div className="palette-list">
              {filteredCommands.length === 0 && <div className="palette-empty">No matches found.</div>}
              {filteredCommands.map((command) => {
                const Icon = command.icon;
                return (
                  <button key={command.id} className="palette-item" onClick={() => navigate(command.page)}>
                    <Icon size={17} />
                    <div><strong>{command.label}</strong><span>{command.sub}</span></div>
                  </button>
                );
              })}
            </div>
            <div className="palette-foot"><span><Command size={13} /> K to open</span><span>ESC to close</span></div>
          </div>
        </div>
      )}
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PathProvider>
        <Shell />
      </PathProvider>
    </AppProvider>
  );
}

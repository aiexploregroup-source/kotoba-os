import {
  ArrowRight, BarChart3, BookMarked, BookOpen, BrainCircuit, Check,
  ChevronRight, Flame, GraduationCap, Headphones, Languages, LayoutGrid,
  MessageCircle, Play, Target, Trophy, Zap,
} from 'lucide-react';
import { ProgressRing } from '../components';
import { lessons } from '../data/content';
import { useApp } from '../store';
import type { Page } from '../types';
import type { PageProps } from '../pageTypes';

const skills: { label: string; value: number; tone: string; page: Page; icon: typeof Languages }[] = [
  { label: 'Kana', value: 82, tone: 'violet', page: 'kana', icon: Languages },
  { label: 'Kanji', value: 48, tone: 'cyan', page: 'kanji', icon: BookMarked },
  { label: 'Words', value: 61, tone: 'amber', page: 'vocab', icon: LayoutGrid },
  { label: 'Grammar', value: 42, tone: 'green', page: 'grammar', icon: GraduationCap },
  { label: 'Listening', value: 42, tone: 'cyan', page: 'listening', icon: Headphones },
  { label: 'Speaking', value: 27, tone: 'rose', page: 'speaking', icon: MessageCircle },
];

/** Compact, thumb-first home screen used by the mobile shell. */
export default function MobileHome({ navigate }: PageProps) {
  const { state, reviewsDue, todayStats } = useApp();
  const completed = new Set(state.completedLessons);
  const nextLesson = lessons.find((lesson) => !completed.has(lesson.id)) ?? lessons[0];
  const goalPct = Math.min(100, Math.round((todayStats.minutes / state.dailyGoal) * 100));
  const remaining = Math.max(0, state.dailyGoal - todayStats.minutes);

  const plan: { label: string; meta: string; page: Page; done: boolean }[] = [
    { label: 'Clear SRS reviews', meta: `${reviewsDue.length} cards due`, page: 'review', done: reviewsDue.length === 0 },
    { label: 'Continue your lesson', meta: nextLesson.title, page: 'learn', done: completed.has(nextLesson.id) },
    { label: 'Read Japanese today', meta: '5 min graded reading', page: 'listening', done: false },
    { label: 'Speak out loud', meta: 'Shadow a short phrase', page: 'speaking', done: false },
  ];

  return (
    <div className="m-home">
      <section className="m-focus">
        <ProgressRing value={todayStats.minutes} max={state.dailyGoal} size={94} label={`${todayStats.minutes}m`} sublabel="today" />
        <div className="m-focus-copy">
          <span className="m-eyebrow">Daily focus</span>
          <h2>{goalPct >= 100 ? 'Goal complete!' : `${remaining} min to go`}</h2>
          <p>{goalPct}% of your {state.dailyGoal}-minute target · {todayStats.xp} XP earned</p>
        </div>
        <div className="m-focus-streak"><Flame size={16} /> {state.streak}</div>
      </section>

      <div className="m-actions">
        <button className="m-action m-action-primary" onClick={() => navigate('review')}>
          <span className="m-action-icon"><BrainCircuit size={21} /></span>
          <span className="m-action-copy"><strong>Review cards</strong><small>{reviewsDue.length} due right now</small></span>
          <ArrowRight size={17} />
        </button>
        <button className="m-action" onClick={() => navigate('learn')}>
          <span className="m-action-icon"><Play size={21} /></span>
          <span className="m-action-copy"><strong>Continue lesson</strong><small>{nextLesson.title}</small></span>
          <ArrowRight size={17} />
        </button>
      </div>

      <section className="m-block">
        <div className="m-block-head">
          <h2>Today's plan</h2>
          <button onClick={() => navigate('planner')}>Planner <ChevronRight size={14} /></button>
        </div>
        <div className="m-plan">
          {plan.map((item) => (
            <button key={item.label} className="m-plan-row" onClick={() => navigate(item.page)}>
              <span className={`m-check ${item.done ? 'done' : ''}`}>{item.done && <Check size={13} />}</span>
              <span className="m-plan-copy"><strong>{item.label}</strong><small>{item.meta}</small></span>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      </section>

      <section className="m-block">
        <div className="m-block-head"><h2>Your skills</h2><span className="m-block-hint">Tap to train</span></div>
        <div className="m-skills">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <button key={skill.label} className="m-skill" onClick={() => navigate(skill.page)}>
                <span className={`m-skill-icon tone-bg-${skill.tone}`}><Icon size={19} /></span>
                <strong>{skill.label}</strong>
                <span className="m-skill-track"><i className={`tone-${skill.tone}`} style={{ width: `${skill.value}%` }} /></span>
                <small>{skill.value}%</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="m-block">
        <div className="m-block-head"><h2>Momentum</h2><button onClick={() => navigate('progress')}>Details <ChevronRight size={14} /></button></div>
        <div className="m-stats">
          <div className="m-stat"><Zap size={16} /><strong>{state.xp.toLocaleString()}</strong><span>Total XP</span></div>
          <div className="m-stat"><Trophy size={16} /><strong>Lv {state.level}</strong><span>Current level</span></div>
          <div className="m-stat"><BookOpen size={16} /><strong>{completed.size}</strong><span>Lessons done</span></div>
          <div className="m-stat"><Target size={16} /><strong>{state.srs.length}</strong><span>Cards saved</span></div>
        </div>
      </section>

      <button className="m-lesson" onClick={() => navigate('learn')}>
        <div className="m-lesson-top"><span className="m-eyebrow">Recommended</span><BarChart3 size={16} /></div>
        <strong>{nextLesson.title}</strong>
        <span>{nextLesson.level} · {nextLesson.minutes} min · +{nextLesson.xp} XP</span>
        <span className="m-lesson-cta">Start lesson <ArrowRight size={15} /></span>
      </button>
    </div>
  );
}

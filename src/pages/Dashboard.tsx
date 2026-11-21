import { ArrowUpRight, BookOpen, BrainCircuit, CheckCircle2, Flame, Globe2, Headphones, Layers, MessageCircle, Play, Sparkles, Target, Trophy, Zap } from 'lucide-react';
import { Badge, Button, Card, CheckRow, ListItem, ProgressBar, ProgressRing, SectionHeader, StatCard } from '../components';
import { lessons, pathways } from '../data/content';
import { useApp } from '../store';
import type { PageProps } from '../pageTypes';

const pathwayIcons: Record<string, typeof Sparkles> = {
  Sparkles,
  Layers,
  BookOpen,
  Globe2,
};

export default function Dashboard({ navigate }: PageProps) {
  const { state, reviewsDue, todayStats } = useApp();
  const completed = new Set(state.completedLessons);
  const nextLesson = lessons.find((lesson) => !completed.has(lesson.id)) ?? lessons[0];
  const goalPct = Math.min(100, Math.round((todayStats.minutes / state.dailyGoal) * 100));

  const plan = [
    { label: 'Clear SRS reviews', meta: `${reviewsDue.length} cards due`, page: 'review' as const, done: reviewsDue.length === 0, icon: <BrainCircuit size={17} /> },
    { label: 'Continue your lesson', meta: nextLesson.title, page: 'learn' as const, done: completed.has(nextLesson.id), icon: <Play size={17} /> },
    { label: 'Read Japanese today', meta: '5 min graded reading', page: 'listening' as const, done: false, icon: <BookOpen size={17} /> },
    { label: 'Speak out loud', meta: 'Shadow a short phrase', page: 'speaking' as const, done: false, icon: <MessageCircle size={17} /> },
  ];

  return (
    <div className="page dashboard-page">
      <section className="hero card">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="eyebrow">Your Japanese command center</div>
          <h1>こんにちは、{state.name} <span className="wave">👋</span></h1>
          <p>Everything you need to learn Japanese — lessons, kanji, grammar, listening, speaking, immersion, and progress — unified in one calm, premium workspace.</p>
          <div className="hero-actions">
            <Button onClick={() => navigate('review')} size="lg"><Zap size={17} /> Review {reviewsDue.length || ''} cards</Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('learn')}><Play size={17} /> Continue learning</Button>
          </div>
          <div className="hero-chips">
            <span><Flame size={14} /> {state.streak} day streak</span>
            <span><Trophy size={14} /> Level {state.level}</span>
            <span><Sparkles size={14} /> {state.xp.toLocaleString()} XP</span>
          </div>
        </div>
        <div className="hero-ring">
          <ProgressRing value={todayStats.minutes} max={state.dailyGoal} size={166} label={`${todayStats.minutes}m`} sublabel="of daily goal" />
          <div className="ring-caption">{goalPct}% of today's target</div>
        </div>
      </section>

      <section className="stat-grid">
        <StatCard icon={<Flame size={20} />} label="Current streak" value={`${state.streak} days`} delta="Keep it alive today" tone="rose" />
        <StatCard icon={<BrainCircuit size={20} />} label="Cards due" value={reviewsDue.length} delta={`${state.srs.length} in your collection`} tone="violet" />
        <StatCard icon={<BookOpen size={20} />} label="Lessons done" value={completed.size} delta={`${lessons.length} available`} tone="cyan" />
        <StatCard icon={<Target size={20} />} label="Today's XP" value={`+${todayStats.xp}`} delta={`${todayStats.minutes} focused minutes`} tone="amber" />
      </section>

      <div className="dashboard-grid">
        <Card className="span-7">
          <SectionHeader eyebrow="Today" title="Your daily plan" subtitle="Small, deliberate actions compound fast." action={<Button variant="ghost" size="sm" onClick={() => navigate('planner')}>Open planner <ArrowUpRight size={14} /></Button>} />
          <div className="plan-list">
            {plan.map((item) => (
              <ListItem
                key={item.label}
                icon={item.icon}
                title={item.label}
                subtitle={item.meta}
                meta={item.done ? <Badge tone="green">Done</Badge> : <Badge tone="slate">Next</Badge>}
                onClick={() => navigate(item.page)}
              />
            ))}
          </div>
        </Card>

        <Card className="span-5">
          <SectionHeader eyebrow="Momentum" title="Skill balance" subtitle="A complete learner trains every layer." />
          <div className="skill-list">
            {[
              { label: 'Kana', value: 82, tone: 'violet' },
              { label: 'Kanji', value: 48, tone: 'cyan' },
              { label: 'Grammar', value: 61, tone: 'amber' },
              { label: 'Listening', value: 42, tone: 'green' },
              { label: 'Speaking', value: 27, tone: 'rose' },
            ].map((skill) => (
              <ProgressBar key={skill.label} label={skill.label} value={skill.value} tone={skill.tone} />
            ))}
          </div>
          <div className="coach-note">
            <CheckCircle2 size={18} />
            <div><strong>Coach insight</strong><span>Speaking is your lowest layer. Add one 10-minute shadowing session today.</span></div>
          </div>
        </Card>
      </div>

      <section>
        <SectionHeader eyebrow="Learning paths" title="Choose your route" subtitle="Each path combines lessons, SRS, input, and output." />
        <div className="path-grid">
          {pathways.map((path) => {
            const Icon = pathwayIcons[path.icon] ?? Sparkles;
            const target = path.id === 'pw-immersion' ? 'immersion' : path.id === 'pw-n4' ? 'jlpt' : 'learn';
            return (
              <Card key={path.id} className="path-card" onClick={() => navigate(target)}>
                <div className="path-top">
                  <div className="path-icon" style={{ color: path.color, background: `${path.color}1f` }}><Icon size={22} /></div>
                  <ArrowUpRight size={16} className="muted" />
                </div>
                <h3>{path.title}</h3>
                <p>{path.subtitle}</p>
                <div className="path-levels">
                  {path.levels.slice(0, 3).map((level) => <CheckRow key={level}>{level}</CheckRow>)}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="dashboard-grid">
        <Card className="span-7">
          <SectionHeader eyebrow="Continue" title="Recommended lesson" subtitle="Picked from your current path." />
          <div className="feature-lesson">
            <div className="lesson-orb"><Headphones size={28} /></div>
            <div className="feature-lesson-body">
              <div className="eyebrow">{nextLesson.level} · {nextLesson.minutes} min · +{nextLesson.xp} XP</div>
              <h3>{nextLesson.title}</h3>
              <p>{nextLesson.subtitle}</p>
              <ProgressBar value={completed.has(nextLesson.id) ? 100 : 0} label="Progress" tone="violet" />
            </div>
            <Button onClick={() => navigate('learn')}>Start <ArrowUpRight size={15} /></Button>
          </div>
        </Card>
        <Card className="span-5">
          <SectionHeader eyebrow="Activity" title="Recent wins" />
          <div className="activity-list">
            {state.activity.slice(0, 4).map((item) => (
              <div key={item.id} className="activity-row">
                <div className={`activity-dot dot-${item.type}`} />
                <div>
                  <strong>{item.label}</strong>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <Badge tone="green">+{item.xp}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

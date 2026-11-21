import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { Check, ChevronRight, X } from 'lucide-react';

export function Card({ children, className = '', onClick, style }: { children: ReactNode; className?: string; onClick?: () => void; style?: CSSProperties }) {
  return (
    <div className={`card ${className}`} style={style} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {children}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Badge({ children, tone = 'violet' }: { children: ReactNode; tone?: 'violet' | 'cyan' | 'amber' | 'green' | 'rose' | 'slate' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function Pill({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button className={`pill ${active ? 'active' : ''}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export function Button({ children, onClick, variant = 'primary', size = 'md', disabled, type = 'button', className = '', style }: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <button className={`btn btn-${variant} btn-${size} ${className}`} style={style} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
}

export function ProgressBar({ value, max = 100, tone = 'violet', label, className = '' }: { value: number; max?: number; tone?: string; label?: string; className?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`progress-wrap ${className}`}>
      {label && <div className="progress-label"><span>{label}</span><span>{Math.round(pct)}%</span></div>}
      <div className="progress-track">
        <div className={`progress-fill tone-${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function ProgressRing({ value, max = 100, size = 96, label, sublabel }: { value: number; max?: number; size?: number; label?: string; sublabel?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="ring-svg">
        <circle cx={size / 2} cy={size / 2} r={radius} className="ring-bg" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="ring-fg"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * pct) / 100}
        />
      </svg>
      <div className="ring-center">
        <strong>{label ?? `${Math.round(pct)}%`}</strong>
        {sublabel && <span>{sublabel}</span>}
      </div>
    </div>
  );
}

export function StatCard({ icon, label, value, delta, tone = 'violet' }: { icon: ReactNode; label: string; value: string | number; delta?: string; tone?: string }) {
  return (
    <Card className="stat-card">
      <div className={`stat-icon tone-bg-${tone}`}>{icon}</div>
      <div className="stat-body">
        <span>{label}</span>
        <strong>{value}</strong>
        {delta && <small>{delta}</small>}
      </div>
    </Card>
  );
}

export function Modal({ open, onClose, title, children, width = '560px' }: { open: boolean; onClose: () => void; title: string; children: ReactNode; width?: string }) {
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" style={{ maxWidth: width }} onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, text, action }: { icon: ReactNode; title: string; text: string; action?: ReactNode }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}

export function CheckRow({ children }: { children: ReactNode }) {
  return <div className="check-row"><Check size={15} /> <span>{children}</span></div>;
}

export function ListItem({ title, subtitle, meta, icon, onClick, trailing, active = false }: { title: string; subtitle?: string; meta?: ReactNode; icon?: ReactNode; onClick?: () => void; trailing?: ReactNode; active?: boolean }) {
  return (
    <div className={`list-item ${active ? 'active' : ''}`} onClick={onClick} role={onClick ? 'button' : undefined}>
      {icon && <div className="list-icon">{icon}</div>}
      <div className="list-main">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </div>
      {meta && <div className="list-meta">{meta}</div>}
      {trailing ?? (onClick && <ChevronRight size={16} className="muted" />)}
    </div>
  );
}

export function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 2600);
    return () => window.clearTimeout(timer);
  }, [message, onDone]);
  return <div className="toast"><Check size={16} /> {message}</div>;
}

import type { ReactNode } from 'react';
import s from './riservata.module.css';
import { cx, accentVar } from './types';

export interface RaStatCardProps {
  value: ReactNode;
  label: string;
  accent?: string;
  hint?: ReactNode;
  className?: string;
}

export function RaStatCard({ value, label, accent, hint, className }: RaStatCardProps) {
  return (
    <div className={cx(s.stat, className)} style={accentVar(accent)}>
      <span className={s.statValue}>{value}</span>
      <span className={s.statLabel}>{label}</span>
      {hint && <span className={s.statHint}>{hint}</span>}
    </div>
  );
}

export function RaStatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(s.statGrid, className)}>{children}</div>;
}

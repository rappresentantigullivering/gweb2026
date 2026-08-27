import type { ReactNode } from 'react';
import s from './riservata.module.css';
import { cx, accentVar } from './types';

export type RaBadgeTone = 'neutral' | 'accent' | 'success' | 'danger' | 'warning';

export interface RaBadgeProps {
  tone?: RaBadgeTone;
  /** Colore esplicito: usato per i badge dei ruoli, che hanno tinta propria. */
  accent?: string;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

export function RaBadge({ tone = 'neutral', accent, dot = false, className, children }: RaBadgeProps) {
  const effectiveTone = accent ? 'accent' : tone;
  return (
    <span className={cx(s.badge, s[`badge_${effectiveTone}`], className)} style={accentVar(accent)}>
      {dot && <span className={s.badgeDot} />}
      {children}
    </span>
  );
}

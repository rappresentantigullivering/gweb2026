import type { ReactNode } from 'react';
import s from './riservata.module.css';
import { cx } from './types';

export type RaAlertTone = 'error' | 'success' | 'warning' | 'info';

export interface RaAlertProps {
  tone: RaAlertTone;
  title?: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const DEFAULT_ICON: Record<RaAlertTone, ReactNode> = {
  error: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

export function RaAlert({ tone, title, icon, className, children }: RaAlertProps) {
  return (
    <div className={cx(s.alert, s[`alert_${tone}`], className)} role={tone === 'error' ? 'alert' : 'status'}>
      <span className={s.alertIcon}>{icon ?? DEFAULT_ICON[tone]}</span>
      <span className={s.alertBody}>
        {title && <strong className={s.alertTitle}>{title}</strong>}
        {children}
      </span>
    </div>
  );
}

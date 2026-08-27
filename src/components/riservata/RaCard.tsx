import type { ReactNode } from 'react';
import s from './riservata.module.css';
import { cx, accentVar } from './types';

export interface RaCardProps {
  as?: 'div' | 'section' | 'article';
  /** Ricolora il sottoalbero: e' cosi' che le card dell'hub si tingono. */
  accent?: string;
  interactive?: boolean;
  topBar?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  href?: string;
  className?: string;
  children: ReactNode;
}

export function RaCard({
  as = 'div',
  accent,
  interactive = false,
  topBar = false,
  padding = 'md',
  href,
  className,
  children,
}: RaCardProps) {
  const cls = cx(
    s.card,
    padding !== 'none' && s[`cardPad_${padding}`],
    interactive && s.cardInteractive,
    topBar && s.cardTopBar,
    className,
  );

  if (href) {
    return (
      <a className={cls} style={accentVar(accent)} href={href}>
        {children}
      </a>
    );
  }

  const Tag = as;
  return (
    <Tag className={cls} style={accentVar(accent)}>
      {children}
    </Tag>
  );
}

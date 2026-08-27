'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import s from './riservata.module.css';
import { cx } from './types';
import type { CSSVars } from './types';
import { AREA_ACCENT, AREA_TITLE, type AreaId } from './areas';
import { RaFeedbackHost } from './RaFeedbackHost';

export interface RaPageProps {
  area: AreaId;
  /** Titolo della scheda del browser. Se assente usa quello dell'area. */
  title?: string;
  /** Centra il contenuto: login, schermate di caricamento, accesso negato. */
  center?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Guscio di ogni pagina dell'area riservata.
 *
 * Porta i token, l'alone colorato (che prima erano nove <div class="bg-glow">
 * nel DOM), la tipografia scura senza !important, e l'host di notifiche e
 * conferme. L'accento dell'area viene scritto qui inline: e' l'unico punto
 * del sistema in cui `--ra-accent` viene assegnata.
 */
export function RaPage({ area, title, center = false, className, children }: RaPageProps) {
  useEffect(() => {
    document.title = `${title ?? AREA_TITLE[area]} · Gulliver`;
  }, [area, title]);

  return (
    <div
      className={cx(s.scope, center && s.scopeCenter, className)}
      data-ra="true"
      data-area={area}
      style={{ ['--ra-accent']: AREA_ACCENT[area] } as CSSVars}
    >
      {children}
      <RaFeedbackHost />
    </div>
  );
}

export function RaContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(s.container, className)}>{children}</div>;
}

export function RaMain({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cx(s.container, s.main, 'animate-fade-up', className)}>{children}</main>;
}

export function RaSection({
  title,
  children,
  className,
  actions,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={cx(s.section, className)}>
      {(title || actions) && (
        <div className={s.toolbar}>
          {title && <h2 className={s.sectionTitle}>{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function RaToolbar({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx(s.toolbar, className)}>{children}</div>;
}

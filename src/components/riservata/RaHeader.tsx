'use client';

import type { ReactNode } from 'react';
import s from './riservata.module.css';
import { cx } from './types';
import { AREA_HOST, AREA_LABEL, type AreaId } from './areas';
import { RaButton } from './RaButton';
import { useDashboardUrl, logout } from './navigation';

export interface RaHeaderProps {
  area: AreaId;
  /** Testo accanto al logo. Se assente usa l'etichetta dell'area. */
  label?: string;
  /** Riga di contesto a destra del titolo, es. l'utente collegato. */
  meta?: ReactNode;
  /** Mostra "← Dashboard". Su `tesserati` non ha senso: e' gia' l'hub. */
  showBack?: boolean;
  showLogout?: boolean;
  showHost?: boolean;
  sticky?: boolean;
  /** Contenuto extra fra le azioni, es. le tab di comunicazione. */
  children?: ReactNode;
}

export function RaHeader({
  area,
  label,
  meta,
  showBack = true,
  showLogout = false,
  showHost = true,
  sticky = true,
  children,
}: RaHeaderProps) {
  const backHref = useDashboardUrl();

  return (
    <header className={cx(s.header, sticky && s.headerSticky)}>
      <div className={s.headerInner}>
        <div className={s.headerSide}>
          {showBack && (
            <RaButton as="a" variant="ghost" size="sm" href={backHref}>
              ← Dashboard
            </RaButton>
          )}
          <div className={s.brand}>
            <span className={s.brandTitle}>GULLIVER</span>
            <span className={s.brandDot} />
            <span className={s.brandSub}>{label ?? AREA_LABEL[area]}</span>
          </div>
          {meta && <span className={s.headerMeta}>{meta}</span>}
        </div>

        <div className={s.headerActions}>
          {children}
          {showHost && <span className={s.hostBadge}>{AREA_HOST[area]}</span>}
          {showLogout && (
            <RaButton variant="ghost" size="sm" onClick={() => void logout()}>
              Esci
            </RaButton>
          )}
        </div>
      </div>
    </header>
  );
}

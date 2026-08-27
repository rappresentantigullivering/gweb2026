'use client';

import React from 'react';
import { RaPage, RaCard, RaButton, useDashboardUrl } from '@/components/riservata';
import auth from '../auth.module.css';

export default function UnauthorizedPage() {
  const dashboardHref = useDashboardUrl();

  return (
    <RaPage area="tesserati" title="Accesso negato" center>
      <RaCard padding="lg" className={`${auth.authCard} ${auth.centeredText} animate-fade-up`}>
        <div className={auth.statusIcon} style={{ ['--icon-color' as string]: 'var(--red-primary)' } as React.CSSProperties}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h1 className={auth.authTitle}>Accesso negato</h1>
        <div className={auth.dividerAccent} />
        <p className={auth.authDesc}>
          Il tuo account non ha i permessi richiesti per accedere a questo portale. Se ritieni
          che sia un errore, contatta l&apos;amministratore per farti assegnare il ruolo
          corrispondente.
        </p>

        <div style={{ marginTop: '1.75rem' }}>
          {/* Qui "torna alla dashboard" e' l'azione principale, non un rimando
              discreto come nelle altre pagine: resta quindi un pulsante pieno. */}
          <RaButton variant="primary" size="lg" block as="a" href={dashboardHref}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Torna alla dashboard
          </RaButton>
        </div>
      </RaCard>
    </RaPage>
  );
}

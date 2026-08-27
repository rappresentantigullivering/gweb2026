'use client';

import React, { useState, useEffect } from 'react';
import {
  RaPage, RaCard, RaButton, RaLoadingScreen, RaEmptyState,
  requireSession, redirectToUnauthorized, useDashboardUrl,
} from '@/components/riservata';
import styles from './page.module.css';

export default function DirettivoPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const dashboardHref = useDashboardUrl();

  useEffect(() => {
    async function checkAuth() {
      const session = await requireSession();
      if (!session) return; // requireSession ha gia' avviato il rimando al login
      if (session.roles.includes('direttivo') || session.roles.includes('admin')) {
        setIsAuthenticated(true);
      } else {
        redirectToUnauthorized();
      }
    }
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <RaPage area="direttivo" center>
        <RaLoadingScreen message="Verifica autorizzazione in corso…" />
      </RaPage>
    );
  }

  return (
    <RaPage area="direttivo" center>
      <RaCard padding="lg" className={`${styles.card} animate-fade-up`}>
        <RaEmptyState
          icon={
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
          title="Portale Direttivo"
          description="Questa sezione è riservata ai membri dell'organo Direttivo di Gulliver Ancona. Qui verranno pubblicati i verbali delle riunioni, lo statuto, i bilanci e altri documenti riservati."
          action={
            <div className={styles.actions}>
              <span className={styles.status}>
                <span className={styles.statusDot} />
                Sezione in fase di implementazione
              </span>
              <RaButton variant="accent" size="lg" as="a" href={dashboardHref}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Torna alla dashboard
              </RaButton>
            </div>
          }
        />
      </RaCard>
    </RaPage>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import {
  RaPage, RaContainer, RaButton, RaCard, RaEmptyState, RaLoadingScreen,
  AREA_ACCENT, AREA_HOST, areaUrl, requireSession, logout, useIsClient,
  type AreaId,
} from '@/components/riservata';
import styles from './page.module.css';

interface UserProfile {
  username: string;
  roles: string[];
}

interface ServiceCard {
  /** Ruolo RBAC che sblocca la card (per `tesserati` non esiste una card). */
  role: string;
  area: Exclude<AreaId, 'tesserati'>;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const SERVICES: ServiceCard[] = [
  {
    role: 'admin',
    area: 'admin',
    title: 'Gestione Utenti',
    subtitle: 'Configura gli account, imposta le password e gestisci i ruoli dei tesserati Gulliver.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    role: 'appunti',
    area: 'appunti',
    title: 'Consultazione Appunti',
    subtitle: 'Accedi al database completo e consulta gli appunti universitari caricati dagli studenti.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    role: 'popup',
    area: 'popup',
    title: 'Gestione Popup',
    subtitle: 'Modifica il testo, attiva o disattiva il banner avvisi visibile a tutti gli utenti sulla home page.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="15" />
        <line x1="15" y1="9" x2="9" y2="15" />
      </svg>
    ),
  },
  {
    role: 'forms',
    area: 'forms',
    title: 'Moduli e Form',
    subtitle: 'Configura, crea, monitora e apri le iscrizioni ai form studenteschi pubblici di Gulliver.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    role: 'comunicazione',
    area: 'comunicazione',
    title: 'Programmazione Post',
    subtitle: 'Pianifica le comunicazioni, le grafiche e organizza il calendario editoriale dei canali Gulliver.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    role: 'direttivo',
    area: 'direttivo',
    title: 'Portale Direttivo',
    subtitle: "Spazio riservato ai verbali, documenti interni e comunicati ufficiali dell'organo Direttivo.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function CockpitPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    async function checkAuth() {
      const session = await requireSession();
      if (session) setUser(session);
      setLoading(false);
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
  };

  const activeServices = SERVICES.filter(
    (service) => user?.roles.includes('admin') || user?.roles.includes(service.role),
  );

  if (loading) {
    return (
      <RaPage area="tesserati" center>
        <RaLoadingScreen message="Verifica dell'identità in corso…" />
      </RaPage>
    );
  }

  return (
    <RaPage area="tesserati">
      <RaContainer className={styles.header}>
        <div className={styles.headerInfo}>
          <span className={styles.userBadge}>Tesserato Gulliver</span>
          <h1 className={styles.greeting}>
            Ciao, <span className={styles.username}>{user?.username}</span>
          </h1>
          <p className={styles.subtitle}>Seleziona lo strumento a cui desideri accedere</p>
        </div>

        <RaButton variant="outline" onClick={handleLogout} disabled={loggingOut} loading={loggingOut}>
          {loggingOut ? 'Uscita…' : 'Disconnetti'}
          {!loggingOut && (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          )}
        </RaButton>
      </RaContainer>

      <RaContainer>
        {activeServices.length > 0 ? (
          <div className={`${styles.grid} animate-fade-up`}>
            {activeServices.map((service) => (
              <RaCard
                key={service.area}
                accent={AREA_ACCENT[service.area]}
                interactive
                topBar
                padding="lg"
                /* L'indirizzo dipende dall'host, che sul server non esiste:
                   resta indefinito fino al montaggio per non disallineare
                   l'idratazione. */
                href={isClient ? areaUrl(service.area) : undefined}
                className={styles.serviceCard}
              >
                <span className={styles.serviceIcon}>{service.icon}</span>
                <h2 className={styles.serviceTitle}>{service.title}</h2>
                <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                <span className={styles.serviceFooter}>
                  <span className={styles.serviceHost}>{AREA_HOST[service.area]}</span>
                  <span className={styles.serviceArrow}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </span>
              </RaCard>
            ))}
          </div>
        ) : (
          <RaCard padding="none" className={`${styles.emptyCard} animate-fade-up`}>
            <RaEmptyState
              icon={
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              title="Nessun servizio attivo"
              description="Il tuo account è stato creato con successo, ma non hai ancora permessi operativi associati. Contatta un amministratore per abilitare l'accesso ai sottodomini."
            />
          </RaCard>
        )}
      </RaContainer>
    </RaPage>
  );
}

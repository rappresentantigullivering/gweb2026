'use client';

import React, { useState, useEffect } from 'react';
import VotingModal from '@/components/VotingModal';
import {
  RaPage, RaMain, RaHeader, RaCard, RaButton, RaField, RaInput, RaTextarea,
  RaToggle, RaBadge, RaLoadingScreen, raToast,
  requireSession, redirectToUnauthorized,
} from '@/components/riservata';
import styles from './page.module.css';

export default function PopupPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [popupActive, setPopupActive] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupText, setPopupText] = useState('');
  const [popupPrimaryBtnText, setPopupPrimaryBtnText] = useState('');
  const [popupPrimaryBtnUrl, setPopupPrimaryBtnUrl] = useState('');
  const [popupSecondaryBtnText, setPopupSecondaryBtnText] = useState('');
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        setPopupActive(data.popupActive);
        setPopupTitle(data.popupTitle || 'Hai votato?');
        setPopupText(data.popupText || 'Hai ancora tempo, le votazioni chiudono tra:');
        setPopupPrimaryBtnText(data.popupPrimaryBtnText || 'Vai al voto');
        setPopupPrimaryBtnUrl(data.popupPrimaryBtnUrl || 'https://uvote2.cineca.it/static/redir.html?idp=samlUnivpm');
        setPopupSecondaryBtnText(data.popupSecondaryBtnText || 'Sì, ho già votato');
      } catch (e) {
        console.error('Failed to load settings:', e);
        raToast('Impossibile caricare le impostazioni.', 'error');
      }
    }

    async function checkAuth() {
      const session = await requireSession();
      if (!session) return;
      if (session.roles.includes('popup') || session.roles.includes('admin')) {
        setIsAuthenticated(true);
        await fetchSettings();
      } else {
        redirectToUnauthorized();
      }
    }
    checkAuth();
  }, []);

  const handleTogglePopup = async (val: boolean) => {
    setSettingsLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updatePopup', popupActive: val }),
      });
      if (res.ok) {
        setPopupActive(val);
        raToast(val ? 'Pop-up attivato.' : 'Pop-up disattivato.', 'success');
      } else {
        raToast('Errore aggiornamento.', 'error');
      }
    } catch {
      raToast('Errore di connessione.', 'error');
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleSavePopupSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updatePopup',
          popupActive,
          popupTitle,
          popupText,
          popupPrimaryBtnText,
          popupPrimaryBtnUrl,
          popupSecondaryBtnText,
        }),
      });
      if (res.ok) {
        raToast('Impostazioni pop-up salvate con successo.', 'success');
      } else {
        raToast('Errore salvataggio impostazioni.', 'error');
      }
    } catch {
      raToast('Errore di connessione.', 'error');
    } finally {
      setSettingsLoading(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <RaPage area="popup" center>
        <RaLoadingScreen message="Verifica autorizzazione in corso…" />
      </RaPage>
    );
  }

  return (
    <RaPage area="popup">
      <RaHeader area="popup" label="Gestione Pop-up" />

      <RaMain className={styles.main}>
        <RaCard padding="lg">
          <div className={styles.cardHead}>
            <span className={styles.icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </span>
            <div>
              <h2 className={styles.cardTitle}>Visibilità e contenuti</h2>
              <p className={styles.cardDesc}>
                Abilita o disabilita il modal popup degli avvisi (es. votazioni rappresentanti)
                mostrato in homepage.
              </p>
            </div>
          </div>

          <div className={styles.statusBox}>
            <div className={styles.statusInfo}>
              <span className={styles.statusTitle}>Stato pop-up</span>
              <RaBadge tone={popupActive ? 'success' : 'neutral'} dot>
                {popupActive ? 'Attivo e visibile sul sito' : 'Disattivato / nascosto'}
              </RaBadge>
            </div>

            <RaToggle
              checked={popupActive}
              onChange={handleTogglePopup}
              disabled={settingsLoading}
              label={popupActive ? 'Disattiva il pop-up' : 'Attiva il pop-up'}
            />
          </div>

          <div className={styles.actions}>
            <RaButton variant="outline" block onClick={() => setShowPopupEdit(!showPopupEdit)}>
              {showPopupEdit ? 'Nascondi editor' : 'Modifica testi del pop-up'}
            </RaButton>

            {showPopupEdit && (
              <form onSubmit={handleSavePopupSettings} className={`${styles.editor} animate-fade`}>
                <RaField label="Titolo del pop-up" htmlFor="popupTitle">
                  <RaInput id="popupTitle" required type="text" value={popupTitle}
                    onChange={(e) => setPopupTitle(e.target.value)} placeholder="es. Hai votato?" />
                </RaField>

                <RaField label="Testo / contenuto" htmlFor="popupText">
                  <RaTextarea id="popupText" required rows={3} value={popupText}
                    onChange={(e) => setPopupText(e.target.value)}
                    placeholder="es. Clicca qui per accedere al seggio telematico…" />
                </RaField>

                <RaField label="Testo bottone principale" htmlFor="popupPrimaryBtnText">
                  <RaInput id="popupPrimaryBtnText" required type="text" value={popupPrimaryBtnText}
                    onChange={(e) => setPopupPrimaryBtnText(e.target.value)} placeholder="es. Vai al voto" />
                </RaField>

                <RaField label="Link bottone principale" htmlFor="popupPrimaryBtnUrl">
                  <RaInput id="popupPrimaryBtnUrl" required type="url" value={popupPrimaryBtnUrl}
                    onChange={(e) => setPopupPrimaryBtnUrl(e.target.value)} placeholder="https://esempio.it" />
                </RaField>

                <RaField label="Testo bottone secondario" htmlFor="popupSecondaryBtnText">
                  <RaInput id="popupSecondaryBtnText" required type="text" value={popupSecondaryBtnText}
                    onChange={(e) => setPopupSecondaryBtnText(e.target.value)} placeholder="es. Sì, ho già votato" />
                </RaField>

                <RaButton type="submit" variant="accent" size="lg" block
                  disabled={settingsLoading} loading={settingsLoading}>
                  {settingsLoading ? 'Salvataggio…' : 'Salva impostazioni'}
                </RaButton>
              </form>
            )}

            <RaButton
              variant="subtle"
              block
              onClick={() => {
                // Rimonta il modal per rileggere i valori correnti.
                setShowPreview(false);
                setTimeout(() => setShowPreview(true), 10);
              }}
            >
              Visualizza anteprima
            </RaButton>
          </div>
        </RaCard>
      </RaMain>

      {showPreview && (
        <div className={styles.previewOverlay}>
          <VotingModal
            forceShow
            previewTitle={popupTitle}
            previewText={popupText}
            previewPrimaryBtnText={popupPrimaryBtnText}
            previewPrimaryBtnUrl={popupPrimaryBtnUrl}
            previewSecondaryBtnText={popupSecondaryBtnText}
          />
          <button onClick={() => setShowPreview(false)} className={styles.previewClose}>
            Chiudi anteprima
          </button>
        </div>
      )}
    </RaPage>
  );
}

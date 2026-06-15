'use client';

import React, { useState, useEffect } from 'react';
import VotingModal from '@/components/VotingModal';

const COLORS = {
  bg: '#080810',
  surface: 'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.12)',
  accent: '#e40329',
  accentGlow: 'rgba(228,3,41,0.25)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.7)',
  textMuted: 'rgba(255,255,255,0.45)',
  green: '#4ade80',
  red: '#f87171',
};

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
  const [notification, setNotification] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const notify = (msg: string, type: 'ok' | 'err') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchSettings = async () => {
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
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated === true && (data.roles.includes('popup') || data.roles.includes('admin'))) {
          setIsAuthenticated(true);
          await fetchSettings();
        } else {
          redirectToLogin();
        }
      } else {
        redirectToLogin();
      }
    } catch {
      redirectToLogin();
    }
  };

  const redirectToLogin = () => {
    const host = window.location.host;
    const devPort = host.split(':')[1] || '3000';
    const protocol = window.location.protocol;
    const loginHost = host.includes('localhost')
      ? `tesserati.localhost:${devPort}`
      : 'tesserati.gulliverancona.it';
    window.location.href = `${protocol}//${loginHost}/login?redirect=${encodeURIComponent(window.location.href)}`;
  };

  useEffect(() => {
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
        notify(val ? 'Pop-up attivato.' : 'Pop-up disattivato.', 'ok');
      } else {
        notify('Errore aggiornamento.', 'err');
      }
    } catch {
      notify('Errore di connessione.', 'err');
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
        notify('Impostazioni pop-up salvate con successo.', 'ok');
      } else {
        notify('Errore salvataggio impostazioni.', 'err');
      }
    } catch {
      notify('Errore di connessione.', 'err');
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleGoHome = () => {
    const host = window.location.host;
    const devPort = host.split(':')[1] || '3000';
    if (host.includes('localhost')) {
      window.location.href = `http://tesserati.localhost:${devPort}`;
    } else {
      window.location.href = 'https://tesserati.gulliverancona.it';
    }
  };
  if (isAuthenticated === null) {
    return (
      <div className="popup-loading-container">
        <span className="spinner"></span>
        <p>Verifica autorizzazione in corso...</p>
        <style jsx>{`
          .popup-loading-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #080810;
            color: #ffffff;
            gap: 1rem;
          }
          .spinner {
            width: 30px;
            height: 30px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border-top-color: #e40329;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="popup-container">
      {/* Ambient background blur */}
      <div className="bg-glow"></div>

      {/* Toast Notification */}
      {notification && (
        <div className={`toast toast-${notification.type}`}>
          {notification.msg}
        </div>
      )}

      {/* Header */}
      <header className="popup-header">
        <div className="header-brand">
          <button onClick={handleGoHome} className="btn-back">
            ← Dashboard
          </button>
          <h1>Gestione Pop-up</h1>
        </div>
        <div className="subdomain-badge">popup.gulliverancona.it</div>
      </header>

      <main className="popup-main animate-fade-up">
        <div className="manager-card">
          <div className="icon-wrapper">🔔</div>
          <h2>Visibilità e Contenuti</h2>
          <p className="card-desc">
            Abilita o disabilita il modal popup degli avvisi (es. votazioni rappresentanti) mostrato in homepage.
          </p>

          <div className="status-toggle-box">
            <div className="status-info">
              <span className="status-title">Stato Pop-up</span>
              <span className={`status-badge ${popupActive ? 'active' : 'inactive'}`}>
                {popupActive ? '● Attivo e visibile sul sito' : '○ Disattivato / Nascosto'}
              </span>
            </div>

            <button 
              onClick={() => handleTogglePopup(!popupActive)}
              disabled={settingsLoading}
              className="toggle-switch"
              style={{ '--switch-bg': popupActive ? COLORS.green : 'rgba(255,255,255,0.1)' } as React.CSSProperties}
            >
              <div 
                className="toggle-knob"
                style={{ left: popupActive ? '32px' : '4px' }}
              />
            </button>
          </div>

          <div className="actions-section">
            <button 
              onClick={() => setShowPopupEdit(!showPopupEdit)}
              className="btn btn-outline"
            >
              ✏️ {showPopupEdit ? 'Nascondi Editor' : 'Modifica Testi Pop-up'}
            </button>

            {showPopupEdit && (
              <form onSubmit={handleSavePopupSettings} className="editor-form animate-fade">
                <div className="form-field">
                  <label>Titolo del Pop-up</label>
                  <input
                    required
                    type="text"
                    value={popupTitle}
                    onChange={e => setPopupTitle(e.target.value)}
                    placeholder="es. Hai votato?"
                  />
                </div>

                <div className="form-field">
                  <label>Testo / Contenuto del Pop-up</label>
                  <textarea
                    required
                    rows={3}
                    value={popupText}
                    onChange={e => setPopupText(e.target.value)}
                    placeholder="es. Clicca qui per accedere al seggio telematico..."
                  />
                </div>

                <div className="form-field">
                  <label>Testo Bottone Principale</label>
                  <input
                    required
                    type="text"
                    value={popupPrimaryBtnText}
                    onChange={e => setPopupPrimaryBtnText(e.target.value)}
                    placeholder="es. Vai al voto"
                  />
                </div>

                <div className="form-field">
                  <label>Link Bottone Principale (URL)</label>
                  <input
                    required
                    type="url"
                    value={popupPrimaryBtnUrl}
                    onChange={e => setPopupPrimaryBtnUrl(e.target.value)}
                    placeholder="es. https://example.com"
                  />
                </div>

                <div className="form-field">
                  <label>Testo Bottone Secondario / Chiudi</label>
                  <input
                    required
                    type="text"
                    value={popupSecondaryBtnText}
                    onChange={e => setPopupSecondaryBtnText(e.target.value)}
                    placeholder="es. Sì, ho già votato"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={settingsLoading}
                  className="btn btn-primary btn-save"
                >
                  {settingsLoading ? 'Salvataggio...' : 'Salva Impostazioni'}
                </button>
              </form>
            )}

            <button 
              onClick={() => {
                setShowPreview(false);
                setTimeout(() => setShowPreview(true), 10);
              }}
              className="btn btn-preview"
            >
              👁️ Visualizza Anteprima Pop-up
            </button>
          </div>
        </div>
      </main>

      {showPreview && (
        <div className="preview-modal-overlay">
          <VotingModal 
            forceShow={true} 
            previewTitle={popupTitle} 
            previewText={popupText}
            previewPrimaryBtnText={popupPrimaryBtnText}
            previewPrimaryBtnUrl={popupPrimaryBtnUrl}
            previewSecondaryBtnText={popupSecondaryBtnText}
          />
          <button 
            onClick={() => setShowPreview(false)}
            className="btn-close-preview"
          >
            Chiudi Anteprima
          </button>
        </div>
      )}

      <style jsx global>{`
        .popup-container {
          min-height: 100vh;
          background: ${COLORS.bg};
          color: ${COLORS.textPrimary};
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 2.5rem 1.5rem;
        }

        .popup-container h1,
        .popup-container h2,
        .popup-container h3,
        .popup-container h4,
        .popup-container h5,
        .popup-container h6 {
          color: ${COLORS.textPrimary} !important;
        }

        .popup-container p {
          color: ${COLORS.textSecondary} !important;
        }

        .bg-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(228,3,41,0.08) 0%, transparent 70%);
          filter: blur(80px);
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .toast {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          z-index: 999;
          padding: 0.9rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: var(--shadow-lg);
          backdrop-filter: blur(20px);
          animation: fadeIn 0.3s ease;
        }

        .toast-ok {
          background: rgba(74,222,128,0.12);
          border: 1px solid rgba(74,222,128,0.3);
          color: ${COLORS.green};
        }

        .toast-err {
          background: rgba(248,113,113,0.12);
          border: 1px solid rgba(248,113,113,0.3);
          color: ${COLORS.red};
        }

        .popup-header {
          max-width: var(--max-width);
          margin: 0 auto 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid ${COLORS.border};
          padding-bottom: 1.5rem;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .btn-back {
          background: rgba(255,255,255,0.05);
          border: 1px solid ${COLORS.border};
          color: ${COLORS.textPrimary};
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 500;
          font-size: 0.85rem;
          transition: all var(--transition-base);
        }

        .btn-back:hover {
          background: rgba(255,255,255,0.1);
        }

        .popup-header h1 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: ${COLORS.textPrimary};
        }

        .subdomain-badge {
          background: rgba(228, 3, 41, 0.08);
          border: 1px solid rgba(228, 3, 41, 0.2);
          color: ${COLORS.accent};
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
        }

        .popup-main {
          max-width: 600px;
          margin: 0 auto;
        }

        .manager-card {
          background: ${COLORS.surface};
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: var(--shadow-md);
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(228, 3, 41, 0.1);
          color: ${COLORS.accent};
          border: 1px solid rgba(228, 3, 41, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          margin: 0 auto 1.5rem;
        }

        .manager-card h2 {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .card-desc {
          color: ${COLORS.textSecondary};
          font-size: 0.92rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .status-toggle-box {
          background: rgba(255,255,255,0.02);
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          text-align: left;
        }

        .status-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .status-title {
          font-weight: 700;
          font-size: 0.95rem;
        }

        .status-badge {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-badge.active {
          color: ${COLORS.green};
        }

        .status-badge.inactive {
          color: ${COLORS.red};
        }

        .toggle-switch {
          width: 60px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--switch-bg);
          position: relative;
          transition: all 0.3s ease;
        }

        .toggle-knob {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: 4px;
          transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .actions-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: center;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid ${COLORS.border};
          color: ${COLORS.textPrimary};
          width: 100%;
          padding: 0.85rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.92rem;
          transition: all var(--transition-base);
        }

        .btn-outline:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.2);
        }

        .btn-preview {
          background: rgba(255,255,255,0.04);
          border: 1px solid ${COLORS.border};
          color: ${COLORS.textPrimary};
          width: 100%;
          padding: 0.85rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.92rem;
          transition: all var(--transition-base);
        }

        .btn-preview:hover {
          background: rgba(255,255,255,0.08);
        }

        .editor-form {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-md);
          padding: 1.5rem;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-field label {
          font-size: 0.8rem;
          color: ${COLORS.textMuted};
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .form-field input, .form-field textarea {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-md);
          padding: 0.8rem 1rem;
          color: ${COLORS.textPrimary};
          font-size: 0.9rem;
          outline: none;
          font-family: inherit;
          box-sizing: border-box;
        }

        .form-field input:focus, .form-field textarea:focus {
          border-color: ${COLORS.accent};
          background: rgba(255,255,255,0.08);
        }

        .form-sub-toggle {
          background: rgba(255,255,255,0.02);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid ${COLORS.border};
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sub-toggle-title {
          display: block;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .sub-toggle-desc {
          display: block;
          font-size: 0.75rem;
          color: ${COLORS.textMuted};
        }

        .toggle-switch-sm {
          width: 50px;
          height: 26px;
          border-radius: var(--radius-full);
          background: var(--switch-bg);
          position: relative;
          transition: all 0.3s ease;
        }

        .toggle-knob-sm {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: 3px;
          transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }

        .btn-save {
          width: 100%;
          padding: 0.85rem;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, ${COLORS.accent}, #ff4444);
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: 0 4px 16px ${COLORS.accentGlow};
          margin-top: 0.5rem;
        }

        .preview-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.85);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-close-preview {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10000;
          background: #fff;
          color: #000;
          padding: 0.75rem 1.75rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          box-shadow: var(--shadow-lg);
          transition: all var(--transition-base);
        }

        .btn-close-preview:hover {
          transform: translateX(-50%) translateY(-2px);
          background: var(--gray-100);
        }
      `}</style>
    </div>
  );
}

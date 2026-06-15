'use client';

import React, { useState, useEffect } from 'react';

type FormStatus = 'active' | 'suspended';
type FormData = { tallyId: string; title: string; status: FormStatus };

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
  greenBg: 'rgba(74,222,128,0.12)',
  greenBorder: 'rgba(74,222,128,0.3)',
  red: '#f87171',
  redBg: 'rgba(248,113,113,0.12)',
  redBorder: 'rgba(248,113,113,0.3)',
};

export default function FormsManagerPage() {
  const [forms, setForms] = useState<Record<string, FormData>>({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [notification, setNotification] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  // Form creation inputs
  const [newSlug, setNewSlug] = useState('');
  const [newTallyId, setNewTallyId] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const notify = (msg: string, type: 'ok' | 'err') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchForms = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch('/api/forms/');
      const data = await res.json();
      setForms(data || {});
    } catch (e) {
      console.error(e);
      notify('Impossibile caricare i form.', 'err');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sanitizedSlug = newSlug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
      if (!sanitizedSlug) {
        notify('Slug non valido.', 'err');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/forms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          slug: sanitizedSlug,
          tallyId: newTallyId.trim(),
          title: newTitle.trim(),
        }),
      });

      if (res.ok) {
        setNewSlug('');
        setNewTallyId('');
        setNewTitle('');
        await fetchForms();
        notify('Form creato con successo.', 'ok');
      } else {
        const data = await res.json();
        notify(data.error || 'Errore di creazione.', 'err');
      }
    } catch {
      notify('Errore di rete.', 'err');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (slug: string, newStatus: FormStatus) => {
    try {
      const form = forms[slug];
      const res = await fetch('/api/forms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          slug,
          tallyId: form.tallyId,
          title: form.title,
          status: newStatus,
        }),
      });

      if (res.ok) {
        await fetchForms();
        notify('Stato aggiornato con successo.', 'ok');
      } else {
        notify('Errore aggiornamento stato.', 'err');
      }
    } catch {
      notify('Errore di rete.', 'err');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`Eliminare definitivamente il form "${slug}"?`)) return;
    try {
      const res = await fetch('/api/forms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', slug }),
      });

      if (res.ok) {
        await fetchForms();
        notify('Form eliminato.', 'ok');
      } else {
        notify('Errore eliminazione.', 'err');
      }
    } catch {
      notify('Errore di rete.', 'err');
    }
  };

  const getPublicFormUrl = (slug: string) => {
    if (typeof window === 'undefined') return '#';
    const host = window.location.host;
    if (host.includes('localhost')) {
      const port = host.split(':')[1] || '3000';
      return `http://forms.localhost:${port}/${slug}`;
    }
    return `https://forms.gulliverancona.it/${slug}`;
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

  const formsArray = Object.entries(forms);
  const totalCount = formsArray.length;
  const activeCount = formsArray.filter(([_, f]) => f.status === 'active').length;
  const suspendedCount = formsArray.filter(([_, f]) => f.status === 'suspended').length;

  return (
    <div className="forms-container">
      {/* Background decoration */}
      <div className="bg-glow"></div>

      {notification && (
        <div className={`toast toast-${notification.type}`}>
          {notification.msg}
        </div>
      )}

      {/* Header */}
      <header className="forms-header">
        <div className="header-brand">
          <button onClick={handleGoHome} className="btn-back">
            ← Dashboard
          </button>
          <h1>Gestione Moduli e Form</h1>
        </div>
        <div className="subdomain-badge">forms.gulliverancona.it</div>
      </header>

      <main className="forms-main animate-fade-up">
        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-val">{totalCount}</span>
            <span className="stat-label">Form Totali</span>
          </div>
          <div className="stat-card" style={{ color: COLORS.green }}>
            <span className="stat-val">{activeCount}</span>
            <span className="stat-label">Attivi</span>
          </div>
          <div className="stat-card" style={{ color: COLORS.red }}>
            <span className="stat-val">{suspendedCount}</span>
            <span className="stat-label">Sospesi</span>
          </div>
        </div>

        {/* Create Form Card */}
        <section className="manager-section">
          <h2>Crea un nuovo Link Form</h2>
          <form onSubmit={handleCreate} className="create-form">
            <div className="form-row">
              <div className="form-group flex-2">
                <label htmlFor="title">Titolo Descrittivo</label>
                <input
                  id="title"
                  type="text"
                  required
                  placeholder="Es. Iscrizione Assemblea Generale 2026"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                />
              </div>

              <div className="form-group flex-1">
                <label htmlFor="slug">Slug di reindirizzamento</label>
                <div className="slug-input-wrapper">
                  <span className="slug-prefix">/</span>
                  <input
                    id="slug"
                    type="text"
                    required
                    placeholder="assemblea-2026"
                    value={newSlug}
                    onChange={e => setNewSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, ''))}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tallyId">ID Modulo Tally (es. w2Dk90)</label>
                <input
                  id="tallyId"
                  type="text"
                  required
                  placeholder="Inserisci solo l'ID finale del link del form Tally"
                  value={newTallyId}
                  onChange={e => setNewTallyId(e.target.value)}
                />
              </div>

              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? 'Creazione...' : 'Crea Link Form'}
              </button>
            </div>
          </form>
        </section>

        {/* Forms List Section */}
        <section className="manager-section">
          <h2>Moduli Esistenti</h2>
          {fetchLoading ? (
            <div className="loading-state">
              <span className="spinner"></span>
              <p>Caricamento dei moduli...</p>
            </div>
          ) : formsArray.length > 0 ? (
            <div className="forms-list">
              {formsArray.map(([slug, form]) => (
                <div key={slug} className="form-item">
                  <div className="form-item-info">
                    <div className="title-row">
                      <h3>{form.title}</h3>
                      <span className={`badge-status ${form.status}`}>
                        {form.status === 'active' ? 'Attivo' : 'Sospeso'}
                      </span>
                    </div>
                    
                    <div className="meta-row">
                      <span className="slug-link">
                        Link: <a href={getPublicFormUrl(slug)} target="_blank" rel="noopener noreferrer">{getPublicFormUrl(slug)}</a>
                      </span>
                      <span className="tally-id">Tally ID: {form.tallyId}</span>
                    </div>
                  </div>

                  <div className="form-item-actions">
                    {form.status === 'active' ? (
                      <button 
                        onClick={() => handleUpdateStatus(slug, 'suspended')}
                        className="btn-action suspend"
                      >
                        Sospendi
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleUpdateStatus(slug, 'active')}
                        className="btn-action activate"
                      >
                        Riattiva
                      </button>
                    )}

                    <button 
                      onClick={() => handleDelete(slug)}
                      className="btn-action delete"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Non è ancora stato creato alcun link form breve.</p>
            </div>
          )}
        </section>
      </main>

      <style jsx global>{`
        .forms-container {
          min-height: 100vh;
          background: ${COLORS.bg};
          color: ${COLORS.textPrimary};
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 2.5rem 1.5rem;
        }

        .forms-container h1,
        .forms-container h2,
        .forms-container h3,
        .forms-container h4,
        .forms-container h5,
        .forms-container h6 {
          color: ${COLORS.textPrimary} !important;
        }

        .forms-container p {
          color: ${COLORS.textSecondary} !important;
        }

        .bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
          filter: blur(100px);
          top: -10%;
          right: -10%;
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

        .forms-header {
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

        .forms-header h1 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: ${COLORS.textPrimary};
        }

        .subdomain-badge {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: ${COLORS.green};
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
        }

        .forms-main {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .stat-card {
          background: ${COLORS.surface};
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .stat-val {
          font-size: 2.25rem;
          font-weight: 800;
        }

        .stat-label {
          font-size: 0.85rem;
          color: ${COLORS.textSecondary};
          margin-top: 0.25rem;
        }

        .manager-section {
          background: ${COLORS.surface};
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-lg);
          padding: 2.5rem;
        }

        .manager-section h2 {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 2rem;
          border-left: 3px solid ${COLORS.accent};
          padding-left: 0.75rem;
        }

        .create-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: flex;
          gap: 1.5rem;
          align-items: flex-end;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.flex-1 { flex: 1; }
        .form-group.flex-2 { flex: 2; }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: ${COLORS.textSecondary};
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input {
          background: rgba(255,255,255,0.04);
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-md);
          padding: 0.85rem 1.25rem;
          color: ${COLORS.textPrimary};
          font-size: 0.95rem;
          outline: none;
          box-sizing: border-box;
          width: 100%;
        }

        .form-group input:focus {
          border-color: ${COLORS.accent};
          background: rgba(255,255,255,0.08);
        }

        .slug-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .slug-prefix {
          position: absolute;
          left: 1.25rem;
          color: ${COLORS.textMuted};
          font-weight: 700;
        }

        .slug-input-wrapper input {
          padding-left: 2rem;
        }

        .btn-submit {
          background: linear-gradient(135deg, ${COLORS.accent}, #ff4444);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          padding: 0.85rem 2rem;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
          box-shadow: 0 4px 12px ${COLORS.accentGlow};
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(228, 3, 41, 0.4);
        }

        .loading-state {
          text-align: center;
          padding: 3rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: ${COLORS.textSecondary};
        }

        .spinner {
          width: 28px;
          height: 28px;
          border: 2.5px solid rgba(255,255,255,0.1);
          border-top-color: ${COLORS.accent};
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .forms-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-item {
          background: rgba(255,255,255,0.02);
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s ease;
        }

        .form-item:hover {
          background: rgba(255,255,255,0.04);
        }

        .form-item-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .title-row h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
        }

        .badge-status {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .badge-status.active {
          background: ${COLORS.greenBg};
          border: 1px solid ${COLORS.greenBorder};
          color: ${COLORS.green};
        }

        .badge-status.suspended {
          background: ${COLORS.redBg};
          border: 1px solid ${COLORS.redBorder};
          color: ${COLORS.red};
        }

        .meta-row {
          display: flex;
          gap: 1.5rem;
          font-size: 0.82rem;
          color: ${COLORS.textSecondary};
        }

        .slug-link a {
          color: ${COLORS.accent};
          text-decoration: underline;
        }

        .form-item-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-action {
          padding: 0.45rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          font-weight: 600;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .btn-action.suspend {
          background: rgba(255, 255, 255, 0.04);
          border-color: ${COLORS.border};
          color: ${COLORS.textSecondary};
        }

        .btn-action.suspend:hover {
          background: ${COLORS.redBg};
          border-color: ${COLORS.redBorder};
          color: ${COLORS.red};
        }

        .btn-action.activate {
          background: ${COLORS.greenBg};
          border-color: ${COLORS.greenBorder};
          color: ${COLORS.green};
        }

        .btn-action.activate:hover {
          background: rgba(74,222,128,0.2);
        }

        .btn-action.delete {
          background: rgba(255, 255, 255, 0.02);
          border-color: ${COLORS.border};
          color: ${COLORS.textMuted};
        }

        .btn-action.delete:hover {
          background: ${COLORS.redBg};
          border-color: ${COLORS.redBorder};
          color: ${COLORS.red};
        }

        .empty-state {
          text-align: center;
          padding: 3rem 0;
          color: ${COLORS.textSecondary};
          font-style: italic;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .forms-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .form-row {
            flex-direction: column;
            align-items: stretch;
          }
          .btn-submit {
            width: 100%;
          }
          .form-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          .form-item-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}

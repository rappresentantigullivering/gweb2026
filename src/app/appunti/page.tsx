'use client';

import React, { useState, useEffect, useMemo } from 'react';

type Appunto = {
  id: string;
  facolta: string;
  anno: string;
  semestre: string;
  materia: string;
  professore: string;
  tipo: string;
  annoAccademico: string;
  descrizione: string;
  qualita: string;
  watermark: boolean;
  link: string;
};

const COLORS = {
  bg: '#080810',
  surface: 'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.12)',
  accent: '#3b82f6', // Notes domain color theme: Blue
  accentGlow: 'rgba(59,130,246,0.25)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.7)',
  textMuted: 'rgba(255,255,255,0.45)',
  green: '#4ade80',
  greenBg: 'rgba(74,222,128,0.12)',
  greenBorder: 'rgba(74,222,128,0.3)',
  red: '#f87171',
};

export default function AppuntiPage() {
  const [appunti, setAppunti] = useState<Appunto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterFacolta, setFilterFacolta] = useState('');
  const [filterAnno, setFilterAnno] = useState('');
  const [filterWatermark, setFilterWatermark] = useState('');
  const [sheetType, setSheetType] = useState<'digitali' | 'cartacei'>('digitali');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`/api/appunti/?sheet=${sheetType}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAppunti(data);
        } else {
          setError(data.error || 'Errore nel caricamento degli appunti.');
        }
      })
      .catch(() => setError('Errore di rete.'))
      .finally(() => setLoading(false));
  }, [sheetType]);

  const facolta = useMemo(() =>
    [...new Set(appunti.map(a => a.facolta).filter(Boolean))].sort(),
    [appunti]
  );

  const anni = useMemo(() =>
    [...new Set(appunti.map(a => a.anno).filter(Boolean))].sort(),
    [appunti]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return appunti.filter(a => {
      if (filterFacolta && a.facolta !== filterFacolta) return false;
      if (filterAnno && a.anno !== filterAnno) return false;
      if (filterWatermark === 'si' && !a.watermark) return false;
      if (filterWatermark === 'no' && a.watermark) return false;
      if (q && ![a.materia, a.professore, a.descrizione, a.facolta].join(' ').toLowerCase().includes(q)) return false;
      return true;
    });
  }, [appunti, search, filterFacolta, filterAnno, filterWatermark]);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert('Link copiato negli appunti!');
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

  return (
    <div className="appunti-container">
      {/* Background glow layer */}
      <div className="bg-glow"></div>

      {/* Header */}
      <header className="appunti-header">
        <div className="header-brand">
          <button onClick={handleGoHome} className="btn-back">
            ← Dashboard
          </button>
          <h1>Archivio Appunti</h1>
        </div>
        <div className="subdomain-badge">appunti.gulliverancona.it</div>
      </header>

      <main className="appunti-main animate-fade-up">
        {/* Tab Selector */}
        <div className="tab-selector-wrapper">
          <div className="tab-selector">
            {(['digitali', 'cartacei'] as const).map(type => (
              <button 
                key={type} 
                onClick={() => {
                  setFilterFacolta('');
                  setFilterAnno('');
                  setFilterWatermark('');
                  setSearch('');
                  setSheetType(type);
                }} 
                className={`tab-btn ${sheetType === type ? 'active' : ''}`}
              >
                {type === 'digitali' ? 'Appunti Digitali' : 'Appunti Cartacei'}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Panel */}
        <section className="filters-panel">
          <div className="filter-group">
            <label>Cerca</label>
            <input
              type="text"
              placeholder="Materia, professore, parole chiave..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Facoltà</label>
            <select value={filterFacolta} onChange={e => setFilterFacolta(e.target.value)}>
              <option value="">Tutte le facoltà</option>
              {facolta.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Anno Corso</label>
            <select value={filterAnno} onChange={e => setFilterAnno(e.target.value)}>
              <option value="">Tutti gli anni</option>
              {anni.map(a => <option key={a} value={a}>{a}° anno</option>)}
            </select>
          </div>

          {sheetType === 'digitali' && (
            <div className="filter-group">
              <label>Watermark</label>
              <select value={filterWatermark} onChange={e => setFilterWatermark(e.target.value)}>
                <option value="">Tutti</option>
                <option value="si">Solo con watermark</option>
                <option value="no">Solo senza</option>
              </select>
            </div>
          )}
        </section>

        {/* Status indicator */}
        <div className="results-count">
          {loading ? 'Caricamento in corso...' : `${filtered.length} risultati su ${appunti.length} totali`}
        </div>

        {/* Content table */}
        {loading ? (
          <div className="loading-state">
            <span className="spinner"></span>
            <p>Download del database appunti in corso...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="appunti-table">
              <thead>
                <tr>
                  <th>Facoltà</th>
                  <th>Anno/Sem</th>
                  <th>Materia & Info</th>
                  <th>Professore</th>
                  <th>Tipo</th>
                  {sheetType === 'digitali' && (
                    <>
                      <th>Qualità</th>
                      <th>Watermark</th>
                    </>
                  )}
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={sheetType === 'digitali' ? 8 : 6} className="empty-row">
                      Nessun appunto corrisponde ai filtri selezionati.
                    </td>
                  </tr>
                ) : (
                  filtered.map(appunto => (
                    <tr key={appunto.id}>
                      <td className="col-facolta">{appunto.facolta}</td>
                      <td className="col-anno">{appunto.anno}{appunto.semestre ? ` / S${appunto.semestre}` : ''}</td>
                      <td className="col-materia">
                        <span className="materia-title">{appunto.materia}</span>
                        {appunto.descrizione && <span className="materia-desc">{appunto.descrizione}</span>}
                      </td>
                      <td className="col-prof">{appunto.professore || '—'}</td>
                      <td className="col-tipo">{appunto.tipo || '—'}</td>
                      {sheetType === 'digitali' && (
                        <>
                          <td className="col-qualita">{appunto.qualita || '—'}</td>
                          <td className="col-watermark">
                            <span className={`badge-watermark ${appunto.watermark ? 'yes' : 'no'}`}>
                              {appunto.watermark ? 'Sì' : 'No'}
                            </span>
                          </td>
                        </>
                      )}
                      <td className="col-actions">
                        {appunto.link ? (
                          <div className="action-buttons">
                            <a href={appunto.link} target="_blank" rel="noopener noreferrer" className="btn-open">
                              Apri
                            </a>
                            <button onClick={() => handleCopyLink(appunto.link)} className="btn-copy">
                              Copia
                            </button>
                          </div>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Master spreadsheet button */}
        {!loading && !error && process.env.NEXT_PUBLIC_APPUNTI_SHEET_ID && (
          <div className="sheet-link-wrapper">
            <a 
              href={`https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_APPUNTI_SHEET_ID}/edit`}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-google-sheets"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
              <span>Consulta il Foglio Master completo</span>
            </a>
          </div>
        )}
      </main>

      <style jsx global>{`
        .appunti-container {
          min-height: 100vh;
          background: ${COLORS.bg};
          color: ${COLORS.textPrimary};
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 2.5rem 1.5rem;
        }

        .appunti-container h1,
        .appunti-container h2,
        .appunti-container h3,
        .appunti-container h4,
        .appunti-container h5,
        .appunti-container h6 {
          color: ${COLORS.textPrimary} !important;
        }

        .appunti-container p {
          color: ${COLORS.textSecondary} !important;
        }

        .bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%);
          filter: blur(100px);
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .appunti-header {
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

        .appunti-header h1 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: ${COLORS.textPrimary};
        }

        .subdomain-badge {
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: ${COLORS.accent};
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
        }

        .appunti-main {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .tab-selector-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .tab-selector {
          display: flex;
          gap: 0.25rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-md);
          padding: 0.3rem;
        }

        .tab-btn {
          padding: 0.55rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.88rem;
          color: ${COLORS.textSecondary};
          transition: all var(--transition-fast);
        }

        .tab-btn.active {
          background: ${COLORS.textPrimary};
          color: ${COLORS.bg};
          box-shadow: var(--shadow-sm);
        }

        .filters-panel {
          background: ${COLORS.surface};
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: grid;
          grid-template-columns: 2fr repeat(auto-fit, minmax(160px, 1fr));
          gap: 1.25rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .filter-group label {
          font-size: 0.72rem;
          color: ${COLORS.textMuted};
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
        }

        .filter-group input, .filter-group select {
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid ${COLORS.border};
          color: ${COLORS.textPrimary};
          font-size: 0.9rem;
          outline: none;
          box-sizing: border-box;
          width: 100%;
        }

        .filter-group select {
          cursor: pointer;
        }

        .filter-group input:focus, .filter-group select:focus {
          border-color: ${COLORS.accent};
          background: rgba(255, 255, 255, 0.08);
        }

        .results-count {
          font-size: 0.82rem;
          color: ${COLORS.textMuted};
        }

        .loading-state {
          text-align: center;
          padding: 4rem 0;
          background: ${COLORS.surface};
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: ${COLORS.textSecondary};
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255,255,255,0.1);
          border-top-color: ${COLORS.accent};
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .error-state {
          text-align: center;
          padding: 3rem 0;
          color: var(--red-light);
          background: rgba(220, 38, 38, 0.05);
          border: 1px solid rgba(220, 38, 38, 0.2);
          border-radius: var(--radius-md);
        }

        .table-wrapper {
          background: ${COLORS.surface};
          border: 1px solid ${COLORS.border};
          border-radius: var(--radius-md);
          overflow-x: auto;
          box-shadow: var(--shadow-sm);
        }

        .appunti-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          text-align: left;
        }

        .appunti-table th {
          border-bottom: 1px solid ${COLORS.border};
          padding: 1rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: ${COLORS.textMuted};
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .appunti-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }

        .appunti-table tr:last-child td {
          border-bottom: none;
        }

        .col-facolta {
          color: ${COLORS.textSecondary};
          font-weight: 600;
          white-space: nowrap;
        }

        .col-anno {
          color: ${COLORS.textSecondary};
          white-space: nowrap;
        }

        .col-materia {
          min-width: 200px;
        }

        .materia-title {
          display: block;
          color: ${COLORS.textPrimary};
          font-weight: 600;
        }

        .materia-desc {
          display: block;
          font-size: 0.75rem;
          color: ${COLORS.textMuted};
          margin-top: 0.2rem;
        }

        .col-prof {
          color: ${COLORS.textSecondary};
        }

        .col-tipo {
          color: ${COLORS.textMuted};
          white-space: nowrap;
        }

        .col-qualita {
          color: ${COLORS.textSecondary};
        }

        .badge-watermark {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .badge-watermark.yes {
          background: ${COLORS.greenBg};
          border: 1px solid ${COLORS.greenBorder};
          color: ${COLORS.green};
        }

        .badge-watermark.no {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: ${COLORS.textMuted};
        }

        .empty-row {
          text-align: center;
          padding: 3rem !important;
          color: ${COLORS.textMuted};
          font-style: italic;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-open {
          color: ${COLORS.textPrimary};
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .btn-open:hover {
          background: ${COLORS.accent};
          box-shadow: 0 4px 12px ${COLORS.accentGlow};
        }

        .btn-copy {
          color: ${COLORS.textSecondary};
          background: rgba(255,255,255,0.05);
          border: 1px solid ${COLORS.border};
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .btn-copy:hover {
          background: rgba(255,255,255,0.1);
        }

        .sheet-link-wrapper {
          text-align: center;
          margin-top: 1.5rem;
        }

        .btn-google-sheets {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: #0f9d58;
          color: white;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.92rem;
          padding: 0.8rem 1.75rem;
          border-radius: var(--radius-md);
          box-shadow: 0 4px 14px rgba(15, 157, 88, 0.3);
          transition: all var(--transition-base);
        }

        .btn-google-sheets:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15, 157, 88, 0.4);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .appunti-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .filters-panel {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .action-buttons {
            flex-direction: column;
            width: 100%;
          }
          .btn-open, .btn-copy {
            text-align: center;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

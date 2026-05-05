'use client';

import { useState, useEffect, useMemo } from 'react';

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
  disponibile: boolean;
  link: string;
};

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

export default function AppuntiTab() {
  const [appunti, setAppunti] = useState<Appunto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterFacolta, setFilterFacolta] = useState('');
  const [filterAnno, setFilterAnno] = useState('');
  const [filterDisponibile, setFilterDisponibile] = useState('');
  const [sheetType, setSheetType] = useState<'digitali' | 'cartacei'>('digitali');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/appunti/?sheet=${sheetType}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setAppunti(data);
        else setError('Errore nel caricamento.');
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
      if (filterDisponibile === 'si' && !a.disponibile) return false;
      if (filterDisponibile === 'no' && a.disponibile) return false;
      if (q && ![a.materia, a.professore, a.descrizione, a.facolta].join(' ').toLowerCase().includes(q)) return false;
      return true;
    });
  }, [appunti, search, filterFacolta, filterAnno, filterDisponibile]);

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem 0.85rem', borderRadius: '8px',
    background: 'rgba(255,255,255,0.05)', border: `1px solid ${COLORS.border}`,
    color: COLORS.textPrimary, fontSize: '0.85rem', outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.72rem', color: COLORS.textMuted,
    textTransform: 'uppercase', letterSpacing: '0.05em',
    display: 'block', marginBottom: '0.3rem',
  };

  if (loading) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: COLORS.textMuted }}>
      Caricamento appunti {sheetType}...
    </div>
  );

  if (error) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: COLORS.red }}>{error}</div>
  );

  return (
    <div>
      {/* Selettore Foglio */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '0.3rem' }}>
          {(['digitali', 'cartacei'] as const).map(type => (
            <button key={type} onClick={() => setSheetType(type)} style={{
              padding: '0.5rem 1.25rem', borderRadius: '9px', border: 'none', cursor: 'pointer',
              fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.15s',
              background: sheetType === type ? COLORS.textPrimary : 'transparent',
              color: sheetType === type ? COLORS.bg : COLORS.textSecondary,
            }}>{type === 'digitali' ? 'Appunti Digitali' : 'Appunti Cartacei'}</button>
          ))}
        </div>
      </div>

      {/* Filtri */}
      <div style={{
        background: COLORS.surface, border: `1px solid ${COLORS.border}`,
        borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1rem',
      }}>
        <div>
          <label style={labelStyle}>Cerca</label>
          <input
            style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
            placeholder="Materia, professore..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>Facolta</label>
          <select style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
            value={filterFacolta} onChange={e => setFilterFacolta(e.target.value)}>
            <option value="">Tutte</option>
            {facolta.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Anno</label>
          <select style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
            value={filterAnno} onChange={e => setFilterAnno(e.target.value)}>
            <option value="">Tutti</option>
            {anni.map(a => <option key={a} value={a}>{a}° anno</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Disponibile</label>
          <select style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
            value={filterDisponibile} onChange={e => setFilterDisponibile(e.target.value)}>
            <option value="">Tutti</option>
            <option value="si">Solo disponibili</option>
            <option value="no">Solo non disponibili</option>
          </select>
        </div>
      </div>

      {/* Contatore */}
      <div style={{ fontSize: '0.8rem', color: COLORS.textMuted, marginBottom: '1rem' }}>
        {filtered.length} risultati su {appunti.length} totali
      </div>

      {/* Tabella */}
      <div style={{
        background: COLORS.surface, border: `1px solid ${COLORS.border}`,
        borderRadius: '16px', overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                {['Facolta', 'Anno', 'Materia', 'Professore', 'Tipo', 'Qualita', 'Disp.', 'Link'].map(h => (
                  <th key={h} style={{
                    padding: '0.75rem 1rem', textAlign: 'left',
                    fontSize: '0.72rem', color: COLORS.textMuted,
                    textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: COLORS.textMuted }}>
                    Nessun risultato.
                  </td>
                </tr>
              ) : filtered.map(a => (
                <tr key={a.id} style={{ borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                  <td style={{ padding: '0.75rem 1rem', color: COLORS.textSecondary, whiteSpace: 'nowrap' }}>{a.facolta}</td>
                  <td style={{ padding: '0.75rem 1rem', color: COLORS.textSecondary, textAlign: 'center' }}>
                    {a.anno}{a.semestre ? `/${a.semestre}` : ''}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: COLORS.textPrimary, fontWeight: 500 }}>
                    <div>{a.materia}</div>
                    {a.descrizione && (
                      <div style={{ fontSize: '0.75rem', color: COLORS.textMuted, marginTop: '0.15rem' }}>{a.descrizione}</div>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: COLORS.textSecondary }}>{a.professore || '—'}</td>
                  <td style={{ padding: '0.75rem 1rem', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{a.tipo || '—'}</td>
                  <td style={{ padding: '0.75rem 1rem', color: COLORS.textSecondary }}>{a.qualita || '—'}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{
                      display: 'inline-block', padding: '0.2rem 0.55rem', borderRadius: '99px',
                      fontSize: '0.72rem', fontWeight: 700,
                      background: a.disponibile ? COLORS.greenBg : COLORS.redBg,
                      border: `1px solid ${a.disponibile ? COLORS.greenBorder : COLORS.redBorder}`,
                      color: a.disponibile ? COLORS.green : COLORS.red,
                    }}>
                      {a.disponibile ? 'Si' : 'No'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    {a.link ? (
                      <a href={a.link} target="_blank" rel="noopener noreferrer" style={{
                        color: COLORS.accent, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600,
                      }}>Apri</a>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottone Google Sheets */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a 
          href="https://docs.google.com/spreadsheets/d/1bz-tBt6pjk8Z9zadctHX2INiCUl9RC5beigbYjIRfDo/edit?usp=sharing"
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.85rem 1.75rem', borderRadius: '12px',
            background: '#0F9D58', // Verde Google Sheets
            color: 'white', fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none', boxShadow: '0 4px 12px rgba(15,157,88,0.3)',
            transition: 'transform 0.15s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          Consulta il file completo
        </a>
      </div>
    </div>
  );
}

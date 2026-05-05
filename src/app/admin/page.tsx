'use client';

import { useState, useEffect } from 'react';

type FormStatus = 'active' | 'suspended';
type FormData = { tallyId: string; title: string; status: FormStatus };

const API_BASE = '/api/forms/';
// Vercel inietta automaticamente l'hash del commit — primi 7 caratteri = versione leggibile
const VERSION = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local';

const COLORS = {
  bg: '#080810',
  surface: 'rgba(255,255,255,0.04)',
  surfaceHover: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.16)',
  accent: '#e40329',
  accentGlow: 'rgba(228,3,41,0.25)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.5)',
  textMuted: 'rgba(255,255,255,0.25)',
  green: '#00d97e',
  greenBg: 'rgba(0,217,126,0.1)',
  greenBorder: 'rgba(0,217,126,0.25)',
  red: '#ff4560',
  redBg: 'rgba(255,69,96,0.1)',
  redBorder: 'rgba(255,69,96,0.25)',
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [forms, setForms] = useState<Record<string, FormData>>({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [notification, setNotification] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);
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
      const res = await fetch(API_BASE);
      const data = await res.json();
      setForms(data);
    } catch (e) {
      console.error(e);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchForms();
  }, [authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoginLoading(true);
    setLoginError('');
    try {
      // Verifica la password realmente contro l'API prima di concedere l'accesso
      const res = await fetch('/api/forms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${password}` },
        body: JSON.stringify({ action: 'create', slug: '__ping__', tallyId: '__ping__', title: '__ping__' }),
      });
      if (res.status === 401) {
        setLoginError('Password errata. Riprova.');
      } else {
        setAuthenticated(true);
        // Puliamo il ping immediatamente
        await fetch('/api/forms/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${password}` },
          body: JSON.stringify({ action: 'delete', slug: '__ping__' }),
        });
      }
    } catch {
      setLoginError('Errore di rete. Riprova.');
    } finally {
      setLoginLoading(false);
    }
  };

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${password}`,
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          action: 'create',
          slug: newSlug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase(),
          tallyId: newTallyId,
          title: newTitle,
        }),
      });
      if (res.ok) {
        setNewSlug(''); setNewTallyId(''); setNewTitle('');
        await fetchForms();
        notify('Form creato con successo!', 'ok');
      } else {
        notify('Password errata o errore di salvataggio.', 'err');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (slug: string, newStatus: FormStatus) => {
    const form = forms[slug];
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ action: 'update', slug, tallyId: form.tallyId, title: form.title, status: newStatus }),
    });
    if (res.ok) { fetchForms(); notify('Stato aggiornato.', 'ok'); }
    else notify('Errore di autorizzazione.', 'err');
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`Eliminare definitivamente "${slug}"?`)) return;
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ action: 'delete', slug }),
    });
    if (res.ok) { fetchForms(); notify('Form eliminato.', 'ok'); }
    else notify('Errore di autorizzazione.', 'err');
  };

  // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: COLORS.bg, fontFamily: '"Inter", system-ui, sans-serif', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '600px', height: '400px', borderRadius: '50%',
          background: `radial-gradient(ellipse, ${COLORS.accentGlow} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <form onSubmit={handleLogin} style={{
          position: 'relative', zIndex: 1,
          background: COLORS.surface, border: `1px solid ${COLORS.border}`,
          padding: '3rem 2.5rem', borderRadius: '24px',
          backdropFilter: 'blur(40px)',
          width: '100%', maxWidth: '380px',
          boxShadow: `0 0 80px ${COLORS.accentGlow}`,
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: `linear-gradient(135deg, ${COLORS.accent}, #ff6b35)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', margin: '0 auto 1.25rem',
              boxShadow: `0 8px 24px ${COLORS.accentGlow}`,
            }}>🛡</div>
            <h1 style={{ color: COLORS.textPrimary, fontWeight: 800, fontSize: '1.4rem', margin: 0 }}>Admin Portal</h1>
            <p style={{ color: COLORS.textSecondary, fontSize: '0.85rem', marginTop: '0.5rem' }}>Gulliver Form Manager</p>
            <div style={{
              display: 'inline-block', marginTop: '0.75rem',
              padding: '0.2rem 0.6rem', borderRadius: '6px',
              background: 'rgba(255,255,255,0.06)', border: `1px solid ${COLORS.border}`,
              fontFamily: 'monospace', fontSize: '0.72rem', color: COLORS.textMuted,
              letterSpacing: '0.05em',
            }}>
              v {VERSION}
            </div>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setLoginError(''); }}
            autoFocus
            style={{
              width: '100%', padding: '0.9rem 1rem', marginBottom: '0.75rem',
              background: loginError ? 'rgba(255,69,96,0.08)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${loginError ? COLORS.redBorder : COLORS.border}`,
              borderRadius: '12px', color: COLORS.textPrimary, fontSize: '1rem',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
          {loginError && (
            <div style={{ color: COLORS.red, fontSize: '0.82rem', marginBottom: '0.75rem', textAlign: 'center' }}>
              {loginError}
            </div>
          )}
          <button type="submit" disabled={loginLoading} style={{
            width: '100%', padding: '0.9rem',
            background: loginLoading ? 'rgba(228,3,41,0.4)' : `linear-gradient(135deg, ${COLORS.accent}, #ff4444)`,
            border: 'none', borderRadius: '12px', color: 'white',
            fontWeight: 700, fontSize: '1rem', cursor: loginLoading ? 'not-allowed' : 'pointer',
            boxShadow: `0 4px 20px ${COLORS.accentGlow}`,
          }}>
            {loginLoading ? '⏳ Verifica...' : 'Accedi →'}
          </button>
        </form>
      </div>
    );
  }

  // ─── DASHBOARD ────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', background: COLORS.bg,
      fontFamily: '"Inter", system-ui, sans-serif', color: COLORS.textPrimary,
    }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Toast notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 999,
          padding: '0.9rem 1.5rem', borderRadius: '12px',
          background: notification.type === 'ok' ? COLORS.greenBg : COLORS.redBg,
          border: `1px solid ${notification.type === 'ok' ? COLORS.greenBorder : COLORS.redBorder}`,
          color: notification.type === 'ok' ? COLORS.green : COLORS.red,
          fontWeight: 600, fontSize: '0.9rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
          animation: 'fadeIn 0.3s ease',
        }}>
          {notification.type === 'ok' ? '✓ ' : '✕ '}{notification.msg}
        </div>
      )}

      {/* Header */}
      <header style={{
        borderBottom: `1px solid ${COLORS.border}`,
        padding: '1.25rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(8,8,16,0.8)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: `linear-gradient(135deg, ${COLORS.accent}, #ff4444)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', boxShadow: `0 4px 12px ${COLORS.accentGlow}`,
          }}>⚡</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Gulliver Form Manager</div>
            <div style={{ fontSize: '0.72rem', color: COLORS.textMuted, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span>admin.gulliverancona.it</span>
              <span style={{
                padding: '0.1rem 0.4rem', borderRadius: '4px',
                background: 'rgba(255,255,255,0.06)', border: `1px solid ${COLORS.border}`,
                fontFamily: 'monospace', letterSpacing: '0.04em',
              }}>v {VERSION}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => setAuthenticated(false)} style={{
            background: COLORS.surface, border: `1px solid ${COLORS.border}`,
            color: COLORS.textSecondary, padding: '0.4rem 1rem',
            borderRadius: '99px', cursor: 'pointer', fontSize: '0.85rem',
          }}>
            Esci
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { label: 'Form Totali', value: Object.keys(forms).length, icon: '📋' },
            { label: 'Attivi', value: Object.values(forms).filter(f => f.status === 'active').length, icon: '✅' },
            { label: 'Sospesi', value: Object.values(forms).filter(f => f.status === 'suspended').length, icon: '⏸' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: COLORS.surface, border: `1px solid ${COLORS.border}`,
              borderRadius: '16px', padding: '1.25rem 1.5rem',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: COLORS.textSecondary, marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Add Form Panel */}
        <div style={{
          background: COLORS.surface, border: `1px solid ${COLORS.border}`,
          borderRadius: '20px', padding: '2rem', marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'rgba(228,3,41,0.15)', border: '1px solid rgba(228,3,41,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem',
            }}>＋</div>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Nuovo Form</h2>
          </div>
          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'URL Slug', placeholder: 'es. volontari', value: newSlug, set: setNewSlug },
                { label: 'ID Tally', placeholder: 'es. wA1B2c', value: newTallyId, set: setNewTallyId },
                { label: 'Titolo (interno)', placeholder: 'es. Diventa Volontario', value: newTitle, set: setNewTitle },
              ].map(field => (
                <div key={field.label}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: COLORS.textMuted, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {field.label}
                  </label>
                  <input
                    required
                    value={field.value}
                    onChange={e => field.set(e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%', padding: '0.75rem 1rem', boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.04)', border: `1px solid ${COLORS.border}`,
                      borderRadius: '10px', color: COLORS.textPrimary, fontSize: '0.9rem', outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLORS.border}`,
              borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem',
              fontSize: '0.82rem', color: COLORS.textMuted, fontFamily: 'monospace',
            }}>
              🔗 forms.gulliverancona.it/<span style={{ color: COLORS.textSecondary }}>{newSlug || 'slug'}</span>
            </div>
            <button disabled={loading} type="submit" style={{
              padding: '0.75rem 2rem',
              background: loading ? 'rgba(228,3,41,0.3)' : `linear-gradient(135deg, ${COLORS.accent}, #ff4444)`,
              border: 'none', borderRadius: '10px', color: 'white',
              fontWeight: 700, fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : `0 4px 16px ${COLORS.accentGlow}`,
              transition: 'all 0.2s',
            }}>
              {loading ? '⏳ Salvataggio...' : '✓ Crea Link'}
            </button>
          </form>
        </div>

        {/* Forms Table */}
        <div style={{
          background: COLORS.surface, border: `1px solid ${COLORS.border}`,
          borderRadius: '20px', overflow: 'hidden',
        }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Form Attivi</h2>
            <button onClick={fetchForms} style={{
              background: COLORS.surface, border: `1px solid ${COLORS.border}`,
              color: COLORS.textSecondary, padding: '0.4rem 0.9rem',
              borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem',
            }}>
              {fetchLoading ? '⏳' : '↻'} Aggiorna
            </button>
          </div>

          {Object.keys(forms).length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: COLORS.textMuted }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <p style={{ margin: 0 }}>Nessun form creato. Aggiungine uno sopra!</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    {['Link Pubblico', 'Titolo', 'ID Tally', 'Stato', 'Azioni'].map(h => (
                      <th key={h} style={{
                        padding: '0.9rem 1.25rem', textAlign: 'left',
                        fontSize: '0.72rem', color: COLORS.textMuted,
                        textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(forms).map(([slug, form]) => (
                    <tr key={slug} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <a href={`https://forms.gulliverancona.it/${slug}`} target="_blank" rel="noopener noreferrer" style={{
                          color: COLORS.accent, fontWeight: 600, textDecoration: 'none',
                          fontSize: '0.9rem', fontFamily: 'monospace',
                        }}>/{slug} ↗</a>
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: COLORS.textPrimary, fontSize: '0.9rem' }}>{form.title}</td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span style={{
                          fontFamily: 'monospace', fontSize: '0.82rem',
                          color: COLORS.textMuted, background: 'rgba(255,255,255,0.05)',
                          padding: '0.25rem 0.6rem', borderRadius: '6px',
                        }}>{form.tallyId}</span>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <select
                          value={form.status}
                          onChange={(e) => handleUpdateStatus(slug, e.target.value as FormStatus)}
                          style={{
                            padding: '0.4rem 0.75rem', borderRadius: '8px',
                            border: `1px solid ${form.status === 'active' ? COLORS.greenBorder : COLORS.redBorder}`,
                            background: form.status === 'active' ? COLORS.greenBg : COLORS.redBg,
                            color: form.status === 'active' ? COLORS.green : COLORS.red,
                            fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', outline: 'none',
                          }}
                        >
                          <option value="active">● Attivo</option>
                          <option value="suspended">⏸ Sospeso</option>
                        </select>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <button onClick={() => handleDelete(slug)} style={{
                          background: COLORS.redBg, border: `1px solid ${COLORS.redBorder}`,
                          color: COLORS.red, padding: '0.4rem 0.9rem',
                          borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
                        }}>
                          Elimina
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
        select option { background: #1a1a2e; color: white; }
      `}</style>
    </div>
  );
}

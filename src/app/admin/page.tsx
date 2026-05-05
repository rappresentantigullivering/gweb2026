'use client';

import { useState, useEffect } from 'react';

type FormStatus = 'active' | 'suspended';
type FormData = { tallyId: string; title: string; status: FormStatus };

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [forms, setForms] = useState<Record<string, FormData>>({});
  const [loading, setLoading] = useState(false);
  
  // Form input
  const [newSlug, setNewSlug] = useState('');
  const [newTallyId, setNewTallyId] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const fetchForms = async () => {
    try {
      const res = await fetch('/api/forms');
      const data = await res.json();
      setForms(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) setAuthenticated(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          action: 'create',
          slug: newSlug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase(),
          tallyId: newTallyId,
          title: newTitle
        })
      });
      
      if (res.ok) {
        setNewSlug(''); setNewTallyId(''); setNewTitle('');
        await fetchForms();
      } else {
        alert("Password errata o errore di salvataggio");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (slug: string, newStatus: FormStatus) => {
    const form = forms[slug];
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${password}` },
        body: JSON.stringify({ action: 'update', slug, tallyId: form.tallyId, title: form.title, status: newStatus })
      });
      if (res.ok) fetchForms();
      else alert("Errore di autorizzazione");
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`Sicuro di voler eliminare il form "${slug}"?`)) return;
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${password}` },
        body: JSON.stringify({ action: 'delete', slug })
      });
      if (res.ok) fetchForms();
      else alert("Errore di autorizzazione");
    } catch (e) {
      console.error(e);
    }
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Admin Login</h2>
          <input 
            type="password" 
            placeholder="Password di amministrazione" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '0.8rem', width: '100%', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '6px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '0.8rem', background: '#e40329', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Accedi
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontWeight: 800 }}>Gestione Form Tally</h1>
          <button onClick={() => setAuthenticated(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Esci</button>
        </div>

        {/* Form di Aggiunta */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Aggiungi Nuovo Form</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: '#555' }}>Nome Link (URL)</label>
              <input required value={newSlug} onChange={e => setNewSlug(e.target.value)} placeholder="es. volontari" style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: '#555' }}>ID Tally</label>
              <input required value={newTallyId} onChange={e => setNewTallyId(e.target.value)} placeholder="es. wA1B2c" style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: '#555' }}>Titolo Form (per noi)</label>
              <input required value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Diventa Volontario" style={{ width: '100%', padding: '0.6rem', border: '1px solid #ddd', borderRadius: '6px' }} />
            </div>
            <div style={{ flex: '1 1 100%', display: 'flex', alignItems: 'flex-end', marginTop: '0.5rem' }}>
              <button disabled={loading} type="submit" style={{ padding: '0.6rem 1.5rem', background: '#000', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                {loading ? 'Salvataggio...' : 'Crea Link'}
              </button>
            </div>
          </form>
        </div>

        {/* Tabella Form */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8f8f8', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#666' }}>LINK PUBBLICO</th>
                <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#666' }}>TITOLO</th>
                <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#666' }}>ID TALLY</th>
                <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#666' }}>STATO</th>
                <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#666' }}>AZIONI</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(forms).length === 0 && (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>Nessun form creato.</td></tr>
              )}
              {Object.entries(forms).map(([slug, form]) => (
                <tr key={slug} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>
                    <a href={`https://forms.gulliverancona.it/${slug}`} target="_blank" style={{ color: '#e40329', fontWeight: 'bold', textDecoration: 'none' }}>/{slug}</a>
                  </td>
                  <td style={{ padding: '1rem' }}>{form.title}</td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', color: '#666' }}>{form.tallyId}</td>
                  <td style={{ padding: '1rem' }}>
                    <select 
                      value={form.status} 
                      onChange={(e) => handleUpdateStatus(slug, e.target.value as FormStatus)}
                      style={{ 
                        padding: '0.4rem 0.8rem', borderRadius: '99px', border: 'none', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer',
                        background: form.status === 'active' ? '#e6f4ea' : '#fce8e6',
                        color: form.status === 'active' ? '#1e8e3e' : '#d93025'
                      }}
                    >
                      <option value="active">Attivo</option>
                      <option value="suspended">Sospeso</option>
                    </select>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button onClick={() => handleDelete(slug)} style={{ background: 'none', border: 'none', color: '#d93025', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem' }}>Elimina</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

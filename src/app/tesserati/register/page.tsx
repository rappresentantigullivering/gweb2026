'use client';

import React, { useState } from 'react';
import {
  RaPage, RaCard, RaButton, RaField, RaInput, RaAlert, useAreaUrl,
} from '@/components/riservata';
import auth from '../auth.module.css';

/**
 * Stessa normalizzazione applicata dal server in
 * src/app/api/users/requests/route.ts (normalizeUsername di src/lib/auth):
 * qui e' ricopiata perche' lib/auth usa API Node non disponibili nel
 * browser. Le due devono restare allineate.
 */
function sanitizeUsername(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
}

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const loginHref = useAreaUrl('tesserati', '/login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const sanitizedUsername = sanitizeUsername(username);
    if (!sanitizedUsername || sanitizedUsername.length < 3) {
      setError('Lo username deve contenere almeno 3 caratteri alfanumerici, punti o trattini.');
      return;
    }
    if (password.length < 6) {
      setError('La password deve contenere almeno 6 caratteri.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Le password non coincidono.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/users/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: sanitizedUsername, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invio richiesta fallito');
      setSuccess(data.message || 'Richiesta inviata con successo!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Si è verificato un errore');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <RaCard padding="lg" className={`${auth.authCard} ${auth.centeredText} animate-fade-up`}>
        <div className={auth.statusIcon} style={{ ['--icon-color' as string]: 'var(--ra-ok-strong)' } as React.CSSProperties}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className={auth.authTitle}>Richiesta inviata</h1>
        <div className={auth.dividerAccent} />
        <p className={auth.authDesc}>{success}</p>
        <div style={{ marginTop: '1.75rem' }}>
          <RaButton variant="primary" size="lg" block as="a" href={loginHref}>
            Torna al login
          </RaButton>
        </div>
      </RaCard>
    );
  }

  return (
    <RaCard padding="lg" className={`${auth.authCard} animate-fade-up`}>
      <div className={auth.authHeader}>
        <div className={auth.logoBadge}>G</div>
        <h1 className={auth.authTitle}>Registrazione</h1>
        <p className={auth.authDesc}>Richiedi l&apos;accesso al portale unico di Gulliver Ancona</p>
      </div>

      <form onSubmit={handleSubmit} className={auth.authForm}>
        {error && <RaAlert tone="error">{error}</RaAlert>}

        <RaField
          label="Username"
          htmlFor="username"
          hint="Solo lettere minuscole, numeri, punti, trattini o underscore."
        >
          <RaInput
            type="text"
            id="username"
            required
            placeholder="es. nome.cognome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            autoComplete="username"
          />
        </RaField>

        <RaField label="Password" htmlFor="password">
          <RaInput
            type="password"
            id="password"
            required
            placeholder="Almeno 6 caratteri"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="new-password"
          />
        </RaField>

        <RaField label="Conferma password" htmlFor="confirmPassword">
          <RaInput
            type="password"
            id="confirmPassword"
            required
            placeholder="Ripeti la password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            autoComplete="new-password"
          />
        </RaField>

        <RaButton type="submit" variant="primary" size="lg" block disabled={loading} loading={loading}>
          {loading ? 'Invio…' : 'Invia richiesta'}
        </RaButton>
      </form>

      <div className={auth.authFooter}>
        <a href={loginHref} className={auth.authLink}>
          Hai già un account? Torna al login
        </a>
      </div>
    </RaCard>
  );
}

export default function RegisterPage() {
  return (
    <RaPage area="tesserati" title="Registrazione" center>
      <RegisterForm />
    </RaPage>
  );
}

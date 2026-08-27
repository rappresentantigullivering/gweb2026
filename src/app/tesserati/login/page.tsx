'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  RaPage, RaCard, RaButton, RaField, RaInput, RaAlert, RaSpinner,
  useAreaUrl, dashboardUrl,
} from '@/components/riservata';
import auth from '../auth.module.css';

function LoginForm() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const registerHref = useAreaUrl('tesserati', '/register');

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect) setRedirectUrl(decodeURIComponent(redirect));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Autenticazione fallita');

      // Nessun setLoading(false): la pagina sta per essere sostituita.
      window.location.href = redirectUrl || dashboardUrl();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Si è verificato un errore');
      setLoading(false);
    }
  };

  return (
    <RaCard padding="lg" className={`${auth.authCard} animate-fade-up`}>
      <div className={auth.authHeader}>
        <div className={auth.logoBadge}>G</div>
        <h1 className={auth.authTitle}>Area Tesserati</h1>
        <p className={auth.authDesc}>Accedi al portale unico di Gulliver Ancona</p>
      </div>

      <form onSubmit={handleSubmit} className={auth.authForm}>
        {error && <RaAlert tone="error">{error}</RaAlert>}

        <RaField label="Username" htmlFor="username">
          <RaInput
            type="text"
            id="username"
            required
            placeholder="Inserisci il tuo username"
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
            placeholder="Inserisci la tua password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
          />
        </RaField>

        <RaButton type="submit" variant="primary" size="lg" block disabled={loading} loading={loading}>
          {loading ? 'Verifica…' : (
            <>
              Accedi
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </RaButton>
      </form>

      <div className={auth.authFooter}>
        <a href={registerHref} className={auth.authLink}>
          Non hai un account? Invia richiesta di registrazione
        </a>
      </div>
    </RaCard>
  );
}

export default function LoginPage() {
  return (
    <RaPage area="tesserati" title="Accedi" center>
      {/* Il boundary serve a useSearchParams: senza, next build fallisce. */}
      <Suspense
        fallback={
          <RaCard padding="lg" className={`${auth.authCard} ${auth.centeredText}`}>
            <RaSpinner size="md" />
            <p className={auth.authDesc} style={{ marginTop: '1rem' }}>Caricamento portale…</p>
          </RaCard>
        }
      >
        <LoginForm />
      </Suspense>
    </RaPage>
  );
}

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectUrl(decodeURIComponent(redirect));
    }
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
      if (!res.ok) {
        throw new Error(data.error || 'Autenticazione fallita');
      }

      // Successful login
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        // Fallback to cockpit root
        window.location.href = '/';
      }
    } catch (err: any) {
      setError(err.message || 'Si è verificato un errore');
      setLoading(false);
    }
  };

  return (
    <div className="login-card animate-fade-up">
      <div className="login-header">
        <div className="logo-badge">G</div>
        <h1>Area Tesserati</h1>
        <p>Accedi al portale unico di Gulliver Ancona</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {error && (
          <div className="error-alert animate-fade">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              required
              placeholder="Inserisci il tuo username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoComplete="username"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              required
              placeholder="Inserisci la tua password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
          {loading ? (
            <span className="spinner"></span>
          ) : (
            <>
              <span>Accedi</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="login-container">
      {/* Background ambient decorations */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      
      <Suspense fallback={
        <div className="login-card text-center animate-fade">
          <p style={{ color: 'var(--gray-500)', margin: '2rem 0' }}>Caricamento portale...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>

      <style jsx global>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f0f11;
          position: relative;
          overflow: hidden;
          padding: 1.5rem;
          color: var(--white);
        }

        .login-container h1,
        .login-container h2,
        .login-container h3,
        .login-container h4,
        .login-container h5,
        .login-container h6 {
          color: var(--white) !important;
        }

        .login-container p {
          color: var(--gray-400) !important;
        }

        .bg-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.15;
          z-index: 1;
          pointer-events: none;
        }

        .bg-glow-1 {
          background: var(--red-primary);
          top: -10%;
          left: -10%;
        }

        .bg-glow-2 {
          background: #5b21b6;
          bottom: -10%;
          right: -10%;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          background: rgba(26, 26, 30, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
          z-index: 2;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2.25rem;
        }

        .logo-badge {
          width: 48px;
          height: 48px;
          background: var(--red-primary);
          color: var(--white);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          margin: 0 auto 1.25rem;
          box-shadow: var(--shadow-red);
        }

        .login-header h1 {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 0.5rem;
        }

        .login-header p {
          color: var(--gray-400);
          font-size: 0.95rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .error-alert {
          background: rgba(220, 38, 38, 0.12);
          border: 1px solid rgba(220, 38, 38, 0.3);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          color: #fca5a5;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-family: var(--font-heading);
          font-weight: 500;
          font-size: 0.85rem;
          color: var(--gray-300);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper input {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: 0.85rem 1.25rem;
          color: var(--white);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: all var(--transition-base);
        }

        .input-wrapper input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--red-primary);
          box-shadow: 0 0 0 4px rgba(228, 3, 41, 0.15);
        }

        .btn-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.85rem;
          font-size: 1rem;
          margin-top: 0.5rem;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: var(--white);
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}

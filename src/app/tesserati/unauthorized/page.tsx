'use client';

import React from 'react';

export default function UnauthorizedPage() {
  const handleGoHome = () => {
    // Redirect to the centralized cockpit
    const host = window.location.host;
    if (host.includes('localhost')) {
      const port = host.split(':')[1] || '3000';
      window.location.href = `http://tesserati.localhost:${port}`;
    } else {
      window.location.href = 'https://tesserati.gulliverancona.it';
    }
  };

  return (
    <div className="unauth-container">
      {/* Ambient backgrounds */}
      <div className="bg-glow bg-glow-red"></div>

      <div className="unauth-card animate-fade-up">
        <div className="unauth-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        
        <h1>Accesso Negato</h1>
        <div className="divider-red-center"></div>
        <p>
          Il tuo account non ha i permessi richiesti per accedere a questo portale. 
          Se ritieni che sia un errore, contatta l'amministratore per farti assegnare il ruolo corrispondente.
        </p>

        <button onClick={handleGoHome} className="btn btn-primary btn-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Torna alla Dashboard</span>
        </button>
      </div>

      <style jsx global>{`
        .unauth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f0f11;
          position: relative;
          overflow: hidden;
          padding: 1.5rem;
          color: var(--white);
          text-align: center;
        }

        .bg-glow-red {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.15;
          z-index: 1;
          pointer-events: none;
          background: var(--red-primary);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .unauth-card {
          width: 100%;
          max-width: 460px;
          background: rgba(26, 26, 30, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 3rem 2.5rem;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .unauth-icon {
          width: 80px;
          height: 80px;
          background: rgba(228, 3, 41, 0.1);
          color: var(--red-primary);
          border: 1.5px solid rgba(228, 3, 41, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.75rem;
        }

        .unauth-card h1 {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 0.25rem;
        }

        .divider-red-center {
          width: 50px;
          height: 3px;
          background: var(--red-primary);
          border-radius: var(--radius-full);
          margin: 0.75rem auto 1.25rem;
        }

        .unauth-card p {
          color: var(--gray-400);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.75rem;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
}

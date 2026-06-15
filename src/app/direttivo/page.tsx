'use client';

import React from 'react';

export default function DirettivoPage() {
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
    <div className="wip-container">
      {/* Ambient backgrounds */}
      <div className="bg-glow bg-glow-pink"></div>

      <div className="wip-card animate-fade-up">
        <div className="wip-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        
        <h1>Portale Direttivo</h1>
        <div className="divider-pink-center"></div>
        <p>
          Questa sezione è riservata ai membri dell'organo Direttivo di Gulliver Ancona. 
          Qui verranno pubblicati i verbali delle riunioni, lo statuto, i bilanci e altri documenti riservati.
        </p>

        <div className="wip-status">
          <span className="pulse-dot"></span>
          <span>Sezione in fase di implementazione</span>
        </div>

        <button onClick={handleGoHome} className="btn btn-primary btn-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Torna alla Dashboard</span>
        </button>
      </div>

      <style jsx global>{`
        .wip-container {
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
          font-family: 'Inter', sans-serif;
        }

        .bg-glow-pink {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.15;
          z-index: 1;
          pointer-events: none;
          background: #ec4899;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .wip-card {
          width: 100%;
          max-width: 480px;
          background: rgba(26, 26, 30, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 3.5rem 2.5rem;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .wip-icon {
          width: 80px;
          height: 80px;
          background: rgba(236, 72, 153, 0.1);
          color: #ec4899;
          border: 1.5px solid rgba(236, 72, 153, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.75rem;
        }

        .wip-card h1 {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 0.25rem;
        }

        .divider-pink-center {
          width: 50px;
          height: 3px;
          background: #ec4899;
          border-radius: var(--radius-full);
          margin: 0.75rem auto 1.25rem;
        }

        .wip-card p {
          color: var(--gray-400);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .wip-status {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          color: var(--gray-300);
          font-weight: 600;
          margin-bottom: 2.25rem;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ec4899;
          box-shadow: 0 0 10px #ec4899;
          animation: pulse 2s infinite;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.75rem;
          font-size: 0.95rem;
          background: linear-gradient(135deg, #ec4899, #db2777);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.25);
        }

        .btn-back:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(236, 72, 153, 0.4);
          background: linear-gradient(135deg, #f472b6, #db2777);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
}

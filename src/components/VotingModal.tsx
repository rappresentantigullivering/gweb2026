'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function VotingModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già interagito con il popup
    const hasInteracted = localStorage.getItem('gulliver_vote_interacted');
    if (!hasInteracted) {
      // Mostra il popup dopo un breve delay per effetto
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('gulliver_vote_interacted', 'true');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      animation: 'voting-modal-fadeIn 0.3s ease-out'
    }}>
      <style>{`
        @keyframes voting-modal-fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes voting-modal-slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .voting-modal-btn-primary {
          background-color: #e40329;
          color: white;
          padding: 1rem 2rem;
          border-radius: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 10px 20px -5px rgba(228, 3, 41, 0.4);
          display: block;
          text-align: center;
        }
        .voting-modal-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(228, 3, 41, 0.5);
        }
      `}</style>
      
      <div style={{
        backgroundColor: '#111',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '28px',
        padding: '2.5rem',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        animation: 'voting-modal-slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Effetto luce soffusa */}
        <div style={{
          position: 'absolute',
          top: '-20%', left: '-20%',
          width: '140%', height: '140%',
          background: 'radial-gradient(circle at 50% 50%, rgba(228, 3, 41, 0.1) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative' }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 10px rgba(228,3,41,0.3))'
          }}>🗳️</div>
          
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.25rem',
            fontWeight: 900,
            color: '#fff',
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Hai votato?
          </h2>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '1.1rem',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
            padding: '0 1rem'
          }}>
            Le votazioni per il rinnovo della rappresentanza studentesca sono aperte. La tua voce conta!
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <Link 
              href="#" // Placeholder link
              className="voting-modal-btn-primary"
              onClick={handleClose}
            >
              Vai al voto
            </Link>
            
            <button 
              onClick={handleClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '0.5rem',
                transition: 'color 0.2s',
                textDecoration: 'underline',
                textUnderlineOffset: '4px'
              }}
            >
              Sì, ho già votato
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

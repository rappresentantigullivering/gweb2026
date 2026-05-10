'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Date per il calcolo interno (sincronizzate con ElectionCountdown)
const START_DATE = new Date('2026-05-12T08:00:00+02:00').getTime();
const END_DATE   = new Date('2026-05-14T17:00:00+02:00').getTime();

function getTarget(now: number) {
  if (now >= END_DATE) return 0;
  if (now >= START_DATE) return END_DATE;
  return START_DATE;
}

export default function VotingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già interagito con il popup
    const hasInteracted = localStorage.getItem('gulliver_vote_interacted');
    if (!hasInteracted) {
      // Mostra il popup dopo un breve delay per effetto
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const target = getTarget(now);
      
      if (target === 0) {
        setIsEnded(true);
        return;
      }

      const distance = target - now;
      setTimeLeft({
        days:    Math.floor(distance / 86400000),
        hours:   Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000)  / 60000),
        seconds: Math.floor((distance % 60000)    / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('gulliver_vote_interacted', 'true');
  };

  // Se le elezioni sono finite o il modal è chiuso, non mostrare nulla
  if (!isOpen || isEnded) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      animation: 'voting-modal-fadeIn 0.3s ease-out'
    }}>
      <style>{`
        @keyframes voting-modal-fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes voting-modal-slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .voting-modal-btn-primary {
          background-color: #e40329;
          color: white;
          padding: 1.1rem 2rem;
          border-radius: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 10px 25px -5px rgba(228, 3, 41, 0.4);
          display: block;
          text-align: center;
          font-size: 1.1rem;
        }
        .voting-modal-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px -5px rgba(228, 3, 41, 0.5);
        }
      `}</style>
      
      <div style={{
        backgroundColor: '#0a0a0a',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '32px',
        padding: '3rem 2rem',
        maxWidth: '440px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.9)',
        animation: 'voting-modal-slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Effetto luce soffusa */}
        <div style={{
          position: 'absolute',
          top: '-10%', left: '-10%',
          width: '120%', height: '120%',
          background: 'radial-gradient(circle at 50% 50%, rgba(228, 3, 41, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.6rem',
            fontWeight: 900,
            color: '#fff',
            marginBottom: '0.5rem',
            letterSpacing: '-0.03em'
          }}>
            Hai ancora tempo!
          </h2>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '2rem'
          }}>
            Le votazioni chiudono tra:
          </p>

          {/* Mini Countdown Interno */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.8rem',
            marginBottom: '3rem',
            alignItems: 'baseline'
          }}>
            {[
              { val: timeLeft.days, label: 'gg' },
              { val: timeLeft.hours, label: 'hh' },
              { val: timeLeft.minutes, label: 'mm' },
              { val: timeLeft.seconds, label: 'ss' }
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                {i > 0 && <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '1.5rem', fontWeight: 300 }}>:</span>}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                   <span style={{ 
                     fontSize: '2.4rem', 
                     fontWeight: 950, 
                     color: item.label === 'ss' ? '#e40329' : '#fff',
                     fontVariantNumeric: 'tabular-nums',
                     lineHeight: 1
                   }}>
                     {String(item.val).padStart(2, '0')}
                   </span>
                   <span style={{ 
                     fontSize: '0.65rem', 
                     color: 'rgba(255,255,255,0.3)', 
                     textTransform: 'uppercase',
                     marginTop: '0.4rem',
                     fontWeight: 700
                   }}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
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
                color: 'rgba(255, 255, 255, 0.3)',
                fontSize: '0.9rem',
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

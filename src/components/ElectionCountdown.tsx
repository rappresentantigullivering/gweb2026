'use client';

import { useState, useEffect } from 'react';

// Imposta la data target: 12 Maggio 2026 alle 08:00
const TARGET_DATE = new Date('2026-05-12T08:00:00+02:00').getTime();
// Fine elezioni: 14 Maggio 2026 alle 18:00 (o l'orario effettivo di fine)
const END_DATE = new Date('2026-05-14T18:00:00+02:00').getTime();

export default function ElectionCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [status, setStatus] = useState<'WAITING' | 'ACTIVE' | 'ENDED'>('WAITING');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const interval = setInterval(() => {
      const now = new Date().getTime();

      if (now >= END_DATE) {
        setStatus('ENDED');
        clearInterval(interval);
        return;
      }

      if (now >= TARGET_DATE) {
        setStatus('ACTIVE');
        // Countdown alla fine
        const distanceToEnd = END_DATE - now;
        setTimeLeft({
          days: Math.floor(distanceToEnd / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distanceToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distanceToEnd % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distanceToEnd % (1000 * 60)) / 1000),
        });
        return;
      }

      // Countdown all'inizio
      const distance = TARGET_DATE - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null; // Evita problemi di idratazione lato server

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      background: 'rgba(0, 0, 0, 0.2)',
      padding: '1.25rem 1.5rem',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      marginTop: '1rem',
      maxWidth: '400px'
    }}>
      <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {status === 'WAITING' && 'Le urne aprono tra:'}
        {status === 'ACTIVE' && 'URNE APERTE! Chiudono tra:'}
        {status === 'ENDED' && 'Elezioni concluse'}
      </div>
      
      {status !== 'ENDED' && (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--white)', lineHeight: 1, fontFamily: 'monospace' }}>
              {timeLeft.days.toString().padStart(2, '0')}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Giorni</span>
          </div>
          <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.3)', fontWeight: 300, marginTop: '-15px' }}>:</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--white)', lineHeight: 1, fontFamily: 'monospace' }}>
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Ore</span>
          </div>
          <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.3)', fontWeight: 300, marginTop: '-15px' }}>:</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--white)', lineHeight: 1, fontFamily: 'monospace' }}>
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Min</span>
          </div>
          <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.3)', fontWeight: 300, marginTop: '-15px' }}>:</span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--red-light)', lineHeight: 1, fontFamily: 'monospace' }}>
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Sec</span>
          </div>
        </div>
      )}
    </div>
  );
}

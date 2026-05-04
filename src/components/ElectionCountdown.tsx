'use client';

import { useState, useEffect } from 'react';

// Date chiave
// 1. Inizio silenzio elettorale: 11 Maggio 2026 00:00:00
const SILENZIO_DATE = new Date('2026-05-11T00:00:00+02:00').getTime();
// 2. Inizio elezioni (apertura votazioni): 12 Maggio 2026 08:00:00
const START_DATE = new Date('2026-05-12T08:00:00+02:00').getTime();
// 3. Fine elezioni (chiusura votazioni): 14 Maggio 2026 19:00:00
const END_DATE = new Date('2026-05-14T19:00:00+02:00').getTime();

type Phase = 'CAMPAIGN' | 'SILENCE' | 'VOTING' | 'ENDED';

interface ElectionCountdownProps {
  variant?: 'banner' | 'epic';
}

export default function ElectionCountdown({ variant = 'banner' }: ElectionCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [phase, setPhase] = useState<Phase>('CAMPAIGN');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setIsClient(true);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      let targetDistance = 0;

      if (now >= END_DATE) {
        setPhase('ENDED');
        clearInterval(interval);
        return;
      } else if (now >= START_DATE) {
        setPhase('VOTING');
        targetDistance = END_DATE - now;
      } else if (now >= SILENZIO_DATE) {
        setPhase('SILENCE');
        targetDistance = START_DATE - now;
      } else {
        setPhase('CAMPAIGN');
        targetDistance = START_DATE - now;
      }

      setTimeLeft({
        days: Math.floor(targetDistance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((targetDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((targetDistance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((targetDistance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  const isEpic = variant === 'epic';

  const containerStyle = isEpic ? {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '2rem',
    width: '100%',
  } : {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '1.25rem 1.5rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    marginTop: '1rem',
    maxWidth: '400px'
  };

  const titleStyle = isEpic ? {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    color: 'var(--white)',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    textAlign: 'center' as const,
    textShadow: '0 4px 20px rgba(211, 47, 47, 0.5)'
  } : {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  };

  const numberStyle = {
    fontSize: isEpic ? 'clamp(3rem, 8vw, 6rem)' : '2rem',
    fontWeight: 900,
    color: 'var(--white)',
    lineHeight: 1,
    fontFamily: 'monospace',
    textShadow: isEpic ? '0 8px 30px rgba(0,0,0,0.5)' : 'none'
  };

  const redNumberStyle = {
    ...numberStyle,
    color: 'var(--red-light)',
    textShadow: isEpic ? '0 0 40px rgba(239, 83, 80, 0.6)' : 'none'
  };

  const labelStyle = {
    fontSize: isEpic ? 'clamp(0.8rem, 2vw, 1.2rem)' : '0.75rem',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase' as const,
    letterSpacing: isEpic ? '0.2em' : 'normal',
    marginTop: isEpic ? '0.5rem' : '0'
  };

  const colonStyle = {
    fontSize: isEpic ? 'clamp(2rem, 6vw, 4rem)' : '1.5rem',
    color: 'rgba(255,255,255,0.3)',
    fontWeight: 300,
    marginTop: isEpic ? '-30px' : '-15px'
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>
        {phase === 'CAMPAIGN' && 'Alle elezioni studentesche vota Gulliver, Lista 1'}
        {phase === 'SILENCE' && 'Elezioni studentesche tra:'}
        {phase === 'VOTING' && 'VOTA ORA! Le elezioni finiscono tra:'}
        {phase === 'ENDED' && 'Elezioni concluse'}
      </div>
      
      {phase !== 'ENDED' && (
        <div style={{ display: 'flex', gap: isEpic ? '2rem' : '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={numberStyle}>
              {timeLeft.days.toString().padStart(2, '0')}
            </span>
            <span style={labelStyle}>Giorni</span>
          </div>
          <span style={colonStyle}>:</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={numberStyle}>
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span style={labelStyle}>Ore</span>
          </div>
          <span style={colonStyle}>:</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={numberStyle}>
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span style={labelStyle}>Min</span>
          </div>
          <span style={colonStyle}>:</span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={redNumberStyle}>
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span style={labelStyle}>Sec</span>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

// Target date: Saturday, May 23, 2026 at 20:00 (8:00 PM) Italian Time
const TARGET_DATE = new Date('2026-05-23T20:00:00+02:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(distance: number): TimeLeft {
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000),
  };
}

export default function GulliverRockCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = Date.now();
      const distance = TARGET_DATE - now;
      if (distance <= 0) {
        setIsLive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsLive(false);
        setTimeLeft(calcTimeLeft(distance));
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '1.25rem 1.75rem',
      marginTop: '1rem',
      maxWidth: '450px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    }}>
      <p style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        fontSize: '0.85rem',
        letterSpacing: '0.08em',
        color: '#ff4d6d',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        {isLive ? 'IL FESTIVAL È IN CORSO!' : 'IL FESTIVAL INIZIA TRA'}
      </p>

      {isLive ? (
        <p style={{
          fontSize: '1.1rem',
          color: '#fff',
          fontWeight: 700,
          margin: '0.2rem 0 0',
          textShadow: '0 0 10px rgba(255, 77, 109, 0.6)',
        }}>
          Ci vediamo in Piazza Roma! L\'ingresso è gratuito!
        </p>
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.6rem', marginTop: '0.2rem' }}>
          {([
            ['days', 'GG'],
            ['hours', 'HH'],
            ['minutes', 'MM'],
            ['seconds', 'SS']
          ] as const).map(([k, label], i) => (
            <div key={k} style={{ display: 'flex', alignItems: 'flex-end', gap: '0.6rem' }}>
              {i > 0 && (
                <span style={{
                  fontSize: '1.8rem',
                  fontWeight: 300,
                  color: 'rgba(255, 255, 255, 0.2)',
                  lineHeight: 1,
                  marginBottom: '0.35rem'
                }}>
                  :
                </span>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '2.2rem',
                  lineHeight: 1,
                  color: k === 'seconds' ? '#ff4d6d' : '#fff',
                  letterSpacing: '-0.02em',
                  textShadow: k === 'seconds' ? '0 0 15px rgba(255, 77, 109, 0.6)' : 'none',
                }}>
                  {String(timeLeft[k]).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginTop: '0.25rem',
                }}>
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

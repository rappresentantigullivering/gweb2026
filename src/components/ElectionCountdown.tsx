'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ── DATE CHIAVE ──────────────────────────────────────────
const SILENZIO_DATE = new Date('2026-05-11T00:00:00+02:00').getTime(); // Inizio silenzio
const START_DATE    = new Date('2026-05-12T08:00:00+02:00').getTime(); // Apertura votazioni
const END_DATE      = new Date('2026-05-14T19:00:00+02:00').getTime(); // Chiusura votazioni

type Phase = 'CAMPAIGN' | 'SILENCE' | 'VOTING' | 'ENDED';

interface TimeLeft {
  days: number; hours: number; minutes: number; seconds: number;
}

function getPhaseAndTarget(now: number): { phase: Phase; target: number } {
  if (now >= END_DATE)      return { phase: 'ENDED',    target: 0 };
  if (now >= START_DATE)    return { phase: 'VOTING',   target: END_DATE };
  if (now >= SILENZIO_DATE) return { phase: 'SILENCE',  target: START_DATE };
  return                           { phase: 'CAMPAIGN', target: START_DATE };
}

function calcTimeLeft(distance: number): TimeLeft {
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(distance / 86400000),
    hours:   Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000)  / 60000),
    seconds: Math.floor((distance % 60000)    / 1000),
  };
}

interface ElectionCountdownProps {
  variant?: 'banner' | 'epic';
}

export default function ElectionCountdown({ variant = 'banner' }: ElectionCountdownProps) {
  const [phase, setPhase]     = useState<Phase>('CAMPAIGN');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted]  = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = Date.now();
      const { phase: p, target } = getPhaseAndTarget(now);
      setPhase(p);
      setTimeLeft(calcTimeLeft(target - now));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  // ── BANNER VARIANT (homepage) ────────────────────────────
  if (variant === 'banner') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '0.6rem',
        background: 'rgba(0,0,0,0.22)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '16px', padding: '1.1rem 1.5rem',
        marginTop: '1.25rem', maxWidth: '420px',
      }}>
        <p style={{
          fontFamily: 'var(--font-heading)', fontWeight: 700,
          fontSize: '0.78rem', textTransform: 'uppercase',
          letterSpacing: '0.12em', color: 'rgba(255,255,255,0.75)',
        }}>
          {phase === 'CAMPAIGN' && 'Vota Gulliver · Lista 1 ·  le votazioni iniziano tra:'}
          {phase === 'SILENCE'  && 'Elezioni studentesche tra:'}
          {phase === 'VOTING'   && '🗳 VOTA ADESSO — le elezioni chiudono tra:'}
          {phase === 'ENDED'    && 'Elezioni concluse · grazie!'}
        </p>
        {phase !== 'ENDED' && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
            {([['days','GG'],['hours','HH'],['minutes','MM'],['seconds','SS']] as const).map(([k, label], i) => (
              <div key={k} style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                {i > 0 && <span style={{ fontSize: '1.6rem', fontWeight: 300, color: 'rgba(255,255,255,0.25)', lineHeight: 1, marginBottom: '0.2rem' }}>:</span>}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 900,
                    fontSize: '2rem', lineHeight: 1, color: k === 'seconds' ? 'var(--red-light)' : 'var(--white)',
                    letterSpacing: '-0.02em',
                  }}>
                    {String(timeLeft[k]).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── EPIC VARIANT (pagina /countdown) ────────────────────
  const phaseLabel = {
    CAMPAIGN: { eyebrow: 'Elezioni Studentesche UNIVPM 2026', headline: 'Vota Gulliver\nLista 1', sub: 'Le votazioni online iniziano tra:' },
    SILENCE:  { eyebrow: 'Silenzio Elettorale', headline: 'Elezioni\nstudenteschein corso', sub: 'Le urne aprono tra:' },
    VOTING:   { eyebrow: '🗳 URNE APERTE — VOTA ORA', headline: 'Le elezioni\nchiudono tra:', sub: 'Vai su Esse3 e vota Gulliver, Lista 1' },
    ENDED:    { eyebrow: 'Elezioni concluse', headline: 'Grazie per\naver votato', sub: '' },
  }[phase];

  return (
    <div className="epic-countdown-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&display=swap');

        .epic-countdown-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #0d0101;
          position: relative;
          overflow: hidden;
          padding: 2rem 1.5rem;
          font-family: 'Outfit', sans-serif;
        }

        /* Bagliore centrale pulsante */
        .epic-glow {
          position: absolute;
          top: 50%; left: 50%;
          width: 900px; height: 900px;
          background: radial-gradient(circle, rgba(228,3,41,0.18) 0%, transparent 65%);
          transform: translate(-50%, -50%);
          animation: epic-pulse 5s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes epic-pulse {
          from { opacity: 0.5; transform: translate(-50%, -50%) scale(0.95); }
          to   { opacity: 1;   transform: translate(-50%, -50%) scale(1.05); }
        }

        /* Linea decorativa */
        .epic-divider {
          width: 60px; height: 3px;
          background: var(--red-primary, #e40329);
          border-radius: 99px;
          margin: 0 auto 2rem;
        }

        /* Testo eyebrow */
        .epic-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.75rem, 2vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #e40329;
          text-align: center;
          margin-bottom: 1rem;
        }

        /* Titolo principale */
        .epic-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 900;
          line-height: 1.0;
          text-align: center;
          color: #fff;
          letter-spacing: -0.03em;
          white-space: pre-line;
          text-shadow: 0 4px 40px rgba(0,0,0,0.6);
          margin-bottom: 1.5rem;
        }

        /* Sottotitolo */
        .epic-sub {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.9rem, 2.5vw, 1.2rem);
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          text-align: center;
          letter-spacing: 0.04em;
          margin-bottom: 3rem;
        }

        /* Blocchi cifre */
        .epic-digits {
          display: flex;
          gap: clamp(0.25rem, 1.5vw, 2rem);
          align-items: flex-end;
          justify-content: center;
          margin-bottom: 3.5rem;
          flex-wrap: nowrap;
          width: 100%;
        }
        .epic-digit-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .epic-digit-box {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: clamp(0.5rem, 1.5vw, 1.5rem) clamp(0.4rem, 1.5vw, 2rem);
          min-width: clamp(56px, calc(20vw - 12px), 140px);
          text-align: center;
          backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
        }
        .epic-digit-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%);
          pointer-events: none;
        }
        .epic-digit-num {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2rem, 5.5vw, 7rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #fff;
          display: block;
        }
        .epic-digit-num.red {
          color: #e40329;
          text-shadow: 0 0 60px rgba(228,3,41,0.6), 0 0 120px rgba(228,3,41,0.25);
        }
        .epic-digit-label {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.55rem, 1.2vw, 0.9rem);
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .epic-colon {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.5rem, 4vw, 5rem);
          font-weight: 300;
          color: rgba(255,255,255,0.15);
          margin-bottom: 1.5rem;
          line-height: 1;
        }

        /* Pulsanti */
        .epic-actions {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .epic-btn-primary {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          padding: 0.9rem 2.2rem;
          background: #e40329;
          color: #fff;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(228,3,41,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          letter-spacing: 0.01em;
        }
        .epic-btn-primary:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 32px rgba(228,3,41,0.55);
        }
        .epic-btn-outline {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          padding: 0.9rem 2.2rem;
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .epic-btn-outline:hover {
          border-color: rgba(255,255,255,0.6);
          color: #fff;
          background: rgba(255,255,255,0.06);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .epic-inner {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          align-items: center;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          width: 100%; max-width: 900px;
        }
      `}</style>

      <div className="epic-glow" />

      <div className="epic-inner">
        {/* Logo RIMOSSO */}
        {/* Eyebrow RIMOSSO */}
        {/* Divisore RIMOSSO */}

        {/* Titolo */}
        <h1 className="epic-title">{phaseLabel.headline}</h1>

        {/* Sub */}
        {phaseLabel.sub && <p className="epic-sub">{phaseLabel.sub}</p>}

        {/* Cifre */}
        {phase !== 'ENDED' && (
          <div className="epic-digits">
            {([['days','Giorni'],['hours','Ore'],['minutes','Minuti'],['seconds','Secondi']] as const).map(([k, label], i) => (
              <>
                {i > 0 && <span key={`col-${i}`} className="epic-colon">:</span>}
                <div key={k} className="epic-digit-block">
                  <div className="epic-digit-box">
                    <span className={`epic-digit-num${k === 'seconds' ? ' red' : ''}`}>
                      {String(timeLeft[k]).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="epic-digit-label">{label}</span>
                </div>
              </>
            ))}
          </div>
        )}

        {/* Azioni */}
        <div className="epic-actions">
          <Link href="/elezioni-studentesche/programma" className="epic-btn-primary">
            Scopri il Programma
          </Link>
          <Link href="/" className="epic-btn-outline">
            ← Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
}

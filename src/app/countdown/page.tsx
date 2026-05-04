'use client';

import Image from 'next/image';
import Link from 'next/link';
import ElectionCountdown from '@/components/ElectionCountdown';

export default function CountdownPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a0505 0%, #4a0f0f 50%, #1a0505 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem'
    }}>
      {/* Effetto bagliore di sfondo pulsante */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glow-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .countdown-btn-primary:hover { transform: scale(1.06) !important; }
        .countdown-btn-outline:hover { background: rgba(255,255,255,0.1) !important; border-color: white !important; }
      `}} />

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '90vw',
        height: '90vw',
        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.18) 0%, transparent 65%)',
        animation: 'glow-pulse 4s ease-in-out infinite alternate',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3.5rem',
        animation: 'slideUp 0.9s ease-out forwards',
        maxWidth: '1000px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <div style={{ opacity: 0.85 }}>
          <Image
            src="/gulliver-tondo.png"
            alt="Gulliver UNIVPM"
            width={90}
            height={90}
            style={{ filter: 'drop-shadow(0 0 16px rgba(220, 38, 38, 0.5))' }}
          />
        </div>

        {/* Countdown */}
        <ElectionCountdown variant="epic" />

        {/* Tasti azione */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/elezioni-studentesche/programma"
            className="countdown-btn-primary"
            style={{
              padding: '1rem 2.2rem',
              background: '#dc2626',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 4px 20px rgba(220, 38, 38, 0.45)',
              transition: 'transform 0.2s ease',
              display: 'inline-block'
            }}
          >
            Scopri il Programma
          </Link>
          <Link
            href="/"
            className="countdown-btn-outline"
            style={{
              padding: '1rem 2.2rem',
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.3)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '1.1rem',
              transition: 'all 0.2s ease',
              display: 'inline-block'
            }}
          >
            Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
}

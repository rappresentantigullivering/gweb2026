import { Metadata } from 'next';
import ElectionCountdown from '@/components/ElectionCountdown';

export const metadata: Metadata = {
  title: 'Countdown Elezioni 2026',
  description: 'Manca pochissimo alle elezioni studentesche dell\'Università Politecnica delle Marche. Vota Gulliver, Lista 1.',
};

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
      {/* Effetto particelle/luce di sfondo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vw',
        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
        animation: 'pulse 4s infinite alternate',
        pointerEvents: 'none'
      }} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4rem',
        animation: 'slideUp 1s ease-out forwards',
        maxWidth: '1200px',
        width: '100%'
      }}>
        
        {/* Logo piccolo in alto */}
        <div style={{ opacity: 0.8 }}>
          <img src="/gulliver-tondo.png" alt="Gulliver" width={80} height={80} style={{ filter: 'drop-shadow(0 0 10px rgba(255,0,0,0.3))' }} />
        </div>

        {/* Il Countdown Epico */}
        <ElectionCountdown variant="epic" />

        {/* Tasti azione rapidi */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
          <a href="/elezioni-studentesche/programma" style={{
            padding: '1rem 2rem',
            background: 'var(--red-primary)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '1.1rem',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Scopri il Programma
          </a>
          <a href="/" style={{
            padding: '1rem 2rem',
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.3)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: 'var(--radius-full)',
            fontWeight: 700,
            fontSize: '1.1rem',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'white'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          >
            Torna alla Home
          </a>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guida Erdis 2026 | Gulliver",
  description: "Le Guide dello Studente Gulliver per l'anno accademico 2026/2027.",
};

export default function Guide26Page() {
  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, var(--red-darker) 0%, var(--red-primary) 100%)',
        padding: '10rem 1.5rem 6rem',
        position: 'relative',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-2px', left: 0, right: 0,
          height: '60px',
          background: 'var(--white)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag section-tag-white">Anno Accademico 2026/2027</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900 }}>
            Guida Erdis 2026
          </h1>
        </div>
      </div>

      <section className="section" style={{ padding: '4rem 1.5rem 8rem' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="card" style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            borderTop: '5px solid var(--red-primary)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'var(--red-soft)',
              color: 'var(--red-primary)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              marginBottom: '1rem'
            } as any}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Scarica la Guida Servizi ERDIS</h2>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: '500px', lineHeight: 1.7 }}>
              Consulta il documento per trovare tutte le informazioni utili riguardanti le borse di studio ERDIS, le iscrizioni, le esenzioni delle tasse e il portale dello studente.
            </p>

            <a 
              href="/docs/2026/guida26-27.pdf"
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-lg" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginTop: '1rem', padding: '0.8rem 2rem' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Visualizza la Guida (PDF)</span>
            </a>

            <div style={{ marginTop: '0.5rem' }}>
              <a 
                href="/docs/2026/guida26-27.pdf"
                download 
                style={{ 
                  color: 'var(--gray-500)', 
                  fontSize: '0.9rem', 
                  textDecoration: 'underline',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Scarica per consultazione offline
              </a>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/" className="btn btn-outline">
                Torna alla Home
              </Link>
              <Link href="/matricole" className="btn btn-outline">
                Portale Matricole
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

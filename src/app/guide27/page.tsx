import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide dello Studente 2026/2027 | Gulliver",
  description: "Le Guide dello Studente Gulliver per l'anno accademico 2026/2027 saranno disponibili a partire da Settembre.",
};

export default function Guide27Page() {
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
            Guide dello Studente 2027
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '1rem', fontSize: '1.2rem', maxWidth: '600px', marginInline: 'auto' }}>
            Tutto quello che c&apos;è da sapere sulla burocrazia, le borse di studio e la vita accademica.
          </p>
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
              fontSize: '4rem',
              lineHeight: 1,
              animation: 'float 3s ease-in-out infinite'
            }}>
              📚
            </div>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
            `}} />
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>In fase di aggiornamento</h2>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: '500px', lineHeight: 1.7 }}>
              Le nostre guide pratiche su <strong>borse di studio ERDIS, iscrizioni, esenzioni tasse e portale dello studente</strong> per il nuovo anno accademico sono in fase di revisione e saranno pubblicate a breve.
            </p>

            <div style={{
              background: 'var(--gray-100)',
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--red-primary)',
              marginTop: '1rem'
            }}>
              📅 Disponibile a partire da Settembre 2026
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/" className="btn btn-primary">
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

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gruppi WhatsApp Matricole 2026/2027 | Gulliver",
  description: "I gruppi WhatsApp ufficiali delle matricole Gulliver per l'anno accademico 2026/2027 saranno aperti a Settembre.",
};

export default function Gruppi26Page() {
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
            Gruppi WhatsApp Matricole 2026
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '1rem', fontSize: '1.2rem', maxWidth: '600px', marginInline: 'auto' }}>
            Incontra i tuoi futuri compagni di corso e rimani sempre aggiornato.
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
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>In fase di creazione</h2>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: '500px', lineHeight: 1.7 }}>
              I link dei gruppi WhatsApp suddivisi per corso di laurea per le matricole dell&apos;anno accademico 2026/2027 verranno pubblicati in questa sezione all&apos;inizio del periodo di immatricolazione.
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
              Disponibile da Settembre 2026
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

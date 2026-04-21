import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convenzioni | Associazione Culturale",
  description: "Le convenzioni Gulliver per gli studenti UNIVPM: sconti e agevolazioni in tutta Ancona.",
};

export default function ConvenzioniPage() {
  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, var(--red-darker) 0%, var(--red-primary) 100%)',
        padding: '8rem 1.5rem 4rem',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-2px', left: 0, right: 0,
          height: '60px',
          background: 'var(--white)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
        <div className="container">
          <span className="section-tag section-tag-white">Per gli studenti UNIVPM</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>Convenzioni</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '0.75rem', fontSize: '1.1rem' }}>
            Sconti, agevolazioni e vantaggi per gli studenti.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container text-center">
          <div style={{
            border: '2px dashed var(--gray-300)',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 1.5rem',
            background: 'var(--gray-100)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            <span style={{ fontSize: '3.5rem' }}>🤝</span>
            <h2 style={{ marginTop: '1rem' }}>Lista convenzioni in arrivo</h2>
            <p style={{ marginTop: '0.75rem', color: 'var(--gray-500)' }}>
              Stiamo raccogliendo tutte le nostre convenzioni attive. Torna presto!
            </p>
            <Link href="/contatti" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-flex', whiteSpace: 'normal', textAlign: 'center', height: 'auto' }} id="conv-contattaci">
              Hai una convenzione da proporre? Scrivici
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

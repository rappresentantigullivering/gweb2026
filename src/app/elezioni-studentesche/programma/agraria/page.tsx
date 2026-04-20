import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programma Agraria | Gulliver UNIVPM",
  description: "Il programma Gulliver per la Facoltà di Agraria dell'UNIVPM.",
};

const POINTS = [
  "Valorizzazione delle attività pratiche in azienda agraria",
  "Supporto alla sostenibilità dei campus e degli orti didattici",
  "Miglioramento dei collegamenti tra il polo e il centro città",
  "Convenzioni per l'acquisto di materiali e attrezzature tecniche",
  "Potenziamento dei laboratori di microbiologia e biochimica",
];

export default function AgrariaPage() {
  const color = "#2e7d32";
  return (
    <>
      <div style={{
        background: `linear-gradient(135deg, ${color} 0%, var(--dark) 150%)`,
        padding: '8rem 1.5rem 5rem',
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
          <span className="section-tag section-tag-white" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>Programma di Facoltà</span>
          <h1 style={{ color: '#fff', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            Agraria
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ color: 'var(--gray-600)', fontWeight: 600, margin: 0, fontSize: '1.5rem' }}>In aggiornamento</h3>
            </div>

            <div style={{
              marginTop: '4rem',
              padding: '3rem',
              background: color,
              borderRadius: 'var(--radius-2xl)',
              color: '#fff',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Programma completo</h3>
              <p style={{ opacity: 0.9, marginBottom: '2rem' }}>Leggi la proposta integrale per Agraria scaricando il PDF ufficiale.</p>
              <a
                href="/404"
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vai al PDF completo
              </a>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link href="/elezioni-studentesche/programma" className="btn btn-outline" style={{ border: `2px solid ${color}`, color: color }}>
                ← Indietro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

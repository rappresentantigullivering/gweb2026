import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programma Ingegneria | Gulliver UNIVPM",
  description: "Il programma di Gulliver per la Facoltà di Ingegneria dell'UNIVPM.",
};

const POINTS = [
  "Potenziamento dei laboratori didattici e delle attrezzature",
  "Maggiore flessibilità negli orari delle lezioni e degli appelli",
  "Supporto specifico per i progetti di gruppo e i tirocini",
  "Miglioramento degli spazi studio dedicati al polo di Ingegneria",
  "Revisione dei programmi didattici per renderli più attuali",
];

export default function IngegneriaPage() {
  const color = "#6a1b9a";
  return (
    <>
      <div style={{
        background: `linear-gradient(135deg, ${color} 0%, var(--dark) 150%)`,
        padding: '10rem 1.5rem 6rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-2px', left: 0, right: 0,
          height: '70px',
          background: 'var(--white)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag section-tag-white" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>Programma di Facoltà</span>
          <h1 style={{ color: '#fff', marginTop: '2rem', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, textAlign: 'center', textTransform: 'uppercase' }}>
            Ingegneria
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
              paddingTop: '3rem', 
              borderTop: '1px solid var(--gray-200)',
              textAlign: 'center'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--dark)', fontSize: '1.75rem', fontWeight: 800 }}>Scarica il programma completo</h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: '2rem', fontSize: '1.15rem' }}>
                Leggi la proposta integrale scaricando il documento PDF ufficiale.
              </p>
              <a 
                href="/docs/programmi/PROGRAMMA DI INGEGNERIA 2026.pdf" 
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vai al PDF completo
              </a>
            </div>
            
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <Link href="/elezioni-studentesche/programma" className="btn btn-outline" style={{ border: `2px solid ${color}`, color: color, padding: '0.8rem 2rem' }}>
                ← Indietro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

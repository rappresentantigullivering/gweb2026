import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programma Ateneo | Gulliver UNIVPM",
  description: "Il programma di Gulliver per l'Ateneo dell'Università Politecnica delle Marche.",
};

const POINTS = [
  "Miglioramento della qualità della didattica e dei materiali di studio",
  "Semplificazione burocratica e digitalizzazione dei processi",
  "Trasparenza nelle decisioni degli organi accademici",
  "Potenziamento dei servizi di orientamento e placement",
  "Incremento dei fondi per la ricerca e il dottorato",
];

export default function AteneoPage() {
  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, var(--dark) 0%, var(--red-darker) 100%)',
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
          <span className="section-tag section-tag-white">Programma Generale</span>
          <h1 style={{ color: 'var(--white)', marginTop: '2rem', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, textAlign: 'center', textTransform: 'uppercase' }}>
            Ateneo
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ background: 'var(--gray-100)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--red-primary)' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--gray-800)', margin: 0 }}>
                Il nostro impegno per l'Ateneo si basa sul miglioramento della qualità della didattica e sulla digitalizzazione dei processi, garantendo totale trasparenza nelle decisioni degli organi accademici. Lavoriamo al potenziamento dei servizi di orientamento e placement, oltre che all'incremento cruciale dei fondi per la ricerca, per un'università protagonista e a misura di studente.
              </p>
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
                href="/docs/programmi/PROGRAMMA ATENEO 2026.pdf" 
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vai al PDF completo
              </a>
            </div>
            
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <Link href="/elezioni-studentesche/programma" className="btn btn-outline" style={{ padding: '0.8rem 2rem' }}>
                ← Indietro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

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
          <span className="section-tag section-tag-white">Programma Generale</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            🏛️ Ateneo
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem' }}>I punti del nostro programma</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {POINTS.map((point, i) => (
                <li key={i} style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  padding: '1.5rem', 
                  background: 'var(--gray-100)', 
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: '4px solid var(--red-primary)'
                }}>
                  <span style={{ color: 'var(--red-primary)', fontWeight: 'bold' }}>•</span>
                  <span style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--gray-800)' }}>{point}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--dark)', borderRadius: 'var(--radius-2xl)', color: '#fff', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Programma completo</h3>
              <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Scarica il documento completo in formato PDF per leggere tutte le nostre proposte nel dettaglio.</p>
              <a 
                href="/docs/programmi/PROGRAMMA ATENEO 2026.pdf" 
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leggi il PDF completo
              </a>
            </div>
            
            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link href="/elezioni-studentesche/programma" className="btn btn-outline">
                ← Torna al programma generale
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

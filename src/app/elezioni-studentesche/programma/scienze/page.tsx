import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programma Scienze | Gulliver UNIVPM",
  description: "Il programma di Gulliver per la Facoltà di Scienze dell'UNIVPM.",
};

const POINTS = [
  "Mantenimento e potenziamento dei laboratori di ricerca",
  "Supporto alla mobilità per tesi sperimentali e stage",
  "Incentivi per progetti di divulgazione scientifica",
  "Miglioramento delle strutture di Agraria e Scienze",
  "Tutele per gli studenti che svolgono attività sperimentale",
];

export default function ScienzePage() {
  const color = "#1565c0";
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
            Scienze
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2.5rem', fontWeight: 800 }}>Punti salienti per Scienze</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {POINTS.map((point, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ color: color, fontWeight: 900, fontSize: '1.5rem', lineHeight: '1.2' }}>•</span>
                  <span style={{ fontSize: '1.15rem', lineHeight: '1.6', color: 'var(--gray-800)', fontWeight: 500 }}>{point}</span>
                </li>
              ))}
            </ul>

            <div style={{ 
              marginTop: '5rem', 
              padding: '4rem 2rem', 
              background: 'var(--dark)', 
              borderRadius: 'var(--radius-xl)', 
              borderTop: `6px solid ${color}`,
              color: '#fff', 
              textAlign: 'center',
              boxShadow: 'var(--shadow-2xl)'
            }}>
              <h3 style={{ marginBottom: '1.25rem', color: '#fff', fontSize: '1.75rem', fontWeight: 800 }}>Programma completo</h3>
              <p style={{ opacity: 0.9, marginBottom: '2.5rem', fontSize: '1.1rem' }}>Leggi la proposta integrale per Scienze scaricando il PDF ufficiale.</p>
              <a 
                href="/docs/programmi/PROGRAMMA SCIENZE 2026.pdf" 
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vai al PDF completo
              </a>
            </div>
            
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <Link href="/elezioni-studentesche/programma" className="btn btn-outline" style={{ border: `2px solid ${color}`, color: color, padding: '0.8rem 2rem' }}>
                ← Torna ai programmi di Facoltà
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

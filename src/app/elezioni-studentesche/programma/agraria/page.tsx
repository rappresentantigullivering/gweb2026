import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programma Agraria | Gulliver UNIVPM",
  description: "Il programma di Gulliver per la Facoltà di Agraria dell'UNIVPM.",
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
        padding: '10rem 1.5rem 6rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-2px', left: 0, right: 0,
          height: '70px',
          background: 'var(--white)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
        <div className="container">
          <span className="section-tag section-tag-white" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>Programma di Facoltà</span>
          <h1 style={{ color: '#fff', marginTop: '2rem', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            Agraria
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2.5rem', fontWeight: 800 }}>Punti salienti per Agraria</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {POINTS.map((point, i) => (
                <li key={i} style={{ 
                  display: 'flex', 
                  gap: '1.25rem', 
                  padding: '2rem', 
                  background: 'var(--gray-100)', 
                  borderRadius: 'var(--radius-xl)',
                  borderLeft: `5px solid ${color}`,
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <span style={{ color: color, fontWeight: 900, fontSize: '1.2rem' }}>•</span>
                  <span style={{ fontSize: '1.15rem', lineHeight: '1.6', color: 'var(--gray-800)', fontWeight: 500 }}>{point}</span>
                </li>
              ))}
            </ul>

            <div style={{ 
              marginTop: '5rem', 
              padding: '4rem 2rem', 
              background: color, 
              borderRadius: 'var(--radius-2xl)', 
              color: '#fff', 
              textAlign: 'center',
              boxShadow: 'var(--shadow-2xl)'
            }}>
              <h3 style={{ marginBottom: '1.25rem', color: '#fff', fontSize: '1.75rem', fontWeight: 800 }}>Programma completo</h3>
              <p style={{ opacity: 0.9, marginBottom: '2.5rem', fontSize: '1.1rem' }}>Leggi la proposta integrale per Agraria scaricando il PDF ufficiale.</p>
              <a 
                href="/docs/programmi/PROGRAMMA AGRARIA 2026.pdf" 
                className="btn btn-white btn-lg"
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

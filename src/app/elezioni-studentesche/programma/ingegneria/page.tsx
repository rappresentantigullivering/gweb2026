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
            ⚙️ Ingegneria
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem' }}>Punti salienti per Ingegneria</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {POINTS.map((point, i) => (
                <li key={i} style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  padding: '1.5rem', 
                  background: 'var(--gray-100)', 
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: `4px solid ${color}`
                }}>
                  <span style={{ color: color, fontWeight: 'bold' }}>•</span>
                  <span style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--gray-800)' }}>{point}</span>
                </li>
              ))}
            </ul>

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
              <p style={{ opacity: 0.9, marginBottom: '2rem' }}>Leggi la proposta integrale per Ingegneria scaricando il PDF ufficiale.</p>
              <a 
                href="/docs/programmi/PROGRAMMA INGEGNERIA 2026.pdf" 
                className="btn btn-white btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vai al PDF completo
              </a>
            </div>
            
            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link href="/elezioni-studentesche/programma" className="btn btn-outline" style={{ border: `2px solid ${color}`, color: color }}>
                ← Torna ai programmi di Facoltà
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

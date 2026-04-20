import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programma Economia | Gulliver UNIVPM",
  description: "Il programma di Gulliver per la Facoltà di Economia dell'UNIVPM.",
};

const POINTS = [
  "Ampliamento dell'offerta di corsi in lingua inglese",
  "Supporto alla ricerca di stage e tirocini formativi",
  "Miglioramento dell'aula magna e delle dotazioni tecnologiche",
  "Seminari e workshop con esperti del mondo del lavoro",
  "Semplificazione dei piani di studio e della mobilità internazionale",
];

export default function EconomiaPage() {
  const color = "#f9a825";
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
            Economia
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2.5rem', fontWeight: 800 }}>Punti salienti per Economia</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {POINTS.map((point, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ color: color, fontWeight: 900, fontSize: '1.5rem', lineHeight: '1.2' }}>•</span>
                  <span style={{ fontSize: '1.15rem', lineHeight: '1.6', color: 'var(--gray-800)', fontWeight: 500 }}>{point}</span>
                </li>
              ))}
            </ul>

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
                href="/docs/programmi/PROGRAMMA ECONOMIA 2026.pdf" 
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

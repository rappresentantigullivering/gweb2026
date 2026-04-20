import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programma Diritto allo Studio | Gulliver UNIVPM",
  description: "Il programma di Gulliver per il Diritto allo Studio Universitario dell'UNIVPM.",
};

const POINTS = [
  "Ampliamento delle borse di studio e dei benefici ERDIS",
  "Riduzione del costo degli affitti e tutela dei fuori sede",
  "Accessibilità economica alle mense e ai servizi universitari",
  "Supporto psicologico gratuito e strutturato per tutti",
  "Tutela del benessere studentesco in tutte le sue forme",
];

export default function DSUPage() {
  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, var(--dark) 0%, var(--red-darker) 100%)',
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
          <span className="section-tag section-tag-white">Programma Generale</span>
          <h1 style={{ color: 'var(--white)', marginTop: '2rem', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            Diritto allo studio
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2.5rem', fontWeight: 800 }}>I punti del nostro programma</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {POINTS.map((point, i) => (
                <li key={i} style={{ 
                  display: 'flex', 
                  gap: '1.25rem', 
                  padding: '2rem', 
                  background: 'var(--gray-100)', 
                  borderRadius: 'var(--radius-xl)',
                  borderLeft: '5px solid var(--red-primary)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <span style={{ color: 'var(--red-primary)', fontWeight: 900, fontSize: '1.2rem' }}>•</span>
                  <span style={{ fontSize: '1.15rem', lineHeight: '1.6', color: 'var(--gray-800)', fontWeight: 500 }}>{point}</span>
                </li>
              ))}
            </ul>

            <div style={{ 
              marginTop: '5rem', 
              padding: '4rem 2rem', 
              background: 'var(--dark)', 
              borderRadius: 'var(--radius-2xl)', 
              color: '#fff', 
              textAlign: 'center',
              boxShadow: 'var(--shadow-2xl)'
            }}>
              <h3 style={{ marginBottom: '1.25rem', color: '#fff', fontSize: '1.75rem', fontWeight: 800 }}>Programma completo</h3>
              <p style={{ opacity: 0.8, marginBottom: '2.5rem', fontSize: '1.1rem' }}>Scarica il documento completo in formato PDF per approfondire tutte le nostre proposte.</p>
              <a 
                href="/docs/programmi/PROGRAMMA DSU 2026.pdf" 
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leggi il PDF completo
              </a>
            </div>
            
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <Link href="/elezioni-studentesche/programma" className="btn btn-outline" style={{ padding: '0.8rem 2rem' }}>
                ← Torna al programma generale
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

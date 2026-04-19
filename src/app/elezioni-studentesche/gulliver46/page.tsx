import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gulliver46 | Elezioni Studentesche",
  description: "Gioca a Gulliver46 e scopri il programma di Gulliver in modo divertente!",
};

export default function Gulliver46Page() {
  return (
    <main>
      {/* PAGE HERO */}
      <div style={{
        background: 'linear-gradient(135deg, var(--red-darker) 0%, var(--red-primary) 100%)',
        padding: '8rem 1.5rem 5rem',
        position: 'relative',
        textAlign: 'center',
        color: 'white',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-2px', left: 0, right: 0,
          height: '60px',
          background: 'var(--white)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-tag section-tag-white" style={{ margin: '0 auto 1rem' }}>Elezioni Studentesche</span>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            marginBottom: '1rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            color: 'white'
          }}>
            Gulliver46
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            maxWidth: '800px', 
            margin: '0 auto', 
            opacity: 0.95,
            lineHeight: 1.6,
            color: 'white'
          }}>
            Il minigioco ufficiale di Gulliver Sinistra Universitaria
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ 
            width: '100%', 
            maxWidth: '1000px', 
            margin: '0 auto', 
            overflow: 'hidden', 
            borderRadius: 'var(--radius-lg)', 
            border: '8px solid var(--white)', 
            backgroundColor: 'var(--card-bg)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <iframe 
              id="bus-game"
              src="https://gulliver46.pages.dev/" 
              style={{ width: '100%', height: '700px', border: 'none', display: 'block' }}
              allow="accelerometer; gyroscope; magnetometer; fullscreen">
            </iframe>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: '3rem',
            maxWidth: '700px',
            margin: '3rem auto 0'
          }}>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.7 }}>
              Se riscontri problemi di visualizzazione o vuoi un&apos;esperienza più immersiva,{' '}
              <a href="https://gulliver46.pages.dev/" target="_blank" rel="noopener noreferrer" className="link-red" style={{ fontWeight: 600 }}>
                gioca a schermo intero qui
              </a>.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <Link href="/elezioni-studentesche" className="btn btn-outline" style={{ display: 'inline-flex' }}>
                ← Torna alle elezioni
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

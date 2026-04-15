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
      <div style={{
        background: 'linear-gradient(135deg, var(--red-darker) 0%, var(--red-primary) 100%)',
        padding: '8rem 1.5rem 4rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>Gulliver46</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            Il minigioco ufficiale di Gulliver Sinistra Universitaria. Gioca, divertiti e scopri le nostre battaglie.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ 
            width: '100%', 
            maxWidth: '900px', 
            margin: '0 auto', 
            overflow: 'hidden', 
            borderRadius: '16px', 
            border: '4px solid var(--primary-color)', 
            backgroundColor: 'var(--card-bg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <iframe 
              id="bus-game"
              src="https://gulliver46.pages.dev/" 
              style={{ width: '100%', height: '650px', border: 'none', display: 'block' }}
              allow="accelerometer; gyroscope; magnetometer; fullscreen">
            </iframe>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: 'var(--text-light)' }}>
              Se riscontri problemi di visualizzazione o vuoi un'esperienza più immersiva,{' '}
              <a href="https://gulliver46.pages.dev/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline', fontWeight: 600 }}>
                gioca a schermo intero qui
              </a>.
            </p>
            <div style={{ marginTop: '2rem' }}>
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

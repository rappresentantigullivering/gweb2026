import type { Metadata } from "next";
import styles from "./page.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kit dello Studente 2025-2026 | Gulliver",
  description: "Scarica il Kit dellə studentə Gulliver: la guida completa per semplificare la vita universitaria all'UNIVPM.",
};

export default function KitPage() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <span className="section-tag section-tag-white">Kit dellə Studentə 2025-2026</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Benvenutə all&apos;UNIVPM!
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginTop: '1rem', fontSize: '1.25rem', maxWidth: '700px' }}>
            La tua guida essenziale per muoverti in università e in città.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <p className={styles.description}>
              Anche quest’anno il Gulliver ha redatto il <strong>Kit dellə studentə</strong>, per semplificare la vita 
              universitaria dellз studentз dell’UNIVPM, in particolar modo all’inizio del loro percorso di studi.
            </p>
            
            <p className={styles.description}>
              All’interno troverete una guida semplice per muoversi all’interno dell’università, con le informazioni su: 
              scadenze, piano di studio, mobilità internazionale, servizi dell’università e molto altro.
              Il Kit è diviso in tre macro-aree: <strong>l’Università, la città di Ancona e il Gulliver</strong>.
            </p>

            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>🏛️</span>
                <h3 className={styles.featureTitle}>L&apos;Università</h3>
                <p className={styles.featureText}>
                  Tutte le informazioni riguardanti l’Ateneo, le Facoltà, i servizi per lз studentз, gli scadenzari e le agevolazioni previste.
                </p>
              </div>

              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>⚓</span>
                <h3 className={styles.featureTitle}>Ancona Città Univesitaria</h3>
                <p className={styles.featureText}>
                  Agevolazioni per il Trasporto Pubblico, consigli su cosa fare e quali luoghi visitare nella città di Ancona.
                </p>
              </div>

              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>🔴</span>
                <h3 className={styles.featureTitle}>Il Gulliver</h3>
                <p className={styles.featureText}>
                  Presentazione della nostra associazione e resoconto delle attività culturali e di politica universitaria dal 1987.
                </p>
              </div>
            </div>

            <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>Cosa stai aspettando?</h2>
              <p className={styles.ctaText}>
                Scarica subito il Kit dellə Studentə e inizia al meglio il tuo percorso universitario!
              </p>
              <a 
                href="/docs/kit-dello-studente-2025-26.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadButton}
              >
                <span>Leggi il Kit dello Studente (PDF)</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              
              <div style={{ marginTop: '1.5rem' }}>
                <a 
                  href="/docs/kit-dello-studente-2025-26.pdf" 
                  download 
                  style={{ 
                    color: 'var(--gray-500)', 
                    fontSize: '0.9rem', 
                    textDecoration: 'underline',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Scarica per consultarlo offline
                </a>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "4rem" }}>
              <Link href="/matricole" className="btn btn-outline">
                ← Torna a Matricole
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

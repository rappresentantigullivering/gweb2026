import type { Metadata } from "next";
import styles from "./page.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gruppi WhatsApp Matricole 2024/2025 | Gulliver",
  description: "Accedi ai gruppi WhatsApp ufficiali di Gulliver per ogni corso di laurea dell'UNIVPM.",
};

export default function GruppiPage() {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <span className="section-tag section-tag-white">Rimani in contatto</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Gruppi WhatsApp Matricole
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginTop: '1rem', fontSize: '1.25rem', maxWidth: '700px' }}>
            Unisciti alla tua futura classe e inizia a conoscere lɜ tuɜ colleghɜ.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <p className={styles.description}>
              Sono stati pubblicati i link dei gruppi Whatsapp per le matricole A.A. 2024/2025 per ogni 
              Corso di Laurea Triennale, Corso di Laurea Magistrale e Corso di Laurea Magistrale a Ciclo Unico.
            </p>

            <div className={styles.pdfCard}>
              <div className={styles.iconWrapper}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div>
                <h2 className={styles.cardTitle}>Tutti i Link ai Gruppi</h2>
                <p className={styles.cardText}>
                  È possibile trovare i gruppi al file pdf scaricabile qui sotto! 
                </p>
              </div>
              <a 
                href="/docs/gruppi-matricole-2025-26.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadButton}
              >
                <span>Visualizza l&apos;elenco dei gruppi (PDF)</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <div style={{ marginTop: '1rem' }}>
                <a 
                  href="/docs/gruppi-matricole-2025-26.pdf" 
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
                  Scarica elenco per consultazione offline
                </a>
              </div>
              <p className={styles.contactText}>
                Per qualsiasi dubbio o domanda non esitate a <Link href="/contatti" className={styles.contactLink}>contattarci</Link>.
              </p>
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

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Elezioni Studentesche",
  description:
    "Vota Gulliver alle Elezioni Studentesche UNIVPM del 12, 13, 14 maggio. Scopri i candidati e il programma elettorale.",
};

export default function ElezioniPage() {
  return (
    <>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroDates}>
            <span className={styles.dateChip}>12</span>
            <span className={styles.dateSep}>·</span>
            <span className={styles.dateChip}>13</span>
            <span className={styles.dateSep}>·</span>
            <span className={styles.dateChip}>14</span>
            <span className={styles.dateSepLabel}>Maggio 2026</span>
          </div>
          <h1>Elezioni Studentesche UNIVPM</h1>
          <p>
            Abbiamo ancora tanto da fare, facciamolo insieme.
          </p>


        </div>
      </div>

      {/* MANIFESTO PLACEHOLDER */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">La campagna</span>
            <h2>Il Manifesto</h2>
            <div className="divider-red divider-red-center" />
          </div>
          <div className={styles.pdfViewerContainer}>
            <div className={styles.pdfWrapper}>
              <iframe 
                src="/docs/manifesto-elettorale-aggiornato.pdf#toolbar=0" 
                className={styles.pdfFrame}
                title="Manifesto Elettorale 2026"
              />
            </div>
            <div className={styles.pdfFooter}>
              <p>Il caricamento del manifesto dipende dalla velocità della tua connessione.</p>
              <a 
                href="/docs/manifesto-elettorale-aggiornato.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                id="download-manifesto-full"
              >
                Apri a schermo intero (PDF)
              </a>
            </div>
          </div>
          <div className={styles.manifestoActions}>
            <Link href="/elezioni-studentesche/programma" className="btn btn-primary btn-lg" id="elezioni-programma">
              Il nostro programma elettorale
            </Link>
            <Link href="/elezioni-studentesche/candidati" className="btn btn-outline btn-lg" id="elezioni-candidati">
              Scopri i candidati
            </Link>
            <Link href="/elezioni-studentesche/gulliver46" className="btn btn-outline btn-lg" id="elezioni-gioco">
              Gioca a Gulliver46
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}



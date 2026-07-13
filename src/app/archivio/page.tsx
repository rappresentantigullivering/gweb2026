import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Archivio storico",
  description:
    "Esplora le versioni storiche del sito Gulliver, conservate come snapshot statici e indipendenti.",
};

export default function ArchivioPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag section-tag-white">Memoria storica</span>
          <h1>Archivio Gulliver</h1>
          <p>
            Le versioni passate del sito, conservate nel loro aspetto originale
            con pagine, documenti e materiali dell&apos;epoca.
          </p>
        </div>
      </section>

      <section className={styles.archiveSection}>
        <div className="container">
          <div className={styles.intro}>
            <h2>Snapshot disponibili</h2>
            <p>
              Ogni snapshot è indipendente dal sito attuale. I contenuti e i
              collegamenti presenti possono riferirsi a iniziative concluse.
            </p>
          </div>

          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.year}>2025</div>
              <div className={styles.cardBody}>
                <span className={styles.status}>Snapshot statico</span>
                <h3>Sito Gulliver 2025</h3>
                <p>
                  La versione storica con campagna elettorale, candidati,
                  programmi e materiali dedicati alle matricole.
                </p>
                <a className="btn btn-primary" href="/archivio/2025/">
                  Visita lo snapshot
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

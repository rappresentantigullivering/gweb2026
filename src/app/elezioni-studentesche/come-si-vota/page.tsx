import type { Metadata } from "next";
import styles from "./page.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Come si vota",
  description: "Guida interattiva su come votare alle elezioni studentesche UNIVPM 2026.",
};

export default function ComeSiVotaPage() {
  return (
    <div className={styles.root}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag">Guida al Voto</span>
          <h1 className={styles.title}>Come si vota</h1>
          <p className={styles.subtitle}>
            Segui questa guida interattiva per scoprire come esprimere correttamente il tuo voto online per le elezioni UNIVPM 2026.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.embedContainer}>
            <iframe 
              style={{ border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "16px", background: "#fff" }} 
              width="100%" 
              height="600" 
              src="https://embed.figma.com/proto/HKHvjvNoJlGHCOxTFY1fE8/UnivPM?node-id=126-446&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=122%3A68&embed-host=share" 
              allowFullScreen
              title="Guida al Voto Figma"
            />
          </div>

          <div className={styles.info}>
            <div className="card">
              <h3>Voto Online</h3>
              <p>
                Ti ricordiamo che le votazioni si svolgono esclusivamente in modalità telematica tramite la piattaforma Cineca. 
                Per accedere è necessario autenticarsi con le proprie credenziali d&apos;Ateneo.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <Link href="https://uvote2.cineca.it/static/redir.html?idp=samlUnivpm" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Vai alla pagina di voto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

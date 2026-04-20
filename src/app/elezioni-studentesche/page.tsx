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

          <div className={styles.heroCtas}>
            <Link href="/elezioni-studentesche/candidati" className="btn btn-white btn-lg" id="elezioni-candidati">
              Scopri i candidati
            </Link>
            <Link href="/elezioni-studentesche/programma" className="btn btn-outline-white btn-lg" id="elezioni-programma">
              Scopri il programma
            </Link>
            <Link href="/elezioni-studentesche/gulliver46" className="btn btn-outline-white btn-lg" id="elezioni-gioco">
              Gioca a Gulliver46
            </Link>
          </div>
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
          <div className={styles.manifestoCard}>
            <div className={styles.manifestoContent}>
              <div className={styles.manifestoIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div className={styles.manifestoText}>
                <h3>Manifesto Elettorale 2026</h3>
                <p>Scarica e visualizza il documento ufficiale della nostra campagna elettorale in formato PDF.</p>
              </div>
            </div>
            <a 
              href="/docs/manifesto-elettorale-aggiornato.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              id="download-manifesto"
            >
              Visualizza Manifesto (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* PROGRAMMA PREVIEW */}
      <section className={`section section-light`} id="programma-preview">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Il nostro impegno</span>
            <h2>Il programma elettorale</h2>
            <div className="divider-red divider-red-center" />
          </div>

          <div className={`grid-3 ${styles.programGrid}`}>
            {PROGRAMMA_ITEMS.map((item) => (
              <Link key={item.id} href={`/elezioni-studentesche/programma/${item.anchor}`} className={styles.programCard} id={item.id}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/elezioni-studentesche/programma" className="btn btn-primary btn-lg" id="elezioni-programma-completo">
              Leggi il programma completo
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMMI FACOLTA */}
      <section className="section" id="programmi-facolta">
        <div className="container text-center">
          <span className="section-tag">Più vicini a te</span>
          <h2>Programmi di Facoltà e Dipartimento</h2>
          <div className="divider-red divider-red-center" />
          <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Oltre al programma generale, abbiamo proposte specifiche per ogni realtà accademica dell&apos;UNIVPM.
          </p>
          <Link href="/elezioni-studentesche/programma#facolta" className="btn btn-outline btn-lg" id="elezioni-programmi-facolta">
            Vai ai programmi di Facoltà →
          </Link>
        </div>
      </section>
    </>
  );
}

const PROGRAMMA_ITEMS = [
  { id: "prog-didattica", title: "Didattica e tassazione", desc: "Qualità della didattica, riduzione tasse, diritti chiari.", anchor: "didattica" },
  { id: "prog-strutture", title: "Strutture, servizi e spazi", desc: "Aule studio, mense, servizi digitali e spazi di aggregazione.", anchor: "strutture" },
  { id: "prog-sedi", title: "Sedi distaccate", desc: "Stesse tutele e opportunità in tutte le sedi dell'Ateneo.", anchor: "sedi" },
  { id: "prog-diritto", title: "Diritto allo studio", desc: "Borse, residenze, sostegno per chi ne ha bisogno.", anchor: "diritto-studio" },
  { id: "prog-trasporti", title: "Trasporti", desc: "Mobilità accessibile e abbonamenti agevolati.", anchor: "trasporti" },
  { id: "prog-ancona", title: "Ancona città universitaria", desc: "Una città a misura di studente.", anchor: "ancona" },
  { id: "prog-lavoratori", title: "Studenti lavoratori", desc: "Flessibilità e riconoscimento per chi studia e lavora.", anchor: "studenti-lavoratori" },
  { id: "prog-accessibilita", title: "Ateneo sicuro e accessibile", desc: "Inclusività, sicurezza e benessere per tuttɜ.", anchor: "accessibilita" },
  { id: "prog-sostenibilita", title: "Sostenibilità", desc: "Un ateneo green, dalla mobilità agli spazi.", anchor: "sostenibilita" },
];

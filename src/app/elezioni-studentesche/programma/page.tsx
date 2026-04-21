import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Programma Elettorale | Elezioni Studentesche",
};

const TOPICS = [
  { id: "ateneo", slug: "ateneo", title: "Ateneo" },
  { id: "diritto", slug: "dsu", title: "Diritto allo studio universitario" },
  { id: "ancona", slug: "acu", title: "Ancona Città Universitaria" },
  { id: "dottorand3", slug: "dottorandɜ", title: "Dottorandɜ" },
  { id: "specializzand3", slug: "specializzandɜ", title: "Specializzandɜ" },
  { id: "decentrate", slug: "decentrate", title: "Decentrate" },
];

const FACOLTA = [
  { id: "ing", slug: "ingegneria", nome: "Ingegneria", color: "#6a1b9a" }, // Viola
  { id: "med", slug: "medicina", nome: "Medicina", color: "#c62828" },   // Rosso
  { id: "eco", slug: "economia", nome: "Economia", color: "#f9a825" }, // Giallo
  { id: "sci", slug: "scienze", nome: "Scienze", color: "#1565c0" },   // Blu
  { id: "agr", slug: "agraria", nome: "Agraria", color: "#2e7d32" },   // Verde
];

export default function ProgrammaPage() {
  return (
    <>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className="section-tag section-tag-white">Elezioni 12-13-14 Maggio 2026</span>
          <h1>Il nostro programma elettorale</h1>
        </div>
      </div>

      {/* PROGRAMMA GENERALE */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Programma Generale</span>
            <h2>Il nostro impegno per l&apos;Ateneo</h2>
            <div className="divider-red" />
          </div>

          <div className={`grid-3 ${styles.topicsGrid}`}>
            {TOPICS.map((topic) => (
              <Link
                key={topic.id}
                href={`/elezioni-studentesche/programma/${topic.slug}`}
                className={styles.topicCard}
                id={`topic-${topic.slug}`}
              >
                <h4>{topic.title}</h4>
                <p className={styles.discoverText}>Scopri il programma →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMI FACOLTA */}
      <section className={`section section-light`} id="facolta">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Programmi Locali</span>
            <h2>I nostri programmi per le Facoltà e i Dipartimenti</h2>
            <div className="divider-red" />
          </div>

          <div className={`grid-3 ${styles.facoltaGrid}`}>
            {FACOLTA.map((f) => (
              <Link
                key={f.id}
                href={`/elezioni-studentesche/programma/${f.slug}`}
                className={styles.facoltaCard}
                id={`fac-${f.slug}`}
                style={{ '--accent-color': f.color } as React.CSSProperties}
              >
                <h4>{f.nome}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BACK */}
      <section className={styles.backSection}>
        <div className="container">
          <Link href="/elezioni-studentesche" className="btn btn-outline" id="programma-back">
            ← Torna alla pagina Elezioni
          </Link>
        </div>
      </section>
    </>
  );
}

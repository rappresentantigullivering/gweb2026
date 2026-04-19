import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Programma Elettorale | Elezioni Studentesche",
  description:
    "Il programma elettorale di Gulliver per le elezioni studentesche UNIVPM 2025: didattica, tassazione, strutture, diritto allo studio e molto altro.",
};

const TEMI = [
  {
    id: "didattica",
    anchor: "didattica",
    icon: "📚",
    title: "Didattica e tassazione",
    content: [
      "Introduzione di lezioni registrate per tutte le materie",
      "Riduzione delle tasse universitarie e ampliamento degli esoneri",
      "Diritti chiari per studenti fuori corso e part-time",
      "Miglioramento dei regolamenti didattici con il contributo studentesco",
      "Più appelli d'esame e maggiore flessibilità nella prenotazione",
    ],
  },
  {
    id: "strutture",
    anchor: "strutture",
    icon: "🏛️",
    title: "Strutture, servizi e spazi",
    content: [
      "Potenziamento delle aule studio con orari serali e weekend",
      "Wi-Fi stabile e gratuito in tutti gli spazi universitari",
      "Mense accessibili e qualitativamente migliorate",
      "Spazi di aggregazione e co-working per gli studenti",
      "Servizi digitali più efficienti (segreteria, prenotazioni, ecc.)",
    ],
  },
  {
    id: "sedi",
    anchor: "sedi",
    icon: "📍",
    title: "Sedi distaccate",
    content: [
      "Stesse tutele garantite agli studenti di tutte le sedi",
      "Rafforzamento dei servizi nelle sedi di Fermo, San Benedetto, Pesaro e Jesi",
      "Bandi Erasmus accessibili da tutte le sedi",
      "Rappresentanza studentesca attiva in ogni sede",
    ],
  },
  {
    id: "diritto-studio",
    anchor: "diritto-studio",
    icon: "🎓",
    title: "Diritto allo studio",
    content: [
      "Ampliamento delle borse di studio ERDIS",
      "Più posti nelle residenze universitarie e costi calmierati",
      "Supporto psicologico gratuito e accessibile",
      "Sostegno per studenti con bisogni educativi speciali",
      "Fondo di emergenza per studenti in difficoltà economica",
    ],
  },
  {
    id: "trasporti",
    anchor: "trasporti",
    icon: "🚌",
    title: "Trasporti",
    content: [
      "Abbonamento agevolato per i trasporti pubblici locali",
      "Navette universitarie tra le sedi e i punti di aggregazione",
      "Bike sharing e parcheggi sicuri per biciclette",
      "Convenzioni con servizi di car sharing e mobilità condivisa",
    ],
  },
  {
    id: "ancona",
    anchor: "ancona",
    icon: "🏙️",
    title: "Ancona città universitaria",
    content: [
      "Collaborazione con il Comune per politiche abitative studente-friendly",
      "Affitti calmierati e contratti trasparenti per gli studenti",
      "Vita notturna, cultura e sport accessibili alla comunità studentesca",
      "Ancona come polo universitario attrattivo a livello nazionale",
    ],
  },
  {
    id: "studenti-lavoratori",
    anchor: "studenti-lavoratori",
    icon: "💼",
    title: "Studenti lavoratori",
    content: [
      "Riconoscimento ufficiale dello status di studente lavoratore",
      "Esami in modalità compatibile con gli orari di lavoro",
      "Accesso privilegiato alle lezioni registrate",
      "Percorsi di studio flessibili e piani di studio personalizzati",
    ],
  },
  {
    id: "accessibilita",
    anchor: "accessibilita",
    icon: "♿",
    title: "Ateneo sicuro e accessibile",
    content: [
      "Abbattimento delle barriere architettoniche in tutti gli edifici",
      "Supporto concreto per studenti con disabilità e DSA",
      "Sportello di ascolto contro discriminazioni e molestie",
      "Formazione del personale docente e amministrativo sull'inclusività",
    ],
  },
  {
    id: "sostenibilita",
    anchor: "sostenibilita",
    icon: "🌱",
    title: "Sostenibilità",
    content: [
      "Eliminazione della plastica monouso dalle strutture universitarie",
      "Incentivi alla mobilità sostenibile (bici, mezzi pubblici)",
      "Efficienza energetica degli edifici universitari",
      "Raccolta differenziata potenziata in tutti gli spazi",
      "Orti urbani e progetti di agricoltura condivisa",
    ],
  },
];

const FACOLTA = [
  { id: "fac-ingegneria", nome: "Ingegneria", slug: "ingegneria" },
  { id: "fac-economia", nome: "Economia", slug: "economia" },
  { id: "fac-medicina", nome: "Medicina", slug: "medicina" },
  { id: "fac-scienze", nome: "Scienze", slug: "scienze" },
  { id: "fac-agraria", nome: "Agraria", slug: "agraria" },
];

export default function ProgrammaPage() {
  return (
    <>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className="section-tag section-tag-white">Elezioni 12-13-14 Maggio 2025</span>
          <h1>Il nostro programma elettorale</h1>
          <p>9 aree tematiche. Proposte concrete. Dalla stessa parte degli studenti.</p>
          <div className={styles.jumpLinks}>
            {TEMI.map((t) => (
              <a key={t.anchor} href={`#${t.anchor}`} className={styles.jumpChip} id={`jump-${t.anchor}`}>
                {t.icon} {t.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* TEMI */}
      <section className="section">
        <div className="container">
          <div className={styles.temiList}>
            {TEMI.map((tema, i) => (
              <div key={tema.id} className={styles.temaSection} id={tema.anchor}>
                <div className={styles.temaHeader}>
                  <span className={styles.temaNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.temaTitleGroup}>
                    <span className={styles.temaIcon}>{tema.icon}</span>
                    <h2>{tema.title}</h2>
                  </div>
                </div>
                <ul className={styles.temaPoints}>
                  {tema.content.map((point, j) => (
                    <li key={j} className={styles.temaPoint}>
                      <span className={styles.pointBullet}>→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMMI FACOLTA */}
      <section className={`section section-light`} id="facolta">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Più vicini a te</span>
            <h2>I nostri programmi di Facoltà e Dipartimento</h2>
            <div className="divider-red divider-red-center" />
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Ogni facoltà ha esigenze specifiche. Abbiamo elaborato proposte mirate per ogni realtà accademica.
            </p>
          </div>

          <div className={`grid-3 ${styles.facoltaGrid}`}>
            {FACOLTA.map((f) => (
              <Link key={f.id} href={`/elezioni-studentesche/programma/facolta/${f.slug}`} className={`card ${styles.facoltaCard}`} id={f.id}>
                <h4>{f.nome}</h4>
                <p className={styles.comingSoon}>Scopri il programma →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BACK */}
      <div className={styles.backSection}>
        <div className="container">
          <Link href="/elezioni-studentesche" className="btn btn-outline" id="programma-back">
            ← Torna alle Elezioni
          </Link>
        </div>
      </div>
    </>
  );
}

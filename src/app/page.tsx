import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Gulliver è la lista di rappresentanza studentesca dell'Università Politecnica delle Marche. Dal 1987 difendiamo i diritti degli studenti.",
};

const BATTAGLIE = [
  {
    title: "Didattica e tassazione",
    desc: "Lezioni registrate, tasse ridotte e diritti chiari per tutti gli studenti.",
    href: "/elezioni-studentesche/programma#didattica",
    id: "battaglia-didattica",
  },
  {
    title: "Strutture e spazi",
    desc: "Aule studio aperte, mense accessibili e spazi a misura di studente.",
    href: "/elezioni-studentesche/programma#strutture",
    id: "battaglia-strutture",
  },
  {
    title: "Sedi distaccate",
    desc: "Stesse tutele e opportunità in tutte le sedi dell'Ateneo.",
    href: "/elezioni-studentesche/programma#sedi",
    id: "battaglia-sedi",
  },
  {
    title: "Diritto allo studio",
    desc: "Borse di studio, residenze e sostegno concreto per chi ne ha bisogno.",
    href: "/elezioni-studentesche/programma#diritto-studio",
    id: "battaglia-diritto-studio",
  },
  {
    title: "Trasporti",
    desc: "Mobilità accessibile, abbonamenti agevolati e connessione con la città.",
    href: "/elezioni-studentesche/programma#trasporti",
    id: "battaglia-trasporti",
  },
  {
    title: "Ancona città universitaria",
    desc: "Una città che valorizza la presenza studentesca, non la subisce.",
    href: "/elezioni-studentesche/programma#ancona",
    id: "battaglia-ancona",
  },
  {
    title: "Studenti lavoratori",
    desc: "Flessibilità, riconoscimento e supporto per chi studia e lavora.",
    href: "/elezioni-studentesche/programma#studenti-lavoratori",
    id: "battaglia-lavoratori",
  },
  {
    title: "Ateneo sicuro e accessibile",
    desc: "Inclusività, sicurezza e benessere per tutta la comunità studentesca.",
    href: "/elezioni-studentesche/programma#accessibilita",
    id: "battaglia-accessibilita",
  },
  {
    title: "Sostenibilità",
    desc: "Un ateneo green: dalla mobilità alla gestione degli spazi.",
    href: "/elezioni-studentesche/programma#sostenibilita",
    id: "battaglia-sostenibilita",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO PHOTO ── */}
      <section className={styles.hero} id="hero">

        {/* Foto con slogan */}
        <div className={styles.heroPhoto}>
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <p className={styles.heroTag}>Dal 1987 · UNIVPM</p>
            <h1 className={styles.heroSlogan}>
              Essere studenti significa avere dei diritti.
              <br />
              <span className={styles.heroSloganAccent}>
                Essere del Gulliver vuol dire difenderli.
              </span>
            </h1>
            <div className={styles.heroActions}>
              <Link href="/elezioni-studentesche" className="btn btn-primary btn-lg" id="hero-elezioni">
                Elezioni Studentesche
              </Link>
              <Link href="/chi-siamo" className="btn btn-outline-white btn-lg" id="hero-chi-siamo">
                Chi siamo
              </Link>
            </div>
          </div>
          <a href="#about" className={styles.scrollDown} aria-label="Scorri in basso">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── CHI SIAMO ── */}
      <section className={`${styles.about}`} id="about">
        <div className="container">
          <div className={styles.aboutHeader}>
            <span className="section-tag">Chi siamo</span>
            <h2>GULLIVER</h2>
            <div className="divider-red" />
            <p className={styles.aboutIntro}>
              Associazione Culturale e Lista di Rappresentanza, dal 1987 difendiamo i diritti
              della comunità studentesca dell&apos;Università Politecnica delle Marche, tuteliamo
              il Diritto allo Studio e promuoviamo un modello di Università libera, accessibile,
              gratuita e di qualità.
            </p>
          </div>

          <div className={`grid-3 ${styles.aboutCards}`}>
            <div className={`card ${styles.aboutCard}`} id="card-associazione">
              <h3>Associazione Culturale</h3>
              <p>
                Organizziamo attività culturali, seminari e conferenze, ma anche concerti,
                aperitivi e feste, per rendere l&apos;Università un luogo di aggregazione,
                formazione e crescita personale.
              </p>
              <Link href="/associazione-culturale" className={styles.cardLink}>
                Scopri di più →
              </Link>
            </div>

            <div className={`card ${styles.aboutCard} ${styles.aboutCardFeatured}`} id="card-rappresentanza">
              <div className={styles.cardHeader}>
                <h3>Rappresentanza Studentesca</h3>
                <span className={styles.cardTag}>Prima lista d&apos;Ateneo</span>
              </div>
              <p>
                Siamo prima lista d&apos;Ateneo all&apos;UNIVPM, ci occupiamo di aiutare la componente
                studentesca nelle piccole e grandi sfide della vita universitaria. Ci interfacciamo
                direttamente con la Governance d&apos;Ateneo, con l&apos;ERDIS e il Comune.
              </p>
              <Link href="/rappresentanza" className={styles.cardLink}>
                Scopri di più →
              </Link>
            </div>

            <div className={`card ${styles.aboutCard}`} id="card-udu">
              <h3>Unione degli Universitari</h3>
              <p>
                Dal 2008 siamo confederati con l&apos;Unione degli Universitari (UDU), la più grande
                rete nazionale di associazioni studentesche universitarie di stampo sindacale, a cui
                aderiscono ogni anno circa 10.000 studentɜ.
              </p>
              <Link href="/udu" className={styles.cardLink}>
                Scopri di più →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ELEZIONI BANNER ── */}
      <section className={styles.electionBanner} id="elezioni-banner">
        <div className={`container ${styles.electionBannerInner}`}>
          <div className={styles.electionBannerText}>
            <span className="section-tag section-tag-white">12 · 13 · 14 Maggio</span>
            <h2>Elezioni Studentesche 2025</h2>
            <p>Il momento in cui la tua voce conta davvero. Vota Gulliver.</p>
          </div>
          <div className={styles.electionBannerActions}>
            <Link href="/elezioni-studentesche/candidati" className="btn btn-white btn-lg" id="banner-candidati">
              Scopri i candidati
            </Link>
            <Link href="/elezioni-studentesche/programma" className="btn btn-outline-white btn-lg" id="banner-programma">
              Il programma
            </Link>
          </div>
        </div>
      </section>

      {/* ── LE NOSTRE BATTAGLIE ── */}
      <section className={`section section-light ${styles.battaglie}`} id="battaglie">
        <div className="container">
          <div className={`section-header text-center`}>
            <span className="section-tag">Il nostro impegno</span>
            <h2>Le nostre battaglie</h2>
            <div className="divider-red divider-red-center" />
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Ogni proposta nasce dall&apos;ascolto della comunità studentesca.
              Queste sono le aree in cui ci battiamo ogni giorno.
            </p>
          </div>

          <div className={styles.battaglieGrid}>
            {BATTAGLIE.map((b) => (
              <Link key={b.id} href={b.href} className={styles.battagliaCard} id={b.id}>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
                <span className={styles.battagliaArrow}>→</span>
              </Link>
            ))}
          </div>

          <div className={styles.battaglieFooter}>
            <Link href="/elezioni-studentesche/programma" className="btn btn-primary btn-lg" id="battaglie-programma-cta">
              Leggi il programma completo
            </Link>
          </div>
        </div>
      </section>

      {/* ── MATRICOLE BANNER ── */}
      <section className={styles.matricoleBanner} id="matricole-banner">
        <div className={`container ${styles.matricoleBannerInner}`}>
          <div>
            <span className="section-tag">Nuovɜ studentɜ</span>
            <h2>Sei una matricola?</h2>
            <p>Tutto quello che ti serve per iniziare al meglio: guide, gruppi e contatti.</p>
          </div>
          <div className={styles.matricoleBannerActions}>
            <Link href="/matricole/kit" className="btn btn-primary btn-lg" id="banner-kit">
              Kit dello Studente
            </Link>
            <Link href="/matricole/gruppi" className="btn btn-outline btn-lg" id="banner-gruppi">
              Gruppi WhatsApp & Telegram
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className={`section text-center ${styles.ctaSection}`} id="cta-finale">
        <div className="container">
          <span className="section-tag">Unisciti a noi</span>
          <h2>Vuoi fare la differenza?</h2>
          <div className="divider-red divider-red-center" />
          <p style={{ maxWidth: '560px', margin: '0 auto 2.5rem' }}>
            Siamo sempre alla ricerca di persone motivate che vogliono impegnarsi
            per migliorare la vita universitaria ad Ancona. Scrivici, vieni a un&apos;assemblea,
            fai parte del cambiamento.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contatti" className="btn btn-primary btn-lg" id="cta-contattaci">
              Contattaci
            </Link>
            <Link href="/chi-siamo" className="btn btn-outline btn-lg" id="cta-chi-siamo">
              Scopri di più
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

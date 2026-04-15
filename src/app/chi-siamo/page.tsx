import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description:
    "Scopri chi siamo: Gulliver è la lista di rappresentanza studentesca dell'UNIVPM, attiva dal 1987 per i diritti degli studenti.",
};

export default function ChiSiamoPage() {
  return (
    <>
      {/* PAGE HERO */}
      <div className={styles.pageHero}>
        <div className={`container ${styles.pageHeroInner}`}>
          <span className="section-tag section-tag-white">La nostra storia</span>
          <h1>Chi siamo</h1>
          <p>Dal 1987 dalla stessa parte: quella degli studenti.</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="section">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainText}>
              <h2>La nostra storia</h2>
              <div className="divider-red" />
              <p>
                Gulliver nasce nel <strong>1987</strong> come lista di rappresentanza studentesca
                all&apos;Università Politecnica delle Marche. In quasi quarant&apos;anni di attività,
                siamo diventati un punto di riferimento per migliaia di studentɜ che hanno vissuto
                e vivono l&apos;esperienza universitaria ad Ancona.
              </p>
              <p>
                La nostra origine è profondamente legata ai valori della <strong>partecipazione
                democratica</strong>, del diritto allo studio e di un&apos;università pubblica, libera
                e accessibile a tuttɜ, indipendentemente dal reddito e dall&apos;origine.
              </p>
              <p>
                Siamo una realtà che unisce l&apos;impegno politico-sindacale alla dimensione
                culturale e sociale: organizziamo eventi, concerti, aperitivi e assemblee,
                perché crediamo che l&apos;università debba essere anche un luogo di crescita
                personale e collettiva.
              </p>

              <h3 style={{ marginTop: '2rem' }}>Il nostro approccio</h3>
              <p>
                Ogni nostra proposta nasce dall&apos;ascolto diretto dei problemi che gli studenti
                affrontano quotidianamente: dalla burocrazia universitaria, alle difficoltà nel
                trovare alloggio, al costo dei trasporti. Ci interfacciamo direttamente con
                la Governance d&apos;Ateneo, con <strong>ERDIS</strong> (Ente Regionale per il Diritto
                allo Studio) e con le istituzioni comunali.
              </p>
            </div>

            <div className={styles.sidebar}>
              <div className={styles.statCard}>
                <span className={styles.statYear}>1987</span>
                <p>Anno di fondazione</p>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statYear}>2008</span>
                <p>Confederati con UDU</p>
              </div>
              <div className={`card ${styles.infoCard}`}>
                <h4>📍 Dove trovarci</h4>
                <p>Siamo presenti nelle assemblee studentesche, nei Consigli di Dipartimento e negli organi di Ateneo.</p>
                <Link href="/contatti" className="btn btn-primary" style={{ marginTop: '1rem' }} id="chi-siamo-contattaci">
                  Scrivici
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UDU SECTION */}
      <section className={`section section-light`}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">La rete nazionale</span>
            <h2>Unione degli Universitari</h2>
            <div className="divider-red divider-red-center" />
          </div>
          <div className={styles.uduContent}>
            <p>
              Dal <strong>2008</strong> Gulliver è confederata con l&apos;<strong>Unione degli
              Universitari (UDU)</strong>, la più grande rete nazionale di associazioni
              studentesche universitarie di stampo sindacale.
            </p>
            <p>
              All&apos;UDU aderiscono ogni anno circa <strong>10.000 studentɜ</strong> in tutta Italia,
              rendendo questa rete un interlocutore fondamentale nei tavoli nazionali sul diritto
              allo studio, le politiche universitarie e i temi che riguardano il mondo della
              formazione superiore.
            </p>
            <div className={styles.uduAction}>
              <Link href="/udu" className="btn btn-outline btn-lg" id="chi-siamo-udu">
                Scopri di più su UDU →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

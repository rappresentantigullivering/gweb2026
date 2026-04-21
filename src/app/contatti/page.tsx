import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contatti | Gulliver UNIVPM",
  description: "Contatta Gulliver UNIVPM: scrivici via email, segui i nostri social o vieni a trovarci nelle aulette.",
};

const AULETTE = [
  {
    id: "auletta-agraria",
    nome: "Auletta Agraria",
    dove: "Palazzina Orsini, blocco A, piano -1",
    tel: "071.220.4995",
    email: "gulliver.agraria@gmail.com",
    referente: "Serena Fiorentino",
    telefono: "371 3453648",
    color: styles.cardGreen,
  },
  {
    id: "auletta-economia",
    nome: "Auletta Economia",
    dove: "Piano terra, aula T29",
    tel: "071.220.7026",
    email: "gulliverecon@gmail.com",
    referente: "Mattia Taliani",
    telefono: "351 9248800",
    color: styles.cardYellow,
  },
  {
    id: "auletta-ingegneria",
    nome: "Auletta Ingegneria",
    dove: "Polo Monte Dago, quota 150",
    tel: "071.220.4509",
    email: "rappresentantigulliver.ing@gmail.com",
    referente: "Chiara Carlomagno",
    telefono: "351 4244272",
    color: styles.cardPurple,
  },
  {
    id: "auletta-medicina",
    nome: "Auletta Medicina",
    dove: 'Polo Eustachio, piano terra, aula studio "rumorosa"',
    tel: "071.220.7026",
    email: "gulliver.med@gmail.com",
    referente: 'Luigino "Luigi" Ripa',
    telefono: "351 3986205",
    color: styles.cardRed,
  },
  {
    id: "auletta-scienze",
    nome: "Auletta Scienze",
    dove: "Secondo piano Scienze 1",
    tel: "071.220.4937",
    email: "gulliver.scienze@gmail.com",
    referente: "Damiano Pelino",
    telefono: "340 1878935",
    color: styles.cardBlue,
  },
];

export default function ContattiPage() {
  return (
    <>
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className="section-tag section-tag-white">Informazioni, Domande o Proposte</span>
          <h1>Contattaci</h1>
          <p>Vuoi far parte dell&apos;Associazione?</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            {/* EMAIL */}
            <div className={`card ${styles.contactCard}`} id="contact-email">
              <span className={styles.contactIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <h3>Email</h3>
              <p>Per richieste generali e info.</p>
              <a href="mailto:acugulliver@gmail.com" className={styles.contactLink}>
                acugulliver@gmail.com
              </a>
            </div>

            {/* INSTAGRAM */}
            <a href="https://www.instagram.com/acu_gulliver" target="_blank" rel="noopener noreferrer" className={`card ${styles.contactCard} ${styles.contactCardLink}`} id="contact-instagram">
              <span className={styles.contactIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </span>
              <h3>Instagram</h3>
              <p>News, eventi e aggiornamenti.</p>
              <span className={styles.contactLink}>@acu_gulliver</span>
            </a>

            {/* TELEGRAM */}
            <a href="https://t.me/ACUGulliver" target="_blank" rel="noopener noreferrer" className={`card ${styles.contactCard} ${styles.contactCardLink}`} id="contact-telegram">
              <span className={styles.contactIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </span>
              <h3>Telegram</h3>
              <p>Il canale ufficiale per annunci.</p>
              <span className={styles.contactLink}>t.me/ACUGulliver</span>
            </a>

            {/* CONTATTI */}
            <div className={`card ${styles.contactCard} ${styles.contactCardTall}`} id="contact-referenti">
              <span className={styles.contactIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <h3>Contatti</h3>
              <div className={styles.referentiList}>
                <div className={styles.referente}>
                  <strong>Sabrina Brizzola</strong>
                  <span>Coordinatrice Lista Gulliver - Sinistra Universitaria</span>
                  <a href="tel:3314622474" className={styles.contactLink}>331 462 2474</a>
                </div>
                <div className={styles.referente}>
                  <strong>Veronica Barlassina</strong>
                  <span>Presidente Gulliver APS</span>
                  <a href="tel:3394862440" className={styles.contactLink}>339 486 2440</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light" id="aulette">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag" style={{ margin: "0 auto 1rem auto" }}>Le nostre sedi</span>
            <h2>Vieni a trovarci in Auletta</h2>
            <div className="divider-red" style={{ margin: "1rem auto" }} />
            <p style={{ maxWidth: "600px", margin: "0 auto" }}>Siamo presenti in tutte le facoltà dell&apos;UNIVPM. Vieni a trovarci!</p>
          </div>

          <div className={styles.aulettaGrid}>
            {AULETTE.map((a) => (
              <div className={`card ${styles.aulettaCard} ${a.color}`} key={a.id} id={a.id}>
                <div className={styles.aulettaHeader}>
                  <h3>{a.nome}</h3>
                </div>
                <div className={styles.aulettaBody}>
                  <div className={styles.aulettaRow}>
                    <span className={styles.aulettaLabel}>Dove</span>
                    <span>{a.dove}</span>
                  </div>
                  <div className={styles.aulettaRow}>
                    <span className={styles.aulettaLabel}>Tel</span>
                    <a href={`tel:${a.tel.replace(/\./g, "")}`} className={styles.aulettaLink}>{a.tel}</a>
                  </div>
                  <div className={styles.aulettaRow}>
                    <span className={styles.aulettaLabel}>Email</span>
                    <a href={`mailto:${a.email}`} className={styles.aulettaLink}>{a.email}</a>
                  </div>
                  <div className={`${styles.aulettaRow} ${styles.aulettaReferente}`}>
                    <span className={styles.aulettaLabel}>Referente</span>
                    <div>
                      <span className={styles.aulettaReferenteName}>{a.referente}</span>
                      <a href={`tel:${a.telefono.replace(/ /g, "")}`} className={styles.aulettaLink}>{a.telefono}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

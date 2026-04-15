import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contatti | Gulliver UNIVPM",
  description: "Contatta Gulliver UNIVPM: scrivici via email, segui i nostri social o vieni a trovarci nelle aulette.",
};

export default function ContattiPage() {
  return (
    <>
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className="section-tag section-tag-white">Siamo qui per te</span>
          <h1>Contattaci</h1>
          <p>Hai un problema? Una domanda? Vuoi collaborare con noi? Scrivici, rispondiamo sempre.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={`card ${styles.contactCard}`} id="contact-email">
              <span className={styles.contactIcon}>✉️</span>
              <h3>Email Associazione</h3>
              <p>Per richieste generali e info.</p>
              <a href="mailto:acugulliver@gmail.com" className={styles.contactLink}>
                acugulliver@gmail.com
              </a>
            </div>

            <a href="https://instagram.com/acu_gulliver" target="_blank" rel="noopener noreferrer" className={`card ${styles.contactCard} ${styles.contactCardLink}`} id="contact-instagram">
              <span className={styles.contactIcon}>📸</span>
              <h3>Instagram</h3>
              <p>News, eventi e aggiornamenti.</p>
              <span className={styles.contactLink}>@acu_gulliver</span>
            </a>

            <a href="https://t.me/ACUGulliver" target="_blank" rel="noopener noreferrer" className={`card ${styles.contactCard} ${styles.contactCardLink}`} id="contact-telegram">
              <span className={styles.contactIcon}>✈️</span>
              <h3>Telegram</h3>
              <p>Il canale ufficiale per annunci.</p>
              <span className={styles.contactLink}>t.me/ACUGulliver</span>
            </a>

            <div className={`card ${styles.contactCard}`}>
              <span className={styles.contactIcon}>📞</span>
              <h3>Referenti Principali</h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', color: 'var(--text-light)' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Sabrina Brizzola</strong><br/>Coordinatrice Lista<br/>331 462 2474</li>
                <li><strong>Veronica Barlassina</strong><br/>Presidente Gulliver APS<br/>339 486 2440</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light" id="aulette">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag" style={{ margin: "0 auto 1rem auto" }}>Le nostre sedi</span>
            <h2>Vieni a trovarci in Auletta</h2>
            <div className="divider-red" style={{ margin: "1rem auto 0 auto" }} />
          </div>

          <div className={styles.contactGrid}>
            <div className="card">
              <h3 style={{ color: "var(--primary-color)", marginBottom: "1rem" }}>Auletta Agraria</h3>
              <p><strong>Dove:</strong> Palazzina Orsini, blocco A, piano -1</p>
              <p><strong>Tel:</strong> 071.220.4995</p>
              <p><strong>Email:</strong> <a href="mailto:gulliver.agraria@gmail.com" style={{ color: 'var(--primary-color)' }}>gulliver.agraria@gmail.com</a></p>
              <p style={{ marginTop: '1rem' }}><strong>Referente:</strong><br/>Ezekias Wasingya Mastaki<br/>338 4367658</p>
            </div>

            <div className="card">
              <h3 style={{ color: "var(--primary-color)", marginBottom: "1rem" }}>Auletta Economia</h3>
              <p><strong>Dove:</strong> Piano terra, aula T29</p>
              <p><strong>Tel:</strong> 071.220.7026</p>
              <p><strong>Email:</strong> <a href="mailto:gulliverecon@gmail.com" style={{ color: 'var(--primary-color)' }}>gulliverecon@gmail.com</a></p>
              <p style={{ marginTop: '1rem' }}><strong>Referente:</strong><br/>Mattia Taliani<br/>351 9248800</p>
            </div>

            <div className="card">
              <h3 style={{ color: "var(--primary-color)", marginBottom: "1rem" }}>Auletta Ingegneria</h3>
              <p><strong>Dove:</strong> Polo Monte Dago, quota 150</p>
              <p><strong>Tel:</strong> 071.220.4509</p>
              <p><strong>Email:</strong> <a href="mailto:rappresentantigulliver.ing@gmail.com" style={{ color: 'var(--primary-color)' }}>rappresentantigulliver.ing@gmail.com</a></p>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.formSection}`} id="form">
        <div className="container">
          <div className={styles.formWrapper} style={{ backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '3rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--gray-200)' }}>
            <div className={styles.formHeader}>
              <span className="section-tag">Scrivici direttamente</span>
              <h2>Mandaci un messaggio</h2>
              <div className="divider-red" />
              <p>Risponderemo il prima possibile.</p>
            </div>

            <form className={styles.form} id="contact-form" action="https://formspree.io/f/placeholder" method="POST">
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">Nome e Cognome *</label>
                  <input type="text" id="nome" name="nome" required placeholder="Mario Rossi" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required placeholder="mario.rossi@studenti.univpm.it" className={styles.formInput} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="oggetto">Oggetto *</label>
                <input type="text" id="oggetto" name="oggetto" required placeholder="Di cosa hai bisogno?" className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="messaggio">Messaggio *</label>
                <textarea id="messaggio" name="messaggio" required rows={6} placeholder="Scrivi qui il tuo messaggio..." className={styles.formInput} />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" id="form-submit" style={{ alignSelf: 'flex-start' }}>
                Invia messaggio →
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

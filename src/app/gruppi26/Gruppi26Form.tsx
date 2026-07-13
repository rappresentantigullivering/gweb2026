'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface Course {
  name: string;
  url: string;
  type: string;
}

interface FacultyGroup {
  faculty: string;
  courses: Course[];
}

const facultyData: FacultyGroup[] = [
  {
    faculty: "Agraria",
    courses: [
      { name: "Scienze e Tecnologie Agrarie", url: "https://chat.whatsapp.com/LhBYoOE6L0WGLQ0BC4ocXK", type: "Triennale" },
      { name: "Scienze e Tecnologie Alimentari", url: "https://chat.whatsapp.com/FSjCsdVT1Y35vV6HxJR1aW", type: "Triennale" },
      { name: "Scienze Forestali e Ambientali", url: "https://chat.whatsapp.com/GmtgFtqTaJe84STS3uqIb1", type: "Triennale" },
      { name: "Sistemi Agricoli Innovativi", url: "https://chat.whatsapp.com/LQ7TNcfy6b92PVlFyuZfTQ", type: "Triennale" },
      { name: "Scienze Agrarie e del Territorio", url: "https://chat.whatsapp.com/DoWHcwn4KDUDmAaozag9Gy", type: "Magistrale" },
      { name: "Scienze Forestali dei Suoli e del Paesaggio", url: "https://chat.whatsapp.com/EYcBfbtT5leEmEtYwAoY5z", type: "Magistrale" },
      { name: "Food and Beverage Innovation and Management", url: "https://chat.whatsapp.com/Ghv1qkue5bTDOaorAdFNHh", type: "Magistrale" }
    ]
  },
  {
    faculty: "Economia",
    courses: [
      { name: "Economia e Commercio", url: "https://chat.whatsapp.com/GdHjhzo89QK5F6tayaO7hQ", type: "Triennale" },
      { name: "Management per la valorizzazione sostenibile delle aziende e delle risorse ittiche", url: "https://chat.whatsapp.com/FI8s3jW2N7WDIkRtnSL0SE", type: "Triennale" },
      { name: "Economia Aziendale", url: "https://chat.whatsapp.com/FhuoEfNo3JB3F2Jg4u9e8g", type: "Triennale" },
      { name: "Digital Economics and Business", url: "https://chat.whatsapp.com/I6PYH8a4rVtFAzsbM7gaqH", type: "Triennale" },
      { name: "Sustainability Management and Circular Economy", url: "https://chat.whatsapp.com/FqpHnNzdrXV6y6T1wJJftg", type: "Magistrale" },
      { name: "Management pubblico e dei sistemi socio-sanitari", url: "https://chat.whatsapp.com/JZCWJkoeWqw2Gz6bNoYNZv", type: "Magistrale" },
      { name: "Business Organization and Strategy", url: "https://chat.whatsapp.com/JHZLbdNOm2tIXSpzECgXJY", type: "Magistrale" },
      { name: "International Business", url: "https://chat.whatsapp.com/DpzgCFjc0V0F6TavDFGG0h", type: "Magistrale" },
      { name: "Global Economic Analysis", url: "https://chat.whatsapp.com/JHZLbdNOm2tIXSpzECgXJY", type: "Magistrale" },
      { name: "Data Science and Business Analytics", url: "https://chat.whatsapp.com/JP4aQ03aDZT5b63jlUFEuz", type: "Magistrale" },
      { name: "Data Science for Finance and Economics", url: "https://chat.whatsapp.com/HIL7VzXBNvT1bWjDT4iQoC", type: "Magistrale" },
      { name: "CFO e Controlling Manager", url: "https://chat.whatsapp.com/JiaOU091rEU1AE6Eli20DI", type: "Magistrale" },
      { name: "Consulente Aziendale e Finanziario", url: "https://chat.whatsapp.com/Hc0Ef5xq6fJ35CHUB77CON", type: "Magistrale" },
      { name: "Marketing e Sales Manager", url: "https://chat.whatsapp.com/DwiLFH5ZIvc6EMeYnyE7qT", type: "Magistrale" },
      { name: "Finanza e metodi quantitativi per l’economia", url: "https://chat.whatsapp.com/KaA9R9omTuS8VwYAm02kPG", type: "Magistrale" },
      { name: "Analista finanziario", url: "https://chat.whatsapp.com/HzmIoTBRHMXD4wWmZXfc7F", type: "Magistrale" }
    ]
  },
  {
    faculty: "Ingegneria",
    courses: [
      { name: "Ingegneria Biomedica A-L", url: "https://chat.whatsapp.com/E1drlHhWjIeJkvVJYxz3XT", type: "Triennale" },
      { name: "Ingegneria Biomedica M-Z", url: "https://chat.whatsapp.com/Bye9k1RQzaZDP531B39qQA", type: "Triennale" },
      { name: "Ingegneria Civile e Ambientale", url: "https://chat.whatsapp.com/GA4Xw1y7KngGvFUbr7HpBH", type: "Triennale" },
      { name: "Ingegneria per Videogame e Realtà Virtuale", url: "https://chat.whatsapp.com/C7Obxs3OkNGEu7sqTniC8s", type: "Triennale" },
      { name: "Ingegneria Edile", url: "https://chat.whatsapp.com/HeU0LPwDDgQ82WS9cT4cZe", type: "Triennale" },
      { name: "Ingegneria Elettronica", url: "https://chat.whatsapp.com/KHEjFrhYrc7LdMUUyudpEq", type: "Triennale" },
      { name: "Ingegneria Gestionale", url: "https://chat.whatsapp.com/LLusE51XILQAgk68LV6tnu", type: "Triennale" },
      { name: "Ingegneria Informatica A-L", url: "https://chat.whatsapp.com/LVDdoElBXzb6GivHgWdxQf", type: "Triennale" },
      { name: "Ingegneria Informatica M-Z", url: "https://chat.whatsapp.com/CIS4ViTRWkYFkkY3FIysYr", type: "Triennale" },
      { name: "Ingegneria Meccanica A-L", url: "https://chat.whatsapp.com/CsbT84OL8rC93WyNrDvWg8", type: "Triennale" },
      { name: "Ingegneria Meccanica M-Z", url: "https://chat.whatsapp.com/FPaWEaLQoczF3f2It4bPn1", type: "Triennale" },
      { name: "Ingegneria per la Sostenibilità Industriale", url: "https://chat.whatsapp.com/I9OmBdzAHZ54zAZw8QCUFk", type: "Triennale" },
      { name: "Sistemi Industriali e dell'Informazione", url: "https://chat.whatsapp.com/JtpjB1GnUOMHbsk4ZTgPMc", type: "Triennale" },
      { name: "Tecniche della Costruzione e Gestione del Territorio", url: "https://chat.whatsapp.com/FZaU9U6YviC6u55lJenMbj", type: "Triennale" },
      { name: "Ingegneria Edile-Architettura", url: "https://chat.whatsapp.com/KrAwijyuksd0rUW6raOBuu", type: "Magistrale a Ciclo Unico" },
      { name: "Biomedical Engineering", url: "https://chat.whatsapp.com/Jp2bcopvWDhCkYTr7bMBSg", type: "Magistrale" },
      { name: "Environmental Engineering", url: "https://chat.whatsapp.com/DgV9sOkL3c6GlTqnyC3fx8", type: "Magistrale" },
      { name: "Green Industrial Engineering", url: "https://chat.whatsapp.com/LpogKSbdSSk32URUmSaJpz", type: "Magistrale" },
      { name: "Ingegneria Civile", url: "https://chat.whatsapp.com/IMmUT8X2Q1M93RlYHwGQMF", type: "Magistrale" },
      { name: "Ingegneria Edile", url: "https://chat.whatsapp.com/IlN4UClzFdk2fwP8uWzM0X", type: "Magistrale" },
      { name: "Ingegneria Elettronica", url: "https://chat.whatsapp.com/HlaqqgpiNhT9K6LWULfO70", type: "Magistrale" },
      { name: "Ingegneria Gestionale", url: "https://chat.whatsapp.com/IJV2yclQi2H7BzsgQzDG0H", type: "Magistrale" },
      { name: "Ingegneria Informatica e dell'Automazione", url: "https://chat.whatsapp.com/FC5xR7tpjqIFDs0E5UGdaK", type: "Magistrale" },
      { name: "Ingegneria Meccanica", url: "https://chat.whatsapp.com/ICMyIbs6OLSCJYGgDXRkeV", type: "Magistrale" }
    ]
  },
  {
    faculty: "Medicina",
    courses: [
      { name: "Professioni Sanitarie", url: "https://chat.whatsapp.com/ETQsZFTjnwpHCDIRMWPkO9", type: "Triennale" },
      { name: "Semestre Filtro (Medicina + Odontoiatria)", url: "https://t.me/semestrefiltrounivpm2026", type: "Magistrale a Ciclo Unico" }
    ]
  },
  {
    faculty: "Scienze",
    courses: [
      { name: "Scienze Biologiche A-L", url: "https://chat.whatsapp.com/FkfnrThWbrSIMa2tgkN72f", type: "Triennale" },
      { name: "Scienze Biologiche M-Z", url: "https://chat.whatsapp.com/BWpx7cEcrr8G1jJv15JceV", type: "Triennale" },
      { name: "Environmental Sciences and Civil Protection", url: "https://chat.whatsapp.com/JDDKeHBoHFB1kWVfzJ5C0t", type: "Triennale" },
      { name: "Enviromental Hazard and Disaster Risk Management", url: "PENDING", type: "Magistrale" },
      { name: "Scienze della Nutrizione e dell'Alimentazione", url: "https://chat.whatsapp.com/HWqraqrKgQBBmZ5kuGNEg1?s=cl&p=a&ilr=4", type: "Magistrale" },
      { name: "Biologia Molecolare Applicata (computazionale e tecnologie biologiche)", url: "https://chat.whatsapp.com/GGd958CQvv9L7Tp6QLjI5X", type: "Magistrale" },
      { name: "Marine Biology", url: "https://chat.whatsapp.com/GVzcZhkuUCR9CbouvuQVZr", type: "Magistrale" }
    ]
  }
];

export default function Gruppi26Form() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) {
      setSelectedCourse(null);
    } else {
      setSelectedCourse(JSON.parse(val));
    }
  };

  const renderLinkButton = () => {
    if (!selectedCourse) {
      return (
        <button className={`${styles.actionButton} ${styles.btnDisabled}`} disabled>
          Ottieni il link del gruppo
        </button>
      );
    }

    if (selectedCourse.url === "PENDING") {
      return (
        <a 
          href="https://www.instagram.com/acu_gulliver/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${styles.actionButton} ${styles.btnWarning}`}
        >
          <span>Disponibile a breve - Scrivici su Instagram</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      );
    }

    const isTelegram = selectedCourse.url.startsWith("https://t.me/");

    if (isTelegram) {
      return (
        <a 
          href={selectedCourse.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${styles.actionButton} ${styles.btnTelegram}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          <span>Entra nel canale Telegram</span>
        </a>
      );
    }

    return (
      <a 
        href={selectedCourse.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${styles.actionButton} ${styles.btnWhatsapp}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span>Entra nel gruppo WhatsApp</span>
      </a>
    );
  };

  return (
    <>
      <div className={styles.hero}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="section-tag section-tag-white">Anno Accademico 2026/2027</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900 }}>
            Gruppi WhatsApp Matricole 2026
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '1rem', fontSize: '1.2rem', maxWidth: '600px', marginInline: 'auto' }}>
            Incontra i tuoi futuri compagni di corso e rimani sempre aggiornato.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            {/* PARTE UNO: SCEGLI IL TUO CORSO */}
            <div className={`${styles.card} ${styles.linkCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapperGreen}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Ottieni il tuo link</h2>
              </div>
              <p className={styles.cardText}>
                Seleziona il tuo corso di laurea dal menu a tendina qui sotto per accedere direttamente al gruppo WhatsApp o Telegram ufficiale del tuo corso.
              </p>
              
              <div className={styles.selectWrapper}>
                <label htmlFor="course-select" className={styles.label}>
                  Scegli il tuo corso di laurea
                </label>
                <select 
                  id="course-select" 
                  className={styles.select}
                  onChange={handleSelectChange}
                  defaultValue=""
                >
                  <option value="">Seleziona un corso...</option>
                  {facultyData.map((group) => (
                    <optgroup key={group.faculty} label={group.faculty.toUpperCase()}>
                      {group.courses.map((course) => (
                        <option 
                          key={`${course.type}-${course.name}`} 
                          value={JSON.stringify({ name: course.name, url: course.url, type: course.type })}
                        >
                          {course.type} in {course.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {renderLinkButton()}
            </div>

            {/* PARTE DUE: ELENCO COMPLETO PDF */}
            <div className={`${styles.card} ${styles.pdfCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Elenco completo</h2>
              </div>
              <p className={styles.cardText}>
                Se preferisci consultare il foglio informativo completo con la panoramica di tutti i gruppi suddivisi per facoltà, puoi visualizzare la versione PDF interattiva.
              </p>
              
              <a 
                href="/docs/2026/pdf-gruppi-whatsapp.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadButton}
              >
                <span>Apri elenco completo (PDF)</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--gray-500)' }}>
                  Hai problemi ad accedere? <Link href="/contatti" className={styles.contactLink}>Scrivici</Link>
                </p>
              </div>
            </div>

            {/* Back button */}
            <div className={styles.backLinkWrapper}>
              <Link href="/matricole" className={styles.backButton}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Torna al Portale Matricole</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

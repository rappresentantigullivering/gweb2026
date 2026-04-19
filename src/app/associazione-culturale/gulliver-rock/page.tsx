import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Gulliver Rock | Gulliver UNIVPM',
  description: 'Gulliver Rock è il festival musicale gratuito organizzato ogni anno dalla nostra associazione. XXXIII edizione: 23 maggio 2026, Piazza Roma, Ancona.',
};

export default function GulliverRockPage() {
  const pastEditions = [
    { year: "Prime edizioni", artists: "Gruppi universitari e locali" },
    { year: "1999", artists: "Modena City Ramblers" },
    { year: "2000", artists: "Bandabardò" },
    { year: "2001", artists: "Tiromancino, Bisca" },
    { year: "2002", artists: "Verdena" },
    { year: "2003", artists: "Elio e le Storie Tese" },
    { year: "2004", artists: "Sud Sound System" },
    { year: "2005", artists: "Max Gazzè" },
    { year: "2006", artists: "Meganoidi, Cappello a Cilindro" },
    { year: "2007", artists: "Après la Classe" },
    { year: "2008", artists: "Daniele Sepe" },
    { year: "2009", artists: "Folokabbestia" },
    { year: "2010", artists: "Il Teatro degli Orrori" },
    { year: "2011", artists: "Malavida, Gang, Giorgio Canali e Rossofuoco, Zen Circus" },
    { year: "2012", artists: "Sick Tamburo, aucan" },
    { year: "2013", artists: "Nobraino, Lo Stato Sociale" },
    { year: "2014", artists: "Tre Allegri Ragazzi Morti" },
    { year: "2015", artists: "Fast Animals and slow kids, Linea" },
    { year: "2016", artists: "Gianni Maroccolo, Marta sui Tubi" },
    { year: "2017", artists: "Management Del Dolore Post-Operatorio, Bruno Belissimo" },
    { year: "2018", artists: "Lercio, Galeffi, Cimini" },
    { year: "2019", artists: "Daniele Fabbri, Dutch Nazari" },
    { year: "2022", artists: "Scarda, Motta" },
    { year: "2023", artists: "Marlene Kunts, Uochi Toki" },
    { year: "2024", artists: "Emma Nolde, Quercia" },
    { year: "2025", artists: "Little Pieces of Marmelade, La Municipàl, Rumba de Bodas" },
  ];

  return (
    <>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className="section-tag section-tag-white">Associazione Culturale</span>
          <h1>Gulliver Rock</h1>
          <p>
            Musica, cultura e socialità. Il festival musicale gratuito della comunità studentesca.
          </p>
          <div className={styles.heroCtas}>
            <a href="#edizione-2026" className="btn btn-white btn-lg">
              🎵 Edizione 2026
            </a>
            <a href="#edizioni" className="btn btn-outline-white btn-lg">
              📖 Edizioni passate
            </a>
          </div>
        </div>
      </div>

      {/* DESCRIZIONE */}
      <section className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className={styles.descSection}>
            <div>
              <h2 className={styles.descTitle}>Un festival nato dalla comunità</h2>
              <div className="divider-red" />
              <p style={{ lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Il <strong>GulliverRock</strong> è un festival musicale gratuito organizzato ogni anno dalla nostra
                associazione. Questo evento rappresenta un&apos;importante occasione di aggregazione per la componente
                studentesca e la comunità locale.
              </p>
              <p style={{ lineHeight: 1.85 }}>
                Giunto ormai alla <strong>trentatreesima edizione</strong>, si distingue per la sua capacità di unire
                musica, cultura e socialità, offrendo non solo uno spettacolo dal vivo, ma anche attività collaterali
                di intrattenimento, spazi di confronto e buon cibo.
              </p>
            </div>
            <div className={styles.descStats}>
              <div className={styles.statBox}>
                <span className={styles.statNum}>33</span>
                <span className={styles.statLabel}>edizioni</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>dal 1993</span>
                <span className={styles.statLabel}>ogni anno</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>GRATUITO</span>
                <span className={styles.statLabel}>ingresso libero</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDIZIONE 2026 */}
      <section className="section section-light" id="edizione-2026">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Prossima edizione</span>
            <h2>XXXIII Edizione — 2026</h2>
            <div className="divider-red divider-red-center" />
          </div>

          <div className={styles.eventGrid}>
            <div className={styles.locandina}>
              <Image
                src="/locandina-elea.png"
                alt="Locandina Gulliver Rock XXXII Edizione 2026"
                width={500}
                height={700}
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
              />
            </div>
            <div className={styles.eventInfo}>
              <div className={styles.editionBadge}>XXXIII EDIZIONE</div>
              <h3 className={styles.eventTitle}>Gulliver Rock 2026</h3>
              <div className={styles.eventDetails}>
                <div className={styles.eventDetailItem}>
                  <span className={styles.eventDetailIcon}>📍</span>
                  <div>
                    <strong>Dove</strong>
                    <span>Piazza Roma, Ancona</span>
                  </div>
                </div>
                <div className={styles.eventDetailItem}>
                  <span className={styles.eventDetailIcon}>📅</span>
                  <div>
                    <strong>Quando</strong>
                    <span>23 Maggio 2026</span>
                  </div>
                </div>
                <div className={styles.eventDetailItem}>
                  <span className={styles.eventDetailIcon}>🎟️</span>
                  <div>
                    <strong>Ingresso</strong>
                    <span className={styles.freeEntry}>GRATUITO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDIZIONI PASSATE */}
      <section className="section" id="edizioni">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="section-header text-center">
            <span className="section-tag">Storia</span>
            <h2>Edizioni Precedenti</h2>
            <div className="divider-red divider-red-center" />
          </div>

          <div className={styles.editionsTable}>
            {pastEditions.slice().reverse().map((edition, i) => (
              <div key={i} className={styles.editionRow}>
                <div className={styles.editionYear}>{edition.year}</div>
                <div className={styles.editionArtists}>{edition.artists}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/associazione-culturale" className="btn btn-outline" style={{ display: 'inline-flex' }}>
              ← Torna all&apos;Associazione Culturale
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

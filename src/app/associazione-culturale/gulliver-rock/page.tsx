import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import styles from './page.module.css';
import PastEditions from './PastEditions';

export const metadata: Metadata = {
  title: 'Gulliver Rock | Gulliver UNIVPM',
  description: 'Gulliver Rock è lo storico festival musicale gratuito organizzato ogni anno dalla nostra associazione. Le foto dell\'edizione 2026 con Ele A saranno caricate a breve.',
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
    { year: "2023", artists: "Marlene Kuntz, Uochi Toki" },
    { year: "2024", artists: "Emma Nolde, Quercia" },
    { year: "2025", artists: "Little Pieces of Marmelade, La Municipàl, Rumba de Bodas" },
    { year: "2026", artists: "Ele A" },
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* HERO BANNER */}
      <div className={styles.hero}>
        <div className={styles.heroCurve} />
        <div className="container">
          <span className="section-tag section-tag-white">Dal 1993 · Live Music Festival</span>
          <h1 className={styles.heroTitle}>GULLIVER ROCK</h1>
          <p className={styles.heroSub}>
            Musica, cultura e socialità. Il festival musicale indipendente organizzato interamente dalla componente studentesca.
          </p>
          <div className={styles.heroCtas}>
            <a href="#edizione-2026" className="btn btn-white btn-lg" style={{ color: 'var(--red-primary)' }}>
              Foto & Report 2026
            </a>
            <a href="#edizioni" className="btn btn-outline-white btn-lg">
              Edizioni passate
            </a>
          </div>
        </div>
      </div>

      {/* DESCRIZIONE / ABOUT */}
      <section className={styles.aboutSection}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className="section-tag">Il Festival</span>
              <h2>Un festival nato dalla comunità</h2>
              <div className="divider-red" />
              <p className={styles.paragraph}>
                Il <strong>Gulliver Rock</strong> è lo storico festival musicale gratuito organizzato ogni anno dalla nostra associazione. Questo evento rappresenta un&apos;importante occasione di aggregazione per la componente studentesca e tutta la cittadinanza di Ancona.
              </p>
              <p className={styles.paragraph}>
                Giunto alla sua <strong>trentatreesima edizione</strong>, il festival si distingue per la sua capacità di unire musica dal vivo, cultura e impegno sociale, offrendo non solo concerti ad alto livello ma anche aree food & drink, stand informativi e spazi dedicati alle realtà giovanili locali.
              </p>
            </div>
            <div className={styles.aboutStats}>
              <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', justifyContent: 'center' }}>
                <div className={styles.statRow}>
                  <span className={styles.statNum}>33</span>
                  <div>
                    <strong className={styles.statTitle}>Edizioni</strong>
                    <span className={styles.statLabel}>di concerti indipendenti</span>
                  </div>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statNum}>1993</span>
                  <div>
                    <strong className={styles.statTitle}>Anno di nascita</strong>
                    <span className={styles.statLabel}>fondato dagli studenti</span>
                  </div>
                </div>
                <div className={styles.statRow}>
                  <span className={styles.statNum}>FREE</span>
                  <div>
                    <strong className={styles.statTitle}>Ingresso Libero</strong>
                    <span className={styles.statLabel}>da sempre e per sempre</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDIZIONE 2026 */}
      <section className={styles.eventSection} id="edizione-2026">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="section-tag">Ultima Edizione</span>
            <h2>XXXIII Edizione - 2026</h2>
            <div className="divider-red divider-red-center" />
          </div>

          <div className={styles.eventGrid}>
            {/* Locandina */}
            <div className={styles.locandinaWrapper}>
              <Image
                src="/locandina-elea.png"
                alt="Locandina Gulliver Rock XXXIII Edizione 2026"
                width={500}
                height={700}
                className={styles.locandinaImg}
                priority
              />
            </div>

            {/* Event Info & Timetable */}
            <div className={styles.eventInfo}>
              <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', height: '100%' }}>
                <span className={styles.editionBadge}>EDIZIONE CONCLUSA · FOTO IN ARRIVO</span>
                <h3 className={styles.eventTitle}>Gulliver Rock 2026</h3>
                
                <div className={styles.eventDetails}>
                  <div className={styles.eventDetailItem}>
                    <div className={styles.detailIconWrapper}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <strong>Location</strong>
                      <span>Piazza Roma, Ancona</span>
                    </div>
                  </div>

                  <div className={styles.eventDetailItem}>
                    <div className={styles.detailIconWrapper}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <strong>Data</strong>
                      <span>23 Maggio 2026</span>
                    </div>
                  </div>

                  <div className={styles.eventDetailItem}>
                    <div className={styles.detailIconWrapper}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8.3 10a3.5 3.5 0 0 1 5.4 0" />
                        <path d="M7 7.5a6.5 6.5 0 0 1 10 0" />
                        <path d="M12 13a4.5 4.5 0 0 0-4.5 4.5v1h9v-1A4.5 4.5 0 0 0 12 13z" />
                      </svg>
                    </div>
                    <div>
                      <strong>Ingresso</strong>
                      <span className="text-red" style={{ fontWeight: 600 }}>GRATUITO</span>
                    </div>
                  </div>
                </div>

                {/* TIMETABLE */}
                <div className={styles.timetable}>
                  <h4 className={styles.timetableTitle}>Orari Serata</h4>
                  <div className={styles.timetableList}>
                    <div className={styles.timetableItem}>
                      <span className={styles.timeLabel}>20:00</span>
                      <span className={styles.eventDesc}>Apertura cancelli e gruppi universitari (La Chance Su Marte, GRUVE)</span>
                    </div>
                    <div className={styles.timetableItemHighlight}>
                      <span className={styles.timeLabelHighlight}>21:00</span>
                      <div className={styles.eventDescHighlight}>
                        <span className={styles.liveBadge}>LIVE</span>
                        <strong>Ele A</strong>
                      </div>
                    </div>
                    <div className={styles.timetableItem}>
                      <span className={styles.timeLabel}>22:30</span>
                      <span className={styles.eventDesc}>DJ Set conclusivo (fino alle 00:00)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LINEUP DETAILS */}
      <section className={styles.lineupSection}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="section-tag">Gli Artisti</span>
            <h2>Protagonisti sul palco</h2>
            <div className="divider-red divider-red-center" />
          </div>

          <div className="card" style={{ overflow: 'hidden' }}>
            <div className={styles.lineupGrid2Col}>
              <div className={styles.lineupHeadlinerInfo}>
                <span className={styles.artistRole}>Headliner</span>
                <h3 className={styles.artistTitle}>Ele A</h3>
                <div className={styles.artistBio}>
                  <p className={styles.artistText}>
                    Classe 2002, nata e cresciuta a Lugano, Ele A (detta anche, semplicemente, Ele) è una delle voci più interessanti e affilate della scena hip hop ed urban contemporanea. Con un gusto street pop che cela un manifesto amore per l&apos;estetica del rap old school, si distingue per incastri di rime fulminei, liriche conscious e un flow travolgente.
                  </p>
                  <p className={styles.artistText} style={{ marginTop: '1rem' }}>
                    Dopo il debutto con EP di successo come <em>Globo</em> e <em>Acqua</em>, e collaborazioni di rilievo con Guè, Franco126, Mace e Night Skinny, Ele A ha conquistato la componente studentesca di Ancona esibendosi sul palco di Piazza Roma per la trentatreesima edizione del Gulliver Rock.
                  </p>
                </div>
              </div>
              
              <div className={styles.lineupOpenersInfo}>
                <span className={styles.artistRole}>Opening Acts</span>
                <h4 className={styles.openersTitle}>I gruppi spalla dell&apos;edizione</h4>
                
                <div className={styles.openerItem}>
                  <div className={styles.openerBullet} />
                  <strong>La Chance Su Marte</strong>
                </div>
                
                <div className={styles.openerItem} style={{ marginTop: '1.25rem' }}>
                  <div className={styles.openerBullet} />
                  <strong>GRUVE</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVIO EDISIONI PASSATE */}
      <section className={styles.archiveSection} id="edizioni">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="section-tag">Storia</span>
            <h2>Edizioni Precedenti</h2>
            <div className="divider-red divider-red-center" />
          </div>

          {/* PastEditions Client Component */}
          <PastEditions editions={pastEditions} />

          <div className={styles.backWrapper}>
            <Link href="/associazione-culturale" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Torna all&apos;Associazione Culturale
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

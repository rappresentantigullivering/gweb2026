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
      {/* BACKGROUND EFFECTS */}
      <div className={styles.ambientGlow} />
      <div className={styles.ambientGlowSecond} />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.stageTag}>Live Music Festival</span>
          <h1 className={styles.heroTitle}>GULLIVER ROCK</h1>
          <p className={styles.heroSub}>
            Musica, cultura e socialità. Il festival musicale indipendente organizzato interamente dalla comunità studentesca.
          </p>
          <div className={styles.heroCtas}>
            <a href="#edizione-2026" className={`${styles.glowBtn} ${styles.glowBtnPrimary}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Foto & Report 2026
            </a>
            <a href="#edizioni" className={`${styles.glowBtn} ${styles.glowBtnOutline}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Edizioni passate
            </a>
          </div>
        </div>
      </div>

      {/* DESCRIZIONE / ABOUT */}
      <section className={styles.aboutSection}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className={styles.descSection}>
            <div className={styles.descTextWrapper}>
              <h2 className={styles.descTitle}>Un festival nato dalla comunità</h2>
              <div className={styles.neonDivider} />
              <p className={styles.paragraph}>
                Il <strong>Gulliver Rock</strong> è lo storico festival musicale gratuito organizzato ogni anno dalla nostra associazione. Questo evento rappresenta un&apos;importante occasione di aggregazione per la componente studentesca e tutta la cittadinanza di Ancona.
              </p>
              <p className={styles.paragraph}>
                Giunto alla sua <strong>trentatreesima edizione</strong>, il festival si distingue per la sua capacità di unire musica dal vivo, cultura e impegno sociale, offrendo non solo concerti ad alto livello ma anche aree food & drink, stand informativi e spazi dedicati alle realtà giovanili locali.
              </p>
            </div>
            <div className={styles.descStats}>
              <div className={styles.statBox}>
                <span className={styles.statNum}>33</span>
                <span className={styles.statLabel}>Edizioni</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>1993</span>
                <span className={styles.statLabel}>Anno di nascita</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>FREE</span>
                <span className={styles.statLabel}>Ingresso Libero</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDIZIONE 2026 */}
      <section className={styles.eventSection} id="edizione-2026">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.stageTag}>Edizione Conclusa</span>
            <h2 className={styles.sectionTitle}>XXXIII Edizione - 2026</h2>
            <div className={styles.neonDividerCenter} />
          </div>

          <div className={styles.eventGrid}>
            {/* Locandina */}
            <div className={styles.locandinaWrapper}>
              <div className={styles.locandinaGlow} />
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
              <div className={styles.editionBadge}>EDIZIONE CONCLUSA · FOTO IN ARRIVO</div>
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
                    <span className={styles.freeEntry}>GRATUITO</span>
                  </div>
                </div>
              </div>

              {/* TIMETABLE */}
              <div className={styles.timetable}>
                <h4 className={styles.timetableTitle}>Setlist & Orari</h4>
                <div className={styles.timetableList}>
                  <div className={styles.timetableItem}>
                    <span className={styles.timeLabel}>20:00</span>
                    <span className={styles.eventDesc}>Apertura cancelli & Gruppi spalla universitari (La Chance Su Marte, GRUVE)</span>
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
                    <span className={styles.eventDesc}>DJ Set (fino alle 00:00)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LINEUP DETAILS */}
      <section className={styles.lineupSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.stageTag}>Gli Artisti</span>
            <h2 className={styles.sectionTitle}>Lineup Highlights</h2>
            <div className={styles.neonDividerCenter} />
          </div>

          <div className={styles.lineupGrid}>
            <div className={styles.artistCardFeatured}>
              <div className={styles.artistCardOverlay} />
              <div className={styles.artistContent}>
                <span className={styles.artistRole}>HEADLINER</span>
                <h3 className={styles.artistTitle}>Ele A</h3>
                <div className={styles.artistBio}>
                  <p className={styles.artistText}>
                    Classe 2002, nata e cresciuta a Lugano.<br />
                    Ele A detta anche, semplicemente, Ele.<br />
                    Funambola.
                  </p>
                  <p className={styles.artistText}>
                    Il suo gusto street pop cela in realtà un manifesto amore per l’estetica del rap, e un puro credo: &quot;tu usi la musica per aver altro invece per me è l’obiettivo finale&quot;
                  </p>
                  <p className={styles.artistText}>
                    A giugno 2022 pubblica il primo Ep, “Zerodue Demo”, disco autoprodotto che viene distribuito esclusivamente in fisico, in un lungo tour estivo di oltre 20 date, che la porta a calcare prestigiosi palchi in Italia e all’estero, dal Mi Ami Fest di Milano, allo Sziget Festival di Budapest.
                  </p>
                  <p className={styles.artistText}>
                    Il 29 novembre 2022 debutta sulle piattaforme con il primo singolo “Mikado”, una traccia conscious rap dagli echi metropolitani.
                  </p>
                  <p className={styles.artistText}>
                    Torna il 17 gennaio 2023 con il singolo “Globo”, un brano molto intimo ma dal sapore internazionale ed intergenerazionale, che cita musicalmente ma anche letteralmente le grandi ispirazioni dell’artista, dall’hip hop old school alle meravigliose melodie del Maestro Piero Piccioni.
                  </p>
                  <p className={styles.artistText}>
                    A marzo 2023 pubblica “Uno9999”, con cui porta in Italia la ricca tradizione drum&amp;bass/jungle che negli anni 80 e 90 ha viaggiato dalla Jamaica fino all’Europa, diventando una delle basi stilistiche della popolarissima ed influente UK Rave scene.
                  </p>
                  <p className={styles.artistText}>
                    Dopo questi tre singoli, arriva il suo primo EP ufficiale “GLOBO” (distribuito da Believe). Un viaggio musicale, una dimensione di incastri di rime su beat che trasudano old school hip-hop.
                  </p>
                  <p className={styles.artistText}>
                    Tra le collaborazioni compaiono il brano “C’est la vie” del sassofonista francese Laurent Bardainne e “Verdad” del producer Golden Years insieme a Joan Thiele.
                  </p>
                  <p className={styles.artistText}>
                    Da maggio a settembre calca i palchi dei maggiori festival italiani e svizzeri.
                  </p>
                  <p className={styles.artistText}>
                    Pubblica ad agosto il suo singolo “Tennis Club” e collabora con DjShocca e Guè nella traccia “El Clásico”.
                  </p>
                  <p className={styles.artistText}>
                    A ottobre è con VillaBanks, nel suo album omonimo nella traccia “Game”.
                  </p>
                  <p className={styles.artistText}>
                    A dicembre viene scelta come artista per l’ultima Red Bull Posse con il brano “NiHao”, insieme a Diss Gacha e agli Slings.
                  </p>
                  <p className={styles.artistText}>
                    Dopo aver collaborato con i Cor Veleno nella traccia “Finale Chimico” del loro album “Fuoco Sacro” e con Peet in “Leão”, ad aprile 2024 firma il feat. con Marco Castello in Māyā, ultimo disco di MACE, per la traccia “MENTRE IL MONDO ESPLODE”.
                  </p>
                  <p className={styles.artistText}>
                    A marzo pubblica “DAFALGAN”, la prima uscita discografica che porta la firma di EMI Records Italy/Universal Music Italia, che anticipa l’uscita del nuovo EP “ACQUA”, uscito il 10 maggio.
                  </p>
                  <p className={styles.artistText}>
                    Dopo aver portato il suo lavoro in studio sui palchi dei principali festival estivi nazionali e internazionali questa estate, l’artista ha portato in giro questo autunno il suo “ACQUA CLUB TOUR”, che l’ha vista calcare per la prima volta i palchi dei principali club italiani e internazionali.
                  </p>
                  <p className={styles.artistText}>
                    A dicembre 2024 è tornata con il singolo “Bounce”. L’artista ha inoltre aperto il 2025 di Red Bull con il suo 64 Red Bull Bars.
                  </p>
                  <p className={styles.artistText}>
                    Ele A è una delle protagoniste del Players Club 2025 di Night Skinny, la posse che unisce la scena rap emergente, presentata sul palco del concerto del producer all’Unipol Forum di Milano.
                  </p>
                  <p className={styles.artistText}>
                    A maggio 2025 calca il palco del Concerto del Primo Maggio di Roma con i brani “Oro” e “64 BARRE DI DOPAMINA”, il suo 64 Red Bull Bars.
                  </p>
                  <p className={styles.artistText}>
                    Inoltre, continua a collezionare collaborazioni che testimoniano la profonda considerazione che la scena urban italiana ha per lei e per la sua penna affilata. Tra le più rilevanti dell’ultimo anno spiccano quella con Guè nel brano “Gazelle”, quella con Neffa e Francesca Michielin in “Tuttelestelle”, e “Occhi Ingenui” con Franco126.
                  </p>
                  <p className={styles.artistText}>
                    A luglio 2025 pubblica, in collaborazione con Colapesce, “Ombre di città”, il singolo che anticipa il suo primo album ufficiale “Pixel”, uscito ad ottobre. All’interno assieme a lei GAIA, Guè, Nes, Night Skinny, Promessa e Sayf.
                  </p>
                  <p className={styles.artistText}>
                    Subito dopo l’uscita del disco ha intrapreso un tour che l’ha portata ad esibirsi in 8 città europee. A marzo 2026 ha dato il via al “PIXEL TOUR”, portando il nuovo album nei club delle principali città italiane. Il tour ha debuttato con uno show esplosivo sul palco dell’Alcatraz di Milano e ha registrato il tutto esaurito a Roma e Bologna.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.artistCard}>
              <div className={styles.artistContent}>
                <span className={styles.artistRole}>GRUPPO SPALLA</span>
                <h3 className={styles.artistTitle}>La Chance Su Marte</h3>
              </div>
            </div>

            <div className={styles.artistCard}>
              <div className={styles.artistContent}>
                <span className={styles.artistRole}>GRUPPO SPALLA</span>
                <h3 className={styles.artistTitle}>GRUVE</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVIO EDISIONI PASSATE */}
      <section className={styles.archiveSection} id="edizioni">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className={styles.sectionHeader}>
            <span className={styles.stageTag}>Storia</span>
            <h2 className={styles.sectionTitle}>Edizioni Precedenti</h2>
            <div className={styles.neonDividerCenter} />
          </div>

          {/* PastEditions Client Component */}
          <PastEditions editions={pastEditions} />

          <div className={styles.backWrapper}>
            <Link href="/associazione-culturale" className={styles.backBtn}>
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

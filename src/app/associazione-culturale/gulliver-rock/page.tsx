import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gulliver Rock | Gulliver UNIVPM',
  description: 'Gulliver Rock è il festival musicale gratuito organizzato ogni anno dalla nostra associazione.',
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
  ];

  return (
    <>
      <div style={{ backgroundColor: 'var(--primary-color)', padding: '6rem 1rem 4rem', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Gulliver Rock</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
          Musica, cultura e socialità. Il festival musicale gratuito della comunità studentesca.
        </p>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-color)', marginBottom: '4rem' }}>
            <p style={{ marginBottom: '1rem' }}>
              Il <strong>GulliverRock</strong> è un festival musicale gratuito organizzato ogni anno dalla nostra associazione. Questo evento rappresenta un'importante occasione di aggregazione per la componente studentesca e la comunità locale.
            </p>
            <p>
              Giunto ormai alla trentaduesima edizione, si distingue per la sua capacità di unire musica, cultura e socialità, offrendo non solo uno spettacolo dal vivo, ma anche attività collaterali di intrattenimento, spazi di confronto e buon cibo, contribuendo a creare un'atmosfera unica e coinvolgente!
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--card-bg)', padding: '3rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--primary-color)', textAlign: 'center' }}>
              Edizioni Precedenti
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pastEditions.map((edition, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  padding: '1rem', 
                  borderBottom: i !== pastEditions.length - 1 ? '1px solid var(--border-color)' : 'none',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ fontWeight: 'bold', width: '120px', color: 'var(--primary-color)' }}>
                    {edition.year}
                  </div>
                  <div style={{ flex: 1, color: 'var(--text-color)' }}>
                    {edition.artists}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/associazione-culturale" className="btn btn-outline" style={{ display: 'inline-flex' }}>
              Torna all'Associazione Culturale
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

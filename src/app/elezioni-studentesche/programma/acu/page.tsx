import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programma ACU | Gulliver UNIVPM",
  description: "Il programma di Gulliver dedicato ad Ancona Città Universitaria.",
};

const POINTS = [
  "aule studio aperte 24/7",
  "potenziamento trasporto pubblico locale nei quartieri periferici",
  "affitti a canone concordato",
  "istituzione di uno sportello affitti",
  "calmierazione dei costi delle utenze",
  "abbonamenti trasporti gratis per studenti",
  "sincronizzazione orari di autobus e treni",
  "autobus notturni",
  "incremento delle corse nelle fasce di maggiore affluenza",
  "adozione metodo di pagamento “tap and go” sugli autobus",
  "testi universitari nelle biblioteche comunali",
  "promozione di corsi culturali gratuiti",
  "riqualificazione degli spazi verdi e creazione di aree attrezzate con postazioni per lo studio",
  "convenzioni con strutture sportive",
  "spazi di aggregazione gratuiti",
  "spazi per la vita notturna",
  "cinema gratuito per studenti",
];

export default function ACUPage() {
  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, var(--dark) 0%, var(--red-darker) 100%)',
        padding: '10rem 1.5rem 6rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-2px', left: 0, right: 0,
          height: '70px',
          background: 'var(--white)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag section-tag-white">Programma Generale</span>
          <h1 style={{ color: 'var(--white)', marginTop: '2rem', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, textAlign: 'center', textTransform: 'uppercase' }}>
            Ancona Città Universitaria
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>I punti del nostro programma</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto', maxWidth: '700px' }}>
              {POINTS.map((point, index) => (
                <li key={index} style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.8', 
                  color: 'var(--gray-800)', 
                  marginBottom: index === POINTS.length - 1 ? 0 : '1rem',
                  display: 'flex',
                  gap: '0.75rem'
                }}>
                  <span style={{ color: 'var(--red-primary)', fontWeight: 'bold' }}>•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div style={{ 
              marginTop: '4rem', 
              paddingTop: '3rem', 
              borderTop: '1px solid var(--gray-200)',
              textAlign: 'center'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--dark)', fontSize: '1.75rem', fontWeight: 800 }}>Scarica il programma completo</h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: '2rem', fontSize: '1.15rem' }}>
                Leggi la proposta integrale scaricando il documento PDF ufficiale.
              </p>
              <a 
                href="/docs/programmi/PROGRAMMA ACU 2026.pdf" 
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vai al PDF completo
              </a>
            </div>
            
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <Link href="/elezioni-studentesche/programma" className="btn btn-outline" style={{ padding: '0.8rem 2rem' }}>
                ← Indietro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

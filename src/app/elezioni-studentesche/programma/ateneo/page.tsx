import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programma Ateneo | Gulliver UNIVPM",
  description: "Il programma Gulliver per l'Ateneo dell'Università Politecnica delle Marche.",
};

const POINTS = [
  "8 appelli garantiti ed esami parziali",
  "Lezioni registrate su elearn",
  "Voto dello scritto per 12 mesi",
  "Riforma tutorato",
  "Questionari post esame",
  "Rimozione voto più basso dal calcolo del voto di laurea",
  "Fac-simile dell’esame sul syllabus",
  "Innalzamento no tax area",
  "Eliminazione delle more",
  "Riconoscimento della figura dellə studente lavoratorə e caregiver",
  "Sala ristoro",
  "Riqualificazione spazi esterni",
  "Elettrificazione delle aule",
  "Potenziamento rete wifi",
  "Abbassamento prezzo bar",
  "Prestito dispositivi informatici",
  "Miglioramento CUS",
  "Estensione servizio supporto psicologico",
  "Sportello antiviolenza in presenza",
  "Consultorio settimanale in università",
  "Nuove fontanelle d’acqua",
];

export default function AteneoPage() {
  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, var(--dark) 0%, var(--red-darker) 100%)',
        padding: '8rem 1.5rem 5rem',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-2px', left: 0, right: 0,
          height: '60px',
          background: 'var(--white)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="section-tag section-tag-white">Programma Generale</span>
          <h1 style={{ color: 'var(--white)', marginTop: '2rem', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, textAlign: 'center', textTransform: 'uppercase' }}>
            Ateneo
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>I punti del nostro programma</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto', maxWidth: '700px' }}>
              {POINTS.map((point, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginBottom: i === POINTS.length - 1 ? 0 : '1rem',
                  lineHeight: '1.8',
                  color: 'var(--gray-800)',
                  fontSize: '1.1rem'
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
                href="/docs/programmi/PROGRAMMA ATENEO 2026.pdf" 
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vai al PDF completo
              </a>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link href="/elezioni-studentesche/programma" className="btn btn-outline">
                ← Torna al programma generale
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programma Ateneo | Gulliver UNIVPM",
  description: "Il programma Gulliver per l'Ateneo dell'Università Politecnica delle Marche.",
};

const POINTS = [
  "8 appelli garantiti ed esami parziali",
  "lezioni registrate su elearn",
  "voto dello scritto per 12 mesi",
  "riforma tutorato",
  "questionari post esame",
  "rimozione voto più basso dal calcolo del voto di laurea",
  "fac-simile dell’esame sul syllabus",
  "innalzamento no tax area",
  "eliminazione delle more",
  "riconoscimento della figura dellə studente lavoratorə e caregiver",
  "sala ristoro",
  "riqualificazione spazi esterni",
  "elettrificazione delle aule",
  "potenziamento rete wifi",
  "abbassamento prezzo bar",
  "prestito dispositivi informatici",
  "miglioramento CUS",
  "estensione servizio supporto psicologico",
  "sportello antiviolenza in presenza",
  "consultorio settimanale in università",
  "nuove fontanelle d’acqua",
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


            <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--dark)', borderRadius: 'var(--radius-2xl)', color: '#fff', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Programma completo</h3>
              <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Scarica il documento completo in formato PDF per leggere tutte le nostre proposte nel dettaglio.</p>
              <a
                href="/docs/programmi/PROGRAMMA ATENEO 2026.pdf"
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leggi il PDF completo
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

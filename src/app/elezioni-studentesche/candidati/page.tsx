import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I nostri candidati | Elezioni Studentesche",
  description: "Scopri i candidati di Gulliver per le elezioni studentesche UNIVPM 2025.",
};

export default function CandidatiPage() {
  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, var(--red-darker) 0%, var(--red-primary) 100%)',
        padding: '8rem 1.5rem 4rem',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-2px', left: 0, right: 0,
          height: '60px',
          background: 'var(--white)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
        <div className="container">
          <span className="section-tag section-tag-white">Elezioni 12-13-14 Maggio 2025</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            I nostri candidati
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '0.75rem', fontSize: '1.1rem' }}>
            Le persone che ogni giorno si impegnano per i tuoi diritti.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container text-center">
          <div style={{
            border: '2px dashed var(--gray-300)',
            borderRadius: 'var(--radius-xl)',
            padding: '5rem 3rem',
            background: 'var(--gray-100)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            <span style={{ fontSize: '4rem' }}>👥</span>
            <h2 style={{ marginTop: '1rem' }}>Lista candidati in arrivo</h2>
            <p style={{ marginTop: '0.75rem', color: 'var(--gray-500)' }}>
              La lista completa dei candidati sarà pubblicata a breve.
              Segui i nostri social per non perderti l&apos;aggiornamento!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Link href="/elezioni-studentesche/programma" className="btn btn-primary" id="candidati-programma">
                📄 Leggi il programma
              </Link>
              <Link href="/elezioni-studentesche" className="btn btn-outline" id="candidati-back">
                ← Torna alle elezioni
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

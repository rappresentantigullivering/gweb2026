import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gruppi WhatsApp e Telegram | Matricole",
  description: "Entra nei gruppi WhatsApp e Telegram di Gulliver per la tua facoltà dell'UNIVPM.",
};

export default function GruppiPage() {
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
          <span className="section-tag section-tag-white">Rimani connessɜ</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            Gruppi WhatsApp & Telegram
          </h1>
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
            <span style={{ fontSize: '4rem' }}>💬</span>
            <h2 style={{ marginTop: '1rem' }}>Link in arrivo</h2>
            <p style={{ marginTop: '0.75rem', color: 'var(--gray-500)' }}>
              I link ai gruppi per ogni facoltà saranno pubblicati qui a breve.
              Per ora, scrivici direttamente!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

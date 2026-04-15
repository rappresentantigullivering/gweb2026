import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matricole",
  description: "Nuova matricola all'UNIVPM? Gulliver ti aiuta con guide, gruppi WhatsApp e tutto quello che ti serve.",
};

export default function MatricolePage() {
  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, var(--red-darker) 0%, var(--red-primary) 100%)',
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
        <div className="container">
          <span className="section-tag section-tag-white">Nuovɜ universitariɜ</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>Matricole</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '0.75rem', fontSize: '1.1rem', maxWidth: '600px' }}>
            Iniziare l&apos;università può essere disorientante. Siamo qui per aiutarti.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <Link href="/matricole/kit" style={{ textDecoration: 'none' }} id="matricole-kit">
              <div className="card" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                <span style={{ fontSize: '3rem' }}>📦</span>
                <h3>Kit dello Studente</h3>
                <p>Tutto quello che devi sapere: dai servizi universitari alle agevolazioni, dalle mense ai trasporti.</p>
                <span style={{ color: 'var(--red-primary)', fontWeight: 600, marginTop: 'auto' }}>Scarica il kit →</span>
              </div>
            </Link>

            <Link href="/matricole/gruppi" style={{ textDecoration: 'none' }} id="matricole-gruppi">
              <div className="card" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                <span style={{ fontSize: '3rem' }}>💬</span>
                <h3>Gruppi WhatsApp & Telegram</h3>
                <p>Entra nei gruppi per la tua facoltà e rimani aggiornato su tutto quello che succede all'Ateneo.</p>
                <span style={{ color: 'var(--red-primary)', fontWeight: 600, marginTop: 'auto' }}>Entra nei gruppi →</span>
              </div>
            </Link>

            <Link href="/contatti" style={{ textDecoration: 'none' }} id="matricole-contatti">
              <div className="card" style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                <span style={{ fontSize: '3rem' }}>🤙</span>
                <h3>Contattaci</h3>
                <p>Hai dubbi, domande o problemi? I nostri rappresentanti sono a disposizione per aiutarti.</p>
                <span style={{ color: 'var(--red-primary)', fontWeight: 600, marginTop: 'auto' }}>Scrivici →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

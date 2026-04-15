import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Associazione Culturale",
  description: "L'anima culturale di Gulliver: eventi, concerti, aperitivi e iniziative per la comunità studentesca UNIVPM.",
};

export default function AssociazionePageWrapper() {
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
          <span className="section-tag section-tag-white">Dal 1987</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            Associazione Culturale
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '0.75rem', fontSize: '1.1rem', maxWidth: '600px' }}>
            Organizziamo attività culturali, seminari, concerti e feste per rendere
            l&apos;Università un luogo di aggregazione e crescita personale.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            <Link href="/associazione-culturale/convenzioni" style={{ textDecoration: 'none' }} id="assocard-convenzioni">
              <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                <span style={{ fontSize: '3rem' }}>🤝</span>
                <h3>Convenzioni</h3>
                <p>Sconti e agevolazioni per gli studenti UNIVPM grazie alle nostre convenzioni con negozi, ristoranti e servizi.</p>
                <span style={{ color: 'var(--red-primary)', fontWeight: 600, marginTop: 'auto' }}>Scopri le convenzioni →</span>
              </div>
            </Link>

            <Link href="/associazione-culturale/gulliver-rock" style={{ textDecoration: 'none' }} id="assocard-rock">
              <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                <span style={{ fontSize: '3rem' }}>🎸</span>
                <h3>Gulliver Rock</h3>
                <p>Il festival musicale di Gulliver: l&apos;evento che fonde musica, cultura e vita universitaria nel cuore di Ancona.</p>
                <span style={{ color: 'var(--red-primary)', fontWeight: 600, marginTop: 'auto' }}>Scopri Gulliver Rock →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

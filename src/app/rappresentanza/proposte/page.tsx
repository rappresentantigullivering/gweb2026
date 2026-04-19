import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Le nostre proposte | Rappresentanza Studentesca",
  description: "Le proposte del Consiglio Studentesco di Gulliver UNIVPM.",
};

export default function PropostePage() {
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
          <span className="section-tag section-tag-white">Consiglio Studentesco</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            Le nostre proposte
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container text-center">
          <div style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '4rem 2rem',
            background: 'var(--gray-100)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}>🚧</span>
            <h2 style={{ marginBottom: '1rem' }}>In arrivo</h2>
            <p style={{ marginBottom: '2rem' }}>
              Stiamo raccogliendo e documentando le nostre proposte al Consiglio Studentesco. 
              Torna presto per scoprirle!
            </p>
            <Link href="/rappresentanza" className="btn btn-outline btn-lg">
              ← Torna alla Rappresentanza
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

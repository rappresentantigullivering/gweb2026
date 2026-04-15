import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kit dello Studente | Matricole",
  description: "Scarica il Kit dello Studente Gulliver: tutto quello che devi sapere per iniziare l'università all'UNIVPM.",
};

export default function KitPage() {
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
          <span className="section-tag section-tag-white">Per le nuove matricole</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>Kit dello Studente</h1>
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
            <span style={{ fontSize: '4rem' }}>📦</span>
            <h2 style={{ marginTop: '1rem' }}>Kit in arrivo</h2>
            <p style={{ marginTop: '0.75rem', color: 'var(--gray-500)' }}>
              Il kit completo sarà disponibile a settembre in coincidenza con l&apos;inizio dell&apos;anno accademico.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

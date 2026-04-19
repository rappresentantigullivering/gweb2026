import Link from "next/link";
import type { Metadata } from "next";

const FACOLTA_INFO: Record<string, { nome: string; icon: string }> = {
  ingegneria: { nome: "Ingegneria", icon: "⚙️" },
  economia: { nome: "Economia", icon: "📊" },
  medicina: { nome: "Medicina", icon: "🏥" },
  scienze: { nome: "Scienze", icon: "🔬" },
  agraria: { nome: "Agraria", icon: "🌿" },
};

export async function generateStaticParams() {
  return Object.keys(FACOLTA_INFO).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const info = FACOLTA_INFO[slug];
  return {
    title: `Programma ${info?.nome ?? slug} | Gulliver UNIVPM`,
    description: `Il programma di Gulliver per la ${info?.nome ?? slug} dell'UNIVPM.`,
  };
}

export default async function FacoltaProgrammaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const info = FACOLTA_INFO[slug];
  const nome = info?.nome ?? slug;
  const icon = info?.icon ?? "🎓";

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
          <span className="section-tag section-tag-white">Programma di Facoltà</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            {icon} {nome}
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
              Stiamo lavorando al programma specifico per {nome}. Torna presto per scoprirlo!
            </p>
            <Link href="/elezioni-studentesche/programma#facolta" className="btn btn-outline btn-lg">
              ← Torna ai programmi di Facoltà
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

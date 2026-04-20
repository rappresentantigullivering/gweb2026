import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rappresentanza Studentesca",
  description: "Gulliver è prima lista d'Ateneo all'UNIVPM. Scopri come operiamo nella rappresentanza studentesca.",
};

export default function RappresentanzaPage() {
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
          <span className="section-tag section-tag-white">Prima lista d&apos;Ateneo</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            Rappresentanza Studentesca
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '0.75rem', fontSize: '1.1rem', maxWidth: '600px' }}>
            Siamo la voce degli studenti UNIVPM negli organi di governo dell&apos;Ateneo.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            <div>
              <h2>Come operiamo</h2>
              <div className="divider-red" />
              <p style={{ lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Siamo presenti in tutti gli <strong>organi collegiali</strong> dell&apos;UNIVPM: Senato Accademico, 
                Consiglio di Amministrazione, Consigli di Facoltà e Dipartimento, Consigli di Corso e 
                Commissioni Paritetiche.
              </p>
              <p style={{ lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Ci interfacciamo direttamente con la <strong>Governance d&apos;Ateneo</strong>, l&apos;ERDIS e con il 
                <strong> Comune di Ancona</strong> per portare le istanze studentesche dove si prendono le decisioni.
              </p>
              <p style={{ lineHeight: 1.85 }}>
                Il nostro approccio è concreto: ascoltiamo i problemi, li portiamo nelle sedi opportune e 
                monitoriamo i risultati. Ogni vittoria è frutto di un lavoro collettivo, sempre volto a migliorare 
                la condizione della comunità studentesca del nostro Ateneo.
              </p>
            </div>

            <div>
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--red-soft)',
                  color: 'var(--red-primary)',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}>
                  Consiglio Studentesco
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Consiglio Studentesco</h3>
                <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--gray-700)' }}>
                  È un organo costituito interamente da studenti. Qui portiamo le nostre proposte ed esprimiamo 
                  pareri su alcune importanti questioni per la vita universitaria, come la contribuzione studentesca 
                  e il bilancio, l&apos;offerta formativa e l&apos;apertura di nuovi corsi di studio, bandi per tutorato e 150 ore.
                </p>
                <Link href="/rappresentanza/proposte" className="btn btn-primary" id="rapp-proposte" style={{ display: 'inline-flex' }}>
                  Scopri le nostre proposte →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container text-center">
          <h2>Hai un problema?</h2>
          <div className="divider-red divider-red-center" />
          <p style={{ maxWidth: '560px', margin: '0 auto 2rem' }}>
            Siamo qui per aiutarti. Che si tratti di un problema con una segreteria,
            un esame, un docente o un servizio universitario: scrivici.
          </p>
          <Link href="/contatti" className="btn btn-primary btn-lg" id="rapp-contattaci">
            Chiedi aiuto
          </Link>
        </div>
      </section>
    </>
  );
}

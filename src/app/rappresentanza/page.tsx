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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h2>Come operiamo</h2>
              <div className="divider-red" />
              <p style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Siamo presenti in tutti gli <strong>organi collegiali</strong> dell&apos;UNIVPM:
                Senato Accademico, Consiglio di Amministrazione, Consigli di Dipartimento
                e Commissioni Paritetiche.
              </p>
              <p style={{ lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Ci interfacciamo direttamente con la <strong>Governance d&apos;Ateneo</strong>
                e con il <strong>Comune di Ancona</strong> per portare le istanze studentesche
                dove si prendono le decisioni.
              </p>
              <p style={{ lineHeight: 1.8 }}>
                Il nostro approccio è concreto: ascoltiamo i problemi, li portiamo nelle
                sedi opportune e monitoriamo i risultati. La rappresentanza non è solo
                presenzialismo: è lavoro quotidiano.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '🏛️', title: 'Senato Accademico', desc: 'Presenza attiva nel massimo organo di governo dell\'Ateneo.' },
                { icon: '💰', title: 'Consiglio di Amministrazione', desc: 'Monitoraggio del bilancio e delle politiche di investimento.' },
                { icon: '🗣️', title: 'Consiglio Studentesco', desc: 'Il massimo organo di rappresentanza studentesca d\'Ateneo.' },
                { icon: '📋', title: 'Consigli di Dipartimento', desc: 'Rappresentanza in tutti i dipartimenti dell\'UNIVPM.' },
                { icon: '🏫', title: 'Consigli di Facoltà', desc: 'Rappresentanza capillare nella Facoltà di Economia e Ingegneria.' },
              ].map((item) => (
                <div key={item.title} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container text-center">
          <h2>Hai un problema con l&apos;Ateneo?</h2>
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

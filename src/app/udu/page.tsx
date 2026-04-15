import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UDU – Unione degli Universitari",
  description: "Gulliver fa parte dell'UDU, la più grande rete nazionale di associazioni studentesche universitarie.",
};

export default function UduPage() {
  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, var(--dark) 0%, #1c1c3c 100%)',
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
          <span className="section-tag section-tag-white">La rete nazionale</span>
          <h1 style={{ color: 'var(--white)', marginTop: '1rem', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            Unione degli Universitari
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.75rem', fontSize: '1.1rem', maxWidth: '600px' }}>
            Dal 2008, Gulliver è confederata con UDU – la più grande rete nazionale
            di associazioni studentesche universitarie.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', maxWidth: '900px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h2>Cos&apos;è UDU?</h2>
                <div className="divider-red" />
                <p style={{ lineHeight: 1.8 }}>
                  L&apos;<strong>Unione degli Universitari</strong> è la più grande rete nazionale
                  di associazioni studentesche universitarie di stampo sindacale.
                </p>
              </div>
              <p style={{ lineHeight: 1.8 }}>
                Ogni anno aderiscono all&apos;UDU circa <strong>10.000 studentɜ</strong> in tutta Italia,
                rendendo questa rete una voce fondamentale nei dibattiti nazionali su università,
                diritto allo studio e politiche giovanili.
              </p>
              <p style={{ lineHeight: 1.8 }}>
                Tramite UDU, Gulliver partecipa alle campagne nazionali, alle assemblee interuniversitarie
                e porta la voce degli studenti UNIVPM fino ai tavoli romani.
              </p>
              <a href="https://www.udu.it" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg" style={{ alignSelf: 'flex-start' }} id="udu-sito">
                Vai al sito UDU →
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { n: '~10.000', label: 'studentɜ aderenti ogni anno' },
                { n: '2008', label: 'Anno in cui Gulliver si è confederata' },
                { n: 'Nazionale', label: 'Presenza in decine di atenei italiani' },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: 'var(--red-primary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  textAlign: 'center',
                }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--white)' }}>
                    {stat.n}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Redis } from '@upstash/redis';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const DB_KEY = 'gulliver:forms';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export default async function FormPage({ params }: PageProps) {
  const { slug } = await params;

  const forms: Record<string, any> = (await redis.get(DB_KEY)) || {};
  const form = forms[slug.toLowerCase()];

  if (!form) {
    notFound();
  }

  // ─── FORM SOSPESO ────────────────────────────────────────────────────────
  if (form.status === 'suspended') {
    return (
      <>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FAFAFA',
          padding: '2rem',
          fontFamily: "'Inter', sans-serif",
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            padding: '3rem 2.5rem',
            textAlign: 'center',
            border: '1px solid #EEEEEE',
          }}>
            {/* Logo Gulliver */}
            <img
              src="/logo-gulliver-tondo-png.png"
              alt="Gulliver UNIVPM"
              style={{ display: 'block', width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 1.5rem' }}
            />

            {/* Icona stop */}
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(228,3,41,0.08)',
              border: '2px solid rgba(228,3,41,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.75rem', margin: '0 auto 1.5rem',
            }}>
              ⏸
            </div>

            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '1.75rem',
              color: '#1A1A1A',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
            }}>
              Iscrizioni temporaneamente sospese
            </h1>

            <p style={{
              color: '#757575',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}>
              Il modulo <strong style={{ color: '#212121' }}>{form.title}</strong> è
              momentaneamente disattivato dai rappresentanti Gulliver.
              <br />
              Riprova più tardi o contattaci per maggiori informazioni.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://gulliverancona.it"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: '#e40329',
                  color: '#fff',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  fontFamily: "'Outfit', sans-serif",
                  boxShadow: '0 4px 16px rgba(228,3,41,0.25)',
                  transition: 'background 0.2s',
                }}
              >
                Torna al sito Gulliver
              </a>
              <a
                href="mailto:acugulliver@gmail.com"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: '#424242',
                  border: '1.5px solid #E0E0E0',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Contattaci
              </a>
            </div>
          </div>

          {/* Footer minimalista */}
          <p style={{
            marginTop: '2rem',
            fontSize: '0.78rem',
            color: '#BDBDBD',
            fontFamily: "'Inter', sans-serif",
          }}>
            © {new Date().getFullYear()} Gulliver – Lista di Rappresentanza UNIVPM
          </p>
        </div>
      </>
    );
  }

  // ─── FORM ATTIVO ────────────────────────────────────────────────────────
  // Sfondo bianco esplicito per evitare che il tema del sito (che usa
  // transparentBackground) renda il form illeggibile
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0, background: '#ffffff' }}>
      <iframe
        src={`https://tally.so/r/${form.tallyId}`}
        width="100%"
        height="100%"
        style={{ border: 'none', margin: 0, padding: 0, display: 'block' }}
        title={form.title}
      />
    </div>
  );
}

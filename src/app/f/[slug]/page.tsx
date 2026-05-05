import { Redis } from '@upstash/redis';
import { notFound } from 'next/navigation';

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
  // In Next.js 16, params is a Promise — must be awaited
  const { slug } = await params;

  const forms: Record<string, any> = (await redis.get(DB_KEY)) || {};
  const form = forms[slug.toLowerCase()];

  if (!form) {
    notFound();
  }

  if (form.status === 'suspended') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{
          maxWidth: '480px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '3rem',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'rgba(228,3,41,0.15)',
            border: '1px solid rgba(228,3,41,0.3)',
            color: '#e40329',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 1.5rem',
          }}>
            ⏸
          </div>
          <h1 style={{ fontWeight: 800, marginBottom: '1rem', color: '#fff', fontSize: '1.75rem' }}>
            Iscrizioni Sospese
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: '1rem' }}>
            Il modulo <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{form.title}</strong> è temporaneamente disattivato.
            Riprova più tardi o contatta i rappresentanti per maggiori informazioni.
          </p>
          <a
            href="https://gulliverancona.it"
            style={{
              display: 'inline-block',
              marginTop: '2rem',
              padding: '0.75rem 1.5rem',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              borderRadius: '99px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'background 0.2s',
            }}
          >
            ← Torna al sito Gulliver
          </a>
        </div>
      </div>
    );
  }

  // Se attivo, mostriamo l'iframe a schermo intero
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
      <iframe
        src={`https://tally.so/r/${form.tallyId}?transparentBackground=1`}
        width="100%"
        height="100%"
        style={{ border: 'none', margin: 0, padding: 0, display: 'block' }}
        title={form.title}
      />
    </div>
  );
}

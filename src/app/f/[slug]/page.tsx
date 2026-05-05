import { Redis } from '@upstash/redis';
import { notFound } from 'next/navigation';

// Inizializzazione Upstash server-side
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const DB_KEY = 'gulliver:forms';

type PageProps = {
  params: { slug: string };
};

export const dynamic = 'force-dynamic';

export default async function FormPage({ params }: PageProps) {
  const forms: Record<string, any> = (await redis.get(DB_KEY)) || {};
  const form = forms[params.slug.toLowerCase()];

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
        background: '#fafafa',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '500px', background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fce8e6', color: '#d93025', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1.5rem' }}>
            ⏸
          </div>
          <h1 style={{ fontWeight: 800, marginBottom: '1rem' }}>Iscrizioni Sospese</h1>
          <p style={{ color: '#666', lineHeight: 1.6 }}>
            Il modulo <strong>{form.title}</strong> è stato temporaneamente disattivato.
            Riprova più tardi o contatta i rappresentanti per maggiori informazioni.
          </p>
        </div>
      </div>
    );
  }

  // Se attivo, mostriamo l'iframe a schermo intero senza bordi
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
      <iframe 
        data-tally-src={`https://tally.so/r/${form.tallyId}?transparentBackground=1`} 
        width="100%" 
        height="100%" 
        style={{ border: 'none', margin: 0, padding: 0 }}
        title={form.title}
      />
      <script async src="https://tally.so/widgets/embed.js"></script>
    </div>
  );
}

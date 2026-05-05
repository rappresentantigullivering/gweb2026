import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Inizializza Upstash Redis (i token vengono passati via Vercel/Netlify env)
// Per fallback locale o se le env non ci sono, usiamo stringhe vuote per evitare crash al build time.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const DB_KEY = 'gulliver:forms';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gulliver2026'; // Password default se non impostata

// Helper per controllare la password
function isAuthorized(request: Request) {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${ADMIN_PASSWORD}`;
}

export async function GET() {
  try {
    // Ritorna l'intero dizionario dei form
    // Struttura: { "volontari": { tallyId: "xxx", title: "Volontari", status: "active" } }
    const forms = (await redis.get(DB_KEY)) || {};
    return NextResponse.json(forms);
  } catch (error) {
    console.error('Redis GET Error:', error);
    // Return empty object if Redis is not configured yet so the site doesn't crash
    return NextResponse.json({}, { status: 200 }); 
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }
  
  try {
    const { action, slug, tallyId, title, status } = await request.json();
    
    if (!slug || !action) {
      return NextResponse.json({ error: 'Parametri mancanti' }, { status: 400 });
    }

    // Prendiamo l'oggetto completo
    let forms: Record<string, any> = (await redis.get(DB_KEY)) || {};

    if (action === 'create' || action === 'update') {
      forms[slug.toLowerCase()] = {
        tallyId,
        title,
        status: status || 'active' // active, suspended
      };
    } else if (action === 'delete') {
      delete forms[slug.toLowerCase()];
    } else {
      return NextResponse.json({ error: 'Azione sconosciuta' }, { status: 400 });
    }
    
    // Salviamo l'oggetto aggiornato
    await redis.set(DB_KEY, forms);
    
    return NextResponse.json({ success: true, forms });
  } catch (error) {
    console.error('Redis POST Error:', error);
    return NextResponse.json({ error: 'Errore di salvataggio' }, { status: 500 });
  }
}

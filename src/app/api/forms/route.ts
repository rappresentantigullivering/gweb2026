import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const DB_KEY = 'gulliver:forms';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gulliver2026';

function isAuthorized(request: Request) {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${ADMIN_PASSWORD}`;
}

// GET — lista pubblica dei form (nessuna autenticazione richiesta)
export async function GET() {
  try {
    const forms = (await redis.get(DB_KEY)) || {};
    return NextResponse.json(forms);
  } catch (error) {
    console.error('Redis GET Error:', error);
    return NextResponse.json({}, { status: 200 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, slug, tallyId, title, status } = body;

    // ── Azione "verify": usata solo per controllare la password al login.
    //    Non tocca il database, restituisce solo 200 se autorizzato.
    if (action === 'verify') {
      return NextResponse.json({ ok: true });
    }

    if (!slug || !action) {
      return NextResponse.json({ error: 'Parametri mancanti' }, { status: 400 });
    }

    // Blocco di sicurezza: impedisce la creazione di slug di sistema
    const reservedSlugs = ['__ping__', '__verify__', '__test__', 'api', 'admin', 'f'];
    if (reservedSlugs.includes(slug.toLowerCase())) {
      return NextResponse.json({ error: 'Slug riservato, scegline un altro.' }, { status: 400 });
    }

    let forms: Record<string, any> = (await redis.get(DB_KEY)) || {};

    if (action === 'create' || action === 'update') {
      forms[slug.toLowerCase()] = {
        tallyId,
        title,
        status: status || 'active',
      };
    } else if (action === 'delete') {
      delete forms[slug.toLowerCase()];
    } else {
      return NextResponse.json({ error: 'Azione sconosciuta' }, { status: 400 });
    }

    await redis.set(DB_KEY, forms);
    return NextResponse.json({ success: true, forms });
  } catch (error) {
    console.error('Redis POST Error:', error);
    return NextResponse.json({ error: 'Errore di salvataggio' }, { status: 500 });
  }
}

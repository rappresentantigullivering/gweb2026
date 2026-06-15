import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { cookies } from 'next/headers';
import { verifyAndDecodeSession } from '@/lib/auth';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const DB_KEY = 'gulliver:comunicazione:posts';
const SESSION_SECRET = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || 'gweb_sso_fallback_signing_secret_do_not_use_in_prod';

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get('gulliver_session')?.value;
  if (!token) return false;
  const payload = await verifyAndDecodeSession(token, SESSION_SECRET);
  if (!payload) return false;
  return payload.roles.includes('comunicazione') || payload.roles.includes('admin');
}

export async function GET() {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const data = await redis.get(DB_KEY);
    return NextResponse.json(data || {});
  } catch (error) {
    console.error('Error in GET /api/comunicazione:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const { action, post } = await req.json();

    if (!action) {
      return NextResponse.json({ error: 'Azione mancante' }, { status: 400 });
    }

    const currentData: any = (await redis.get(DB_KEY)) || {};

    if (action === 'create' || action === 'update') {
      if (!post || !post.id) {
        return NextResponse.json({ error: 'Dati del post non validi' }, { status: 400 });
      }
      
      const existingPost = currentData[post.id];
      const remindersSent = post.reminders_sent || (existingPost ? existingPost.reminders_sent : []) || [];

      currentData[post.id] = {
        ...post,
        reminders_sent: remindersSent
      };

      await redis.set(DB_KEY, currentData);
      return NextResponse.json({ success: true, post: currentData[post.id] });
    }

    if (action === 'delete') {
      const { id } = post || {};
      if (!id || !currentData[id]) {
        return NextResponse.json({ error: 'ID post non trovato o non valido' }, { status: 404 });
      }

      delete currentData[id];
      await redis.set(DB_KEY, currentData);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Azione non supportata' }, { status: 400 });
  } catch (error) {
    console.error('Error in POST /api/comunicazione:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

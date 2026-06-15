import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Redis } from '@upstash/redis';
import { verifyAndDecodeSession } from '@/lib/auth';

const redis = Redis.fromEnv();
const SESSION_SECRET = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || 'gweb_sso_fallback_signing_secret_do_not_use_in_prod';

export async function POST(req: Request) {
  try {
    const host = req.headers.get('host') || '';
    const domain = host.includes('gulliverancona.it') ? '.gulliverancona.it' : undefined;

    const cookieStore = await cookies();
    const token = cookieStore.get('gulliver_session')?.value;

    if (token) {
      const payload = await verifyAndDecodeSession(token, SESSION_SECRET);
      if (payload && payload.sessionId) {
        await redis.del(`gulliver:session:${payload.sessionId}`);
      }
    }

    cookieStore.set('gulliver_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      domain,
      maxAge: 0,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Redis } from '@upstash/redis';
import { signSession, verifyPassword, hashPassword } from '@/lib/auth';

const redis = Redis.fromEnv();
const USERS_KEY = 'gulliver:users';
const SESSION_SECRET = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || 'gweb_sso_fallback_signing_secret_do_not_use_in_prod';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username e password richiesti' }, { status: 400 });
    }

    const sanitizedUsername = username.trim().toLowerCase();
    const usersMap = (await redis.get<Record<string, any>>(USERS_KEY)) || {};
    const user = usersMap[sanitizedUsername];

    if (!user) {
      return NextResponse.json({ error: 'Utente non registrato' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Password errata' }, { status: 401 });
    }

    const sessionId = crypto.randomUUID();
    const SESSION_TTL = 7 * 24 * 60 * 60; // 7 days in seconds
    await redis.set(`gulliver:session:${sessionId}`, { username: user.username }, { ex: SESSION_TTL });

    // 7 days expiration
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const payload = {
      username: user.username,
      roles: user.roles,
      expires,
      sessionId,
    };

    const token = await signSession(payload, SESSION_SECRET);

    const host = req.headers.get('host') || '';
    const domain = host.includes('gulliverancona.it') ? '.gulliverancona.it' : undefined;

    const cookieStore = await cookies();
    cookieStore.set('gulliver_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      domain,
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return NextResponse.json({ success: true, roles: user.roles });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

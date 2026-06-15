import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Redis } from '@upstash/redis';
import { signSession, verifyPassword, hashPassword } from '@/lib/auth';

const redis = Redis.fromEnv();
const USERS_KEY = 'gulliver:users';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gulliver2026';

// Seed default users if key is empty
async function getSeededUsers() {
  let usersMap = await redis.get<Record<string, any>>(USERS_KEY);
  if (!usersMap || Object.keys(usersMap).length === 0) {
    const defaultPasswordHash = await hashPassword('linganguli');
    usersMap = {
      lorenzo: {
        username: 'lorenzo',
        passwordHash: defaultPasswordHash,
        roles: ['admin', 'tesserato', 'appunti', 'popup', 'forms', 'comunicazione', 'direttivo'],
      },
      presidente: {
        username: 'presidente',
        passwordHash: defaultPasswordHash,
        roles: ['admin', 'tesserato', 'appunti', 'popup', 'forms', 'comunicazione', 'direttivo'],
      },
    };
    await redis.set(USERS_KEY, usersMap);
  }
  return usersMap;
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username e password richiesti' }, { status: 400 });
    }

    const sanitizedUsername = username.trim().toLowerCase();
    const usersMap = await getSeededUsers();
    const user = usersMap[sanitizedUsername];

    if (!user) {
      return NextResponse.json({ error: 'Utente non registrato' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Password errata' }, { status: 401 });
    }

    // 7 days expiration
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const payload = {
      username: user.username,
      roles: user.roles,
      expires,
    };

    const token = await signSession(payload, ADMIN_PASSWORD);

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

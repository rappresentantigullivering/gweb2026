import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signSession } from '@/lib/auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gulliver2026';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Password errata' }, { status: 401 });
    }

    // 7 days expiration
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const token = await signSession(expires, ADMIN_PASSWORD);

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

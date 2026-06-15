import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAndDecodeSession } from '@/lib/auth';

const SESSION_SECRET = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || 'gweb_sso_fallback_signing_secret_do_not_use_in_prod';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('gulliver_session')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = await verifyAndDecodeSession(token, SESSION_SECRET);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      username: payload.username,
      roles: payload.roles,
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gulliver2026';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('gulliver_session')?.value;

    if (!token || !(await verifySession(token, ADMIN_PASSWORD))) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const host = req.headers.get('host') || '';
    const domain = host.includes('gulliverancona.it') ? '.gulliverancona.it' : undefined;

    const cookieStore = await cookies();
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

import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const SETTINGS_KEY = 'gulliver:settings';

export async function GET() {
  try {
    const settings: any = await redis.get(SETTINGS_KEY);
    return NextResponse.json(settings || { popupActive: false });
  } catch (error) {
    console.error('Redis error:', error);
    return NextResponse.json({ popupActive: false });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    const password = authHeader?.replace('Bearer ', '');

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, popupActive } = await req.json();

    if (action === 'updatePopup') {
      const currentSettings: any = (await redis.get(SETTINGS_KEY)) || {};
      const newSettings = { ...currentSettings, popupActive };
      await redis.set(SETTINGS_KEY, newSettings);
      return NextResponse.json({ success: true, settings: newSettings });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

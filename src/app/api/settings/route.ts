import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { cookies } from 'next/headers';
import { verifyAndDecodeSession } from '@/lib/auth';

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
    const cookieStore = await cookies();
    const token = cookieStore.get('gulliver_session')?.value;
    const adminPassword = process.env.ADMIN_PASSWORD || 'gulliver2026';
    let authorized = false;

    if (token) {
      const payload = await verifyAndDecodeSession(token, adminPassword);
      if (payload && (
        payload.roles.includes('popup') ||
        payload.roles.includes('direttivo') ||
        payload.roles.includes('admin')
      )) {
        authorized = true;
      }
    } else {
      const authHeader = req.headers.get('Authorization');
      const password = authHeader?.replace('Bearer ', '');
      if (password === adminPassword) {
        authorized = true;
      }
    }

    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, popupActive, popupTitle, popupText } = await req.json();

    if (action === 'updatePopup') {
      const currentSettings: any = (await redis.get(SETTINGS_KEY)) || {};
      
      // Controlla se il titolo o il testo sono cambiati rispetto a quelli salvati
      const isTitleChanged = popupTitle !== undefined && popupTitle !== currentSettings.popupTitle;
      const isTextChanged = popupText !== undefined && popupText !== currentSettings.popupText;
      
      // Se sono cambiati, o se la versione non esiste ancora, generiamo un nuovo timestamp (versione)
      const popupVersion = (isTitleChanged || isTextChanged || !currentSettings.popupVersion)
        ? Date.now().toString()
        : currentSettings.popupVersion;

      const newSettings = { 
        ...currentSettings, 
        popupActive: popupActive !== undefined ? popupActive : currentSettings.popupActive,
        popupTitle: popupTitle !== undefined ? popupTitle : currentSettings.popupTitle,
        popupText: popupText !== undefined ? popupText : currentSettings.popupText,
        popupVersion
      };
      
      await redis.set(SETTINGS_KEY, newSettings);
      return NextResponse.json({ success: true, settings: newSettings });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

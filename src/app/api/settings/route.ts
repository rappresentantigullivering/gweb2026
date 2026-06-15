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
    const SESSION_SECRET = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || 'gweb_sso_fallback_signing_secret_do_not_use_in_prod';
    const compatibilityPassword = process.env.ADMIN_PASSWORD || process.env.SESSION_SECRET || '';
    let authorized = false;

    if (token) {
      const payload = await verifyAndDecodeSession(token, SESSION_SECRET);
      if (payload && (
        payload.roles.includes('popup') ||
        payload.roles.includes('direttivo') ||
        payload.roles.includes('admin')
      )) {
        if (payload.sessionId) {
          const isActive = await redis.exists(`gulliver:session:${payload.sessionId}`);
          if (isActive) {
            authorized = true;
          }
        } else {
          authorized = true;
        }
      }
    } else {
      const authHeader = req.headers.get('Authorization');
      const password = authHeader?.replace('Bearer ', '');
      if (compatibilityPassword && password === compatibilityPassword) {
        authorized = true;
      }
    }

    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { 
      action, 
      popupActive, 
      popupTitle, 
      popupText, 
      popupPrimaryBtnText, 
      popupPrimaryBtnUrl, 
      popupSecondaryBtnText 
    } = await req.json();

    if (action === 'updatePopup') {
      const currentSettings: any = (await redis.get(SETTINGS_KEY)) || {};
      
      // Controlla se qualcosa è cambiato rispetto a quanto salvato
      const isTitleChanged = popupTitle !== undefined && popupTitle !== currentSettings.popupTitle;
      const isTextChanged = popupText !== undefined && popupText !== currentSettings.popupText;
      const isBtn1TextChanged = popupPrimaryBtnText !== undefined && popupPrimaryBtnText !== currentSettings.popupPrimaryBtnText;
      const isBtn1UrlChanged = popupPrimaryBtnUrl !== undefined && popupPrimaryBtnUrl !== currentSettings.popupPrimaryBtnUrl;
      const isBtn2TextChanged = popupSecondaryBtnText !== undefined && popupSecondaryBtnText !== currentSettings.popupSecondaryBtnText;
      
      // Se sono cambiati, o se la versione non esiste ancora, generiamo un nuovo timestamp (versione)
      const popupVersion = (
        isTitleChanged || 
        isTextChanged || 
        isBtn1TextChanged || 
        isBtn1UrlChanged || 
        isBtn2TextChanged || 
        !currentSettings.popupVersion
      )
        ? Date.now().toString()
        : currentSettings.popupVersion;

      const newSettings = { 
        ...currentSettings, 
        popupActive: popupActive !== undefined ? popupActive : currentSettings.popupActive,
        popupTitle: popupTitle !== undefined ? popupTitle : currentSettings.popupTitle,
        popupText: popupText !== undefined ? popupText : currentSettings.popupText,
        popupPrimaryBtnText: popupPrimaryBtnText !== undefined ? popupPrimaryBtnText : currentSettings.popupPrimaryBtnText,
        popupPrimaryBtnUrl: popupPrimaryBtnUrl !== undefined ? popupPrimaryBtnUrl : currentSettings.popupPrimaryBtnUrl,
        popupSecondaryBtnText: popupSecondaryBtnText !== undefined ? popupSecondaryBtnText : currentSettings.popupSecondaryBtnText,
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

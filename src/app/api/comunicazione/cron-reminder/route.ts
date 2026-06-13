import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const DB_KEY = 'gulliver:comunicazione:posts';
const CRON_SECRET = process.env.CRON_SECRET || 'gulliver-cron-secret';

function formatTime(date: Date) {
  try {
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome' });
  } catch {
    return date.toISOString().substring(11, 16);
  }
}

async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[Telegram Mock] Credentials not set. Message would have been:\n', text);
    return true; // Return true to simulate successful warning in local dev
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: false,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Telegram API error:', errText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const secretParam = searchParams.get('secret');
    const authHeader = req.headers.get('authorization');
    const secretHeader = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    const secret = secretParam || secretHeader;

    if (secret !== CRON_SECRET && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const currentData: any = (await redis.get(DB_KEY)) || {};
    const now = new Date();
    const nowMs = now.getTime();
    let hasChanges = false;
    const notificationsSent: string[] = [];

    for (const id in currentData) {
      const post = currentData[id];
      if (!post.data_pubblicazione) continue;

      const pubDate = new Date(post.data_pubblicazione);
      const pubMs = pubDate.getTime();
      const diffMs = pubMs - nowMs;
      const diffHours = diffMs / (1000 * 60 * 60);

      // Prepara reminders_sent se non esiste
      if (!post.reminders_sent) {
        post.reminders_sent = [];
      }

      // 1. Promemoria 24 ore prima dell'uscita (finestra di controllo: tra 18 e 25 ore prima)
      if (diffHours > 18 && diffHours <= 25 && !post.reminders_sent.includes('24h_warn')) {
        let text = '';
        if (post.stato_grafica === 'done') {
          text = `<b>✅ GRAFICA PRONTA (24h all'uscita)</b>\n\n` +
                 `Il post <b>"${post.titolo}"</b> è programmato per domani alle <b>${formatTime(pubDate)}</b>.\n\n` +
                 `🎨 <b>Canva:</b> <a href="${post.canva_link}">Apri progetto</a>\n` +
                 `📝 <b>Didascalia pronta:</b>\n<pre>${post.didascalia || '(Nessuna didascalia)'}</pre>`;
        } else {
          text = `<b>⚠️ COMPILAZIONE IN RITARDO (24h all'uscita)</b>\n\n` +
                 `Mancano solo 24 ore alla pubblicazione del post <b>"${post.titolo}"</b> (${formatTime(pubDate)}) e la grafica non è ancora segnata come pronta!\n\n` +
                 `🎨 <b>Canva:</b> <a href="${post.canva_link}">Apri e collabora</a>`;
        }

        const sent = await sendTelegramMessage(text);
        if (sent) {
          post.reminders_sent.push('24h_warn');
          hasChanges = true;
          notificationsSent.push(`${post.titolo} (24h_warn)`);
        }
      }

      // 2. Promemoria finale 1 ora prima dell'uscita (finestra di controllo: tra 0 e 1.2 ore prima)
      if (diffHours > 0 && diffHours <= 1.2 && !post.reminders_sent.includes('1h_final')) {
        const text = `<b>⏳ IN USCITA TRA UN'ORA</b>\n\n` +
                     `Il post <b>"${post.titolo}"</b> deve essere pubblicato tra circa un'ora (ore <b>${formatTime(pubDate)}</b>)!\n\n` +
                     `🎨 <b>Canva:</b> <a href="${post.canva_link}">Link progetto</a>\n\n` +
                     `📝 <b>Didascalia da copiare:</b>\n<pre>${post.didascalia || '(Nessuna didascalia)'}</pre>`;

        const sent = await sendTelegramMessage(text);
        if (sent) {
          post.reminders_sent.push('1h_final');
          hasChanges = true;
          notificationsSent.push(`${post.titolo} (1h_final)`);
        }
      }
    }

    if (hasChanges) {
      await redis.set(DB_KEY, currentData);
    }

    return NextResponse.json({
      success: true,
      processed_at: now.toISOString(),
      notifications_sent: notificationsSent,
    });
  } catch (error) {
    console.error('Error in cron-reminder:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

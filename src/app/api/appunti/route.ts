import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAndDecodeSession } from '@/lib/auth';
import { Redis } from '@upstash/redis';

const SHEET_ID = process.env.NEXT_PUBLIC_APPUNTI_SHEET_ID;
if (!SHEET_ID) {
  console.warn('ATTENZIONE: NEXT_PUBLIC_APPUNTI_SHEET_ID non definita nelle variabili d\'ambiente.');
}
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
const SESSION_SECRET = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || 'gweb_sso_fallback_signing_secret_do_not_use_in_prod';

export type Appunto = {
  id: string;
  facolta: string;
  anno: string;
  semestre: string;
  materia: string;
  professore: string;
  tipo: string;
  annoAccademico: string;
  descrizione: string;
  qualita: string;
  watermark: boolean;
  link: string;
};

// Semplice parser CSV che gestisce i campi tra virgolette
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('gulliver_session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }
    const payload = await verifyAndDecodeSession(token, SESSION_SECRET);
    if (!payload || !(payload.roles.includes('appunti') || payload.roles.includes('admin'))) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    if (payload.sessionId) {
      const redis = Redis.fromEnv();
      const isActive = await redis.exists(`gulliver:session:${payload.sessionId}`);
      if (!isActive) {
        return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
      }
    }

    const { searchParams } = new URL(request.url);
    const sheetType = searchParams.get('sheet') || 'digitali';
    
    const GIDS: Record<string, string> = {
      digitali: '0',
      cartacei: '1603948657'
    };

    const gid = GIDS[sheetType] || '0';
    const url = `${SHEET_CSV_URL}&gid=${gid}`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Impossibile scaricare il foglio');
    const text = await res.text();

    const lines = text.split(/\r?\n/);
    const appunti: Appunto[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      const cols = parseCsvLine(line);

      if (sheetType === 'cartacei') {
        const facolta = cols[1]?.trim();
        const materia = cols[3]?.trim();
        if (!facolta || !materia || facolta === 'Corso') continue; // Salta header o righe vuote

        appunti.push({
          id: `c-${i}`, // ID generato per i cartacei
          facolta,
          anno: cols[2]?.trim() || '',
          semestre: '',
          materia,
          professore: cols[4]?.trim() || '',
          tipo: cols[5]?.trim() || '',
          annoAccademico: '',
          descrizione: cols[6]?.trim() || '',
          qualita: '',
          watermark: false,
          link: '',
        });
      } else {
        // Logica originale per Digitali
        const id = cols[0]?.trim();
        const facolta = cols[1]?.trim();
        if (!id || isNaN(Number(id)) || !facolta) continue;

        appunti.push({
          id,
          facolta,
          anno: cols[2]?.trim() || '',
          semestre: cols[3]?.trim() || '',
          materia: cols[5]?.trim() || '',
          professore: cols[6]?.trim() || '',
          tipo: cols[7]?.trim() || '',
          annoAccademico: cols[8]?.trim() || '',
          descrizione: cols[9]?.trim() || '',
          qualita: cols[10]?.trim() || '',
          watermark: cols[11]?.trim().toUpperCase() === 'S',
          link: cols[12]?.trim() || '',
        });
      }
    }

    return NextResponse.json(appunti);
  } catch (err) {
    console.error('Appunti fetch error:', err);
    return NextResponse.json({ error: 'Errore nel caricamento degli appunti' }, { status: 500 });
  }
}

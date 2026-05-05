import { NextResponse } from 'next/server';

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1bz-tBt6pjk8Z9zadctHX2INiCUl9RC5beigbYjIRfDo/export?format=csv';

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
  disponibile: boolean;
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
  const { searchParams } = new URL(request.url);
  const sheetType = searchParams.get('sheet') || 'digitali';
  
  const GIDS: Record<string, string> = {
    digitali: '0',
    cartacei: '1603948657'
  };

  const gid = GIDS[sheetType] || '0';
  const url = `${SHEET_CSV_URL}&gid=${gid}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Impossibile scaricare il foglio');
    const text = await res.text();

    const lines = text.split(/\r?\n/);
    const appunti: Appunto[] = [];

    for (const line of lines) {
      if (!line.trim()) continue;
      const cols = parseCsvLine(line);

      // Le righe di dati reali hanno un ID numerico in col[0] e una facoltà in col[1]
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
        disponibile: cols[11]?.trim().toUpperCase() === 'S',
        link: cols[12]?.trim() || '',
      });
    }

    return NextResponse.json(appunti);
  } catch (err) {
    console.error('Appunti fetch error:', err);
    return NextResponse.json({ error: 'Errore nel caricamento degli appunti' }, { status: 500 });
  }
}

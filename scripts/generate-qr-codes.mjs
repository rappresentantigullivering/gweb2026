import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const links = [
  { name: 'kit26_qr.png', url: 'https://www.gulliverancona.it/kit26/' },
  { name: 'guide26_qr.png', url: 'https://www.gulliverancona.it/guida26/' },
  { name: 'gruppi26_qr.png', url: 'https://www.gulliverancona.it/gruppi26/' },
  { name: 'affittigulliver_qr.png', url: 'https://t.me/affittigulliver' },
  { name: 'matricoleunivpm2025_qr.png', url: 'https://t.me/matricoleunivpm2025' },
  { name: 'semestrefiltrounivpm2026_qr.png', url: 'https://t.me/semestrefiltrounivpm2026' },
  { name: 'eng-guida26_qr.png', url: 'https://www.gulliverancona.it/eng-guida26/' },
];

const qrFolder = join(process.cwd(), 'docs', '2026', 'qrcodes');

async function generateQrCodes() {
  console.log('Generating and downloading QR codes...');
  await mkdir(qrFolder, { recursive: true });

  let failures = 0;

  for (const link of links) {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(link.url)}&margin=10`;
    const outputPath = join(qrFolder, link.name);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      await writeFile(outputPath, buffer);
      console.log(`✓ Saved ${link.name} -> ${link.url}`);
    } catch (error) {
      failures += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`✗ Failed ${link.name}: ${message}`);
    }
  }

  if (failures > 0) {
    throw new Error(`QR generation failed for ${failures} destination(s).`);
  }

  console.log(`All QR codes saved in ${qrFolder}`);
}

await generateQrCodes();

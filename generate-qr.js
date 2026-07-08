const fs = require('fs');
const path = require('path');

const links = [
  { name: 'kit26_qr.png', url: 'https://www.gulliverancona.it/kit26/' },
  { name: 'guide26_qr.png', url: 'https://www.gulliverancona.it/guide26/' },
  { name: 'gruppi26_qr.png', url: 'https://www.gulliverancona.it/gruppi26/' },
  { name: 'affittigulliver_qr.png', url: 'https://t.me/affittigulliver' }
];

async function downloadQR() {
  console.log('Generating and downloading QR codes...');
  
  const qrFolder = path.join(process.cwd(), 'qrcodes');
  if (!fs.existsSync(qrFolder)) {
    fs.mkdirSync(qrFolder);
  }

  for (const link of links) {
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(link.url)}&margin=10`;
    const outputPath = path.join(qrFolder, link.name);
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(outputPath, buffer);
      console.log(`✓ Saved ${link.name} -> ${link.url}`);
    } catch (error) {
      console.error(`✗ Failed to generate QR code for ${link.url}:`, error.message);
    }
  }

  console.log(`\nAll QR codes saved successfully in the folder: ${qrFolder}`);
}

downloadQR();

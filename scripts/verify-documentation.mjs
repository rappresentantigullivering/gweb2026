import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const docsRoot = join(root, 'docs');
const errors = [];

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function display(path) {
  return relative(root, path).split('\\').join('/');
}

if (!existsSync(join(root, 'README.md'))) {
  errors.push('README.md principale mancante.');
}

if (!existsSync(docsRoot)) {
  errors.push('Cartella docs mancante.');
}

const markdownFiles = existsSync(docsRoot)
  ? walk(docsRoot).filter((path) => extname(path).toLowerCase() === '.md')
  : [];

const linkPattern = /(?<!!)\[[^\]]*\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const source = readFileSync(file, 'utf8');
  let match;

  while ((match = linkPattern.exec(source)) !== null) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, '');
    if (!rawTarget || rawTarget.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(rawTarget)) {
      continue;
    }

    const pathPart = rawTarget.split('#')[0].split('?')[0];
    let decoded;
    try {
      decoded = decodeURIComponent(pathPart);
    } catch {
      errors.push(`${display(file)}: link non decodificabile "${rawTarget}".`);
      continue;
    }

    const target = normalize(resolve(dirname(file), decoded));
    if (!target.startsWith(root) || !existsSync(target)) {
      errors.push(`${display(file)}: destinazione locale mancante "${rawTarget}".`);
    }
  }

  if (display(file).startsWith('docs/features/')) {
    const required = [
      '## Metadati',
      '**Stato:**',
      '**Ultima verifica:**',
      '**Punti di ingresso:**',
      '## Prima di modificare',
      '## Verifica',
    ];
    for (const marker of required) {
      if (!source.includes(marker)) {
        errors.push(`${display(file)}: sezione obbligatoria mancante: ${marker}`);
      }
    }
  }
}

try {
  const tracked = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
  const scattered = tracked.filter((path) =>
    existsSync(join(root, path)) &&
    !path.includes('/') &&
    /\.(md|mdx|tex)$/i.test(path) &&
    path !== 'README.md'
  );
  if (scattered.length > 0) {
    errors.push(`Documenti tecnici sparsi nella root: ${scattered.join(', ')}`);
  }
} catch (error) {
  errors.push(`Impossibile leggere i file tracciati da Git: ${error.message}`);
}

if (errors.length > 0) {
  console.error('Verifica documentazione fallita:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Documentazione valida: ${markdownFiles.length} file Markdown controllati.`);

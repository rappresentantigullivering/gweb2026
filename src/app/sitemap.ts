import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.gulliverancona.it';

  // Tutte le route statiche principali del sito
  const routes = [
    '',
    '/chi-siamo',
    '/associazione-culturale',
    '/rappresentanza',
    '/contatti',
    '/privacy',
    '/trasparenza',
    '/elezioni-studentesche',
    '/elezioni-studentesche/candidati',
    '/elezioni-studentesche/gulliver46',
    '/elezioni-studentesche/programma',
    '/elezioni-studentesche/programma/ateneo',
    '/elezioni-studentesche/programma/dsu',
    '/elezioni-studentesche/programma/acu',
    '/elezioni-studentesche/programma/dottorand3',
    '/elezioni-studentesche/programma/decentrate',
    '/elezioni-studentesche/programma/ingegneria',
    '/elezioni-studentesche/programma/medicina',
    '/elezioni-studentesche/programma/economia',
    '/elezioni-studentesche/programma/scienze',
    '/elezioni-studentesche/programma/agraria',
    '/matricole',
    '/matricole/kit',
    '/matricole/gruppi',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route.includes('elezioni') ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.includes('elezioni') ? 0.9 : 0.8,
  }));
}

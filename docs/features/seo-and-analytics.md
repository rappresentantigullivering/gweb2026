# SEO, analytics e condivisione

## Metadati

- **Stato:** Implementata, sitemap da completare
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** layout metadata, `/sitemap.xml`, `/robots.txt`

## Scopo e flusso

Metadata, sitemap e robots rendono le pagine pubbliche comprensibili ai motori di
ricerca e alle anteprime social. Vercel Analytics e Speed Insights misurano utilizzo e
prestazioni dal layout radice.

## Implementazione

- Metadata globali, Open Graph e Twitter: `src/app/layout.tsx`.
- Sitemap: `src/app/sitemap.ts` (`force-static`).
- Robots: `src/app/robots.ts` (`force-static`).
- Immagini social/favicon/manifesti: `public/`.
- Analytics: pacchetti `@vercel/analytics` e `@vercel/speed-insights`.

Robots consente l'indicizzazione generale ed esclude `/404`; `/countdown` dichiara
noindex nella propria pagina. I pannelli interni dipendono soprattutto da controllo
accessi: aggiungere noindex/headers può essere una difesa aggiuntiva, non sostitutiva.

## Dipendenze

- URL canonico `https://www.gulliverancona.it`.
- Asset social raggiungibili pubblicamente.
- Lista route aggiornata manualmente nella sitemap.
- Informativa privacy coerente con analytics.

## Prima di modificare

- Aggiungere/rimuovere route nella sitemap insieme alla navigazione pubblica.
- Non inserire pagine private o URL di sottodominio operativo nella sitemap.
- Verificare titolo, descrizione, immagine e URL assoluto nelle anteprime.
- Uno snapshot non deve diventare accidentalmente la versione canonica corrente.
- Se cambia analytics/provider, aggiornare privacy e documentazione dati.

## Verifica

1. Aprire `/sitemap.xml` e confrontarla con la mappa delle route pubbliche.
2. Aprire `/robots.txt` e verificare esclusioni.
3. Validare un campione di metadata/preview per home, matricole ed elezioni.
4. Controllare Analytics e Speed Insights dopo il deploy.
5. Verificare 404 e pagine tecniche noindex.

## Limiti noti

La sitemap include route matricole storiche ma non tutte le route 2026. Non esiste un
test automatico che confronti filesystem delle pagine e sitemap.

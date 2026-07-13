# Architettura

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `src/app/`, `src/proxy.ts`, `src/lib/`, `public/`

## Quadro generale

Il progetto è una singola applicazione Next.js 16 con App Router. Dallo stesso deploy
serve il sito pubblico, i pannelli interni, le API e gli snapshot statici. Il dominio
richiesto determina quale interfaccia viene mostrata; `src/proxy.ts` applica rewrite,
login e controllo dei ruoli per i sottodomini.

```text
Utente
  -> Cloudflare DNS/proxy
  -> Vercel / applicazione Next.js
       -> dominio principale: pagine pubbliche
       -> sottodomini: proxy + SSO/RBAC + pannelli
       -> /api/*: route handler server-side
       -> /archivio/*: file statici congelati in public
       -> Upstash Redis / Google Sheets / Tally / Telegram
```

## Confini principali

| Area | Posizione | Responsabilità |
| --- | --- | --- |
| Pagine e API | `src/app/` | UI, metadata, route handler |
| Componenti condivisi | `src/components/` | navbar, footer, popup e UI riusabile |
| Autenticazione | `src/lib/auth.ts` | firma sessioni e hash password |
| Instradamento | `src/proxy.ts` | sottodomini, ruoli, rewrite e redirect |
| Statici correnti | `public/` | immagini, favicon, PDF e manifesti |
| Snapshot | `public/archivio/<anno>/` | export HTML/CSS/JS indipendente e immutabile |
| Script operativi | `scripts/` | verifica e trasformazione ripetibili |
| Manuale | `docs/` | fonte di verità tecnica e procedure |

## Rendering

Il sito combina pagine statiche, componenti client e route dinamiche. I form pubblici
sono dinamici perché leggono la configurazione da Redis; le API eseguono i controlli
server-side. Lo snapshot 2025 non è un secondo progetto vivo: è un export statico
copiato in `public/archivio/2025/` e raggiunto tramite rewrite mirati.

## Scelta monorepo/monodeploy

Tenere i servizi nello stesso progetto semplifica deploy, dominio, sessione condivisa
e manutenzione. Il rovescio della medaglia è che un cambiamento a proxy, layout,
cookie o variabili d'ambiente può influenzare più pannelli contemporaneamente.
Per questo i documenti funzionali elencano sempre dipendenze e test trasversali.

## Cosa è persistente

Il filesystem del deploy non è il database. Utenti, sessioni, form, impostazioni popup
e calendario comunicazione risiedono in Upstash Redis. Il catalogo appunti arriva da
Google Sheets. Pagine, testi hard-coded e asset sotto `public/` cambiano invece con un
commit e un deploy.

## Prima di modificare

- Una cartella apparentemente non collegata alla navbar può essere una destinazione
  di sottodominio o API: controllare `src/proxy.ts`, chiamate `fetch`, sitemap e link.
- Non eliminare `src/app/api`, `src/app/f`, `src/app/admin`, `src/app/comunicazione`,
  `src/app/appunti`, `src/app/popup`, `src/app/tesserati` o `src/app/direttivo` durante
  una pulizia di pagine pubbliche.
- Prima di cambiare il formato di una chiave Redis, prevedere migrazione o compatibilità.
- Prima di cambiare cookie, dominio o ruoli, provare tutti i sottodomini protetti.
- Uno snapshot si genera da una copia temporanea: le esclusioni necessarie all'export
  non vanno replicate nel progetto live.

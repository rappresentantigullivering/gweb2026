# Dati e integrazioni

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** route in `src/app/api/` e variabili d'ambiente Vercel

## Upstash Redis

Redis è la persistenza operativa condivisa. Le chiavi principali sono:

| Chiave/prefisso | Contenuto | Proprietario |
| --- | --- | --- |
| `gulliver:users` | utenti, hash password e ruoli | autenticazione/admin |
| `gulliver:users:requests` | richieste di registrazione | admin |
| `gulliver:session:<id>` | validità server-side della sessione | autenticazione |
| `gulliver:forms` | form dinamici e stato | pannello form |
| `gulliver:settings` | impostazioni popup | pannello popup |
| `gulliver:comunicazione:posts` | contenuti programmati e reminder | comunicazione |

Le variabili `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN` collegano il
database. Non documentarne mai i valori. Un nuovo ambiente con Redis vuoto è
funzionante a livello applicativo, ma non contiene utenti o configurazioni.

## Google Sheets

Il catalogo appunti legge l'export CSV di un foglio identificato da
`NEXT_PUBLIC_APPUNTI_SHEET_ID`. I tab attuali usano GID fissi:

- `0`: appunti digitali;
- `1603948657`: appunti cartacei.

L'API applica una cache/revalidation di 60 secondi. Ordine e intestazioni delle colonne
sono un contratto implicito: modificarli nel foglio può rompere parsing e filtri.

## Tally

I form non raccolgono risposte nel repository o in Redis. Redis conserva titolo,
slug, URL Tally e stato; la pagina pubblica incorpora il form Tally con un iframe.
Privacy, retention, export e gestione delle risposte dipendono quindi anche dal
workspace Tally esterno.

## Telegram

L'endpoint reminder comunicazione chiama le API Telegram con
`TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID`. `CRON_SECRET` protegge l'invocazione in
produzione. Nel repository non è configurata una pianificazione Vercel Cron: va
verificato quale scheduler esterno richiama l'endpoint prima di fare affidamento sui
promemoria automatici.

## Vercel

Vercel ospita il progetto, esegue build e deploy, fornisce Analytics e Speed Insights
e conserva le variabili d'ambiente. La configurazione `vercel.json` abilita il deploy
Git solo per `main` e disabilita gli altri branch.

## Cloudflare

Cloudflare gestisce i nameserver e il traffico del dominio. I record proxati possono
mostrare IP edge Cloudflare invece della destinazione Vercel durante una query DNS.

## Categorie dei dati

- Versionati in Git: codice, pagine, asset e PDF non sensibili.
- Operativi in Redis: credenziali hashate, ruoli, sessioni e configurazioni.
- Esterni: foglio appunti, form/risposte Tally, messaggi Telegram, log Vercel/Cloudflare.
- Locali al browser: stato di interazione con il popup globale.

## Prima di modificare

- Esportare o salvare i dati necessari prima di cambiare schema Redis.
- Non rinominare chiavi, colonne o GID senza migrazione e test con dati reali.
- Non assumere che un deploy ricrei dati o utenti.
- Verificare permessi e titolarità degli account esterni nel passaggio di consegne.
- Se si rimuove un'integrazione, aggiornare informativa privacy, variabili Vercel e
  questo manuale nello stesso lavoro.

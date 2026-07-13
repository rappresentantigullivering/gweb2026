# Deploy e DNS

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `vercel.json`, Vercel, Cloudflare, GitHub `main`

## Flusso di produzione

Il deploy ordinario è:

```text
commit su main -> push GitHub -> build Vercel -> produzione
```

`vercel.json` abilita i deploy Git per `main` e li disabilita per ogni altro branch.
Le preview non fanno parte del flusso ordinario e vanno abilitate solo quando richieste.
Non è prevista una seconda piattaforma di hosting attiva.

## DNS verificato il 2026-07-13

- Nameserver: `yevgen.ns.cloudflare.com`, `adrian.ns.cloudflare.com`.
- Il dominio radice e `www` risultano proxati da Cloudflare.
- `admin`, `forms`, `tesserati`, `appunti`, `popup`, `comunicazione` e `direttivo`
  risultano alias del dominio e raggiungono il progetto Vercel.

Gli IP mostrati da una query possono essere edge Cloudflare; non vanno copiati come
destinazione permanente senza controllare la configurazione nel pannello Cloudflare.

La modalità SSL/TLS Cloudflare deve essere verificata nel pannello e mantenuta su
**Full (strict)** quando il certificato origine Vercel è valido. Evitare `Flexible`:
Vercel forza HTTPS e una connessione Cloudflare-verso-origine in HTTP può produrre un
ciclo di redirect. Questa impostazione non è osservabile con la sola query DNS.

## Configurazione Vercel

Il progetto deve includere il dominio radice, `www` e tutti i sottodomini operativi.
Le variabili d'ambiente necessarie sono documentate per nome, mai per valore:

| Variabile | Necessità |
| --- | --- |
| `SESSION_SECRET` | obbligatoria in produzione |
| `UPSTASH_REDIS_REST_URL` | obbligatoria per dati/sessioni |
| `UPSTASH_REDIS_REST_TOKEN` | obbligatoria per dati/sessioni |
| `ADMIN_PASSWORD` | compatibilità legacy, da censire |
| `NEXT_PUBLIC_APPUNTI_SHEET_ID` | catalogo appunti |
| `CRON_SECRET` | reminder comunicazione |
| `TELEGRAM_BOT_TOKEN` | invio reminder Telegram |
| `TELEGRAM_CHAT_ID` | destinazione reminder |

## Build

La build usa Next.js 16.2.3 e React 19.2.4. `trailingSlash: true` e i rewrite archivio
in `next.config.ts` sono intenzionali. Le immagini Next sono `unoptimized` per
compatibilità con l'export e gli asset correnti.

## Responsabilità fuori dal repository

Il codice non può provare da solo:

- chi possiede gli account Cloudflare, Vercel, Upstash, Tally, Google e Telegram;
- quali metodi 2FA e contatti di recupero siano attivi;
- se esista uno scheduler esterno per i reminder;
- quali regole Cloudflare o protezioni Vercel siano configurate nel pannello.

Queste informazioni vanno controllate a ogni passaggio di consegne senza inserire
segreti nel repository.

## Prima di modificare

- Collegare un nuovo sottodominio sia in Cloudflare sia in Vercel, poi aggiornare il
  proxy e i ruoli nel codice.
- Non cambiare nameserver durante un normale deploy.
- Verificare le variabili in Production prima del merge; un ambiente Preview può
  avere valori diversi o assenti.
- Dopo il push controllare build, URL canonico, login e almeno un sottodominio.
- Per rollback usare un commit precedente o la funzione di rollback Vercel seguendo
  il runbook; non riscrivere distruttivamente la cronologia condivisa.

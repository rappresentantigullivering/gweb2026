# Calendario comunicazione

## Metadati

- **Stato:** Implementata, automazione scheduler da verificare
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `comunicazione.gulliverancona.it`, `/api/comunicazione*`

## Scopo e flusso

Il pannello organizza post social con data/ora di pubblicazione, stato della grafica,
link Canva e caption. Gli utenti autorizzati creano, aggiornano, eliminano e copiano
contenuti; un endpoint separato invia reminder Telegram vicino alla pubblicazione.

## Implementazione

- UI: `src/app/comunicazione/page.tsx`.
- CRUD: `src/app/api/comunicazione/route.ts`.
- Reminder: `src/app/api/comunicazione/cron-reminder/route.ts`.
- Persistenza: `gulliver:comunicazione:posts`.
- Ruolo: `comunicazione` o `admin`.

Ogni post contiene ID, titolo, data/ora, stato grafica (`todo`, `in_progress`, `done`),
link Canva, caption e marcatori `reminders_sent`. L'API preserva i marcatori durante
gli aggiornamenti per evitare duplicati.

Il reminder “24h” usa attualmente una finestra maggiore di 18 e fino a 25 ore; quello
“1h” maggiore di zero e fino a 1,2 ore. `CRON_SECRET` protegge l'endpoint in produzione;
bot e destinazione arrivano da variabili Telegram.

## Dipendenze

- Redis, SSO e ruoli.
- Telegram Bot API e chat configurata.
- Uno scheduler esterno che richiami periodicamente l'endpoint.
- Fuso orario e formato delle date inserite dall'utente.

## Prima di modificare

- Verificare lo scheduler reale: non è dichiarato in `vercel.json`.
- Non azzerare `reminders_sent` durante normali edit, altrimenti partono duplicati.
- Rendere esplicito il fuso orario quando si cambia il modello delle date.
- Proteggere il cron server-side; non inserire segreti nell'URL di documenti o log.
- Prima di cambiare le finestre capire la frequenza dello scheduler e i ritardi ammessi.

## Verifica

1. Creare/modificare/eliminare un post e ricaricare il pannello.
2. Provare tutti gli stati grafica e copia caption.
3. Invocare il cron in ambiente di test con post nelle due finestre.
4. Confermare un solo reminder per tipo e persistenza dei marcatori.
5. Provare segreto assente/errato e Telegram non disponibile.

## Limiti noti

La pianificazione del cron non è versionata nel repository. Non risultano audit log,
timezone per-post o recupero di una cancellazione.

# Sicurezza e accessi

## Metadati

- **Stato:** Implementata, con rischi noti
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `src/lib/auth.ts`, `src/proxy.ts`, `src/app/api/auth/`

## Modello di autenticazione

Il login legge gli utenti da Redis, verifica la password PBKDF2 e crea una sessione
di sette giorni. Il browser riceve il cookie `gulliver_session`; il token contiene
username, ruoli, scadenza e ID sessione ed è firmato HMAC-SHA-256. Redis conserva una
chiave per l'ID sessione, quindi logout o revoca possono invalidarla server-side.

Il cookie è `HttpOnly`, `SameSite=Strict`, `Secure` in produzione e valido per
`.gulliverancona.it`, così la stessa sessione funziona sui sottodomini.

## Password

Le password sono salvate come `salt:key`, con salt casuale da 16 byte e PBKDF2
SHA-256 a 100.000 iterazioni. Le richieste di registrazione salvano già l'hash, non
la password in chiaro. Le API non devono mai restituire l'hash al client.

## Ruoli

| Ruolo | Accesso principale |
| --- | --- |
| `admin` | pannello utenti e accesso trasversale a tutti i servizi |
| `tesserato` | cockpit tesserati |
| `forms` | gestione form |
| `appunti` | catalogo appunti |
| `popup` | gestione popup |
| `comunicazione` | calendario comunicazione |
| `direttivo` | portale direttivo |

Il proxy protegge le pagine dei sottodomini. Le API protette ripetono il controllo:
questo è necessario perché `/api/*` è escluso dal matcher del proxy.

## Variabili sensibili

- `SESSION_SECRET`: segreto di firma sessioni, obbligatorio e forte in produzione.
- `ADMIN_PASSWORD`: compatibilità legacy per alcune API via Bearer; non è il sistema
  SSO principale.
- `UPSTASH_REDIS_REST_TOKEN`: accesso al database.
- `CRON_SECRET`: protezione dell'endpoint reminder.
- `TELEGRAM_BOT_TOKEN`: accesso al bot.

I valori vivono in Vercel e non devono entrare in Git, ticket o screenshot condivisi.

## Rischio critico noto

Il codice usa `SESSION_SECRET`, poi `ADMIN_PASSWORD`, poi una stringa fallback. In
produzione deve essere sempre impostato un `SESSION_SECRET` lungo e casuale. Cambiarlo
disconnette tutte le sessioni esistenti, comportamento utile durante una revoca ma da
programmare negli altri casi.

La compatibilità Bearer con `ADMIN_PASSWORD` nelle API form/impostazioni aumenta la
superficie di accesso. Va mantenuta soltanto finché esistono consumatori reali; prima
di rimuoverla cercarli e migrare ciascuno al controllo SSO.

## Controlli amministrativi

L'admin non può eliminare se stesso né rimuovere il proprio ruolo admin. Questo evita
un lockout accidentale, ma non sostituisce una procedura di recupero. Devono esistere
almeno due persone autorizzate a gestire Vercel, Cloudflare e Upstash.

## Prima di modificare

- Non cambiare nome, dominio o attributi del cookie senza provare login/logout su
  tutti i sottodomini.
- Non affidarsi soltanto al controllo UI: ogni API mutante deve verificare sessione e
  ruolo sul server.
- Non stampare token, password, hash o payload completi nei log.
- Ogni nuovo ruolo va aggiunto coerentemente a proxy, cockpit, API e pannello admin.
- Per una modifica crittografica pianificare migrazione utenti/sessioni e rollback.
- Dopo una possibile esposizione ruotare i segreti e invalidare le sessioni.

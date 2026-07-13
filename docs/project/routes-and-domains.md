# Route e domini

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `src/proxy.ts`, `src/app/`, `next.config.ts`

## Dominio pubblico

`www.gulliverancona.it` e il dominio radice servono le pagine pubbliche. Navbar e
footer sono visibili; i principali gruppi di route sono descritti nei documenti sotto
`docs/features/`.

## Sottodomini operativi

| Host | Prefisso interno | Accesso richiesto | Eccezioni pubbliche |
| --- | --- | --- | --- |
| `tesserati.gulliverancona.it` | `/tesserati` | ruolo `tesserato` | login, registrazione, non autorizzato |
| `admin.gulliverancona.it` | `/admin` | `admin` | nessuna |
| `forms.gulliverancona.it` | `/f` | `forms` per la home | `/<slug>` è pubblico |
| `appunti.gulliverancona.it` | `/appunti` | `appunti` | nessuna |
| `popup.gulliverancona.it` | `/popup` | `popup` | nessuna |
| `comunicazione.gulliverancona.it` | `/comunicazione` | `comunicazione` | nessuna |
| `direttivo.gulliverancona.it` | `/direttivo` | `direttivo` | nessuna |

Il ruolo `admin` supera i controlli specifici dei servizi. L'URL visibile resta sul
sottodominio: il proxy esegue un rewrite verso il prefisso interno.

## Route pubbliche principali

- Informazione: `/`, `/chi-siamo`, `/contatti`, `/privacy`, `/trasparenza`.
- Associazione: `/associazione-culturale`, `/associazione-culturale/convenzioni`,
  `/associazione-culturale/gulliver-rock`.
- Rappresentanza: `/rappresentanza`, `/rappresentanza/proposte`.
- Matricole: `/matricole`, route storiche sotto `/matricole/*` e route correnti
  `/kit26`, `/gruppi26`, `/guida26`, `/eng-guida26`.
- Elezioni: `/elezioni-studentesche` e relative pagine candidati, programma,
  Gulliver46 e monitor voto.
- Archivio: `/archivio` e snapshot sotto `/archivio/<anno>/`.
- Utility: `/countdown` è una pagina tecnica esclusa dall'indicizzazione.

## API

Le route sotto `/api/` non sono gestite dal matcher del proxy. Ogni route protetta
deve quindi verificare autonomamente sessione e ruolo. Le famiglie attuali sono:

- `/api/auth/*`: login, logout e verifica sessione;
- `/api/users` e `/api/users/requests`: utenti e richieste;
- `/api/forms`: configurazione form;
- `/api/settings`: impostazioni globali/popup;
- `/api/appunti`: lettura catalogo appunti;
- `/api/comunicazione` e `/api/comunicazione/cron-reminder`: calendario e promemoria.

## Routing dello snapshot

`next.config.ts` traduce gli URL con slash finale dello snapshot nel corrispondente
`index.html`. I file con estensione vengono serviti direttamente da `public`.
`trailingSlash: true` è quindi un vincolo anche per i link archivio.

## Sviluppo locale dei sottodomini

Il proxy riconosce host come `tesserati.localhost:3000` e `forms.localhost:3000`.
Il supporto del browser/risolutore a `*.localhost` va verificato sulla macchina; in
alternativa configurare host locali senza committare configurazioni personali.

## Prima di modificare

- Un rename di route richiede controllo di navbar, footer, sitemap, link nei contenuti,
  PDF/QR code, sottodomini, redirect e snapshot.
- Non rendere pubblica una home di servizio per correggere un problema di login.
- Aggiungere un sottodominio richiede tre interventi coordinati: DNS/Vercel, mappa in
  `src/proxy.ts` e ruolo/autorizzazione nelle API.
- Conservare la distinzione tra `forms.gulliverancona.it/` privato e
  `forms.gulliverancona.it/<slug>` pubblico.

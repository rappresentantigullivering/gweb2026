# Risorse per matricole

## Metadati

- **Stato:** Implementata, con route storiche e correnti sovrapposte
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `/matricole`, `/kit26`, `/gruppi26`, `/guida26`, `/eng-guida26`

## Scopo e flusso

L'area matricole distribuisce kit, guide PDF e collegamenti ai gruppi WhatsApp/Telegram
dei corsi. L'utente sceglie facoltà/corso, apre il gruppo corretto oppure scarica la
guida. Non è richiesto login o controllo matricola.

## Route

- Hub storico/corrente: `/matricole`.
- Pagine precedenti ancora presenti: `/matricole/kit`, `/matricole/gruppi`.
- Edizione 2026: `/kit26`, `/gruppi26`, `/guida26`, `/eng-guida26`.
- Documenti: principalmente `public/docs/2026/`, con materiale storico sotto anno.
- QR code per stampa e comunicazione: `public/docs/2026/qrcode/`.

`/gruppi26` è un componente client: contiene una struttura facoltà/corsi e apre link
esterni. Include anche il PDF riepilogativo dei gruppi. Il corso “Enviromental Hazard
and Disaster Risk Management” è collegato al relativo invito WhatsApp.

## Implementazione e dati

I link ai gruppi e i testi sono nel codice delle pagine, non in Redis. I PDF sono asset
versionati. La pagina non verifica appartenenza all'ateneo; una proposta separata è
documentata come non implementata.

I QR dell'edizione si rigenerano con `npm run qr:generate`. Il manifesto nome → URL è
in `scripts/generate-qr-codes.mjs`; dopo la generazione ogni codice va scansionato
fisicamente prima della stampa. Il file `guide26_qr.png` punta alla route canonica
`/guida26/`.

## Dipendenze

- Inviti WhatsApp/Telegram, che possono scadere o essere revocati esternamente.
- PDF correnti, QR code e link stampati.
- Navbar, sitemap e campagne social che possono puntare a URL specifici.

## Prima di modificare

- Non spostare o rinominare un PDF senza cercare tutti i riferimenti nel repository.
- Verificare ogni invito da una sessione non amministratrice e, se possibile, da mobile.
- Non archiviare le route storiche finché non sono stati verificati traffico e link
  esterni; preferire redirect espliciti quando serve mantenere l'URL.
- Se si introduce verifica identità, affrontare privacy, accessibilità, rate limit,
  recupero e costi; non seguire una proposta come se fosse già approvata.
- Aggiornare anno, testi, immagini e documenti come un unico rilascio coerente.
- Per una nuova edizione creare `public/docs/<anno>/qrcode/` senza sovrascrivere i QR
  già utilizzati nei materiali stampati degli anni precedenti.

## Verifica

1. Aprire tutte le route matricole dalla navbar mobile e desktop.
2. Provare selezione facoltà/corso e link di un campione per ogni facoltà.
3. Scaricare/aprire PDF italiano e inglese.
4. Controllare layout a 320 px e testi lunghi dei corsi.
5. Cercare riferimenti al vecchio anno prima di pubblicare.

## Limiti noti

Non esiste un pannello di gestione: aggiornare gruppi e guide richiede un commit. Le
route storiche convivono con quelle 2026 e la sitemap non elenca tutte le nuove route.

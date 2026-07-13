# Runbook: aggiornamento annuale dei contenuti

## Metadati

- **Stato:** Implementata come procedura
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** matricole, elezioni, Gulliver Rock, popup, asset e sitemap

## Quando usarlo

All'inizio di un nuovo ciclo matricole, elettorale o culturale. L'obiettivo è evitare
un sito “misto” con titolo nuovo, PDF vecchio, date hard-coded precedenti e link scaduti.

## Inventario iniziale

Eseguire ricerche globali per:

- anno corrente e precedente;
- date e orari nel formato italiano/ISO;
- nomi di PDF, liste, candidati ed eventi;
- URL WhatsApp, Telegram, voto, Tally e Canva;
- metadata, alt text, immagini social e countdown.

## Matricole

1. Ricevere guide/PDF finali e assegnare nomi stabili sotto `public/docs/<anno>/`.
2. Verificare tutti i gruppi per facoltà/corso, inclusi nomi lunghi e corsi inglesi.
3. Aggiornare pagine, navbar, home, metadata e sitemap.
4. Decidere cosa fare delle route dell'anno precedente: mantenere, redirect o snapshot.
5. Provare PDF e inviti da mobile e senza sessione amministrativa.

## Elezioni

1. Centralizzare almeno in un inventario tutte le date/orari/URL prima dell'edit.
2. Aggiornare hub, candidati, programma, Gulliver46, monitor, countdown e popup.
3. Verificare fuso orario e stati prima/durante/dopo il voto.
4. Controllare immagini e anteprime social.
5. Pianificare lo snapshot prima di rimuovere contenuti dell'edizione precedente.

## Gulliver Rock e altre campagne

Aggiornare data, luogo, CTA, locandine, metadata e countdown. Controllare che le
convenzioni citate siano ancora valide. Dopo l'evento scegliere consapevolmente se
conservare cronaca, preparare nuova edizione o archiviare.

## Pubblicazione

1. Eseguire `npm run docs:check`, lint e build.
2. Fare review editoriale dei contenuti e review tecnica dei link.
3. Pubblicare su `main`/Vercel.
4. Eseguire smoke test su produzione e condividere gli URL canonici.
5. Aggiornare data di verifica dei documenti funzionali interessati.

## Prima di modificare

- Non sovrascrivere uno snapshot.
- Non riutilizzare un URL pubblico con significato incompatibile senza redirect/nota.
- Non cancellare route operative durante la pulizia stagionale.
- Un link di invito valido per l'amministratore può non esserlo per un nuovo utente:
  provare in condizioni reali.

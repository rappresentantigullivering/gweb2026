# Gestione utenti e ruoli

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `admin.gulliverancona.it`, `/api/users*`

## Scopo e flusso

Il pannello admin gestisce utenti, richieste di iscrizione e ruoli. Un amministratore
può creare, aggiornare o eliminare account, approvare/rifiutare richieste e assegnare
accessi ai servizi.

## Implementazione

- UI: `src/app/admin/page.tsx` e componenti correlati.
- Utenti: `/api/users`.
- Richieste: `/api/users/requests`.
- Persistenza: `gulliver:users` e `gulliver:users:requests`.
- Autorizzazione: sessione attiva e ruolo `admin`.

Le password sono hashate prima della persistenza. Le risposte API non espongono gli
hash. Il sistema impedisce all'admin corrente di eliminare se stesso o rimuovere il
proprio ruolo amministratore.

## Ruoli disponibili

`admin`, `tesserato`, `appunti`, `popup`, `forms`, `comunicazione`, `direttivo`.
L'aggiunta di un ruolo nel solo pannello non crea un servizio: deve essere coordinata
con proxy, cockpit e API.

## Prima di modificare

- Conservare almeno un percorso di recupero amministrativo verificato.
- Non restituire hash o dettagli di sessione al browser.
- Validare username, ruoli e azioni sia client-side sia server-side.
- Quando si rimuove un ruolo, verificare sessioni già emesse e accesso immediato.
- Non riutilizzare `ADMIN_PASSWORD` come password utenti o segreto generale.
- Prima di cambiare schema utenti pianificare migrazione dei record Redis esistenti.

## Verifica

1. Creare, modificare ed eliminare un utente di test.
2. Approvare e rifiutare richieste.
3. Provare ogni ruolo nel cockpit e nel sottodominio relativo.
4. Confermare i vincoli anti-lockout sull'admin corrente.
5. Verificare 401/403 per richieste anonime o senza ruolo.

## Limiti noti

Mancano nel repository reset password, audit log e gestione automatica degli account
inattivi. Ogni evoluzione deve considerare privacy e recupero accessi.

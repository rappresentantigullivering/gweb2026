# Autenticazione e cockpit tesserati

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `tesserati.gulliverancona.it`, `/api/auth/*`, `src/proxy.ts`

## Scopo e flusso

Il portale tesserati è l'accesso unico ai servizi interni:

1. l'utente apre un sottodominio protetto;
2. senza sessione viene inviato a `tesserati.gulliverancona.it/login` con destinazione;
3. il login verifica l'utente Redis e crea cookie/sessione di sette giorni;
4. il proxy controlla il ruolo e riscrive verso la pagina interna;
5. il cockpit mostra solo i servizi compatibili con i ruoli dell'utente;
6. il logout elimina la sessione Redis e il cookie.

Registrazione e pagina non autorizzata sono pubbliche. La registrazione crea una
richiesta da approvare, non un utente immediatamente attivo.

## Implementazione

- Firma/verifica token e password: `src/lib/auth.ts`.
- Instradamento/RBAC: `src/proxy.ts`.
- API: `src/app/api/auth/login`, `check`, `logout`.
- UI: `src/app/tesserati/`.
- Persistenza: `gulliver:users`, `gulliver:users:requests`,
  `gulliver:session:<sessionId>`.

Il cookie è condiviso sul dominio `.gulliverancona.it`. Il proxy verifica sia firma e
scadenza sia esistenza della sessione Redis.

## Dipendenze

- Redis disponibile e configurato.
- `SESSION_SECRET` uguale per tutte le richieste/deploy attivi.
- DNS e dominio cookie corretti.
- Ruoli coerenti con la mappa del proxy.

## Prima di modificare

- Leggere [sicurezza e accessi](../project/security-and-access.md).
- Non cambiare payload o cookie senza prevedere invalidazione/migrazione.
- Non rimuovere il controllo Redis: la firma da sola impedirebbe la revoca immediata.
- Il parametro redirect deve restare limitato a destinazioni fidate per evitare open
  redirect; verificare attentamente ogni cambiamento.
- Testare utenti admin, ruolo corretto, ruolo errato, sessione scaduta/revocata e Redis
  non disponibile.

## Verifica

1. Registrare una richiesta e confermare che non abiliti subito l'accesso.
2. Accedere, aprire ogni servizio assegnato e verificare il cockpit.
3. Provare un sottodominio senza ruolo e la pagina non autorizzata.
4. Fare logout e confermare che una vecchia sessione non sia riutilizzabile.
5. Ispezionare attributi cookie in ambiente production-like.

## Limiti noti

Non è documentato nel repository un flusso self-service di reset password. Il fallback
del segreto sessione va eliminato o reso fail-fast in una futura revisione di sicurezza.

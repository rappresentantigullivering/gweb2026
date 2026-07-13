# Form dinamici

## Metadati

- **Stato:** Implementata
- **Ultima verifica:** 2026-07-13, commit `3eae46f`
- **Punti di ingresso:** `forms.gulliverancona.it`, `/f/[slug]`, `/api/forms`

## Scopo e flusso

Il servizio crea URL Gulliver stabili che incorporano form Tally:

1. un utente con ruolo `forms` apre la home del sottodominio;
2. crea o modifica nome, slug, URL Tally e stato;
3. il pubblico apre `forms.gulliverancona.it/<slug>` senza login;
4. se il form è attivo vede l'iframe Tally; se sospeso vede un messaggio Gulliver;
5. uno slug inesistente restituisce 404.

## Implementazione

- Manager: `src/app/f/page.tsx`.
- Pagina pubblica dinamica: `src/app/f/[slug]/page.tsx`.
- API: `src/app/api/forms/route.ts`.
- Persistenza: chiave Redis `gulliver:forms`.
- Routing pubblico/privato: regole speciali in `src/proxy.ts`.

L'API GET espone la configurazione necessaria alle pagine pubbliche. Le mutazioni
richiedono sessione con ruolo `forms`/`admin`; esiste ancora una compatibilità Bearer
basata su `ADMIN_PASSWORD` da considerare legacy.

## Slug e stato

Gli slug devono essere unici e non usare parole riservate. Lo stato consente di
sospendere l'incorporamento senza perdere l'URL. Le risposte e i campi compilati
restano su Tally: Redis non è il database delle risposte.

## Dipendenze

- Redis e SSO.
- Disponibilità, permessi e privacy di Tally.
- DNS/rewrite del sottodominio `forms`.
- Policy iframe e URL Tally valido.

## Prima di modificare

- Conservare la distinzione fra home privata e slug pubblici nel proxy.
- Non rendere mutante il GET pubblico e non esporre segreti Tally.
- Prima di rinominare uno slug verificare QR code, link social e campagne; valutare un
  redirect invece di una rottura.
- Prima di rimuovere il Bearer legacy censire ogni automazione che lo usa.
- Un form che raccoglie dati personali richiede testo/privacy e gestione su Tally;
  l'iframe non trasferisce automaticamente tali responsabilità.

## Verifica

1. Creare un form di test, aprirlo da sessione anonima e inviarlo su Tally.
2. Sospenderlo/riattivarlo e verificare il messaggio pubblico.
3. Provare slug duplicato, riservato, inesistente e URL Tally non valido.
4. Verificare che un utente senza ruolo non possa mutare la configurazione.
5. Controllare mobile, iframe e fallback di rete.

## Limiti noti

Il vecchio sistema documentato nella root usava un modello di accesso differente: non
è più fonte di verità. Non esistono versionamento o redirect automatici degli slug.
